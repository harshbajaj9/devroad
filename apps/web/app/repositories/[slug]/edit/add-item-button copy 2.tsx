'use client'
import React, { useState } from 'react'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Toast
} from '@repo/ui'
import { PlusCircleIcon, PlusIcon } from '@heroicons/react/24/outline'
import { api } from '@/trpc/react'
import { z } from 'zod'
import { useParams, usePathname } from 'next/navigation'
import AddItemModal from './add-item-modal'
import { cn } from '@/lib/utils'

export const createRepositoryItemSchema = z.object({
  parentType: z.enum(['REPOSITORY', 'SECTION']),
  parentId: z.string(),
  type: z.enum(['SECTION', 'ITEM'])
})

export type RepositoryItemCreationSchema = z.infer<
  typeof createRepositoryItemSchema
>

interface AddItemButtonsProps {
  parentType: 'REPOSITORY' | 'SECTION'
  pparentType: 'NONE' | 'REPOSITORY' | 'SECTION'
  parentId: string
  setChildNodes: React.Dispatch<React.SetStateAction<any>>
  childNodes: any[]
  parentName: string
  path: { id: string; title: string }[]
}

const AddItemButtons = ({
  path,
  setChildNodes,
  childNodes,
  parentType,
  parentName,
  parentId,
  pparentType
}: AddItemButtonsProps) => {
  const [isCreateItemModalOpen, setIsCreateItemModalOpen] =
    useState<boolean>(false)
  const [isCreateSectionModalOpen, setIsCreateSectionModalOpen] =
    useState<boolean>(false)

  const { mutateAsync: createRepoItem, isPending } =
    api.repositoryItem.create.useMutation({
      // refetchOnWindowFocus: false,
      onSuccess(createdItem: any) {
        Toast({ title: 'Created', type: 'success' })
        // Toaster({ title: 'Collection Created', type: 'success' })
        // const prevData = utils.autoGreet.getAllAutoGreetMessages.getData(
        //   autoGreet.segment_id
        // )
        // setLiveFeedCards(data)
        // router.push(`/repositories/${createdItem.id}`)
        setChildNodes(prev =>
          prev
            ? [
                ...prev,
                {
                  id: createdItem.id,
                  type: createdItem.type,
                  title: createdItem.title,
                  description: createdItem.description,
                  order: createdItem.order
                }
              ]
            : [
                {
                  id: createdItem.id,
                  type: createdItem.type,
                  title: createdItem.title,
                  description: createdItem.description,
                  order: createdItem.order
                }
              ]
        )

        // TODO:refresh and invalidate the useQuery for get Repo Items
      },
      onError(error: { message: any }) {
        Toast({
          type: 'error',
          title: 'Error!',
          message: error?.message || 'Something went wrong',
          duration: 5000
        })
      }
    })

  const handleSave = async (
    // values: z.infer<typeof createRepositoryItemSchema>
    type: 'SECTION' | 'ITEM'
  ) => {
    if (!type) return
    // if (!allowedProblemSetTypes.includes(values.starting_trigger)) {
    //   Toast({
    //     title: `Error: Only Custom, Segment, Webhhoks and Account List Triggers are supported`,
    //     type: 'error'
    //   })
    //   return
    // }

    const data = {
      parentType: parentType,
      parentId: parentId,
      type: type
      // flow_id: selectedFlowId ?? "",
    }
    try {
      const repoItem = await createRepoItem(data)
      // Toast({
      //   title: `${repoItem.type} created successfully`
      // })

      // onClose()

      // setStartingTriggerType(values.starting_trigger);
      // const url = `/outbound-workflows/flow/${flowId}`;
      // setSelectedFlowData(null);
      // router.push(url);
      // setSelectedFlowId(flowId);
      // setTriggerConditions([]);

      // if (refetchData) refetchData()
    } catch (error) {
      console.error(error)
      Toast({
        type: 'error',
        title: 'Collection creation failed'
        // message: "Something went wrong. Please try again.",
      })
    }
  }
  const handlecreateRepositoryItem = async (type: 'SECTION' | 'ITEM') => {
    handleSave(type)
    // console.log(
    //   'childNodes',
    //   childNodes[childNodes.length - 1],
    //   childNodes[childNodes.length - 1].details.id.startsWith('temp')
    // )

    // if (childNodes[childNodes.length - 1].details.id.startsWith('temp')) return

    // if (type === 'SECTION') {
    //   setChildNodes(prev =>
    //     prev
    //       ? [
    //           ...prev,
    //           {
    //             details: {
    //               id: 'temp_section',
    //               type: 'SECTION',
    //               title: '',
    //               description: '',
    //               order: childNodes.length + 1
    //             }
    //           }
    //         ]
    //       : [
    //           {
    //             details: {
    //               id: 'temp_section',
    //               title: '',
    //               type: 'SECTION',
    //               description: '',
    //               order: childNodes.length + 1
    //             }
    //           }
    //         ]
    //   )
    // } else {
    //   setChildNodes(prev =>
    //     prev
    //       ? [
    //           ...prev,
    //           {
    //             details: {
    //               id: 'temp_item',
    //               title: '',
    //               type: 'ITEM',
    //               description: '',
    //               referenceId: '',
    //               referenceType: '',
    //               order: childNodes.length + 1
    //             }
    //           }
    //         ]
    //       : [
    //           {
    //             details: {
    //               id: 'temp_item',
    //               title: '',
    //               type: 'ITEM',
    //               description: '',
    //               referenceId: '',
    //               referenceType: '',
    //               order: childNodes.length + 1
    //             }
    //           }
    //         ]
    //   )
    // }
  }
  // const { data: repoItems, isLoading } = api.repository.get.useQuery({})

  const params = useParams()
  // const handleAddSection = () => {}
  // const handleAddItem = () => {}

  return (
    <div className={cn('')}>
      <div className='flex justify-center'>
        {pparentType != 'SECTION' && (
          <Button
            disabled={isPending}
            // variant={'tint'}
            variant={'bg'}
            className={cn(
              'flex flex-1 rounded-none rounded-bl-xl',
              'shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'
            )}
            onClick={() => handlecreateRepositoryItem('SECTION')}
          >
            {/* <PlusCircleIcon className='size-6' /> */}
            <PlusIcon className='size-6' />
            Add Section
          </Button>
        )}
        <Button
          disabled={isPending}
          // variant={'tint'}
          variant={'bg'}
          className={cn(
            'flex flex-1 rounded-none rounded-br-xl',
            'shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'
          )}
          // onClick={() => handlecreateRepositoryItem('ITEM')}
          onClick={() => setIsCreateItemModalOpen(true)}
        >
          <PlusIcon className='size-6' />
          {/* <PlusCircleIcon className='size-6' /> */}
          Add Item
        </Button>
        {isCreateItemModalOpen && (
          <AddItemModal
            path={path}
            isOpen={isCreateItemModalOpen}
            onClose={() => {
              setIsCreateItemModalOpen(false)
            }}
            parentType={parentType}
            parentId={parentId}
            parentName={parentName}
          />
        )}
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={'outline'} className='mx-auto flex w-72'>
              <PlusCircleIcon className='size-6' />
              Add Item
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-fit lg:w-72'>
            <DropdownMenuItem onClick={handleAddItem}>
              <span>Problem</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Resource</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Interview Problem</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Interview Question</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>
    </div>
  )
}

export default AddItemButtons
