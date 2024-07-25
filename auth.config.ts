import type { NextAuthConfig } from "next-auth"
import credentials from "next-auth/providers/credentials"
import { LoginSchema } from "./app/lib/schemas"
import { getUser } from "./app/lib/getUserDb"
import { compare } from "bcryptjs"
 
export default { providers: [ 
    credentials({
        credentials:{
        email: {},
        password: {}
        },
        authorize: async (credentials) => {
        
        const validatedFields = LoginSchema.safeParse(credentials)
        if(!validatedFields.success) return null

        const { email, password } = validatedFields.data
        let user = await getUser(email)
        if(!user) return null

        const correctPassword = await compare(password,user.password)
        if(!correctPassword) return null

        console.log(user)
        //compare passwords,
        //check if user exists
        return user
        }

    })
]} satisfies NextAuthConfig