'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { api } from '@/trpc/react'
import {
  Button,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  RadioGroup,
  RadioGroupItem,
  ScrollArea,
  Toast
} from '@repo/ui'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@repo/ui'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { getPlatformIcon } from './editable-node'

import { RepoStructureNode, useEditRepository, useRepoStructure } from '@/store'
import SectionPicker from './section-picker'
import { ProblemData } from '@/typing'
export const allowedProblemSetTypes: any[] = ['PROBLEM', 'RESOURCE', 'CUSTOM']
export const createRepositoryItemProblemSchema = z.object({
  id: z.string().min(2).optional()
})

type Props = {
  // onClose: () => void
  refetchData?: () => void
  // deleteItem: (id: string) => void
}
type ItemType = 'PROBLEM' | 'CUSTOM' | 'SECTION' | null
const DeleteItemModal = ({ refetchData }: Props) => {
  const { currentPath, setCurrentPath, setDirectoryModal, repoStructure } =
    useRepoStructure()
  const { setIsDeleteItemModalOpen } = useEditRepository()
  const utils = api.useUtils()

  const { mutateAsync: deleteNode, isPending: isDeletePending } =
    api.repositoryItem.deleteNode.useMutation({
      onError: error => {
        utils.repository.get.invalidate()
        Toast({
          type: 'error',
          title: 'Error!',
          message: error?.message || 'Something went wrong',
          duration: 2000
        })
      },
      onSuccess: (deletedItemId: string) => {
        // const updated = repoKids
        //   .filter(item => item.id !== deletedItemId)
        //   .map((item, i) => ({ ...item, order: i + 1 }))
        // setRepoKids(updated)
        setIsDeleteItemModalOpen(false)
        utils.repository.get.invalidate()
        Toast({ title: 'Item deleted', type: 'success' })
      },
      onMutate() {
        utils.repository.get.cancel()
      }
    })
  const [step, setStep] = useState(1)

  const [itemSearchTerm, setItemSearchTerm] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
  const [filteredProblems, setFilteredProblems] = useState<ProblemData[]>([])
  const [selectedProblem, setSelectedProblem] = useState<ProblemData>()

  const [itemTitle, setItemTitle] = useState('')
  const [itemDescription, setItemDescription] = useState('')
  const [itemImageUrl, setItemImageUrl] = useState('')

  const [customItemLink, setCustomItemLink] = useState('')
  // const [searchQuery, setSearchQuery] = useState('')
  const { deletionItem } = useEditRepository()
  if (!deletionItem) {
    return
  }
  const handleDelete = async () => {
    await deleteNode({ node_id: deletionItem.id })
  }

  return (
    <>
      <div className='fixed inset-0 z-40 bg-background/40'></div>
      {/* <SelectDirectoryModal /> */}
      <div className='border-gray fixed inset-0 left-[50%] top-[50%] z-50 m-4 flex h-fit -translate-x-1/2 -translate-y-1/2 flex-col gap-6 rounded-2xl border bg-background p-8'>
        <div>
          <h2 className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0'>
            Remove {deletionItem.title} ?
          </h2>
        </div>

        <div className='flex justify-end gap-2'>
          <Button
            variant='outline'
            onClick={() => {
              setIsDeleteItemModalOpen(false)
            }}
          >
            Cancel
          </Button>

          <Button onClick={handleDelete}>Delete</Button>
        </div>
      </div>
    </>
  )
}

export default DeleteItemModal
