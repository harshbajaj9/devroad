'use client'
import { auth, signOut } from '@/auth'
import Sidebar from '@/components/sidebar'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
  Separator,
  Toast,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@repo/ui'
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

import { slashCommand, suggestionItems } from '@/lib/components/slash-command'
import { LinkSelector } from '@/lib/components/link-selector'
import { NodeSelector } from '@/lib/components/node-selector'
import { TextButtons } from '@/lib/components/text-buttons'
import { handleCommandNavigation, ImageResizer } from 'novel/extensions'
import { handleImageDrop, handleImagePaste } from 'novel/plugins'
import { uploadFn } from '@/lib/components/image-upload'
const extensions = [...defaultExtensions, slashCommand]

import { ProblemData } from '@/typing'
import { api } from '@/trpc/react'
import { ArrowPathIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { cn, getPlatformIconSrc } from '@/lib/utils'
import { getPlatformIcon } from '@/app/repositories/[slug]/edit/editable-node'
import { useDebouncedCallback } from 'use-debounce'
const EditProblem = () => {
  const [itemSearchTerm, setItemSearchTerm] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
  const [filteredProblems, setFilteredProblems] = useState<ProblemData[]>([])
  const [selectedProblem, setSelectedProblem] = useState<ProblemData>()

  const handleCustomProblemTitleChange = async (title: string) => {
    setItemSearchTerm(title)

    // do a debounced search for the title
  }
  useEffect(() => {
    if (itemSearchTerm != debouncedSearchQuery) {
      const timerId = setTimeout(() => {
        // setPage(1)
        setDebouncedSearchQuery(itemSearchTerm)
      }, 1000)
      return () => clearTimeout(timerId)
    }
  }, [itemSearchTerm])

  const { data: searchProblemsData, isLoading: isSearchResultLoading } =
    api.problem.searchProblemsByIdOrTitle.useQuery(
      {
        searchQuery: debouncedSearchQuery
      },
      { enabled: !!debouncedSearchQuery }
    )
  useEffect(() => {
    console.log('haha')
    if (debouncedSearchQuery) {
      setFilteredProblems(searchProblemsData?.problems || [])
    }
  }, [debouncedSearchQuery, searchProblemsData])

  const [editorSavedStatus, setEditorSavedStatus] = useState(true)
  const utils = api.useUtils()
  const { mutateAsync: updateProblemDescription } =
    api.problem.updateProblemDescription.useMutation({
      onError: error => {
        utils.repositoryItem.getOrCreateUserData.invalidate()
        Toast({
          type: 'error',
          title: 'Error!',
          message: error?.message || 'Something went wrong',
          duration: 2000
        })
        // setSaveDisabled(false)
      },

      onSuccess() {
        // utils.repositoryItem.getNotes.invalidate()
        utils.repositoryItem.getOrCreateUserData.invalidate()
        // setSaveDisabled(true)
      },
      onMutate() {
        utils.repositoryItem.getOrCreateUserData.cancel()
      }
    })

  // TODO debounced save
  const debouncedEditorUpdates = useDebouncedCallback(
    async (editor: EditorInstance) => {
      const json = editor.getJSON()
      if (selectedProblem) {
        updateProblemDescription({
          id: selectedProblem.id,
          content: json
        })
        setEditorSavedStatus(true)
      }
    },
    1000
  )

  const [openNode, setOpenNode] = useState(false)
  const [openColor, setOpenColor] = useState(false)
  const [openLink, setOpenLink] = useState(false)

  return (
    <div className='relative flex'>
      <Sidebar />
      <div className='flex-1 p-24 xl:mx-20'>
        <div className='flex gap-8 rounded-lg border bg-background p-8'>
          <div className='flex flex-col gap-2'>
            <div>
              <Popover
                open={itemSearchTerm.length > 0 && filteredProblems?.length > 0}
              >
                <PopoverTrigger>
                  <div className='flex gap-4 space-y-2'>
                    {/* <Label htmlFor='itemSearchTerm'>Problem ID</Label> */}
                    <Input
                      id='itemSearchTerm'
                      value={itemSearchTerm}
                      onChange={e => {
                        setItemSearchTerm(e.target.value)
                      }}
                      // placeholder='Enter problem ID or Title'
                      placeholder='Enter problem Title'
                    />
                    {isSearchResultLoading && (
                      <ArrowPathIcon className='size-5' />
                    )}
                  </div>
                </PopoverTrigger>

                {itemSearchTerm && (
                  <PopoverContent className='w-80' align='start'>
                    <ScrollArea className='h-60'>
                      {filteredProblems.length > 0 &&
                        filteredProblems.map(problem => (
                          <div
                            className={cn(
                              'hover:muted relative my-1 flex-1 cursor-pointer rounded-md border bg-background p-1 px-2 text-sm text-foreground'
                            )}
                            onClick={() => {
                              setSelectedProblem(undefined)
                              setTimeout(() => {
                                setSelectedProblem(problem)
                              }, 0)
                              setItemSearchTerm('')
                            }}
                          >
                            <div
                              className={cn(
                                'flex flex-1 justify-between text-sm text-foreground'
                              )}
                            >
                              <div className='flex flex-1 flex-col'>
                                <div className='flex'>
                                  <a
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    href={problem.url ?? '#'}
                                    className='p-auto flex min-h-full items-center justify-start border-0'
                                    onClick={e => e.stopPropagation()}
                                  >
                                    <Image
                                      className='drop-shadow-2xl'
                                      src={getPlatformIconSrc(problem.platform)}
                                      width={20}
                                      height={20}
                                      alt='lc'
                                    ></Image>
                                    <p
                                      className={cn(
                                        'text-xs font-semibold text-muted-foreground'
                                      )}
                                    >
                                      {problem.title}
                                    </p>
                                  </a>
                                </div>
                                <div className='flex items-center justify-end'>
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <div className='border-0'>
                                          <p className='flex justify-start'>
                                            <span className='text-[10px] font-semibold text-background text-green-600 dark:text-green-400'>
                                              {/* {problem.difficulty ?? '-'} */}
                                              EASY
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
                                          <p className='flex justify-start text-[10px] font-semibold text-muted-foreground'>
                                            {problem.category ?? '-'}
                                            {/* DSA */}
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
                          </div>
                        ))}
                    </ScrollArea>
                  </PopoverContent>
                )}
              </Popover>
              {!isSearchResultLoading &&
                debouncedSearchQuery &&
                filteredProblems.length === 0 && (
                  <div className='m-2'>
                    <p className={cn('text-sm')}>Not found!</p>
                  </div>
                )}
            </div>
          </div>
        </div>
        <div>
          {selectedProblem && (
            <div
              className={cn(
                'group relative my-2 flex-1 select-none rounded-md border bg-background p-1 text-sm text-foreground'
              )}
            >
              <div
                className='invisible absolute right-4 top-4 z-10 -translate-y-1/2 translate-x-1/2 group-hover:visible'
                onClick={() => setSelectedProblem(undefined)}
              >
                <XMarkIcon className='size-5' />
              </div>
              <div
                className={cn('flex justify-between text-sm text-foreground')}
              >
                <div className='mx-12 my-12 flex w-full items-center justify-start'>
                  <div className='w-full'>
                    <div className='flex'>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className='border-0'>
                              <a
                                target='_blank'
                                rel='noopener noreferrer'
                                href={selectedProblem.url ?? '#'}
                                className={cn(
                                  'flex items-center gap-1 font-semibold leading-7 text-muted-foreground [&:not(:first-child)]:mt-6'
                                )}
                              >
                                <span className=''>
                                  <Image
                                    className='drop-shadow-2xl'
                                    src={getPlatformIconSrc(
                                      selectedProblem.platform
                                    )}
                                    width={20}
                                    height={20}
                                    alt='lc'
                                  ></Image>
                                </span>
                                {selectedProblem.title}
                              </a>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{selectedProblem.title}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className='flex items-center'>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className='border-0 px-1'>
                              <p className='flex justify-start'>
                                <span className='px-1 text-[10px] font-semibold text-background text-green-600 dark:text-green-400'>
                                  {selectedProblem.difficulty}
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
                              <p className='flex justify-start text-[10px] font-semibold text-muted-foreground'>
                                {selectedProblem.category}
                              </p>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Category</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className=''>
                      <div className='flex items-center justify-between gap-2'>
                        <div className='mx-2'>
                          <h3 className='scroll-m-20 text-sm font-semibold tracking-tight text-muted-foreground'>
                            Edit Description
                          </h3>
                        </div>
                        <Button
                          size={'sm'}
                          className='flex gap-2 hover:bg-transparent'
                          variant={'outline'}
                        >
                          {editorSavedStatus ? 'Saved' : 'Unsaved'}
                        </Button>
                      </div>

                      <EditorRoot>
                        <EditorContent
                          // editor={editor}
                          className='relative h-full min-h-screen p-4'
                          initialContent={
                            (selectedProblem?.description ??
                              undefined) as JSONContent
                          }
                          // initialContent={getInitialValue()}
                          // initialContent={editorInitValue ?? undefined}
                          extensions={extensions}
                          onUpdate={({ editor }) => {
                            setEditorSavedStatus(false)
                            debouncedEditorUpdates(editor)
                          }}
                          slotAfter={<ImageResizer />}
                          editorProps={{
                            handleDOMEvents: {
                              keydown: (_view, event) =>
                                handleCommandNavigation(event)
                            },
                            handlePaste: (view, event) =>
                              handleImagePaste(view, event, uploadFn),
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
                            <NodeSelector
                              open={openNode}
                              onOpenChange={setOpenNode}
                            />
                            <Separator orientation='vertical' />

                            <LinkSelector
                              open={openLink}
                              onOpenChange={setOpenLink}
                            />
                            <Separator orientation='vertical' />
                            <TextButtons />
                          </EditorBubble>
                        </EditorContent>
                      </EditorRoot>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EditProblem
