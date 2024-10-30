'use client'
import { uploadFn } from '@/lib/components/image-upload'
import { LinkSelector } from '@/lib/components/link-selector'
import { NodeSelector } from '@/lib/components/node-selector'
import { slashCommand, suggestionItems } from '@/lib/components/slash-command'
import { TextButtons } from '@/lib/components/text-buttons'
import { defaultExtensions } from '@/lib/extensions'
import { useNotes, useRepository } from '@/store'
import { api } from '@/trpc/react'
import { Separator, Toast } from '@repo/ui'
import { useSession } from 'next-auth/react'
import {
  EditorBubble,
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  EditorInstance,
  EditorRoot,
  JSONContent,
  useEditor
} from 'novel'
import { handleCommandNavigation, ImageResizer } from 'novel/extensions'
import { handleImageDrop, handleImagePaste } from 'novel/plugins'
import React, { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
const extensions = [...defaultExtensions, slashCommand]

const NovelEditorRoot = ({
  initialContent
}: {
  initialContent: JSONContent
}) => {
  const { openItem, setOpenItem } = useRepository()
  if (!openItem) return
  const [initContent, setInitContent] = useState(initialContent)
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
  // const [editorInitValue, setEditorInitValue] = useState<JSONContent|undefined>(undefined)

  // const { data: userData, isLoading: isNotesLoading } =
  //   api.repositoryItem.getOrCreateUserData.useQuery(
  //     {
  //       referenceId: openItem.referenceId as string
  //     },
  //     {
  //       enabled: !!session?.user.id
  //     }
  //   )
  // const { editor } = useEditor()
  // useEffect(() => {
  //   editor?.commands.setContent(userData?.note)
  // }, [initContent])
  // useEffect(() => {
  //   console.log('userData', userData, userData?.note)
  //   // setEditorInitValue(userData?.note)
  //   // editor?.commands.setContent(userData?.note)
  // }, [userData])
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
  const debouncedUpdates = useDebouncedCallback(
    async (editor: EditorInstance) => {
      const json = editor.getJSON()
      console.log(json, openItem)
      updateItemNote({
        referenceId: openItem.referenceId as string,
        referenceType: openItem.referenceType as
          | 'SECTION'
          | 'PROBLEM'
          | 'CUSTOM_PROBLEM',
        content: json
      })
      setEditorSavedStatus(true)
    },
    100
  )

  return (
    <EditorRoot>
      <EditorContent
        className='relative h-full min-h-screen p-4'
        // initialContent={(userData?.note ?? undefined) as JSONContent}
        // initialContent={initialContent}
        initialContent={initContent}
        // initialContent={editorInitValue}
        extensions={extensions}
        onUpdate={({ editor }) => {
          debouncedUpdates(editor)
          setEditorSavedStatus(false)
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

export default NovelEditorRoot
