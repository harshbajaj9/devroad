import Image from 'next/image'
// import type { VisitorCompanyData } from '~/typing/company'
import { Link2, ExternalLink, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import Link from 'next/link'
// import { format as formatDate } from 'date-fns'
// import CompanyIcon from '~/assets/svg/CompanyIcon'
import React, { useState } from 'react'
// import { useRouter } from 'next/router'
import { cn, getPlatformIconSrc } from '@/lib/utils'
import {
  BuildingOffice2Icon,
  CheckCircleIcon,
  DocumentPlusIcon,
  EllipsisHorizontalCircleIcon,
  EllipsisHorizontalIcon,
  EllipsisVerticalIcon,
  TicketIcon
} from '@heroicons/react/24/outline'
import { CustomTooltip, TableCell, TableRow } from '@repo/ui'
import { ProblemData } from '@/typing'
import { useRouter } from 'next/navigation'
import { $Enums } from '@repo/database'
// import { useFeatureFlagEnabled } from 'posthog-js/react'
// import { cn } from '~/lib/utils'

type Props = {
  problem: ProblemData
  // activeTab: string
}

function ProblemRow({ problem }: Props) {
  // local state
  const [imageError, setImageError] = useState(false)
  // check for the truthy value of the domain null | undefined | empty string
  // const companyUrl = !!problem.domain ? `https://${problem.domain}/` : null

  // check if the feature flag for the company detail enabled
  // const isCompanyDetailPageEnabled = useFeatureFlagEnabled(
  //   'company-detail-page'
  // )

  // hooks
  const router = useRouter()

  // const handleCompanyDetailPageTransition = () => {
  //   if (!isCompanyDetailPageEnabled) return
  //   router.push(`/companies/${problem.companyId}`)
  // }

  const getPlatformIcon = (platform: string | null) => {
    if (platform === 'LC')
      return (
        <Image
          className='drop-shadow-2xl'
          src={'/lc.png'}
          width={20}
          height={20}
          alt='lc'
        ></Image>
      )
  }
  const [mode, setMode] = useState(0)
  return (
    <>
      <TableRow
        className={cn(
          'cursor-pointer text-sm text-foreground transition-colors duration-200',
          mode === 0 && 'odd:bg-background even:bg-backgroundalt',
          mode === 1 &&
            'bg-green-50 hover:bg-green-50 dark:bg-teal-950 dark:hover:bg-green-950',
          mode === 2 &&
            'bg-yellow-50 hover:bg-yellow-50 dark:bg-amber-950 dark:hover:bg-amber-950'
        )}
        key={problem.id}
        // onClick={handleCompanyDetailPageTransition}
      >
        <TableCell className='border-0 p-2'>
          <p className='flex justify-start'>
            {
              problem?.title
              // ? formatDate(new Date(problem.lastVisited), 'do MMM yyyy')
              // : '-'
            }
          </p>
        </TableCell>
        <TableCell className='p-auto flex min-h-full items-center justify-start border-0 px-2'>
          <a
            target='_blank'
            rel='noopener noreferrer'
            href={problem.url ?? '#'}
            className=''
          >
            <Image
              className='drop-shadow-2xl'
              src={getPlatformIconSrc(problem.platform)}
              width={20}
              height={20}
              alt='lc'
            ></Image>
          </a>
          {/* {problem.url ?? '-'} */}
        </TableCell>
        <TableCell className='border-0 p-2'>
          <p className='flex justify-start text-xs text-muted-foreground'>
            {problem.category ?? '-'}
          </p>
        </TableCell>
        <TableCell className='border-0 p-2'>
          <p className='flex justify-start'>
            <span className='rounded-md bg-green-500 p-1 px-2 text-xs font-semibold text-background'>
              {problem.difficulty ?? '-'}
            </span>
          </p>
        </TableCell>
        <TableCell className='border-0 p-2'>
          <p className='flex justify-start'>
            <CheckCircleIcon
              onClick={() => {
                setMode(prev => (prev + 1) % 3)
              }}
              className={cn(
                'size-8 text-muted-foreground',
                mode === 0 && '',
                mode === 1 && 'text-green-400',
                mode === 2 && 'text-yellow-400'
              )}
            />
          </p>
        </TableCell>
        <TableCell className='border-0 p-2'>
          <p className='flex justify-start'>
            <EllipsisVerticalIcon />
          </p>
        </TableCell>
      </TableRow>
    </>
  )
}

export default ProblemRow
