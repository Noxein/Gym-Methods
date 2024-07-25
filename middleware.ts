
import { DEFAULT_LOGIN_REDIRECT, authRoutes, publicRoutes, apiAuthPrefix } from './routes';
import NextAuth from 'next-auth';
import authConfig from './auth.config';

const { auth } = NextAuth(authConfig)

export default auth((req) =>{
    const isLoggedIn = !!req.auth;
    const { nextUrl } = req;
    
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)

    if(isApiAuthRoute){
        return
    }

    if(isAuthRoute){
        if(isLoggedIn){
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT,nextUrl))
        }
        return
    }

    if(!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL('/login',nextUrl))
    }

    return
})

export const config = {
    matcher: [
        '/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'
    ]
}