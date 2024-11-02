import { z } from 'zod'

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure
} from '@/server/api/trpc'
import { $Enums } from '@repo/database'

export const dSAProblemSetRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`
      }
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        problemSetType: z.string().min(1)
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.repository.create({
        data: {
          title: input.title,
          description: input.description,
          creatorId: ctx.session.user.id,
          type: $Enums.RepositoryType.PROBLEM_SET,
          creatorName: '',
          // creatorName: ctx.session.user.name,
          // createdBy: { connect: { id: ctx.session.user.id } },

          // companyTags: input.companyTags,
          // topicTags: input.topicTags,
          companyTags: [],
          topicTags: [],

          // itemCount: 0,
          // sectionCount: 0,
          likeCount: 0,
          commentCount: 0
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

  getSecretMessage: protectedProcedure.query(() => {
    return 'you can now see this secret message!'
  })
})
