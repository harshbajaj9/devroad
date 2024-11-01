import { cn } from '@/lib/utils'
import { Poppins } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ModeToggle } from './theme-toggle-button'

const font = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin']
})

const Nav = () => {
  return (
    <nav className='flex h-16 items-center justify-between border-b bg-backgroundalt px-4'>
      <div className='flex items-center justify-start gap-8'>
        <div className={cn('mx-4 py-4 drop-shadow-md')}>
          <a
            className='flex gap-2'
            // className={styles.primary}
            href={`${process.env.NEXT_URL}`}
            // target="_blank"
            // rel="noopener noreferrer"
          >
            {/* <img
        // className={styles.logo}
        src={'/devroad5.png'}
        alt='devroad logomark'
        width={32}
        height={32}
      /> */}
            <Image
              src='/devroad4.png'
              width={32}
              height={32}
              alt='Icon'
              className='block dark:hidden'
            />
            <Image
              src='/devroad5.png'
              width={32}
              height={32}
              alt='Icon'
              className='hidden dark:block'
            />
            <div
              className={cn(
                'pt-[2px] align-bottom text-2xl font-bold text-foreground drop-shadow-md',
                font.className
              )}
            >
              dev<span className='font-light'>road</span>.io
            </div>
          </a>
        </div>
        <div className='mt-1 flex gap-4'>
          <div
            className={cn(
              'cursor-pointer text-sm font-semibold text-foreground/80',
              font.className
            )}
          >
            <Link className={cn(font.className)} href={'/learn/problem-sets'}>
              Problem Sets
            </Link>
          </div>
          <div
            className={cn(
              'cursor-pointer text-sm font-semibold text-foreground/80',
              font.className
            )}
          >
            <Link className={cn(font.className)} href={'/learn/resources'}>
              Resources
            </Link>
          </div>
          <div
            className={cn(
              'cursor-pointer text-sm font-semibold text-foreground/80',
              font.className
            )}
          >
            <Link className={cn(font.className)} href={'/learn/roadmaps'}>
              Explore
            </Link>
          </div>
          <div
            className={cn(
              'cursor-pointer text-sm font-semibold text-foreground/80',
              font.className
            )}
          >
            <Link className={cn(font.className)} href={'/learn/guides'}>
              Questions
            </Link>
          </div>
          <div
            className={cn(
              'cursor-pointer text-sm font-semibold text-foreground/80',
              font.className
            )}
          >
            <Link className={cn(font.className)} href={'/learn/tutorials'}>
              Tutorials
            </Link>
          </div>
        </div>
      </div>
      <div className='flex items-center gap-2'>
        <div>
          <ModeToggle />
        </div>
        <div className='flex h-8 w-8 items-center justify-center rounded-full bg-green-900'>
          <div className='text-center text-yellow-300'>
            <div className='mb-1'>sp</div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav
