'use client'
import React, { useState } from 'react'
import { Button, Toast } from '@repo/ui'
import { PlusIcon } from '@heroicons/react/24/outline'
import { api } from '@/trpc/react'
import { z } from 'zod'
import { useParams, usePathname } from 'next/navigation'
import AddItemModal from './add-item-modal'
import { cn } from '@/lib/utils'
import { useEditRepository } from '@/store'

export const createRepositoryItemSchema = z.object({
  parentType: z.enum(['REPOSITORY', 'SECTION']),
  parentId: z.string(),
  type: z.enum(['SECTION', 'ITEM'])
})

export type RepositoryItemCreationSchema = z.infer<
  typeof createRepositoryItemSchema
>

interface AddItemButtonsProps {
  setChildNodes: React.Dispatch<React.SetStateAction<any>>
}

const AddItemButtons = ({ setChildNodes }: AddItemButtonsProps) => {
  const { isCreateItemModalOpen, setIsCreateItemModalOpen } =
    useEditRepository()
  // const [isCreateSectionModalOpen, setIsCreateSectionModalOpen] =
  //   useState<boolean>(false)

  return (
    <div className={cn('')}>
      <div className='flex justify-center'>
        <Button
          // disabled={isPending}
          // variant={'tint'}
          variant={'bg'}
          className={cn(
            'flex flex-1 rounded-none'
            // 'shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'
          )}
          // onClick={() => handlecreateRepositoryItem('ITEM')}
          onClick={() => {
            setIsCreateItemModalOpen(true)
          }}
        >
          <PlusIcon className='size-5' />
          Add
        </Button>
      </div>
    </div>
  )
}

export default AddItemButtons
