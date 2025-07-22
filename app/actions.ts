"use server"
import { auth, signIn } from "@/auth";
import { compare, hash } from 'bcryptjs'
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { ExercisesThatRequireTimeMesureOrHandle, ExerciseType, ExerciseTypes, ExerciseTypeWithHandle, GymExercise, GymExercisesDbResult, LastExerciseType, LocalStorageExercise, ProgessionsDeclinesType, Progression, Series, SholudAddWeightType, Span, SummaryDataFetched, TempoType, TrainingExerciseType, TrainingProgression, UserExercise, UserExerciseTempo, UserSettings, UserTrainingInProgress, UserTrainingPlan, WeekDay, WeekDayPL, WidgetHomeDaysSum, WidgetHomeTypes } from "@/app/types";
import { dataType } from "./components/first-setup/SetupOneOfThree";
import { exerciseList, exercisesArr, handleTypes } from "./lib/exercise-list";
import { signOut } from "@/auth";
import { revalidatePath } from "next/cache";
import { Advancmentlevel, checkIfShouldIncreaseDifficulty, CheckIfTrainingExerciseGoalIsMet, compareBetterSeries, Daysexercising, Goal, WeekDayArray, WeekDayArrayPL } from "./lib/utils";
import { z } from "zod";
import { addDays, format, isSameDay, isSameWeek, subDays } from "date-fns";
import { AuthError } from "next-auth"; 
import { Begginer1_3FBW_FirstVariation, Begginer1_3FBW_SecondVariation, Beginner4_7Lower_FirstVariation, Beginner4_7Lower_SecondVariation, Beginner4_7Upper_FirstVariation, Beginner4_7Upper_SecondVariation } from "./lib/TrainingPlansData";
import { DefaultHandleExercises, DefaultTimeMesureExercies } from "./lib/data";
import { v4 } from "uuid";

export const LoginNoFormData = async (email:string,password:string) => {
    if(typeof email !== 'string' || typeof password !== 'string'){
        return { error: "Something went wrong"}
    }
    try{
        const response = await signIn('credentials',{
            email,
            password,
            redirect: false,
        })
        return response
       
    }catch(e){
        if(e instanceof AuthError){
            // @ts-ignore
           if(e.cause?.err!.code === 'credentials'){
            return { error: 'Wrong Login Or Password'}
           }
           return { error: 'Something went wrong'}
        }
        return { error: 'Something went wrong'}
    }
    
}

