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
import { Badge } from '@repo/ui'

const lists = [
  {
    value: 'DSA',
    label: 'Data Structures & Algorithms'
  },
  {
    value: 'SQL',
    label: 'SQL'
  },
  {
    value: 'SHELL',
    label: 'Shell Scripts'
  }
]

export default function CategorySelect() {
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
            Categories
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
      {
        <div className='ml-1 mt-2 flex min-h-10 flex-wrap items-center justify-start gap-1'>
          {selectedLists.length > 0 &&
            selectedLists.map(listValue => (
              <Badge
                key={listValue}
                className='cursor-default rounded-md bg-primary text-background hover:bg-primary'
                // className='rounded-md bg-secondary px-2 py-1 text-sm text-secondary-foreground'
              >
                {lists.find(list => list.value === listValue)?.value}
              </Badge>
            ))}
        </div>
      }
    </div>
  )
}
