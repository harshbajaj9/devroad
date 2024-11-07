import { z } from 'zod'

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure
} from '@/server/api/trpc'
import { $Enums } from '@repo/database'
import { JsonEditorInputSchema } from '@/zod/editorschema'

export const problemRouter = createTRPCRouter({
  getAllProblems: publicProcedure
    .input(
      z.object({
        page: z.number().optional(),
        pageSize: z.number().optional()
      })
    )
    .query(async ({ ctx, input }) => {
      const page = input?.page ?? 1
      const pageSize = input?.pageSize ?? 20
      const problemsCount = await ctx.db.problem.count({
        where: {
          platform: $Enums.Platform.LC,
          // category: {
          //   has: $Enums.ProblemCategory.DSA
          // }
          category: $Enums.ProblemCategory.DSA
        }
      })
      const problems = await ctx.db.problem.findMany({
        where: {
          platform: $Enums.Platform.LC,
          // category: {
          //   has: $Enums.ProblemCategory.DSA
          // }
          category: $Enums.ProblemCategory.DSA
        },
        select: {
          id: true,
          title: true,
          url: true,
          platform: true,
          difficulty: true,
          category: true
          //   logo: true,
          //   name: true,
          //   domain: true,
          //   metrics__employees_range: true,
          //   metrics__estimated_annual_revenue: true,
          //   category__industry: true,
          //   visitor_company: {
          //     where: {
          //       workspace_id: workspaceId
          //     },
          //     select: {
          //       last_visited: true
          //     }
          //   },
          //   ip_address: {
          //     select: {
          //       ip_address: true,
          //       first_seen: true,
          //       visitor_sessions: {
          //         select: {
          //           id: true,
          //           session_start: true,
          //           visitor_device_id: true
          //         }
          //       }
          //     }
          //   }
        },
        skip: (page - 1) * pageSize, // Calculate how many records to skip
        take: pageSize
      })

      // TODO: see if needed
      // for (const problem of problems) {
      //   const userItemData = await ctx.db.userItemData.findUnique({
      //     where: {
      //       userId_referenceId: {
      //         referenceId: problem.id,
      //         userId: ctx.session.user.id
      //       }
      //     }
      //   })
      //   problem['status'] = userItemData?.lastStatus
      // }

      console.log('>>', problems)
      return {
        problemsCount,
        totalPages: Math.ceil(problemsCount / pageSize),
        problems
      }
    }),
  searchProblems: protectedProcedure
    .input(
      z.object({
        page: z.number().optional(),
        pageSize: z.number().optional(),
        // tabScope: z.string().optional(),
        searchQuery: z.string().optional()
      })
    )
    .query(async ({ ctx, input }) => {
      // const userId = ctx.session.user.id
      // const user = userId ? await clerkClient.users.getUser(userId) : null
      // const demoMode = user?.unsafeMetadata?.demo_mode

      const page = input?.page ?? 1
      const pageSize = input?.pageSize ?? 10
      // const tabScope = input?.tabScope ?? 'all'
      const searchQuery = input?.searchQuery ?? ''

      // for weekly companies
      // const currentDate = new Date()
      // const startDate = startOfWeek(currentDate, { weekStartsOn: 1 })
      // const startDateOfWeek = setHours(startDate, 0)

      const searchedProblems = await ctx.db.problem.findMany({
        where: {
          title: {
            contains: searchQuery,
            mode: 'insensitive'
          }
        },
        skip: (page - 1) * pageSize,
        take: pageSize
      })
      let totalRecords = searchedProblems.length
      const totalPages = Math.ceil(totalRecords / pageSize)
      return {
        totalPages,
        currentPage: page,
        problems: searchedProblems,
        totalRecords
      }
    }),
  // NOTE: only searches by title
  searchProblemsByIdOrTitle: protectedProcedure
    .input(
      z.object({
        searchQuery: z.string().optional()
      })
    )
    .query(async ({ ctx, input }) => {
      // const userId = ctx.session.user.id
      // const user = userId ? await clerkClient.users.getUser(userId) : null
      // const demoMode = user?.unsafeMetadata?.demo_mode

      const page = 1
      const pageSize = 10
      // const tabScope = input?.tabScope ?? 'all'
      const searchQuery = input?.searchQuery ?? ''

      // const searchedProblemById = await ctx.db.problem.findUnique({
      //   where: {
      //     id: input.searchQuery
      //   }
      // })
      // if (searchedProblemById) {
      //   return { problems: [searchedProblemById] }
      // }
      const searchedProblems = await ctx.db.problem.findMany({
        where: {
          title: {
            contains: searchQuery,
            mode: 'insensitive'
          }
        },
        skip: (page - 1) * pageSize,
        take: pageSize
      })

      return {
        problems: searchedProblems
      }
    }),
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.create({
        data: {
          name: input.name,
          createdBy: { connect: { id: ctx.session.user.id } }
        }
      })
    }),

  getLatest: protectedProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.post.findFirst({
      orderBy: { createdAt: 'desc' },
      where: { createdBy: { id: ctx.session.user.id } }
    })

    return post ?? null
  }),
  updateProblemDescription: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        content: JsonEditorInputSchema
      })
    )
    .mutation(async ({ ctx, input }) => {
      const problem = await ctx.db.problem.update({
        where: {
          id: input.id
        },
        data: {
          description: input.content
        }
      })
      return problem
    }),
  getSecretMessage: protectedProcedure.query(() => {
    return 'you can now see this secret message!'
  })
})
