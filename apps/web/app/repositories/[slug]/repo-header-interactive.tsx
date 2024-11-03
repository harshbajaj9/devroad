'use client'
import React, { useEffect, useState } from 'react'
import {
  Button,
  Toast,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@repo/ui'
import {
  ChatBubbleBottomCenterTextIcon,
  HeartIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { api } from '@/trpc/react'
import { Repository } from '@repo/database'
import { useSession } from 'next-auth/react'
import { useLoginModalState } from '@/store'
const RepoHeaderInteractive = ({ repository }: { repository: Repository }) => {
  const { data: session } = useSession()
  const utils = api.useUtils()
  const { data: currentLikedStatus } = api.repository.getLikedStatus.useQuery(
    repository.id,
    { enabled: !!session }
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
  const { setIsLoginModalOpen } = useLoginModalState()

  const handleLikeUpdate = () => {
    if (!session) {
      setIsLoginModalOpen(true)
      return
    }
    if (likedStatus) {
      unliked(repository.id)
    } else {
      liked(repository.id)
    }
    setLikedStatus(prev => !prev)
  }
  return (
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
              {session && likedStatus && (
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
    </div>
  )
}

export default RepoHeaderInteractive
