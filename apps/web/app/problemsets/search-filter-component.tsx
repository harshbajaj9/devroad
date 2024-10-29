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
import { Button, Input } from '@repo/ui'
import {
  ChevronDownIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'
import { createUrl, getCatById, getRoleById } from '@/lib/utils'
import FilterResultsOption from './filter-results-option'
import SearchInput from '../problems/search-input'
const SearchFilterComponent = ({
  // roleId,
  // company,
  catId,
  sortId
}: {
  // roleId: string
  // company: string
  catId: string
  sortId: 'popular' | 'latest'
}) => {
  const [selectedType, setSelectedType] = useState()

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  // const [selectedRole, setSelectedRole] = useState<
  //   { id: string; value: string } | undefined
  // >(getRoleById(roleId))
  // const [selectedCompany, setSelectedCompany] = useState<
  //   { id: string; value: string } | undefined
  // >(company)
  const [selectedCategory, setSelectedCategory] = useState<
    { id: string; value: string } | undefined
  >(getCatById(catId))
  const [selectedSort, setSelectedSort] = useState<'latest' | 'popular'>(
    sortId === 'latest' ? 'latest' : 'popular'
  )

  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
  // const [filteredProblems, setFilteredProblems] = useState<ProblemData[]>([])

  // TODO: understand
  // const { data: problemsCount } = api.problem.getProblemsCount.useQuery()
  // let getProblemsQuery = api.problem.getAllProblems.useQuery({
  //   page,
  //   pageSize
  // })

  // const { data: problemsData, isLoading } = api.problem.getAllProblems.useQuery(
  //   {
  //     page,
  //     pageSize
  //   }
  // )

  useEffect(() => {
    if (searchQuery != debouncedSearchQuery) {
      const timerId = setTimeout(() => {
        setDebouncedSearchQuery(searchQuery)
      }, 1000)
      return () => clearTimeout(timerId)
    }
  }, [searchQuery])

  // const { data: searchProblemsData, isLoading: isSearchResultLoading } =
  //   api.problem.searchProblems.useQuery(
  //     {
  //       page,
  //       pageSize,
  //       // tabScope: activeTab,
  //       searchQuery: debouncedSearchQuery
  //     },
  //     { enabled: !!debouncedSearchQuery }
  //   )

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams.toString())
    if (debouncedSearchQuery) {
      newSearchParams.set('text', debouncedSearchQuery)
      newSearchParams.set('page', '1')
    } else {
      newSearchParams.delete('text')
      newSearchParams.set('page', '1')
    }

    router.push(createUrl(pathname, newSearchParams), { scroll: false })
  }, [debouncedSearchQuery])

  // TODO: understand

  // const [selectedFilter, setSelectedFilter] = useState()

  // useEffect(() => {
  //   console.log('1', searchParams, searchParams['role'])
  //   if (searchParams['role']) setSelectedRole(searchParams['role'].toString())
  //   if (searchParams['cat']) setSelectedCategory(searchParams['cat'].toString())
  //   if (searchParams['company'])
  //     setSelectedCompany(searchParams['company'].toString())
  // }, [searchParams])

  // useEffect(() => {
  //   setSelectedCategory(getCatById(catId))
  // }, [])
  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams.toString())
    // if (selectedRole) newSearchParams.set('role', selectedRole.id)
    // else newSearchParams.delete('role')
    // if (selectedCompany) newSearchParams.set('company', selectedCompany)
    // else newSearchParams.delete('company')
    if (selectedCategory) {
      newSearchParams.set('cat', selectedCategory.id)
    } else newSearchParams.delete('cat')
    if (selectedSort) {
      newSearchParams.set('sort', selectedSort)
    } else newSearchParams.delete('sort')
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
    // }, [selectedRole, selectedCompany, selectedCategory])
  }, [selectedCategory, selectedSort])

  return (
    <div className='sticky -top-1 z-10 border-b bg-background px-16 py-4'>
      <div className='mx-auto flex max-w-screen-2xl justify-between gap-2'>
        <div className='flex gap-2'>
          {/* <RoleSelectFilterOption
            selectedRole={selectedRole}
            setSelectedRole={setSelectedRole}
          />

          <CompanySelectFilterOption
            selectedCompany={selectedCompany}
            setSelectedCompany={setSelectedCompany}
          /> */}

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

          <FilterResultsOption
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
          />
        </div>
        {/* <div className='relative w-full max-w-52'>
          <MagnifyingGlassIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400' />
          <Input type='search' placeholder='Search' className='pl-8' />
        </div> */}

        <SearchInput
          onSearchChange={setSearchQuery}
          searchQuery={searchQuery}
          placeholder='Search by title'
        />
        {/* <Input className='w-44' /> */}
      </div>
    </div>
  )
}

export default SearchFilterComponent
