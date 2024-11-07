import Image from 'next/image'
// import type { VisitorCompanyData } from '~/typing/company'
import {
  Link2,
  ExternalLink,
  ArrowUpRight,
  ArrowDownRight,
  User,
  UserPlus,
  Mail,
  MessageSquare,
  PlusCircle
} from 'lucide-react'
import Link from 'next/link'
// import { format as formatDate } from 'date-fns'
// import CompanyIcon from '~/assets/svg/CompanyIcon'
import React, { useState } from 'react'
// import { useRouter } from 'next/router'
import { cn } from '@/lib/utils'
import {
  ArchiveBoxArrowDownIcon,
  BuildingOffice2Icon,
  CheckCircleIcon,
  ClipboardDocumentIcon,
  DocumentIcon,
  DocumentPlusIcon,
  EllipsisHorizontalCircleIcon,
  EllipsisHorizontalIcon,
  EllipsisVerticalIcon,
  TicketIcon
} from '@heroicons/react/24/outline'
import {
  Button,
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
  Input,
  Label,
  TableCell,
  TableRow,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@repo/ui'
import { ProblemData } from '@/typing'
import { useRouter } from 'next/navigation'
import { $Enums } from '@repo/database'
// import { useFeatureFlagEnabled } from 'posthog-js/react'
// import { cn } from '~/lib/utils'

type Props = {
  problem: ProblemData
  // activeTab: string
}

function ProblemRow2({ problem }: Props) {
  // local state
  const [imageError, setImageError] = useState(false)
  // check for the truthy value of the domain null | undefined | empty string
  // const companyUrl = !!problem.domain ? `https://${problem.domain}/` : null

  // check if the feature flag for the company detail enabled
  // const isCompanyDetailPageEnabled = useFeatureFlagEnabled(
  //   'company-detail-page'
  // )

  // hooks
  const router = useRouter()

  // const handleCompanyDetailPageTransition = () => {
  //   if (!isCompanyDetailPageEnabled) return
  //   router.push(`/companies/${problem.companyId}`)
  // }

  const getPlatformIcon = (platform: string | null) => {
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
        'flex cursor-pointer justify-between border-b p-2 text-sm text-foreground transition-colors duration-200 hover:bg-muted',
        // mode === 0 && 'odd:bg-background even:bg-backgroundalt',
        mode === 1 &&
          'bg-green-50 hover:bg-green-50 dark:bg-teal-950 dark:hover:bg-teal-950',
        mode === 2 &&
          'bg-yellow-50 hover:bg-yellow-50 dark:bg-amber-950 dark:hover:bg-amber-950'
      )}
      key={problem.id}
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
          <div
            className='flex'
            // className={cn(
            //   'flex cursor-pointer text-sm text-foreground transition-colors duration-200',
            //   mode === 0 && 'odd:bg-background even:bg-backgroundalt',
            //   mode === 1 &&
            //     'bg-green-50 hover:bg-green-50 dark:bg-teal-950 dark:hover:bg-green-950',
            //   mode === 2 &&
            //     'bg-yellow-50 hover:bg-yellow-50 dark:bg-amber-950 dark:hover:bg-amber-950'
            // )}
            // key={problem.id}
            // onClick={handleCompanyDetailPageTransition}
          >
            <div className='border-0 p-2'>
              <p className=''>
                {
                  problem?.title
                  // ? formatDate(new Date(problem.lastVisited), 'do MMM yyyy')
                  // : '-'
                }
              </p>
            </div>
            <div className='p-auto flex min-h-full items-center justify-start border-0 px-2'>
              <a
                target='_blank'
                rel='noopener noreferrer'
                href={problem.url ?? '#'}
                className=''
              >
                {getPlatformIcon(problem.platform)}
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
                  <div className='border-0 p-2'>
                    <p className='flex justify-start'>
                      <span className='rounded-md bg-green-500 p-[2px] px-1 text-[10px] font-semibold text-background'>
                        {problem.difficulty ?? '-'}
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
                  <div className='border-0 p-2'>
                    <p className='flex justify-start text-xs font-semibold text-muted-foreground'>
                      {problem.category ?? '-'}
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
        {/* <Dialog>
          <DialogTrigger asChild></DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='name' className='text-right'>
                  Name
                </Label>
                <Input
                  id='name'
                  defaultValue='Pedro Duarte'
                  className='col-span-3'
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='username' className='text-right'>
                  Username
                </Label>
                <Input
                  id='username'
                  defaultValue='@peduarte'
                  className='col-span-3'
                />
              </div>
            </div>
            <DialogFooter>
              <Button type='submit'>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog> */}

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
  )
}

export default ProblemRow2
