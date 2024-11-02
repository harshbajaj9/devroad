import { cn, getCatById, getRoleById } from '@/lib/utils'

// import RepositoryCard from '@/components/repository-card'
import { auth } from '@/auth'
import { getProblemSets } from '@/server/api/routers/utils/repositories-utils'
import PSCard from '../../components/ps-card'
import PSPagination from './ps-pagination'
import SearchFilterComponent from './search-filter-component'

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

const ProblemSets = async ({
  searchParams
}: {
  searchParams: {
    role?: string
    company?: string
    cat?: string
    sort?: 'popular' | 'latest'
    page?: string
    text?: string
  }
}) => {
  const session = await auth()
  const { problemSets, totalPages } = await getProblemSets({
    text: searchParams['text'],
    page: Number(searchParams['page']),
    sort: searchParams['sort'] ?? 'popular',
    categoryFilter: searchParams['cat'],
    userId: session?.user.id
    // companyFilter: searchParams.company
    // roleFilter: searchParams.role
  })
  // const repositories = await prisma.repository.findMany()
  // console.log('repositories>', problemSets)
  return (
    <main className='bg-backgroundalt'>
      <div className='bg-background p-16'>
        <div className='mx-auto max-w-screen-2xl'>
          {/* <div className='p-16'></div> */}
          <h1
            className={cn(
              'mb-4 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'
            )}
          >
            {searchParams['sort'] === 'latest' ? 'Latest ' : 'Popular '}
            {searchParams['cat'] &&
              `${getCatById(searchParams['cat'])?.value} `}
            Problem Sets{' '}
            {searchParams['role'] &&
              `for ${getRoleById(searchParams['role'])?.value}`}
          </h1>
          {/* <p className='mb-4 text-gray-600'>
          Review this list of 3,320 interview questions and answers verified by
          hiring managers and candidates.
        </p> */}
          <p className='mb-4 text-muted-foreground'>
            Get your hands on popular Problem Sets across different platforms
            and categories for your preparation.
          </p>
        </div>
      </div>
      <SearchFilterComponent
        // roleId={searchParams['role']}
        // company={searchParams['company']}
        catId={searchParams['cat']}
        sortId={searchParams['sort'] ?? 'popular'}
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
      <div className='min-h-[600px]'>
        <div className='flex flex-wrap justify-center gap-8 px-24 py-8'>
          {problemSets.map(ps => (
            <PSCard
              ps={ps}
              // title={repo.title}
              // creatorName={repo.creatorName}
              id={ps.id}
            />
          ))}
        </div>
      </div>
      <PSPagination
        totalPages={totalPages}
        initPage={searchParams['page'] ?? '1'}
      />
    </main>
  )
}

export default ProblemSets
