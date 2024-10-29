'use client'
import {
  useEditRepository,
  useFilterTags,
  useNotes,
  useRepository,
  useRepoStructure
} from '@/store'
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
  PencilSquareIcon,
  PlusIcon,
  QuestionMarkCircleIcon,
  TrashIcon,
  WrenchScrewdriverIcon,
  XCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

import { $Enums, Repository, RepositoryItem } from '@repo/database'

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
import { cn, getCountValues } from '@/lib/utils'
import Image from 'next/image'
import {
  Bolt,
  CopyrightIcon,
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
import EditItemTags from './edit-item-tags'
const font = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin']
})
const font2 = Jost({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin']
})

// interface ProgressSegment {
//   value: number
//   color: string
//   label: string
// }

// interface MultiSegmentProgressProps
//   extends React.HTMLAttributes<HTMLDivElement> {
//   segments: ProgressSegment[]
//   height?: number
// }

interface MultiSegmentProgressProps
  extends React.HTMLAttributes<HTMLDivElement> {
  // segments: ProgressSegment[]
  // height?: number
  done: number
  revisit: number
  total: number
}

const MultiSegmentProgress = React.forwardRef<
  HTMLDivElement,
  MultiSegmentProgressProps
>(({ done, revisit, total, className, ...props }, ref) => {
  return (
    <div className='space-y-2'>
      <div
        ref={ref}
        className={cn(
          'relative h-1 overflow-hidden rounded-full bg-red-500',
          className
        )}
        {...props}
      >
        <div
          className='absolute top-0 flex h-full items-center justify-center bg-green-500'
          style={{
            width: `${(done / total) * 100}%`,
            left: `0%`
          }}
        >
          {/* {segmentWidth > 10 && `${Math.round(segmentWidth)}%`} */}
        </div>
        <div
          className='absolute top-0 flex h-full items-center justify-center bg-yellow-500'
          style={{
            width: `${(revisit / total) * 100}%`,
            left: `${(done / total) * 100}%`
          }}
        ></div>
        {/* {segments.map((segment, index) => {
          const segmentWidth = (segment.value / totalValue) * 100
          const leftPosition = segments
            .slice(0, index)
            .reduce((sum, s) => sum + (s.value / totalValue) * 100, 0)

          return (
            <div
              key={index}
              className='absolute top-0 flex h-full items-center justify-center text-xs font-bold text-primary-foreground'
              style={{
                width: `${segmentWidth}%`,
                left: `${leftPosition}%`,
                backgroundColor: segment.color
              }}
            >
              {segmentWidth > 10 && `${Math.round(segmentWidth)}%`}
            </div>
          )
        })} */}
      </div>
      {/* <div className='flex justify-between text-sm text-muted-foreground'>
        {segments.map((segment, index) => (
          <div key={index} className='flex items-center'>
            <div
              className='mr-1 h-3 w-3 rounded-full'
              style={{ backgroundColor: segment.color }}
            />
            {segment.label}
          </div>
        ))}
      </div> */}
    </div>
  )
})
MultiSegmentProgress.displayName = 'MultiSegmentProgress'

// const MultiSegmentProgress = React.forwardRef<
//   HTMLDivElement,
//   MultiSegmentProgressProps
// >(({ segments, height = 24, className, ...props }, ref) => {
//   const totalValue = segments.reduce((sum, segment) => sum + segment.value, 0)

//   return (
//     <div className='space-y-2'>
//       <div
//         ref={ref}
//         className={cn(
//           'relative overflow-hidden rounded-full bg-secondary',
//           className
//         )}
//         style={{ height: `${height}px` }}
//         {...props}
//       >
//         {segments.map((segment, index) => {
//           const segmentWidth = (segment.value / totalValue) * 100
//           const leftPosition = segments
//             .slice(0, index)
//             .reduce((sum, s) => sum + (s.value / totalValue) * 100, 0)

