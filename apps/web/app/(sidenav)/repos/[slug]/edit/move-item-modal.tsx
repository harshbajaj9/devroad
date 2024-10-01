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
import MoveSectionPicker from './section-picker-move'
export const allowedProblemSetTypes: any[] = ['PROBLEM', 'RESOURCE', 'CUSTOM']
export const createRepositoryItemProblemSchema = z.object({
  id: z.string().min(2).optional()
})

type Props = {
  refetchData?: () => void
  // movingItem: (id: string) => void
}
type ItemType = 'PROBLEM' | 'CUSTOM' | 'SECTION' | null
const MoveItemModal = ({ refetchData }: Props) => {
  const { currentPath, setCurrentPath, setDirectoryModal, repoStructure } =
    useRepoStructure()
  const utils = api.useUtils()

  const { mutateAsync: createRepositoryItem } =
    api.repositoryItem.create.useMutation({
      // refetchOnWindowFocus: false,
      onSuccess(createdCollection: { id: String }) {
        Toast({ title: 'Item created', type: 'success' })
        // utils.repository.get.invalidate('lucky-you-cm11ct0ur0000egusctw514he')
        utils.repository.get.invalidate()

        // router.push(`/repos/${createdCollection.id}`)
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
  const { movingItem, setIsMoveItemModalOpen } = useEditRepository()
  if (!movingItem) {
    return
  }

  const { mutateAsync: moveNode, isPending: isMovingPending } =
    api.repositoryItem.moveNode.useMutation({
      onError: error => {
        utils.repository.get.invalidate()
        Toast({
          type: 'error',
          title: 'Error!',
          message: error?.message || 'Something went wrong',
          duration: 2000
        })
      },
      onSuccess: (movedItemId: string) => {
        utils.repository.get.invalidate()
        Toast({
          title: 'Item moved',
          type: 'success'
        })
        setIsMoveItemModalOpen(false)
      },
      onMutate() {
        utils.repository.get.cancel()
      }
    })
  if (!currentPath || currentPath.length < 1) return
  const handleMove = async () => {
    if (currentPath[currentPath.length - 1]?.id === movingItem.parentId) {
      Toast({
        title: 'Same moved',
        type: 'success'
      })
      return
    }
    await moveNode({
      node_id: movingItem.id,
      newparent_id: currentPath[currentPath.length - 1]?.id as string,
      newparent_type: currentPath.length === 1 ? 'REPOSITORY' : 'SECTION'
    })
  }

  return (
    <>
      <div className='fixed inset-0 z-40 bg-background/40'></div>
      {/* <SelectDirectoryModal /> */}
      <div className='border-gray fixed inset-0 left-[50%] top-[50%] z-50 m-4 flex h-fit -translate-x-1/2 -translate-y-1/2 flex-col gap-6 rounded-2xl border bg-background p-8'>
        <div>
          <h2 className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0'>
            Move {movingItem.title} ?
          </h2>
        </div>
        <MoveSectionPicker itemType={movingItem.type} />

        <div className='flex justify-end gap-2'>
          <Button
            variant='outline'
            onClick={() => {
              setIsMoveItemModalOpen(false)
            }}
          >
            Cancel
          </Button>

          <Button onClick={handleMove}>Move</Button>
        </div>
      </div>
    </>
  )
}

export default MoveItemModal
