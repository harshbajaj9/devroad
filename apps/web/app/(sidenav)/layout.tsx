import type { Metadata } from 'next'
import localFont from 'next/font/local'
// import "./globals.css";
import styles from './page.module.css'

import '@repo/ui/styles/globals.css'
import { Bricolage_Grotesque, Poppins } from 'next/font/google'
import { cn } from '@/lib/utils'
import { Button, Input } from '@repo/ui'
import Sidebar from '@/components/sidebar'

const font = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin']
})
const font2 = Bricolage_Grotesque({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin']
})
// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
// });

export const metadata: Metadata = {
  title: 'devroad.io',
  description:
    'All in one super app to share your Roadmaps, Experiences, Insights and Collections.'
}

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className='flex max-h-[1920px] w-full items-start justify-between'>
      <div className='h-full w-full bg-backgroundalt bg-[radial-gradient(hsl(var(--muted))_1px,transparent_1px)] [background-size:16px_16px]'>
        {children}
      </div>
    </main>
  )
}
