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
import Image from 'next/image'
import { Badge } from '@repo/ui'

const lists = [
  {
    value: 'LC',
    label: 'LeetCode',
    image: (
      <Image
        className='drop-shadow-2xl'
        src={'/lc1.png'}
        width={16}
        height={16}
        alt='lc'
      ></Image>
    )
  },
  {
    value: 'GFG',
    label: 'GeeksForGeeks',
    image: (
      <Image
        className='drop-shadow-2xl'
        src={'/lc.png'}
        width={16}
        height={16}
        alt='lc'
      ></Image>
    )
  },
  {
    value: 'GFE',
    label: 'GreatFrontEnd',
    image: (
      <Image
        className='drop-shadow-2xl'
        src={'/lc.png'}
        width={16}
        height={16}
        alt='lc'
      ></Image>
    )
  }
]

export default function PlatformSelect() {
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
            Platforms
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
        <div className='ml-1 mt-2 flex min-h-10 flex-wrap items-center justify-start gap-1'>
          {selectedLists.map(listValue => (
            <Badge
              key={listValue}
              className='cursor-default rounded-md bg-primary text-muted-foreground hover:bg-primary'
              // className='mb-1 rounded-md bg-secondary px-2 py-1 text-sm text-secondary-foreground'
            >
              {lists.find(list => list.value === listValue)?.image}
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
