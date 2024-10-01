'use client'
import React, { useEffect, useState } from 'react'
import { prisma } from '@/lib/db'
import { $Enums } from '@prisma/client'
import {
  Button,
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from '@repo/ui'
import { useRouter } from 'next/navigation'
import Header from './header'
import ProblemRow from './problem-row'
import { ProblemData } from '@/typing'
import { api } from '@/trpc/react'
import ProblemRow2 from './problem-row2'

const tableColHeads = [
  {
    title: 'Title'
  },
  {
    title: 'Link'
  },
  {
    title: 'Category'
  },
  {
    title: 'Difficulty'
  }
]
const Problems = () => {
  // fetch all problems
  // const problems = await prisma.problem.findMany()
  // const categories = Object.values($Enums.ProblemCategory)

  const [page, setPage] = useState<number>(1)
  const router = useRouter()
  const pageSize = 20 // Number of visitors to show per page
  const [totalPages, setTotalPages] = useState<number | undefined>(1)
  // const [activeTab, setActiveTab] = useState('weekly')
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
  const [filteredProblems, setFilteredProblems] = useState<ProblemData[]>([])

  // const { data: problemsCount } = api.problem.getProblemsCount.useQuery()
  // let getProblemsQuery = api.problem.getAllProblems.useQuery({
  //   page,
  //   pageSize
  // })

  const { data: problemsData, isLoading } = api.problem.getAllProblems.useQuery(
    {
      page,
      pageSize
    }
  )

  useEffect(() => {
    if (searchQuery != debouncedSearchQuery) {
      const timerId = setTimeout(() => {
        setPage(1)
        setDebouncedSearchQuery(searchQuery)
      }, 1000)
      return () => clearTimeout(timerId)
    }
  }, [searchQuery])

  const { data: searchProblemsData, isLoading: isSearchResultLoading } =
    api.problem.searchProblems.useQuery(
      {
        page,
        pageSize,
        // tabScope: activeTab,
        searchQuery: debouncedSearchQuery
      },
      { enabled: !!debouncedSearchQuery }
    )
  useEffect(() => {
    if (debouncedSearchQuery) {
      setTotalPages(searchProblemsData?.totalPages ?? 1)
      setFilteredProblems(searchProblemsData?.problems || [])
    } else {
      setTotalPages(problemsData?.totalPages ?? 1)
      setFilteredProblems(problemsData?.problems || [])
    }
    console.log('problemsData', problemsData)
  }, [debouncedSearchQuery, searchProblemsData, problemsData])

  return (
    <main className=''>
      <div className='shrink-0 p-24'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col items-start gap-1'>
            <div className='font-inter text-3xl font-medium text-foreground'>
              Imported Problems
            </div>
          </div>
        </div>
        <Header
          totalCount={problemsData?.problemsCount}
          onSearchChange={setSearchQuery}
          searchQuery={searchQuery}
        />
        <div className='shadow-[0px_4px_8px_-2px_rgba(16, 24, 40,0.10)] max-w-screen-md overflow-hidden rounded-lg border'>
          {filteredProblems?.length != 0 ? (
            <>
              <div className='min-w-full'>
                {filteredProblems?.map((data, i) => {
                  return (
                    <ProblemRow2
                      problem={data}
                      key={i}
                      // activeTab={activeTab}
                    />
                  )
                })}
              </div>
              <div className='flex items-center justify-between border-t px-6 pb-4 pt-3'>
                <div className='flex gap-x-3'>
                  <Button
                    variant='outline'
                    disabled={page <= 1}
                    onClick={() => {
                      page >= 1 && setPage(page - 1)
                    }}
                  >
                    Previous
                  </Button>
                  <Button
                    disabled={totalPages !== undefined && page >= totalPages}
                    onClick={() => {
                      totalPages && page < totalPages && setPage(page + 1)
                    }}
                    variant='outline'
                  >
                    Next
                  </Button>
                </div>
                <div className='text-primary-darkblue text-sm font-normal'>
                  Page <span className='font-medium'>{page}</span> of
                  <span className='font-medium'> {totalPages}</span>
                </div>
              </div>
            </>
          ) : totalPages === 0 ? (
            // <ContactDashboardZeroState dashboardType='companies' />
            <div>No results</div>
          ) : (
            <div className='mt-10 flex h-[80vh] w-full items-center justify-center'>
              {/* <SaaSMonkLoading /> */}
              Loading
            </div>
          )}
        </div>
        <div className='shadow-[0px_4px_8px_-2px_rgba(16, 24, 40,0.10)] rounded-lg border'>
          {filteredProblems?.length != 0 ? (
            <>
              <Table className='min-w-full'>
                <TableHeader>
                  <TableRow>
                    {tableColHeads.map(row => (
                      <TableHead className='text-sm font-semibold text-muted-foreground'>
                        {row.title}
                      </TableHead>
                    ))}
                    {/* <TableHead className='text-sm font-medium text-gray-500'>
                        Name of company
                      </TableHead>
                      <TableHead className='w-1/8 text-center text-sm font-medium text-gray-500'>
                        Last visit
                      </TableHead>
                      <TableHead className='w-1/8 text-center text-sm font-medium text-gray-500'>
                        Industry
                      </TableHead>
                      <TableHead className='w-1/8 text-center text-sm font-medium text-gray-500'>
                        Company Size
                      </TableHead>
                      <TableHead className='w-1/8 text-center text-sm font-medium text-gray-500'>
                        Revenue (ARR)
                      </TableHead>
                      <TableHead className='w-1/8 text-center text-sm font-medium text-gray-500'>
                        Unique Visitors
                      </TableHead>
                      <TableHead className='w-1/8 text-center text-sm font-medium text-gray-500'>
                        Total sessions
                      </TableHead> */}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProblems?.map((data, i) => {
                    return (
                      <ProblemRow
                        problem={data}
                        key={i}
                        // activeTab={activeTab}
                      />
                    )
                  })}
                </TableBody>
              </Table>
              <div className='flex items-center justify-between border-t px-6 pb-4 pt-3'>
                <div className='flex gap-x-3'>
                  <Button
                    variant='outline'
                    disabled={page <= 1}
                    onClick={() => {
                      page >= 1 && setPage(page - 1)
                    }}
                  >
                    Previous
                  </Button>
                  <Button
                    disabled={totalPages !== undefined && page >= totalPages}
                    onClick={() => {
                      totalPages && page < totalPages && setPage(page + 1)
                    }}
                    variant='outline'
                  >
                    Next
                  </Button>
                </div>
                <div className='text-primary-darkblue text-sm font-normal'>
                  Page <span className='font-medium'>{page}</span> of
                  <span className='font-medium'> {totalPages}</span>
                </div>
              </div>
            </>
          ) : totalPages === 0 ? (
            // <ContactDashboardZeroState dashboardType='companies' />
            <div>No results</div>
          ) : (
            <div className='mt-10 flex h-[80vh] w-full items-center justify-center'>
              {/* <SaaSMonkLoading /> */}
              Loading
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default Problems
