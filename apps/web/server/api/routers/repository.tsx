import { z } from 'zod'

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure
} from '@/server/api/trpc'
import { $Enums } from '@repo/database'
import { TRPCError } from '@trpc/server'
import cuid from 'cuid'
import { notFound } from 'next/navigation'
import { getItems } from './utils/repository-item-utils'

export const repositoryRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string().optional(),
        type: z.enum(
          // Object.values($Enums.CollectionType) as [string, ...string[]]
          ['PROBLEM_SET', 'ROADMAP', 'COLLECTION']
        )
      })
    )
    .mutation(async ({ ctx, input }) => {
      // const page = input?.page ?? 1
      // const pageSize = input?.pageSize ?? 20

      // how to handle this? throw unauthorized error, do I need this? if it is a protected procedure
      if (!ctx.session || !ctx.session.user || !ctx.session.user.name) {
        throw new TRPCError({
          message: 'Unauthorized',
          code: 'BAD_REQUEST'
        })
      }

      const collection = await ctx.db.repository.create({
        data: {
          // id:
          //   input.title
          //     .toLowerCase()
          //     .replace(/ /g, '-')
          //     .replace(/[-]+/g, '-')
          //     .replace(/[^\w-]+/g, '') +
          //   '-' +
          //   cuid(),
          title: input.title,
          description: input.description,
          type: input.type,
          creatorId: ctx.session.user.id,
          creatorName: ctx.session.user.name,
          creatorWebsiteLink: ctx.session.user.websiteLink
        }
      })

      return collection
    }),

  get: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input: repositoryId }) => {
      // const post = await ctx.db.post.findFirst({
      //   orderBy: { createdAt: 'desc' },
      //   where: { createdBy: { id: ctx.session.user.id } }
      // })
      const repository = await ctx.db.repository.findUnique({
        where: { id: repositoryId }
      })
      if (!repository) {
        return notFound()
      }

      // const repositoryItems = await ctx.db.repositoryItem.findMany({
      //   where: { parentId: repository.id }
      // })
      const userId = ctx.session?.user.id
      // console.log(repository, userId, 'hit>')
      return getItems({ node: repository, userId })
    }),

  getUserRepositories: protectedProcedure.query(async ({ ctx }) => {
    // const post = await ctx.db.post.findFirst({
    //   orderBy: { createdAt: 'desc' },
    //   where: { createdBy: { id: ctx.session.user.id } }
    // })
    const userId = ctx.session?.user.id
    const repositories = await ctx.db.repository.findMany({
      where: { creatorId: userId }
    })

    // const repositoryItems = await ctx.db.repositoryItem.findMany({
    //   where: { parentId: repository.id }
    // })
    // console.log(repository, userId, 'hit>')
    return repositories
  }),

  getUserSavedRepositories: protectedProcedure.query(async ({ ctx }) => {
    // const post = await ctx.db.post.findFirst({
    //   orderBy: { createdAt: 'desc' },
    //   where: { createdBy: { id: ctx.session.user.id } }
    // })
    const userId = ctx.session?.user.id

    // TODO:

    // get all repo ids from saved table

    // get all repositories with id in the above list of ids

    const repositories = await ctx.db.repository.findMany({
      where: { creatorId: userId }
    })

    // const repositoryItems = await ctx.db.repositoryItem.findMany({
    //   where: { parentId: repository.id }
    // })
    // console.log(repository, userId, 'hit>')
    return repositories
  }),

  updateVisibility: publicProcedure
    .input(
      z.object({
        id: z.string(),
        value: z.enum(['PRIVATE', 'SHARED', 'DISCOVERABLE'])
      })
    )
    .mutation(async ({ ctx, input }) => {
      // const post = await ctx.db.post.findFirst({
      //   orderBy: { createdAt: 'desc' },
      //   where: { createdBy: { id: ctx.session.user.id } }
      // })
      const repository = await ctx.db.repository.update({
        where: { id: input.id },
        data: {
          visibility: input.value
        }
      })
      // if (!repository) {
      //   return notFound()
      // }

      // // const repositoryItems = await ctx.db.repositoryItem.findMany({
      // //   where: { parentId: repository.id }
      // // })
      // const userId = ctx.session?.user.id
      // // console.log(repository, userId, 'hit>')
      // return getItems({ node: repository, userId })
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return 'you can now see this secret message!'
  })
})
