import { db } from '@/server/db'
import { $Enums, Repository, RepositoryItem } from '@repo/database'
import { Overwrite, Simplify } from '@trpc/server/unstable-core-do-not-import'
import { TestContext } from 'node:test'

export const getProblemSets = async ({
  categoryFilter,
  // companyFilter,
  // roleFilter
  text,
  sort,
  page,
  userId
}: {
  categoryFilter?: string // TODO: z.enum??
  sort: 'popular' | 'latest'
  text?: string
  page?: number
  userId?: string | undefined
  // companyFilter?: string | undefined // TODO: z.enum??
  // roleFilter?: string | undefined // TODO: z.enum??
  // repositoryType: z.enum(['PROBLEM_SET', 'REPOSITORY']).optional() //TODO: add , 'SECTION' if needed
}) => {
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>', page, text, sort, categoryFilter)
  if (!page) page = 1
  const repositoryType = 'PROBLEM_SET'
  let whereBody: any = {}

  if (text) {
    whereBody = {
      ...whereBody,
      title: {
        contains: text,
        mode: 'insensitive'
      }
    }
  }
  if (repositoryType) {
    whereBody = {
      ...whereBody,
      type: repositoryType
    }
  }
  // if (roleFilter) {
  //   whereBody = {
  //     ...whereBody,
  //     categories: {
  //       has: categoryFilter
  //     }
  //   }
  // }

  // TODO:figure out enums, Invalid value for argument `has`. Expected ProblemCategory.

  // if (categoryFilter) {
  //   whereBody = {
  //     ...whereBody,
  //     categories: {
  //       has: categoryFilter
  //     }
  //   }
  // }

  // if (companyFilter) {
  //   whereBody = {
  //     ...whereBody,
  //     companyTags: {
  //       has: companyFilter
  //     }
  //   }
  // }

  const pageSize = 20

  const repositoriesCount = await db.repository.count({
    where: whereBody
  })

  const repositories = await db.repository.findMany({
    where: whereBody,
    skip: (page - 1) * pageSize,
    take: pageSize
  })

  // item counts
  const newRepos: (Repository & { itemCount: number; sectionCount: number })[] =
    []
  for (const repo of repositories) {
    const repositoryItemCount = await db.repositoryItem.count({
      where: {
        repositoryId: repo.id,
        type: $Enums.RepositoryItemType.ITEM
      }
    })
    const repositorySectionCount = await db.repositoryItem.count({
      where: {
        repositoryId: repo.id,
        type: $Enums.RepositoryItemType.SECTION
      }
    })
    newRepos.push({
      ...repo,
      itemCount: repositoryItemCount,
      sectionCount: repositorySectionCount
    })
  }

  // TODO: like comment save counts

  // if (userId) {
  // }
  const totalPages = Math.ceil(repositoriesCount / pageSize)
  return { problemSets: newRepos, totalPages }
}

export const getCountValues = async (repositoryId: string) => {
  const repositoryItemCount = await db.repositoryItem.count({
    where: {
      repositoryId: repositoryId,
      type: $Enums.RepositoryItemType.ITEM
    }
  })
  const repositorySectionCount = await db.repositoryItem.count({
    where: {
      repositoryId: repositoryId,
      type: $Enums.RepositoryItemType.SECTION
    }
  })
  return { repositoryItemCount, repositorySectionCount }
}
