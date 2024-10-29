'use client'
import { cn } from '@/lib/utils'
import { api } from '@/trpc/react'
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import {
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  ClipboardDocumentListIcon,
  DocumentIcon,
  EllipsisVerticalIcon,
  MinusIcon,
  PencilIcon,
  PencilSquareIcon,
  PlayCircleIcon,
  PlusIcon,
  QuestionMarkCircleIcon,
  TrashIcon,
  VideoCameraIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { $Enums, RepositoryItemReferenceType } from '@repo/database'
import {
  Button,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Input,
  Toast,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Skeleton
} from '@repo/ui'
import React, { useEffect, useState } from 'react'
import { DndContextWithNoSSR } from './edit-repo-items'
import {
  closestCenter,
  DragCancelEvent,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  useDroppable
} from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { Youtube, YoutubeIcon } from 'lucide-react'
import Link from 'next/link'
import { ReferenceType, useNotes, useRepository } from '@/store'
import { Jost, Poppins } from 'next/font/google'
import { useSession } from 'next-auth/react'
export const Reference = ({
  disableDnD,
  reference
}: {
  disableDnD: boolean
  reference: refType
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: reference?.order, disabled: disableDnD })
  const style = {
    transition,
    transform: CSS.Translate.toString(transform)
    // cursor: isDragging || forceDragging ? 'grabbing' : 'grab',
  }
  const { activeNotesTab } = useNotes()
  const forceDragging = true

  const getRefUrl = url => {
    if (!/^https?:\/\//i.test(url)) {
      return `https://${url}`
    }
    return url
  }
  return (
    <div
      className='flex h-full max-w-80 items-center p-1'
      style={style}
      ref={setNodeRef}
    >
      {activeNotesTab === 'MyNotes' && (
        <div
          style={{ cursor: isDragging || forceDragging ? 'grabbing' : 'grab' }}
          ref={setActivatorNodeRef}
          {...attributes}
          {...listeners}
        >
          <EllipsisVerticalIcon className='size-5' />
        </div>
      )}
      <div className=''>
        <div className='flex gap-2'>
          <a
            href={getRefUrl(reference?.link)}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-2 hover:underline'
          >
            {reference.subType === 'VIDEO' ? (
              <PlayCircleIcon className='size-4' />
            ) : (
              <DocumentIcon className='size-4' />
            )}
            {reference?.title}
          </a>
        </div>
      </div>
    </div>
  )
}
export const ReferenceEdit = ({
  reference,
  addReferencefn,
  removeReferencefn
}: {
  reference: refType
  addReferencefn: (id: string) => void
  removeReferencefn: (id: string) => void
}) => {
  const [title, setTitle] = useState(reference.title)
  const [link, setLink] = useState(reference.link)
  const [type, setType] = useState(reference.subType)
  const [saveDisabled, setSaveDisabled] = useState(true)
  const utils = api.useUtils()
  const { mutateAsync: updateItemReference } =
    api.repositoryItem.updateItemReference.useMutation({
      onError: error => {
        utils.repositoryItem.getReferences.invalidate()
        Toast({
          type: 'error',
          title: 'Error!',
          message: error?.message || 'Something went wrong',
          duration: 2000
        })
        setSaveDisabled(false)
      },
      onSuccess: () => {
        utils.repositoryItem.getReferences.invalidate()
        Toast({
          title: '📃Reference Updated',
          type: 'success'
          // message: 'success'
        })
        setSaveDisabled(true)
      },
      onMutate() {
        utils.repositoryItem.getReferences.cancel()
      }
    })
  const { mutateAsync: deleteNoteReference } =
    api.repositoryItem.deleteReference.useMutation({
      onError: error => {
        utils.repositoryItem.getReferences.invalidate()
        Toast({
          type: 'error',
          title: 'Error!',
          message: error?.message || 'Something went wrong',
          duration: 2000
        })
        setSaveDisabled(false)
      },
      onSuccess: () => {
        utils.repositoryItem.getReferences.invalidate()
        Toast({
          title: '📃Reference Deleted',
          type: 'success'
          // message: 'success'
        })
        setSaveDisabled(true)
      },
      onMutate() {
        utils.repositoryItem.getReferences.cancel()
      }
    })

  // useEffect(() => {
  //   console.log('hit', reference, title, link, type)
  //   setTitle(reference.title)
  //   setLink(reference.link)
  //   setType(reference.subType)
  // }, [reference])
  useEffect(() => {
    if (
      (title?.length > 0 && title != reference.title) ||
      (link?.length > 0 && link != reference.link) ||
      type != reference.subType
    )
      setSaveDisabled(false)
    else setSaveDisabled(true)
  }, [title, link, type])
  return (
    <div className='flex items-center'>
      <div className='flex items-center gap-2 p-1'>
        <div className='flex items-center gap-2'>
          {/* <Input
            placeholder='Title'
            value={reference?.title}
            className='w-40'
          />
          <Input placeholder='Link' value={reference?.link} className='w-40' /> */}
          <Select
            defaultValue='ARTICLE'
            value={type}
            onValueChange={value => {
              setType(value as 'ARTICLE' | 'VIDEO')
            }}
          >
            <SelectTrigger rightIcon={false} className='w-10'>
              <SelectValue placeholder='Type' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {/* <SelectLabel>Type</SelectLabel> */}
                <SelectItem value='ARTICLE'>
                  <span className='flex gap-2'>
                    <DocumentIcon className='size-4' />
                  </span>
                </SelectItem>
                <SelectItem value='VIDEO'>
                  <span className='flex gap-2'>
                    <PlayCircleIcon className='size-4' />
                  </span>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className='flex flex-col'>
            <Input
              placeholder='Title'
              value={title}
              onChange={e => setTitle(e.target.value)}
              className='h-5 w-40 rounded-none border-2 border-transparent bg-transparent font-semibold tracking-tight focus-visible:border-b-primary focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0'
              // className='h-6 w-40 border-transparent'
            />
            <Input
              placeholder='Link'
              value={link}
              onChange={e => setLink(e.target.value)}
              className='h-5 w-40 rounded-none border-2 border-transparent bg-transparent tracking-tight focus-visible:border-b-primary focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0'
            />
          </div>

          <Button
            className='flex gap-2'
            variant={'bg'}
            disabled={saveDisabled}
            onClick={() =>
              updateItemReference({
                id: reference.id,
                title: title,
                link: link,
                type: type
              })
            }
          >
            <DocumentIcon className='size-4' />
          </Button>
          <Button
            variant={'destructive'}
            onClick={() => {
              deleteNoteReference({ id: reference.id })
            }}
          >
            {/* <PlusIcon className='size-4' /> */}
            <TrashIcon className='size-4' />
          </Button>
          {reference?.added ? (
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button
                  variant={'ghost'}
                  onClick={() => removeReferencefn(reference.id)}
                >
                  {/* <PlusIcon className='size-4' /> */}
                  <XMarkIcon className='size-4' />
                </Button>
              </HoverCardTrigger>
              <HoverCardContent
                align='end'
                className='mt-4 w-80 bg-backgroundalt'
              >
                <div className='grid gap-4'>
                  <div className='space-y-2'>
                    <h4 className='font-medium leading-none'>
                      Remove reference
                    </h4>
                    <p className='text-sm text-muted-foreground'>
                      Remove this reference from the current repository.
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          ) : (
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button
                  variant={'ghost'}
                  onClick={() => addReferencefn(reference.id)}
                >
                  <PlusIcon className='size-4' />
                </Button>
              </HoverCardTrigger>
              <HoverCardContent
                align='end'
                className='mt-4 w-80 bg-backgroundalt'
              >
                <div className='grid gap-4'>
                  <div className='space-y-2'>
                    <h4 className='font-medium leading-none'>Add reference</h4>
                    <p className='text-sm text-muted-foreground'>
                      Make the reference visible in case the Repository is
                      public.
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          )}
        </div>
        {/* ) : (
          // <div className='flex items-center gap-2 rounded-md border bg-background p-2'>
          <div className='flex gap-2'>
            <div className='flex items-center gap-2 rounded-md border bg-background p-2'>
              <a href={reference?.link}>{reference?.title}</a>
              <PencilSquareIcon
                className='size-4'
                onClick={() => setIsEditMode(true)}
              />
            </div>
            {reference?.added ? (
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant={'outline'}>
                    <XMarkIcon className='size-4' />
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent
                  align='end'
                  className='mt-4 w-80 bg-backgroundalt'
                >
                  <div className='grid gap-4'>
                    <div className='space-y-2'>
                      <h4 className='font-medium leading-none'>
                        Remove reference
                      </h4>
                      <p className='text-sm text-muted-foreground'>
                        Remove this reference from the current repository.
                      </p>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ) : (
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant={'outline'}>
                    <PlusIcon className='size-4' />
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent
                  align='end'
                  className='mt-4 w-80 bg-backgroundalt'
                >
                  <div className='grid gap-4'>
                    <div className='space-y-2'>
                      <h4 className='font-medium leading-none'>
                        Add reference
                      </h4>
                      <p className='text-sm text-muted-foreground'>
                        Make the reference visible in case the Repository is
                        public.
                      </p>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            )}
          </div>
        )} */}

        {/* <HoverCard>
          <HoverCardTrigger asChild>
            <QuestionMarkCircleIcon className='size-4' />
          </HoverCardTrigger>
          <HoverCardContent align='end' className='mt-4 w-80 bg-backgroundalt'>
            <div className='grid gap-4'>
              <div className='space-y-2'>
                <h4 className='font-medium leading-none'>
                  {reference?.added ? 'Remove reference' : 'Add reference'}
                </h4>
                <p className='text-sm text-muted-foreground'>
                  {reference?.added
                    ? "Remove reference from current repository, this reference won't show up if the repository is public."
                    : 'Make the reference visible in case the Repository is public.'}
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard> */}
      </div>
    </div>
  )
}

type refType = {
  id: string
  title: string
  link: string
  added: boolean
  order: number
  subType: 'VIDEO' | 'ARTICLE'
}
// const initialReferences: refType[] = [
//   {
//     id: '1',
//     title: 'Brute force Aditya Verma',
//     link: 'https://www.youtube.com/embed/kHi1DUhp9kM?si=Dwpvy8A1p2OMmzdf',
//     added: true,
//     order: 1,
//     type: 'VIDEO'
//   },
//   {
//     id: '2',
//     title: 'Better Aryan Verma',
//     link: '',
//     added: true,
//     order: 2,
//     type: 'ARTICLE'
//   },
//   {
//     id: '3',
//     title: 'Optimized O(N)',
//     link: '',
//     added: false,
//     order: 3,
//     type: 'VIDEO'
//   },
//   {
//     id: '4',
//     title: 'Optimized O(N)',
//     link: '',
//     added: false,
//     order: 4,
//     type: 'VIDEO'
//   },
//   {
//     id: '5',
//     title: 'Optimized O(N)',
//     link: '',
//     added: false,
//     order: 5,
//     type: 'VIDEO'
//   },
//   {
//     id: '6',
//     title: 'Optimized O(N)',
//     link: '',
//     added: false,
//     order: 6,
//     type: 'VIDEO'
//   }
// ]