//           return (
//             <div
//               key={index}
//               className='absolute top-0 flex h-full items-center justify-center text-xs font-bold text-primary-foreground'
//               style={{
//                 width: `${segmentWidth}%`,
//                 left: `${leftPosition}%`,
//                 backgroundColor: segment.color
//               }}
//             >
//               {segmentWidth > 10 && `${Math.round(segmentWidth)}%`}
//             </div>
//           )
//         })}
//       </div>
//       <div className='flex justify-between text-sm text-muted-foreground'>
//         {segments.map((segment, index) => (
//           <div key={index} className='flex items-center'>
//             <div
//               className='mr-1 h-3 w-3 rounded-full'
//               style={{ backgroundColor: segment.color }}
//             />
//             {segment.label}
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// })
// MultiSegmentProgress.displayName = 'MultiSegmentProgress'

// export default function VisibleMultiSegmentProgressBar() {
//   const segments: ProgressSegment[] = [
//     { value: 15, color: "#3b82f6", label: "Completed" },
//     { value: 35, color: "#ef4444", label: "In Progress" },
//     { value: 25, color: "#000000", label: "Not Started" },
//   ]

//   return (
//     <div className="w-full max-w-md p-4 bg-background rounded-lg shadow">
//       <h2 className="text-lg font-semibold mb-4">Project Progress</h2>
//       <MultiSegmentProgress segments={segments} />
//     </div>
//   )
// }

interface SectionNodeProps {
  path: { id: string; title: string }[]
  sectionData: NodeType
  updateOrder: () => void
  isOwner: boolean
  setDisableDnD: React.Dispatch<React.SetStateAction<boolean>>
  disableDnD: boolean
  // deleteItem: (id: string) => void
}

