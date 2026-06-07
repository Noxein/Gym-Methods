import NextAuth, { DefaultSession } from "next-auth"
import authConfig from '@/auth.config'
import { getTempo } from "./app/lib/sql"
import { Settings, UserPurposeType } from "./app/types"
 
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
    async jwt({ token, user, trigger, session }) {

      if (user) {
        token.sub = user.id
        token.setupcompleted = user.setupcompleted
        token.purpose = user.purpose
        token.trainercurrentaccounttype = user.trainercurrentaccounttype
        token.username = user.username,
        token.settings = user.settings
      }

      if (
        token.sub &&
        (token.setupcompleted === undefined ||
          token.purpose === undefined ||
          token.trainercurrentaccounttype === undefined ||
          token.username === undefined ||
          token.settings === undefined)
      ) {
        const data = await getTempo(token.sub)
        if (data) {
          token.setupcompleted = data.setupcompleted
          token.purpose = data.purpose
          token.trainercurrentaccounttype = data.trainercurrentaccounttype
          token.username = data.username
          token.settings = data.settings
        }
      }

      if (trigger === 'update' && token.sub) {
        const data = await getTempo(token.sub)
        console.log('Updating session for user:', token.sub, data)
        if (data) {
          token.setupcompleted = data.setupcompleted
          token.purpose = data.purpose
          token.trainercurrentaccounttype = data.trainercurrentaccounttype
          token.username = data.username
          token.settings = data.settings
        }
      }

      return token
    },
    async session({token,session}) {
      session.user.id = token.sub as string
      session.user.setupcompleted = token.setupcompleted as boolean
      session.user.purpose = token.purpose as UserPurposeType
      session.user.trainercurrentaccounttype = token.trainercurrentaccounttype as string | null
      session.user.username = token.username as string
      session.user.settings = token.settings as Settings
      return {...session}
    },
  }
  
})

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      setupcompleted?: boolean;
      purpose?: UserPurposeType;
      trainercurrentaccounttype?: string | null;
      username: string;
      settings?: Settings;
    } & DefaultSession["user"]
  }

  interface User {
    id: string;
    showTempo?: string;
    setupcompleted?: boolean;
    purpose?: UserPurposeType;
    trainercurrentaccounttype?: string | null;
    username: string;
    settings?: Settings;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    setupcompleted?: boolean;
    purpose?: UserPurposeType;
    trainercurrentaccounttype?: string | null;
    username?: string;
    settings?: Settings;
}
}
