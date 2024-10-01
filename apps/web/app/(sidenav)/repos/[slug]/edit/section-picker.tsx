'use client'
import { useRepoStructure } from '@/store'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import {
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollArea
} from '@repo/ui'
import { Folder, Search } from 'lucide-react'
import React, { useState } from 'react'
import { DirectorPickerNode } from './directory-picker-node'
import { ItemType } from './add-item-modal'

const SectionPicker = ({ itemType }: { itemType: ItemType }) => {
  const { currentPath, setCurrentPath, setDirectoryModal, repoStructure } =
    useRepoStructure()
  const [sectionSelectionOpen, setSectionSelectionOpen] = useState(false)

  return (
    <>
      {currentPath && (
        <Popover
          open={sectionSelectionOpen}
          onOpenChange={setSectionSelectionOpen}
        >
          <PopoverTrigger asChild>
            <div
              className='w-fit cursor-default rounded bg-muted p-2 text-xs text-foreground'
              onClick={() => {
                setDirectoryModal(true), console.log('hey')
              }}
            >
              <span className='px-1'>
                <Folder className='inline-block size-3' />
              </span>

              {/* <span className='px-1'>{'>'}</span> */}
              {currentPath.map((node, i) => {
                if (i > 0) return <span className='px-1'>/ {node.title}</span>
                return <span className='px-1'>{node.title}</span>
              })}
              <span className='px-1'>
                <ChevronDownIcon className='inline-block size-3' />
              </span>
            </div>
          </PopoverTrigger>

          <PopoverContent align={'start'} className='h-80 w-80 rounded-xl p-4'>
            <div className='flex items-center justify-between border-b py-2'>
              <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
                Select section
              </h3>
              {/* <Button
              variant='ghost'
              size='icon'
              onClick={() => setIsOpen(false)}
            >
              <X className='h-4 w-4' />
            </Button> */}
            </div>
            <div className='p-2'>
              <div className='relative'>
                <Search className='absolute left-2 top-2.5 h-4 w-4 text-gray-400' />
                <Input
                  placeholder='Find or create new section...'
                  // className='border-gray-700 bg-gray-800 pl-8'
                  className='pl-8'
                />
              </div>
            </div>
            <ScrollArea className='h-80'>
              {/* {repoStructure.map(item => ( */}
              <DirectorPickerNode
                // path={[{ id: repoStructure.id, title: repoStructure.title }]}
                key={repoStructure.id}
                item={repoStructure}
                depth={0}
                popoverClose={() => setSectionSelectionOpen(false)}
                itemType={itemType}
              />
              {/* ))} */}
            </ScrollArea>
          </PopoverContent>
        </Popover>
      )}
    </>
  )
}

export default SectionPicker
