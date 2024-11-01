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
// import { PSCategoryFilter } from '@/lib/lib'

const FilterResultsOption = ({
  selectedSort,
  setSelectedSort
}: {
  selectedSort: 'popular' | 'latest'
  setSelectedSort: (category: 'popular' | 'latest') => void
}) => {
  return (
    <DropdownMenu>
      <div className='relative'>
        <DropdownMenuTrigger className='flex gap-2' asChild>
          <Button
            variant='outline'
            className={cn(
              'w-28 justify-between',
              selectedSort && 'border-primary'
            )}
          >
            <div className='flex w-28'>
              <span className='truncate'>
                {selectedSort === 'latest' ? '🔥Latest' : '👍Popular'}
              </span>
            </div>
          </Button>
        </DropdownMenuTrigger>
      </div>

      <DropdownMenuContent className='w-56' side='bottom' align='start'>
        <DropdownMenuItem onClick={() => setSelectedSort('popular')}>
          👍Popular
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setSelectedSort('latest')}>
          🔥Latest
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default FilterResultsOption
