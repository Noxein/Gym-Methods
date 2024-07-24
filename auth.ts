import NextAuth from "next-auth"
import credentials from "next-auth/providers/credentials"
import { getUser } from "./app/lib/getUserDb"
import { LoginSchema } from "./app/lib/schemas"
import { ComparePasswords } from "./app/actions"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  // pages:{
  //   signIn :'/login'
  // },
  providers: [
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

        const correctPassword = await ComparePasswords(password,user.password)
        if(!correctPassword) return null

        console.log(user)
        //compare passwords,
        //check if user exists
        return user
      }

    })
  ],
  
})