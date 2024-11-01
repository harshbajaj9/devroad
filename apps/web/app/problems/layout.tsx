import type { Metadata } from 'next'
import localFont from 'next/font/local'
// import "./globals.css";
import styles from './page.module.css'

import '@repo/ui/styles/globals.css'
import { Bricolage_Grotesque, Poppins } from 'next/font/google'
import { cn } from '@/lib/utils'
import {
  Button,
  Input,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@repo/ui'
import Sidebar from '@/components/sidebar'
import { Search } from 'lucide-react'
import Link from 'next/link'

const font = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin']
})
const font2 = Bricolage_Grotesque({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin']
})
export const metadata: Metadata = {
  title: 'Explore | devroad.io',
  description:
    'All in one super app to share your Roadmaps, Experiences, Insights and Collections.'
}

export default function ExploreLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className=''>
      {/* <div className="h-[58px] bg-[#F5F5F5] dark:bg-[#120e17] flex items-center justify-start gap-8 pl-8"> */}
      {/* <div className="h-[58px] bg-[#F5F5F5] dark:bg-[#1a1b1c] flex items-center justify-start gap-8 pl-8"> */}

      {/* <nav className='flex h-[58px] items-center justify-start gap-8 bg-backgroundalt pl-8'>
        <div className={cn('cursor-pointer text-sm', font.className)}>
          <Link href={'/learn/problem-sets'}>Problem Sets</Link>
        </div>
        <div className={cn('cursor-pointer text-sm', font.className)}>
          <Link href={'/learn/collections'}>Collections</Link>
        </div>
        <div className={cn('cursor-pointer text-sm', font.className)}>
          <Link href={'/learn/roadmaps'}>Roadmaps</Link>
        </div>
        <div className={cn('cursor-pointer text-sm', font.className)}>
          <Link href={'/learn/guides'}>Guides</Link>
        </div>
        <div className={cn('cursor-pointer text-sm', font.className)}>
          <Link href={'/learn/tutorials'}>Tutorials</Link>
        </div>
      </nav> */}
      {/* <div className="flex justify-start items-center h-[58px]"> */}
      <div className='flex items-center justify-start'>
        {/* <Tabs
          defaultValue="projects"
          className="w-[400px] bg-[#F5F5F5] dark:bg-[#17181d] flex items-center justify-start gap-8 pl-8"
        >
          <TabsList className="dark:bg-[#21222a]">
            <TabsTrigger
              className="dark:data-[state=active]:bg-[#17181d]"
              value="projects"
            >
              Projects
            </TabsTrigger>
            <TabsTrigger
              className="dark:data-[state=active]:bg-[#17181d]"
              value="collections"
            >
              Collections
            </TabsTrigger>
            <TabsTrigger
              className="dark:data-[state=active]:bg-[#17181d]"
              value="roadmaps"
            >
              Roadmaps
            </TabsTrigger>
          </TabsList>
          <TabsContent value="projects">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="collections">
          Change your password here.
        </TabsContent>
        <TabsContent value="roadmaps">Change your password here.</TabsContent>
        </Tabs>
        <div className="flex dark:bg-[#21222a] border rounded-md items-center px-2 gap-2">
          <Search color="#9a9a9a" />
          <Input className="dark:bg-[#21222a] max-w-80 border-none" />
        </div> */}
      </div>
      {/* <div className="shadow-[-2px_-2px_120px_rgba(0,0,0,0.25)] rounded-md p-8 mr-2 mb-2 bg-[#FFFFFF] dark:bg-[#1e1726]"> */}
      {/* <div className="shadow-[-2px_-2px_120px_rgba(0,0,0,0.25)] rounded-md p-8 mr-2 mb-2 bg-[#FFFFFF] dark:bg-[#1a1b1c] border dark:border-gray-700"> */}
      {/* <div className="rounded-md p-8 mr-2 mb-2 bg-[#FFFFFF] dark:bg-[#17181d] border dark:border-gray-700"> */}
      <div className='bg-background p-8'>{children}</div>
    </div>
  )
}
