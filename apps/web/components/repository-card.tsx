'use client'
import { cn } from '@/lib/utils'
import {
  ArrowUpRightIcon,
  BookmarkIcon,
  BookOpenIcon,
  ChatBubbleBottomCenterIcon,
  ChatBubbleBottomCenterTextIcon,
  CheckBadgeIcon,
  ClipboardDocumentIcon,
  ClipboardDocumentListIcon,
  FolderArrowDownIcon,
  FolderIcon,
  HeartIcon
} from '@heroicons/react/24/outline'
import { Badge, Button, Separator } from '@repo/ui'
import { Jost, Poppins } from 'next/font/google'
import React from 'react'
import Illustration1 from './svgs/illustration1'
import { useRouter } from 'next/navigation'

const font = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin']
})
const font2 = Jost({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin']
})

const RepositoryCard = ({
  title,
  creatorName,
  id
}: {
  title?: string | undefined
  creatorName?: string | undefined
  id?: string | undefined
}) => {
  const router = useRouter()
  return (
    <div
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
        {/* <div className='absolute left-1/2 -z-10 overflow-hidden opacity-20'>
          <Illustration1 />
        </div> */}
        <div className={cn('absolute p-6', font.className)}>
          <a className=''>
            {/* <p
              className={cn(
                'font-semibold text-background [text-shadow:_1px_1px_0_rgba(0,0,0,0.35),1px_1px_5px_rgba(0,0,0,0.5)] dark:text-foreground',
                
              )}
            >
              {creatorName ? creatorName + "'s" : "Love Babbar's"}
            </p> */}
            <p
              className={cn(
                'text-2xl font-semibold text-background [text-shadow:_1px_1px_0_rgba(0,0,0,0.35),1px_1px_5px_rgba(0,0,0,0.5)] dark:text-foreground'
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
        {/* <div className="border-t border-t-border my-2"></div> */}
        <div className='flex h-16 justify-center gap-3 border-y border-y-border px-5 py-2'>
          <div className='flex w-14 flex-col items-center justify-center gap-2 text-muted-foreground'>
            <ClipboardDocumentListIcon className='size-4' />
            <p className='text-xs'>
              <span className='font-semibold'>120</span> items
            </p>
            {/* <p className="text-[10px]">items</p> */}
          </div>
          <Separator orientation='vertical' />

          <div className='flex w-14 flex-col items-center justify-center gap-2 text-muted-foreground'>
            <FolderIcon className='size-4' />
            <p className='text-xs'>
              <span className='font-semibold'>7</span> sections
            </p>
            {/* <p className="text-[10px]">items</p> */}
          </div>
          <Separator orientation='vertical' />

          <div className='flex w-14 flex-col items-center justify-center gap-2 text-muted-foreground'>
            <CheckBadgeIcon className='size-4' />
            <p className='text-xs'>
              <span className='font-semibold'>Verified</span>
            </p>
            {/* <p className="text-[10px]">items</p> */}
          </div>
        </div>
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
    </div>
  )
}

export default RepositoryCard
