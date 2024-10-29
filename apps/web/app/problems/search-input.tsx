// import { Search, X } from 'lucide-react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { X } from 'lucide-react'
import React, { useState } from 'react'

interface SearchInputProps {
  onSearchChange: string
  searchQuery: string
  placeholder: string
}
function SearchInput({
  onSearchChange,
  searchQuery,
  placeholder
}: SearchInputProps) {
  return (
    <div className='flex max-w-[320px] flex-1 items-center gap-2 rounded-lg border border-gray-300 bg-backgroundalt px-3.5 py-2 shadow-sm'>
      <MagnifyingGlassIcon className='h-5 w-5 text-muted-foreground' />
      <input
        className='w-full border-none bg-backgroundalt text-sm text-foreground outline-none ring-0 placeholder:text-muted-foreground'
        placeholder={placeholder ?? 'Search for a problem'}
        onChange={e => onSearchChange(e.target.value)}
        value={searchQuery}
      />
      <button
        className='text-sm text-muted-foreground'
        onClick={() => onSearchChange('')}
      >
        <X />
      </button>
    </div>
  )
}

export default SearchInput
