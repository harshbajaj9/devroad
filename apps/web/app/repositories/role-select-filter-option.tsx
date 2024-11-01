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
const roles = [
  { category: 'PRODUCT', items: ['Product Manager'] },
  {
    category: 'ENGINEERING',
    items: [
      'Software Engineer',
      'Technical Program Manager',
      'Engineering Manager',
      'Machine Learning Engineer',
      'Solutions Architect',
      'QA Engineer',
      'Frontend Engineer'
    ]
  }
  // Add more categories and roles as needed
]
const RoleSelectFilterOption = ({
  selectedRole,
  setSelectedRole
}: {
  selectedRole: string | undefined
  setSelectedRole: (role: string | undefined) => void
}) => {
  const [filterValue, setFilterValue] = useState('')

  const filteredRoles = roles
    .map(category => ({
      ...category,
      items: category.items.filter(role =>
        role.toLowerCase().includes(filterValue.toLowerCase())
      )
    }))
    .filter(category => category.items.length > 0)
  return (
    <DropdownMenu>
      <div className='relative'>
        <DropdownMenuTrigger className='flex gap-2' asChild>
          <Button
            variant='outline'
            className={cn(
              'w-44 justify-between',
              selectedRole && 'border-primary'
            )}
          >
            {selectedRole ? (
              <div className='flex w-28'>
                <span className='truncate'>{selectedRole}</span>
              </div>
            ) : (
              <div className='flex w-28'>
                <span className=''>Role</span>
              </div>
            )}
            {/* {selectedRole ? (
                  <div>
                    <XCircleIcon
                      className='size-5 text-primary'
                      onClickCapture={() => {
                        // e.stopPropagation()
                        console.log('hi')
                        setSelectedRole(undefined)
                      }}
                      onClick={e => {
                        // e.stopPropagation()
                        console.log('hi')
                        setSelectedRole(undefined)
                      }}
                    />
                  </div>
                ) : (
                  <ChevronDown className='size-5' />
                )} */}
            {!selectedRole && <ChevronDownIcon className='size-5' />}
          </Button>
        </DropdownMenuTrigger>
        {selectedRole && (
          <div className='absolute right-4 top-[10px]'>
            <XCircleIcon
              className='size-5 cursor-pointer text-primary'
              onClick={e => {
                e.stopPropagation()
                setSelectedRole(undefined)
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
          {roles.map(roleCategory => (
            <div key={roleCategory.category}>
              <h4 className='px-2 py-1 text-sm font-semibold text-gray-500'>
                {roleCategory.category}
              </h4>
              {roleCategory.items.map(role => (
                <DropdownMenuItem
                  onClick={() => setSelectedRole(role)}
                  key={role}
                >
                  {role}
                </DropdownMenuItem>
              ))}
            </div>
          ))}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default RoleSelectFilterOption
