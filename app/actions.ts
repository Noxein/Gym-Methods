"use server"
import { auth, signIn } from "@/auth";
import { compare, hash } from 'bcryptjs'
import { AddExerciseZodSchema, FirstSetupZodSchema, RegisterUserZodSchema } from "@/app/lib/schemas";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { ExerciceTypes, Series, TempoType, UserExercise, UserExerciseTempo } from "@/app/types";
import { dataType } from "./components/first-setup/SetupOneOfThree";
import { exerciseList, exercisesArr } from "./lib/exercise-list";
import { signOut } from "@/auth";
import { revalidatePath } from "next/cache";

type State = {
    succes?: boolean
}
export const Login = async (prevState:State,formData:FormData) => {
    try{
        await signIn('credentials',formData)
    }catch(e){
        console.log(e)
    }

    revalidatePath('/home')
    redirect('/home')
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
}
export const ComparePasswords = async (password:string,hasedPassword:string) => {
    const isCorrect = await compare(password,hasedPassword)
    return isCorrect
}

export const AddExerciseAction = async (exercicename:string,sets:Series[],diffucultyLevel:string,ispartoftraining:boolean) => {
    //TODO fetch user id in auth
    const user = await auth()
    console.log('USER FORM ACTIONS!',user)
    const userID = user?.user?.id
    if(!userID) return
    const stringDate = JSON.stringify(new Date())
    const setsObject = {
        sets,
        diffucultyLevel
    }
    const validData = AddExerciseZodSchema.safeParse({
        exercicename,
        sets,
        diffucultyLevel,
        ispartoftraining,
    })
    if(!validData.success) {
        console.log('WRONG DATA!', validData.error.flatten().fieldErrors)
        if(validData.error.flatten().fieldErrors.sets){
            return {
                errors: validData.error.flatten().fieldErrors.sets![0]
            }
        }
        return {
            errors: 'Coś poszło nie tak'
        }
    }

    try{
        await sql`
        INSERT INTO gymexercises (userid,exercicename,date,sets,ispartoftraining) VALUES (${userID},${exercicename},${stringDate},${JSON.stringify(setsObject)},${ispartoftraining})
        `
    }catch(e){
        console.log('Error occured: ',e)
        return {
            errors: 'Coś poszło nie tak'
        }
    }
    redirect('/home/add-exercise')
}

export const FistStepDataValidation = (data:dataType) => {
    const validatedFields = FirstSetupZodSchema.safeParse(data)
    if(!validatedFields.success){
        console.log(validatedFields.error)
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
    console.log(data)
    try{
        await sql`
            UPDATE gymusers
            SET goal = ${data.goal}, advancmentlevel = ${data.advancmentlevel}, daysexercising = ${data.daysexercising}, favouriteexercises = ${JSON.stringify(favourtiteExercises)}, notfavouriteexercises= ${JSON.stringify(deleteExercises)}, setupcompleted = true
            WHERE id = ${userID};
        `
    }catch(e){
        console.log(e)
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
        console.log(e)
        return []
    }
    return AllExercises as UserExercise[]
}

export const AddNewUserExercise = async (exercisename:string) => {
    const user = await auth()
    const userID = user?.user?.id

    if(exercisename.length>=254){
        return {error : 'Nazwa ćwiczenia jest za długa'}
    }
    if( typeof exercisename !== 'string'){
        return {error: 'Coś poszło nie tak'}
    }
    if(exercisesArr.toLocaleString().toLowerCase().includes(exercisename.toLowerCase())){
        return {error: 'Takie ćwiczenie już istnieje'}
    }
    try{
        await sql`
            INSERT INTO gymusersexercises (userid,exercisename) VALUES (${userID},${exercisename})
        `
        revalidatePath('/home/profile/my-exercises')
    }catch(e){
        return {
            error: 'Coś poszło nie tak'
        }
    }
}

export const DeleteUserExercise = async (id:string) => {
    if(typeof id !== 'string'){
        return {
            error :'Coś poszło nie tak'
        }
    }
    try{
        sql`
            DELETE FROM gymusersexercises WHERE id = ${id};
        `
        revalidatePath('/home/profile/my-exercises')
    }catch(e){
        return {
            error :'Coś poszło nie tak'
        }
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
            SET exercicename = ${newname}
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
        return exerciseList as ExerciceTypes
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
        console.log(e)
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