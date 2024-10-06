import ProblemSetCard from '@/components/repository-card'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import React from 'react'

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

const tagsList = [
  { title: 'DSA', count: '231' },
  { title: 'Guesstimates', count: '140' },
  { title: 'Database', count: '95' },
  { title: 'ML', count: '42' },
  { title: 'System Design', count: '77' },
  { title: 'Data Science', count: '56' }
]
const ProblemSets = () => {
  return (
    <div className='h-[1600px]'>
      {/* <div className="my-8 text-2xl">Popular Tags</div> */}
      <div className='border-b border-border'>
        <div className='flex items-center gap-4'>
          {tagsList.map(tag => (
            <Tag title={tag.title} count={tag.count} />
          ))}
          {/* <a className="inline-flex items-center" href="/tag/string">
            <span className="whitespace-nowrap  group-hover:text-blue dark:group-hover:text-dark-blue text-label-1 dark:text-dark-label-1">
              String
            </span>
            <span className="ml-1 flex h-[18px] items-center justify-center rounded-[10px] px-1.5 text-xs font-normal text-label-3 dark:text-dark-label-3 bg-fill-3 dark:bg-muted group-hover:text-blue dark:group-hover:text-dark-blue group-hover:bg-blue-0 dark:group-hover:bg-dark-blue-0">
              713
            </span>
          </a> */}
        </div>
        <div className='-mb-3 mt-4 flex justify-center'>
          <div className='flex h-6 w-6 items-center justify-center rounded-full bg-foreground'>
            <ChevronDownIcon className='size-4 stroke-2 text-background' />
          </div>
        </div>
      </div>

      <div className='m-4 my-8 flex gap-2'>
        <ProblemSetCard />
        <ProblemSetCard />
        <ProblemSetCard />
        <ProblemSetCard />
      </div>
    </div>
  )
}

export default ProblemSets
