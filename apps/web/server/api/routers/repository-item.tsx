import { z } from 'zod'

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure
} from '@/server/api/trpc'
import {
  $Enums,
  CustomItem,
  Problem,
  Repository,
  RepositoryItem,
  UserProblemReferences
} from '@repo/database'
import { TRPCError } from '@trpc/server'
import cuid from 'cuid'
import {
  changePriorities,
  changeReferenceOrder,
  recursiveDeleteNode
} from './utils/repository-item-utils'
import { extractOpenGraph } from '@devmehq/open-graph-extractor'
import { JsonEditorInputSchema } from '@/zod/editorschema'

export const repositoryItemRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        imageUrl: z.string().optional(),
        parentType: z.enum(['SECTION', 'REPOSITORY']),
        type: z.enum(['SECTION', 'ITEM']),
        parentId: z.string(),
        referenceType: z
          .enum(['PROBLEM', 'CUSTOM', 'CUSTOM_PROBLEM', 'INTERVIEW_QUESTION'])
          .optional(),
        referenceId: z.string().optional(),
        repositoryId: z.string(),
        link: z.string().optional(),
        difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']).optional(),
        category: z.enum(['DSA', 'SQL', 'OS']).optional()
        // TODO: Pro Plan limit 50 -> 200
      })
    )
    .mutation(async ({ ctx, input }) => {
      // const page = input?.page ?? 1
      // const pageSize = input?.pageSize ?? 20

      let order = 0
      if (input.parentType === 'REPOSITORY') {
        const repository = await ctx.db.repository.findUnique({
          where: {
            id: input.parentId,
            // Just in case
            creatorId: ctx.session.user.id
          }
        })
        if (!repository) {
          throw new TRPCError({
            message: 'Unauthorized',
            code: 'BAD_REQUEST'
          })
        }

        await ctx.db.repository.update({
          where: { id: repository.id },
          data: {
            lastChildOrder: repository.lastChildOrder + 1
            // ...(input.type === 'SECTION' && {
            //   sectionCount: { increment: 1 }
            // }),
            // ...(input.type === 'ITEM' && {
            //   itemCount: { increment: 1 }
            // })
          }
        })
        order = repository.lastChildOrder + 1
      } else {
        const section = await ctx.db.repositoryItem.findUnique({
          where: {
            id: input.parentId,
            type: input.parentType
            // Just in case
            // creatorId: ctx.session.user.id
          }
        })

        if (
          !section ||
          (section.parentType === 'SECTION' && input.type === 'SECTION')
        ) {
          throw new TRPCError({
            message: 'Unauthorized',
            code: 'BAD_REQUEST'
          })
        }
        await ctx.db.repositoryItem.update({
          where: { id: section.id },
          data: {
            // lastChildOrder: section.lastChildOrder + 1
            lastChildOrder: { increment: 1 }
          }
        })
        order = section.lastChildOrder + 1
      }

      let customProblem
      if (input.referenceType === 'CUSTOM_PROBLEM') {
        if (input.link && input.title && input.difficulty && input.category)
          customProblem = await ctx.db.customItem.create({
            data: {
              url: input.link,
              title: input.title,
              description: input.description ?? '',
              type: $Enums.CustomItemType.PROBLEM,
              difficulty: input.difficulty,
              category: input.category
            }
          })
        if (!customProblem) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Custom Item not created'
          })
        }
      }
      const createItemData: any = {
        type: input.type,
        parentId: input.parentId,
        parentType: input.parentType,
        // creatorId: ctx.session.user.id,
        repositoryId: input.repositoryId,
        order: order,
        title: input.type === 'SECTION' ? input.title : null,
        status: 'CREATED'
      }
      if (input.referenceType === 'PROBLEM') {
        createItemData['referenceId'] = input.referenceId
        createItemData['referenceType'] = input.referenceType
      } else if (input.referenceType === 'CUSTOM_PROBLEM' && customProblem) {
        createItemData['referenceId'] = customProblem.id
        createItemData['referenceType'] = input.referenceType
      }
      const item = await ctx.db.repositoryItem.create({
        data: createItemData
      })
      console.log('created>>', item)
      return item

      // return collection
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

  // create: protectedProcedure
  //   .input(z.object({ title: z.string().min(1) }))
  //   .mutation(async ({ ctx, input }) => {
  //     return ctx.db.post.create({
  //       data: {
  //         name: input.name,
  //         createdBy: { connect: { id: ctx.session.user.id } }
  //       }
  //     })
  //   }),

  updateOrder: protectedProcedure
    .input(
      z.array(
        z.object({
          id: z.string(),
          order: z.number()
        })
      )
    )
    .mutation(async ({ ctx, input: updatedItemOrder }) => {
      // const page = input?.page ?? 1
      // const pageSize = input?.pageSize ?? 20

      await changePriorities({ priorityOrder: updatedItemOrder })
      // return item

      // return collection
    }),

  deleteNode: protectedProcedure
    .input(
      z.object({
        node_id: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      // const page = input?.page ?? 1
      // const pageSize = input?.pageSize ?? 20

      const repositoryItem = await ctx.db.repositoryItem.findFirst({
        where: {
          id: input.node_id
        }
      })

      let parent: RepositoryItem | Repository | undefined
      if (repositoryItem?.parentType === 'REPOSITORY') {
        parent = await ctx.db.repository.update({
          where: {
            id: repositoryItem?.parentId
          },
          data: {
            lastChildOrder: {
              decrement: 1
            }
            // ...(repositoryItem.type === 'SECTION' && {
            //   sectionCount: { decrement: 1 },
            //   itemCount: { decrement: repositoryItem.lastChildOrder }
            // }),
            // ...(repositoryItem.type === 'ITEM' && {
            //   itemCount: { decrement: 1 }
            // })
          }
        })
      } else {
        parent = await ctx.db.repositoryItem.update({
          where: {
            id: repositoryItem?.parentId
          },
          data: {
            lastChildOrder: {
              decrement: 1
            }
          }
        })
      }

      if (!repositoryItem) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `repositoryItem with id ${input.node_id} not `
        })
      }

      // Delete the node
      // Delete the children recursively

      await recursiveDeleteNode(input.node_id)

      // await changePriorities({ priorityOrder: input.changedPriorities })
      await ctx.db
        .$executeRaw`update "RepositoryItem" set "order" = "order" - 1 where "parentId" = ${repositoryItem.parentId} and "order"> ${repositoryItem.order}`

      // Return the deleted segment
      return repositoryItem.id
    }),
  moveNode: protectedProcedure
    .input(
      z.object({
        node_id: z.string(),
        newparent_id: z.string(),
        newparent_type: z.enum(['SECTION', 'REPOSITORY'])
      })
    )
    .mutation(async ({ ctx, input }) => {
      // const page = input?.page ?? 1
      // const pageSize = input?.pageSize ?? 20

      const node = await ctx.db.repositoryItem.findUnique({
        where: { id: input.node_id }
      })
      if (!node) {
        throw new TRPCError({
          message: 'Unauthorized1',
          code: 'BAD_REQUEST'
        })
      }
      let order = 0
      if (input.newparent_type === 'REPOSITORY') {
        const repository = await ctx.db.repository.findUnique({
          where: {
            id: input.newparent_id,
            // Just in case
            creatorId: ctx.session.user.id
          }
        })
        if (!repository) {
          throw new TRPCError({
            message: 'Unauthorized2',
            code: 'BAD_REQUEST'
          })
        }
        await ctx.db.repository.update({
          where: { id: repository.id },
          data: {
            // lastChildOrder: repository.lastChildOrder + 1
            lastChildOrder: {
              increment: 1
            }
          }
        })
        order = repository.lastChildOrder + 1
      } else {
        const section = await ctx.db.repositoryItem.findUnique({
          where: {
            id: input.newparent_id,
            type: 'SECTION'
            // Just in case
            // creatorId: ctx.session.user.id
          }
        })

        if (
          !section ||
          (section.parentType === 'SECTION' && node.type === 'SECTION')
        ) {
          throw new TRPCError({
            message: 'Unauthorized3',
            code: 'BAD_REQUEST'
          })
        }
        await ctx.db.repositoryItem.update({
          where: { id: section.id },
          data: {
            // lastChildOrder: section.lastChildOrder + 1
            lastChildOrder: { increment: 1 }
          }
        })
        order = section.lastChildOrder + 1
      }

      if (node.parentType === 'REPOSITORY') {
        const repository = await ctx.db.repository.findUnique({
          where: {
            id: node.parentId,
            // Just in case
            creatorId: ctx.session.user.id
          }
        })
        if (!repository) {
          throw new TRPCError({
            message: 'Unauthorized4',
            code: 'BAD_REQUEST'
          })
        }
        await ctx.db.repository.update({
          where: { id: repository.id },
          data: {
            // lastChildOrder: repository.lastChildOrder - 1
            lastChildOrder: { decrement: 1 }
          }
        })
      } else {
        const section = await ctx.db.repositoryItem.findUnique({
          where: {
            id: node.parentId,
            type: 'SECTION'
            // Just in case
            // creatorId: ctx.session.user.id
          }
        })
        if (
          !section ||
          (section.parentType === 'SECTION' && node.type === 'SECTION')
        ) {
          throw new TRPCError({
            message: 'Unauthorized5',
            code: 'BAD_REQUEST'
          })
        }
        await ctx.db.repositoryItem.update({
          where: { id: section.id },
          data: {
            // lastChildOrder: section.lastChildOrder - 1
            lastChildOrder: { decrement: 1 }
          }
        })
      }

      await ctx.db.repositoryItem.update({
        where: {
          id: node.id
        },
        data: {
          order: order,
          parentId: input.newparent_id,
          parentType: input.newparent_type
        }
      })
      return node.id
      // const createItemData: any = {
      //   type: input.type,
      //   parentId: input.parentId,
      //   parentType: input.parentType,
      //   creatorId: ctx.session.user.id,
      //   order: order,
      //   title: input.type === 'SECTION' ? input.title : null,
      //   status: 'CREATED'
      // }
      // if (input.referenceType === 'PROBLEM') {
      //   createItemData['referenceId'] = input.referenceId
      //   createItemData['referenceType'] = input.referenceType
      // }
      // const item = await ctx.db.repositoryItem.create({
      //   data: createItemData
      // })
      // console.log('created>>', item)
      // return item

      // return collection
    }),
  searchCustomLinkData: protectedProcedure
    .input(
      z.object({
        link: z.string()
      })
    )
    .query(async ({ ctx, input }) => {
      const data = await fetch(input.link)
      const html = await data.text()

      // console.log('>>>>>>>>>', html)
      const openGraph = await extractOpenGraph(html)
      return openGraph
    }),
  getNotes: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        referenceId: z.string(),
        referenceType: z.enum(['PROBLEM', 'CUSTOM_PROBLEM']) //TODO: add , 'SECTION' if needed
      })
    )
    .query(async ({ ctx, input }) => {
      let resource: Problem | CustomItem | RepositoryItem | undefined | null

      const repoItem = await ctx.db.repositoryItem.findUnique({
        where: {
          id: input.id
          // creatorId: ctx.session.user.id
        }
      })
      if (!repoItem) {
        throw new TRPCError({
          message: 'Item not found',
          code: 'BAD_REQUEST'
        })
      }
      // if (input.referenceType === 'SECTION') {
      //   resource = repoItem
      //   if (!resource)
      //     throw new TRPCError({
      //       message: 'Section not found',
      //       code: 'BAD_REQUEST'
      //     })

      //   return resource.resources
      // }

      if (input.referenceType === 'PROBLEM') {
        resource = await ctx.db.problem.findUnique({
          where: {
            id: input.referenceId
          }
        })
      } else if (input.referenceType === 'CUSTOM_PROBLEM') {
        resource = await ctx.db.customItem.findUnique({
          where: {
            id: input.referenceId,
            type: 'PROBLEM'
          }
        })
      }
      if (!resource) {
        throw new TRPCError({
          message: 'Item not found',
          code: 'BAD_REQUEST'
        })
      }
      const userItemData = await ctx.db.userItemData.findUnique({
        where: {
          userId_referenceId: {
            referenceId: resource.id,
            userId: ctx.session.user.id
          }
        }
      })

      return userItemData?.note

      // let newNotes: (userProblemReferences & { added: boolean })[] = []
      // for (const note of notes) {
      //   if (note.UserReferenceItemMapping.length > 0) {
      //     newNotes.push({ ...note, added: true })
      //   } else {
      //     newNotes.push({ ...note, added: false })
      //   }
      // }
      // return newNotes
      // // return {
      // //   totalPages,
      // //   currentPage: page,
      // //   problems: searchedProblems,
      // //   totalRecords
      // // }
    }),
  // getRepositoryNotes: publicProcedure
  //   .input(
  //     z.object({
  //       id: z.string(),
  //       referenceId: z.string(),
  //       referenceType: z.enum(['PROBLEM', 'CUSTOM_PROBLEM']) //TODO: add , 'SECTION' if needed
  //     })
  //   )
  //   .query(async ({ ctx, input }) => {
  //     let resource: Problem | CustomItem | RepositoryItem | undefined | null

  //     const repoItem = await ctx.db.repositoryItem.findUnique({
  //       where: {
  //         id: input.id
  //         // creatorId: ctx.session.user.id
  //       }
  //     })
  //     if (!repoItem) return
  //     const repository = await ctx.db.repository.findUnique({
  //       where: {
  //         id: repoItem.repositoryId
  //       }
  //     })
  //     if (!repository) {
  //       throw new TRPCError({
  //         message: 'Item not found',
  //         code: 'BAD_REQUEST'
  //       })
  //     }
  //     // if (input.referenceType === 'SECTION') {
  //     //   resource = repoItem
  //     //   if (!resource)
  //     //     throw new TRPCError({
  //     //       message: 'Section not found',
  //     //       code: 'BAD_REQUEST'
  //     //     })

  //     //   return resource.resources
  //     // }

  //     if (input.referenceType === 'PROBLEM') {
  //       resource = await ctx.db.problem.findUnique({
  //         where: {
  //           id: input.referenceId
  //         }
  //       })
  //     } else if (input.referenceType === 'CUSTOM_PROBLEM') {
  //       resource = await ctx.db.customItem.findUnique({
  //         where: {
  //           id: input.referenceId,
  //           type: 'PROBLEM'
  //         }
  //       })
  //     }
  //     if (!resource) {
  //       throw new TRPCError({
  //         message: 'Item not found',
  //         code: 'BAD_REQUEST'
  //       })
  //     }
  //     const notes = await ctx.db.userProblemReferences.findMany({
  //       where: {
  //         referenceId: input.referenceId,
  //         // userId: ctx.session.user.id,
  //         userId: repository.creatorId
  //         // type: $Enums.UserReferencesAndNotesType.NOTE
  //       },
  //       include: {
  //         UserReferenceItemMapping: {
  //           where: {
  //             repositoryItemId: input.id
  //           }
  //         }
  //       },
  //       orderBy: {
  //         order: 'asc'
  //       }
  //     })

  //     let newNotes: (userProblemReferences & { added: boolean })[] = []
  //     for (const note of notes) {
  //       if (note.UserReferenceItemMapping.length > 0)
  //         newNotes.push({ ...note, added: true })
  //     }
  //     return newNotes
  //     // return {
  //     //   totalPages,
  //     //   currentPage: page,
  //     //   problems: searchedProblems,
  //     //   totalRecords
  //     // }
  //   }),
  getReferences: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        referenceId: z.string(),
        referenceType: z.enum(['PROBLEM', 'CUSTOM_PROBLEM', 'SECTION'])
      })
    )
    .query(async ({ ctx, input }) => {
      let resource: Problem | CustomItem | RepositoryItem | undefined | null

      const repoItem = await ctx.db.repositoryItem.findUnique({
        where: {
          id: input.id
          // creatorId: ctx.session.user.id
        }
      })
      if (!repoItem) {
        console.log('>>>>>>>>>>', input.id)
        throw new TRPCError({
          message: 'Item not found',
          code: 'BAD_REQUEST'
        })
      }
      if (input.referenceType === 'SECTION') {
        resource = repoItem
        if (!resource)
          throw new TRPCError({
            message: 'Section not found',
            code: 'BAD_REQUEST'
          })

        return resource.resources
      }

      if (input.referenceType === 'PROBLEM') {
        resource = await ctx.db.problem.findUnique({
          where: {
            id: input.referenceId
          }
        })
      } else if (input.referenceType === 'CUSTOM_PROBLEM') {
        resource = await ctx.db.customItem.findUnique({
          where: {
            id: input.referenceId,
            type: 'PROBLEM'
          }
        })
      }
      if (!resource) {
        // console.log('>>>>>>>>>>', input.id)
        throw new TRPCError({
          message: 'Item not found',
          code: 'BAD_REQUEST'
        })
      }
      const refs = await ctx.db.userProblemReferences.findMany({
        where: {
          referenceId: input.referenceId,
          userId: ctx.session.user.id
          // type: $Enums.UserReferencesAndNotesType.REFERENCE
        },
        include: {
          UserReferenceItemMapping: {
            where: {
              repositoryItemId: input.id
            }
          }
        },
        orderBy: {
          order: 'asc'
        }
      })

      let newRefs: (UserProblemReferences & { added: boolean })[] = []
      for (const ref of refs) {
        let refInCurrentRepoFound = ref.UserReferenceItemMapping.length > 0
        // https://stackoverflow.com/questions/63702057/what-is-the-logic-behind-the-typescript-error-the-operand-of-a-delete-operato
        // the ref has UserReferenceItemMapping as a mandatory key in its object, therefore while deleting we use "as any"
        delete (ref as any).UserReferenceItemMapping
        if (refInCurrentRepoFound) {
          newRefs.push({ ...ref, added: true })
        } else {
          newRefs.push({ ...ref, added: false })
        }
      }
      console.log('>>>>>>><<<<<<<<<<', newRefs)
      return newRefs
      // return {
      //   totalPages,
      //   currentPage: page,
      //   problems: searchedProblems,
      //   totalRecords
      // }
    }),
  getRepositoryReferences: publicProcedure
    .input(
      z.object({
        id: z.string(),
        referenceId: z.string(),
        referenceType: z.enum(['PROBLEM', 'CUSTOM_PROBLEM', 'SECTION'])
      })
    )
    .query(async ({ ctx, input }) => {
      console.log('hitter', input)

      let resource: Problem | CustomItem | RepositoryItem | undefined | null

      const repoItem = await ctx.db.repositoryItem.findUnique({
        where: {
          id: input.id
          // creatorId: ctx.session.user.id
        }
      })
      if (!repoItem) return
      const repository = await ctx.db.repository.findUnique({
        where: {
          id: repoItem.repositoryId
          // creatorId: ctx.session.user.id
        }
      })
      console.log('repoItem', repoItem)
      if (!repository) {
        throw new TRPCError({
          message: 'Item not found',
          code: 'BAD_REQUEST'
        })
      }
      if (input.referenceType === 'SECTION') {
        resource = repoItem
        if (!resource)
          throw new TRPCError({
            message: 'Section not found',
            code: 'BAD_REQUEST'
          })

        return resource.resources
      }

      if (input.referenceType === 'PROBLEM') {
        resource = await ctx.db.problem.findUnique({
          where: {
            id: input.referenceId
          }
        })
      } else if (input.referenceType === 'CUSTOM_PROBLEM') {
        resource = await ctx.db.customItem.findUnique({
          where: {
            id: input.referenceId,
            type: 'PROBLEM'
          }
        })
      }
      if (!resource) {
        throw new TRPCError({
          message: 'Item not found',
          code: 'BAD_REQUEST'
        })
      }
      const refs = await ctx.db.userProblemReferences.findMany({
        where: {
          referenceId: input.referenceId,
          // userId: ctx.session.user.id,
          userId: repository.creatorId
          // type: $Enums.UserReferencesAndNotesType.REFERENCE
        },
        include: {
          UserReferenceItemMapping: {
            where: {
              repositoryItemId: input.id
            }
          }
        },
        orderBy: {
          order: 'asc'
        }
      })

      let newRefs: (UserProblemReferences & { added: boolean })[] = []
      for (const ref of refs) {
        let refInCurrentRepoFound = ref.UserReferenceItemMapping.length > 0
        // https://stackoverflow.com/questions/63702057/what-is-the-logic-behind-the-typescript-error-the-operand-of-a-delete-operato
        // the ref has UserReferenceItemMapping as a mandatory key in its object, therefore while deleting we use "as any"
        delete (ref as any).UserReferenceItemMapping
        if (refInCurrentRepoFound) newRefs.push({ ...ref, added: true })
      }
      console.log('>>>>>>><<<<<<<<<<', newRefs)
      return newRefs
    }),

  // createItemNotes: protectedProcedure
  //   .input(
  //     z.object({
  //       itemId: z.string(),
  //       itemType: z.enum(['CUSTOM_PROBLEM', 'PROBLEM']), //add more if needed
  //       // title: z.string(),
  //       // content: z.string(), // TODO: change to json if needed
  //       order: z.number()
  //     })
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     console.log('you', input.itemId)

  //     if (input.itemType === 'PROBLEM') {
  //       const repoItem = await ctx.db.problem.findUnique({
  //         where: { id: input.itemId }
  //       })

  //       if (!repoItem)
  //         throw new TRPCError({
  //           message: 'Item missing',
  //           code: 'BAD_REQUEST'
  //         })
  //       const note = await ctx.db.userProblemReferences.create({
  //         data: {
  //           title: 'New Note',
  //           content: '', // TODO: set to empty or null in accordance with json
  //           referenceType: input.itemType,
  //           referenceId: input.itemId,
  //           // type: $Enums.UserReferencesAndNotesType.NOTE,
  //           userId: ctx.session.user.id,
  //           order: input.order
  //         }
  //       })
  //       return note
  //     }
  //     if (input.itemType === 'CUSTOM_PROBLEM') {
  //       const repoItem = await ctx.db.customProblem.findUnique({
  //         where: { id: input.itemId }
  //       })
  //       if (!repoItem)
  //         throw new TRPCError({
  //           message: 'Item missing',
  //           code: 'BAD_REQUEST'
  //         })
  //       const note = await ctx.db.userProblemReferences.create({
  //         data: {
  //           title: 'New Note',
  //           content: '', // TODO: set to empty or null in accordance with json
  //           referenceType: input.itemType,
  //           referenceId: input.itemId,
  //           type: $Enums.UserReferencesAndNotesType.NOTE,
  //           userId: ctx.session.user.id,
  //           order: input.order
  //         }
  //       })
  //       return note
  //     }

  //     // return collection
  //   }),

  // separate createSectionReferences for 'SECTION' item type
  createItemReferences: protectedProcedure
    .input(
      z.object({
        itemId: z.string(),
        itemType: z.enum(['CUSTOM_PROBLEM', 'PROBLEM']), //add more if needed
        title: z.string(),
        link: z.string(),
        type: z.enum(['ARTICLE', 'VIDEO']),
        order: z.number()
      })
    )
    .mutation(async ({ ctx, input }) => {
      // const page = input?.page ?? 1
      // const pageSize = input?.pageSize ?? 20

      if (input.itemType === 'PROBLEM') {
        const repoItem = await ctx.db.problem.findUnique({
          where: { id: input.itemId }
        })
        if (!repoItem)
          throw new TRPCError({
            message: 'Unauthorized',
            code: 'BAD_REQUEST'
          })
        const ref = await ctx.db.userProblemReferences.create({
          data: {
            // id: input.itemId
            title: input.title,
            link: input.link,
            subType: input.type,
            referenceType: input.itemType,
            referenceId: input.itemId,
            // type: $Enums.UserReferencesAndNotesType.REFERENCE,
            userId: ctx.session.user.id,
            order: input.order
          }
        })
        return ref
      }
      if (input.itemType === 'CUSTOM_PROBLEM') {
        const repoItem = await ctx.db.customItem.findUnique({
          where: { id: input.itemId }
        })
        if (!repoItem)
          throw new TRPCError({
            message: 'Unauthorized',
            code: 'BAD_REQUEST'
          })
        const ref = await ctx.db.userProblemReferences.create({
          data: {
            // id: input.itemId
            title: input.title,
            link: input.link,
            subType: input.type,
            referenceType: input.itemType,
            referenceId: input.itemId,
            // type: $Enums.UserReferencesAndNotesType.REFERENCE,
            userId: ctx.session.user.id,
            order: input.order
          }
        })
        return ref
      }

      // return collection
    }),
  updateItemReference: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        link: z.string(),
        type: z.enum(['ARTICLE', 'VIDEO'])
      })
    )
    .mutation(async ({ ctx, input }) => {
      const ref = await ctx.db.userProblemReferences.update({
        where: {
          id: input.id
        },
        data: {
          title: input.title,
          link: input.link,
          subType: input.type
        }
      })
      return ref
    }),
  updateItemNote: protectedProcedure
    .input(
      z.object({
        referenceId: z.string(),
        referenceType: z.enum(['PROBLEM', 'CUSTOM_PROBLEM', 'SECTION']),
        content: JsonEditorInputSchema
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userItemData = await ctx.db.userItemData.upsert({
        where: {
          userId_referenceId: {
            referenceId: input.referenceId ?? undefined,
            userId: ctx.session.user.id
          }
        },
        update: {
          note: input.content
        },
        create: {
          referenceId: input.referenceId ?? undefined,
          // ...((input.referenceType === $Enums.RepositoryItemReferenceType.PROBLEM ||
          //   input.referenceType === $Enums.RepositoryItemReferenceType.CUSTOM_PROBLEM) && {
          //   referenceType: input.referenceType
          // }),
          referenceType: input.referenceType,
          userId: ctx.session.user.id,
          note: input.content
        }
      })

      return userItemData
    }),
  deleteReference: protectedProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const ref = await ctx.db.userProblemReferences.delete({
        where: {
          id: input.id
        }
      })
      return ref
    }),
  addReference: protectedProcedure
    .input(
      z.object({
        repoItemId: z.string(),
        // type: z.enum(['REFERENCE', 'NOTE']),
        // referenceId: z.string().optional(),
        id: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      // const page = input?.page ?? 1
      // const pageSize = input?.pageSize ?? 20

      const mapping = await ctx.db.userReferenceItemMapping.create({
        data: {
          repositoryItemId: input.repoItemId,
          userProblemReferencesId: input.id
        }
      })

      if (!mapping)
        throw new TRPCError({
          message: 'Cant create reference',
          code: 'BAD_REQUEST'
        })
      // const refsAndNotes = await ctx.db.userReferencesAndNotes.create({
      //   data: {
      //     type: $Enums.UserReferencesAndNotesType.REFERENCE,
      //     userId: ctx.session.user.id,
      //     title: input.title,
      //     link: input.link,
      //     referenceId: repoItem.referenceId as string,
      //     referenceType:
      //       repoItem.referenceType as $Enums.RepositoryItemReferenceType
      //   }
      // })
      // console.log(refsAndNotes)

      // let order = 0
      // if (input.parentType === 'REPOSITORY') {
      //   const repository = await ctx.db.repository.findUnique({
      //     where: {
      //       id: input.parentId,
      //       // Just in case
      //       creatorId: ctx.session.user.id
      //     }
      //   })
      //   if (!repository) {
      //     throw new TRPCError({
      //       message: 'Unauthorized',
      //       code: 'BAD_REQUEST'
      //     })
      //   }
      //   await ctx.db.repository.update({
      //     where: { id: repository.id },
      //     data: {
      //       lastChildOrder: repository.lastChildOrder + 1
      //     }
      //   })
      //   order = repository.lastChildOrder + 1
      // } else {
      //   const section = await ctx.db.repositoryItem.findUnique({
      //     where: {
      //       id: input.parentId,
      //       type: input.parentType,
      //       // Just in case
      //       creatorId: ctx.session.user.id
      //     }
      //   })

      //   if (
      //     !section ||
      //     (section.parentType === 'SECTION' && input.type === 'SECTION')
      //   ) {
      //     throw new TRPCError({
      //       message: 'Unauthorized',
      //       code: 'BAD_REQUEST'
      //     })
      //   }
      //   await ctx.db.repositoryItem.update({
      //     where: { id: section.id },
      //     data: {
      //       lastChildOrder: section.lastChildOrder + 1
      //     }
      //   })
      //   order = section.lastChildOrder + 1
      // }

      // const item = await ctx.db.repositoryItem.create({
      //   data: {
      //     type: input.type,
      //     parentId: input.parentId,
      //     parentType: input.parentType,
      //     creatorId: ctx.session.user.id,
      //     order: order,
      //     title: input.type === 'SECTION' ? 'New Section' : null,
      //     status: 'CREATED'
      //   }
      // })
      // console.log('created>>', item)
      // return item

      // return collection
    }),
  removeReference: protectedProcedure
    .input(
      z.object({
        repoItemId: z.string(),
        // type: z.enum(['REFERENCE', 'NOTE']),
        id: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const mapping = await ctx.db.userReferenceItemMapping.delete({
        where: {
          refInRepoId: {
            repositoryItemId: input.repoItemId,
            userProblemReferencesId: input.id
          }
        }
      })

      if (!mapping)
        throw new TRPCError({
          message: 'Deletion failed',
          code: 'BAD_REQUEST'
        })
    }),
  updateReferenceOrder: protectedProcedure
    .input(
      z.array(
        z.object({
          id: z.string(),
          order: z.number()
          // repoItemId: z.string(),
          // type: z.enum(['PROBLEM', 'CUSTOM_PROBLEM'])
        })
      )
    )
    .mutation(async ({ ctx, input: updatedNoteReferenceOrder }) => {
      await changeReferenceOrder({
        referenceOrder: updatedNoteReferenceOrder
      })
    }),
  // updateProblemItemPreferences: protectedProcedure
  //   .input(
  //     z.array(
  //       z.object({
  //         id: z.string(),
  //         order: z.number()
  //       })
  //     )
  //   )
  //   .mutation(async ({ ctx, input: updatedNoteReferenceOrder }) => {
  //     await changeNoteReferenceOrder({
  //       referenceOrder: updatedNoteReferenceOrder
  //     })
  //   }),

  getOrCreateUserData: protectedProcedure
    .input(
      z.object({
        referenceId: z.string(),
        referenceType: z.enum(['PROBLEM', 'CUSTOM_PROBLEM'])
      })
    )
    .query(async ({ ctx, input }) => {
      const userItemData = await ctx.db.userItemData.findUnique({
        where: {
          userId_referenceId: {
            referenceId: input.referenceId ?? undefined,
            userId: ctx.session.user.id
          }
        }
      })
      if (!userItemData) {
        const newUserItemData = await ctx.db.userItemData.create({
          data: {
            referenceId: input.referenceId ?? undefined,
            referenceType: input.referenceType,
            userId: ctx.session.user.id
          }
        })
        return newUserItemData
      }
      return userItemData
    }),

  updateLastStatus: protectedProcedure
    .input(
      z.object({
        referenceId: z.string(),
        // TODO: expand below if necessary
        referenceType: z.enum(['PROBLEM', 'CUSTOM_PROBLEM']),
        status: z.number()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userItemData = await ctx.db.userItemData.upsert({
        where: {
          userId_referenceId: {
            referenceId: input.referenceId ?? undefined,
            userId: ctx.session.user.id
          }
        },
        update: {
          lastStatus: input.status
        },
        create: {
          referenceId: input.referenceId ?? undefined,
          referenceType: input.referenceType,
          userId: ctx.session.user.id,
          lastStatus: input.status
        }
      })
    }),
  updateTags: protectedProcedure
    .input(
      z.object({
        referenceId: z.string(),
        // TODO: expand below if necessary
        referenceType: z.enum(['PROBLEM', 'CUSTOM_PROBLEM']),
        tags: z.array(z.string())
      })
    )
    .mutation(async ({ ctx, input }) => {
      const upperCaseArr = input.tags.map(tag => tag.toUpperCase())

      // Use Set to remove duplicates
      const uniqueTags = [...new Set(upperCaseArr)]
      const userItemData = await ctx.db.userItemData.upsert({
        where: {
          userId_referenceId: {
            referenceId: input.referenceId ?? undefined,
            userId: ctx.session.user.id
          }
        },
        update: {
          tags: uniqueTags
        },
        create: {
          referenceId: input.referenceId ?? undefined,
          referenceType: input.referenceType,
          userId: ctx.session.user.id,
          tags: uniqueTags
        }
      })
    }),
  getSecretMessage: protectedProcedure.query(() => {
    return 'you can now see this secret message!'
  })
})
