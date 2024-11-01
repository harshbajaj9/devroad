'use client'
import { Button } from '@repo/ui'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { createUrl } from '@/lib/utils'

const PSPagination = ({
  totalPages = 1,
  initPage
}: {
  totalPages: number
  initPage: string
}) => {
  const [page, setPage] = useState(Number(initPage))

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.set('page', page.toString())
    router.push(createUrl(pathname, newSearchParams), { scroll: false })
  }, [page])

  return (
    <div className='flex items-center justify-between border-t bg-background px-6 pb-4 pt-3'>
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
  )
}

export default PSPagination
