import { cn } from '@/lib/utils'
import { useNotes, useRepository } from '@/store'
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { Button, Separator, Textarea } from '@repo/ui'
import { Jost, Poppins } from 'next/font/google'
import React, { useState } from 'react'
import {
  EditorBubble,
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  type EditorInstance,
  EditorRoot,
  type JSONContent
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
const extensions = [...defaultExtensions, slashCommand]
const font = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin']
})
const font2 = Jost({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin']
})
const EditDescription = () => {
  const { activeNotesTab } = useNotes()
  const [openNode, setOpenNode] = useState(false)
  const [openLink, setOpenLink] = useState(false)
  const { openItem, setOpenItem } = useRepository()
  if (activeNotesTab != 'Description') {
    return
  }

  return (
    <div className='rounded-md p-2'>
      <div
        className={cn('flex items-center justify-between')}
        // onClick={() => setShowDescription(prev => !prev)}
      >
        {/* <p className={cn('scroll-m-20 font-semibold tracking-tight')}>
          Description
        </p> */}
        {/* {showDescription ? (
          <ChevronDownIcon className='size-4' />
        ) : (
          <ChevronRightIcon className='size-4' />
        )} */}
      </div>
      {/* {showDescription && ( */}
      <div className='border-0 p-1'>
        <div className='flex-1'>
          {/* <Textarea
            className='h-full resize-none border-none'
            value={openItem?.description ?? undefined}
            placeholder={
              openItem?.referenceType === 'PROBLEM'
                ? ''
                : 'Write your description'
            }
            disabled={openItem?.referenceType === 'PROBLEM'}
          /> */}
          <EditorRoot>
            <EditorContent
              className='relative h-full min-h-screen p-4'
              // initialContent={editorContent || defaultValue}
              // initialContent={openItem?.problem}
              // {...(openItem?.problem && { initialContent = {openItem?.problem?.description as JSONContent} })}
              {...(openItem?.problem
                ? {
                    initialContent: openItem.problem.description as JSONContent
                  }
                : {})}
              {...(openItem?.customProblem
                ? {
                    initialContent: openItem.customProblem
                      .description as JSONContent
                  }
                : {})}
              extensions={extensions}
              // onUpdate={({ editor }) => {}}
              slotAfter={<ImageResizer />}
              editorProps={{
                // handleDOMEvents: {
                //   keydown: (_view, event) => handleCommandNavigation(event)
                // },
                // handlePaste: (view, event) =>
                //   handleImagePaste(view, event, uploadFn),
                // handleDrop: (view, event, _slice, moved) =>
                //   handleImageDrop(view, event, moved, uploadFn),
                attributes: {
                  class: `prose dark:prose-invert prose-p:m-0 prose-headings:m-0 prose-ul:m-0 prose-li:m-0 prose-headings:font-title font-default focus:outline-none max-w-full`,
                  spellcheck: 'false'
                },
                editable: () => false
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
                {/* <Separator orientation='vertical' />
                <ColorSelector open={openColor} onOpenChange={setOpenColor} /> */}
              </EditorBubble>
            </EditorContent>
          </EditorRoot>
        </div>
      </div>
      {/* )} */}
      {/* <Button
        variant={'ghost'}
        className=''
        onClick={() => setShowDescription(prev => !prev)}
      >
        {showDescription ? 'Hide description' : 'Show description'}
      </Button> */}
    </div>
  )
}

export default EditDescription
