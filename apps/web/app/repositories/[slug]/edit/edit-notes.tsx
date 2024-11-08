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
import { $Enums } from '@repo/database'
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
  Skeleton,
  Separator
} from '@repo/ui'
import { ChevronDownIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
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
import { useSession } from 'next-auth/react'
import {
  EditorBubble,
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  type EditorInstance,
  EditorRoot,
  type JSONContent,
  useEditor
} from 'novel'

import { defaultExtensions } from '@/lib/extensions'

import {
  slashCommand,
  suggestionItems
} from '../../../../lib/components/slash-command'
import { LinkSelector } from '../../../../lib/components/link-selector'
import { NodeSelector } from '../../../../lib/components/node-selector'
import { TextButtons } from '../../../../lib/components/text-buttons'
import { handleCommandNavigation, ImageResizer } from 'novel/extensions'
import { handleImageDrop, handleImagePaste } from 'novel/plugins'
import { uploadFn } from '@/lib/components/image-upload'
import { useDebouncedCallback } from 'use-debounce'
import NovelEditorRoot from './novel-editor-root'
import { flushSync } from 'react-dom'
const extensions = [...defaultExtensions, slashCommand]

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

const EditorBox = () => {
  const { openItem, setOpenItem } = useRepository()
  const { data: session, status, update } = useSession()

  const utils = api.useUtils()

  const [openNode, setOpenNode] = useState(false)
  const [openColor, setOpenColor] = useState(false)
  const [openLink, setOpenLink] = useState(false)
  const { activeNotesTab } = useNotes()

  const [editorSavedStatus, setEditorSavedStatus] = useState(true)
  const [saveDisabled, setSaveDisabled] = useState(true)

  const [editorInitValue, setEditorInitValue] = useState<
    JSONContent | undefined | null
  >(undefined)
  const {
    data: userData,
    isLoading: isNotesLoading,
    refetch: refetchNotes
  } = api.repositoryItem.getOrCreateUserData.useQuery(
    {
      referenceId: openItem?.referenceId as string,
      referenceType: openItem?.referenceType as 'PROBLEM' | 'CUSTOM_PROBLEM'
    },
    {
      enabled: !!session?.user.id
    }
  )

  const { mutateAsync: updateItemNote } =
    api.repositoryItem.updateItemNote.useMutation({
      onError: error => {
        utils.repositoryItem.getOrCreateUserData.invalidate()
        Toast({
          type: 'error',
          title: 'Error!',
          message: error?.message || 'Something went wrong',
          duration: 2000
        })
        setSaveDisabled(false)
      },

      onSuccess() {
        // utils.repositoryItem.getNotes.invalidate()
        utils.repositoryItem.getOrCreateUserData.invalidate()
        setSaveDisabled(true)
      },
      onMutate() {
        utils.repositoryItem.getOrCreateUserData.cancel()
      }
    })

  // TODO debounced save
  const debouncedUpdates = useDebouncedCallback(
    async (editor: EditorInstance) => {
      const json = editor.getJSON()
      if (
        openItem?.referenceId &&
        openItem?.referenceType &&
        openItem?.referenceType !== null
      ) {
        updateItemNote({
          referenceId: openItem?.referenceId,
          referenceType: openItem?.referenceType as
            | 'SECTION'
            | 'PROBLEM'
            | 'CUSTOM_PROBLEM',
          content: json
        })
        setEditorSavedStatus(true)
      }
    },
    1000
  )
  return (
    <EditorRoot>
      <EditorContent
        // editor={editor}
        className='relative h-full min-h-screen p-4'
        initialContent={(userData?.note ?? undefined) as JSONContent}
        // initialContent={getInitialValue()}
        // initialContent={editorInitValue ?? undefined}
        extensions={extensions}
        onUpdate={({ editor }) => {
          setEditorSavedStatus(false)
          debouncedUpdates(editor)
        }}
        slotAfter={<ImageResizer />}
        editorProps={{
          handleDOMEvents: {
            keydown: (_view, event) => handleCommandNavigation(event)
          },
          handlePaste: (view, event) => handleImagePaste(view, event, uploadFn),
          handleDrop: (view, event, _slice, moved) =>
            handleImageDrop(view, event, moved, uploadFn),
          attributes: {
            class: `prose dark:prose-invert prose-p:m-0 prose-img:m-0 prose-headings:m-0 prose-ul:m-0 prose-li:m-0 prose-headings:font-title font-default focus:outline-none max-w-full`,
            spellcheck: 'false'
          }
        }}
      >
        <EditorCommand className='z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all'>
          <EditorCommandEmpty className='px-2 text-muted-foreground'>
            No results
          </EditorCommandEmpty>
          <EditorCommandList>
            {suggestionItems.map(item => (
              <EditorCommandItem
                value={item.title}
                onCommand={val => item.command?.(val)}
                className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent`}
                key={item.title}
              >
                <div className='flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background'>
                  {item.icon}
                </div>
                <div>
                  <p className='font-medium'>{item.title}</p>
                  <p className='text-xs text-muted-foreground'>
                    {item.description}
                  </p>
                </div>
              </EditorCommandItem>
            ))}
          </EditorCommandList>
        </EditorCommand>

        <EditorBubble
          tippyOptions={{
            placement: 'top'
          }}
          className='flex w-fit max-w-[90vw] overflow-hidden rounded-md border border-muted bg-background shadow-xl'
        >
          <Separator orientation='vertical' />
          <NodeSelector open={openNode} onOpenChange={setOpenNode} />
          <Separator orientation='vertical' />

          <LinkSelector open={openLink} onOpenChange={setOpenLink} />
          <Separator orientation='vertical' />
          <TextButtons />
        </EditorBubble>
      </EditorContent>
    </EditorRoot>
  )
}
const EditNotes = () => {
  // console.log('initialContent', initialContent)
  const { openItem, setOpenItem } = useRepository()
  if (!openItem) {
    return
  }
  // const { activeNoteContent, setActiveNoteContent } = useNotes()
  const { data: session, status, update } = useSession()
  // const { data: notesData, isLoading: isNotesLoading } =
  //   api.repositoryItem.getNotes.useQuery(
  //     {
  //       id: openItem.id as string,
  //       referenceId: openItem.referenceId as string,
  //       referenceType: openItem.referenceType as 'PROBLEM' | 'CUSTOM_PROBLEM'
  //       // | 'SECTION' //TODO: add if needed
  //     },
  //     {
  //       enabled: !!session?.user.id
  //     }
  //   )
  const [editorInitValue, setEditorInitValue] = useState<
    JSONContent | undefined | null
  >(undefined)
  const {
    data: userData,
    isLoading: isNotesLoading,
    refetch: refetchNotes
  } = api.repositoryItem.getOrCreateUserData.useQuery(
    {
      referenceId: openItem.referenceId as string,
      referenceType: openItem.referenceType as 'PROBLEM' | 'CUSTOM_PROBLEM'
    },
    {
      enabled: !!session?.user.id
    }
  )
  const [showNote, setShowNote] = useState(false)
  // useEffect(() => {
  //   setShowNote(false)
  // }, [])
  useEffect(() => {
    // flushSync(() => {
    //   setEditorInitValue(null)
    // })
    // setEditorInitValue(userData?.note)

    // setEditorInitValue(null)
    // // Update the note after resetting
    // setTimeout(() => {
    //   setEditorInitValue(userData?.note)
    // }, 0)

    // if (userData && !isNotesLoading) {
    //   // Reset the note content
    //   setEditorInitValue(null)
    //   // Update the note after resetting
    //   setTimeout(() => {
    //     setEditorInitValue(userData.note)
    //   }, 0)
    // }

    // if (userData && !isNotesLoading) {
    //   console.log('activeNoteContent1', userData, editorInitValue)
    //   // setEditorInitValue(userData.note)
    //   setShowNote(true)
    //   setEditorInitValue(userData.note)
    //   // if (editor) editor.commands.setContent(userData.note)
    // }
    console.log('activeNoteContent2', userData, editorInitValue)
    // function handleSubmit() {
    //   flushSync(() => {
    //     setEditorInitValue(undefined)
    //   })
    //   if (userData && !isNotesLoading) {
    //     console.log('activeNoteContent1', userData, editorInitValue)
    //     // setEditorInitValue(userData.note)
    //     setShowNote(true)
    //     setEditorInitValue(userData.note)
    //     // if (editor) editor.commands.setContent(userData.note)
    //   }
    //   console.log('activeNoteContent2', userData, editorInitValue)
    // }
    // handleSubmit()
  }, [userData, openItem])
  // useEffect(() => {
  //   function handleSubmit() {
  //     flushSync(() => {
  //       setEditorInitValue(undefined)
  //     })
  //     if (userData && !isNotesLoading) {
  //       console.log('activeNoteContent1', userData, editorInitValue)
  //       // setEditorInitValue(userData.note)

  //       setEditorInitValue(userData.note)
  //       // if (editor) editor.commands.setContent(userData.note)
  //     }
  //     console.log('activeNoteContent2', userData, editorInitValue)
  //   }
  //   handleSubmit()
  // }, [])
  // const { editor } = useEditor()
  // useEffect(() => {
  //   console.log('openItem,userData', openItem, userData, userData?.note)
  //   refetchNotes()
  //   // setEditorInitValue(userData?.note)
  //   // editor?.commands.setContent(userData?.note)
  // }, [openItem])
  // const { data: repoNotesData, isLoading: isRepoNotesLoading } =
  //   api.repositoryItem.getRepositoryNotes.useQuery({
  //     id: openItem.id as string,
  //     referenceId: openItem.referenceId as string,
  //     referenceType: openItem.referenceType as 'PROBLEM' | 'CUSTOM_PROBLEM'
  //     // | 'SECTION' //TODO: add if needed
  //   })
  const [newDisabled, setNewDisabled] = useState(false)
  const utils = api.useUtils()

  const [openNode, setOpenNode] = useState(false)
  const [openColor, setOpenColor] = useState(false)
  const [openLink, setOpenLink] = useState(false)
  const { activeNotesTab } = useNotes()
  // const { activeNote, setActiveNote, activeNotesTab } = useNotes()
  // const [title, setTitle] = useState(activeNote?.title)
  const [editorSavedStatus, setEditorSavedStatus] = useState(true)
  const [saveDisabled, setSaveDisabled] = useState(true)
  const { mutateAsync: updateItemNote } =
    api.repositoryItem.updateItemNote.useMutation({
      onError: error => {
        utils.repositoryItem.getOrCreateUserData.invalidate()
        Toast({
          type: 'error',
          title: 'Error!',
          message: error?.message || 'Something went wrong',
          duration: 2000
        })
        setSaveDisabled(false)
      },
      onSuccess: () => {
        // utils.repositoryItem.getNotes.invalidate()
        utils.repositoryItem.getOrCreateUserData.invalidate()
        setSaveDisabled(true)
      },
      onMutate() {
        utils.repositoryItem.getOrCreateUserData.cancel()
      }
    })

  // TODO debounced save
  // const debouncedUpdates = useDebouncedCallback(
  //   async (editor: EditorInstance) => {
  //     const json = editor.getJSON()
  //     console.log(json, openItem)
  //     if (
  //       openItem?.referenceId &&
  //       openItem?.referenceType &&
  //       openItem?.referenceType !== null
  //     ) {
  //       updateItemNote({
  //         referenceId: openItem?.referenceId,
  //         referenceType: openItem?.referenceType as
  //           | 'SECTION'
  //           | 'PROBLEM'
  //           | 'CUSTOM_PROBLEM',
  //         content: json
  //       })
  //       setEditorSavedStatus(true)
  //     }
  //   },
  //   1000
  // )
  // const getInitialValue = () => {
  //   return editorInitValue
  // }
  // if (!userData) {
  //   console.log('test user data', userData)
  //   return
  // }
  if (activeNotesTab === 'Description') {
    return
  }
  return (
    <div className='rounded-md border bg-background p-2 hover:shadow-md'>
      {/* <div>{userData?.lastStatus}</div> */}
      <div className={cn('flex items-center justify-between')}>
        <h3 className={cn('scroll-m-20 font-semibold tracking-tight')}>
          Notes
        </h3>
        <div className='relative my-1 flex items-center justify-between gap-4 px-1'>
          <div className='flex items-center gap-2'>
            <Button
              size={'sm'}
              className='flex gap-2 hover:bg-transparent'
              variant={'outline'}
            >
              {editorSavedStatus ? 'Saved' : 'Unsaved'}
            </Button>
          </div>
        </div>
      </div>
      <div className='flex-1'>
        {/* {isNotesLoading && (
          <div className='space-y-2'>
            <Skeleton className='h-4 w-[250px]' />
            <Skeleton className='h-4 w-[200px]' />
            <Skeleton className='h-4 w-[200px]' />
          </div>
        )} */}
        {/* {!isNotesLoading && <NovelEditorRoot initialContent={userData?.note} />} */}
        {session && !userData && (
          <Skeleton className='h-[125px] w-full rounded-xl' />
        )}
        {session && userData && <EditorBox />}
      </div>
    </div>
  )
}

export default EditNotes
