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
const companies = [
  'Google',
  'Amazon',
  'Facebook',
  'Microsoft',
  'Apple',
  'Netflix',
  'Tesla',
  'IBM',
  'Oracle',
  'Salesforce',
  'Adobe',
  'Intel',
  'Nvidia',
  'Twitter',
  'Uber'
]
const CompanySelectFilterOption = ({
  selectedCompany,
  setSelectedCompany
}: {
  selectedCompany: string | undefined
  setSelectedCompany: (company: string | undefined) => void
}) => {
  return (
    <DropdownMenu>
      <div className='relative'>
        <DropdownMenuTrigger className='flex gap-2' asChild>
          <Button
            variant='outline'
            className={cn(
              'w-44 justify-between',
              selectedCompany && 'border-primary'
            )}
          >
            {selectedCompany ? (
              <div className='flex w-28'>
                <span className='truncate'>{selectedCompany}</span>
              </div>
            ) : (
              <div className='flex w-28'>
                <span className=''>Company</span>
              </div>
            )}

            {!selectedCompany && <ChevronDownIcon className='size-5' />}
          </Button>
        </DropdownMenuTrigger>
        {selectedCompany && (
          <div className='absolute right-4 top-[10px]'>
            <XCircleIcon
              className='size-5 cursor-pointer text-primary'
              onClick={e => {
                e.stopPropagation()
                setSelectedCompany(undefined)
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
          {companies.map(company => (
            <DropdownMenuItem
              key={company}
              onClick={() => setSelectedCompany(company)}
            >
              {company}
            </DropdownMenuItem>
          ))}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default CompanySelectFilterOption
