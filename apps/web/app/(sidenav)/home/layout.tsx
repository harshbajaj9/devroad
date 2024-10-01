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
      <div className='bg-backgroundalt p-8'>{children}</div>
    </div>
  )
}
