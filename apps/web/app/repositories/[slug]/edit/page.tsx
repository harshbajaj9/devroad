import React from 'react'
import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import { auth } from '@/auth'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Textarea
} from '@repo/ui'
import { QuestionMarkCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { CalendarDaysIcon } from 'lucide-react'
import EditRepositoryItems from './edit-repo-items'
import EditRepositoryHeader from './edit-repo-header'

const EditRepositoryPage = async ({ params }: { params: { slug: string } }) => {
  const repository = await prisma.repository.findFirst({
    where: { id: params.slug }
  })
  if (!repository) return notFound()
  const session = await auth()
  const isOwner = session?.user.id === repository.creatorId
  if (!isOwner) return notFound()
  return (
    <>
      <EditRepositoryHeader repository={repository} />
      {/* <div className='border-b-2'></div> */}
      <EditRepositoryItems repository={repository} />

      {/* <div className='h-96 w-full'>
    <div
      role='button'
      tabindex='0'
      className='button-dQdc svReaderFullscreenButton'
      data-variant='default'
      data-accent='default'
      data-size='default'
      href=''
      title='Fullscreen'
      fdprocessedid='vvvz2t'
    >
      <span className='icon-VKRw' data-size='' data-enlarge=''>
        <svg>
          <use xlink:href='#fullscreen'></use>
          </svg>
      </span>
    </div>
    <iframe
      plugins='true'
      allow='fullscreen; clipboard-write'
      loading='eager'
      tabindex='-1'
      className='iframe-dQQP webView-MyQq fullscreen h-screen w-full'
      src='https://neetcode.io/problems/duplicate-integer'
    ></iframe>
  </div> */}
    </>
  )
}

export default EditRepositoryPage
