import NextAuth from "next-auth"
import authConfig from '@/auth.config'
import { getTempo } from "./app/lib/sql"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  pages:{
    signIn :'/login',
  },
  session: {
    strategy: 'jwt'
  },
  ...authConfig,
  callbacks:{

    async session({token,session}) {
      session.user.id = token.sub as string
      session.user.setupcompleted = token.setupcompleted as boolean
      return {...session}
    },
  }
  
})

declare module "next-auth" {
  interface User {
    // Add your additional properties here:
    showTempo?: string;
    setupcompleted?: boolean;
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser {
    // Add your additional properties here:
    showTempo: string;
    setupcompleted?: boolean;
  }
}