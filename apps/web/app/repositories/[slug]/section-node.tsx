'use client'
import { cn } from '@/lib/utils'
import { useRepository } from '@/store'
import { Button } from '@repo/ui'
import { useEffect, useState } from 'react'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@repo/ui'
import {
  ChevronDownIcon,
  ChevronRightIcon,
  EllipsisVerticalIcon,
  PlusIcon,
  TrashIcon
} from '@heroicons/react/24/outline'

interface SectionNodeProps {
  // path: { id: string; title: string }[]
  sectionData: any
  children: React.ReactNode

  // deleteItem: (id: string) => void
}
export const SectionNode = ({ sectionData, children }: SectionNodeProps) => {
  // const [curPath, setCurPath] = useState<{ id: string; title: string }[]>([])
  // useEffect(() => {
  //   if (path && path.length > 0) {
  //     setCurPath([...path, { id: sectionData.id, title: sectionData.title }])
  //   } else {
  //     setCurPath([{ id: sectionData.id, title: sectionData.title }])
  //   }
  // }, [path])
  const [expanded, setExpanded] = useState(true)

  // const [childNodes, setChildNodes] = useState(sectionData?.children)
  // useEffect(() => {
  //   setChildNodes(sectionData?.children)
  // }, [sectionData])

  // const [activeItem, setActiveItem] = useState<RepositoryItem | undefined>()

  // const {
  //   isCreateItemModalOpen,
  //   setIsCreateItemModalOpen,
  //   activeItem,
  //   setActiveItem
  // } = useEditRepository()

  const { setOpenItem, openItem } = useRepository()
  // const { isEditMode, setIsEditMode } = useState(false)

  return (
    <div
      className={cn(
        'flex-1 cursor-pointer overflow-hidden bg-background'
        // isEditMode && 'scale-[1.01] border border-primary shadow-md'
        // isEditMode && 'border border-primary shadow-md'
      )}
      // TODO: remove this
      onDoubleClick={e => {
        e.stopPropagation()
        // setOpenNotes(true)
        // if (e.detail === 2) {
        //   setOpenItem(sectionData)
        // }
        setOpenItem(sectionData)
        setExpanded(true)
      }}
    >
      <div className={cn('relative flex flex-col p-2 pb-4')}>
        <DropdownMenu>
          <DropdownMenuTrigger className='absolute right-1 top-1' asChild>
            <Button
              variant='ghost'
              className='h-8 w-8 rounded-none p-0 hover:bg-transparent'
            >
              <span className='sr-only'>Open menu</span>
              <EllipsisVerticalIcon className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {/* <DropdownMenuItem onClick={() => setIsEditMode(true)}>
                <Bolt className='mr-2 h-4 w-4' />
                Edit details
              </DropdownMenuItem> */}

            {/* <DropdownMenuSeparator /> */}
            {/* <DropdownMenuItem
                onClick={e => {
                  e.stopPropagation()
                  // setCurrentPath(path)
                  setEditingItem({
                    id: itemData.id,
                    title: itemData.problem?.title
                      ? itemData.problem.title
                      : itemData.title,
                    parentId: itemData.parentId,
                    type: 'ITEM'
                  })
                  setIsEditItemModalOpen(true)
                }}
              >
                <PencilSquareIcon className='mr-2 h-4 w-4' />
                Edit
              </DropdownMenuItem> */}

            {/* <DropdownMenuItem onClick={() => {}}>
                <PlusIcon className='mr-2 h-4 w-4' />
                Add section
              </DropdownMenuItem> */}
            {/* <DropdownMenuSeparator /> */}
            <DropdownMenuItem
              // onClick={() => deleteItem(sectionData.id)}
              onClick={e => {
                // e.stopPropagation()
                // setDeletionItem({
                //   id: sectionData.id,
                //   title: sectionData.title
                // })
                // setIsDeleteItemModalOpen(true)
              }}
            >
              <TrashIcon className='mr-2 h-4 w-4' />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className='flex items-center gap-1'>
          <h2
            className={cn(
              'scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0'
            )}
          >
            {/* Consectetur fugiat do duis ut. */}
            {sectionData.title}
          </h2>
          {expanded ? (
            <ChevronDownIcon
              className='size-4'
              onClick={e => {
                e.stopPropagation()
                setExpanded(false)
              }}
            />
          ) : (
            <ChevronRightIcon
              className='size-5'
              onClick={e => {
                e.stopPropagation()
                setExpanded(true)
              }}
            />
          )}
        </div>
      </div>
      {/* <div className='bg-foreground'>{children}</div> */}
      {expanded && <>{children}</>}
      {/* <div>hi{expanded}</div> */}
    </div>
  )
}
