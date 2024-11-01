/**
 * Array of routes available for public, dont require auth
 * @type {string[]}
 */
// export const publicRoutes = ["/", "/settings"];
export const publicRoutes = [
  '/',
  '/auth/email-change-verification',
  // '/explore',
  // '/learn',
  '/job',
  '/repositories',
  '/problemsets'
  // "/home",
]
/**
 * routes for authentication, these will redirect user to /settings
 */
export const authRoutes = ['/auth/login', '/auth/register']

/**
 * prefix  for api authentication routes, this is never blocked. These routes are used for api authentication purposes
 * @type {string}
 */
export const apiAuthRoutePrefix = '/api/auth'
/**
 * Default redirect path
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT_URL = '/settings'
