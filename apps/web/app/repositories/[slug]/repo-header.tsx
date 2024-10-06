import { cn } from '@/lib/utils'
import { useEditRepository } from '@/store'
import {
  CalendarDaysIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline'
import { $Enums, Repository } from '@prisma/client'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
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
  Textarea
} from '@repo/ui'
import React from 'react'

interface RepositoryHeaderProps {
  repository: Repository
}
const RepositoryHeader = ({ repository }: RepositoryHeaderProps) => {
  return (
    <div className={cn('relative p-8 pb-16')}>
      <div className='mb-2 flex items-center gap-2'>
        <Badge className='rounded-md border-foreground' variant='outline'>
          {repository.type}
        </Badge>
        <Popover>
          <PopoverTrigger asChild>
            <QuestionMarkCircleIcon className='size-4' />
          </PopoverTrigger>
          <PopoverContent className='mt-4 w-80 bg-backgroundalt'>
            <div className='grid gap-4'>
              <div className='space-y-2'>
                <h4 className='font-medium leading-none'>Problem Set</h4>
                <p className='text-sm text-muted-foreground'>
                  ProblemSet Collection allows you to start a session and keep
                  track of your progress.
                </p>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        {/* {isOwner && <EditCollectionButton />} */}
      </div>

      <h1 className='mb-4 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
        {repository.title}
      </h1>

      <div className='mb-4 max-w-prose'>
        <p className='leading-7 [&:not(:first-child)]:mt-6'>
          {repository.description}
          Ullamco incididunt irure sunt labore tempor adipisicing id consectetur
          ex. Quis ad esse ex nisi. Adipisicing esse ad mollit voluptate qui
          consectetur in incididunt dolore ad deserunt laborum dolor eiusmod.
          Read more...
        </p>
      </div>

      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant='link' className='pl-0 text-muted-foreground'>
            @{repository.creatorName}
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className='w-80'>
          <div className='flex justify-between space-x-4'>
            <Avatar>
              <AvatarImage src='https://github.com/vercel.png' />
              <AvatarFallback>VC</AvatarFallback>
            </Avatar>
            <div className='space-y-1'>
              <h4 className='text-sm font-semibold'>
                @{repository.creatorName}
              </h4>
              <p className='text-sm'>The dude who owns @devroad.</p>
              <div className='flex items-center pt-2'>
                <CalendarDaysIcon className='mr-2 h-4 w-4 opacity-70' />
                <span className='text-xs text-muted-foreground'>
                  Joined December 2021
                </span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}

export default RepositoryHeader
