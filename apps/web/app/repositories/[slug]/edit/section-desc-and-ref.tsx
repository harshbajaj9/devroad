import { cn } from '@/lib/utils'
import { useRepository } from '@/store'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ScrollArea } from '@repo/ui'
import React from 'react'
import EditDescription from './edit-description'

const SectionDescriptionAndReferences = () => {
  const { openItem, setOpenItem } = useRepository()

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
        <div className='absolute right-4 top-8 z-10'>
          <XMarkIcon
            className='size-6'
            onClick={() => setOpenItem(undefined)}
          />
        </div>
        <ScrollArea className='flex h-screen flex-col p-8 py-0'>
          <h2 className='scroll-m-20 pt-8 text-3xl font-semibold tracking-tight'>
            {openItem?.title}
          </h2>
          <EditDescription />
        </ScrollArea>
      </div>
    </div>
  )
}

export default SectionDescriptionAndReferences
