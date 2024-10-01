import { postRouter } from '@/server/api/routers/post'
import { createCallerFactory, createTRPCRouter } from '@/server/api/trpc'
import { dSAProblemSetRouter } from './routers/dsa-problem-sets'
import { problemRouter } from './routers/problem'
import { repositoryRouter } from './routers/repository'
import { repositoryItemRouter } from './routers/repository-item'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  dsaProblemSet: dSAProblemSetRouter,
  problem: problemRouter,
  repository: repositoryRouter,
  repositoryItem: repositoryItemRouter
})

// export type definition of API
export type AppRouter = typeof appRouter

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter)
