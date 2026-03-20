import NextAuth from "next-auth"
import authConfig from '@/auth.config'
import { getTempo } from "./app/lib/sql"
import { UserPurposeType } from "./app/types"
 
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
    async jwt({token,session}) { 
      const data = await getTempo(token.sub as string)
      if(!data) return token
      token.setupcompleted = data.setupcompleted
      token.purpose = data.purpose
      token.trainercurrentaccounttype = data.trainercurrentaccounttype
      return {...token}
    },
    async session({token,session}) {
      session.user.id = token.sub as string
      session.user.setupcompleted = token.setupcompleted as boolean
      session.user.purpose = token.purpose as UserPurposeType
      session.user.trainercurrentaccounttype = token.trainercurrentaccounttype as string | null
      return {...session}
    },
  }
  
})

declare module "next-auth" {
  interface User {
    // Add your additional properties here:
    showTempo?: string;
    setupcompleted?: boolean;
    purpose?: UserPurposeType;
    trainercurrentaccounttype?: string | null;
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser {
    // Add your additional properties here:
    showTempo: string;
    setupcompleted?: boolean;
    purpose?: UserPurposeType;
    trainercurrentaccounttype?: string | null;
  }
}