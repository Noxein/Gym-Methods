import { CredentialsSignin, type NextAuthConfig } from "next-auth"
import credentials from "next-auth/providers/credentials"
import { LoginSchema } from "./app/lib/schemas"
import { getUser } from "./app/lib/getUserDb"
import { compare } from "bcryptjs"
import { ZodError } from "zod"


export default { providers: [ 
    credentials({ 
        credentials: {
            email: {},
            password: {},
          },
        async authorize(credentials){
            try{
                if(credentials === null) return null
                let user = null
    
                const { email, password } = await LoginSchema.parseAsync(credentials)
        
    
                user = await getUser(email)
                if(!user){
                    throw new Error("Użytkownik nie znaleziony")
                }
                
                const correctPassword = await compare(password,user.password)
                if(!correctPassword) throw new Error("Coś poszło nie tak")
                
                return user
            }catch(error){
                if (error instanceof ZodError) {
                    // Return `null` to indicate that the credentials are invalid
                    return null
                  }
                  return null
            }

        }
    })
]} satisfies NextAuthConfig