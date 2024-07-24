import z from 'zod'

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