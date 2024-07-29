"use server"
import { auth, signIn } from "@/auth";
import { compare, hash } from 'bcryptjs'
import z from 'zod'
import { RegisterUserZodSchema } from "@/app/lib/schemas";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import net from "net";
type State = {
    succes?: boolean
}
export const Login = async (prevState:State,formData:FormData) => {
    try{
        await signIn('credentials',formData)
    }catch(e){
        console.log(e)
    }
    
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
