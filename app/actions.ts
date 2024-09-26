"use server"
import { auth, signIn } from "@/auth";
import { compare, hash } from 'bcryptjs'
import { FirstSetupZodSchema, RegisterUserZodSchema } from "@/app/lib/schemas";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { ExerciseType, ExerciseTypes, GymExercisesDbResult, HistoryExercise, LastExerciseType, Series, TempoType, TrainingExerciseType, UserExercise, UserExerciseTempo, UserSettings, UserTrainingInProgress, UserTrainingPlan, WeekDay, WeekDayPL } from "@/app/types";
import { dataType } from "./components/first-setup/SetupOneOfThree";
import { exerciseList, exercisesArr, timeMesureExercises } from "./lib/exercise-list";
import { signOut } from "@/auth";
import { revalidatePath } from "next/cache";
import { WeekDayArray, WeekDayArrayPL } from "./lib/utils";
import { z } from "zod";
import { addDays, format } from "date-fns";
import { AuthError } from "next-auth"; 

type State = {
    error?: string
    succes?: boolean
}
export const Login = async (prevState:State,formData:FormData) => {
    //check if user exist 
    try{
        const response = await signIn('credentials',{
            email: formData.get('email'),
            password: formData.get('password'),
            redirect: false,
        })
        return response
    }catch(e){
        if(e instanceof AuthError){
            // @ts-ignore
           if(e.cause?.err!.code === 'credentials'){
            return { error: 'Zły login lub hasło'}
           }
           return { error: 'Coś poszło nie tak'}
        }
    }
}

type RegisterState = {
    errors?: {
        email?: string[],
        password?: string[],
        confirmpassword?: string[]
    }
}

export const Register = async (prevState:RegisterState,formData:FormData) => {
    const validatedFields = RegisterUserZodSchema.safeParse({
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        confirmpassword: formData.get('confirmpassword') as string,
    })

    if(!validatedFields.success){
        return {
            errors: validatedFields.error.flatten().fieldErrors
        }
    }

    const { email, password } = validatedFields.data

    const emailExist = await sql`
        SELECT FROM gymusers WHERE email = ${email}
    `

    if(emailExist.rows[0]){
        return { 
            errors: {email:['Ten adres email jest zajęty']}
        }
    }

    const hasedPassword = await hash(password,10)
    await sql`
        INSERT INTO gymusers (email,password) VALUES (${email},${hasedPassword})
    `
    return { errors: {}}
}
export const ComparePasswords = async (password:string,hasedPassword:string) => {
    const isCorrect = await compare(password,hasedPassword)
    return isCorrect
}

export const AddExerciseAction = async (redirectUser:boolean,exerciseid:string,sets:Series[],ispartoftraining:boolean,trainingPlanId?:string,) => {
    const user = await auth()
    const userID = user?.user?.id
    if(!userID) return
    const stringDate = JSON.stringify(new Date())

    let arr = [...exercisesArr]
    const userExercises = await getUserExercises()

    userExercises.forEach(item=>{
        arr.push(item.exercisename)
    })

    const AddExerciseZodSchema = z.object({
        exerciseid: z.enum(['Wznosy bokiem',...arr]),
        sets: z.array(z.object({
            weight: z.number(),
            repeat: z.number(),
        })).nonempty('Dodaj minimum jedną serię'),
        ispartoftraining: z.boolean()
    })
    
    const validData = AddExerciseZodSchema.safeParse({
        exerciseid,
        sets,
        ispartoftraining
    })

    if(!validData.success) {
        if(validData.error.flatten().fieldErrors.sets){
            return {
                errors: validData.error.flatten().fieldErrors.sets![0]
            }
        }
        return {
            errors: 'Coś poszło nie tak'
        }
    }
    let trainingid = null
    if(trainingPlanId) trainingid = trainingPlanId
    let id = exerciseid
    if(userExercises[userExercises.findIndex(x=>x.exercisename===exerciseid)]){
        id = userExercises[userExercises.findIndex(x=>x.exercisename===exerciseid)].id
    }

    try{
        await sql`
        INSERT INTO gymexercises (userid,exerciseid,date,sets,ispartoftraining,trainingid,exercisename) VALUES (${userID},${id},${stringDate},${JSON.stringify(sets)},${ispartoftraining},${trainingid},${exerciseid})
        `
    }catch(e){
        console.log('Error occured: AddExerciseAction func actions.ts ',e)
        return {
            errors: 'Coś poszło nie tak'
        }
    }
    if(redirectUser) redirect('/home/add-exercise')
}

