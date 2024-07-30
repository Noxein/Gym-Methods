import z from 'zod'
import { exercisesArr } from '@/app/lib/exercise-list'

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

export const RegisterUserZodSchema = z.object({
    email: z.string().email('Niepoprawny adres email'),
    password: z.string().min(8,'Hasło powinno się składać z minimum 8 znaków'),
    confirmpassword: z.string(),
}).refine((data)=>data.password === data.confirmpassword,{
    message: "Hasła różnią się",
    path: ["confirmpassword"]
})

export const AddExerciseZodSchema = z.object({
    exercicename: z.enum(['Wznosy bokiem',...exercisesArr]),
    sets: z.array(z.object({
        weight: z.number(),
        repeat: z.number(),
    })).nonempty('Dodaj minimum jedną serię'),
    diffucultyLevel: z.enum(['easy','medium','hard']),
    ispartoftraining: z.boolean()
})