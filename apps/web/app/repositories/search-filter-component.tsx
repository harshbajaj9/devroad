'use client'
import React, { useEffect, useState } from 'react'
import RoleSelectFilterOption from './role-select-filter-option'
import CompanySelectFilterOption from './company-select-filter-option'
import CategorySelectFilterOption from './category-select-filter-option'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@repo/ui/components/ui/dropdown-menu'
import { createUrl } from './page'
import { Button, Input } from '@repo/ui'
import {
  ChevronDownIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'
const SearchFilterComponent = ({
  role,
  company,
  cat
}: {
  role: string
  company: string
  cat: string
}) => {
  const [selectedType, setSelectedType] = useState()

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<string | undefined>(role)
  const [selectedCompany, setSelectedCompany] = useState<string | undefined>(
    company
  )
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    cat
  )
  // const [selectedFilter, setSelectedFilter] = useState()

  // useEffect(() => {
  //   console.log('1', searchParams, searchParams['role'])
  //   if (searchParams['role']) setSelectedRole(searchParams['role'].toString())
  //   if (searchParams['cat']) setSelectedCategory(searchParams['cat'].toString())
  //   if (searchParams['company'])
  //     setSelectedCompany(searchParams['company'].toString())
  // }, [searchParams])

  useEffect(() => {
    console.log('2', selectedRole, selectedCompany, selectedCategory)
    const newSearchParams = new URLSearchParams(searchParams.toString())
    if (selectedRole) newSearchParams.set('role', selectedRole)
    else newSearchParams.delete('role')
    if (selectedCompany) newSearchParams.set('company', selectedCompany)
    else newSearchParams.delete('company')
    if (selectedCategory) newSearchParams.set('cat', selectedCategory)
    else newSearchParams.delete('cat')

    // if (
    //   newSearchParams.get('cat') ||
    //   newSearchParams.get('company') ||
    //   newSearchParams.get('role')
    // ) {
    //   console.log('>>>>>>>>>>', createUrl(pathname, newSearchParams))
    // }
    router.push(createUrl(pathname, newSearchParams), { scroll: false })

    //   console.log(
    //   'hi',
    //   createUrl(pathname, newSearchParams),
    //   pathname,
    //   newSearchParams
    // )
  }, [selectedRole, selectedCompany, selectedCategory])

  return (
    <div className='sticky -top-1 z-10 flex justify-between gap-2 border-b bg-background px-16 py-4'>
      <div className='flex gap-2'>
        <RoleSelectFilterOption
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
        />

        <CompanySelectFilterOption
          selectedCompany={selectedCompany}
          setSelectedCompany={setSelectedCompany}
        />

        <CategorySelectFilterOption
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant='outline'>
        Company <ChevronDown className='ml-2 h-4 w-4' />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className='w-56' side='bottom' align='start'>
      <ScrollArea className='h-[300px]'>
        <Input
          className='sticky top-0 z-10 mb-2'
          placeholder='Filter...'
        />
        {companies.map(company => (
          <DropdownMenuItem key={company}>{company}</DropdownMenuItem>
        ))}
      </ScrollArea>
    </DropdownMenuContent>
  </DropdownMenu>

  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant='outline'>
        Category <ChevronDown className='ml-2 h-4 w-4' />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className='w-56' side='bottom' align='start'>
      <ScrollArea className='h-[300px]'>
        <Input
          className='sticky top-0 z-10 mb-2'
          placeholder='Filter...'
        />
        {categories.map(category => (
          <DropdownMenuItem key={category}>{category}</DropdownMenuItem>
        ))}
      </ScrollArea>
    </DropdownMenuContent>
  </DropdownMenu> */}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline'>
              Filter <ChevronDownIcon className='ml-2 h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side='bottom' align='start'>
            <DropdownMenuItem>Most recent</DropdownMenuItem>
            <DropdownMenuItem>Most popular</DropdownMenuItem>
            <DropdownMenuItem>Highest rated</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='relative w-full max-w-52'>
        {/* <SearchIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400' /> */}
        <MagnifyingGlassIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400' />
        <Input type='search' placeholder='Search' className='pl-8' />
      </div>
      {/* <Input className='w-44' /> */}
    </div>
  )
}

export default SearchFilterComponent
