'use client'
import Illustration1 from '@/components/svgs/illustration1'
import { cn } from '@/lib/utils'
import { useEditRepository } from '@/store'
import { api } from '@/trpc/react'
import {
  BookmarkIcon,
  CalendarDaysIcon,
  ChatBubbleBottomCenterTextIcon,
  CheckBadgeIcon,
  ClipboardDocumentIcon,
  ClipboardDocumentListIcon,
  EllipsisVerticalIcon,
  FolderIcon,
  HeartIcon,
  PencilIcon,
  PlayIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline'
import {
  PlayIcon as PlayIconSolid,
  HeartIcon as HeartIconSolid
} from '@heroicons/react/24/solid'
import { $Enums, Repository } from '@repo/database'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  DropdownMenuPortal,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
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
  Separator,
  Tabs,
  TabsList,
  TabsTrigger,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@repo/ui'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Toast
} from '@repo/ui'
import {
  Bolt,
  Mail,
  MessageSquare,
  PlusCircle,
  User,
  UserPlus
} from 'lucide-react'
import { Bricolage_Grotesque, Jost } from 'next/font/google'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
// const font2 = Bricolage_Grotesque({
//   weight: ['300', '400', '500', '600', '700', '800'],
//   subsets: ['latin']
// })
const font2 = Jost({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin']
})
interface EditCollectionHeaderProps {
  repository: Repository
}
const EditRepositoryHeader = ({ repository }: EditCollectionHeaderProps) => {
  const { isEditMode, setIsEditMode } = useEditRepository()
  const handleSave = () => {
    setIsEditMode(false)
  }
  const {
    data: countValues,
    isLoading,
    isSuccess
  } = api.repository.getCountValues.useQuery(repository.id)

  const router = useRouter()
  // const { mutateAsync: createNewSession } =
  //   api.repository.createNewSession.useMutation({
  //     // refetchOnWindowFocus: false,
  //     onSuccess(createdSession: { id: String }) {
  //       router.push(`/sessions/${createdSession.id}`)

  //       Toast({ title: 'Visibility Updated', type: 'success' })
  //     },
  //     onError(error: { message: any }) {
  //       utils.repository.get.invalidate()
  //       Toast({
  //         type: 'error',
  //         title: 'Error!',
  //         message: error?.message || 'Something went wrong',
  //         duration: 5000
  //       })
  //     }
  //   })
  const handleStartSession = () => {
    // createNewSession({
    //   id: repository.id
    // })
  }
  const [visibility, setVisibility] = useState(repository.visibility)
  const utils = api.useUtils()
  const { mutateAsync: updateVisibility } =
    api.repository.updateVisibility.useMutation({
      // refetchOnWindowFocus: false,
      onSuccess() {
        utils.repository.get.invalidate(repository.id)
        Toast({ title: 'Visibility Updated', type: 'success' })
      },
      onError(error: { message: any }) {
        utils.repository.get.invalidate(repository.id)
        Toast({
          type: 'error',
          title: 'Error!',
          message: error?.message || 'Something went wrong',
          duration: 5000
        })
      }
    })

  const { data: currentLikedStatus } = api.repository.getLikedStatus.useQuery(
    repository.id
  )
  const [likedStatus, setLikedStatus] = useState(currentLikedStatus)
  useEffect(() => {
    // if condition to not update when unnecessary
    if (likedStatus !== currentLikedStatus) setLikedStatus(currentLikedStatus)
  }, [currentLikedStatus])
  const { mutateAsync: liked } = api.repository.liked.useMutation({
    // refetchOnWindowFocus: false,
    onSuccess() {
      utils.repository.getLikedStatus.invalidate(repository.id)
    },
    onError(error: { message: any }) {
      utils.repository.get.invalidate(repository.id)
      Toast({
        type: 'error',
        title: 'Error!',
        message: error?.message || 'Something went wrong',
        duration: 5000
      })
    }
  })
  const { mutateAsync: unliked } = api.repository.unliked.useMutation({
    // refetchOnWindowFocus: false,
    onSuccess() {
      utils.repository.getLikedStatus.invalidate(repository.id)
    },
    onError(error: { message: any }) {
      utils.repository.get.invalidate(repository.id)
      Toast({
        type: 'error',
        title: 'Error!',
        message: error?.message || 'Something went wrong',
        duration: 5000
      })
    }
  })
  const handleLikeUpdate = () => {
    if (likedStatus) {
      unliked(repository.id)
    } else {
      liked(repository.id)
    }
    setLikedStatus(prev => !prev)
  }

  // const onVisibilityTabChange = value => {
  //   setVisibility(value)
  // }
  return (
    <div className='flex gap-4 pb-2'>
      <div
        className={cn(
          'flex flex-[3] gap-8',
          'rounded-3xl border bg-background p-8',
          // 'shadow-[0_3px_10px_rgb(0,0,0,0.2)]',
          'shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'
          // isEditMode && 'border-primary'
        )}
      >
        {/* <div className='flex items-center overflow-hidden rounded-2xl'>
          {true ? (
            <img
              src={
                'https://tiptap.dev/docs/_next/static/media/content-templates.bf560925.png'
              }
              alt={repository.title}
              className='h-60 w-80 object-cover object-center'
              width={'384px'}
              height={'384px'}
            />
          ) : (
            <div className='h-30 flex w-40 items-center justify-end'>
              <Illustration1 />
            </div>
          )}
        </div> */}
        <div className='flex-1'>
          <div className='flex justify-end px-8'>
            {!isEditMode ? (
              // <Button
              //   variant={'outline'}
              //   className='flex items-center gap-2 rounded-full border'
              //   onClick={() => setIsEditMode(true)}
              // >
              //   Edit
              //   <Bolt className='size-5' />
              // </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  {/* <div className=''> */}
                  <EllipsisVerticalIcon
                    onClick={() => {}}
                    className={cn('size-6 text-muted-foreground')}
                  />
                  {/* </div> */}
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='w-56'>
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => setIsEditMode(true)}>
                      <span>Edit</span>
                      <Bolt className='size-5' />
                      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuItem>
                    {/* <User className='mr-2 h-4 w-4' /> */}
                    <ClipboardDocumentIcon className='mr-2 size-6' />
                    <span>Add to ProblemSet</span>
                    {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
                  </DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <UserPlus className='mr-2 h-4 w-4' />
                      <span>Invite users</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem>
                          <Mail className='mr-2 h-4 w-4' />
                          <span>Email</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageSquare className='mr-2 h-4 w-4' />
                          <span>Message</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <PlusCircle className='mr-2 h-4 w-4' />
                          <span>More...</span>
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant={'outline'}
                className='flex items-center gap-2 rounded-full border'
                onClick={handleSave}
              >
                Save
              </Button>
            )}
          </div>
          <div className='mb-2 flex items-center gap-2'>
            {isEditMode ? (
              <Select value={repository.type}>
                <SelectTrigger className='h-6 w-[140px] border-foreground bg-transparent text-xs font-semibold'>
                  <SelectValue placeholder='Repo Type' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {/* <SelectLabel>Repo Type</SelectLabel> */}
                    <SelectItem value='PROBLEM_SET'>PROBLEM SET</SelectItem>
                    <SelectItem value='COLLECTION'>COLLECTION</SelectItem>
                    <SelectItem value='ROADMAP'>ROADMAP</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            ) : (
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Badge
                    className='cursor-default rounded-md border-foreground'
                    variant='outline'
                  >
                    {repository.type}
                  </Badge>
                </HoverCardTrigger>
                <HoverCardContent
                  align={'start'}
                  className='mt-4 w-80 bg-background'
                >
                  <div className='grid gap-4'>
                    <div className='space-y-2'>
                      <h4 className='font-medium leading-none'>Problem Set</h4>
                      <p className='text-sm text-muted-foreground'>
                        Problem Set allows you to start a session and keep track
                        of your progress.
                      </p>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            )}

            {/* {isOwner && <EditCollectionButton />} */}
          </div>
          {isEditMode ? (
            <Input
              className='mb-4 scroll-m-20 rounded-none border-2 border-transparent bg-transparent py-8 text-4xl font-extrabold tracking-tight focus-visible:border-b-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 lg:text-5xl'
              defaultValue={
                repository.title
                // 'test it yell'
              }
              placeholder='Title cannot be empty'
            ></Input>
          ) : (
            <h1
              className={cn(
                'mb-4 scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl'
              )}
            >
              {repository.title}
            </h1>
          )}
          {/* {isEditMode ? (
            <div className='mb-4 max-w-prose'>
              <Textarea
                placeholder='Description'
                className='min-h-40 border-2 border-foreground bg-transparent bg-opacity-50 leading-7 [&:not(:first-child)]:mt-6'
                value={
                  // collection.description
                  'Ullamco incididunt irure sunt labore tempor adipisicing id consectetur ex. Quis ad esse ex nisi. Adipisicing esse ad mollit voluptate qui consectetur in incididunt dolore ad deserunt laborum dolor eiusmod.'
                }
              />
            </div>
          ) : (
            <div className='mb-4 max-w-prose'>
              <p className='leading-7 [&:not(:first-child)]:mt-6'>
                {repository.description}
                Ullamco incididunt irure sunt labore tempor adipisicing id
                consectetur ex. Quis ad esse ex nisi. Adipisicing esse ad mollit
                voluptate qui consectetur in incididunt dolore ad deserunt
                laborum dolor eiusmod. Read more...
              </p>
            </div>
          )} */}

          {!isEditMode && (
            // <HoverCard>
            //   <HoverCardTrigger asChild>
            //     <Button variant='link' className='pl-0 text-muted-foreground'>
            //       @{repository.creatorName}
            //     </Button>
            //   </HoverCardTrigger>
            //   <HoverCardContent align={'start'} className='w-80'>
            //     <div className='flex justify-between space-x-4'>
            //       <Avatar>
            //         <AvatarImage src='https://github.com/vercel.png' />
            //         <AvatarFallback>VC</AvatarFallback>
            //       </Avatar>
            //       <div className='space-y-1'>
            //         <h4 className='text-sm font-semibold'>
            //           @{repository.creatorName}
            //         </h4>
            //         <p className='text-sm'>The dude who owns @devroad.</p>
            //         <div className='flex items-center pt-2'>
            //           <CalendarDaysIcon className='mr-2 h-4 w-4 opacity-70' />
            //           <span className='text-xs text-muted-foreground'>
            //             Joined December 2021
            //           </span>
            //         </div>
            //       </div>
            //     </div>
            //   </HoverCardContent>
            // </HoverCard>
            <p
              // href={repository.creatorWebsiteLink ?? '#'}
              // target='_blank'
              // rel='noopener noreferrer'
              // variant='link'
              className='pl-0 font-semibold text-muted-foreground'
            >
              @{repository.creatorName}
            </p>
          )}
        </div>
      </div>
      <div
        className={cn(
          'flex flex-[1] flex-col justify-center rounded-3xl border bg-background p-8',
          'shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'
        )}
      >
        {/* <div className="border-t border-t-border my-2"></div> */}
        {/* <div className={cn('', )}>Privacy:</div> */}
        <div className='flex items-center justify-center'>
          <Tabs
            className='w-full'
            value={visibility}
            onValueChange={value => {
              setVisibility(value as 'PRIVATE' | 'SHARED' | 'DISCOVERABLE')
              updateVisibility({
                id: repository.id,
                value: value as 'PRIVATE' | 'SHARED' | 'DISCOVERABLE'
              })
            }}
          >
            <TabsList className='w-full rounded-full'>
              <TabsTrigger
                value='PRIVATE'
                className={cn('w-full rounded-full')}
              >
                Private
              </TabsTrigger>
              <TabsTrigger value='SHARED' className={cn('w-full rounded-full')}>
                Shared
              </TabsTrigger>
              <TabsTrigger
                disabled={true}
                value='DISCOVERABLE'
                className={cn('w-full rounded-full')}
              >
                Discoverable
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        {/* <Separator orientation='horizontal' /> */}

        <div className='my-4 flex h-16 justify-around gap-3'>
          <div className='flex w-14 flex-col items-center justify-center gap-2 text-muted-foreground'>
            <ClipboardDocumentListIcon className='size-5' />
            <p className='text-xs'>
              <span className='font-semibold'>
                {countValues?.repositoryItemCount}
              </span>{' '}
              items
            </p>
            {/* <p className="text-[10px]">items</p> */}
          </div>
          {/* <Separator orientation='vertical' /> */}

          <div className='flex w-14 flex-col items-center justify-center gap-2 text-muted-foreground'>
            <FolderIcon className='size-5' />
            <p className='text-xs'>
              <span className='font-semibold'>
                {countValues?.repositorySectionCount}
              </span>{' '}
              sections
            </p>
            {/* <p className="text-[10px]">items</p> */}
          </div>
          {/* <Separator orientation='vertical' /> */}

          {repository.verifiedStatus === 'VERIFIED' && (
            <div className='flex w-14 flex-col items-center justify-center gap-2 text-muted-foreground'>
              <CheckBadgeIcon className='size-5' />
              <p className='text-xs'>
                <span className='font-semibold'>Verified</span>
              </p>
            </div>
          )}
        </div>
        <div className='flex w-full justify-around gap-3 text-muted-foreground'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleLikeUpdate}
                  variant='ghost'
                  size='sm'
                  className='group'
                >
                  {likedStatus && (
                    <HeartIconSolid className='mr-1 size-6 group-hover:text-pink-500' />
                  )}
                  {!likedStatus && (
                    <HeartIcon className='mr-1 size-6 group-hover:text-pink-500' />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Like</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button variant='ghost' size='sm' disabled={true}>
            <ChatBubbleBottomCenterTextIcon className='mr-1 size-6' />
          </Button>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant='ghost' size='sm' className='group'>
                  <BookmarkIcon className='size-6 group-hover:text-foreground' />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Save</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        {/* <Separator orientation='horizontal' /> */}

        {/* <div className="border-t border-t-border my-2"></div> */}
        {/* <div className="mb-4"></div> */}
        {/* <div
          className={cn(
            "pt-4 px-4 text-muted-foreground flex gap-2",
            font.className
          )}
        >
          <Badge className="text-xs bg-muted-foreground cursor-pointer">
            Faang
          </Badge>
          <Badge className="text-xs bg-muted-foreground cursor-default">
            Graphs
          </Badge>
          <Badge className="text-xs bg-muted-foreground">Trees</Badge>
        </div> */}
        {/* <div className="p-4 text-xs text-muted-foreground line-clamp-3">
          Love Babbar is a youtuber known for his expertise in Data Structures
          and Algorithms (DSA). He has created a comprehensive love babbar dsa
          sheet that is widely used by students to prepare for coding
          interviews. The love Babbar dsa sheet contains a curated list of
          important DSA topics. Practice love babbar dsa sheet here to enhance
          your dsa knowledge.
        </div> */}
        {/* <div className="border-t border-t-border my-2"></div> */}
        {/* <div className='my-4'></div> */}
        {/* <div className='flex cursor-pointer justify-around py-1 text-muted-foreground'>
          <div className='flex items-center gap-1 text-pink-500'>
            <HeartIcon className='size-5' />
            <span className={cn('text-xs font-semibold', )}>
              210
            </span>
          </div>
          <div className='flex cursor-pointer items-center gap-1 text-primary'>
            <ChatBubbleBottomCenterTextIcon className='size-5' />
            <span className={cn('text-xs font-semibold', )}>
              21
            </span>
          </div>
          <div className='flex cursor-pointer items-center gap-1 text-foreground'>
            <BookmarkIcon className='size-5' />
            <span className={cn('text-xs font-semibold', )}>
              130
            </span>
          </div>
        </div> */}
        <div className='mt-4 w-full'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={'bg'}
                  className='group flex w-full gap-2 rounded-full'
                  onClick={handleStartSession}
                  disabled={true}
                >
                  <PlayIcon className='size-5 group-hover:hidden' />
                  <PlayIconSolid className='hidden size-5 group-hover:inline-block' />
                  <span className={cn()}>Start Solving</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Start a new session on this problem set</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  )
}

export default EditRepositoryHeader
