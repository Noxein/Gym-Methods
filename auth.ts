import NextAuth from "next-auth"
import authConfig from '@/auth.config'
import { getTempo } from "./app/lib/sql"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  // pages:{
  //   signIn :'/login'
  // },
  session: {
    strategy: 'jwt'
  },
  ...authConfig,
  callbacks:{
    async jwt({token,session}) {
      const shouldShowTempo = await getTempo(token.sub as string)
      token.showTempo = shouldShowTempo
      return {...token}
    },
    async session({token,session}) {
      
      session.user.id = token.sub as string
      session.user.showTempo = token.showTempo as string
      return {...session}
    },
  }
  
})

declare module "next-auth" {
  interface User {
    // Add your additional properties here:
    showTempo?: string;
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser {
    // Add your additional properties here:
    showTempo: string;
  }
}