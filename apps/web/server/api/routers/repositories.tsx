import { z } from 'zod'

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure
} from '@/server/api/trpc'
import { $Enums, RepositoryType } from '@repo/database'
import { TRPCError } from '@trpc/server'
import cuid from 'cuid'
import { notFound } from 'next/navigation'
import { getItems } from './utils/repository-item-utils'
import { title } from 'process'

export const repositoriesRouter = createTRPCRouter({
  get: publicProcedure
    .input(
      z.object({
        searchQuery: z.string().optional(),
        categoryFilters: z.array(z.string()), // TODO: z.enum??
        companyFilters: z.array(z.string()), // TODO: z.enum??
        repositoryType: z.enum(['PROBLEM_SET', 'REPOSITORY']).optional() //TODO: add , 'SECTION' if needed
      })
    )
    .query(async ({ ctx, input }) => {
      let whereBody: any = {}
      if (input.searchQuery) {
        whereBody = {
          ...whereBody,
          title: {
            contains: input.searchQuery
          }
        }
      }
      if (input.repositoryType) {
        whereBody = {
          ...whereBody,
          type: input.repositoryType
        }
      }
      if (input.categoryFilters) {
        whereBody = {
          ...whereBody,
          categories: {
            hasSome: input.categoryFilters
          }
        }
      }
      if (input.companyFilters) {
        whereBody = {
          ...whereBody,
          companies: {
            hasSome: input.companyFilters
          }
        }
      }
      const repositories = await ctx.db.repository.findMany({
        where: {}
      })
      return repositories
    })
})
