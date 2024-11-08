'use client'
import { cn, ItemNodeType } from '@/lib/utils'
import {
  useEditRepository,
  useFilterTags,
  useLoginModalState,
  useNotes,
  useRepository
} from '@/store'
import { api } from '@/trpc/react'
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
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface ItemNodeProps {
  itemData: ItemNodeType
  // path: { id: string; title: string }[]
  children: React.ReactNode
}
export const ItemNode = ({ itemData, children }: ItemNodeProps) => {
  const { data: session } = useSession()

  const [queryUserData, setQueryUserData] = useState(false)
  // const [fetchUserDataFlag, setFetchUserDataFlag] = useState(
  //   !!session && queryUserData
  // )
  // useEffect(() => {
  //   setFetchUserDataFlag(!!session && queryUserData)
  // }, [session, queryUserData])
  const { data: userData, isLoading } =
    api.repositoryItem.getOrCreateUserData.useQuery(
      {
        referenceId: itemData.referenceId as string,
        referenceType: itemData.referenceType as 'PROBLEM' | 'CUSTOM_PROBLEM'
      },
      {
        enabled: !!session && queryUserData
      }
    )
  const [tags, setTags] = useState(itemData?.tags ?? [])
  const [status, setStatus] = useState(itemData?.lastStatus ?? 0)
  const { doneItems, setDoneItems, revisitItems, setRevisitItems } =
    useRepository()
  useEffect(() => {
    if (itemData) {
      if (status !== itemData.lastStatus) setStatus(itemData.lastStatus ?? 0)

      if (itemData.lastStatus === 1) {
        setDoneItems(prev => {
          if (!prev.includes(itemData.referenceId as string)) {
            return [...prev, itemData.referenceId as string]
          }
          return prev
        })
        setRevisitItems(prev => {
          return prev.filter(item => item !== itemData.referenceId)
        })
      } else if (itemData.lastStatus === 2) {
        setRevisitItems(prev => {
          if (!prev.includes(itemData.referenceId as string)) {
            return [...prev, itemData.referenceId as string]
          }
          return prev
        })
        setDoneItems(prev => {
          return prev.filter(item => item !== itemData.referenceId)
        })
      } else if (itemData.lastStatus === 0) {
        setRevisitItems(prev => {
          return prev.filter(item => item !== itemData.referenceId)
        })
        setDoneItems(prev => {
          return prev.filter(item => item !== itemData.referenceId)
        })
      }
    }
  }, [itemData])
  useEffect(() => {
    if (userData) {
      if (status !== userData.lastStatus) setStatus(userData.lastStatus ?? 0)

      if (userData.lastStatus === 1) {
        setDoneItems(prev => {
          if (!prev.includes(itemData.referenceId as string)) {
            return [...prev, itemData.referenceId as string]
          }
          return prev
        })
        setRevisitItems(prev => {
          return prev.filter(item => item !== itemData.referenceId)
        })
      } else if (userData.lastStatus === 2) {
        setRevisitItems(prev => {
          if (!prev.includes(itemData.referenceId as string)) {
            return [...prev, itemData.referenceId as string]
          }
          return prev
        })
        setDoneItems(prev => {
          return prev.filter(item => item !== itemData.referenceId)
        })
      } else if (userData.lastStatus === 0) {
        setRevisitItems(prev => {
          return prev.filter(item => item !== itemData.referenceId)
        })
        setDoneItems(prev => {
          return prev.filter(item => item !== itemData.referenceId)
        })
      }
      // updating tags back in the node data, kinda hacky
      itemData.tags = userData.tags
      setTags(userData.tags)
    }
  }, [userData])

  const { filterTags, difficultyTag } = useFilterTags()
  if (itemData.type === 'ITEM') {
    if (
      itemData.referenceType === 'PROBLEM' &&
      difficultyTag &&
      difficultyTag !== itemData.problem?.difficulty
    )
      return
    if (
      itemData.referenceType === 'CUSTOM_PROBLEM' &&
      difficultyTag &&
      difficultyTag !== itemData.customProblem?.difficulty
    )
      return

    if (
      filterTags.length &&
      !itemData.tags?.some(itemTag => filterTags.includes(itemTag))
    )
      return
  }

  const getPlatformIcon = (platform: string | null) => {
    if (platform === 'LC')
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

  const { isLoginModalOpen, setIsLoginModalOpen } = useLoginModalState()

  const { setOpenItem, openItem } = useRepository()
  // const { setOpenReferences, openReferences } = useNotes()
  const utils = api.useUtils()
  // TODO: calling it update status since that is the only thing in userData for now. Change this to updateUserItemData or something
  const {
    mutateAsync: updateLastStatus,
    isPending,
    reset: resetStatusUpdate
  } = api.repositoryItem.updateLastStatus.useMutation({
    onSuccess() {
      console.log('haha', itemData.referenceId)
      setQueryUserData(true)
      utils.repositoryItem.getOrCreateUserData.invalidate({
        referenceId: itemData.referenceId ?? undefined
      })
    },
    onError(error: { message: any }) {
      // TODO: revert setMode state
    }
  })

  const { setOpenReferences, openReferences } = useNotes()

  return (
    <div
      className={cn(
        'flex w-full cursor-pointer justify-between bg-background p-1 text-sm text-foreground transition-colors duration-200 hover:bg-muted',
        // mode === 0 && 'odd:bg-background even:bg-backgroundalt',
        status === 1 &&
          'bg-green-50 hover:bg-green-50 dark:bg-teal-950 dark:hover:bg-teal-950',
        status === 2 &&
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
        setOpenItem(undefined)
        setTimeout(() => {
          setOpenItem(itemData)
        }, 0)
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
                      if (!session) {
                        setIsLoginModalOpen(true)
                        return
                      }
                      const newStatus = (status + 1) % 3
                      setStatus(newStatus)
                      // setStatus(prev => (prev + 1) % 3)
                      // to prevent ui changes on previous status updates in case of fast updates by user
                      resetStatusUpdate()
                      updateLastStatus({
                        referenceId: itemData.referenceId as string,
                        referenceType: itemData.referenceType as
                          | 'PROBLEM'
                          | 'CUSTOM_PROBLEM',
                        status: newStatus
                      })
                    }}
                    className={cn(
                      'size-8 text-muted-foreground',
                      status === 0 && '',
                      status === 1 && 'text-green-400',
                      status === 2 && 'text-yellow-400'
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
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <EllipsisVerticalIcon
              onClick={() => {}}
              className={cn('size-6 text-muted-foreground')}
            />
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
              <User className='mr-2 h-4 w-4' />
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
        </DropdownMenu> */}
      </div>
    </div>
  )
}
