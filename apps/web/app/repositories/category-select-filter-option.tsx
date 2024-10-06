'use client'
import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@repo/ui/components/ui/dropdown-menu'
import { Button, Input, ScrollArea } from '@repo/ui'
import { ChevronDownIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'
const categories = [
  'Product Design',
  'Behavioral',
  'Analytical',
  'Product Strategy',
  'Technical',
  'Execution',
  'Coding',
  'System Design',
  'Data Structures & Algorithms'
]
const CategorySelectFilterOption = ({
  selectedCategory,
  setSelectedCategory
}: {
  selectedCategory: string | undefined
  setSelectedCategory: (category: string | undefined) => void
}) => {
  return (
    <DropdownMenu>
      <div className='relative'>
        <DropdownMenuTrigger className='flex gap-2' asChild>
          <Button
            variant='outline'
            className={cn(
              'w-44 justify-between',
              selectedCategory && 'border-primary'
            )}
          >
            {selectedCategory ? (
              <div className='flex w-28'>
                <span className='truncate'>{selectedCategory}</span>
              </div>
            ) : (
              <div className='flex w-28'>
                <span className=''>Category</span>
              </div>
            )}

            {!selectedCategory && <ChevronDownIcon className='size-5' />}
          </Button>
        </DropdownMenuTrigger>
        {selectedCategory && (
          <div className='absolute right-4 top-[10px]'>
            <XCircleIcon
              className='size-5 cursor-pointer text-primary'
              onClick={e => {
                e.stopPropagation()
                setSelectedCategory(undefined)
              }}
            />
          </div>
        )}
      </div>

      <DropdownMenuContent className='w-56' side='bottom' align='start'>
        <ScrollArea className='h-[300px]'>
          <div className='sticky top-0 z-10 bg-background px-1 py-2'>
            <Input className='' placeholder='Filter...' />
          </div>
          {categories.map(category => (
            <DropdownMenuItem
              key={category}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </DropdownMenuItem>
          ))}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default CategorySelectFilterOption
