'use client'
import { useEditRepository } from '@/store'
import {
  ArrowRightIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  ClipboardDocumentIcon,
  DocumentIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline'
import { $Enums, Repository } from '@prisma/client'

import { PlusCircleIcon } from '@heroicons/react/24/outline'

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
  DropdownMenuTrigger
} from '@repo/ui'
import React, { useState } from 'react'
import { api } from '@/trpc/react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Mail, MessageSquare, PlusCircle, User, UserPlus } from 'lucide-react'

interface EditableNodeProps {
  sectionData: any
}
const SectionNode = ({ sectionData }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className={cn('overflow-hidden border bg-background hover:bg-muted')}>
      <div className={cn('flex flex-col gap-2 p-4')}>
        <div className='flex items-center justify-between gap-2'>
          <h2 className='scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0'>
            Consectetur fugiat do duis ut.
          </h2>
          <span>
            <ArrowRightIcon className='size-6' onClick={() => setOpen(!open)} />
          </span>
        </div>

        <div>
          Nisi sint cupidatat excepteur tempor est consectetur cillum. Dolor
          proident ullamco adipisicing ipsum eu anim ut. Esse labore qui
          occaecat amet sint eiusmod voluptate. Fugiat est excepteur irure anim
          sint sunt. Esse consequat consequat ad non nisi excepteur sint. Culpa
          ut laboris exercitation eu dolore aliquip ex. Quis deserunt cillum
          irure enim pariatur ipsum aute.
        </div>
      </div>

      {open && (
        <div className='flex flex-col p-8'>
          <div className=''>
            {sectionData.children.map(child => (
              <Node nodeData={child} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
const ItemNode = ({ itemData }) => {
  const getPlatformIcon = (platform: $Enums.Platform) => {
    if (platform === $Enums.Platform.LC)
      return (
        <Image
          className='drop-shadow-2xl'
          src={'/lc.png'}
          width={20}
          height={20}
          alt='lc'
        ></Image>
      )
  }
  const [mode, setMode] = useState(0)
  return (
    <div
      className={cn(
        'flex cursor-pointer justify-between border bg-background p-2 text-sm text-foreground transition-colors duration-200 hover:bg-muted',
        // mode === 0 && 'odd:bg-background even:bg-backgroundalt',
        mode === 1 &&
          'bg-green-50 hover:bg-green-50 dark:bg-teal-950 dark:hover:bg-teal-950',
        mode === 2 &&
          'bg-yellow-50 hover:bg-yellow-50 dark:bg-amber-950 dark:hover:bg-amber-950'
      )}
      // key={problem.id}
    >
      <div className='flex items-center justify-start'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className='p-2 px-4'>
                <p className=''>
                  <CheckCircleIcon
                    onClick={() => {
                      setMode(prev => (prev + 1) % 3)
                    }}
                    className={cn(
                      'size-8 text-muted-foreground',
                      mode === 0 && '',
                      mode === 1 && 'text-green-400',
                      mode === 2 && 'text-yellow-400'
                    )}
                  />
                </p>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Status</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div>
          <div className='flex'>
            <div className='border-0 p-1 px-2'>
              <p className=''>
                {
                  itemData.id
                  // problem?.title
                }
              </p>
            </div>
            <div className='p-auto flex min-h-full items-center justify-start border-0 px-2'>
              <a
                target='_blank'
                rel='noopener noreferrer'
                // href={problem.url ?? '#'}
                className=''
              >
                {getPlatformIcon('LC')}
              </a>
              {/* {problem.url ?? '-'} */}
            </div>

            {/* <div className='border-0 p-2'>
            <p className='flex justify-start'>
              <EllipsisVerticalIcon />
            </p>
          </div> */}
          </div>
          <div className='flex items-center'>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className='border-0 px-2'>
                    <p className='flex justify-start'>
                      <span className='px-1 text-[10px] font-semibold text-background text-green-600 dark:text-green-400'>
                        {/* {problem.difficulty ?? '-'} */}EASY
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
                  <div className='border-0 px-2'>
                    <p className='flex justify-start text-xs font-semibold text-muted-foreground'>
                      {/* {problem.category ?? '-'} */}
                      DSA
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
      <div className='flex items-center gap-4 p-2 px-4'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className=''>
                <DocumentIcon
                  onClick={() => {}}
                  className={cn(
                    'size-6 text-muted-foreground text-primary'
                    // mode === 0 && '',
                    // mode === 1 && 'text-green-400',
                    // mode === 2 && 'text-yellow-400'
                  )}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Notes & Resources</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {/* <div className=''> */}
            <EllipsisVerticalIcon
              onClick={() => {}}
              className={cn('size-6 text-muted-foreground')}
            />
            {/* </div> */}
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className='mr-2 h-4 w-4' />
                <span>Profile</span>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuItem>
              {/* <User className='mr-2 h-4 w-4' /> */}
              <ClipboardDocumentIcon className='mr-2 size-6' />
              <span>Add to ProblemSet</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
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
      </div>
    </div>
    // return (
    //   <div className='flex h-20 justify-around border p-2'>
    //     <div className=''>{itemData.details.id}</div>
    //     <div className=''>{itemData.details.parentType}</div>
    //   </div>
    // )
  )
}
const Node = ({ nodeData }) => {
  return (
    <div className=''>
      {nodeData.type === 'SECTION' ? (
        <SectionNode sectionData={nodeData} />
      ) : (
        <ItemNode itemData={nodeData} />
      )}
    </div>
  )
}
interface RepositoryItemsProps {
  repository: Repository
}

const RepositoryItems = ({ repository }: RepositoryItemsProps) => {
  const { data: repoItems, isLoading } = api.repository.get.useQuery(
    repository.id
  )
  if (!repoItems) {
    return
  }
  console.log('repoItems', repoItems)
  const repoKids = repoItems?.children
  return (
    <div className='max-w-screen-md'>
      <div className='my-8 flex flex-col'>
        {repoKids &&
          repoKids.map(repoKid => {
            return <Node nodeData={repoKid} />
          })}
      </div>
    </div>
  )
}

export default RepositoryItems
