'use client'
import { cn } from '@/lib/utils'
import { useRepository } from '@/store'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Input, ScrollArea, Textarea, Toast } from '@repo/ui'
import React, { useEffect, useState } from 'react'
import EditDescription from './edit-description'
import { Jost } from 'next/font/google'
import { api } from '@/trpc/react'
const font2 = Jost({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin']
})
const RepoDescriptionAndReferences = ({
  isOwner = false
}: {
  isOwner?: boolean
}) => {
  const { openItem, setOpenItem, repositoryDetails } = useRepository()

  const [repoTitle, setRepoTitle] = useState<string | null>('')
  const [debouncedRepoTitle, setDebouncedRepoTitle] = useState<string | null>(
    ''
  )
  useEffect(() => {
    if (openItem && openItem.referenceType === 'CUSTOM_PROBLEM') {
      setRepoTitle(openItem.title)
      setDebouncedRepoTitle(openItem.title)
    }
  }, [openItem])

  useEffect(() => {
    if (repoTitle != debouncedRepoTitle) {
      const timerId = setTimeout(() => {
        // setPage(1)
        setDebouncedRepoTitle(repoTitle)
      }, 1000)
      return () => clearTimeout(timerId)
    }
  }, [repoTitle])
  // api.repository.updateTitle.useMutation({
  //   // refetchOnWindowFocus: false,
  //   onSuccess(createdItem: any) {
  //     Toast({ title: 'Created', type: 'success' })

  //     // TODO:refresh and invalidate the useQuery for get Repo Items
  //   },
  //   onError(error: { message: any }) {
  //     Toast({
  //       type: 'error',
  //       title: 'Error!',
  //       message: error?.message || 'Something went wrong',
  //       duration: 5000
  //     })
  //   }
  // })
  return (
    <div
      className={cn('sticky top-0 mt-2 h-screen max-h-[1920px] flex-[5] pl-2')}
    >
      <div
        className={cn(
          'overflow-hidden rounded-md border bg-background',
          'shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'
          // 'bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]'
        )}
      >
        <ScrollArea className='flex h-screen max-h-[1920px] flex-col py-0'>
          <div
            className={cn(
              'sticky top-0 z-10 flex items-center justify-between border-b bg-background px-8 pb-4 pt-4'
            )}
          >
            {/* <h2
              className={cn(
                'scroll-m-20 text-xl font-semibold tracking-tight',
                
              )}
            >
              {repositoryDetails?.title}
            </h2> */}
            {isOwner ? (
              <Input
                // className='scroll-m-20 text-2xl font-semibold tracking-tight'
                className={cn(
                  'scroll-m-20 rounded-none border-2 border-transparent bg-transparent text-2xl font-extrabold tracking-tight text-foreground focus-visible:border-b-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 lg:text-2xl'
                )}
                value={repositoryDetails?.title}
                // onChange={e => setTitle(e.target.value)}
              />
            ) : (
              <h2
                className={cn(
                  'scroll-m-20 text-3xl font-semibold tracking-tight'
                )}
              >
                {repositoryDetails?.title}
              </h2>
            )}
            {/* <XMarkIcon
              className='size-6'
              onClick={() => setOpenItem(undefined)}
            /> */}
          </div>
          <div className='flex flex-col gap-4 px-8 pt-4'>
            {/* <EditDescription /> */}
            {/* {isOwner ? (
              <div className='flex-1 border-0 p-1'>
                <Textarea
                  className='h-full resize-none border-none'
                  value={repositoryDetails?.description ?? undefined}
                />
              </div>
            ) : (
              <p>{repositoryDetails?.description}</p>
            )} */}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

export default RepoDescriptionAndReferences