export const FistStepDataValidation = (data:dataType) => {
    const validatedFields = FirstSetupZodSchema.safeParse(data)
    if(!validatedFields.success){
        return { error : 'Coś poszło nie tak'}
    }
    return {
        succes: 'Dobre dane'
    }
}

export const SecondStepDataValidation = (exercises:string[]) => {
    let error = false
    exercises.forEach(exercise=>{
        if(!exercisesArr.includes(exercise)) error = true
    })
    if(error){
        return { error: 'Coś poszło nie tak'}
    }
    return {
        succes: 'Wszystko w porządku'
    }
}
export const FirstSetupFinish = async(data:dataType,deleteExercises:string[],favourtiteExercises:string[]) => {
    const user = await auth()
    const userID = user?.user?.id
    const showtempo = data.showtempo.toLowerCase() === 'tak'
    try{
        await sql`
            UPDATE gymusers
            SET goal = ${data.goal}, advancmentlevel = ${data.advancmentlevel}, daysexercising = ${data.daysexercising}, favouriteexercises = ${JSON.stringify(favourtiteExercises)}, notfavouriteexercises= ${JSON.stringify(deleteExercises)}, setupcompleted = true, showtempo = ${showtempo}
            WHERE id = ${userID};
        `
    }catch(e){
        console.log('Error occured FirstSetupFinish func actions.ts',e)
        return { error : 'Coś poszło nie tak'}
    }
    redirect('/home')
}

export const logout = async () => {
    await signOut({redirect:true,redirectTo:'/login'})
}

export const getUserExercises = async () => {
    const user = await auth()
    const userID = user?.user?.id
    let AllExercises = []
    try{
        const exercises = await sql`
        SELECT exercisename,id FROM gymusersexercises WHERE userid = ${userID}
        `
        AllExercises = [...exercises.rows]
    }catch(e){
        console.log('Error occured getUserExercises func actions.ts',e)
        return []
    }
    return AllExercises as UserExercise[]
}

export const AddNewUserExercise = async (exercisename:string,timeExercise:boolean) => {
    const user = await auth()
    const userID = user?.user?.id

    if(exercisename.length>=254){
        return {error : 'Nazwa ćwiczenia jest za długa'}
    }
    if(typeof timeExercise !== 'boolean'){
        return {error: 'Coś poszło nie tak'}
    }
    if( typeof exercisename !== 'string'){
        return {error: 'Coś poszło nie tak'}
    }
    if(exercisesArr.toLocaleString().toLowerCase().includes(exercisename.toLowerCase())){
        return {error: 'Takie ćwiczenie już istnieje'}
    }
    try{
        await sql`
            INSERT INTO gymusersexercises (userid,exercisename,timemesure) VALUES (${userID},${exercisename},${JSON.stringify(timeExercise)})
        `
        revalidatePath('/home/profile/my-exercises')
    }catch(e){
        return {
            error: 'Coś poszło nie tak'
        }
    }
}