const SectionNode = ({
  sectionData,
  updateOrder,
  isOwner,
  // deleteItem,
  disableDnD,
  setDisableDnD,
  path
}: SectionNodeProps) => {
  const [curPath, setCurPath] = useState<{ id: string; title: string }[]>([])
  // const [disableDnD, setDisableDnD] = useState(false)
  useEffect(() => {
    if (path && path.length > 0) {
      setCurPath([
        ...path,
        { id: sectionData.id, title: sectionData.title ?? 'MISSING_TITLE' }
      ])
    } else {
      setCurPath([
        { id: sectionData.id, title: sectionData.title ?? 'MISSING_TITLE' }
      ])
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

  const { doneItems, revisitItems } = useRepository()

  const [countValues, setCountValues] = useState<{
    done: number
    revisit: number
    total: number
  }>({ done: 0, revisit: 0, total: 0 })
  useEffect(() => {
    const { done, total, revisit } = getCountValues(
      sectionData,
      doneItems,
      revisitItems
    )
    setCountValues({ done, revisit, total })
  }, [revisitItems, doneItems])

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
    setDisableDnD(true)
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
        // if (e.detail === 2) {
        //   setOpenItem(sectionData)
        // }
        setOpenItem(undefined)
        setTimeout(() => {
          setOpenItem(sectionData)
        }, 0)
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
                Remove
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
        {/* <div className='ml-auto mr-8 h-1 w-1/2 rounded-full bg-foreground'></div> */}
        <div
          className={cn(
            'relative ml-0 mr-auto h-2 w-1/2 max-w-md overflow-hidden rounded-md',
            (countValues.done > 0 || countValues.revisit > 0) && 'border shadow'
          )}
        >
          {/* <h2 className='mb-4 text-lg font-semibold'>Project Progress</h2> */}
          {/* <MultiSegmentProgress
            done={countValues.done}
            revisit={countValues.revisit}
            total={countValues.total}
          /> */}
          <div
            className='absolute top-0 flex h-full items-center justify-center bg-green-500'
            style={{
              width: `${(countValues.done / countValues.total) * 100}%`,
              left: `0%`
            }}
          >
            {/* {segmentWidth > 10 && `${Math.round(segmentWidth)}%`} */}
          </div>
          <div
            className='absolute top-0 flex h-full items-center justify-center bg-yellow-500'
            style={{
              width: `${(countValues.revisit / countValues.total) * 100}%`,
              left: `${(countValues.done / countValues.total) * 100}%`
            }}
          ></div>
          {/* <div
            className='absolute top-0 flex h-full items-center justify-center bg-red-500'
            style={{
              width: `${(countValues.total - (countValues.done + countValues.revisit) / countValues.total) * 100}%`,
              left: `${(countValues.done + countValues.revisit / countValues.total) * 100}%`
            }}
          ></div> */}
        </div>
        <div
          className='flex w-fit items-center gap-1'
          onClick={e => {
            e.stopPropagation()
            if (e.detail > 1) {
              return
            }
            setExpanded(prev => !prev)
          }}
        >
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
              className='size-4'
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
                    isOwner={isOwner}
                    disableDnD={disableDnD}
                    setDisableDnD={setDisableDnD}
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
                isOwner={isOwner}
                // deleteItem={deleteItem}
                // removeItem={removeItem}
                forceDragging={true}
                disableDnD={disableDnD}
                setDisableDnD={setDisableDnD}
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
        // unoptimized={true}
        alt='lc'
      ></Image>
    )
}
interface ItemNodeProps {
  itemData: RepositoryItem & {
    // children: RepositoryItem[]
    lastStatus: number
    tags: string[]
  }
  setQueryUserData: (flag: boolean) => void
  path: { id: string; title: string }[]
  isOwner: boolean
  tags: string[]
  setTags: any
  status: number
  setStatus: any
}
const ItemNode = ({
  itemData,
  path,
  isOwner,
  setQueryUserData,
  tags,
  setTags,
  status,
  setStatus
}: ItemNodeProps) => {
  // const [status, setStatus] = useState(itemData.lastStatus)
  const [isEditMode, setIsEditMode] = useState(false)
  const { setOpenItem, openItem } = useRepository()
  const { setCurrentPath } = useRepoStructure()
  const { hideTags } = useFilterTags()

  const utils = api.useUtils()
  // TODO: calling it update status since that is the only thing in userData for now. Change this to updateUserItemData or something
  const {
    mutateAsync: updateLastStatus,
    isPending,
    reset: resetStatusUpdate
  } = api.repositoryItem.updateLastStatus.useMutation({
    onSuccess() {
      setQueryUserData(true)
      utils.repositoryItem.getOrCreateUserData.invalidate({
        referenceId: itemData.referenceId ?? undefined
      })
    },
    onError(error: { message: any }) {
      // TODO: revert setMode state
    }
  })
  //   const { mutateAsync: updateTags } =

  // api.repositoryItem.updateTags.useMutation({
  //   onSuccess() {
  //     setQueryUserData(true)
  //     utils.repositoryItem.getOrCreateUserData.invalidate({
  //       referenceId: itemData.referenceId ?? undefined
  //     })
  //   },
  //   onError(error: { message: any }) {
  //     // TODO: revert setMode state
  //   }
  // })

  // useEffect({}=>{
  //   updateLastStatus({referenceId: itemData.referenceId,referenceType: itemData.referenceType,status:status})
  // },[status])

  const {
    setIsDeleteItemModalOpen,
    deletionItem,
    setDeletionItem,
    setIsMoveItemModalOpen,
    movingItem,
    setMovingItem
  } = useEditRepository()

  const { setOpenReferences, openReferences } = useNotes()

  return (
    <div
      className={cn(
        'relative flex-1 cursor-pointer select-none bg-background p-1 text-sm text-foreground',
        // isEditMode && 'scale-[1.01] border border-primary shadow-md'
        isEditMode && 'border border-primary shadow-md',
        status === 1 &&
          'bg-green-50 hover:bg-green-50 dark:bg-teal-950 dark:hover:bg-teal-950',
        status === 2 &&
          'bg-yellow-50 hover:bg-yellow-50 dark:bg-amber-950 dark:hover:bg-amber-950'
      )}
      onClick={e => {
        e.stopPropagation()
        // if (e.target !== e.currentTarget) return

        // console.log('hey', itemData.id)
        // setOpenNotes(true)

        // if (e.detail === 2) setOpenItem(itemData)

        setOpenItem(undefined)
        setTimeout(() => {
          setOpenItem(itemData)
        }, 0)

        // below line is to reset the references while going to another item
        setOpenReferences(openReferences => {
          return []
        })
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

            <DropdownMenuItem
              onClick={e => {
                e.stopPropagation()
                setCurrentPath(path)
                setMovingItem({
                  id: itemData.id,
                  title: itemData.problem
                    ? itemData.problem?.title
                    : itemData.customProblem.title
                      ? itemData.customProblem.title
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
                  title: itemData.problem
                    ? itemData.problem?.title
                    : itemData.customProblem.title
                      ? itemData.customProblem.title
                      : itemData.title
                })
                setIsDeleteItemModalOpen(true)
                // console.log('yoo', deletionItem)
              }}
            >
              <TrashIcon className='mr-2 h-4 w-4' />
              Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      <div
        className={cn('flex justify-between text-sm text-foreground')}
        // key={problem.id}
      >
        <div className='flex items-center justify-start'>
          {/* <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild></TooltipTrigger>
              <TooltipContent>
                <p>Status</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider> */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className='px-1'>
                  <p className=''>
                    <CheckCircleIcon
                      onClick={e => {
                        e.stopPropagation()
                        const curStatus = status
                        setStatus(prev => (prev + 1) % 3)
                        // to prevent ui changes on previous status updates in case of fast updates by user
                        resetStatusUpdate()
                        updateLastStatus({
                          referenceId: itemData.referenceId as string,
                          referenceType: itemData.referenceType as
                            | 'PROBLEM'
                            | 'CUSTOM_PROBLEM',
                          status: (curStatus + 1) % 3
                        })
                      }}
                      // onDoubleClick={e => {
                      //   e.stopPropagation()
                      // }}
                      className={cn(
                        'size-6 text-muted-foreground',
                        status === 0 && '',
                        status === 1 && 'text-green-400',
                        status === 2 && 'text-yellow-400'
                      )}
                    />
                  </p>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Status</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div>
            <div
              className='flex items-center gap-2'
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
                    <div className='border-0'>
                      <a
                        target='_blank'
                        rel='noopener noreferrer'
                        href={itemData.problem?.url ?? '#'}
                        className={cn(
                          'flex items-center gap-1 font-semibold leading-7 text-muted-foreground [&:not(:first-child)]:mt-6'
                        )}
                      >
                        <span className=''>
                          {getPlatformIcon(
                            itemData.problem
                              ? (itemData.problem.platform ?? 'LC')
                              : (itemData.customProblem.platform ?? 'LC')
                          )}
                        </span>
                        {itemData.problem && itemData.problem?.title}
                        {itemData.customProblem &&
                          itemData.customProblem?.title}
                      </a>
                      {/* <p
                        className={cn(
                          'font-semibold leading-7 text-muted-foreground [&:not(:first-child)]:mt-6',
                          
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
                      </p> */}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className={cn()}>
                      {itemData.problem
                        ? itemData.problem?.title
                        : itemData.customProblem.title
                          ? itemData.customProblem.title
                          : itemData.id}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {itemData.customProblem && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CopyrightIcon className='size-4 text-muted-foreground' />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className={cn()}>Custom</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            {!hideTags && (
              <div className='flex items-start'>
                <div className='flex items-center'>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className='px-1'>
                          <p className='flex justify-start'>
                            <span className='text-[10px] font-semibold text-background text-green-600 dark:text-green-400'>
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
                <EditItemTags
                  itemData={itemData}
                  setQueryUserData={setQueryUserData}
                  tags={tags}
                  setTags={setTags}
                />
              </div>
            )}
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
  isOwner?: boolean
  disableDnD: boolean
  setDisableDnD: React.Dispatch<React.SetStateAction<boolean>>
}
export const EditableNode = ({
  isOwner = false,
  path,
  nodeData,
  forceDragging,
  updateOrder,
  disableDnD,
  setDisableDnD
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
  } = useSortable({ id: nodeData.order, disabled: disableDnD })
  const style = {
    transition,
    transform: CSS.Translate.toString(transform)
    // cursor: isDragging || forceDragging ? 'grabbing' : 'grab'
  }
  const [queryUserData, setQueryUserData] = useState(false)
  const { data: userData, isLoading } =
    api.repositoryItem.getOrCreateUserData.useQuery(
      {
        referenceId: nodeData.referenceId as string,
        referenceType: nodeData.referenceType as string
      },
      {
        enabled: queryUserData
      }
    )
  const [tags, setTags] = useState(nodeData?.tags ?? [])
  const [status, setStatus] = useState(nodeData?.lastStatus)
  const { doneItems, setDoneItems, revisitItems, setRevisitItems } =
    useRepository()
  useEffect(() => {
    if (userData) {
      if (status !== userData.lastStatus) setStatus(userData.lastStatus)
      if (userData.lastStatus === 1) {
        setDoneItems(prev => {
          if (!prev.includes(nodeData.referenceId)) {
            return [...prev, nodeData.referenceId]
          }
          return prev
        })
        setRevisitItems(prev => {
          return prev.filter(item => item !== nodeData.referenceId)
        })
      } else if (userData.lastStatus === 2) {
        setRevisitItems(prev => {
          if (!prev.includes(nodeData.referenceId)) {
            return [...prev, nodeData.referenceId]
          }
          return prev
        })
        setDoneItems(prev => {
          return prev.filter(item => item !== nodeData.referenceId)
        })
      } else if (userData.lastStatus === 0) {
        setRevisitItems(prev => {
          return prev.filter(item => item !== nodeData.referenceId)
        })
        setDoneItems(prev => {
          return prev.filter(item => item !== nodeData.referenceId)
        })
      }
      // updating tags back in the node data, kinda hacky
      nodeData.tags = userData.tags
      setTags(userData.tags)
    }
  }, [userData])
  useEffect(() => {
    // if (nodeData.type === 'ITEM') {
    //   if (nodeData.lastStatus === 1) {
    //     setDoneItems(prev => {
    //       if (!prev.includes(nodeData.referenceId)) {
    //         return [...prev, nodeData.referenceId]
    //       }
    //       return prev
    //     })
    //     setRevisitItems(prev => {
    //       return prev.filter(item => item !== nodeData.referenceId)
    //     })
    //   } else if (nodeData.lastStatus === 2) {
    //     setRevisitItems(prev => {
    //       if (!prev.includes(nodeData.referenceId)) {
    //         return [...prev, nodeData.referenceId]
    //       }
    //       return prev
    //     })
    //     setDoneItems(prev => {
    //       return prev.filter(item => item !== nodeData.referenceId)
    //     })
    //   }
    // setItemStatuses(prev =>
    //   prev
    //     ? [...prev, { id: nodeData.id, status: nodeData?.lastStatus }]
    //     : [{ id: nodeData.id, status: nodeData?.lastStatus }]
    // )
    // }
  }, [status])
  const { filterTags, difficultyTag } = useFilterTags()
  if (nodeData.type === 'ITEM') {
    if (
      nodeData.referenceType === 'PROBLEM' &&
      difficultyTag &&
      difficultyTag !== nodeData.problem.difficulty
    )
      return
    if (
      nodeData.referenceType === 'CUSTOM_PROBLEM' &&
      difficultyTag &&
      difficultyTag !== nodeData.customProblem.difficulty
    )
      return

    if (
      filterTags.length &&
      !nodeData.tags.some(itemTag => filterTags.includes(itemTag))
    )
      return
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

      {isOwner && !(filterTags.length > 0 || difficultyTag) && (
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
      )}
      {nodeData.type === 'SECTION' ? (
        <SectionNode
          path={path}
          updateOrder={updateOrder}
          sectionData={nodeData}
          isOwner={isOwner}
          setDisableDnD={setDisableDnD}
          disableDnD={disableDnD}
          // deleteItem={deleteItem}
        />
      ) : (
        <ItemNode
          path={path}
          itemData={nodeData}
          isOwner={isOwner}
          setQueryUserData={setQueryUserData}
          tags={tags}
          setTags={setTags}
          status={status}
          setStatus={setStatus}
          // deleteItem={deleteItem}
        />
      )}
    </div>
  )
}
