'use client'
import { cn, ItemNodeType } from '@/lib/utils'
import { useNotes, useRepository } from '@/store'
import {
  CheckCircleIcon,
  ClipboardDocumentIcon,
  EllipsisVerticalIcon,
  PlusCircleIcon
} from '@heroicons/react/24/outline'
import { $Enums, RepositoryItem } from '@repo/database'
import {
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
import { Mail, MessageSquare, User, UserPlus } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface ItemNodeProps {
  itemData: ItemNodeType
  // path: { id: string; title: string }[]
  children: React.ReactNode
}
export const ItemNode = ({ itemData, children }: ItemNodeProps) => {
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
  const { setOpenItem, openItem } = useRepository()
  const { setOpenReferences, openReferences } = useNotes()
  return (
    <div
      className={cn(
        'flex w-full cursor-pointer justify-between bg-background p-1 text-sm text-foreground transition-colors duration-200 hover:bg-muted',
        // mode === 0 && 'odd:bg-background even:bg-backgroundalt',
        mode === 1 &&
          'bg-green-50 hover:bg-green-50 dark:bg-teal-950 dark:hover:bg-teal-950',
        mode === 2 &&
          'bg-yellow-50 hover:bg-yellow-50 dark:bg-amber-950 dark:hover:bg-amber-950'
      )}
      onClick={e => {
        e.stopPropagation()
        // if (e.target !== e.currentTarget) return

        // console.log('hey', itemData.id)
        // setOpenNotes(true)

        // if (e.detail === 2) setOpenItem(itemData)

        // below line is to reset the references while going to another item
        setOpenReferences(openReferences => {
          return []
        })
        setOpenItem(itemData)
      }}
      // key={problem.id}
    >
      <div className='flex items-center justify-start'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className='p-2 px-4'>
                <p className=''>
                  <CheckCircleIcon
                    // TODO: fix this , do whatever to update user mode
                    onClick={e => {
                      e.stopPropagation()
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

        {children}
      </div>
      <div className='flex items-center gap-4 p-2 px-4'>
        {/* <TooltipProvider>
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
        </TooltipProvider> */}

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
                    <PlusCircleIcon className='mr-2 h-4 w-4' />
                    <span>More...</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
