'use client'
import { cn } from '@/lib/utils'
import {
  ArrowUpRightIcon,
  BookmarkIcon,
  BookOpenIcon,
  ChatBubbleBottomCenterIcon,
  ChatBubbleBottomCenterTextIcon,
  CheckCircleIcon,
  ClipboardDocumentIcon,
  ClipboardDocumentListIcon,
  FolderArrowDownIcon,
  FolderIcon,
  HeartIcon,
  PlayIcon
} from '@heroicons/react/24/outline'

import { PlayIcon as PlayIconSolid } from '@heroicons/react/24/solid'
import {
  Badge,
  Button,
  Separator,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@repo/ui'
import {
  Heart,
  MessageSquare,
  Bookmark,
  FileText,
  Layers,
  CheckCircle
} from 'lucide-react'
import { Jost, Poppins } from 'next/font/google'
import React from 'react'
import Illustration1 from './svgs/illustration1'
import { useRouter } from 'next/navigation'
import { CheckBadgeIcon } from '@heroicons/react/24/solid'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import PSCardFooter from './ps-card-footer'

const font = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin']
})
const font2 = Jost({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin']
})
// const tags = ['architecture', 'scalability', 'faang', 'graph', 'trees']
// const tags = ['dsa']
const PSCard = ({
  repo,
  id
}: {
  // title?: string | undefined
  // creatorName?: string | undefined
  repo?: any
  id?: string | undefined
}) => {
  // const router = useRouter()
  // const { data: session, status, update } = useSession()

  return (
    <>
      <Card className='w-96 overflow-hidden rounded-3xl shadow-sm duration-200 hover:shadow-md'>
        <CardHeader className='relative h-36 space-y-0 overflow-hidden'>
          {false ? (
            <img
              src={
                'https://takeuforward.org/static/media/img.e05e06671578591d1613.jpg'
              }
              alt={repo?.title ?? 'Striver'}
              className='absolute inset-0 h-full w-full object-cover'
            />
          ) : (
            <div className='absolute left-[55%] overflow-hidden opacity-80'>
              <Illustration1 />
            </div>
          )}
          <div className='absolute inset-0 flex flex-col p-4 pt-12 dark:bg-black dark:bg-opacity-40'>
            {/* <div className='flex flex-wrap gap-2'>
              {tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant='secondary'
                  className='text-muted-foreground'
                >
                  {tag}
                </Badge>
              ))}
            </div> */}
            <h3
              // className='text-xl font-bold text-foreground'
              className='text-2xl font-semibold text-foreground [text-shadow:_1px_1px_0_rgba(0,0,0,0.35),1px_1px_5px_rgba(0,0,0,0.5)] dark:text-foreground'
            >
              {repo?.title ?? 'Dsa sheet'}
            </h3>
          </div>
          <div className='absolute inset-0 top-0 flex h-fit justify-between gap-4 p-4'>
            <div className='flex gap-2'>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge
                      variant='secondary'
                      className='text-muted-foreground'
                    >
                      <ClipboardDocumentListIcon className='mr-1 size-4' />
                      {repo?.itemCount ?? '80'}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{repo?.itemCount ?? '80'} items</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge
                      variant='secondary'
                      className='text-muted-foreground'
                    >
                      <FolderIcon className='mr-1 size-4' />
                      {repo?.sectionCount ?? '5'}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{repo?.sectionCount ?? '5'} sections</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div className='flex flex-wrap gap-2'>
                {/* TODO: repo?.topicTags */}
                {repo?.categories.map((tag, index) => (
                  <Badge
                    key={index}
                    variant='secondary'
                    className='text-muted-foreground'
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {repo?.verifiedStatus === 'VERIFIED' && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <CheckBadgeIcon className='size-6 text-primary' />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Verified</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </CardHeader>
        <CardContent className='relative p-4'>
          {/* <div className='mb-4 flex items-center gap-4'>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant='secondary'>
                    <FileText className='mr-1 h-4 w-4' />
                    80
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>80 items</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant='secondary'>
                    <Layers className='mr-1 h-4 w-4' />5
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>5 sections</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {true && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <CheckCircleIcon className='mr-1 h-6 w-6 text-primary' />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Verified</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div> */}
          <div className='absolute -top-8 right-4 z-10 flex items-center justify-between gap-2'>
            <Link
              className='group m-auto flex size-12 items-center justify-center rounded-full bg-primary'
              // onClick={() => {
              //   if (id) router.push(`/repositories/${id}`)
              // }}
              href={`/repositories/${repo?.id ?? '1'}`}
            >
              <PlayIconSolid className='ml-1 size-5 text-background' />
            </Link>
          </div>
          <div className='truncate text-sm text-muted-foreground'>
            {repo?.description ??
              'Comprehensive course covering essential DSA topics for FAANG interviews.'}
          </div>
        </CardContent>
        {/* <PSCardFooter repo={repo} /> */}
        {/* {session && (
          <CardFooter className='flex justify-between gap-4 border-t p-4 py-2 text-muted-foreground'>
            <div>
              <Button variant='ghost' size='sm'>
                <HeartIcon className='mr-1 size-6' />
                {repo?.likeCount}
              </Button>
              <Button variant='ghost' size='sm'>
                <ChatBubbleBottomCenterTextIcon className='size-6' />
              </Button>
            </div>
            <Button variant='ghost' size='sm'>
              <BookmarkIcon className='size-6' />
            </Button>
          </CardFooter>
        )} */}
      </Card>
      {/* <div
        // className='hover w-72 select-none overflow-hidden rounded-xl border bg-background shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] duration-200 hover:shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]'
        // className='hover w-72 select-none overflow-hidden rounded-xl bg-background shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] duration-200 hover:shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]'
        className='hover w-72 select-none overflow-hidden rounded-xl border bg-background shadow-sm duration-200 hover:shadow-md'
        onClick={() => {
          if (id) router.push(`/repositories/${id}`)
        }}
      >
        <div
          // className="relative h-40 bg-green-300 bg-[url('https://takeuforward.org/static/media/img.e05e06671578591d1613.jpg')] bg-center dark:bg-green-600"
          className='relative h-44 rounded-t-md bg-center'
          style={{
            backgroundImage: `url('https://takeuforward.org/static/media/img.e05e06671578591d1613.jpg')`
          }}
        >
          <div className='absolute left-1/2 -z-10 overflow-hidden opacity-20'>
          <Illustration1 />
        </div>
          <div className={cn('absolute p-6', font.className)}>
            <a className=''>
              <p
                className={cn(
                  'text-2xl font-semibold text-background [text-shadow:_1px_1px_0_rgba(0,0,0,0.35),1px_1px_5px_rgba(0,0,0,0.5)] dark:text-foreground',
                  
                )}
              >
                {title ?? 'Faang DSA sheet 169'}
              </p>
            </a>
          </div>
          <div
            className={cn(
              'absolute bottom-0 flex gap-2 px-4 pb-4',
              font.className
            )}
          >
            <Badge className='cursor-pointer rounded-md border-background bg-muted text-xs text-foreground'>
              Faang
            </Badge>
            <Badge className='cursor-pointer rounded-md border-background bg-muted text-xs text-foreground'>
              Graphs
            </Badge>
            <Badge className='cursor-pointer rounded-md border-background bg-muted text-xs text-foreground'>
              Trees
            </Badge>
          </div>
        </div>
        <div className='pb-5'>
          <div className='flex h-16 justify-center gap-3 border-y border-y-border px-5 py-2'>
            <div className='flex w-14 flex-col items-center justify-center gap-2 text-muted-foreground'>
              <ClipboardDocumentListIcon className='size-4' />
              <p className='text-xs'>
                <span className='font-semibold'>120</span> items
              </p>
            </div>
            <Separator orientation='vertical' />

            <div className='flex w-14 flex-col items-center justify-center gap-2 text-muted-foreground'>
              <FolderIcon className='size-4' />
              <p className='text-xs'>
                <span className='font-semibold'>7</span> sections
              </p>
            </div>
            <Separator orientation='vertical' />

            <div className='flex w-14 flex-col items-center justify-center gap-2 text-muted-foreground'>
              <CheckBadgeIcon className='size-4' />
              <p className='text-xs'>
                <span className='font-semibold'>Verified</span>
              </p>
            </div>
          </div>

          <div className='my-4'></div>
          <div className='flex justify-around text-muted-foreground'>
            <div>
              <HeartIcon className='size-5 hover:text-pink-500 hover:drop-shadow-[0_1px_5px_rgba(255,0,0,1)]' />
            </div>
            <div>
              <ChatBubbleBottomCenterTextIcon className='size-5 hover:text-primary hover:drop-shadow-[0_1px_5px_rgba(255,0,255,1)]' />
            </div>
            <div>
              <BookmarkIcon className='size-5 hover:text-foreground hover:drop-shadow-[0_1px_5px_hsl(var(--foreground))]' />
            </div>
          </div>
        </div>
      </div> */}
    </>
  )
}

export default PSCard