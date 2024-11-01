'use client'
import { useBreadCrumb } from '@/store'
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@repo/ui/components/ui/breadcrumb'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@repo/ui/components/ui/dropdown-menu'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

const items = [
  { href: '#', label: 'Home' },
  { href: '#', label: 'Documentation' },
  // { href: '#', label: 'Building Your Application' },
  // { href: '#', label: 'Data Fetching' },
  { href: '#', label: 'Caching and Revalidating' }
]
const ITEMS_TO_DISPLAY = 3

export function BreadcrumbDemo() {
  // const paths = usePathname()
  //   const pathNames = paths.split('/').filter( path => path )
  const { currentPath, setCurrentPath } = useBreadCrumb()
  useEffect(() => {}, [])
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.slice(0, items.length - 1).map(item => (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink
                className='text-xs font-semibold text-muted-foreground'
                href={item.href}
              >
                {item.label}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        ))}
        <BreadcrumbItem>
          <BreadcrumbLink
            className='text-xs font-semibold text-muted-foreground'
            href={items.at(-1)?.href}
          >
            {items.at(-1)?.label}
          </BreadcrumbLink>
        </BreadcrumbItem>
        {/* <BreadcrumbItem>
          <BreadcrumbLink href='/'>Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger className='flex items-center gap-1'>
              <BreadcrumbEllipsis className='h-4 w-4' />
              <span className='sr-only'>Toggle menu</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='start'>
              <DropdownMenuItem>Documentation</DropdownMenuItem>
              <DropdownMenuItem>Themes</DropdownMenuItem>
              <DropdownMenuItem>GitHub</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href='/docs/components'>Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem> */}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