const font = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin']
})
const font2 = Jost({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin']
})
interface EditReferencesProps {
  itemId?: string
}
const EditReferences = ({ itemId }: EditReferencesProps) => {
  const { openItem, setOpenItem } = useRepository()
  const [disableDnD, setDisableDnD] = useState(false)
  if (!openItem) return
  const { data: session, status, update } = useSession()

  const { data: referencesData, isLoading: isReferencesLoading } =
    api.repositoryItem.getReferences.useQuery(
      {
        id: openItem.id as string,
        referenceId: openItem.referenceId as string,
        referenceType: openItem.referenceType as
          | 'PROBLEM'
          | 'CUSTOM_PROBLEM'
          | 'SECTION'
      },
      {
        enabled: !!session?.user.id
      }
    )
  const { data: repoReferencesData, isLoading: isRepoReferencesLoading } =
    api.repositoryItem.getRepositoryReferences.useQuery({
      id: openItem.id as string,
      referenceId: openItem.referenceId as string,
      referenceType: openItem.referenceType as
        | 'PROBLEM'
        | 'CUSTOM_PROBLEM'
        | 'SECTION'
    })
  const {
    showReferences,
    toggleShowReferences,
    openReferences,
    setOpenReferences,
    activeNotesTab
  } = useNotes()
  const [editRefMode, setEditRefMode] = useState<boolean>(false)
  // const [references, setReferences] = useState<refType[]>([])
  useEffect(() => {
    console.log('refs changing', referencesData)
    if (
      activeNotesTab === 'MyNotes' &&
      !isReferencesLoading
      // && referencesData
    )
      setOpenReferences(openReferences => {
        return (referencesData ?? []) as ReferenceType[]
      })
    // if (
    //   activeNotesTab === 'Notes' &&
    //   !isRepoReferencesLoading
    //   // && repoReferencesData
    // )
    //   setOpenReferences(openReferences => {
    //     return (repoReferencesData ?? []) as ReferenceType[]
    //   })
  }, [referencesData, repoReferencesData, activeNotesTab])

  // useEffect(() => {
  //   return () => {
  //     console.log('triggered')
  //     setOpenReferences(undefined)
  //   }
  // }, [])

  // create reference
  const { mutateAsync: createItemReferences } =
    api.repositoryItem.createItemReferences.useMutation({
      onError: error => {
        utils.repositoryItem.getReferences.invalidate()
        Toast({
          type: 'error',
          title: 'Error!',
          message: error?.message || 'Something went wrong',
          duration: 2000
        })
      },
      onSuccess: () => {
        utils.repositoryItem.getReferences.invalidate()
        Toast({
          title: '📃Reference Created😎',
          type: 'success'
          // message: 'success'
        })
        setSaveDisabled(true)
        setTitle('')
        setLink('')
      },
      onMutate() {
        utils.repositoryItem.getReferences.cancel()
      }
    })

  // add reference to repo
  const { mutateAsync: addReference } =
    api.repositoryItem.addReference.useMutation({
      onError: error => {
        utils.repositoryItem.getReferences.invalidate()
        utils.repositoryItem.getRepositoryReferences.invalidate()
        Toast({
          type: 'error',
          title: 'Error!',
          message: error?.message || 'Something went wrong',
          duration: 2000
        })
      },
      onSuccess: () => {
        utils.repositoryItem.getReferences.invalidate()
        utils.repositoryItem.getRepositoryReferences.invalidate()
        Toast({
          title: '📃Reference Added😎',
          type: 'success'
          // message: 'success'
        })
      },
      onMutate() {
        utils.repositoryItem.getReferences.cancel()
        utils.repositoryItem.getRepositoryReferences.cancel()
      }
    })

  const handleaddReference = (id: string) => {
    addReference({ repoItemId: openItem.id, id: id, type: 'REFERENCE' })
  }
  const { mutateAsync: removeReference } =
    api.repositoryItem.removeReference.useMutation({
      onError: error => {
        utils.repositoryItem.getReferences.invalidate()
        utils.repositoryItem.getRepositoryReferences.invalidate()
        Toast({
          type: 'error',
          title: 'Error!',
          message: error?.message || 'Something went wrong',
          duration: 2000
        })
      },
      onSuccess: () => {
        utils.repositoryItem.getReferences.invalidate()
        utils.repositoryItem.getRepositoryReferences.invalidate()
        Toast({
          title: '📃Reference Removed😎',
          type: 'success'
          // message: 'success'
        })
      },
      onMutate() {
        utils.repositoryItem.getReferences.cancel()
        utils.repositoryItem.getRepositoryReferences.cancel()
      }
    })
  const handleRemoveReference = (id: string) => {
    removeReference({
      repoItemId: openItem.id,
      id: id
      // type: 'REFERENCE'
    })
  }
  const [activeRef, setActiveRef] = useState<{
    id: string
    title: string
    link: string
    added: boolean
    order: number
  }>()
  const removeRef = () => {}
  // deletion function
  const deleteItem = async (id: string) => {
    console.log('deleting')

    const items = Array.from(openReferences)
    const idChildMap = new Map<string, any>(items.map(item => [item.id, item]))

    const updated = openReferences
      .filter(item => item.id !== id)
      .map((item, i) => ({ ...item, order: i + 1 }))

    // Update the priorities of the items
    const prioritizedItems = updated.map((item, index) => ({
      id: item.id,
      order: item.order
    }))

    // Compare prioritized items to repoKids with id and create a new array of repoKids with the ones that have changed priority
    const changedPriorities = prioritizedItems.filter(item => {
      const repoKid = idChildMap.get(item.id)
      return repoKid?.order !== item.order
    })
    // console.log('changedPriorities', changedPriorities)
    // await updateOrder(changedPriorities)
    await deleteNode({ node_id: id, changedPriorities })
  }

  // const {
  //   data: referenceItems,
  //   isLoading: isReferenceItemsLoading,
  //   isSuccess
  // } = api.referenceItem.get.useQuery(itemId)
  // useEffect(() => {
  //   setOpenReferences(referenceItems)
  // }, [isSuccess])

  const { isOver, setNodeRef } = useDroppable({
    id: 'droppable'
  })
  const utils = api.useUtils()

  // update reference order
  const { mutateAsync: updateNotesReferenceOrder } =
    api.repositoryItem.updateReferenceOrder.useMutation({
      onError: error => {
        utils.repositoryItem.getReferences.invalidate()
        utils.repositoryItem.getRepositoryReferences.invalidate()
        Toast({
          type: 'error',
          title: 'Error!',
          message: error?.message || 'Something went wrong',
          duration: 2000
        })
        setDisableDnD(false)
      },
      onSuccess: () => {
        utils.repositoryItem.getReferences.invalidate()
        utils.repositoryItem.getRepositoryReferences.invalidate()
        Toast({
          title: '📃Order updated😎',
          type: 'success'
          // message: 'success'
        })
        setDisableDnD(false)
      },
      onMutate() {
        utils.repositoryItem.getReferences.cancel()
        utils.repositoryItem.getRepositoryReferences.cancel()
        // setDisableDnD(false)
      }
    })
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
      onSuccess: () => {
        const updated = openReferences
          .filter(item => item.id !== id)
          .map((item, i) => ({ ...item, order: i + 1 }))
        setOpenReferences(openReferences => {
          return updated
        })

        utils.repository.get.invalidate()
        Toast({
          title: 'Segments priorities updated',
          type: 'success'
        })
      },
      onMutate() {
        utils.repository.get.cancel()
      }
    })

  const onDragStart = (event: DragStartEvent) => {
    const { active } = event
    console.log('heya')
    setActiveRef(openReferences.find(ref => ref.order === active.id))
  }
  const onDragCancel = (event: DragCancelEvent) => {
    console.log('heya')
    setActiveRef(undefined)
  }

  const onDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    if (!active || !over || active.id === over.id) {
      return
    }
    setDisableDnD(true)
    const oldIndex = openReferences.findIndex(
      reference => reference.order === active.id
    )
    const newIndex = openReferences.findIndex(
      reference => reference.order === over.id
    )
    // create a duplicate array
    const items = Array.from(openReferences)
    // create an id to item map from the initial array
    const idChildMap = new Map<string, any>(items.map(item => [item.id, item]))
    const [reorderedItem] = items.splice(oldIndex, 1)
    items.splice(newIndex, 0, reorderedItem)
    // Update the local state with reordered items
    const reorderedReferences = items.map((item, index) => ({
      ...item,
      order: index + 1
    }))
    setOpenReferences((openReferences: ReferenceType[]) => {
      // const oldIndex = references?.findIndex(
      //   reference => reference.order === active.id
      // )
      // const newIndex = references?.findIndex(
      //   repoKid => repoKid.order === over.id
      // )
      return arrayMove(openReferences, oldIndex, newIndex)
    })

    // Update the priorities of the items
    const prioritizedItems = reorderedReferences.map((item, index) => ({
      id: item.id,
      order: item.order
    }))

    // Compare prioritized items to references with id and create a new array of references with the ones that have changed priority
    const changedOrders = prioritizedItems.filter(item => {
      const reference = idChildMap.get(item.id)
      return reference?.order !== item.order
    })
    await updateNotesReferenceOrder(changedOrders)

    setActiveRef(undefined)
  }
  const [title, setTitle] = useState<string | undefined>()
  const [link, setLink] = useState<string | undefined>()
  const [type, setType] = useState<'ARTICLE' | 'VIDEO'>('ARTICLE')
  const [saveDisabled, setSaveDisabled] = useState(true)

  useEffect(() => {
    if (title && link && type) setSaveDisabled(false)
    else setSaveDisabled(true)
  }, [title, link, type])

  const handleNew = () => {
    if (title && link && type)
      createItemReferences({
        link: link,
        type: type,
        title: title,
        order: openReferences.length + 1,
        itemId: openItem.referenceId as string,
        itemType: openItem.referenceType as 'PROBLEM' | 'CUSTOM_PROBLEM'
      })
  }
  // if (!openReferences) {
  //   return
  // }
  if (activeNotesTab === 'Description') {
    return
  }
  return (
    <div className='rounded-md border p-2 hover:shadow-md'>
      <div
        className='flex items-center justify-between'
        onClick={() => toggleShowReferences()}
      >
        <h3 className={cn('scroll-m-20 font-semibold tracking-tight')}>
          References
        </h3>
        {showReferences ? (
          <ChevronDownIcon className='size-4' />
        ) : (
          <ChevronRightIcon className='size-4' />
        )}
      </div>
      <div className='flex justify-between'>
        <div>
          {showReferences && isReferencesLoading && (
            <div className='space-y-2'>
              <Skeleton className='h-4 w-[250px]' />
              <Skeleton className='h-4 w-[200px]' />
              <Skeleton className='h-4 w-[200px]' />
            </div>
          )}
          {/* {activeNotesTab === 'Notes' && showReferences && (
            <div>
              {openReferences?.map(refer => (
                <Reference
                  key={refer.id}
                  reference={refer}
                  disableDnD={disableDnD}
                />
              ))}
            </div>
          )} */}
          {activeNotesTab === 'MyNotes' &&
            showReferences &&
            !editRefMode &&
            openReferences &&
            openReferences.length > 0 && (
              // <div className='flex flex-col gap-2'>
              <div className='flex flex-col gap-1'>
                <DndContextWithNoSSR
                  // sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragStart={onDragStart}
                  onDragEnd={onDragEnd}
                  onDragCancel={onDragCancel}
                >
                  <SortableContext
                    items={openReferences.map(reference => reference.order)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div>
                      {openReferences.map(refer => (
                        <Reference
                          key={refer.id}
                          reference={refer}
                          disableDnD={disableDnD}
                        />
                      ))}
                    </div>
                  </SortableContext>
                  {/* <DragOverlay style={{ transformOrigin: '0 0 ' }}>
                {activeRef ? <Reference reference={activeRef} /> : null}
              </DragOverlay> */}
                </DndContextWithNoSSR>

                {/* {openReferences.map(refer => (
              <Reference key={refer.id} reference={refer} />
            ))} */}
              </div>
              // </div>
            )}
          {editRefMode && (
            <div>
              {showReferences &&
                openReferences &&
                openReferences.length > 0 && (
                  <div className='flex flex-col gap-2'>
                    {/* <DndContextWithNoSSR
            // sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragCancel={onDragCancel}
          >
            <SortableContext
              items={openReferences.map(reference => reference.order)}
              strategy={verticalListSortingStrategy}
            >
              <div>
                {openReferences.map(refer => (
                  <ReferenceEdit key={refer.id} reference={refer} />
                ))}
              </div>
            </SortableContext>
            <DragOverlay style={{ transformOrigin: '0 0 ' }}>
              {activeRef ? <ReferenceEdit reference={activeRef} /> : null}
            </DragOverlay>
          </DndContextWithNoSSR> */}
                    {openReferences?.map(refer => (
                      <ReferenceEdit
                        key={refer.id}
                        reference={refer}
                        addReferencefn={handleaddReference}
                        removeReferencefn={handleRemoveReference}
                      />
                    ))}
                  </div>
                )}
              <div className='p-1'>
                <div className='flex items-center gap-2'>
                  {/* <Input
            placeholder='Title'
            // value={reference?.title}
            className='w-40'
          />
          <Input
            placeholder='Link'
            // value={reference?.link}
            className='w-40'
          /> */}
                  <Select
                    defaultValue='ARTICLE'
                    value={type}
                    onValueChange={value => {
                      setType(value as 'ARTICLE' | 'VIDEO')
                    }}
                  >
                    <SelectTrigger rightIcon={false} className='w-10'>
                      <SelectValue placeholder='Type' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value='ARTICLE'>
                          <span className='flex gap-2'>
                            <DocumentIcon className='size-4' />
                            {/* Article */}
                          </span>
                        </SelectItem>
                        <SelectItem value='VIDEO'>
                          <span className='flex gap-2'>
                            <PlayCircleIcon className='size-4' />
                            {/* Video */}
                          </span>
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <div className='flex flex-col'>
                    <Input
                      placeholder='Title'
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      className='h-5 w-40 rounded-none border-2 border-transparent bg-transparent font-semibold tracking-tight focus-visible:border-b-primary focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0'

                      // className='h-6 w-40 border-transparent'
                    />
                    <Input
                      placeholder='Link'
                      value={link}
                      onChange={e => setLink(e.target.value)}
                      className='h-5 w-40 rounded-none border-2 border-transparent bg-transparent tracking-tight focus-visible:border-b-primary focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0'
                    />
                  </div>

                  <Button
                    className='flex w-40 gap-2'
                    variant={'bg'}
                    onClick={handleNew}
                    disabled={saveDisabled}
                  >
                    <PlusIcon className='size-4' />
                    New
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
        {showReferences && editRefMode && (
          <Button variant={'outline'} onClick={() => setEditRefMode(false)}>
            Done
          </Button>
        )}
        {activeNotesTab === 'MyNotes' &&
          session &&
          showReferences &&
          !editRefMode && (
            <Button
              variant={'outline'}
              onClick={() => {
                // if (!showReferences) toggleShowReferences()
                setEditRefMode(true)
              }}
            >
              Edit
            </Button>
          )}
      </div>
    </div>
  )
}

export default EditReferences
