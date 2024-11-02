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
  getCountValues: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input: repositoryId }) => {
      const repositoryItemCount = await ctx.db.repositoryItem.count({
        where: {
          repositoryId: repositoryId,
          type: $Enums.RepositoryItemType.ITEM
        }
      })
      const repositorySectionCount = await ctx.db.repositoryItem.count({
        where: {
          repositoryId: repositoryId,
          type: $Enums.RepositoryItemType.SECTION
        }
      })
      return { repositoryItemCount, repositorySectionCount }
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

  getUserLikedProblemSets: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user.id

    // TODO:

    // get all problemSets ids from likes table
    const problemSetIds = await ctx.db.like.findMany({
      where: {
        userId: ctx.session.user.id,
        referenceType: $Enums.LikeReferenceTypes.REPOSITORY
      },
      select: { referenceId: true }
    })
    const psIds = problemSetIds.map(problemSet => problemSet.referenceId)
    const problemSets = await ctx.db.repository.findMany({
      where: {
        id: { in: psIds }
      }
    })

    return problemSets
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

  getLikedStatus: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input: repositoryId }) => {
      const like = await ctx.db.like.findUnique({
        where: {
          likeId: {
            userId: ctx.session?.user.id,
            referenceId: repositoryId
          }
        }
      })
      if (like) return true
      return false
    }),

  liked: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input: repositoryId }) => {
      const likeAddQuery = ctx.db.like.create({
        data: {
          userId: ctx.session?.user.id,
          referenceId: repositoryId,
          referenceType: $Enums.LikeReferenceTypes.REPOSITORY
        }
      })
      const updateRepoLikeCountQuery = ctx.db.repository.update({
        where: {
          id: repositoryId
        },
        data: {
          likeCount: {
            increment: 1
          }
        }
      })
      const [likeAdd, updateRepoLikeCount] = await ctx.db.$transaction([
        likeAddQuery,
        updateRepoLikeCountQuery
      ])
      return
    }),

  unliked: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input: repositoryId }) => {
      const likeRemoveQuery = ctx.db.like.delete({
        where: {
          likeId: {
            referenceId: repositoryId,
            userId: ctx.session.user.id
          }
        }
      })
      const updateRepoLikeCountQuery = ctx.db.repository.update({
        where: {
          id: repositoryId
        },
        data: {
          likeCount: {
            decrement: 1
          }
        }
      })
      const [likeRemove, updateRepoLikeCount] = await ctx.db.$transaction([
        likeRemoveQuery,
        updateRepoLikeCountQuery
      ])
      return
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return 'you can now see this secret message!'
  })
})
