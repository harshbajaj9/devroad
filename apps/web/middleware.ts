// TODO: This was a workaround for edge runtime compatibility of prisma, which is now edge compatible, check if the below code has tobe removed
import { authConfig } from '@/auth.config'
import NextAuth from 'next-auth'
const { auth } = NextAuth(authConfig)

// Using the below code as Prisma is also edge compatible now (since next middleware is edge compatible)
// import { auth } from "@/auth";
import {
  apiAuthRoutePrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT_URL,
  publicRoutes
} from './routes'

export default auth(req => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  // console.log("is logged in:", isLoggedIn);
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthRoutePrefix)
  const isTrpcRoute = nextUrl.pathname.startsWith('/api/trpc')
  const isPublicRoute =
    publicRoutes.includes(nextUrl.pathname) ||
    // nextUrl.pathname.startsWith('/learn') ||
    nextUrl.pathname.startsWith('/problemsets') ||
    nextUrl.pathname.startsWith('/repositories')
  // TODO: check above condition, basically I want all /learn/subroute routes to be public
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoute || isTrpcRoute) return

  if (isAuthRoute) {
    if (isLoggedIn)
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT_URL, nextUrl))
    return
  }

  if (!isLoggedIn && !isPublicRoute)
    return Response.redirect(new URL('/auth/login', nextUrl))

  return
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)'
  ]
}
