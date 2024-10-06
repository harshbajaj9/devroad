import { cn } from '@/lib/utils'
import { useRepository } from '@/store'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ScrollArea, Textarea } from '@repo/ui'
import React from 'react'
import EditDescription from './edit-description'
import { Jost } from 'next/font/google'
const font2 = Jost({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin']
})
const RepoDescriptionAndReferences = () => {
  const { openItem, setOpenItem, repositoryDetails } = useRepository()

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
        <ScrollArea className='flex h-screen flex-col p-8 py-0'>
          <h2
            className={cn(
              'scroll-m-20 py-8 text-3xl font-semibold tracking-tight',
              font2.className
            )}
          >
            {repositoryDetails?.title}
          </h2>
          <div className=''>
            <div className={cn('flex items-center justify-between')}></div>
            <div className='border-0 p-1'>
              <div className='flex-1'>
                <Textarea
                  className='h-full resize-none border-none'
                  value={repositoryDetails?.description}
                />
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

export default RepoDescriptionAndReferences
