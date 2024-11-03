'use client'
import {
  Button,
  Input,
  Toast,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
  Badge
} from '@repo/ui'
import React, { useEffect, useState } from 'react'
import { useRepository } from '../../../../store'
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { api } from '@/trpc/react'
import { Jost } from 'next/font/google'
import { cn, ItemNodeType } from '@/lib/utils'
import { RepositoryItem } from '@repo/database'
const font2 = Jost({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin']
})
const ItemTags = ({
  itemData,
  setQueryUserData,
  tags,
  setTags
}: {
  itemData: ItemNodeType
  tags: string[]
  setTags: (tags: string[]) => void
  setQueryUserData: (flag: boolean) => void
}) => {
  return (
    <div className='max-w-84 flex flex-wrap items-center'>
      {tags &&
        tags.map(tag => (
          <div
            className={cn(
              'group mx-1 flex items-center rounded-full border border-muted-foreground px-1 text-[10px] font-semibold uppercase text-muted-foreground'
            )}
          >
            {tag}
          </div>
        ))}
    </div>
  )
}

export default ItemTags
