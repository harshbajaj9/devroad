'use client'
import React from 'react'
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
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { api } from '@/trpc/react'
import { z } from 'zod'
import { useParams, usePathname } from 'next/navigation'

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
}

const AddItemButtons = ({
  parentType,
  parentId,
  pparentType
}: AddItemButtonsProps) => {
  const { mutateAsync: createRepoItem } = api.repositoryItem.create.useMutation(
    {
      // refetchOnWindowFocus: false,
      onSuccess(createdItem: { id: String }) {
        Toast({ title: 'Auto Greet Updated', type: 'success' })
        // Toaster({ title: 'Collection Created', type: 'success' })
        // const prevData = utils.autoGreet.getAllAutoGreetMessages.getData(
        //   autoGreet.segment_id
        // )
        // setLiveFeedCards(data)
        // router.push(`/repositories/${createdItem.id}`)

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
    }
  )

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
      const collection = await createRepoItem(data)
      Toast({
        title: 'Collection created successfully'
      })

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
  }
  // const { data: repoNode, isLoading } = api.repository.get.useQuery({})

  const params = useParams()
  // const handleAddSection = () => {}
  // const handleAddItem = () => {}

  return (
    <div className=''>
      <div className='flex justify-center'>
        {pparentType != 'SECTION' && (
          <Button
            variant={'outline'}
            className='flex flex-1 rounded-none'
            onClick={() => handlecreateRepositoryItem('SECTION')}
          >
            <PlusCircleIcon className='size-6' />
            Add Section
          </Button>
        )}
        <Button
          variant={'outline'}
          className='flex flex-1 rounded-none'
          onClick={() => handlecreateRepositoryItem('ITEM')}
        >
          <PlusCircleIcon className='size-6' />
          Add Item
        </Button>
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
