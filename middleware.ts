
import { DEFAULT_LOGIN_REDIRECT, authRoutes, publicRoutes, apiAuthPrefix } from './routes';
import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { auth as mainauth } from '@/auth'

const { auth } = NextAuth(authConfig)

export default auth(async(req) =>{
    const isLoggedIn = !!req.auth;
    const { nextUrl } = req;
    const user = await mainauth()

    if(nextUrl.pathname === '/'){
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT,nextUrl))
    }

    const isApiAuthRoute = apiAuthPrefix.includes(nextUrl.pathname)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)

    const isSetupRoute = nextUrl.pathname.includes('/first-setup')
    const isSetupCompleted = user?.user?.setupcompleted

    if(isApiAuthRoute){
        return
    }
    if(!isLoggedIn && isAuthRoute) return

    if(!isLoggedIn && !isAuthRoute){
        return Response.redirect(new URL('/login',nextUrl))
    }

    if(!isSetupCompleted && !isSetupRoute){
        return Response.redirect(new URL('/first-setup',nextUrl))
    }

    if(isAuthRoute && isLoggedIn){
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT,nextUrl))
    }


    if(isSetupRoute && isSetupCompleted){
        return Response.redirect(new URL('/home',nextUrl))
    }
    return
})

export const config = {
    matcher: [
        '/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'
    ]
}