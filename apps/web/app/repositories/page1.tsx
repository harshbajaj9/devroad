import ProblemSetCard from '@/components/repository-card'
import { cn } from '@/lib/utils'
import {
  ChevronDownIcon,
  XCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { Jost } from 'next/font/google'
import React, { useEffect } from 'react'
import { prisma } from '@/lib/db'

import { useState } from 'react'
import { Button } from '@repo/ui/components/ui/button'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@repo/ui/components/ui/select'
import { Input } from '@repo/ui/components/ui/input'
import { ScrollArea } from '@repo/ui/components/ui/scroll-area'
import { ChevronDown } from 'lucide-react'
import RoleSelectFilterOption from './role-select-filter-option'
import CompanySelectFilterOption from './company-select-filter-option'
import CategorySelectFilterOption from './category-select-filter-option'
import RepositoryCard from '@/components/repository-card'
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams
} from 'next/navigation'
import SearchFilterComponent from './search-filter-component'
import { getRepositories } from '@/server/api/routers/utils/repositories-utils'
import { db } from '@/server/db'

const Tag = ({ title, count }: { title: string; count: string }) => {
  return (
    <div className='group flex items-center'>
      <a
        href={'/problem-sets/tag/dsa'}
        className='inline-flex items-center gap-1'
      >
        <p className='text-md dark:group-hover:text-yellow-500'>{title}</p>
        <div className='rounded-full bg-muted px-2 text-xs dark:group-hover:bg-yellow-800'>
          {count}
        </div>
      </a>
    </div>
  )
}

// const tagsList = [
//   { title: 'DSA', count: '231' },
//   { title: 'Guesstimates', count: '140' },
//   { title: 'Database', count: '95' },
//   { title: 'ML', count: '42' },
//   { title: 'System Design', count: '77' },
//   { title: 'Data Science', count: '56' }
// ]

const Repositories = async ({
  searchParams
}: {
  searchParams: { role: string; company: string; cat: string }
}) => {
  const repositories = await getRepositories({
    searchQuery: '',
    categoryFilter: searchParams.cat,
    companyFilter: searchParams.company
  })
  // const repositories = await prisma.repository.findMany()
  console.log('repositories>', repositories)
  return (
    <main className='h-[1600px] bg-backgroundalt'>
      <div className='bg-background p-16'>
        {/* <div className='p-16'></div> */}
        <h1
          className={cn(
            'mb-4 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
          )}
        >
          Repositories {searchParams['role'] && `for ${searchParams['role']}`}
        </h1>
        {/* <p className='mb-4 text-gray-600'>
          Review this list of 3,320 interview questions and answers verified by
          hiring managers and candidates.
        </p> */}
        <p className='mb-4 text-muted-foreground'>
          Get your hands on popular Problem Sets and Collections for your
          preparation.
        </p>
      </div>
      <SearchFilterComponent
        role={searchParams['role']}
        company={searchParams['company']}
        cat={searchParams['cat']}
      />
      {/* <div className='my-8 text-2xl'>Popular Tags</div> */}

      {/* <div className='border-b border-border'>
        <div className='flex items-center gap-4'>
          {tagsList.map(tag => (
            <Tag title={tag.title} count={tag.count} />
          ))}
          
        </div>
        <div className='-mb-3 mt-4 flex justify-center'>
          <div className='flex h-6 w-6 items-center justify-center rounded-full bg-foreground'>
            <ChevronDownIcon className='size-4 stroke-2 text-background' />
          </div>
        </div>
      </div> */}

      <div className='flex flex-wrap justify-center gap-8 px-24 py-8'>
        {repositories.map(repo => (
          <RepositoryCard
            title={repo.title}
            creatorName={repo.creatorName}
            id={repo.id}
          />
        ))}
        <RepositoryCard />
        <RepositoryCard />
        <RepositoryCard />
        <RepositoryCard />
      </div>
    </main>
  )
}

export default Repositories
