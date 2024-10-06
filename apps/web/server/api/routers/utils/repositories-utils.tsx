import { db } from '@/server/db'
import { Repository, RepositoryItem } from '@prisma/client'
import { Overwrite, Simplify } from '@trpc/server/unstable-core-do-not-import'
import { TestContext } from 'node:test'

export const getRepositories = async ({
  searchQuery,
  categoryFilter,
  companyFilter
}: {
  searchQuery: string | undefined
  categoryFilter: string | undefined // TODO: z.enum??
  companyFilter: string | undefined // TODO: z.enum??
  // repositoryType: z.enum(['PROBLEM_SET', 'REPOSITORY']).optional() //TODO: add , 'SECTION' if needed
}) => {
  const repositoryType = 'PROBLEM_SET'
  let whereBody: any = {}

  if (searchQuery) {
    whereBody = {
      ...whereBody,
      title: {
        contains: searchQuery
      }
    }
  }
  if (repositoryType) {
    whereBody = {
      ...whereBody,
      type: repositoryType
    }
  }
  if (categoryFilter) {
    whereBody = {
      ...whereBody,
      categories: {
        has: categoryFilter
      }
    }
  }
  if (companyFilter) {
    whereBody = {
      ...whereBody,
      companyTags: {
        has: companyFilter
      }
    }
  }
  const repositories = await db.repository.findMany({
    where: whereBody
  })
  return repositories
}
