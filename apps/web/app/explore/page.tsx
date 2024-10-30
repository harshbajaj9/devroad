import Post2 from '@/components/post2'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage, Badge, Button } from '@repo/ui'
import { Poppins } from 'next/font/google'
import Image from 'next/image'
import React from 'react'

const roadmaps = [
  { text: 'DSA Problem Sets' },
  { text: 'Frontend Roadmaps' },
  { text: 'UI/UX Roadmaps' },
  { text: 'SDE Interview Roadmaps' },
  { text: 'PM Interview Roadmap' },
  { text: 'System Design Roadmaps' }
]
const font = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin']
})
const page = () => {
  return (
    <div className=''>
      <div className='flex flex-wrap gap-6'>
        <Post2 />
        <Post2 />
        <Post2 />
        <Post2 />
      </div>
      <div className={cn('m-4 text-3xl font-semibold', font.className)}>
        Top Categories
      </div>
      <div className='m-4 flex flex-wrap gap-4'>
        {roadmaps.map((roadmap, id) => (
          <Badge key={id} className='cursor-pointer'>
            {roadmap.text}
          </Badge>
        ))}
      </div>
      <div className='flex'>roadmaplists</div>
      <div className='flex'>
        <Button className='font-bold dark:bg-[#fafafa] dark:hover:bg-[#7474ff] dark:hover:text-[#17181d]'>
          Let's go
        </Button>
      </div>
      <div className='my-8 w-full border'></div>
      <div className='flex justify-center gap-4'>
        <div>
          <div className='flex justify-center'>
            <div className='m-2 min-h-40 min-w-40 rounded bg-yellow-400'></div>
            <div className='m-2 min-h-40 min-w-40 rounded bg-orange-500'></div>
            <div className='m-2 min-h-40 min-w-40 rounded bg-[#ff4a37]'></div>
          </div>
          <div className='flex justify-center'>
            <div className='m-2 min-h-40 min-w-40 rounded bg-[#f2295d]'></div>
            <div className='m-2 min-h-40 min-w-40 rounded bg-[#ae1b8e]'></div>
            <div className='m-2 min-h-40 min-w-40 rounded bg-[#6366f1]'></div>
          </div>
          <div className='flex justify-center'>
            <div className='m-2 min-h-40 min-w-40 rounded bg-[#2ab327]'></div>
            <div className='m-2 min-h-40 min-w-40 rounded bg-[#8037ff]'></div>
            <div className='m-2 min-h-40 min-w-40 rounded bg-[#7474ff]'></div>
          </div>
          <div className='flex justify-center'>
            <div className='m-2 min-h-40 min-w-40 rounded bg-[#3aff37]'></div>
            <div className='m-2 min-h-40 min-w-40 rounded bg-[#2ab327]'></div>
            <div className='m-2 min-h-40 min-w-40 rounded bg-[#3d65ff]'></div>
          </div>
        </div>
        <div>
          <div className='flex justify-center'>
            <div className='m-2 min-h-40 min-w-40 rounded bg-[#ff8e10]'></div>
            <div className='m-2 min-h-40 min-w-40 rounded bg-[#ff6b23]'></div>
            <div className='m-2 min-h-40 min-w-40 rounded bg-[#ff4a37]'></div>
          </div>
          <div className='flex justify-center'>
            <div className='m-2 min-h-40 min-w-40 rounded bg-[#f2295d]'></div>
            <div className='m-2 min-h-40 min-w-40 rounded bg-[#ae1b8e]'></div>
            <div className='m-2 min-h-40 min-w-40 rounded bg-[#6366f1]'></div>
          </div>
          <div className='flex justify-center'>
            <div className='m-2 min-h-40 min-w-40 rounded bg-[#2ab327]'></div>
            <div className='m-2 min-h-40 min-w-40 rounded bg-[#8037ff]'></div>
            <div className='m-2 min-h-40 min-w-40 rounded bg-[#7474ff]'></div>
          </div>
          <div className='flex justify-center'>
            <div className='m-2 min-h-40 min-w-40 rounded bg-[#3aff37]'></div>
            <div className='m-2 min-h-40 min-w-40 rounded bg-[#2ab327]'></div>
            <div className='m-2 min-h-40 min-w-40 rounded bg-[#3d65ff]'></div>
          </div>
        </div>
      </div>

      <div className='my-6 border-b'></div>

      <div className='flex justify-center'>
        <div className='m-2 min-h-40 min-w-40 rounded bg-[#3d65ff]'></div>
        <div className='m-2 min-h-40 min-w-40 rounded bg-[#4733d1]'></div>
        <div className='m-2 min-h-40 min-w-40 rounded bg-[#a823dc]'></div>
      </div>
      <div className='flex justify-center'>
        <div className='m-2 min-h-40 min-w-40 rounded bg-[#ff4fa0]'></div>
        <div className='m-2 min-h-40 min-w-40 rounded bg-[#4ee4c9]'></div>
        <div className='m-2 min-h-40 min-w-40 rounded bg-[#6366f1]'></div>
      </div>
      <div className='flex justify-center'>
        <div className='m-2 min-h-40 min-w-40 rounded bg-[#2ab327]'></div>
        <div className='m-2 min-h-40 min-w-40 rounded bg-[#8037ff]'></div>
        <div className='m-2 min-h-40 min-w-40 rounded bg-[#7474ff]'></div>
      </div>
      <div className='flex justify-center'>
        <div className='m-2 min-h-40 min-w-40 rounded bg-[#3aff37]'></div>
        <div className='m-2 min-h-40 min-w-40 rounded bg-[#2ab327]'></div>
        <div className='m-2 min-h-40 min-w-40 rounded bg-[#7474ff]'></div>
      </div>
    </div>
  )
}

export default page
