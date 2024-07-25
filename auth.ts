import NextAuth from "next-auth"
import authConfig from '@/auth.config'
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  // pages:{
  //   signIn :'/login'
  // },
  session: {
    strategy: 'jwt'
  },
  ...authConfig,

  
})