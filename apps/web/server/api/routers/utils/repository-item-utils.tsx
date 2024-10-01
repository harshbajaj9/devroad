import { db } from '@/server/db'
import { Repository, RepositoryItem } from '@prisma/client'
import { Overwrite, Simplify } from '@trpc/server/unstable-core-do-not-import'
import { TestContext } from 'node:test'

export const getItems = async ({
  node,
  userId
}: {
  node: Repository | RepositoryItem
  userId: string | undefined
}) => {
  const nodeObject: { details: any; children: any } = {
    details: node,
    children: []
  }

  if (node.type === 'ITEM') {
    // combine the details
    if (node.referenceType === 'PROBLEM') {
      const problem = await db.problem.findUnique({
        where: { id: node.referenceId ?? undefined }
      })
      nodeObject.details['problem'] = problem

      // TODO: is there a better way to fetch all logged in user's preference
      // const userPreferencesAndResources =
      //   await db.userItemPreferencesAndResources.findUnique({
      //     where: {
      //       id: node.referenceId ?? undefined,
      //       userId: userId
      //     }
      //   })

      nodeObject.details['problem'] = problem
    } else if (node.referenceType === 'CUSTOM') {
      const custom = await db.customItem.findUnique({
        where: { id: node.referenceId ?? undefined }
      })
      nodeObject.details['custom'] = custom
    }
    return { ...nodeObject.details, children: nodeObject.children }
  }
  // get the children
  const items: RepositoryItem[] = await db.repositoryItem.findMany({
    where: { parentId: node.id }
  })

  items.sort((a, b) => {
    const A = a.order
    const B = b.order
    if (A < B) return -1

    if (A > B) return 1

    return 0
  })
  let maxDepth = 0
  for (const item of items) {
    const childDetails = await getItems({ node: item, userId })
    nodeObject.children.push(childDetails)
    maxDepth = Math.max(maxDepth, childDetails.depth ?? 0)
  }
  return {
    ...nodeObject.details,
    children: nodeObject.children,
    depth: 1 + maxDepth
  }
}
export const changePriorities = async ({ priorityOrder }) => {
  await Promise.all(
    priorityOrder.map(async item => {
      console.log(`Updating Item ${item.id} to ${item.order}`)
      await db.repositoryItem.update({
        where: {
          id: item.id
        },
        data: {
          order: item.order
        }
      })
    })
  )

  console.log('updated')
}

export const changeNoteReferenceOrder = async ({ referenceOrder }) => {
  await Promise.all(
    referenceOrder.map(async item => {
      await db.userProblemReferencesAndNotes.update({
        where: {
          id: item.id
        },
        data: {
          order: item.order
        }
      })
    })
  )

  console.log('updated')
}

export const recursiveDeleteNode = async (id: string) => {
  await db.repositoryItem.delete({
    where: {
      id: id
    }
  })

  const nodes = await db.repositoryItem.findMany({
    where: {
      parentId: id
    }
  })
  for (const node of nodes) {
    recursiveDeleteNode(node.id)
  }
}
