/**
 * An array of routes that are accesible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [   
    '/'
] 

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to homepage
 * @type {string[]}
 */
export const authRoutes = [
    '/login',
    '/register'
]
/**
 * The array for API authentication routes used by next-auth
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = ['/api/auth','/api/auth/session']
/**
 * An default redirect if user is logged in
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = '/home'

/**
 * An array of routes that are protected,
 * If user is not logged in it will redirect user to login page
 * @type {string[]}
 */
export const protectedRoutes = [
    '/home',
]