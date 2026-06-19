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
                console.log("authorize called with credentials:", credentials)
                if(credentials === null) return null
                let user = null
    
                const { email, password } = await LoginSchema.parseAsync(credentials)
                const normalizedEmail = email.trim().toLowerCase()
        
                const result = await getUser(normalizedEmail)
                if(!result){
                    console.log("User not found")
                    throw new Error("Użytkownik nie znaleziony")
                }
                
                user = result.user
                
                const correctPassword = await compare(password,result.password)
                if(!correctPassword) {
                    console.log("Incorrect password", password, result.password)
                    throw new Error("Coś poszło nie tak")
                }
                
                return user
            }catch(error){
                console.error("Error in authorize function:", error)
                if (error instanceof ZodError) {
                    // Return `null` to indicate that the credentials are invalid
                    return null
                  }
                  return null
            }

        }
    })
]} satisfies NextAuthConfig