'use client'
import {
  RepoStructureNode,
  useEditRepository,
  useRepository,
  useRepoStructure
} from '@/store'
import {
  CalendarDaysIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ClipboardDocumentIcon,
  Cog6ToothIcon,
  DocumentIcon,
  EllipsisVerticalIcon,
  MinusIcon,
  PencilIcon,
  PlusIcon,
  QuestionMarkCircleIcon,
  WrenchScrewdriverIcon,
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
  DropdownMenuTrigger,
  SonnerToast,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  ScrollArea,
  Separator,
  Toast,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '@repo/ui'
import React, { useEffect, useMemo, useState } from 'react'
import AddItemButtons from './add-item-button'
import { api } from '@/trpc/react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import {
  Bolt,
  FileCog,
  FolderCog,
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
export const DndContextWithNoSSR = dynamic(
  () => import('@dnd-kit/core').then(mod => mod.DndContext),
  { ssr: false }
)
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { EditableNode } from './editable-node'
import EditReferences from './edit-references'
import EditNotes from './edit-notes'
import AddItemModal from './add-item-modal'
import DeleteItemModal from './delete-item-modal'
import MoveItemModal from './move-item-modal'
import NotesAndReferences from './notes-and-references'
import SectionDescriptionAndReferences from './section-desc-and-ref'
import RepoDescriptionAndReferences from './repo-desc-and-ref'

interface EditRepositoryItemsProps {
  repository: Repository
}

const EditRepositoryItems = ({ repository }: EditRepositoryItemsProps) => {
  const {
    isEditMode,
    setIsEditMode,
    isCreateItemModalOpen,
    setIsCreateItemModalOpen,
    isDeleteItemModalOpen,
    setIsDeleteItemModalOpen,
    isMoveItemModalOpen,
    setIsMoveItemModalOpen,
    activeItem,
    setActiveItem
  } = useEditRepository()
  // const [activeItem, setActiveItem] = useState<RepositoryItem | undefined>()
  // const handleSave = () => {
  //   setIsEditMode(false)
  // }
  const { setRepositoryDetails } = useRepository()
  // TODO: check this for touch
  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor))

  const {
    data: repoItems,
    isLoading,
    isSuccess
  } = api.repository.get.useQuery(repository.id)
  // console.log('repoItems', repoItems)
  const [repoKids, setRepoKids] = useState(repoItems?.children)
  // console.log('repoKids', repoKids)
  useEffect(() => {
    console.log('repoItems>>', repoItems, repoKids)
    if (repoItems) setRepoKids(repoItems.children)
  }, [repoItems])

  useEffect(() => {
    setRepositoryDetails(repository)
  }, [])

  const { isOver, setNodeRef } = useDroppable({
    id: 'droppable'
  })
  const utils = api.useUtils()

  // update segment priorities
  const { mutateAsync: updateOrder } =
    api.repositoryItem.updateOrder.useMutation({
      onError: error => {
        utils.repository.get.invalidate()
        Toast({
          type: 'error',
          title: 'Error!',
          message: error?.message || 'Something went wrong',
          duration: 2000
        })
      },
      onSuccess: () => {
        utils.repository.get.invalidate()
        Toast({
          title: '📃Order updated😎',
          type: 'success'
          // message: 'success'
        })
      },
      onMutate() {
        utils.repository.get.cancel()
      }
    })
  // deletion function
  const deleteItem = async (id: string) => {
    // console.log('deleting')

    // const items = Array.from(repoKids)
    // console.log('deleting', items)
    // const idChildMap = new Map<string, any>(items.map(item => [item.id, item]))
    // console.log('deleting', idChildMap)

    // const updated = repoKids
    //   .filter(item => item.id !== id)
    //   .map((item, i) => ({ ...item, order: i + 1 }))
    // console.log(updated)

    // // Update the priorities of the items
    // const prioritizedItems = updated.map((item, index) => ({
    //   id: item.id,
    //   order: item.order
    // }))
    // console.log('deleting', prioritizedItems)

    // // Compare prioritized items to repoKids with id and create a new array of repoKids with the ones that have changed priority
    // const changedPriorities = prioritizedItems.filter(item => {
    //   const repoKid = idChildMap.get(item.id)
    //   return repoKid?.order !== item.order
    // })
    // console.log('deleting', changedPriorities)

    // console.log('changedPriorities', changedPriorities)
    // await updateOrder(changedPriorities)
    await deleteNode({ node_id: id })
  }
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

        utils.repository.get.invalidate()
        Toast({
          title: 'Deleted',
          type: 'success'
        })
      },
      onMutate() {
        utils.repository.get.cancel()
      }
    })

  // moving function

  // const { setCurrentPath } = useRepoStructure()
  // useEffect(() => {
  //   if (repoItems)
  //     setCurrentPath([{ id: repoItems.id, title: repoItems.title }])
  // }, [repoItems])

  const repoKidsMemo = useMemo(() => {
    return repoKids?.map(repoKid => {
      return (
        <EditableNode
          path={[{ id: repoItems.id, title: repoItems.title }]}
          // deleteItem={deleteItem}
          key={repoKid.id}
          nodeData={repoKid}
          updateOrder={updateOrder}
        />
      )
    })
  }, [repoItems, repoKids, isSuccess])

  // const [openNotes, setOpenNotes] = useState(false)
  // const [openNotesId, setOpenNotesId] = useState<string | null | undefined>(
  //   null
  // )
  // const { openNotes, setOpenNotes } = useEditRepository()

  const { openItem, setOpenItem } = useRepository()
  // const openNotesAndResources = (id: string) => {
  //   setOpenNotes(true)
  //   setOpenItemId(id)
  //   console.log(openNotes, openItemId)
  // }
  const closeNotesAndResources = () => {
    // setOpenNotes([])
    setOpenItem(undefined)
  }

  const { setRepoStructure, setCurrentPath } = useRepoStructure()
  const getRepoStructure = (repoItems: any): RepoStructureNode => {
    const repoStructureSection: RepoStructureNode = {
      id: repoItems.id,
      title: repoItems.title
    }
    repoStructureSection.childNodes = [] as RepoStructureNode[]
    for (const repoItem of repoItems.children) {
      if (repoItem.type === 'ITEM') continue
      repoStructureSection.childNodes.push(getRepoStructure(repoItem))
    }
    return repoStructureSection
  }
  useEffect(() => {
    if (repoItems) {
      const rs = getRepoStructure(repoItems)
      console.log('rs', rs)
      setRepoStructure(rs)
    }
  }, [repoItems])

  // --------------------------------
  if (!repoItems) {
    return
  }
  const style = {
    color: isOver ? 'green' : undefined
  }

  const onDragStart = (event: DragStartEvent) => {
    const { active } = event
    setActiveItem(repoKids?.find(repoKid => repoKid.order === active.id))
    console.log('dragStart', active, activeItem)
  }
  const onDragCancel = (event: DragCancelEvent) => {
    setActiveItem(undefined)
  }

  const onDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    if (active && over && active.id === over.id) {
      return
    }
    const oldIndex = repoKids.findIndex(repoKid => repoKid.order === active.id)
    const newIndex = repoKids.findIndex(repoKid => repoKid.order === over?.id)
    console.log(active.id, oldIndex, newIndex, over.id)
    // create a duplicate array
    const items = Array.from(repoKids)
    // console.log('repoKids_b', repoKids)
    // create an id to item map from the initial array
    const idChildMap = new Map<string, any>(items.map(item => [item.id, item]))

    // console.log('items>>', items)

    const [reorderedItem] = items.splice(oldIndex, 1)
    items.splice(newIndex, 0, reorderedItem)

    // console.log('items>>', items)

    // Update the local state with reordered items
    const reorderItems = items.map((item, index) => ({
      ...item,
      order: index + 1
    }))
    // console.log('reorderItems', reorderItems)
    // setRepoKids(reorderItems)
    setRepoKids(repoKids => {
      const oldIndex = repoKids.findIndex(
        repoKid => repoKid.order === active.id
      )
      const newIndex = repoKids.findIndex(repoKid => repoKid.order === over.id)
      return arrayMove(repoKids, oldIndex, newIndex)
    })

    // setRepoKids(repoKids => {
    //   const oldIndex = repoKids.findIndex(
    //     repoKid => repoKid.order === active.id
    //   )
    //   const newIndex = repoKids.findIndex(
    //     repoKid => repoKid.order === over?.id
    //   )

    //   return arrayMove(repoKids, oldIndex, newIndex).map((repoKid, i) => ({
    //     ...repoKid,
    //     details: {
    //       ...repoKid.details,
    //       order: i + 1
    //     }
    //   }))
    // })

    // console.log('onDragEnd', repoKids, active, over)

    // console.log('items>>>', items, repoKids)

    // // create a segments map

    // const [reorderedItem] = items.splice(old, 1)
    // items.splice(over.id, 0, reorderedItem)

    // Update the priorities of the items
    const prioritizedItems = reorderItems.map((item, index) => ({
      id: item.id,
      order: item.order
    }))

    // Compare prioritized items to repoKids with id and create a new array of repoKids with the ones that have changed priority
    const changedPriorities = prioritizedItems.filter(item => {
      const repoKid = idChildMap.get(item.id)
      return repoKid?.order !== item.order
    })
    console.log('changedPriorities', changedPriorities)
    await updateOrder(changedPriorities)
    setActiveItem(undefined)
  }
  // const [notes, setNotes] = useState<Note[]>([
  //   { id: '1', title: 'Brute Force', content: '' },
  //   { id: '2', title: 'Better O(N2)', content: '' },
  //   { id: '3', title: 'Optimized O(N)', content: '' }
  // ])

  return (
    <>
      <div className='flex max-w-full pt-0'>
        <div
          className={cn(
            // 'min-w-[748px]',
            'min-w-[50%]'
            // openItemId && 'min-w-[480px] 2xl:min-w-[640px]'
            // openItem && 'min-w-[640px]'
          )}
        >
          <div className='sticky left-0 top-0 z-10'>
            {/* <AddItemButtons
              setChildNodes={setRepoKids}
              // path={[{ id: repoItems.id, title: repoItems.title }]}
              // childNodes={repoKids}
              // parentType={'REPOSITORY'}
              // parentName={repository.title}
              // pparentType={'NONE'}
              // parentId={repoItems.id}
            /> */}
            <div className='flex justify-start'>
              {/* <Button
                  variant={'bg'}
                  className={cn(
                    'flex flex-1 rounded-none'
                  )}
                  onClick={e => {
                    e.stopPropagation()
                    setCurrentPath([
                      { id: repoItems.id, title: repoItems.title }
                    ])
                    setIsCreateItemModalOpen(true)
                  }}
                >
                  <PlusIcon className='size-5' />
                  Add
                </Button> */}
              {/* <Button
                // disabled={isPending}
                // variant={'tint'}
                variant={'bg'}
                className={cn(
                  'group flex rounded-l-none'
                  // 'shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'
                )}
                // onClick={() => handlecreateRepositoryItem('ITEM')}
                onClick={e => {
                  e.stopPropagation()
                  setCurrentPath([{ id: repoItems.id, title: repoItems.title }])
                  setIsCreateItemModalOpen(true)
                }}
              >
                <PlusIcon className='size-5' />
                <span className='hidden duration-200 group-hover:inline-block'>
                  Add
                </span>
              </Button> */}
            </div>
            {isCreateItemModalOpen && <AddItemModal />}
            {isDeleteItemModalOpen && (
              <DeleteItemModal
              // path={[{ id: repoItems.id, title: repoItems.title }]}
              // isOpen={isDeleteItemModalOpen}
              // onClose={() => {
              //   setIsDeleteItemModalOpen(false)
              // }}
              // deleteItem={deleteItem}
              // path={path}
              // parentType={parentType}
              // parentId={parentId}
              // parentName={parentName}
              />
            )}
            {isMoveItemModalOpen && <MoveItemModal />}
          </div>
          {repoKids?.length > 0 && (
            <DndContextWithNoSSR
              // sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              onDragCancel={onDragCancel}
            >
              <SortableContext
                items={repoKids.map(repoKid => repoKid.order)}
                strategy={verticalListSortingStrategy}
              >
                <div
                  ref={setNodeRef}
                  style={style}
                  className='mr-2 mt-2 flex flex-col gap-1'
                >
                  {repoKids?.map(repoKid => {
                    return (
                      <EditableNode
                        path={[{ id: repoItems.id, title: repoItems.title }]}
                        // deleteItem={deleteItem}
                        key={repoKid.id}
                        nodeData={repoKid}
                        updateOrder={updateOrder}
                      />
                    )
                  })}
                  {/* {repoKidsMemo} */}
                </div>
              </SortableContext>
              <DragOverlay style={{ transformOrigin: '0 0 ' }}>
                {activeItem ? (
                  <EditableNode
                    path={[{ id: repoItems.id, title: repoItems.title }]}
                    // deleteItem={deleteItem}
                    updateOrder={updateOrder}
                    nodeData={activeItem}
                    // removeItem={removeItem}
                    forceDragging={true}
                  />
                ) : null}
              </DragOverlay>
            </DndContextWithNoSSR>
          )}
        </div>
        {openItem?.type === 'ITEM' && (
          <>
            <NotesAndReferences />
            {/* <div className='sticky top-0 h-screen flex-1 border-l'>
              <div className='absolute right-4 top-8 z-10'>
                <XMarkIcon
                  className='size-6'
                  onClick={closeNotesAndResources}
                />
              </div>
              <ScrollArea className='flex h-screen flex-col p-8'>
                <h1 className='scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl'>
                  Notes.
                </h1>
                <EditNotes itemId={openItemId} />
                <EditReferences itemId={openItemId} />
               
              </ScrollArea>
            </div> */}
          </>
        )}
        {!openItem && (
          <>
            <RepoDescriptionAndReferences />
          </>
        )}
        {openItem?.type === 'SECTION' && (
          <>
            <SectionDescriptionAndReferences />
          </>
        )}
      </div>
      {/* <div className='sticky top-0 h-screen overflow-hidden'>
        <ResizablePanelGroup
          direction='horizontal'
          className='my-8 rounded-lg border-b md:min-w-[450px]'
        >
          <ResizablePanel minSize={40}>
            <ScrollArea className='h-screen'>
              <div className='min-w-[600px] max-w-screen-lg pr-4'>
                {repoKids?.length > 0 && (
                  <DndContextWithNoSSR
                    // sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd}
                    onDragCancel={onDragCancel}
                  >
                    <SortableContext
                      items={repoKids.map(repoKid => repoKid.order)}
                      strategy={verticalListSortingStrategy}
                    >
                      <div
                        ref={setNodeRef}
                        style={style}
                        className='my-8 flex flex-col gap-2'
                      >
                        {repoKidsMemo}
                      </div>
                    </SortableContext>
                    <DragOverlay style={{ transformOrigin: '0 0 ' }}>
                      {activeItem ? (
                        <EditableNode
                          deleteItem={deleteItem}
                          updateOrder={updateOrder}
                          nodeData={activeItem}
                          // removeItem={removeItem}
                          forceDragging={true}
                        />
                      ) : null}
                    </DragOverlay>
                  </DndContextWithNoSSR>
                )}
                <AddItemButtons
                  setChildNodes={setRepoKids}
                  childNodes={repoKids}
                  parentType={'REPOSITORY'}
                  parentName={repository.title}
                  pparentType={'NONE'}
                  parentId={repoItems.id}
                />
              </div>
            </ScrollArea>
          </ResizablePanel>
          {openNotes && openItemId && <ResizableHandle withHandle />}
          <ResizablePanel minSize={40}>
            {openNotes && openItemId && (
              <div
                // className='sticky top-0 flex h-screen flex-1 flex-col p-8 py-16'
                className='sticky top-0 flex h-screen flex-col p-8 py-16'
              >
                <div
                  className='absolute right-0 top-8'
                  onClick={closeNotesAndResources}
                >
                  <XMarkIcon className='size-6' />
                </div>
                <h1 className='scroll-m-20 px-8 text-4xl font-extrabold tracking-tight lg:text-5xl'>
                  Notes.
                </h1>
                <p>{openItemId}</p>
                <div className='mt-8 flex-1'>
                  <Textarea
                    className='h-full resize-none'
                    value={
                      'Pariatur ullamco pariatur veniam non non esse est commodo deserunt dolore esse. Exercitation elit officia irure laboris fugiat enim deserunt velit deserunt.Pariatur ullamco pariatur veniam non non esse est commodo deserunt dolore esse. Exercitation elit officia irure laboris fugiat enim deserunt velit deserunt. Cillum exercitation eiusmod ullamco pariatur enim pariatur sint ullamco.Pariatur ullamco pariatur veniam non non esse est commodo deserunt dolore esse. Exercitation elit officia irure laboris fugiat enim deserunt velit deserunt. Cillum exercitation eiusmod ullamco pariatur enim pariatur sint ullamco. Nostrud labore officia fugiat adipisicing do in aute culpa mollit ipsum Lorem labore duis. Excepteur sint cillum ad sint pariatur nulla do veniam aliquip esse anim ad veniam consequat.Sint et cupidatat elit excepteur enim. Cupidatat amet id aliqua aute duis. Qui nostrud qui nulla enim cillum et irure Lorem veniam sint cupidatat voluptate excepteur aliquip. Voluptate exercitation labore pariatur Lorem elit occaecat nostrud magna velit id. Est sit cupidatat fugiat sunt.Aute proident ipsum ipsum in aliquip aliquip fugiat minim incididunt eiusmod laborum proident Lorem ipsum. Ad magna sunt Lorem in aliquip. Elit excepteur commodo in ullamco elit occaecat ex adipisicing non reprehenderit sit id anim cillum. Aliquip irure anim non nulla officia ea sit mollit cupidatat adipisicing et nostrud aute aliquip. Commodo dolore proident incididunt ex aute commodo ex duis magna labore esse incididunt cillum. Ullamco do tempor esse et. Aute anim consectetur in incididunt incididunt dolor incididunt ullamco.Sint mollit ipsum ut elit ipsum cupidatat nostrud culpa occaecat. Sint elit voluptate deserunt est irure occaecat non velit aliqua aute. Deserunt incididunt deserunt mollit voluptate irure. Do sit minim consectetur tempor laboris id esse sit eu. Duis dolore magna occaecat excepteur sit ipsum commodo nostrud consectetur cillum aliquip. Aliqua dolore aliqua aliqua commodo enim irure amet reprehenderit.Laborum proident deserunt aliqua incididunt ad. Nostrud anim commodo consequat non occaecat consequat ea. Lorem veniam in do commodo veniam. Officia id velit enim ipsum sit aute. Consequat nisi id et aliqua ad. Magna non amet est incididunt enim sunt esse ad veniam Lorem irure elit.'
                    }
                  />
                </div>
              </div>
            )}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div> */}
    </>
  )
}

export default EditRepositoryItems