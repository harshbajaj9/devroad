'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { api } from '@/trpc/react'
import {
  Button,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  RadioGroup,
  RadioGroupItem,
  ScrollArea,
  Toast
} from '@repo/ui'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@repo/ui/components/ui/select'
import {
  CustomTooltip,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
  TableCell,
  TableRow,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@repo/ui'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { ProblemData } from '@/typing'
import { cn } from '@/lib/utils'
import { getPlatformIcon } from './editable-node'
import {
  ArrowPathIcon,
  ChevronDownIcon,
  DocumentIcon,
  EllipsisVerticalIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { XCircleIcon } from '@heroicons/react/24/solid'
import { RepoStructureNode, useEditRepository, useRepoStructure } from '@/store'
import SelectDirectoryModal from './select-directory-modal'
import {
  ChevronRight,
  CopyrightIcon,
  Folder,
  FolderOpen,
  Search,
  X
} from 'lucide-react'
import { $Enums } from '@repo/database'
import SectionPicker from './section-picker'
import { Jost } from 'next/font/google'
import Image from 'next/image'
// export const allowedProblemSetTypes: any[] = ['PROBLEM', 'RESOURCE', 'CUSTOM']
// export const createRepositoryItemProblemSchema = z.object({
//   id: z.string().min(2).optional()
// })
// export const createRepositoryItemProblemSchema = z.object({
//   title: z.string().min(2).optional(),
//   description: z.string().max(30).optional(),
//   // starting_trigger: z.enum(['PROBLEM_SET', 'ROADMAP', 'COLLECTION'])
//   type: z.enum(['PROBLEM', 'INTERVIEW_QUESTION', 'INTERVIEW_PROBLEM'])
// })
// export const createRepositoryItemProblemSchema = z.object({
//   title: z.string().min(2).optional(),
//   description: z.string().max(30).optional(),
//   // starting_trigger: z.enum(['PROBLEM_SET', 'ROADMAP', 'COLLECTION'])
//   type: z.enum(['PROBLEM', 'INTERVIEW_QUESTION', 'INTERVIEW_PROBLEM'])
// })

// type MiniRepositoryStructure {
//   id:string,
//   title:string,
// }

type Props = {
  // isOpen: boolean
  // flowDetails?: VisitorFlowV2;
  refetchData?: () => void
  // parentId: string
  // parentType: $Enums.RepositoryItemParentType
  // parentName: string
  path?: { id: string; title: string }[]
}
export type ItemType = 'PROBLEM' | 'CUSTOM' | 'SECTION' | null
// export type ItemType = 'PROBLEM' | 'SECTION' | null

const AddItemModal = ({
  // isOpen,
  // flowDetails,
  refetchData,
  // parentId,
  // parentType,
  // parentName,
  path
}: Props) => {
  // if (!isOpen) return null
  const { currentPath, setCurrentPath, setDirectoryModal, repoStructure } =
    useRepoStructure()
  const { setIsCreateItemModalOpen } = useEditRepository()
  // useEffect(() => {
  //   console.log('render1')
  //   console.log('curp', currentPath, path)
  //   if (path) setCurrentPath(path)
  // }, [])
  const router = useRouter()
  const utils = api.useUtils()

  const { mutateAsync: createRepositoryItem } =
    api.repositoryItem.create.useMutation({
      // refetchOnWindowFocus: false,
      onSuccess(createdCollection: { id: String }) {
        Toast({ title: 'Item created', type: 'success' })
        // utils.repository.get.invalidate('lucky-you-cm11ct0ur0000egusctw514he')
        utils.repository.get.invalidate()
        setIsCreateItemModalOpen(false)

        // router.push(`/repositories/${createdCollection.id}`)
      },
      onError(error: { message: any }) {
        Toast({
          type: 'error',
          title: 'Error!',
          message: error?.message || 'Something went wrong',
          duration: 5000
        })
      }
    })

  // const form = useForm<RepositoryItemCreationSchema>({
  //   resolver: zodResolver(createRepositorySchema),
  //   defaultValues: {
  //     title: '',
  //     description: '',
  //     starting_trigger: 'PROBLEM_SET'
  //   }
  // })

  // const handlecreateRepository = async (values: RepositoryCreationSchema) => {
  //   handleSave(values)
  // }

  // const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [itemType, setItemType] = useState<ItemType>(null)

  const [itemSearchTerm, setItemSearchTerm] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
  const [filteredProblems, setFilteredProblems] = useState<ProblemData[]>([])
  const [selectedProblem, setSelectedProblem] = useState<ProblemData>()
  const [problemTab, setProblemTab] = useState<'problem' | 'custom'>('problem')

  const [itemTitle, setItemTitle] = useState('')
  const [itemDescription, setItemDescription] = useState('')
  const [itemImageUrl, setItemImageUrl] = useState('')

  const [customItemLink, setCustomItemLink] = useState('')
  // const [searchQuery, setSearchQuery] = useState('')

  const [customItemCategory, setCustomItemCategory] = useState<
    'DSA' | 'SQL' | 'OS' | undefined
  >()
  const [customItemDifficulty, setCustomItemDifficulty] = useState<
    'EASY' | 'MEDIUM' | 'HARD'
  >('EASY')
  const handleNext = () => {
    if (step === 1 && itemType) {
      setStep(2)
    } else if (step === 2) {
      // console.log({
      //   type: itemType,
      //   id: itemType === 'PROBLEM' ? itemSearchTerm : undefined,
      //   title: itemType === 'CUSTOM' ? itemTitle : undefined
      // })
      // console.log('current path', currentPath)
      if (itemType === 'PROBLEM' && problemTab === 'problem') {
        if (
          selectedProblem &&
          currentPath &&
          currentPath.length > 0 &&
          currentPath[currentPath.length - 1]?.id
        ) {
          createRepositoryItem({
            parentType: currentPath.length === 1 ? 'REPOSITORY' : 'SECTION',
            type: $Enums.RepositoryItemType.ITEM,
            parentId: currentPath[currentPath.length - 1]?.id as string,
            referenceType: $Enums.RepositoryItemReferenceType.PROBLEM,
            referenceId: selectedProblem.id,
            repositoryId: repoStructure.id
          })
        } else {
          Toast({
            title: `Error: Please select a problem`,
            type: 'error'
          })
          return
        }
      } else if (itemType === 'PROBLEM' && problemTab === 'custom') {
        if (
          customItemLink &&
          itemTitle &&
          currentPath &&
          currentPath.length > 0 &&
          currentPath[currentPath.length - 1]?.id
        ) {
          createRepositoryItem({
            parentType: currentPath.length === 1 ? 'REPOSITORY' : 'SECTION',
            type: $Enums.RepositoryItemType.ITEM,
            parentId: currentPath[currentPath.length - 1]?.id as string,
            referenceType: $Enums.RepositoryItemReferenceType.CUSTOM_PROBLEM,
            // referenceId: selectedProblem.id
            repositoryId: repoStructure.id,
            title: itemTitle,
            description: itemDescription,
            imageUrl: itemImageUrl,
            link: customItemLink,
            difficulty: customItemDifficulty,
            category: customItemCategory
          })
        } else {
          Toast({
            title: `Error: Please select a problem`,
            type: 'error'
          })
          return
        }
      } else if (itemType === 'SECTION') {
        if (
          currentPath &&
          currentPath.length > 0 &&
          currentPath[currentPath.length - 1]?.id
        ) {
          createRepositoryItem({
            title: itemTitle,
            parentType: currentPath.length === 1 ? 'REPOSITORY' : 'SECTION',
            type: $Enums.RepositoryItemType.SECTION,
            parentId: currentPath[currentPath.length - 1]?.id as string,
            repositoryId: repoStructure.id
          })
        } else {
          Toast({
            title: `Error: Please select a problem`,
            type: 'error'
          })
          return
        }
      }

      // setOpen(false)
      // onClose()
      // resetForm()
    }
  }
  const resetForm = () => {
    setStep(1)
    setItemType(null)
    setItemSearchTerm('')
    setItemTitle('')
  }
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
    if (debouncedSearchQuery) {
      setFilteredProblems(searchProblemsData?.problems || [])
    }
  }, [debouncedSearchQuery, searchProblemsData])

  const { data: customLinkData, isLoading: isCustomLinkDataLoading } =
    api.repositoryItem.searchCustomLinkData.useQuery(
      {
        link: customItemLink
      },
      { enabled: !!customItemLink }
    )
  useEffect(() => {
    console.log(customLinkData)
    if (customLinkData?.ogTitle) {
      setItemTitle(customLinkData.ogTitle)
    }
    if (customLinkData?.ogDescription) {
      setItemDescription(customLinkData.ogDescription)
    }
    if (customLinkData?.ogImage) {
      setItemImageUrl(customLinkData.ogImage.url)
    }
    // if (customLinkData.ogTitle) {
    //   setItemDescription(customLinkData.ogTitle)
    // }
  }, [customItemLink, customLinkData, isCustomLinkDataLoading])
  return (
    <>
      {/* <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setOpen(true)}>Create New Item</Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Create New Item</DialogTitle>
            <DialogDescription>
              {step === 1
                ? 'Choose the type of item you want to create.'
                : itemType === 'PROBLEM'
                  ? 'Enter the ID for the problem.'
                  : 'Enter the title for your custom item.'}
            </DialogDescription>
          </DialogHeader>
          <div className='py-4'>
            {step === 1 && (
              <RadioGroup
                value={itemType || ''}
                onValueChange={value => setItemType(value as ItemType)}
              >
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='PROBLEM' id='problem' />
                  <Label htmlFor='problem'>Problem</Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='CUSTOM' id='custom' />
                  <Label htmlFor='custom'>Custom</Label>
                </div>
              </RadioGroup>
            )}
            {step === 2 && itemType === 'PROBLEM' && (
              <div className='space-y-2'>
                <Label htmlFor='itemSearchTerm'>Problem ID</Label>
                <Input
                  id='itemSearchTerm'
                  value={itemSearchTerm}
                  onChange={e => setItemSearchTerm(e.target.value)}
                  placeholder='Enter problem ID'
                />
              </div>
            )}
            {step === 2 && itemType === 'CUSTOM' && (
              <div className='space-y-2'>
                <Label htmlFor='itemTitle'>Custom Item Title</Label>
                <Input
                  id='itemTitle'
                  value={itemTitle}
                  onChange={e => setItemTitle(e.target.value)}
                  placeholder='Enter custom item title'
                />
              </div>
            )}
          </div>
          <DialogFooter>
            {step === 2 && (
              <Button variant='outline' onClick={() => setStep(1)}>
                Back
              </Button>
            )}
            <Button onClick={handleNext} disabled={step === 1 && !itemType}>
              {step === 1 ? 'Next' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
      <div className='fixed inset-0 z-40 bg-background/40'></div>
      {/* <SelectDirectoryModal /> */}
      <div className='border-gray fixed inset-0 left-[50%] top-[50%] z-50 m-4 flex h-fit -translate-x-1/2 -translate-y-1/2 flex-col gap-2 rounded-2xl border bg-background pb-8 pt-4'>
        <div className='px-8'>
          <h2 className='scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0'>
            Add
          </h2>
        </div>
        <div className='border-b'></div>
        <div className='px-8'>
          <SectionPicker itemType={itemType} />

          <div className='sm:max-w-[425px]'>
            <div>
              <h4 className='scroll-m-20 text-xl font-semibold tracking-tight'>
                {step === 1 && 'Choose A the type of item you want to create.'}
                {step === 2 &&
                  itemType &&
                  {
                    PROBLEM: 'Search existing problems.',
                    SECTION: 'Enter section title.',
                    CUSTOM: 'Enter the details for your custom item.'
                  }[itemType]}
              </h4>
            </div>
            <div className='py-4'>
              {step === 1 && (
                <RadioGroup
                  value={itemType || undefined}
                  onValueChange={value => setItemType(value as ItemType)}
                >
                  {currentPath && currentPath.length < 3 && (
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='SECTION' id='section' />
                      <Label htmlFor='section'>
                        <span className='flex items-baseline gap-2'>
                          Section
                          <span className='text-xs'>Create a section</span>
                        </span>
                      </Label>
                    </div>
                  )}
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='PROBLEM' id='problem' />
                    <Label htmlFor='problem'>
                      <span className='flex items-baseline gap-2'>
                        Problem
                        <span className='text-xs'>
                          Choose from existing problems,or create a new one
                        </span>
                      </span>
                    </Label>
                  </div>
                  {/* <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='CUSTOM' id='custom' />
                  <Label htmlFor='custom'>
                    <span className='flex items-baseline gap-2'>
                      Custom Item
                      <span className='text-xs'>Create custom item</span>
                    </span>
                  </Label>
                </div> */}
                </RadioGroup>
              )}
              {step === 2 && itemType === 'PROBLEM' && (
                <>
                  <Tabs
                    defaultValue='problem'
                    value={problemTab}
                    className='w-[400px]'
                  >
                    <TabsList className='grid w-full grid-cols-2'>
                      <TabsTrigger
                        value='problem'
                        onClick={() => {
                          setProblemTab('problem')
                        }}
                      >
                        Existing Problem
                      </TabsTrigger>
                      <TabsTrigger
                        value='custom'
                        onClick={() => {
                          setProblemTab('custom')
                        }}
                      >
                        Create new
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value='problem'>
                      <Popover
                        open={
                          itemSearchTerm.length > 0 &&
                          filteredProblems?.length > 0
                        }
                      >
                        <PopoverTrigger>
                          <div className='flex gap-4 space-y-2'>
                            {/* <Label htmlFor='itemSearchTerm'>Problem ID</Label> */}
                            <Input
                              id='itemSearchTerm'
                              value={itemSearchTerm}
                              onChange={e => {
                                handleCustomProblemTitleChange(e.target.value)
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
                                      // isEditMode && 'scale-[1.01] border border-primary shadow-md'
                                    )}
                                    onClick={() => {
                                      setSelectedProblem(problem),
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
                                          {/* <div className='border-0'>
                                          <p className=''>{problem.title}</p>
                                        </div> */}
                                          {/* <div className='p-auto flex min-h-full items-center justify-start border-0 px-2'> */}
                                          <a
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            href={problem.url ?? '#'}
                                            className='p-auto flex min-h-full items-center justify-start border-0'
                                            onClick={e => e.stopPropagation()}
                                          >
                                            {getPlatformIcon('LC')}
                                            <p
                                              className={cn(
                                                'text-xs font-semibold text-muted-foreground'
                                              )}
                                            >
                                              {problem.title}
                                            </p>
                                          </a>
                                          {/* </div> */}
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
                      {selectedProblem && (
                        // <div
                        //   className={cn(
                        //     'group relative my-4 flex cursor-pointer justify-between rounded-md border p-1 text-sm text-foreground shadow-md transition-colors duration-200 hover:bg-muted'
                        //   )}
                        //   key={selectedProblem.id}
                        // >
                        //   <div
                        //     className='invisible absolute right-0 top-0 z-10 -translate-y-1/2 translate-x-1/2 group-hover:visible'
                        //     onClick={() => setSelectedProblem(null)}
                        //   >
                        //     <XCircleIcon className='hover: size-6 text-primary' />
                        //   </div>
                        //   <div className='flex items-center justify-start'>
                        //     <div>
                        //       <div className='flex'>
                        //         <div className='border-0 p-1'>
                        //           <p className=''>{selectedProblem.title}</p>
                        //         </div>
                        //         <div className='p-auto flex min-h-full items-center justify-start border-0 px-2'>
                        //           <a
                        //             target='_blank'
                        //             rel='noopener noreferrer'
                        //             href={selectedProblem.url ?? '#'}
                        //             className=''
                        //           >
                        //             {getPlatformIcon(selectedProblem.platform)}
                        //           </a>
                        //         </div>
                        //       </div>
                        //       <div className='flex items-center'>
                        //         <TooltipProvider>
                        //           <Tooltip>
                        //             <TooltipTrigger asChild>
                        //               <div className='border-0 p-1'>
                        //                 <p className='flex justify-start'>
                        //                   <span className='rounded-md bg-green-500 p-[2px] px-1 text-[10px] font-semibold text-background'>
                        //                     {selectedProblem.difficulty ?? '-'}
                        //                   </span>
                        //                 </p>
                        //               </div>
                        //             </TooltipTrigger>
                        //             <TooltipContent>
                        //               <p>Difficulty</p>
                        //             </TooltipContent>
                        //           </Tooltip>
                        //         </TooltipProvider>
                        //         <TooltipProvider>
                        //           <Tooltip>
                        //             <TooltipTrigger asChild>
                        //               <div className='border-0 p-1'>
                        //                 <p className='flex justify-start text-xs font-semibold text-muted-foreground'>
                        //                   {selectedProblem.category ?? '-'}
                        //                 </p>
                        //               </div>
                        //             </TooltipTrigger>
                        //             <TooltipContent>
                        //               <p>Category</p>
                        //             </TooltipContent>
                        //           </Tooltip>
                        //         </TooltipProvider>
                        //       </div>
                        //     </div>
                        //   </div>
                        // </div>

                        <div
                          className={cn(
                            'group relative my-2 flex-1 cursor-pointer select-none rounded-md border bg-background p-1 text-sm text-foreground'
                          )}
                        >
                          {/* <div
                          className='invisible absolute right-0 top-0 z-10 -translate-y-1/2 translate-x-1/2 group-hover:visible'
                          onClick={() => setSelectedProblem(null)}
                        >
                          <XCircleIcon className='hover: size-6 text-primary' />
                        </div> */}
                          <div
                            className='invisible absolute right-4 top-4 z-10 -translate-y-1/2 translate-x-1/2 group-hover:visible'
                            onClick={() => setSelectedProblem(undefined)}
                          >
                            <XMarkIcon className='size-5' />
                          </div>
                          <div
                            className={cn(
                              'flex justify-between text-sm text-foreground'
                            )}
                          >
                            <div className='flex items-center justify-start'>
                              <div>
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
                                              {getPlatformIcon(
                                                selectedProblem.platform ?? 'LC'
                                              )}
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
                                              {selectedProblem.difficulty ??
                                                'EASY'}
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
                                            {selectedProblem.category ?? 'DSA'}
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
                        </div>
                      )}
                      <div
                        className={cn('m-2 w-fit text-sm')}
                        // onClick={() => setAddCustom(prev => !prev)}
                        onClick={() => setProblemTab('custom')}
                      >
                        <span
                          className={cn(
                            'cursor-pointer text-sm hover:underline'
                          )}
                        >
                          Add your own problem?
                        </span>
                      </div>
                    </TabsContent>
                    <TabsContent value='custom'>
                      <div className='flex gap-2'>
                        <div className='flex items-center gap-2'>
                          <Input
                            id='link'
                            // defaultValue=''
                            placeholder='Drop a link to auto fetch'
                            className=''
                            value={customItemLink}
                            onChange={e => setCustomItemLink(e.target.value)}
                          />
                          {isCustomLinkDataLoading && (
                            <div className='col-span-1'>
                              <ArrowPathIcon className='size-5' />
                            </div>
                          )}
                        </div>
                        <div className='flex items-center gap-2'>
                          <Input
                            id='itemTitle'
                            // defaultValue='Pedro Duarte'
                            onChange={e => setItemTitle(e.target.value)}
                            value={itemTitle}
                            placeholder='Enter custom problem title'
                            className=''
                          />
                        </div>
                      </div>

                      {/* <div className='grid gap-4 py-4'>
                      <div className='grid grid-cols-5 items-center gap-4'>
                        <Label htmlFor='link' className='text-right'>
                          Link
                        </Label>
                        <Input
                          id='link'
                          // defaultValue=''
                          placeholder='Drop a link to auto fetch'
                          className='col-span-3'
                          value={customItemLink}
                          onChange={e => setCustomItemLink(e.target.value)}
                        />
                        {isCustomLinkDataLoading && (
                          <div className='col-span-1'>
                            <ArrowPathIcon className='size-5' />
                          </div>
                        )}
                      </div>
                      <div className='grid grid-cols-5 items-center gap-4'>
                        <Label htmlFor='name' className='text-right'>
                          Title
                        </Label>
                        <Input
                          id='itemTitle'
                          // defaultValue='Pedro Duarte'
                          onChange={e => setItemTitle(e.target.value)}
                          value={itemTitle}
                          placeholder='Enter custom item title'
                          className='col-span-3'
                        />
                      </div>
                      <div className='grid grid-cols-5 items-center gap-4'>
                        <Label htmlFor='description' className='text-right'>
                          Description
                        </Label>
                        <Input
                          id='itemDescription'
                          onChange={e => setItemDescription(e.target.value)}
                          value={itemDescription}
                          placeholder='Enter custom item description'
                          className='col-span-3'
                        />
                      </div>
                    </div> */}
                      {customItemLink && customLinkData && (
                        <div className='my-2 rounded-md border border-primary p-2'>
                          {/* <div className='overflow-hidden rounded'>
                          <img
                            alt={itemTitle}
                            src={itemImageUrl}
                            width={40}
                            height={40}
                            className='h-10 w-20 object-cover'
                          />
                        </div> */}
                          <div className='flex items-start gap-4'>
                            <a
                              className={cn(
                                'flex items-start gap-2 text-sm font-semibold text-muted-foreground'
                              )}
                              target='_blank'
                              rel='noopener noreferrer'
                              href={customItemLink}
                            >
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <CopyrightIcon className='size-4' />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Custom</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              {itemTitle}
                            </a>
                            {/* <p>{itemDescription}</p> */}
                          </div>
                          <div className='mt-2 flex justify-start gap-2'>
                            <div>
                              <Select
                                value={customItemDifficulty}
                                onValueChange={value => {
                                  setCustomItemDifficulty(
                                    value as 'EASY' | 'MEDIUM' | 'HARD'
                                  )
                                }}
                              >
                                <SelectTrigger className=''>
                                  <SelectValue placeholder='Difficulty' />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value='EASY'>EASY</SelectItem>
                                  <SelectItem value='MEDIUM'>MEDIUM</SelectItem>
                                  <SelectItem value='HARD'>HARD</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Select
                                value={customItemCategory}
                                onValueChange={value => {
                                  // TODO: figure out category
                                  setCustomItemCategory(
                                    value as 'DSA' | 'SQL' | 'OS'
                                  )
                                }}
                              >
                                <SelectTrigger className=''>
                                  <SelectValue placeholder='Category' />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value='DSA'>DSA</SelectItem>
                                  <SelectItem value='SQL'>SQL</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </>
              )}
              {step === 2 && itemType === 'CUSTOM' && (
                <>
                  <div className='grid gap-4 py-4'>
                    <div className='grid grid-cols-5 items-center gap-4'>
                      <Label htmlFor='link' className='text-right'>
                        Link
                      </Label>
                      <Input
                        id='link'
                        // defaultValue=''
                        className='col-span-3'
                        value={customItemLink}
                        onChange={e => setCustomItemLink(e.target.value)}
                      />
                      {isCustomLinkDataLoading && (
                        <div className='col-span-1'>
                          <ArrowPathIcon className='size-5' />
                        </div>
                      )}
                    </div>
                    <div className='grid grid-cols-5 items-center gap-4'>
                      <Label htmlFor='name' className='text-right'>
                        Title
                      </Label>
                      <Input
                        id='itemTitle'
                        // defaultValue='Pedro Duarte'
                        onChange={e => setItemTitle(e.target.value)}
                        value={itemTitle}
                        placeholder='Enter custom item title'
                        className='col-span-3'
                      />
                    </div>
                    <div className='grid grid-cols-5 items-center gap-4'>
                      <Label htmlFor='description' className='text-right'>
                        Description
                      </Label>
                      <Input
                        id='itemDescription'
                        onChange={e => setItemDescription(e.target.value)}
                        value={itemDescription}
                        placeholder='Enter custom item description'
                        className='col-span-3'
                      />
                    </div>
                  </div>
                  {customItemLink && customLinkData && (
                    <div className='flex items-center gap-4 rounded-md border border-primary p-2'>
                      <div className='overflow-hidden rounded'>
                        <img
                          src={itemImageUrl}
                          // width={100}
                          // height={100}
                          className='h-20 w-52 object-cover'
                        />
                      </div>
                      <div className='flex flex-col'>
                        <a href={customItemLink}>{itemTitle}</a>
                        <p>{itemDescription}</p>
                      </div>
                    </div>
                  )}
                  {/* <div className='space-y-2'>
                  <Label htmlFor='itemTitle'>Custom Item Title</Label>
                  <Input
                    id='itemTitle'
                    value={itemTitle}
                    onChange={e => setItemTitle(e.target.value)}
                    placeholder='Enter custom item title'
                  />
                </div> */}
                </>
              )}
              {step === 2 && itemType === 'SECTION' && (
                <>
                  <div className='grid gap-4 py-4'>
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label htmlFor='link' className='text-right'>
                        Title
                      </Label>
                      <Input
                        id='sectionTitle'
                        placeholder='Enter section title'
                        // defaultValue=''
                        className='col-span-3'
                        value={itemTitle}
                        onChange={e => setItemTitle(e.target.value)}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className='flex justify-end gap-2'>
            {step === 1 ? (
              <Button
                variant='outline'
                onClick={() => {
                  setIsCreateItemModalOpen(false)
                }}
              >
                Cancel
              </Button>
            ) : (
              <Button variant='outline' onClick={() => setStep(1)}>
                Back
              </Button>
            )}
            <Button onClick={handleNext} disabled={step === 1 && !itemType}>
              {step === 1 ? 'Next' : 'Create'}
            </Button>
            {/* <Button
            variant={'outline'}
            onClick={() => {
              onClose()
            }}
            size={'lg'}
          >
            Cancel
          </Button>
          <Button
            variant={'default'}
            // onClick={form.handleSubmit(handlecreateRepository)}
            size={'lg'}
            type='submit'
          >
            Create
          </Button> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default AddItemModal
