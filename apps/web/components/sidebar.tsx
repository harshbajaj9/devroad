'use client'
import { cn } from '@/lib/utils'
import {
  BookmarkIcon,
  BookOpenIcon,
  BriefcaseIcon,
  Cog6ToothIcon,
  CogIcon,
  DevicePhoneMobileIcon,
  HomeIcon
} from '@heroicons/react/24/outline'
import {
  HomeIcon as ActiveHomeIcon,
  BookOpenIcon as ActiveBookOpenIcon,
  BriefcaseIcon as ActiveBriefcaseIcon,
  DevicePhoneMobileIcon as ActiveDevicePhoneMobileIcon,
  Cog6ToothIcon as ActiveCog6ToothIcon,
BookmarkIcon as ActiveBookmarkIcon,
} from '@heroicons/react/24/solid'

import { Bricolage_Grotesque, Poppins, Stick } from 'next/font/google'
import React, { useEffect } from 'react'
import { ModeToggle } from './theme-toggle-button'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const font = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin']
})
const font2 = Bricolage_Grotesque({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin']
})

const sidenavs = [
  {
    icon: (
      <HomeIcon className='size-5 text-muted-foreground duration-150 group-hover:scale-110 group-hover:text-muted' />
    ),
    title: 'Home',
    href: '/',
    activeIcon: (
      <ActiveHomeIcon className='size-5 text-background duration-150 group-hover:scale-110' />
    )
  },
  {
    icon: (
      <BookmarkIcon className='size-5 text-muted-foreground duration-150 group-hover:scale-110 group-hover:text-muted' />
    ),
    title: 'Saved',
    href: '/saved',
    activeIcon: (
      <ActiveBookmarkIcon className='size-5 text-background duration-150 group-hover:scale-110' />
    )
  },
  {
    icon: (
      <Cog6ToothIcon className='size-5 text-muted-foreground duration-150 group-hover:scale-110 group-hover:text-muted' />
    ),
    title: 'Account',
    href: '/account',
    activeIcon: (
      <ActiveCog6ToothIcon className='size-5 text-background duration-150 group-hover:scale-110' />
    )
  }
  // {
  //   icon: (
  //     <BookOpenIcon className='size-5 text-muted-foreground duration-150 group-hover:scale-110 group-hover:text-muted' />
  //   ),
  //   title: 'Learn',
  //   href: '/learn',
  //   activeIcon: (
  //     <ActiveBookOpenIcon className='size-5 text-background duration-150 group-hover:scale-110' />
  //   )
  // },
  // {
  //   icon: (
  //     <BriefcaseIcon className='size-5 text-muted-foreground duration-150 group-hover:scale-110 group-hover:text-muted' />
  //   ),
  //   title: 'Interview',
  //   href: '/job',
  //   activeIcon: (
  //     <ActiveBriefcaseIcon className='size-5 text-background duration-150 group-hover:scale-110' />
  //   )
  // },
  // {
  //   icon: (
  //     <DevicePhoneMobileIcon className='size-5 text-muted-foreground duration-150 group-hover:scale-110 group-hover:text-muted' />
  //   ),
  //   title: 'Explore',
  //   href: '/explore',
  //   activeIcon: (
  //     <ActiveDevicePhoneMobileIcon className='size-5 text-background duration-150 group-hover:scale-110' />
  //   )
  // }
]
const Sidebar = () => {
  const pathname = usePathname()

  return (
    // <div className="top-0 left-0 fixed z-10 h-screen min-w-[72px] bg-[#F5F5F5] dark:bg-[#120e17] p-1 pt-16 ">
    // <div className="top-0 left-0 fixed z-10 h-screen min-w-[72px] bg-[#F5F5F5] dark:bg-[#1a1b1c] p-1 pt-16 ">
    // <div className="top-0 left-0 fixed z-10 h-screen min-w-[72px] bg-[#F5F5F5] dark:bg-[#17181d]  dark:bg-[--background] p-1 pt-16 ">
    <div className='sticky left-0 top-0 z-10 h-screen min-w-[72px] border-r bg-background'>
      {/* <div className={cn('mx-4 py-4 drop-shadow-md')}>
        <a
          // className={styles.primary}
          href={`${process.env.NEXT_URL}`}
          // target="_blank"
          // rel="noopener noreferrer"
        >
          <img
            // className={styles.logo}
            src='/devroad5.png'
            alt='devroad logomark'
            width={32}
            height={32}
          />
        </a>
      </div> */}
      <div className='mt-4 flex flex-col justify-start gap-4'>
        {sidenavs.map(snav => {
          const isActive = pathname.startsWith(snav.href)
          return (
            <div
              key={snav.title}
              className='flex cursor-pointer flex-col items-center gap-1'
            >
              <div
                className={`group rounded-lg p-2 duration-150 hover:bg-foreground ${isActive ? 'bg-foreground' : ''}`}
              >
                <Link
                  className='duration-150 group-hover:scale-110'
                  href={snav.href}
                >
                  {isActive ? snav.activeIcon : snav.icon}
                </Link>
              </div>
              <div
                className={cn(
                  // "font-semibold text-[11px] text-zinc-700 dark:text-zinc-400",
                  'text-[11px] font-semibold text-muted-foreground',
                  font.className,
                  isActive ? 'text-foreground' : ''
                )}
              >
                {snav.title}
              </div>
            </div>
          )
        })}
      </div>
      {/* <div className='absolute bottom-0 left-0 mb-2 flex w-full flex-col items-center gap-2'>
        <div>
          <ModeToggle />
        </div>
        <div className='flex h-8 w-8 items-center justify-center rounded-full bg-green-900'>
          <div className='text-center text-yellow-300'>
            <div className='mb-1'>sp</div>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default Sidebar
