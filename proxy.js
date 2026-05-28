
import { DEFAULT_LOGIN_REDIRECT, authRoutes, publicRoutes, apiAuthPrefix, trainerRoutes } from './routes';
import { auth } from '@/auth'
import { NextResponse } from 'next/server';

export default auth(async(req) =>{
    const isLoggedIn = !!req.auth;
    const { nextUrl } = req;
    const user = req.auth

    const isTrainer = user?.user?.purpose === "Trener"

    if(nextUrl.pathname === '/'){
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT,nextUrl))
    }
    
    if (req.nextUrl.pathname.startsWith("/api")) {
        return NextResponse.next();
    }

    const isApiAuthRoute = apiAuthPrefix.includes(nextUrl.pathname)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)
    const isTrainerRoute = trainerRoutes.includes(nextUrl.pathname)

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

    if(isTrainerRoute && !isTrainer){
        return Response.redirect(new URL('/home',nextUrl))
    }

    if(isSetupRoute && isSetupCompleted){
        return Response.redirect(new URL('/home',nextUrl))
    }
    return
})

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|manifest.webmanifest).*)",
    ]
}
