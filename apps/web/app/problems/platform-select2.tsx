import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@repo/ui/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList
} from '@repo/ui/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@repo/ui/components/ui/popover'

const lists = [
  {
    value: 'leetcode-algo-170',
    label: 'LeetCode Curated Algo 170'
  },
  {
    value: 'leetcode-sql-70',
    label: 'LeetCode Curated SQL 70'
  },
  {
    value: 'top-100-liked',
    label: 'Top 100 Liked Questions'
  },
  {
    value: 'top-interview',
    label: 'Top Interview Questions'
  }
]

export default function MultiSelectDropdown() {
  const [open, setOpen] = React.useState(false)
  const [selectedLists, setSelectedLists] = React.useState<string[]>([])

  return (
    <div className='w-[250px]'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={open}
            className='w-full justify-between'
          >
            Lists
            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[250px] p-0'>
          <Command>
            <CommandEmpty>No list found.</CommandEmpty>
            <CommandList>
              <CommandGroup>
                {lists.map(list => (
                  <CommandItem
                    key={list.value}
                    onSelect={() => {
                      setSelectedLists(prev =>
                        prev.includes(list.value)
                          ? prev.filter(item => item !== list.value)
                          : [...prev, list.value]
                      )
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        selectedLists.includes(list.value)
                          ? 'opacity-100'
                          : 'opacity-0'
                      )}
                    />
                    {list.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {selectedLists.length > 0 && (
        <div className='mt-2'>
          {selectedLists.map(listValue => (
            <div
              key={listValue}
              className='mb-1 rounded-md bg-secondary px-2 py-1 text-sm text-secondary-foreground'
            >
              {lists.find(list => list.value === listValue)?.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
