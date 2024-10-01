import { cn } from '@/lib/utils'
import { useRepository } from '@/store'
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { Button, Textarea } from '@repo/ui'
import { Jost, Poppins } from 'next/font/google'
import React, { useState } from 'react'
const font = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin']
})
const font2 = Jost({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin']
})
const EditDescription = () => {
  // const [isEditMode, setIsEditMode] = useState(false)
  const [showDescription, setShowDescription] = useState<boolean>(true)
  const { openItem, setOpenItem } = useRepository()
  // if (
  //   (openItem?.type === 'ITEM' && !openItem.problem.description) ||
  //   (openItem?.type === 'SECTION' && !openItem.description)
  // )
  //   return
  return (
    <div className=''>
      <div
        className={cn('flex items-center justify-between')}
        onClick={() => setShowDescription(prev => !prev)}
      >
        <h3
          className={cn(
            'scroll-m-20 text-xl font-semibold tracking-tight',
            font2.className
          )}
        >
          Description
        </h3>
        {showDescription ? (
          <ChevronDownIcon className='size-4' />
        ) : (
          <ChevronRightIcon className='size-4' />
        )}
      </div>
      {showDescription && (
        <div className='border-0 p-1'>
          <div className='flex-1'>
            <Textarea
              className='h-full resize-none border-none'
              value={openItem?.description ?? undefined}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default EditDescription