const validateEmail = (email:string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

export const Register = async (email:string,password:string,confirmpassword:string) => {
    let error = {
        email: '',
        password: '',
        confirmpassword: '',
        somethingWentWrong: '',
        isError: false
    }

    const validatedEmail = validateEmail(email)

    if(!validatedEmail){
        error.email = 'Wrong email format'
        error.isError = true
    }
    if(typeof email !== 'string' || typeof password !== 'string' || typeof confirmpassword !== 'string'){
        error.somethingWentWrong = "Something went wrong"
        error.isError = true
    }
    if(password !== confirmpassword){
        error.confirmpassword = 'Password are different'
        error.isError = true
    }
    if(password.length < 8){
        error.password = 'Password should be at least 8 chracters long'
        error.isError = true
    }

    if(error.isError){
        return { error }
    }

    const emailExist = await sql`
        SELECT FROM gymusers WHERE email = ${email}
    `

    if(emailExist.rows[0]){

        error.email = 'Email taken'
        error.isError = true

        return { error }
        
    }

    const hasedPassword = await hash(password,10)

    await sql`
        INSERT INTO gymusers (email,password) VALUES (${email},${hasedPassword})
    `
    return { error }
}
const ComparePasswords = async (password:string,hasedPassword:string) => {
    const isCorrect = await compare(password,hasedPassword)
    return isCorrect
}

export const AddExerciseAction = async (redirectUser:boolean,exerciseid:string,sets:Series[],ispartoftraining:boolean,trainingPlanId?:string,usesHandle?:{handleName:string,handleId:string},isLastExercise=false,date?:Date,originalTrainingId?: string,goal?: Progression) => {
    if(typeof redirectUser !== 'boolean')                                          return { errors: "Something went wrong" }
    if(!exerciseid || typeof exerciseid !== 'string')                              return { errors: "Something went wrong" }
    if(!Array.isArray(sets))                                                       return { errors: "Something went wrong" }
    if(typeof ispartoftraining !== 'boolean')                                      return { errors: "Something went wrong" }
    if(trainingPlanId && typeof trainingPlanId !== 'string')                       return { errors: "Something went wrong" }
    if(usesHandle && typeof usesHandle.handleId !== 'string')                      return { errors: "Something went wrong" }
    if(usesHandle && typeof usesHandle.handleName !== 'string')                    return { errors: "Something went wrong" }
    if(typeof isLastExercise !== 'boolean')                                        return { errors: "Something went wrong" }
    if(date && Object.prototype.toString.call(new Date(date)) !== '[object Date]') return { errors: "Something went wrong" }

    const userid = await userID()

    let stringDate = JSON.stringify(new Date())
    if(date) stringDate = JSON.stringify(date)

    let arr = [...exercisesArr]
    const userExercises = await getUserExercises()

    userExercises.forEach(item=>{
        arr.push(item.id)
        arr.push(item.exercisename)
    })

    const AddExerciseZodSchema = z.object({
        exerciseid: z.enum(['Wznosy bokiem',...arr]),
        sets: z.array(z.object({
            weight: z.number({message:"Weight has to be a number"}),
            repeat: z.number({message:"Repeat has to be a number"}),
        })).nonempty('Add at least one series'),
        ispartoftraining: z.boolean()
    })
    
    const validData = AddExerciseZodSchema.safeParse({
        exerciseid,
        sets,
        ispartoftraining
    })

    if(!validData.success && !isLastExercise) {
        if(validData.error.flatten().fieldErrors.sets){
            return {
                errors: validData.error.flatten().fieldErrors.sets![0]
            }
        }
        return {
            errors: 'Something went wrong'
        }
    }
    let trainingid = null
    if(trainingPlanId) trainingid = trainingPlanId

    let id = exerciseid
    if(userExercises[userExercises.findIndex(x=>x.exercisename===exerciseid)]){
        id = userExercises[userExercises.findIndex(x=>x.exercisename===exerciseid)].id
    }

    let parentTrainingPlanId = null
    if(originalTrainingId) parentTrainingPlanId = originalTrainingId

    let HandleName = null
    let HandleId = null
    if(usesHandle){
        HandleName = usesHandle.handleName
        HandleId = usesHandle.handleId
    }


    try{
        if(goal){
            const data = CheckIfTrainingExerciseGoalIsMet(sets,goal)
            const returnedData = await sql`
                UPDATE gymprogressions SET series = ${JSON.stringify(data.series)} WHERE exerciseid = ${data.exerciseid} AND userid = ${userid}
            `
        }
        const returning = await sql`
        INSERT INTO gymexercises (userid,exerciseid,date,sets,ispartoftraining,trainingid,exercisename,handleid,handlename,parenttrainingplan) VALUES (${userid},${id},${stringDate},${JSON.stringify(sets)},${ispartoftraining},${trainingid},${exerciseid},${HandleId},${HandleName},${parentTrainingPlanId})
        `
    }catch(e){
        console.log('Error occured: AddExerciseAction func actions.ts ',e)
        return {
            errors: 'Something went wrong'
        }
    }
    if(redirectUser) redirect('/home/add-exercise')
}

export const SaveTrainingToDatabase = async (trainingPlanId:string,exercises:LocalStorageExercise[],trainingStartDate:Date,trainingGoalsExercises?:Progression[]) => {
    if(typeof trainingPlanId !== 'string'){
        return { error: 'Something went wrong'}
    }
    if(!Array.isArray(exercises)){
        return { error: 'Something went wrong'}
    }
    if(Object.prototype.toString.call(new Date(trainingStartDate)) !== '[object Date]'){
        return { error: 'Something went wrong'}
    }
    const userid = await userID()
    let id = ''
    try{
        const dataID = await sql`
        INSERT INTO gymuserstrainings (userid, iscompleted, trainingid, datetime) VALUES (${userid},true,${trainingPlanId},${JSON.stringify(trainingStartDate)}) RETURNING id;
    `
    id = dataID.rows[0].id
    }catch(e){
        return { error : 'Something went wrong'}
    }

    // if(trainingGoalsExercises){
    //     // UPDATE THE SELECTED TRAINING
    //     trainingGoalsExercises.map(goal=>{
    //         const exercise = exercises.find(exe=>exe.id === goal.id)
    //         if(!exercise) return goal
    //         const data = CheckIfTrainingExerciseGoalIsMet(exercise.sets,goal)
    //         return data
    //     })

    //     const returnedData = await sql`
    //         UPDATE gymuserstrainingplans SET exercises = ${JSON.stringify(trainingGoalsExercises)} WHERE id = ${trainingPlanId} AND userid = ${userid}
    //     `
    //     console.log(returnedData)
    // }
    exercises.filter(exercise=>exercise.sets.length !== 0).map(async (exercise)=>{
        if(!exercise.exerciseId) return { error: `Exercise dont have an id`}

        const progression = trainingGoalsExercises?.find(x=>x.exerciseid === exercise.exerciseId)

        const data = await AddExerciseAction(false,exercise.exerciseName,exercise.sets,true,id,exercise.handle,false,exercise.date,trainingPlanId,progression)
        if(data?.errors) return { error : 'Something went wrong'}
    })

    revalidatePath('/home')
}

export const FistStepDataValidation = (data:dataType) => {
    let error = {
        goal: '',
        advancmentlevel: '',
        daysexercising: '',
        somethinWentWrong: '',
        isError: false
    }
    for(const [key,value] of Object.entries(data)){
        if(typeof value !== 'string') error.somethinWentWrong = "Something went wrong"
    }
    if(!Goal.includes(data.goal)) {
        error.goal = 'Wrong goal chosen'
        error.isError = true
    }
    if(!Advancmentlevel.includes(data.advancmentlevel)){
        error.advancmentlevel = 'Wrong advancment level chosen'
        error.isError = true
    }
    if(!Daysexercising.includes(data.daysexercising)){
        error.daysexercising = 'Wrong number of trainings per week chosen'
        error.isError = true
    }
    if(error.isError){
        return { error }
    }

}

export const SecondStepDataValidation = (exercises:string[]) => {
    let error = false
    if(!Array.isArray(exercises)){
        error = true
    }
    exercises.map(exercise=>{
        if(!exercisesArr.includes(exercise)) error = true
    })
    if(error){
        return { error: 'Wrong exercises chosen'}
    }
}
export const FirstSetupFinish = async(data:dataType,deleteExercises:string[],favourtiteExercises:string[]) => {
    let isError = false
    const userid = await userID()
    const validateData = FistStepDataValidation(data)
    for(const [key,value] of Object.entries(data)){
        if(typeof value !== 'string') return { error: "Something went wrong" }
    }
    if(validateData?.error){
        return { error: 'Something went wrong in first step' }
    } 
    if(!Array.isArray(deleteExercises) || !Array.isArray(favourtiteExercises)){
        return { error: 'Something went wrong' }
    }
    try{
        await sql`
            UPDATE gymusers
            SET goal = ${data.goal}, advancmentlevel = ${data.advancmentlevel}, daysexercising = ${data.daysexercising}, favouriteexercises = ${JSON.stringify(favourtiteExercises)}, notfavouriteexercises= ${JSON.stringify(deleteExercises)}, setupcompleted = true
            WHERE id = ${userid};
        `
        await createTrainingPlans(favourtiteExercises,deleteExercises,Number(data.daysexercising))
        return
    }catch(e){
        isError = true
        console.log('Error occured FirstSetupFinish func actions.ts',e)
        return { error : 'Something went wrong'}
    }finally{
        if(!isError) redirect('/home')
    }
}

export const logout = async () => {
    await signOut({redirect:true,redirectTo:'/login'})
}

export const getUserExercises = async () => {
    const userid = await userID()
    let AllExercises = []
    try{
        const exercises = await sql`
        SELECT exercisename,id,timemesure,useshandle FROM gymusersexercises WHERE userid = ${userid}
        `
        AllExercises = [...exercises.rows]
    }catch(e){
        console.log('Error occured getUserExercises func actions.ts',e)
        return []
    }
    return AllExercises as UserExercise[]
}

export const AddNewUserExercise = async (exercisename:string,timeExercise:boolean,usesHandle:boolean) => {
    const userid = await userID()

    if(!exercisename){
        return { 
            error: 'Name cant be empty'
        }
    }
    if(exercisename.length>=254){
        return {error : 'Exercise name is too long'}
    }
    if(typeof timeExercise !== 'boolean'){
        return {error: 'Something went wrong'}
    }
    if(typeof usesHandle !== 'boolean'){
        return {error: 'Something went wrong'}
    }
    if( typeof exercisename !== 'string'){
        return {error: 'Something went wrong'}
    }
    if(exercisesArr.map(x=>x.toLowerCase()).includes(exercisename.toLowerCase())){
        return {error: 'Exercise with this name already exist'}
    }
    try{
        await sql`
            INSERT INTO gymusersexercises (userid,exercisename,timemesure,useshandle) VALUES (${userid},${exercisename},${timeExercise},${usesHandle})
        `
        revalidatePath('/home/profile/my-exercises')
    }catch(e){
        return {
            error: 'Something went wrong'
        }
    }
}

export const DeleteUserExercise = async (id:string) => {
    const userid = await userID()
    if(typeof id !== 'string'){
        return {
            error :'Something went wrong'
        }
    }
    const checkIfIdInTraining = (trainingExercises:TrainingExerciseType[]) => {
        for(let i = 0 ; i<trainingExercises.length ; i++ ){
            if(trainingExercises[i].exerciseid === id){
                return true    
            }   
        }
        return false
    }
    try{
        //UPDATE ALL TRAINING PLANS NOT TO INCLUDE THIS EXERCISE
        const trainingsQuery = await sql`
            SELECT * FROM gymuserstrainingplans WHERE userid = ${userid}
        ` 
        const trainings = trainingsQuery.rows as UserTrainingPlan[]
        trainings.forEach(async training=>{
            if(checkIfIdInTraining(training.exercises)){
                //IT SEEMS THAT IN THIS TRAINING IS THE ID OF SOON TO DELETE ITEM
                const exercises1 = [...training.exercises]
                const exercises = exercises1.filter(x=>x.exerciseid!==id)
                await sql`
                    UPDATE gymuserstrainingplans
                    SET exercises = ${JSON.stringify(exercises)}
                    WHERE id = ${training.id} AND userid = ${userid};
                `
            }
        })
        try{
            await sql`
            UPDATE gymexercises SET exerciseid = null WHERE exerciseid = ${id} AND userid = ${userid}
        `
        }catch(e){
            console.log(e)
            return { error: "Something went wrong"}
        }

        await sql`
            DELETE FROM gymusersexercises WHERE id = ${id} AND userid = ${userid};
        `
       
    }catch(e){
        console.log('Error occured DeleteUserExercise func actions.ts',e)
        return {
            error :'Coś poszło nie tak'
        }
    }finally{
        revalidatePath('/home/profile/my-exercises')
    }
}

export const EditUserExercise = async (exerciseid:string,newname:string,timeExercise:boolean,usesHandle:boolean) => {
    if(newname === ''){
        return {error :'Exercise name cant be empty'}
    }
    if(typeof exerciseid !== 'string' || typeof newname !== 'string'){
        return {error :'Something went wrong'}
    }
    if(typeof timeExercise !== 'boolean') {
        return {error :'Something went wrong'}
    }
    if(typeof usesHandle !== 'boolean') {
        return {error :'Something went wrong'}
    }

    const userid = await userID()


    try{
        await sql`
            UPDATE gymusersexercises
            SET exercisename = ${newname}, timemesure = ${timeExercise}, useshandle = ${usesHandle}
            WHERE id = ${exerciseid} AND userid = ${userid};
        `
        await sql`
            UPDATE gymexercises
            SET exercisename = ${newname}
            WHERE exerciseid = ${exerciseid} AND userid = ${userid};
        `
        revalidatePath('/home/profile/my-exercises')
    }catch(e){
        return {
            error :'Something went wrong'
        }
    }
}

export const getAllExercises = async () => {
    try{
        const userExercises = await getUserExercises()

        return {...exerciseList,userExercises}
    }catch(e){
        return exerciseList as ExerciseTypes
    }
}

const checkTempoErrors = (tempos:TempoType) => {
    let TempoError = false
    for(const tempoentry in tempos){
        if(typeof tempos[tempoentry as keyof TempoType] !== 'number'){
            TempoError = true
        }
    }
    return TempoError
}

export const getAllTempos = async () => {
    const userid = await userID()
    try{
        const tempos = await sql`
            SELECT * FROM gymuserstempos WHERE userid = ${userid}
        `
        let temposObject:{[key: string]:{id:string,tempo:TempoType}} = {}
        const newTempos = tempos.rows as UserExerciseTempo[]

        newTempos.forEach((item:UserExerciseTempo,index:number)=>{
            temposObject[item.exerciseid] = {id:item.id,tempo:item.tempo}
        })

        return temposObject as {[key: string]:{id:string,tempo:TempoType}}
    }catch(e){
        return {} as {[key: string]:{id:string,tempo:TempoType}}
    }
}

export const AddOrUpdateTempo = async (exerciceid:string,tempos:TempoType) => {

    if(typeof exerciceid !== 'string') return { error: "Something went wrong" }

    const TempoError = checkTempoErrors(tempos)
    if(TempoError) return { error: "Something went wrong" }

    const userid = await userID()

    try{
        const exisingTempo = await sql`
            SELECT 1 FROM gymuserstempos WHERE userid = ${userid} AND exerciseid = ${exerciceid}
        `
        if(exisingTempo.rows.length>0){
            //TEMPO ALREDY EXIST IN DB AND NEEDS TO BE UPDATED
            await sql`
                UPDATE gymuserstempos
                SET tempo = ${JSON.stringify(tempos)}
                WHERE userid = ${userid} AND exerciseid = ${exerciceid};
            `
        }else{
            //TEMPO DONT EXIST IN DB AND NEEDS TO BE CREATED
            await sql`
                INSERT INTO gymuserstempos (userid,exerciseid,tempo) VALUES (${userid},${exerciceid},${JSON.stringify(tempos)})
            `
        }
    }catch(e){
        console.log('Error occured AddOrUpdateTempo func actions.ts',e)
        return { error: "Coś poszło nie tak" }
    }
    revalidatePath('/home/profile/set-tempo')
}

export const DeleteTempoFromDb = async (exerciceid:string) => {
    if(typeof exerciceid !== 'string') return { error: "Somethind went wrong" }

    const userid = await userID()
    try{
        await sql`
            DELETE FROM gymuserstempos WHERE userid = ${userid} AND exerciseid = ${exerciceid};
        `
    }catch(e){
        return { error: 'Somethind went wrong' }
    }
    revalidatePath('/home/profile/set-tempo')
}

export const AllExercisesInOneArray = async () => {
    const userExercises = await getUserExercises()

    return [...exercisesArr,...userExercises]
}

export const ArrayOfAllExercises = async () => {
    const userExercises = await getUserExercises()
    let arr = [...exercisesArr]
    userExercises.forEach(exercise=>{
        arr.push(exercise.exercisename)
    })
    return arr
}


export const userExercisesThatRequireHandlesOrTimeMesure = async () => {
    const userid = await userID()

    const ExercisesThatRequireTimeMesure:ExercisesThatRequireTimeMesureOrHandle[] = [...DefaultTimeMesureExercies]
    const ExercisesThatRequireHandle:    ExercisesThatRequireTimeMesureOrHandle[] = [...DefaultHandleExercises]

    try{
        const userExercisesThatRequireTimeMesure = await sql`
            SELECT id,exercisename,timemesure,useshandle FROM gymusersexercises WHERE userid = ${userid} AND (timemesure = true OR useshandle = true)
        `

        const userExercisesThatRequireEitherTimeMesureOrHandle = userExercisesThatRequireTimeMesure.rows as {id:string,exercisename:string,timemesure:boolean,useshandle:boolean}[]

        userExercisesThatRequireEitherTimeMesureOrHandle.map(x=>{
            if(x.timemesure) ExercisesThatRequireTimeMesure.push({id: x.id,exercisename:x.exercisename})
            if(x.useshandle) ExercisesThatRequireHandle.push({id: x.id,exercisename:x.exercisename})
        })
        return {ExercisesThatRequireTimeMesure,ExercisesThatRequireHandle}
    }catch(e){
        console.log(e,'Error occured actions.ts file function userExercisesThatRequireHandlesOrTimeMesure')
        return {ExercisesThatRequireTimeMesure,ExercisesThatRequireHandle}
    }
}

export const getUserHandles = async () => {
    const userid = await userID()
    try{
        const data = await sql`
            SELECT id, handlename FROM gymusershandles WHERE userid = ${userid}
        `
        return data.rows as {id: string,handlename: string}[]
    }catch(e){
        console.log(e,'Error occured actions.ts file getUserHandles function')
        return [] as {id: string,handlename: string}[]
    }
}

export const getAllHandleTypes = async () => {
    const userHandles = await getUserHandles()
    const defaultHandles = handleTypes.map(handle=>{
        return {id: handle,handlename:handle}
    })
    return [...userHandles,...defaultHandles] as {id: string,handlename: string}[]
}

const getAllIdsExercisesInArray = async () => {
    let array = [...exercisesArr]
    const userExercises = await getUserExercises()
    userExercises.forEach(x=>{
        array.push(x.id)
    })

    return array
}

const isNotEmptyString = (...strings:string[]) => {
    let error = ''

    strings.map(string=>{
        if(typeof string !== 'string') error = 'Something went wrong' 
        if(string === '') error = 'Name cant be empty'
    })

    if(!error) return false

    return { error: error }
}

export const addNewUserHandle = async (handlename:string) => {
    const userid = await userID()
    let notEmptyString = isNotEmptyString(handlename)
    if(notEmptyString) return notEmptyString
    let redirectUser = true
    try{
        const exitsData = await sql`
            SELECT * FROM gymusershandles WHERE userid = ${userid} AND handlename = ${handlename}
        `
       
        if(exitsData.rowCount && exitsData.rowCount>0){
            redirectUser = false
            return { error: 'That handle already exists' }
        } 
        
        await sql`
            INSERT INTO gymusershandles  (userid,handlename) VALUES (${userid},${handlename})
        `

    }catch(e){
        redirectUser = false
        return {error: 'Something went wrong'}
    }finally{
        if(redirectUser){
            revalidatePath('/home/profile/my-handles')
        }
    }
}

export const deleteUserHandle = async (handleid:string,) => {
    const userid = await userID()
    let notEmptyString = isNotEmptyString(handleid)
    if(notEmptyString) return notEmptyString
    let redirectUser = true

    try{
        await sql`
            UPDATE gymexercises SET handleid = null WHERE handleid = ${handleid} AND userid = ${userid}
        `
        await sql`
             DELETE FROM gymusershandles WHERE id = ${handleid} AND userid = ${userid}
        `
    }catch(e){
        return{ error: 'Something went wrong'}
    }finally{
        if(redirectUser){
            revalidatePath('/home/profile/my-handles')
        }
    }
}

export const editUserHandle = async (handlename:string,handleid: string) => {
    const userid = await userID()
    let redirectUser = true
    let notEmptyString = isNotEmptyString(handlename, handleid)
    if(notEmptyString) return notEmptyString

    if(!handleid) return {error: 'Handle id is needed'}

    try{
        await sql`
            UPDATE gymusershandles
            SET handlename = ${handlename}
            WHERE id = ${handleid} AND userid = ${userid};
        `
    }catch(e){
        redirectUser = false
        return{ error: 'Something went wrong'}
    }finally{
        if(redirectUser){
            revalidatePath('/home/profile/my-handles')
        }
    }
}

const checkTrainingFields = async (trainingplanname:string,exercises:TrainingExerciseType[],weekday:WeekDay,userID:string) => {
    if(typeof trainingplanname !== 'string'){
        return {error:'Something went wrong3'}
    }
    if (trainingplanname.length > 255){
        return {error:'Training name is too long'}
    }
    if(exercises.length <2){
        return {error:'Training has to have at least 2 exercises'}
    }
    let NotStringError = false
    let UnknownExerciseError = false
    let unknownExercice = ''
    const allExerciseIdsArray = await getAllIdsExercisesInArray()

    for(let x in exercises){
        if(typeof x !== 'string') NotStringError = true

        if(!allExerciseIdsArray.includes(exercises[x].exerciseid)){
            UnknownExerciseError = true 
            unknownExercice = exercises[x].exerciseid
        }
    }
    if(NotStringError) return { error: 'Something went wrong4'}
    if(UnknownExerciseError) return { error: `Unknown exercise in training plan`}
    if(!WeekDayArray.includes(weekday)) return { error: 'Wrong week day'}
}

export const GetUserTrainings = async () => {
    const userid = await userID()
    try{
        const UserTrainings = await sql`
            SELECT id,trainingname,date,exercises,weekday FROM gymuserstrainingplans WHERE userid = ${userid}
        `
        return UserTrainings.rows as UserTrainingPlan[]
    }catch(e){
        return []
    }
}

export const GetUserTrainingByName = async (trainingname:string) => {
    if(typeof trainingname !== 'string') return { error: "Something went wrong"}
    const userid = await userID()

    try{
        const Training = await sql`
            SELECT id,trainingname,date,exercises,weekday FROM gymuserstrainingplans WHERE userid = ${userid} AND trainingname = ${trainingname}
        `
        if(Training.rows.length===0){
            return {
                error: 'Training with this name dont exist'
            }
        }
        const trainingData = Training.rows[0] as UserTrainingPlan        

        return {
            training: Training.rows[0] as UserTrainingPlan,
            error: ''
        }
    }catch(e){
        return { error: 'Something went wrong'}
    }
}

export const CreateUserTraining = async (trainingplanname:string,weekday:WeekDay,exercisesuwu?:TrainingProgression[]) => {
    const userid = await userID()
    if(typeof trainingplanname !== 'string' || typeof weekday !== 'string' || (exercisesuwu && !Array.isArray(exercisesuwu))){
        return {error:'Something went wrong'}
    }
    if (trainingplanname.length > 255){
        return {error:'Training name is too long'}
    }
    if(!WeekDayArray.includes(weekday)){
        return { error: 'Wrong week day'}
    } 

    try{
        const userExercice = await sql`
        SELECT 1 FROM gymuserstrainingplans WHERE userid = ${userid} AND trainingname = ${trainingplanname}
        `
        if(userExercice.rows.length>0){
            return { error: 'Training with this name already exists'}
        }
    }catch(e){
        return {error:'Something went wrong'}
    }

    const date = new Date()
    let exercises = exercisesuwu
    if(!exercisesuwu) exercises = []
    try{
        await sql`
            INSERT INTO gymuserstrainingplans (userid,trainingname,date,weekday,exercises) VALUES (${userid},${trainingplanname},${JSON.stringify(date)},${weekday},${JSON.stringify(exercises)})
        `
    }catch(e){
        console.log('Error occured CreateUserTraining func actions.ts',e)
        return { error: 'Something went wrong'}
    }
    revalidatePath('/home/profile/my-training-plans')
    redirect(`/home/profile/my-training-plans/${trainingplanname}`)
}

export const EditUserTraining = async (trainingid:string,trainingplanname:string,exercises:TrainingExerciseType[],weekday:WeekDay) => {
    const userid = await userID()

    if(typeof trainingid !== 'string' || typeof trainingplanname !== 'string' || !Array.isArray(exercises) || typeof weekday !== 'string'){
        return { error: "Something went wrong1" }
    }
    const checkvalue = await checkTrainingFields(trainingplanname,exercises,weekday,userid as string)
    if(checkvalue?.error) return  checkvalue
    const date = new Date()
    try{
        await sql`
            UPDATE gymuserstrainingplans
            SET trainingname = ${trainingplanname}, date = ${JSON.stringify(date)}, exercises = ${JSON.stringify(exercises)}, weekday = ${weekday}
            WHERE id = ${trainingid} AND userid = ${userid};
        
            `
    }catch(e){
        console.log('Error occured EditUserTraining func actions.ts',e)
        return { error: 'Something went wrong1'}
    }
    revalidatePath('/home/profile/my-training-plans')
    redirect('/home/profile/my-training-plans')
}

export const DeleteUserTraining = async (trainingid:string) => {
    if(typeof trainingid !== 'string') return { error: "Something went wrong"}
    const userid = await userID()

    try{

        const exercisesIDs = await sql`
            SELECT id FROM gymuserstrainings WHERE trainingid = ${trainingid}
        ` 
        const idsArray = exercisesIDs.rows as {id: string}[]

        await Promise.all(idsArray.map(async item=>{
            await sql`
                UPDATE gymexercises SET trainingid = null WHERE trainingid = ${item.id} AND userid = ${userid}
            `
        }))

        await sql`
            DELETE FROM gymuserstrainings WHERE trainingid = ${trainingid} AND userid = ${userid};
        `
        await sql`
            DELETE FROM gymuserstrainingplans WHERE id = ${trainingid} AND userid = ${userid};
            `
    }catch(e){
        console.log('Error occured DeleteUserTraining func actions.ts',e)
        return { error: 'Something went wrong'}
    }
    revalidatePath('/home/profile/my-training-plans')
    redirect('/home/profile/my-training-plans')
}

export const getTrainingDataByName = async (name:string) => {
    if(typeof name !== 'string') return { error: "Something went wrong" }
    const userid = await userID()

    try{
        const list = await sql`
            SELECT * FROM gymuserstrainingplans WHERE userid = ${userid} AND trainingname = ${name}
        `
        if(list.rowCount === 0) return { error: 'Training not found' }
        
        const dataWithIds = list.rows[0] as UserTrainingPlan

        dataWithIds.exercises.map(exercise=>{
            exercise.series?.map(seria=>{
                seria.id = v4()
                return seria
            })
            return exercise
        })
        
        return {data: dataWithIds as UserTrainingPlan, error: ''}
    }catch(e){
        console.log(e)
        return { error: 'Something went wrong' }
    }
}

export const userTrainingsList = async () => {
    const userid = await userID()

    try{
        const list = await sql`
            SELECT * FROM gymuserstrainingplans WHERE userid = ${userid}
        `
        return list.rows as UserTrainingPlan[]
    }catch{
        return []
    }
}

export const createTraining = async (trainingPlanId:string) => {
    const userid = await userID()
    const date = new Date()

    try{
        const training = await sql`
        INSERT INTO gymuserstrainings (userid,iscompleted,trainingid,datetime) VALUES (${userid},false,${trainingPlanId},${JSON.stringify(date)})
    `
        const trainingID = await sql`
            SELECT id FROM gymuserstrainings WHERE userid = ${userid} ORDER BY datetime DESC LIMIT 1;
        `
        return trainingID.rows[0].id
    }catch(e){
        console.log('Error occured createTraining func actions.ts',e)
    }

}

export const getExistingTraining = async () => {
    const userid = await userID()
    try{
        const training = await sql`
            SELECT * FROM gymuserstrainings WHERE userid = ${userid} AND iscompleted = false
        `
        return training.rows[0] as UserTrainingInProgress
    }catch{

    }
}

export const getLastTrainigs = async (limit:number) => {
    if(typeof limit !== 'number') return []
    const userid = await userID()

    try{
        const lastTrainings = await sql`
        SELECT gymuserstrainings.trainingid, gymuserstrainings.datetime, gymuserstrainingplans.trainingname, gymuserstrainingplans.weekday
        FROM gymuserstrainings
        INNER JOIN gymuserstrainingplans ON gymuserstrainings.trainingid=gymuserstrainingplans.id 
        WHERE gymuserstrainings.userid = ${userid} ORDER BY datetime DESC LIMIT ${limit};
        `
        return lastTrainings.rows as LastExerciseType[]
    }catch(e){
        console.log('Error occured getLastTrainigs func actions.ts',e)
        return []
    }

}

export const fetchIncomingTrainings = async () => {
    const userid = await userID()

    const today = new Date()

    try{
        const trainings = await sql`
            SELECT * FROM gymuserstrainingplans WHERE userid = ${userid}
        `
        const trainingPlansArray = trainings.rows as UserTrainingPlan[]
        if(trainingPlansArray.length<2) return trainingPlansArray

        return trainingPlansArray.sort((a,b)=>{
            let aDiff = new Date(a.date).getDay() - today.getDay()
            let bDiff = new Date(b.date).getDay() - today.getDay()
            if(Math.abs(aDiff) < Math.abs(bDiff)){
                return 1
            }else{
                return - 1 
            }
        })
    }catch(e){
        console.log('Error occured fetchIncomingTrainings func actions.ts',e)
        return []
    }
}

export const getTwoLatestTrainings = async () => {
    const userid = await userID()

    try{
        const lastTrainings = await sql`    
            SELECT gymuserstrainings.id, gymuserstrainings.datetime, gymuserstrainingplans.trainingname FROM gymuserstrainings
            INNER JOIN gymuserstrainingplans ON gymuserstrainings.trainingid = gymuserstrainingplans.id
            WHERE gymuserstrainings.userid = ${userid} ORDER BY datetime DESC LIMIT 2
            ` 
        const x = lastTrainings.rows as {id: string, datetime:Date,trainingname:string}[]

        if(x.length === 0) return {newArr:null, trainingNames:lastTrainings.rows}

        let result:GymExercisesDbResult[] = []
        
        if(x.length === 1){
            const gymexercises = await sql`
                SELECT * FROM gymexercises
                WHERE trainingid = ${x[0].id} ORDER BY date DESC
            `
            result = gymexercises.rows as GymExercisesDbResult[]
        }else{
            const gymexercises = await sql`
                SELECT * FROM gymexercises
                WHERE trainingid = ${x[0].id} OR trainingid = ${x[1].id} ORDER BY date DESC
        `
            result = gymexercises.rows as GymExercisesDbResult[]
        }
        
        const userExercises = await getUserExercises()
        let newArr:GymExercisesDbResult[][] = [[]]
    

        let IdA = result[0].trainingid
        result.forEach(item=>{
            if(!exercisesArr.includes(item.exerciseid)){
                const id = userExercises.findIndex(x=>x.id===item.exerciseid)
                if(id!==0&&!id) return
                item.exerciseid = userExercises[id].exercisename
            }
            if(item.trainingid===IdA){
                item.trainingid
                newArr[0].push(item)
            }else{
                if(newArr.length===1) return newArr.push([item])
                newArr[1].push(item)
            }
            
        })
        return {newArr, trainingNames:lastTrainings.rows as {id: string, datetime:Date,trainingname:string}[]}
    }catch(e){
        console.log('Error occured getTwoLatestTrainings func actions.ts',e)
        return {error: 'Coś poszło nie tak'}
    }
}

const timeout = async () => {
    const a = await  new Promise((resolve)=>{
        setTimeout(()=>resolve(true),3000)
    })
    return a
}

export const userEmail = async () => {
    const user = await auth()
    if(!user) return redirect('/login')
    return user?.user?.email
}

export const userID = async () => {
    const user = await auth()
    if(!user) return redirect('/login')
    return user?.user?.id
}

export const fetchUserExercisesCount = async (from?:Date,to?:Date,exerciseName?:string) => {
    const userid = await userID()
    if( (from && Object.prototype.toString.call(new Date(from)) !== '[object Date]') || (to && Object.prototype.toString.call(new Date(to)) !== '[object Date]')){
        return {error: 'Wrong date format', data : '0' }
    }
    if(exerciseName && typeof exerciseName !== 'string') {
        return {error: 'Wrong date format', data : '0' }
    }

    let toFormatted = ''
    let fromFormatted = ''

    if(to){
        toFormatted = format(addDays(to,1),'yyyy-MM-dd kk:mm:ss')
    }
    if(from){
        fromFormatted = format(from,'yyyy-MM-dd kk:mm:ss')
    }

    try{
        if(from && to && exerciseName){
            const count = await sql`
                SELECT COUNT(*) FROM gymexercises WHERE userid = ${userid} AND date BETWEEN ${fromFormatted}::date AND ${toFormatted}::date AND exercisename = ${exerciseName}
            `
            return { error: '', data: count.rows[0].count as string }
        }

        if(from && exerciseName){
            const count = await sql`
                SELECT COUNT(*) FROM gymexercises WHERE userid = ${userid} AND date >= ${fromFormatted} AND exercisename = ${exerciseName}
            `
            return { error: '', data: count.rows[0].count as string }
        }

        if(to && exerciseName){
            const count = await sql`
                SELECT COUNT(*) FROM gymexercises WHERE userid = ${userid} AND date <= ${toFormatted} AND exercisename = ${exerciseName}
            `
            return { error: '', data: count.rows[0].count as string }
        }
        if(to && from){
            const count = await sql`
                SELECT COUNT(*) FROM gymexercises WHERE userid = ${userid} AND date BETWEEN ${fromFormatted}::date AND ${toFormatted}::date
            `
            return { error: '', data: count.rows[0].count as string }
        }
        if(to){
            const count = await sql`
                SELECT COUNT(*) FROM gymexercises WHERE userid = ${userid} AND date <= ${toFormatted}
            `
            return { error: '', data: count.rows[0].count as string }
        }

        if(from){
            const count = await sql`
                SELECT COUNT(*) FROM gymexercises WHERE userid = ${userid} AND date >= ${fromFormatted}
            `
            return { error: '', data: count.rows[0].count as string }
        }

        if(exerciseName){
            const count = await sql`
                SELECT COUNT(*) FROM gymexercises WHERE userid = ${userid} AND exercisename = ${exerciseName}
            `
            return { error: '', data: count.rows[0].count as string }
        }

        //all
        const count = await sql`
            SELECT COUNT(*) FROM gymexercises WHERE userid = ${userid}
        `
        return { error: '', data: count.rows[0].count as string }
    }catch{
        return { error: 'Something went wrong', data: '0' }
    }
}
export const fetchUserExercises = async (from?:Date,to?:Date,exerciseName?:string,page?:number,limit?:number) => {
    const userid = await userID()

    if(!page) page = 0
    if(!limit) limit = 20
    let toFormatted = ''
    let fromFormatted = ''

    if(to){
        toFormatted = format(addDays(to,1),'yyyy-MM-dd kk:mm:ss')
    }
    if(from){
        fromFormatted = format(from,'yyyy-MM-dd kk:mm:ss')
    }

    if( (from && Object.prototype.toString.call(new Date(from)) !== '[object Date]') || (to && Object.prototype.toString.call(new Date(to)) !== '[object Date]')){
        return { error: 'Wrong date format' , data : []}
    }
    if(exerciseName && typeof exerciseName !== 'string') {
        return { error: 'Exercise name has to be text', data : []}
    }
    try{
        //TODO MAKE SEPARATE FUNCTION FOR FETCHING COUNT
        if(from && to && exerciseName){
            const exercises = await sql`
                SELECT id,exercisename,date,sets,handlename FROM gymexercises WHERE userid = ${userid} AND date BETWEEN ${fromFormatted}::date AND ${toFormatted}::date AND exercisename = ${exerciseName} ORDER BY date DESC LIMIT ${limit} OFFSET ${page*limit}
            `
            return { error: '', data: exercises.rows as ExerciseTypeWithHandle[] }
        }

        if(from && exerciseName){
            const exercises = await sql`
                SELECT id,exercisename,date,sets,handlename FROM gymexercises WHERE userid = ${userid} AND date >= ${fromFormatted} AND exercisename = ${exerciseName} ORDER BY date DESC LIMIT ${limit} OFFSET ${page*limit}
            `
            return { error: '', data: exercises.rows as ExerciseTypeWithHandle[] }
        }

        if(to && exerciseName){
            const exercises = await sql`
                SELECT id,exercisename,date,sets,handlename FROM gymexercises WHERE userid = ${userid} AND date <= ${toFormatted} AND exercisename = ${exerciseName} ORDER BY date DESC LIMIT ${limit} OFFSET ${page*limit}
            `
            return { error: '', data: exercises.rows as ExerciseTypeWithHandle[] }
        }
        if(to && from){
            const exercises = await sql`
                SELECT id,exercisename,date,sets,handlename FROM gymexercises WHERE userid = ${userid} AND date BETWEEN ${fromFormatted}::date AND ${toFormatted}::date ORDER BY date DESC LIMIT ${limit} OFFSET ${page*limit}
            `
            return { error: '', data: exercises.rows as ExerciseTypeWithHandle[] }
        }
        if(to){
            const exercises = await sql`
                SELECT id,exercisename,date,sets,handlename FROM gymexercises WHERE userid = ${userid} AND date <= ${toFormatted}::date ORDER BY date DESC LIMIT ${limit} OFFSET ${page*limit}
            `
            return { error: '', data: exercises.rows as ExerciseTypeWithHandle[] }
        }

        if(from){
            const exercises = await sql`
                SELECT id,exercisename,date,sets,handlename FROM gymexercises WHERE userid = ${userid} AND date >= ${JSON.stringify(from)}::date ORDER BY date DESC LIMIT ${limit} OFFSET ${page*limit}
            `
            return { error: '', data: exercises.rows as ExerciseTypeWithHandle[] }
        }

        if(exerciseName){
            const exercises = await sql`
            SELECT id,exercisename,date,sets,handlename FROM gymexercises WHERE userid = ${userid} AND exercisename = ${exerciseName} ORDER BY date DESC LIMIT ${limit} OFFSET ${page*limit}
            `
            return { error: '', data: exercises.rows as ExerciseTypeWithHandle[] }
        }
        const exercises = await sql`
            SELECT id,exercisename,date,sets,handlename FROM gymexercises WHERE userid = ${userid} ORDER BY date DESC LIMIT ${limit} OFFSET ${page*limit}
        `
        return { error: '', data: exercises.rows as ExerciseTypeWithHandle[] }
    }catch(e){
        console.log('Error occured fetchUserExercises func actions.ts',e)
        return { error: 'Something went wrong' }
    }
}

export const getAccountSettings = async () => {
    const userid = await userID()

    try{
        const setting = await sql`
            SELECT showtempo, goal, advancmentlevel, daysexercising, favouriteexercises, notfavouriteexercises FROM gymusers WHERE id = ${userid}
        `
        return setting.rows[0] as UserSettings
    }catch(e){
        console.log('Error occured getAccountSettings func actions.ts',e)
        return {} as UserSettings
    }
}

export const saveNewUserSetting = async (newSettings : UserSettings) => {
    const userid = await userID()

    const daysexercisingArr = ['1' , '2' , '3' , '4' , '5' , '6' , '7']
    const goalArr = ['Siła','Hipertrofia','Oba']
    const advancmentlevelArr = ['Początkujący','Średniozaawansowany','Zaawansowany']

    const { advancmentlevel, daysexercising, favouriteexercises, goal, notfavouriteexercises } = newSettings

    if(!Array.isArray(favouriteexercises) || !Array.isArray(notfavouriteexercises)){
        return { error: 'Something went wrong' }
    }
    if(typeof goal !== 'string' || !goalArr.includes(goal)){
        return { error: 'Wrong goal, correct goals are one of' }
    } 

    if(typeof advancmentlevel !== 'string' || !advancmentlevelArr.includes(advancmentlevel)){
        return { error: 'Wrong advancment level, correct level is one of' }
    } 

    if(typeof daysexercising !== 'string' || !daysexercisingArr.includes(daysexercising)){
        return { error: 'Training days a week should be between 1 and 7' }
    } 

    if(favouriteexercises){
        for(let i = 0 ; i< favouriteexercises.length ; i++ ){
            if(!exercisesArr.includes(favouriteexercises[i])) return { error: 'Unknown exercise in favourtie exercises'}
        }
    }
    if(notfavouriteexercises){
        for(let i = 0 ; i< notfavouriteexercises.length ; i++ ){
            if(!exercisesArr.includes(notfavouriteexercises[i])) return { error: 'Nieznane ćwiczenie w nie lubianych ćwiczeniach' }
        }
    }
    
    try{
        await sql`
            UPDATE gymusers SET goal = ${goal}, advancmentlevel = ${advancmentlevel}, daysexercising = ${daysexercising}, favouriteexercises = ${JSON.stringify(favouriteexercises)}, notfavouriteexercises = ${JSON.stringify(notfavouriteexercises)}  WHERE id = ${userid}
        `
    }catch(e){
        console.log('Error occured saveNewUserSetting func actions.ts',e)
        return {
            error: 'Something went wrong'
        }
    }finally{
        revalidatePath('/home/profile/settings')
    }
}

export const fetchPreviousExercise = async (exercisename:string) => {
    const userid = await userID()

    if(typeof exercisename !== 'string') return null
    try{
        const result = await sql`
            SELECT id,date,sets,exercisename FROM gymexercises WHERE userid = ${userid} AND exerciseid = ${exercisename} ORDER BY date DESC LIMIT 1;
        `
        if(result.rowCount === 0) return null
        return result.rows[0] as ExerciseType
    }catch(e){
        console.log('Error occured fetchPreviousExercise func actions.ts',e)
        return null
    }
}

export const changePassword = async (password:string,newpassword:string,repeatnewpassword:string) => {
    const userid = await userID()

    if(typeof password!== 'string' || typeof newpassword!== 'string' || typeof repeatnewpassword!== 'string') return {error: 'Password has to be string of characters'}
    if(newpassword!==repeatnewpassword) return {error: 'Password are different'}
    if(newpassword.length<8) return {error: 'Password should be at least 8 chracters long'}
    let userEncryptedPassword
    try{
        const userData = await sql`
            SELECT password FROM gymusers WHERE id = ${userid}
        `
    userEncryptedPassword = userData.rowCount && userData.rowCount > 0 ? userData.rows[0].password : null
    }catch(e){
        return {error: 'Something went wrong'}
    }

    if(!userEncryptedPassword) return {error: 'Something went wrong'}
    const isPasswordCorrect = await ComparePasswords(password,userEncryptedPassword)
    if(!isPasswordCorrect) return {error: 'Wrong password'}

    const hasedPassword = await hash(newpassword,10)
    try{
        await sql`
            UPDATE gymusers SET password = ${hasedPassword} WHERE id = ${userid}
        `
    }catch{
        return {error: 'Something went wrong'}
    }

}

export const getUserExerciseIdUsingName = async (exercisename:string) => {
    const userid = await userID()

    try{
        const rows = await sql`
        SELECT id FROM gymusersexercises WHERE userid = ${userid} AND exercisename = ${exercisename}
    `
    if(rows.rowCount === 0) return ''
    return rows.rows[0].id
    }catch{
        return ''
    }
} 

const FilterTraining = (training:{[key:string]:{exercises:string[],fallback:string}},fav:string[],notfav:string[]) => {
    let finalTraining:TrainingExerciseType[] = []
    let id = 0
    for(const [key, value] of Object.entries(training)){
        let indexOfExercise = 0

        loop2: 
        for(let i = 0 ; i<value.exercises.length ; i++){
            if(fav.includes(value.exercises[i])){
                indexOfExercise = i;
                break loop2
            } 
            if(notfav.includes(value.exercises[i])){ 
                //USER DONT LIKE THIS EXERCISE SO FUNCTION INCREMENT INDEX OF EXERCISE 
                if(i === value.exercises.length-1) indexOfExercise = -2 // ITS LAST ITERATION OF LOOP SO FUNCTION MAKES SURE THAT INDEX OF EXERCISE WILL BE -1, THUS USER LIKE NON OF EXERCIES
                indexOfExercise = indexOfExercise + 1
            }else{
                break loop2
            }
        }

        if(indexOfExercise === -1){
            finalTraining.push({exercisename:value.fallback,id:String(id),exerciseid:value.fallback})
            id = id + 1
        }else{
            finalTraining.push({exercisename:value.exercises[indexOfExercise],id:String(id),exerciseid:value.exercises[indexOfExercise]})
            id = id + 1
        }
        
    }
    return finalTraining
}
const createTrainingPlans = async (fav:string[],notfav:string[],days:number) => {
    const plans:TrainingExerciseType[][] = []
    if(days<=3){
        plans.push(            
            FilterTraining(Begginer1_3FBW_FirstVariation,fav,notfav),
            FilterTraining(Begginer1_3FBW_SecondVariation,fav,notfav)
        )
    }
    if(days>3){
        plans.push(
            FilterTraining(Beginner4_7Upper_FirstVariation,fav,notfav),
            FilterTraining(Beginner4_7Upper_SecondVariation,fav,notfav),
            FilterTraining(Beginner4_7Lower_FirstVariation,fav,notfav),
            FilterTraining(Beginner4_7Lower_SecondVariation,fav,notfav)
        )
    }

    plans.map(async(plan,index)=>{
        let name:string
        if(days<=2){
            name = `Trening całego ciała ${index+1}`
        }else{
            name = index<=1?`Trening góry ${index+1}`:`Trening dołu ${index+1}`
        }

        await CreateUserTraining(name,'Monday',plan)
    })

}

export const Last30DaysExercises = async () => {
    const userid = await userID()
    const today = new Date()
    const a30daysago = subDays(today,30)

    try{
        const exercisesResult = await sql`
            SELECT sets,date FROM gymexercises WHERE userid = ${userid} AND date <= ${JSON.stringify(today)} AND date >= ${JSON.stringify(a30daysago)};
        `
        const result = exercisesResult.rows as WidgetHomeTypes[]
        let totalKGThisMonth = 0
        let totalSeriesThisMonth = 0
        let toalKGToday = 0
        let totalSeriesToday = 0
        let totalKGThisWeek = 0
        let totalSeriesThisWeek = 0
        let groupedDays = {

        } as WidgetHomeDaysSum

        result.map(set=>{
            let totalKGThisSet = 0
            let totalSeriesThisSet = 0

            set.sets.forEach(item=>{
                totalKGThisSet = totalKGThisSet + item.weight
                totalSeriesThisSet = totalSeriesThisSet + item.repeat
            })

            if(isSameDay(set.date,today)){
                    toalKGToday = toalKGToday + totalKGThisSet
                    totalSeriesToday = totalSeriesToday + totalSeriesThisSet
            }

            if(isSameWeek(set.date,today,{weekStartsOn:1})){
                    totalKGThisWeek = totalKGThisWeek + totalKGThisSet
                    totalSeriesThisWeek = totalSeriesThisWeek + totalSeriesThisSet
            }

            totalKGThisMonth = totalKGThisMonth + totalKGThisSet
            totalSeriesThisMonth = totalKGThisMonth + totalSeriesThisSet

            const formattedDate = format(set.date,'dd,MM')

            if(groupedDays[formattedDate]){
                groupedDays[formattedDate] = {dayWeight: groupedDays[formattedDate].dayWeight + totalKGThisSet , dayRepeats: groupedDays[formattedDate].dayRepeats + totalSeriesThisSet}
            }else{
                groupedDays[formattedDate] = {dayWeight: totalKGThisSet , dayRepeats: totalSeriesThisSet}
            }
        })
        const len = result.length ? result.length : 1 
        let returnObj = {
            totalKGThisWeek,
            totalSeriesThisWeek,
            totalKGThisMonth,
            totalSeriesThisMonth,
            averageThisMonthDayKG: Math.round(totalKGThisMonth/len),
            averageThisMonthSeries: Math.round(totalSeriesThisMonth/len),
            groupedDays
        }
        return returnObj
    }catch(e){
        console.log('Error occured actions.ts file Last30DaysExercises function',e)
    }
}

export const getSummaryData = async () => {
    const userid = await userID()

    try{
        const query = await sql`
            SELECT * FROM gymexercises WHERE userid = ${userid}
        `
        const data = query.rows as GymExercise[]
        const favourtieExercises = [] as { exercisename: string, number: number}[]

        for(let i = 0; i < data.length; i++){
            const index = favourtieExercises.findIndex(val=>val.exercisename === data[i].exercisename)
            if( index >= 0){
                favourtieExercises[index].number = favourtieExercises[index].number + 1
            }else{
                favourtieExercises.push({exercisename: data[i].exercisename,number: 1})
            }
        }

        return {piechart: favourtieExercises.sort((a,b)=>{
            if(a.number < b.number) return 1
            return -1
        }).slice(0,5)}
    }catch{

    }
}

export const getBasicSummaryData = async () => {
    const userid = await userID()

    try{
        const data = await sql`
            SELECT sets, exercisename, date FROM gymexercises WHERE userid = ${userid}
        `
        const parsedData = data.rows as SummaryDataFetched[]
        return {data: parsedData, error: ''}
    }catch{
        return {data: [], error: 'Something went wrong'}
    }
}

export const AddOrUpdateProgression = async (data:Progression) => {
    const userid = await userID()

    try{
        const exists = await sql`
            SELECT id FROM gymprogressions WHERE userid = ${userid} AND exerciseid = ${data.exerciseid}
        `
        if(exists.rows.length === 0){
            //create
            await sql`
                INSERT INTO gymprogressions (id,exerciseid,exercisename,series,userid) VALUES (${v4()},${data.exerciseid},${data.exercisename},${JSON.stringify(data.series)},${userid})
            `
            revalidatePath('/home/profile/set-progressions')
            return { error: '' }
        }else{
            //update
            await sql`
                UPDATE gymprogressions
                SET series = ${JSON.stringify(data.series)}
                WHERE id = ${data.id} AND userid = ${userid};
            `
        }
        return { error: '' }
    }catch(e){
        return { error: 'Something went wrong' }
    }
}

export const getAllUserProgressions = async () => {
    const userid = await userID()

    try{
        const data = await sql`
            SELECT * FROM gymprogressions WHERE userid = ${userid}
        `
        return data.rows as Progression[]
    }catch(e){
        console.log(e)
        return [] as Progression[]
    }
}

export const DeleteUserProgression = async (progressionid: string) => {
    const userid = await userID()

    try{
        await sql`
            DELETE FROM gymprogressions WHERE id = ${progressionid} AND userid = ${userid}
        `
        revalidatePath('/home/profile/set-progressions')
        return {
            error: ''
        }
    }catch(e){
        console.log(e)
        return {
            error: "Something went wrong"
        }
    }
}

export const getUserExerciseProgression = async (exerciseid: string) => {
    const userid = await userID()

    try{
        const data = await sql`
        SELECT * FROM gymprogressions WHERE userid = ${userid} AND exerciseid = ${exerciseid}
        `
        return data.rows[0] as Progression
    }catch{
        return undefined
    }
}

export const GetProgressionsAndDeclines = async () => {
    const userid = await userID()

    const date = format(subDays(new Date(),30),'yyyy-MM-dd kk:mm:ss')
    try{
        const fetcher = await sql`
            SELECT id, exerciseid, exercisename, date, sets FROM gymexercises WHERE userid = ${userid} AND date >= ${date} ORDER BY date DESC
        `
        const allExercises = fetcher.rows as ProgessionsDeclinesType[]

        let obj = {} as {[key:string]: ProgessionsDeclinesType[]}
        let ptrObj = {} as {[key:string]: ProgessionsDeclinesType[]} // here [0] will be odlest exercise and [1] will be newest
 
        for(let i = 0; i < allExercises.length; i++){
            //////////////////////////////////////////
            /////HERE WE DO MY IDEA OBJECT////////////
            //////////////////////////////////////////
            if(obj[allExercises[i].exerciseid] && obj[allExercises[i].exerciseid].length < 2){
                obj[allExercises[i].exerciseid].push(allExercises[i])
            }
            if(!obj[allExercises[i].exerciseid]){
                obj[allExercises[i].exerciseid] = [allExercises[i]]
            }
            //////////////////////////////////////////
            //////HERE IS PIOTR IDEA OBJ//////////////
            //////////////////////////////////////////
            if(!ptrObj[allExercises[i].exerciseid]){
                ptrObj[allExercises[i].exerciseid] = [allExercises[i]]
            }
            if(ptrObj[allExercises[i].exerciseid] && obj[allExercises[i].exerciseid].length === 1){
                if(ptrObj[allExercises[i].exerciseid][0].date.getDate() < allExercises[i].date.getDate()){
                    ptrObj[allExercises[i].exerciseid].push(allExercises[i])
                }else{
                    ptrObj[allExercises[i].exerciseid][1] = ptrObj[allExercises[i].exerciseid][0]
                    ptrObj[allExercises[i].exerciseid][0] = allExercises[i]
                }
            }
            if(ptrObj[allExercises[i].exerciseid] && obj[allExercises[i].exerciseid].length === 2){
                if(ptrObj[allExercises[i].exerciseid][0].date.getDate() > allExercises[i].date.getDate()){
                    ptrObj[allExercises[i].exerciseid][0] = allExercises[i]
                }
                if(ptrObj[allExercises[i].exerciseid][1].date.getDate() < allExercises[i].date.getDate()){
                    ptrObj[allExercises[i].exerciseid][1] = allExercises[i]
                }
            }
            ///////////////////////////////////////////
            ///////////////////////////////////////////
        }
        for (const property in obj) {
            if(obj[property].length < 2) delete obj[property]
        }
        for (const property in ptrObj) {
            if(ptrObj[property].length < 2) delete ptrObj[property]
        }

        let worstExercise = {} as {exercise: ProgessionsDeclinesType[], score: number}
        let bestExercise = {} as {exercise: ProgessionsDeclinesType[], score: number}

        for (const property in ptrObj) {
            const compare = compareBetterSeries(ptrObj[property][1].sets,ptrObj[property][0].sets)
            if(compare.value === 'equal') continue

            if(!bestExercise.score && compare.score > 0){
                console.log('he is applaying')
                bestExercise = { exercise: ptrObj[property], score: compare.score}
            } 
            if(!worstExercise.score && compare.score < 0){
                worstExercise = { exercise: ptrObj[property], score: compare.score}
            } 

            if(compare.score > 0 && compare.score > bestExercise.score) {
                bestExercise = { exercise: ptrObj[property], score: compare.score}
            }
            if(compare.score < 0 && compare.score < worstExercise.score) {
                worstExercise = { exercise: ptrObj[property], score: compare.score}
            }
        }

        return {obj, bestExercise, worstExercise}
    }catch{
        return undefined
    }
}