import { prisma } from '@/lib/db'
import {
  CalendarDaysIcon,
  QuestionMarkCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
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
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea
} from '@repo/ui'
import CollectionItems from './repo-items'
import { auth } from '@/auth'
import EditCollectionButton from '../edit-repo-button'
import { notFound } from 'next/navigation'
import RepositoryHeader from './repo-header'
import RepositoryItems from './repo-items'
import EditRepositoryHeader from './edit/edit-repo-header'
import EditRepositoryItems from './edit/edit-repo-items'

export default async function Page({ params }: { params: { slug: string } }) {
  const repository = await prisma.repository.findFirst({
    where: { id: params.slug }
  })
  if (!repository) notFound()
  // const user = await prisma.user.findFirst({
  //   where: { id: repositorycreatorId }
  // })

  const session = await auth()
  const isOwner = session?.user.id === repository.creatorId
  return (
    <main
      className='bg-backgroundalt p-16'
      // className='bg-transparent bg-[linear-gradient(180deg,#FFFFFF_0%,#F0EBE3_100%)] p-8 dark:bg-[linear-gradient(0deg,#31363c_0%,#222831_100%)]'
    >
      <>
        <EditRepositoryHeader isOwner={isOwner} repository={repository} />
        <EditRepositoryItems isOwner={isOwner} repository={repository} />
      </>
    </main>
  )
}
