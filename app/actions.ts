"use server"
import { auth, signIn } from "@/auth";
import { compare, hash } from 'bcryptjs'
import { AddExerciseZodSchema, FirstSetupZodSchema, RegisterUserZodSchema } from "@/app/lib/schemas";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { Series } from "@/app/types";
import { dataType } from "./components/first-setup/SetupOneOfThree";
import { exercisesArr } from "./lib/exercise-list";
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