export const DeleteUserExercise = async (id:string) => {
    const userid = await userID()
    if(typeof id !== 'string'){
        return {
            error :'Coś poszło nie tak'
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
            if(checkIfIdInTraining(training.exercises.exercises)){
                //IT SEEMS THAT IN THIS TRAINING IS THE ID OF SOON TO DELETE ITEM
                const exercises1 = [...training.exercises.exercises]
                const exercises = exercises1.filter(x=>x.exerciseid!==id)
                await sql`
                    UPDATE gymuserstrainingplans
                    SET exercises = ${JSON.stringify({exercises})}
                    WHERE id = ${training.id};
                `
            }
        })

        await sql`
            DELETE FROM gymusersexercises WHERE id = ${id};
        `
        await sql`
            DELETE FROM gymexercises WHERE exerciseid = ${id}
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

export const EditUserExercise = async (exerciseid:string,newname:string) => {
    if(newname === ''){
        return {error :'Wpisz nową nazwę ćwiczenia'}
    }
    if(typeof exerciseid !== 'string' || typeof newname !== 'string'){
        return {error :'Coś poszło nie tak'}
    }

    try{
        sql`
            UPDATE gymusersexercises
            SET exercisename = ${newname}
            WHERE id = ${exerciseid};
        `
        revalidatePath('/home/profile/my-exercises')
    }catch(e){
        return {
            error :'Coś poszło nie tak'
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
    let TempoError =false
    for(const tempoentry in tempos){
        if(typeof tempos[tempoentry as keyof TempoType] !== 'number'){
            TempoError = true
        }
    }
    return TempoError
}
export const AddNewUserTempo = async (exercicename:string,tempo:TempoType) => {
    const user = await auth()
    const userID = user?.user?.id
    const userExercises = await sql`SELECT exercicename FROM gymusersexercises WHERE userid = ${userID}`
    const allExercises = [...userExercises.rows,...exercisesArr]

    const TempoError = checkTempoErrors(tempo)

    if(TempoError) return {error: 'Something went wrong'}
    if(!tempo) return {error:'Dodaj tempo'}
    if(!allExercises.includes(exercicename)){
        return {error:'Zła nazwa ćwiczenia'}
    }

    try{
        sql`
            INSERT INTO gymuserstempos (userid,exercicename,tempo) VALUES (${userID},${exercicename},${JSON.stringify(tempo)})
        `
    }catch(e){
        return {error:'Coś poszło nie tak'}
    }


}

export const getAllTempos = async () => {
    const user = await auth()
    const userID = user?.user?.id
    try{
        const tempos = await sql`
            SELECT * FROM gymuserstempos WHERE userid = ${userID}
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

    if(typeof exerciceid !== 'string') return { error: "Coś poszło nie tak1" }
    const TempoError = checkTempoErrors(tempos)
    if(TempoError) return { error: "Coś poszło nie tak2" }

    const user = await auth()
    const userID = user?.user?.id

    try{
        const exisingTempo = await sql`
            SELECT 1 FROM gymuserstempos WHERE userid = ${userID} AND exerciseid = ${exerciceid}
        `
        if(exisingTempo.rows.length>0){
            //TEMPO ALREDY EXIST IN DB AND NEEDS TO BE UPDATED
            await sql`
                UPDATE gymuserstempos
                SET tempo = ${JSON.stringify(tempos)}
                WHERE userid = ${userID} AND exerciseid = ${exerciceid};
            `
        }else{
            //TEMPO DONT EXIST IN DB AND NEEDS TO BE CREATED
            await sql`
                INSERT INTO gymuserstempos (userid,exerciseid,tempo) VALUES (${userID},${exerciceid},${JSON.stringify(tempos)})
            `
        }
    }catch(e){
        console.log('Error occured AddOrUpdateTempo func actions.ts',e)
        return { error: "Coś poszło nie tak3" }
    }
    revalidatePath('/home/profile/set-tempo')
}

