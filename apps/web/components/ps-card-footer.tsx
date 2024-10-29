'use client '
import {
  BookmarkIcon,
  ChatBubbleBottomCenterTextIcon,
  HeartIcon
} from '@heroicons/react/24/outline'
import { Button, CardFooter } from '@repo/ui'
import { useSession } from 'next-auth/react'
import React from 'react'

const PSCardFooter = ({ repo }: { repo: any }) => {
  const { data: session, status, update } = useSession()

  return (
    <>
      {session && (
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
      )}
    </>
  )
}

export default PSCardFooter
