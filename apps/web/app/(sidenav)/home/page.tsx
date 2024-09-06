'use client'
import Post2 from '@/components/post2'
import ProblemSetCard from '@/components/ps-card'
import { cn } from '@/lib/utils'
import { Button, Tabs, TabsList, TabsTrigger } from '@repo/ui'
import { PlusCircleIcon } from 'lucide-react'
import { Poppins } from 'next/font/google'
import Link from 'next/link'
import React, { useState } from 'react'
import CreateProblemSetModal from '@/components/create-problemset-modal'

const font = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin']
})
const HomePage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)

  return (
    <main className='grid w-full grid-cols-2 gap-8'>
      <div className='col-span-full flex flex-col gap-20'>
        <div>
          <div className='mb-8 flex justify-between text-3xl'>
            <div className='flex items-center justify-start gap-4'>
              <div>Active Sessions</div>
              {/* <Tabs defaultValue="all" className="w-[400px]">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="shared">Shared</TabsTrigger>
                  <TabsTrigger value="personal">Mine</TabsTrigger>
                </TabsList>
              </Tabs> */}
            </div>
          </div>
          <div className='flex flex-wrap gap-4'>
            <ProblemSetCard />
          </div>
        </div>
        <div>
          <div className='mb-8 flex justify-between text-3xl'>
            <div className='flex items-center justify-start gap-4'>
              <div>My Problem Sets</div>
              <Tabs defaultValue='all' className='w-[400px]'>
                <TabsList>
                  <TabsTrigger value='all'>All</TabsTrigger>
                  <TabsTrigger value='shared'>Shared</TabsTrigger>
                  <TabsTrigger value='personal'>Mine</TabsTrigger>
                </TabsList>
              </Tabs>
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
          <div className='flex flex-wrap gap-4'>
            <ProblemSetCard />
            <ProblemSetCard />
            <ProblemSetCard />
          </div>
        </div>
        <div>
          <div className='mb-8 text-3xl'>My Collections</div>
          <div className='flex flex-wrap gap-4'>
            <ProblemSetCard />
            <ProblemSetCard />
            <ProblemSetCard />
          </div>
        </div>
        <div>
          <div className='mb-8 text-3xl'>My Roadmaps</div>
          <div className='flex flex-wrap gap-4'>
            <ProblemSetCard />
            <ProblemSetCard />
            <ProblemSetCard />
          </div>
        </div>
      </div>
      <div className='sticky right-10 top-8 col-start-3 h-fit w-60'>
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
      </div>
      {isCreateModalOpen && (
        <div className='fixed inset-0 z-10 bg-foreground/10'></div>
      )}
      <CreateProblemSetModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </main>
  )
}

export default HomePage