export const DeleteTempoFromDb = async (exerciceid:string) => {
    if(typeof exerciceid !== 'string') return { error: "Coś poszło nie tak1" }

    const user = await auth()
    const userID = user?.user?.id
    try{
        await sql`
            DELETE FROM gymuserstempos WHERE userid = ${userID} AND exerciseid = ${exerciceid};
        `
    }catch(e){
        return { error: 'Coś poszło nie tak' }
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

export const ExercisesThatRequireTimeMesure = async () => {
    const user = await auth()
    const userID = user?.user?.id
    let TimeMesureExerciseArr:string[] = [...timeMesureExercises]
    try{
        const userExercisesThatRequireTimeMesure = await sql`
        SELECT * FROM gymusersexercises WHERE userid = ${userID} AND timemesure = true
        `
        const rows = userExercisesThatRequireTimeMesure.rows as UserExercise[]
        rows.forEach((item)=>{
            TimeMesureExerciseArr.push(item.exercisename)
        })
        return TimeMesureExerciseArr
    }catch{
        return []
    }

}
export const getAllIdsExercisesInArray = async () => {
    let array = [...exercisesArr]
    const userExercises = await getUserExercises()
    userExercises.forEach(x=>{
        array.push(x.id)
    })

    return array
}

export const getAllExerciseNamesInArray = async () => {
    let array = [...exercisesArr]
    const userExercises = await getUserExercises()
    userExercises.forEach(x=>{
        array.push(x.exercisename)
    })

    return array
}

const checkTrainingFields = async (trainingplanname:string,exercises:TrainingExerciseType[],weekday:WeekDay,userID:string) => {
    if(typeof trainingplanname !== 'string'){
        return {error:'Coś poszło nie tak'}
    }
    if (trainingplanname.length > 255){
        return {error:'Nazwa treningu jest za długa'}
    }
    if(exercises.length <2){
        return {error:'Trening musi miec conajmniej dwa ćwiczenia'}
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
    if(NotStringError) return { error: 'Coś poszło nie tak'}
    if(UnknownExerciseError) return { error: `Nieznane ćwiczenie w liście: "${unknownExercice}"`}
    if(!WeekDayArray.includes(weekday)) return { error: 'Zły dzień tygodnia'}
}

export const GetUserTrainings = async () => {
    const user = await auth()
    const userID = user?.user?.id
    try{
        const UserTrainings = await sql`
            SELECT id,trainingname,date,exercises,weekday FROM gymuserstrainingplans WHERE userid = ${userID}
        `
        return UserTrainings.rows as UserTrainingPlan[]
    }catch(e){
        return []
    }
}

export const GetUserTrainingByName = async (trainingname:string) => {
    if(typeof trainingname !== 'string') return { error: "Coś poszło nie tak"}
    const user = await auth()
    const userID = user?.user?.id

    try{
        const Training = await sql`
            SELECT id,trainingname,date,exercises,weekday FROM gymuserstrainingplans WHERE userid = ${userID} AND trainingname = ${trainingname}
        `
        if(Training.rows.length===0){
            return {
                error: 'Trening o tej nazwie nie istnieje'
            }
        } 
        return {
            training: Training.rows[0] as UserTrainingPlan,
            error: ''
        }
    }catch(e){
        return { error: 'Coś poszło nie tak'}
    }
}
export const AddUserTraining = async (trainingplanname:string,exercises:TrainingExerciseType[],weekday:WeekDay) => {
    const user = await auth()
    const userID = user?.user?.id

    checkTrainingFields(trainingplanname,exercises,weekday,userID as string)

    const date = new Date()
    try{
        await sql`
            INSERT INTO gymuserstrainingplans (userid, trainingname, date, exercises, weekday) VALUES (${userID},${trainingplanname},${JSON.stringify(date)},${JSON.stringify({exercises})},${weekday})
        `
    }catch(e){
        return { error: 'Coś poszło nie tak'}
    }
}
export const CreateUserTraining = async (trainingplanname:string,weekday:WeekDayPL) => {
    const user = await auth()
    const userID = user?.user?.id

    if(typeof trainingplanname !== 'string'){
        return {error:'Coś poszło nie tak1'}
    }
    if (trainingplanname.length > 255){
        return {error:'Nazwa treningu jest za długa'}
    }
    if(!WeekDayArrayPL.includes(weekday)) return { error: 'Zły dzień tygodnia'}

    try{
        const userExercice = await sql`
        SELECT 1 FROM gymuserstrainingplans WHERE userid = ${userID} AND trainingname = ${trainingplanname}
        `
        if(userExercice.rows.length>0){
            return { error: 'Trening o tej nazwie już istnieje, wybierz inną'}
        }
    }catch(e){
        return {error:'Coś poszło nie tak2'}
    }

    const date = new Date()
    const endlishWeekDay = WeekDayArray[WeekDayArrayPL.indexOf(weekday)]
    try{
        await sql`
            INSERT INTO gymuserstrainingplans (userid,trainingname,date,weekday,exercises) VALUES (${userID},${trainingplanname},${JSON.stringify(date)},${endlishWeekDay},${JSON.stringify({})})
        `
    }catch(e){
        console.log('Error occured CreateUserTraining func actions.ts',e)
        return { error: 'Coś poszło nie tak3'}
    }
    revalidatePath('/home/profile/my-training-plans')
}
export const EditUserTraining = async (trainingid:string,trainingplanname:string,exercises:TrainingExerciseType[],weekday:WeekDay) => {
    const user = await auth()
    const userID = user?.user?.id

    const checkvalue = await checkTrainingFields(trainingplanname,exercises,weekday,userID as string)
    if(checkvalue?.error) return  checkvalue
    const date = new Date()
    try{
        await sql`
            UPDATE gymuserstrainingplans
            SET trainingname = ${trainingplanname}, date = ${JSON.stringify(date)}, exercises = ${JSON.stringify({exercises})}, weekday = ${weekday}
            WHERE id = ${trainingid};
        
            `
    }catch(e){
        console.log('Error occured EditUserTraining func actions.ts',e)
        return { error: 'Coś poszło nie tak'}
    }
    revalidatePath('/home/profile/my-training-plans')
    redirect('/home/profile/my-training-plans')
}

export const DeleteUserTraining = async (trainingid:string) => {
    if(typeof trainingid !== 'string') return { error: "Coś poszło nie tak1"}

    try{

        const exercisesIDs = await sql`
        SELECT id FROM gymuserstrainings WHERE trainingid = ${trainingid}
        ` 
        const idsArray = exercisesIDs.rows as {id: string}[]

        await Promise.all(idsArray.map(async item=>{
            await sql`
                DELETE FROM gymexercises WHERE trainingid = ${item.id}
            `
        }))
        await sql`
            DELETE FROM gymuserstrainings WHERE trainingid = ${trainingid};
        `
        await sql`
            DELETE FROM gymuserstrainingplans WHERE id = ${trainingid};
            `
    }catch(e){
        console.log('Error occured DeleteUserTraining func actions.ts',e)
        return { error: 'Coś poszło nie tak2'}
    }
    revalidatePath('/home/profile/my-training-plans')
    redirect('/home/profile/my-training-plans')
}

export const checkTrainingInProgress = async () => {
    const user = await auth()
    const userID = user?.user?.id
    try{
        const trainingInProgress = await sql`
            SELECT 1 FROM gymuserstrainings WHERE userid = ${userID} AND iscompleted = false
        `
        if(trainingInProgress.rows.length>0) return true
        return false
    }catch{
        return false
    }
}

export const userTrainingsList = async () => {
    const user = await auth()
    const userID = user?.user?.id

    try{
        const list = await sql`
            SELECT * FROM gymuserstrainingplans WHERE userid = ${userID}
        `
        return list.rows as UserTrainingPlan[]
    }catch{
        return []
    }
}

export const getTrainingInProgressData = async () => {
    const user = await auth()
    const userID = user?.user?.id
    try{
        const trainingInProgess = await sql`
        SELECT * FROM gymuserstrainings WHERE userid = ${userID} AND iscompleted = false
        `
        const trainingID = trainingInProgess.rows[0].trainingid
        const training = await sql `
            SELECT trainingname FROM gymuserstrainingplans WHERE id = ${trainingID}
        `
        return training.rows[0] as UserTrainingPlan
    }catch{
        return null
    }
}
export const closeTraining = async (redirectToTraining:string) => {
    const user = await auth()
    const userID = user?.user?.id
    try{
        await sql`
            UPDATE gymuserstrainings
            SET iscompleted = true
            WHERE userid = ${userID} AND iscompleted = false ;
        `
    }catch(e){
        console.log('Error occured closeTraining func actions.ts',e)
        return {error: 'Coś poszło nie tak'}
    }finally{
        redirect(redirectToTraining)
    }
}

export const createTraining = async (trainingPlanId:string) => {
    const user = await auth()
    const userID = user?.user?.id
    const date = new Date()

    try{
        const training = await sql`
        INSERT INTO gymuserstrainings (userid,iscompleted,trainingid,datetime) VALUES (${userID},false,${trainingPlanId},${JSON.stringify(date)})
    `
        const trainingID = await sql`
            SELECT id FROM gymuserstrainings WHERE userid = ${userID} ORDER BY datetime DESC LIMIT 1;
        `
        return trainingID.rows[0].id
    }catch(e){
        console.log('Error occured createTraining func actions.ts',e)
    }

}

export const updateCurrentTraining = async (id:string,exercisesLeft: TrainingExerciseType[]) => {
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////CHANGE THIS FUNC OR APP WILL BUG////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////COLUMN RENAMED TO exercisesleft  ////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    let idString: string = ''
    exercisesLeft.forEach((id,index)=>{
        if(index === 0) return
        if(index === exercisesLeft.length-1){
            idString = idString + `'${id.id}'`
            return
        }
        idString = idString + `'${id.id}',`
    })
    console.log(idString)
    try{
        await sql`
            UPDATE gymuserstrainings SET exercisesleft = ARRAY[${idString}] WHERE id=${id}
        `
    }catch(e){
        console.log(e)
    }
}

export const getExistingTraining = async () => {
    const user = await auth()
    const userID = user?.user?.id
    try{
        const training = await sql`
            SELECT * FROM gymuserstrainings WHERE userid = ${userID} AND iscompleted = false
        `
        return training.rows[0] as UserTrainingInProgress
    }catch{

    }
}

export const getLastTrainigs = async (limit:number) => {
    const user = await auth()
    const userID = user?.user?.id

    try{
        const lastTrainings = await sql`
        SELECT gymuserstrainings.trainingid, gymuserstrainings.datetime, gymuserstrainingplans.trainingname, gymuserstrainingplans.weekday
        FROM gymuserstrainings
        INNER JOIN gymuserstrainingplans ON gymuserstrainings.trainingid=gymuserstrainingplans.id 
        WHERE gymuserstrainings.userid = ${userID} ORDER BY datetime DESC LIMIT ${limit};
        `
        return lastTrainings.rows as LastExerciseType[]
    }catch(e){
        console.log('Error occured getLastTrainigs func actions.ts',e)
        return []
    }

}

export const fetchIncomingTrainings = async () => {
    const user = await auth()
    const userID = user?.user?.id

    const today = new Date()

    try{
        const trainings = await sql`
            SELECT * FROM gymuserstrainingplans WHERE userid = ${userID}
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
    const user = await auth()
    const userID = user?.user?.id

    try{
        const lastTrainings = await sql`    
            SELECT gymuserstrainings.id, gymuserstrainings.datetime, gymuserstrainingplans.trainingname FROM gymuserstrainings
            INNER JOIN gymuserstrainingplans ON gymuserstrainings.trainingid = gymuserstrainingplans.id
            WHERE gymuserstrainings.userid = ${userID} AND gymuserstrainings.iscompleted = true ORDER BY datetime DESC LIMIT 2
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

export const checkIfTrainingIsInProgress = async (trainingName:string) => {
    const userid = await userID()

    try{
        const training = await sql`
            SELECT id FROM gymuserstrainingplans WHERE userid = ${userid} AND trainingname = ${trainingName}
        `
        const id = training.rows[0].id
        const isTrainingInProgress = await sql`
            SELECT id FROM gymuserstrainings WHERE userid = ${userid} AND iscompleted = false AND trainingid = ${id}
        `
        if(isTrainingInProgress.rowCount && isTrainingInProgress.rowCount >0) return true
        return false
    }catch{
        return false
    }
}

const userID = async () => {
    const user = await auth()
    return user?.user?.id
}

export const fetchUserExercisesCount = async (from?:Date,to?:Date,exerciseName?:string) => {
    const userid = await userID()
    if( (from && Object.prototype.toString.call(from) !== '[object Date]') || (to && Object.prototype.toString.call(to) !== '[object Date]')){
        return '0'
    }
    if(exerciseName && typeof exerciseName !== 'string') {
        return '0' 
    }
    try{
        if(from && to && exerciseName){
            const count = await sql`
                SELECT COUNT(*) FROM gymexercises WHERE userid = ${userid} AND date <= ${JSON.stringify(addDays(to,1))} AND date >= ${JSON.stringify(from)} AND exercisename = ${exerciseName}
            `
            return count.rows[0].count as string
        }

        if(from && exerciseName){
            const count = await sql`
                SELECT COUNT(*) FROM gymexercises WHERE userid = ${userid} AND date >= ${JSON.stringify(from)} AND exercisename = ${exerciseName}
            `
            return count.rows[0].count as string
        }

        if(to && exerciseName){
            const count = await sql`
                SELECT COUNT(*) FROM gymexercises WHERE userid = ${userid} AND date <= ${JSON.stringify(addDays(to,1))} AND exercisename = ${exerciseName}
            `
            return count.rows[0].count as string
        }
        if(to && from){
            const count = await sql`
                SELECT COUNT(*) FROM gymexercises WHERE userid = ${userid} AND date <= ${JSON.stringify(addDays(to,1))} AND date >= ${JSON.stringify(from)}
            `
            return count.rows[0].count as string
        }
        if(to){
            const count = await sql`
                SELECT COUNT(*) FROM gymexercises WHERE userid = ${userid} AND date <= ${JSON.stringify(addDays(to,1))}
            `
            return count.rows[0].count as string
        }

        if(from){
            const count = await sql`
                SELECT COUNT(*) FROM gymexercises WHERE userid = ${userid} AND date >= ${JSON.stringify(from)}
            `
            return count.rows[0].count as string
        }

        if(exerciseName){
            const count = await sql`
                SELECT COUNT(*) FROM gymexercises WHERE userid = ${userid} AND exercisename = ${exerciseName}
            `
            return count.rows[0].count as string
        }

        //all
        const count = await sql`
            SELECT COUNT(*) FROM gymexercises WHERE userid = ${userid}
        `
        return count.rows[0].count as string
    }catch{
        return '0'
    }
}
export const fetchUserExercises = async (from?:Date,to?:Date,exerciseName?:string,page?:number,limit?:number) => {
    const userid = await userID()

    if(!page) page = 0
    if(!limit) limit = 20

    let unsortedExerciseArray:ExerciseType[] = []

    if( (from && Object.prototype.toString.call(from) !== '[object Date]') || (to && Object.prototype.toString.call(to) !== '[object Date]')){
        unsortedExerciseArray = [] as ExerciseType[]
    }
    if(exerciseName && typeof exerciseName !== 'string') {
       unsortedExerciseArray = [] as ExerciseType[]
    }
    try{
        //TODO MAKE SEPARATE FUNCTION FOR FETCHING COUNT
        if(from && to && exerciseName){
            const exercises = await sql`
                SELECT id,exercisename,date,sets FROM gymexercises WHERE userid = ${userid} AND date <= ${JSON.stringify(addDays(to,1))} AND date >= ${JSON.stringify(from)} AND exercisename = ${exerciseName} ORDER BY date DESC LIMIT ${limit} OFFSET ${page*limit}
            `
            unsortedExerciseArray = exercises.rows as ExerciseType[]
        }

        if(from && exerciseName){
            const exercises = await sql`
                SELECT id,exercisename,date,sets FROM gymexercises WHERE userid = ${userid} AND date >= ${JSON.stringify(from)} AND exercisename = ${exerciseName} ORDER BY date DESC LIMIT ${limit} OFFSET ${page*limit}
            `
            unsortedExerciseArray = exercises.rows as ExerciseType[]
        }

        if(to && exerciseName){
            const exercises = await sql`
                SELECT id,exercisename,date,sets FROM gymexercises WHERE userid = ${userid} AND date <= ${JSON.stringify(addDays(to,1))} AND exercisename = ${exerciseName} ORDER BY date DESC LIMIT ${limit} OFFSET ${page*limit}
            `
            unsortedExerciseArray = exercises.rows as ExerciseType[]
        }
        if(to && from){
            const exercises = await sql`
                SELECT id,exercisename,date,sets FROM gymexercises WHERE userid = ${userid} AND date <= ${JSON.stringify(addDays(to,1))} AND date >= ${JSON.stringify(from)} ORDER BY date DESC LIMIT ${limit} OFFSET ${page*limit}
            `
            unsortedExerciseArray = exercises.rows as ExerciseType[]
        }
        if(to){
            const exercises = await sql`
                SELECT id,exercisename,date,sets FROM gymexercises WHERE userid = ${userid} AND date <= ${JSON.stringify(addDays(to,1))} ORDER BY date DESC LIMIT ${limit} OFFSET ${page*limit}
            `
            unsortedExerciseArray = exercises.rows as ExerciseType[]
        }

        if(from){
            const exercises = await sql`
                SELECT id,exercisename,date,sets FROM gymexercises WHERE userid = ${userid} AND date >= ${JSON.stringify(from)} ORDER BY date DESC LIMIT ${limit} OFFSET ${page*limit}
            `
            unsortedExerciseArray = exercises.rows as ExerciseType[]
        }

        if(exerciseName){
            const exercises = await sql`
            SELECT id,exercisename,date,sets FROM gymexercises WHERE userid = ${userid} AND exercisename = ${exerciseName} ORDER BY date DESC LIMIT ${limit} OFFSET ${page*limit}
            `
            unsortedExerciseArray = exercises.rows as ExerciseType[]
        }
        const exercises = await sql`
            SELECT id,exercisename,date,sets FROM gymexercises WHERE userid = ${userid} ORDER BY date DESC LIMIT ${limit} OFFSET ${page*limit}
        `
        unsortedExerciseArray = exercises.rows as ExerciseType[]

        return unsortedExerciseArray as ExerciseType[]
    }catch(e){
        console.log('Error occured fetchUserExercises func actions.ts',e)
        return [] as ExerciseType[]
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

    const { advancmentlevel, daysexercising, favouriteexercises, goal, notfavouriteexercises, showtempo } = newSettings

    let goalcopy = false
    showtempo===null ? goalcopy = false : goalcopy = true
    if(typeof goal !== 'string' || !goalArr.includes(goal)) return
    if(typeof advancmentlevel !== 'string' || !advancmentlevelArr.includes(advancmentlevel)) return
    if(typeof daysexercising !== 'string' || !daysexercisingArr.includes(daysexercising)) return

    if(favouriteexercises){
        for(let i = 0 ; i< favouriteexercises.length ; i++ ){
            if(!exercisesArr.includes(favouriteexercises[i])) return
        }
    }
    if(notfavouriteexercises){
        for(let i = 0 ; i< notfavouriteexercises.length ; i++ ){
            if(!exercisesArr.includes(notfavouriteexercises[i])) return
        }
    }
    
    try{
        await sql`
            UPDATE gymusers SET showtempo = ${showtempo}, goal = ${goal}, advancmentlevel = ${advancmentlevel}, daysexercising = ${daysexercising}, favouriteexercises = ${JSON.stringify(favouriteexercises)}, notfavouriteexercises = ${JSON.stringify(notfavouriteexercises)}  WHERE id = ${userid}
        `
        return {
            error: false
        }
    }catch(e){
        console.log('Error occured saveNewUserSetting func actions.ts',e)
        return {
            error: 'Coś poszło nie tak'
        }
    }
}

export const updateingRows = async () => {
    const rows = await sql`
        SELECT id,sets FROM gymexercises
    `
    console.log(rows.rows[0].sets)

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

    if(typeof password!== 'string' || typeof newpassword!== 'string' || typeof repeatnewpassword!== 'string') return
    if(newpassword!==repeatnewpassword) return {error: 'Hasła różnią się'}
    if(newpassword.length<8) return {error: 'Hasło powinno mieć conajmniej 8 znaków'}
    let userEncryptedPassword
    try{
        const userData = await sql`
            SELECT password FROM gymusers WHERE id = ${userid}
        `
    userEncryptedPassword = userData.rowCount && userData.rowCount > 0 ? userData.rows[0].password : null
    }catch(e){
        return {error: 'Coś poszło nie tak'}
    }

    if(!userEncryptedPassword) return {error: 'Coś poszło nie tak'}
    const isPasswordCorrect = await ComparePasswords(password,userEncryptedPassword)
    if(!isPasswordCorrect) return {error: 'Złe hasło'}

    const hasedPassword = await hash(newpassword,10)
    try{
        await sql`
            UPDATE gymusers SET password = ${hasedPassword} WHERE id = ${userid}
        `
    }catch{
        return {error: 'Coś poszło nie tak'}
    }

}