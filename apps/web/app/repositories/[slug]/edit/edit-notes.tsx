'use client'
import { cn } from '@/lib/utils'
import { api } from '@/trpc/react'
import {
  ChevronRightIcon,
  ChevronUpIcon,
  DocumentIcon,
  EllipsisVerticalIcon,
  PlusIcon,
  TrashIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { $Enums } from '@prisma/client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
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
  Input,
  Toast,
  Skeleton
} from '@repo/ui'
import { ChevronDownIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import EditNote from './edit-note'
import { DndContextWithNoSSR } from './edit-repo-items'
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import {
  closestCenter,
  DragCancelEvent,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useDroppable,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { NoteType, useNotes, useRepository } from '@/store'
import { Jost, Poppins } from 'next/font/google'
// const notes1 = [
//   {
//     id: '1',
//     title: 'Brute Force',
//     content:
//       'Deserunt nulla fugiat dolore aliqua. Nostrud non aute dolor esse irure occaecat commodo cupidatat excepteur Lorem adipisicing sit nisi fugiat. Officia occaecat eu cillum dolore Lorem. Duis pariatur est do dolor exercitation. Incididunt ad Lorem nostrud eiusmod aute eiusmod ex labore. Dolore in aliquip fugiat et fugiat elit culpa qui velit proident occaecat. Quis labore est duis velit ut exercitation minim aliqua pariatur.',
//     order: 1
//   },
//   {
//     id: '2',
//     title: 'Better O(N2)',
//     content:
//       'Deserunt nulla fugiat dolore aliqua. Nostrud non aute dolor esse irure occaecat commodo cupidatat excepteur Lorem adipisicing sit nisi fugiat. Officia occaecat eu cillum dolore Lorem. Duis pariatur est do dolor exercitation. Incididunt ad Lorem nostrud eiusmod aute eiusmod ex labore. Dolore in aliquip fugiat et fugiat elit culpa qui velit proident occaecat. Quis labore est duis velit ut exercitation minim aliqua pariatur.',
//     order: 2
//   },
//   {
//     id: '4',
//     title: 'Best',
//     content:
//       'Deserunt nulla fugiat dolore aliqua. Nostrud non aute dolor esse irure occaecat commodo cupidatat excepteur Lorem adipisicing sit nisi fugiat. Officia occaecat eu cillum dolore Lorem. Duis pariatur est do dolor exercitation. Incididunt ad Lorem nostrud eiusmod aute eiusmod ex labore. Dolore in aliquip fugiat et fugiat elit culpa qui velit proident occaecat. Quis labore est duis velit ut exercitation minim aliqua pariatur.',
//     order: 3
//   },
//   {
//     id: '5',
//     title: 'Wonderful',
//     content:
//       'Deserunt nulla fugiat dolore aliqua. Nostrud non aute dolor esse irure occaecat commodo cupidatat excepteur Lorem adipisicing sit nisi fugiat. Officia occaecat eu cillum dolore Lorem. Duis pariatur est do dolor exercitation. Incididunt ad Lorem nostrud eiusmod aute eiusmod ex labore. Dolore in aliquip fugiat et fugiat elit culpa qui velit proident occaecat. Quis labore est duis velit ut exercitation minim aliqua pariatur.',
//     order: 4
//   },
//   {
//     id: '3',
//     title: 'Optimized O(N)',
//     content:
//       'Deserunt nulla fugiat dolore aliqua. Nostrud non aute dolor esse irure occaecat commodo cupidatat excepteur Lorem adipisicing sit nisi fugiat. Officia occaecat eu cillum dolore Lorem. Duis pariatur est do dolor exercitation. Incididunt ad Lorem nostrud eiusmod aute eiusmod ex labore. Dolore in aliquip fugiat et fugiat elit culpa qui velit proident occaecat. Quis labore est duis velit ut exercitation minim aliqua pariatur.',
//     order: 5
//   }
// ]

const ActiveNote = () => {
  const { activeNote, setActiveNote } = useNotes()
  const [title, setTitle] = useState(activeNote?.title)
  const [content, setContent] = useState(activeNote?.content)
  const [saveDisabled, setSaveDisabled] = useState(true)
  const utils = api.useUtils()
  const { mutateAsync: updateItemNote } =
    api.repositoryItem.updateItemNote.useMutation({
      onError: error => {
        utils.repositoryItem.getNotes.invalidate()
        Toast({
          type: 'error',
          title: 'Error!',
          message: error?.message || 'Something went wrong',
          duration: 2000
        })
        setSaveDisabled(false)
      },
      onSuccess: () => {
        utils.repositoryItem.getNotes.invalidate()
        Toast({
          title: '📃Note Updated',
          type: 'success'
          // message: 'success'
        })
        setSaveDisabled(true)
      },
      onMutate() {
        utils.repositoryItem.getNotes.cancel()
      }
    })
  const { mutateAsync: deleteNoteReference } =
    api.repositoryItem.deleteNoteReference.useMutation({
      onError: error => {
        utils.repositoryItem.getNotes.invalidate()
        Toast({
          type: 'error',
          title: 'Error!',
          message: error?.message || 'Something went wrong',
          duration: 2000
        })
        setSaveDisabled(false)
      },
      onSuccess: () => {
        utils.repositoryItem.getNotes.invalidate()
        Toast({
          title: '📃Note Deleted',
          type: 'success'
          // message: 'success'
        })
        setSaveDisabled(true)
        setActiveNote(undefined)
      },
      onMutate() {
        utils.repositoryItem.getNotes.cancel()
      }
    })

  useEffect(() => {
    if (activeNote) {
      setTitle(activeNote?.title)
      setContent(activeNote?.content)
    }
    setSaveDisabled(true)
  }, [activeNote])
  useEffect(() => {
    if (
      (title && title?.length > 0 && title != activeNote?.title) ||
      content !== activeNote?.content
    )
      setSaveDisabled(false)
    else setSaveDisabled(true)
  }, [title, content])
  return (
    <>
      {activeNote && (
        <div className='flex-1'>
          <div className='relative my-4 flex items-center justify-between gap-4'>
            <div className='flex-1'>
              <Input
                // className='scroll-m-20 text-2xl font-semibold tracking-tight'

                className={cn(
                  'scroll-m-20 rounded-none border-2 border-transparent bg-transparent py-4 text-2xl font-extrabold tracking-tight text-muted-foreground focus-visible:border-b-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 lg:text-2xl',
                  font2.className
                )}
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>
            <div className='flex items-center gap-2'>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      className='flex gap-2'
                      variant={'bg'}
                      disabled={saveDisabled}
                      onClick={() =>
                        // updateItemNote({
                        //   id: reference.id,
                        //   title: title,
                        //   link: link,
                        //   type: type
                        // })
                        {
                          if (title)
                            updateItemNote({
                              id: activeNote.id,
                              title: title,
                              content: content ?? null
                            })
                        }
                      }
                    >
                      <DocumentIcon className='size-4' />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Save</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={'destructive'}
                      onClick={() => {
                        deleteNoteReference({ id: activeNote.id })
                      }}
                    >
                      {/* <PlusIcon className='size-4' /> */}
                      <TrashIcon className='size-4' />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Delete</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {activeNote?.added ? (
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button
                      variant={'ghost'}
                      // onClick={() => removeReferencefn(reference.id)}
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
                          Remove note
                        </h4>
                        <p className='text-sm text-muted-foreground'>
                          Remove this note from the current repository.
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
                      // onClick={() => addReferencefn(reference.id)}
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
                        <h4 className='font-medium leading-none'>Add note</h4>
                        <p className='text-sm text-muted-foreground'>
                          Make the note visible for this Repository.
                        </p>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              )}
              {/* <Button variant={'default'}>Save</Button> */}
              {/* <div className='flex items-center gap-2'>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    // className='absolute right-1 top-2'
                    asChild
                  >
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

                    <DropdownMenuItem
                      onClick={e => {
                        e.stopPropagation()
                      }}
                    >
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <div className='flex w-full'>
                            <PlusIcon className='mr-2 h-4 w-4' />
                            Add
                          </div>
                        </HoverCardTrigger>
                        <HoverCardContent
                          align='end'
                          className='mt-4 w-80 bg-backgroundalt'
                        >
                          <div className='grid gap-4'>
                            <div className='space-y-2'>
                              <h4 className='font-medium leading-none'>
                                {true ? 'Remove note' : 'Add note'}
                              </h4>
                              <p className='text-sm text-muted-foreground'>
                                {true
                                  ? "Remove note from current repository, this reference won't show up if the repository is public."
                                  : 'Make the note visible in case the Repository is public.'}
                              </p>
                            </div>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={e => {
                        e.stopPropagation()
                      }}
                    >
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <div className='flex w-full'>
                            <TrashIcon className='mr-2 h-4 w-4' />
                            Delete
                          </div>
                        </HoverCardTrigger>
                        <HoverCardContent
                          align='end'
                          className='mt-4 w-80 bg-backgroundalt'
                        >
                          <div className='grid gap-4'>
                            <div className='space-y-2'>
                              <h4 className='font-medium leading-none'>
                                {true ? 'Remove reference' : 'Add reference'}
                              </h4>
                              <p className='text-sm text-muted-foreground'>
                                {true
                                  ? "Remove reference from current repository, this reference won't show up if the repository is public."
                                  : 'Make the reference visible in case the Repository is public.'}
                              </p>
                            </div>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div> */}
            </div>
          </div>
          <Textarea
            className='mb-4 h-full min-h-screen resize-none border-none p-4'
            // value={
            //   'Pariatur ullamco pariatur veniam non non esse est commodo deserunt dolore esse. Exercitation elit officia irure laboris fugiat enim deserunt velit deserunt.Pariatur ullamco pariatur veniam non non esse est commodo deserunt dolore esse. Exercitation elit officia irure laboris fugiat enim deserunt velit deserunt. Cillum exercitation eiusmod ullamco pariatur enim pariatur sint ullamco.Pariatur ullamco pariatur veniam non non esse est commodo deserunt dolore esse. Exercitation elit officia irure laboris fugiat enim deserunt velit deserunt. Cillum exercitation eiusmod ullamco pariatur enim pariatur sint ullamco. Nostrud labore officia fugiat adipisicing do in aute culpa mollit ipsum Lorem labore duis. Excepteur sint cillum ad sint pariatur nulla do veniam aliquip esse anim ad veniam consequat.Sint et cupidatat elit excepteur enim. Cupidatat amet id aliqua aute duis. Qui nostrud qui nulla enim cillum et irure Lorem veniam sint cupidatat voluptate excepteur aliquip. Voluptate exercitation labore pariatur Lorem elit occaecat nostrud magna velit id. Est sit cupidatat fugiat sunt.Aute proident ipsum ipsum in aliquip aliquip fugiat minim incididunt eiusmod laborum proident Lorem ipsum. Ad magna sunt Lorem in aliquip. Elit excepteur commodo in ullamco elit occaecat ex adipisicing non reprehenderit sit id anim cillum. Aliquip irure anim non nulla officia ea sit mollit cupidatat adipisicing et nostrud aute aliquip. Commodo dolore proident incididunt ex aute commodo ex duis magna labore esse incididunt cillum. Ullamco do tempor esse et. Aute anim consectetur in incididunt incididunt dolor incididunt ullamco.Sint mollit ipsum ut elit ipsum cupidatat nostrud culpa occaecat. Sint elit voluptate deserunt est irure occaecat non velit aliqua aute. Deserunt incididunt deserunt mollit voluptate irure. Do sit minim consectetur tempor laboris id esse sit eu. Duis dolore magna occaecat excepteur sit ipsum commodo nostrud consectetur cillum aliquip. Aliqua dolore aliqua aliqua commodo enim irure amet reprehenderit.Laborum proident deserunt aliqua incididunt ad. Nostrud anim commodo consequat non occaecat consequat ea. Lorem veniam in do commodo veniam. Officia id velit enim ipsum sit aute. Consequat nisi id et aliqua ad. Magna non amet est incididunt enim sunt esse ad veniam Lorem irure elit.'
            // }
            placeholder='Note'
            value={content ?? undefined}
            onChange={e => setContent(e.target.value)}
          />
        </div>
      )}
    </>
  )
}
interface SortableNoteProps {
  id: string
  title: string
  order: number
  content: string
}
const SortableNote = ({
  noteData,
  disableDnD
}: {
  noteData: NoteType | undefined
  disableDnD: boolean
}) => {
  if (!noteData) return
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: noteData.order, disabled: disableDnD })
  const { activeNote } = useNotes()

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: isDragging ? 'grabbing' : 'grab'
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      // faded={isDragging}
      // {...props}
      {...attributes}
      {...listeners}
      // className='inline-flex w-fit items-center border bg-background px-4 py-1 hover:bg-muted'
      className={cn(
        'flex max-w-40 flex-1 rounded-t-md border border-transparent bg-muted px-4 py-2 text-sm font-semibold',
        activeNote?.id === noteData?.id
          ? 'border-input border-b-transparent bg-background'
          : '',
        isDragging && 'border-primary'
      )}
    >
      {/* <div className='max-w-40 overflow-hidden shrink-1 '> */}
      <span className={cn('truncate', font2.className)}>{noteData?.title}</span>
      {/* </div> */}
    </div>
  )
}
interface EditNotesProps {
  itemId: string
}
const font = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin']
})
const font2 = Jost({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin']
})
const EditNotes = ({ itemId }: EditNotesProps) => {
  const { openItem, setOpenItem } = useRepository()
  if (!openItem) return

  const { data: notesData, isLoading: isNotesLoading } =
    api.repositoryItem.getNotes.useQuery({
      id: openItem.id as string,
      referenceId: openItem.referenceId as string,
      referenceType: openItem.referenceType as 'PROBLEM' | 'CUSTOM_PROBLEM'
      // | 'SECTION' //TODO: add if needed
    })
  const [notes, setNotes] = useState<NoteType[]>([])
  useEffect(() => {
    if (notesData) {
      setNotes([])
      if (notesData.length > 0) {
        setNotes(notesData as NoteType[])
        setActiveNote(notesData[0] as NoteType)
      }
    }
  }, [notesData])
  // useEffect(() => {
  //   console.log('setting')
  //   if (notes.length > 0) {
  //     setActiveNote(notes[0])

  //     console.log('setting1', notes[0], activeNote)
  //   }
  // }, [notes])

  // useEffect(() => {
  //   // Setup logic here

  //   return () => {
  //     setActiveNote(undefined)
  //   }
  // }, [])

  const { showNotes, toggleShowNotes } = useNotes()
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))
  const [newDisabled, setNewDisabled] = useState(false)
  const utils = api.useUtils()
  // create reference
  const { mutateAsync: createItemNotes } =
    api.repositoryItem.createItemNotes.useMutation({
      onError: error => {
        utils.repositoryItem.getNotes.invalidate()
        Toast({
          type: 'error',
          title: 'Error!',
          message: error?.message || 'Something went wrong',
          duration: 2000
        })
      },
      onSuccess: () => {
        utils.repositoryItem.getNotes.invalidate()
        Toast({
          title: 'Note Created😎',
          type: 'success'
          // message: 'success'
        })
        setNewDisabled(true)
      },
      onMutate() {
        utils.repositoryItem.getNotes.cancel()
      }
    })

  // add note to repo
  const { mutateAsync: addNoteOrReference } =
    api.repositoryItem.addNoteOrReference.useMutation({
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
      },
      onMutate() {
        utils.repositoryItem.getReferences.cancel()
      }
    })

  const handleaddReference = (id: string) => {
    addNoteOrReference({ repoItemId: openItem.id, id: id, type: 'REFERENCE' })
  }
  const { mutateAsync: removeNoteOrReference } =
    api.repositoryItem.removeNoteOrReference.useMutation({
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
        utils.repositoryItem.getReferences.invalidate()
        Toast({
          title: '📃Reference Created😎',
          type: 'success'
          // message: 'success'
        })
      },
      onMutate() {
        utils.repositoryItem.getReferences.cancel()
      }
    })
  const handleRemoveReference = (id: string) => {
    removeNoteOrReference({
      repoItemId: openItem.id,
      id: id,
      type: 'REFERENCE'
    })
  }

  function handleDragStart(event: DragStartEvent) {
    const { active } = event
    setActiveNote(notes?.find(note => note.order === active.id))
    console.log(activeNote, notes, active.id)
  }
  const handleDragCancel = (event: DragCancelEvent) => {
    // setActiveNote(undefined)
  }
  const [disableDnD, setDisableDnD] = useState(false)
  // update reference order
  const { mutateAsync: updateNotesReferenceOrder } =
    api.repositoryItem.updateNotesReferenceOrder.useMutation({
      onError: error => {
        utils.repositoryItem.getNotes.invalidate()
        Toast({
          type: 'error',
          title: 'Error!',
          message: error?.message || 'Something went wrong',
          duration: 2000
        })
        setDisableDnD(false)
      },
      onSuccess: () => {
        utils.repositoryItem.getNotes.invalidate()
        Toast({
          title: '📃Notes order updated😎',
          type: 'success'
          // message: 'success'
        })
        setDisableDnD(false)
      },
      onMutate() {
        utils.repositoryItem.getNotes.cancel()
        // setDisableDnD(false)
      }
    })
  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!active || !over || active.id === over.id) {
      return
    }
    setDisableDnD(true)
    const oldIndex = notes.findIndex(note => note.order === active.id)
    const newIndex = notes.findIndex(note => note.order === over.id)

    // create a duplicate array
    const items = Array.from(notes)
    // create an id to item map from the initial array
    const idChildMap = new Map<string, any>(items.map(item => [item.id, item]))
    const [reorderedItem] = items.splice(oldIndex, 1)
    items.splice(newIndex, 0, reorderedItem)
    // Update the local state with reordered items
    const reorderedReferences = items.map((item, index) => ({
      ...item,
      order: index + 1
    }))

    setNotes(items => {
      // const oldIndex = notes.findIndex(note => note.order === active.id)
      // const newIndex = notes.findIndex(note => note.order === over.id)
      return arrayMove(items, oldIndex, newIndex)
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

    // setActiveNote(undefined)
  }
  const { activeNote, setActiveNote } = useNotes()

  useEffect(() => {
    setActiveNote(undefined)
  }, [openItem])
  // const [activeNote, setActiveNote] = useState<
  //   | {
  //       id: string
  //       title: string
  //       content: string
  //       order: number
  //     }
  //   | undefined
  // >()
  const { isOver, setNodeRef } = useDroppable({
    id: 'droppable'
  })
  const style = {
    color: isOver ? 'green' : undefined
  }

  return (
    <div className=''>
      <div
        className={cn('my-4 flex items-center justify-between')}
        onClick={() => {
          toggleShowNotes()
        }}
      >
        <h3
          className={cn(
            'scroll-m-20 text-xl font-semibold tracking-tight',
            font2.className
          )}
        >
          Notes
        </h3>
        {showNotes ? (
          <ChevronDownIcon className='size-4' />
        ) : (
          <ChevronRightIcon className='size-4' />
        )}
      </div>

      {/* <div className='my-4 flex justify-end'>
        <Button className='w-40'>Add Note</Button>
      </div> */}

      {/* <div className='flex cursor-default flex-wrap'>
        {notes.map(note => (
          // <EditNote />
          <div className='flex items-center border bg-background px-4 hover:bg-muted'>
            <div className=''>{note.title}</div>
          </div>
        ))}
        <div className=''>
          <Button variant={'bg'} className='rounded-none'>
            <PlusIcon className='size-5' />
          </Button>
        </div>
      </div> */}
      {showNotes && isNotesLoading && (
        <div className='space-y-2'>
          <Skeleton className='h-4 w-[250px]' />
          <Skeleton className='h-4 w-[200px]' />
          <Skeleton className='h-4 w-[200px]' />
        </div>
      )}
      {showNotes && notes && notes?.length > 0 && (
        <>
          <DndContextWithNoSSR
            autoScroll={false}
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
            onDragCancel={handleDragCancel}
          >
            <SortableContext
              items={notes.map(note => note.order)}
              strategy={horizontalListSortingStrategy}
            >
              <div
                ref={setNodeRef}
                style={style}
                className='flex max-w-[80%] flex-wrap items-end'
              >
                {notes.map(note => (
                  // <EditNote />
                  <SortableNote
                    key={note.id}
                    noteData={note}
                    disableDnD={disableDnD}
                  />
                ))}
              </div>
            </SortableContext>
            <DragOverlay style={{ transformOrigin: '0 0 ' }}>
              {activeNote ? (
                <SortableNote key={activeNote.id} noteData={activeNote} />
              ) : null}
            </DragOverlay>
          </DndContextWithNoSSR>
          <ActiveNote />
        </>
      )}
      {showNotes && (
        <Button
          variant={'ghost'}
          className='flex gap-2'
          onClick={() => {
            console.log('you')
            createItemNotes({
              itemId: openItem.referenceId,
              itemType: openItem.referenceType as 'CUSTOM_PROBLEM' | 'PROBLEM',
              order: notes.length + 1
            })
          }}
        >
          <PlusIcon className='size-5' />
          New
        </Button>
      )}
      {/* <Accordion type='single' collapsible className='w-full'>
        {notes.map(note => (
          <AccordionItem value={note.id} key={note.id}>
            <AccordionTrigger>
              <div className='flex items-center'>
                <p>{note.title}</p>
                <Button variant={'link'}>Edit</Button>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className='mb-2 flex justify-end'>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant={'bg'} className='w-28'>
                      <PlusIcon className='size-4' />
                      Add
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent
                    align='end'
                    className='mt-4 w-80 bg-backgroundalt'
                  >
                    <div className='grid gap-4'>
                      <div className='space-y-2'>
                        <h4 className='font-medium leading-none'>
                          Add to current Repository
                        </h4>
                        <p className='text-sm text-muted-foreground'>
                          Add note to your current repository if you want people
                          to be able to view it when this Repository is public.
                        </p>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>
              <Textarea
                placeholder='Add your notes here...'
                className='h-full min-h-96 resize-none'
                // value={note.content}
                value={
                  'Pariatur ullamco pariatur veniam non non esse est commodo deserunt dolore esse. Exercitation elit officia irure laboris fugiat enim deserunt velit deserunt.Pariatur ullamco pariatur veniam non non esse est commodo deserunt dolore esse. Exercitation elit officia irure laboris fugiat enim deserunt velit deserunt. Cillum exercitation eiusmod ullamco pariatur enim pariatur sint ullamco.Pariatur ullamco pariatur veniam non non esse est commodo deserunt dolore esse. Exercitation elit officia irure laboris fugiat enim deserunt velit deserunt. Cillum exercitation eiusmod ullamco pariatur enim pariatur sint ullamco. Nostrud labore officia fugiat adipisicing do in aute culpa mollit ipsum Lorem labore duis. Excepteur sint cillum ad sint pariatur nulla do veniam aliquip esse anim ad veniam consequat.Sint et cupidatat elit excepteur enim. Cupidatat amet id aliqua aute duis. Qui nostrud qui nulla enim cillum et irure Lorem veniam sint cupidatat voluptate excepteur aliquip. Voluptate exercitation labore pariatur Lorem elit occaecat nostrud magna velit id. Est sit cupidatat fugiat sunt.Aute proident ipsum ipsum in aliquip aliquip fugiat minim incididunt eiusmod laborum proident Lorem ipsum. Ad magna sunt Lorem in aliquip. Elit excepteur commodo in ullamco elit occaecat ex adipisicing non reprehenderit sit id anim cillum. Aliquip irure anim non nulla officia ea sit mollit cupidatat adipisicing et nostrud aute aliquip. Commodo dolore proident incididunt ex aute commodo ex duis magna labore esse incididunt cillum. Ullamco do tempor esse et. Aute anim consectetur in incididunt incididunt dolor incididunt ullamco.Sint mollit ipsum ut elit ipsum cupidatat nostrud culpa occaecat. Sint elit voluptate deserunt est irure occaecat non velit aliqua aute. Deserunt incididunt deserunt mollit voluptate irure. Do sit minim consectetur tempor laboris id esse sit eu. Duis dolore magna occaecat excepteur sit ipsum commodo nostrud consectetur cillum aliquip. Aliqua dolore aliqua aliqua commodo enim irure amet reprehenderit.Laborum proident deserunt aliqua incididunt ad. Nostrud anim commodo consequat non occaecat consequat ea. Lorem veniam in do commodo veniam. Officia id velit enim ipsum sit aute. Consequat nisi id et aliqua ad. Magna non amet est incididunt enim sunt esse ad veniam Lorem irure elit.'
                }
                // onChange={e => updateNote(note.id, e.target.value)}
                rows={4}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion> */}
    </div>
  )
}

export default EditNotes
