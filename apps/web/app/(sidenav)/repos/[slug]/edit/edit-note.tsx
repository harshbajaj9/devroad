import { cn } from '@/lib/utils'
import { useRepository } from '@/store'
import { Button } from '@repo/ui'
import React, { useState } from 'react'

const EditNote = () => {
  const [isEditMode, setIsEditMode] = useState(false)
  const { openItem, setOpenItem } = useRepository()
  return (
    <div
      className={cn(
        'relative flex-1 cursor-pointer bg-background p-1 text-sm text-foreground',
        // isEditMode && 'scale-[1.01] border border-primary shadow-md'
        isEditMode && 'border border-primary shadow-md'
      )}
      onClick={e => {
        e.stopPropagation()
        // if (e.target !== e.currentTarget) return

        // console.log('hey', itemData.id)
        // setOpenNotes(true)
        // setOpenItem(itemData)
      }}
    >
      {isEditMode ? (
        <div className='flex justify-end'>
          <Button
            variant={'outline'}
            className='flex items-center gap-2 rounded-full border'
            onClick={() => setIsEditMode(false)}
          >
            {/* <PencilIcon className='size-3' /> */}
            Save
            <Button
              onClick={() => setIsEditMode(false)}
              className='size-5 text-muted-foreground'
            />
          </Button>
        </div>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger className='absolute right-1 top-1' asChild>
            <Button
              variant='ghost'
              className='h-8 w-8 rounded-none p-0 hover:bg-transparent'
            >
              <span className='sr-only'>Open menu</span>
              <EllipsisVerticalIcon className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem>
              <ArrowRightStartOnRectangleIcon className='mr-2 h-4 w-4' />
              Move
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => deleteItem(itemData.id)}>
              <TrashIcon className='mr-2 h-4 w-4' />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      <div
        className={cn('flex justify-between text-sm text-foreground')}
        // key={problem.id}
      >
        <div className='flex items-center justify-start'>
          <div>
            <div
              className='flex'
              // className={cn(
              //   'flex cursor-pointer text-sm text-foreground transition-colors duration-200',
              //   mode === 0 && 'odd:bg-background even:bg-backgroundalt',
              //   mode === 1 &&
              //     'bg-green-50 hover:bg-green-50 dark:bg-teal-950 dark:hover:bg-green-950',
              //   mode === 2 &&
              //     'bg-yellow-50 hover:bg-yellow-50 dark:bg-amber-950 dark:hover:bg-amber-950'
              // )}
              // key={problem.id}
              // onClick={handleCompanyDetailPageTransition}
            >
              <div className='border-0 p-1'>
                <p className=''>{itemData.id}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditNote
