'use client'
import Post2 from '@/components/post2'
import ProblemSetCard from '@/components/repository-card'
import { cn } from '@/lib/utils'
import { Button, Tabs, TabsList, TabsTrigger } from '@repo/ui'
import { PlusCircleIcon } from 'lucide-react'
import { Poppins } from 'next/font/google'
import Link from 'next/link'
import React, { useState } from 'react'
import CreateProblemSetModal from '@/components/create-problemset-modal'
import Illustration2 from '@/components/svgs/illustration2'
import PSCard from '@/components/ps-card'
import { api } from '@/trpc/react'

const font = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin']
})
const HomePage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)

  // TODO: get all repositories of the user

  const { data: repositories, isLoading } =
    api.repository.getUserRepositories.useQuery()
  const { data: likedProblemSets, isLoading: isSavedReposLoading } =
    api.repository.getUserLikedProblemSets.useQuery()

  return (
    <main className='w-full gap-8'>
      <div className='flex flex-col gap-20'>
        {/* <div>
          <div className='mb-8 flex justify-between text-3xl'>
            <div className='flex items-center justify-start gap-4'>
              <div>Active Sessions</div>
            </div>
          </div>
          <div className='flex flex-wrap gap-4'>
            <ProblemSetCard />
          </div>
        </div> */}
        <div>
          <div className='mb-8 flex items-center gap-4 text-3xl'>
            <div className='flex items-center justify-start gap-4'>
              <h2 className='scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0'>
                My Problem Sets
              </h2>
              {/* <Tabs defaultValue='all' className='w-[400px]'>
                <TabsList>
                  <TabsTrigger value='all'>All</TabsTrigger>
                  <TabsTrigger value='shared'>Shared</TabsTrigger>
                  <TabsTrigger value='personal'>Mine</TabsTrigger>
                </TabsList>
              </Tabs> */}
            </div>
            <Button
              variant={'outline'}
              className='flex items-center gap-2'
              onClick={() => setIsCreateModalOpen(true)}
            >
              <PlusCircleIcon className='size-4' />
              Create New
            </Button>
          </div>
          <div className='flex flex-wrap justify-start gap-4'>
            {repositories &&
              repositories
                .filter(ps => ps.type === 'PROBLEM_SET')
                .map(ps => <PSCard key={ps.id} ps={ps} />)}

            {/* <ProblemSetCard />
            <ProblemSetCard />
            <ProblemSetCard />
            <ProblemSetCard /> */}
          </div>
        </div>
        <div>
          <div className='mb-8 flex items-center gap-4 text-3xl'>
            <div className='flex items-center justify-start gap-4'>
              <h2 className='scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0'>
                Liked Problem Sets
              </h2>
            </div>
          </div>
          <div className='flex flex-wrap justify-start gap-4'>
            {likedProblemSets &&
              likedProblemSets
                .filter(ps => ps.type === 'PROBLEM_SET')
                .map(ps => <PSCard key={ps.id} ps={ps} />)}
          </div>
        </div>
        {/* <div>
          <div className='mb-8 flex justify-between text-3xl'>
            <div className='flex items-center justify-start gap-4'>
              <h2 className='scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0'>
                Saved Problems Sets
              </h2>
            </div>
          </div>
          <div className='flex flex-wrap justify-start gap-4'>
            <PSCard />
            <PSCard />
            <PSCard />
            <PSCard />
            
          </div>
        </div> */}
      </div>
      {/* <div className='sticky right-10 top-8 h-fit w-60'>
        <div className='rounded-xl border border-border bg-background p-8 text-foreground'>
          <div className='mb-4 text-2xl'>Your Resources</div>
          <div className='flex flex-col items-start justify-start gap-2'>
            <div
              className={cn(
                'cursor-pointer text-sm hover:underline',
                font.className
              )}
            >
              <Link href={'/home/my-problem-sets'}>My Problem Sets</Link>
            </div>
            <div
              className={cn(
                'cursor-pointer text-sm hover:underline',
                font.className
              )}
            >
              <Link href={'/home/my-roadmaps'}>My Collections</Link>
            </div>
            <div
              className={cn(
                'cursor-pointer text-sm hover:underline',
                font.className
              )}
            >
              <Link href={'/home/my-roadmaps'}>My Roadmaps</Link>
            </div>
            <div className={cn('cursor-pointer text-sm', font.className)}>
              <Link href={'/learn/guides'}>My Guides</Link>
            </div>
            <div className={cn('cursor-pointer text-sm', font.className)}>
              <Link href={'/learn/tutorials'}>My Tutorials</Link>
            </div>
          </div>
        </div>
        <div className='mt-8 rounded-2xl bg-foreground'>
          <div className='flex h-80 items-center overflow-hidden text-9xl text-background/20'>
            Advert
          </div>
        </div>
      </div> */}
      <CreateProblemSetModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </main>
  )
}

export default HomePage
