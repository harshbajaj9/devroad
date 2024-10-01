'use client'
import { useEditRepository, useRepository, useRepoStructure } from '@/store'
import {
  ArrowRightStartOnRectangleIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ClipboardDocumentIcon,
  Cog6ToothIcon,
  DocumentIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  PlusIcon,
  QuestionMarkCircleIcon,
  TrashIcon,
  WrenchScrewdriverIcon,
  XCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

import { $Enums, Repository, RepositoryItem } from '@prisma/client'

import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { CSS } from '@dnd-kit/utilities'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
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
import React, { useEffect, useState } from 'react'
import AddItemButtons from './add-item-button'
import { api } from '@/trpc/react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import {
  Bolt,
  FileCog,
  FolderCog,
  Grip,
  GripVertical,
  Mail,
  MessageSquare,
  PlusCircle,
  Save,
  User,
  UserPlus
} from 'lucide-react'
import {
  closestCenter,
  DragCancelEvent,
  DragEndEvent,
  // DndContext,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  TouchSensor,
  useDroppable,
  useSensor,
  useSensors
} from '@dnd-kit/core'
// https://youtu.be/a6lYZWN4lVA?t=483
import dynamic from 'next/dynamic'
const DndContextWithNoSSR = dynamic(
  () => import('@dnd-kit/core').then(mod => mod.DndContext),
  { ssr: false }
)
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { Jost, Poppins } from 'next/font/google'
const font = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin']
})
const font2 = Jost({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin']
})
interface SectionNodeProps {
  path: { id: string; title: string }[]
  sectionData: any
  updateOrder: () => void
  // deleteItem: (id: string) => void
}
const SectionNode = ({
  sectionData,
  updateOrder,
  // deleteItem,
  path
}: SectionNodeProps) => {
  const [curPath, setCurPath] = useState<{ id: string; title: string }[]>([])
  useEffect(() => {
    if (path && path.length > 0) {
      setCurPath([...path, { id: sectionData.id, title: sectionData.title }])
    } else {
      setCurPath([{ id: sectionData.id, title: sectionData.title }])
    }
  }, [path])
  const [expanded, setExpanded] = useState(true)
  const { setCurrentPath } = useRepoStructure()
  const {
    setIsDeleteItemModalOpen,
    setDeletionItem,
    isMoveItemModalOpen,
    setIsMoveItemModalOpen,
    setMovingItem
  } = useEditRepository()
  // console.log('curpath', curPath)
  // const [isEditMode, setIsEditMode] = useState(false)
  const [childNodes, setChildNodes] = useState(sectionData?.children)
  useEffect(() => {
    setChildNodes(sectionData?.children)
  }, [sectionData])
  // const [activeItem, setActiveItem] = useState<RepositoryItem | undefined>()
  const { isOver, setNodeRef } = useDroppable({
    id: 'droppable'
  })
  const style = {
    color: isOver ? 'green' : undefined
  }
  const onDragStart = (event: DragStartEvent) => {
    const { active } = event
    setActiveItem(childNodes?.find(childNode => childNode.order === active.id))
  }
  const onDragCancel = (event: DragCancelEvent) => {
    setActiveItem(undefined)
  }
  const onDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    if (active && over && active.id === over.id) {
      return
    }
    const oldIndex = childNodes.findIndex(
      childNode => childNode.order === active.id
    )
    const newIndex = childNodes.findIndex(
      childNode => childNode.order === over?.id
    )

    // create a duplicate array
    const items = Array.from(childNodes)
    // create an id to item map from the initial array
    const idChildMap = new Map<string, any>(items.map(item => [item.id, item]))

    const [reorderedItem] = items.splice(oldIndex, 1)
    items.splice(newIndex, 0, reorderedItem)

    // Update the local state with reordered items
    const reorderItems = items.map((item, index) => ({
      ...item,
      order: index + 1
    }))

    const prioritizedItems = reorderItems.map((item, index) => ({
      id: item.id,
      order: item.order
    }))

    const changedPriorities = prioritizedItems.filter(item => {
      const repoKid = idChildMap.get(item.id)
      return repoKid?.order !== item.order
    })
    console.log('changedPriorities', changedPriorities)
    setChildNodes(childNodes => {
      const oldIndex = childNodes.findIndex(
        childNode => childNode.order === active.id
      )
      const newIndex = childNodes.findIndex(
        childNode => childNode.order === over.id
      )
      return arrayMove(childNodes, oldIndex, newIndex)
    })
    await updateOrder(changedPriorities)
    setActiveItem(undefined)

    // const { active, over } = event
    // if (active.id === over.id) {
    //   return
    // }
    // setChildNodes(childNodes => {
    //   const oldIndex = childNodes.findIndex(
    //     childNode => childNode.order === active.id
    //   )
    //   const newIndex = childNodes.findIndex(
    //     childNode => childNode.order === over.id
    //   )
    //   return arrayMove(childNodes, oldIndex, newIndex)
    // })
    // setActiveItem(undefined)
  }

  const {
    isCreateItemModalOpen,
    setIsCreateItemModalOpen,
    activeItem,
    setActiveItem
  } = useEditRepository()
  const { setOpenItem, openItem } = useRepository()
  const { isEditMode, setIsEditMode } = useState(false)

  return (
    <div
      className={cn(
        'flex-1 cursor-pointer overflow-hidden bg-background'
        // isEditMode && 'scale-[1.01] border border-primary shadow-md'
        // isEditMode && 'border border-primary shadow-md'
      )}
      onClick={e => {
        e.stopPropagation()
        // setOpenNotes(true)
        if (e.detail === 2) {
          setOpenItem(sectionData)
        }
        setExpanded(true)
      }}
    >
      <div
        className={cn(
          'relative flex flex-col p-2 pb-4',
          isEditMode && 'bg-background'
        )}
      >
        {isEditMode ? (
          <div className='flex justify-end'>
            <Button
              variant={'outline'}
              className='flex items-center gap-2 rounded-full border'
              // onClick={() => setIsEditMode(false)}
            >
              {/* <PencilIcon className='size-3' /> */}
              Save
              <Save
                // onClick={() => setIsEditMode(false)}
                className='size-5 text-muted-foreground'
              />
            </Button>
          </div>
        ) : (
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
              <DropdownMenuItem
                // onClick={() => handlecreateRepositoryItem('SECTION')}
                onClick={e => {
                  e.stopPropagation()
                  setCurrentPath(curPath)
                  setIsCreateItemModalOpen(true)
                }}
              >
                <PlusIcon className='mr-2 h-4 w-4' />
                Add
              </DropdownMenuItem>
              {sectionData.depth < 2 && (
                <DropdownMenuItem
                  onClick={e => {
                    e.stopPropagation()

                    setCurrentPath(curPath)
                    setMovingItem({
                      id: sectionData.id,
                      title: sectionData.title,
                      parentId: sectionData.parentId,
                      type: 'SECTION'
                    })
                    setIsMoveItemModalOpen(true)
                    console.log('isMoveItemModalOpen', isMoveItemModalOpen)
                  }}
                >
                  <ArrowRightStartOnRectangleIcon className='mr-2 h-4 w-4' />
                  Move
                </DropdownMenuItem>
              )}
              {/* <DropdownMenuItem onClick={() => {}}>
                <PlusIcon className='mr-2 h-4 w-4' />
                Add section
              </DropdownMenuItem> */}
              {/* <DropdownMenuSeparator /> */}
              <DropdownMenuItem
                // onClick={() => deleteItem(sectionData.id)}
                onClick={e => {
                  e.stopPropagation()
                  setDeletionItem({
                    id: sectionData.id,
                    title: sectionData.title
                  })
                  setIsDeleteItemModalOpen(true)
                }}
              >
                <TrashIcon className='mr-2 h-4 w-4' />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          // <Button
          //   variant={'outline'}
          //   className='group flex items-center gap-2 rounded-full border-transparent hover:border-input'
          //   onClick={() => setIsEditMode(true)}
          // >
          //   <span className='hidden text-muted-foreground group-hover:inline'>
          //     Edit
          //   </span>
          //   <Bolt
          //     onClick={() => setIsEditMode(true)}
          //     className='size-5 text-muted-foreground'
          //   />
          // </Button>
        )}
        <div className='flex items-center gap-1'>
          {isEditMode ? (
            <Input
              className='scroll-m-20 border-2 border-transparent bg-transparent pb-2 text-3xl font-semibold tracking-tight first:mt-0 focus-visible:border-b-primary focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0'
              value={''}
              placeholder='Title'
            />
          ) : (
            <h2
              className={cn(
                'scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0',
                font2.className
              )}
            >
              {/* Consectetur fugiat do duis ut. */}
              {sectionData.title}
            </h2>
          )}
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
        {/* {isEditMode ? (
          <Textarea
            className='border-2 bg-transparent'
            value={''}
            placeholder='Description'
          />
        ) : (
          <div className=''>{sectionData.description}</div>
        )} */}
      </div>
      {/* <Sortable
        {...props}
        style={{ transform: 'translate3d(100px, 100px, 0)' }}
      /> */}

      {childNodes?.length > 0 && expanded && (
        // <div className='flex flex-col p-8'>
        //   <div className='border'>
        //     {childNodes.map(child => (
        //       <EditableNode nodeData={child} />
        //     ))}
        //   </div>
        // </div>
        <DndContextWithNoSSR
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
          onDragStart={onDragStart}
          onDragCancel={onDragCancel}
        >
          <SortableContext
            items={childNodes.map(childNode => childNode.order)}
            strategy={verticalListSortingStrategy}
          >
            <div
              ref={setNodeRef}
              style={style}
              className='flex flex-col gap-1 p-4 pb-8 pt-0'
            >
              {childNodes.map(childNode => {
                return (
                  <EditableNode
                    updateOrder={updateOrder}
                    path={curPath}
                    forceDragging={true}
                    key={childNode.id}
                    nodeData={childNode}
                    // deleteItem={deleteItem}
                  />
                )
              })}
            </div>
          </SortableContext>
          <DragOverlay style={{ transformOrigin: '0 0 ' }}>
            {activeItem ? (
              <EditableNode
                path={curPath}
                nodeData={activeItem}
                updateOrder={updateOrder}
                // deleteItem={deleteItem}
                // removeItem={removeItem}
                forceDragging={true}
              />
            ) : null}
          </DragOverlay>
        </DndContextWithNoSSR>
      )}
      {/* {isEditMode && (
        <div className={cn('display-block')}>
          <AddItemButtons
            path={curPath}
            parentName={sectionData.title}
            setChildNodes={setChildNodes}
            childNodes={childNodes}
            parentType={'SECTION'}
            pparentType={sectionData.parentType}
            parentId={sectionData.id}
          />
        </div>
      )} */}
    </div>
  )
}
export const getPlatformIcon = (platform: $Enums.Platform) => {
  if (platform === $Enums.Platform.LC)
    return (
      <Image
        className='drop-shadow-2xl'
        src={'/lc.png'}
        width={20}
        height={20}
        alt='lc'
      ></Image>
    )
}
interface ItemNodeProps {
  itemData: RepositoryItem & { children: RepositoryItem }
}
const ItemNode = ({ itemData }: ItemNodeProps) => {
  // const [mode, setMode] = useState(0)
  const [isEditMode, setIsEditMode] = useState(false)
  const { setOpenItem, openItem } = useRepository()
  const { setCurrentPath } = useRepoStructure()
  const {
    setIsDeleteItemModalOpen,
    deletionItem,
    setDeletionItem,
    setIsMoveItemModalOpen,
    movingItem,
    setMovingItem
  } = useEditRepository()

  return (
    <div
      className={cn(
        'relative flex-1 cursor-pointer bg-background p-1 text-sm text-foreground',
        // isEditMode && 'scale-[1.01] border border-primary shadow-md'
        isEditMode && 'border border-primary shadow-md'
      )}
      onClick={e => {
        e.stopPropagation()
        // if (e.target !== e.currentTarget) return

        // console.log('hey', itemData.id)
        // setOpenNotes(true)
        if (e.detail === 2) setOpenItem(itemData)
      }}
    >
      {isEditMode ? (
        <div className='flex justify-end'>
          <Button
            variant={'outline'}
            className='flex items-center gap-2 rounded-full border'
            // onClick={() => setIsEditMode(false)}
          >
            {/* <PencilIcon className='size-3' /> */}
            Save
            <Save
              // onClick={() => setIsEditMode(false)}
              className='size-5 text-muted-foreground'
            />
          </Button>
        </div>
      ) : (
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
            {itemData.referenceType === 'CUSTOM' && (
              <DropdownMenuItem
                onClick={e => {
                  e.stopPropagation()
                }}
              >
                <PencilIcon className='mr-2 h-4 w-4' />
                Edit
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              onClick={e => {
                e.stopPropagation()
                setMovingItem({
                  id: itemData.id,
                  title: itemData.problem?.title
                    ? itemData.problem.title
                    : itemData.title,
                  parentId: itemData.parentId,
                  type: 'ITEM'
                })
                setIsMoveItemModalOpen(true)
              }}
            >
              <ArrowRightStartOnRectangleIcon className='mr-2 h-4 w-4' />
              Move
            </DropdownMenuItem>
            <DropdownMenuItem
              // onClick={() => deleteItem(itemData.id)}
              onClick={e => {
                e.stopPropagation()
                setDeletionItem({
                  id: itemData.id,
                  title: itemData.problem?.title
                    ? itemData.problem.title
                    : itemData.title
                })
                setIsDeleteItemModalOpen(true)
                console.log('yoo', deletionItem)
              }}
            >
              <TrashIcon className='mr-2 h-4 w-4' />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      <div
        className={cn('flex justify-between text-sm text-foreground')}
        // key={problem.id}
      >
        <div className='flex items-center justify-start'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild></TooltipTrigger>
              <TooltipContent>
                <p>Status</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div>
            <div
              className='flex'
              // className={cn(
              //   'flex cursor-pointer text-sm text-foreground transition-colors duration-200',
              //   mode === 0 && 'odd:bg-background even:bg-backgroundalt',
              //   mode === 1 &&
              //     'bg-green-50 hover:bg-green-50 dark:bg-teal-950 dark:hover:bg-green-950',
              //   mode === 2 &&
              //     'bg-yellow-50 hover:bg-yellow-50 dark:bg-amber-950 dark:hover:bg-amber-950'
              // )}
              // key={problem.id}
              // onClick={handleCompanyDetailPageTransition}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className='border-0 p-1'>
                      <p
                        className={cn(
                          'font-semibold leading-7 text-muted-foreground [&:not(:first-child)]:mt-6',
                          font2.className
                        )}
                      >
                        {
                          itemData.problem?.title
                            ? itemData.problem.title
                            : itemData.title

                          // itemData.id
                          // problem?.title
                          // ? formatDate(new Date(problem.lastVisited), 'do MMM yyyy')
                          // : '-'
                        }
                      </p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className={cn(font2.className)}>
                      {itemData.problem?.title ?? itemData.id}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <div className='p-auto flex min-h-full items-center justify-start border-0 px-2'>
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  href={itemData.problem?.url ?? '#'}
                  className=''
                >
                  {getPlatformIcon('LC')}
                </a>
                {/* {problem.url ?? '-'} */}
              </div>

              {/* <div className='border-0 p-2'>
            <p className='flex justify-start'>
              <EllipsisVerticalIcon />
            </p>
          </div> */}
            </div>
            <div className='flex items-center'>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className='border-0 px-1'>
                      <p className='flex justify-start'>
                        <span className='px-1 text-[10px] font-semibold text-background text-green-600 dark:text-green-400'>
                          {itemData.problem?.difficulty ?? 'EASY'}
                        </span>
                      </p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Difficulty</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className='border-0 px-1'>
                      <p className='flex justify-start text-xs font-semibold text-muted-foreground'>
                        {itemData.problem?.category ?? 'DSA'}
                      </p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Category</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
        {/* <div className='flex items-center gap-4 p-2 px-4'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className=''>
                  <DocumentIcon
                    onClick={() => {}}
                    className={cn(
                      'size-6 text-muted-foreground text-primary'
                      // mode === 0 && '',
                      // mode === 1 && 'text-green-400',
                      // mode === 2 && 'text-yellow-400'
                    )}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Notes & Resources</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div> */}
      </div>
    </div>
  )
}
interface EditableNodeProps {
  // nodeData: { details: RepositoryItem; children: EditableNodeProps }
  nodeData: any
  forceDragging?: boolean
  updateOrder: any
  // deleteItem: (id: string) => void
  path: { id: string; title: string }[]
}
export const EditableNode = ({
  path,
  nodeData,
  forceDragging,
  updateOrder
  // deleteItem
}: EditableNodeProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: nodeData.order })
  const style = {
    transition,
    transform: CSS.Translate.toString(transform)
    // cursor: isDragging || forceDragging ? 'grabbing' : 'grab'
  }

  return (
    <div
      className={cn(
        'flex items-center justify-start overflow-hidden rounded-md border bg-muted',
        // 'shadow-sm shadow-muted-foreground/10',
        isDragging && 'border-primary',
        path.length === 1 &&
          'shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'
      )}
      style={style}
      ref={setNodeRef}
    >
      {/* <XCircleIcon
        className='absolute right-0 top-0 size-5'
        onClick={() => deleteItem(nodeData.id)}
      /> */}

      <div
        className={cn(
          'flex flex-col justify-center self-stretch border-r'
          // isDragging && 'border-primary'
        )}
        style={{ cursor: isDragging || forceDragging ? 'grabbing' : 'grab' }}
        ref={setActivatorNodeRef}
        {...attributes}
        {...listeners}
      >
        <EllipsisVerticalIcon className='size-5' />
      </div>
      {nodeData.type === 'SECTION' ? (
        <SectionNode
          path={path}
          updateOrder={updateOrder}
          sectionData={nodeData}
          // deleteItem={deleteItem}
        />
      ) : (
        <ItemNode
          itemData={nodeData}
          // deleteItem={deleteItem}
        />
      )}
    </div>
  )
}
