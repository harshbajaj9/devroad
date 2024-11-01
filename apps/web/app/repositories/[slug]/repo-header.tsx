import { cn } from '@/lib/utils'
import {
  BookmarkIcon,
  CalendarDaysIcon,
  ChatBubbleBottomCenterTextIcon,
  CheckBadgeIcon,
  ClipboardDocumentListIcon,
  FolderIcon,
  HeartIcon
} from '@heroicons/react/24/outline'
import { Repository } from '@repo/database'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@repo/ui'

interface RepositoryHeaderProps {
  repository: Repository
}
const RepositoryHeader = ({ repository }: RepositoryHeaderProps) => {
  return (
    <div className='flex gap-4 pb-2'>
      <div
        className={cn(
          'flex flex-[3] gap-8',
          'rounded-md border bg-background p-8',
          'shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'
        )}
      >
        <div className='overflow-hidden rounded-md'>
          <img
            className='h-full w-80'
            src={
              'https://tiptap.dev/docs/_next/static/media/content-templates.bf560925.png'
            }
            width={'384px'}
            height={'384px'}
          />
        </div>
        <div className='flex-1'>
          <div className='flex justify-end px-8'></div>
          <div className='mb-2 flex items-center gap-2'>
            {/* <Select value={repository.type}>
              <SelectTrigger className='h-6 w-[140px] border-foreground bg-transparent text-xs font-semibold'>
                <SelectValue placeholder='Repo Type' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value='PROBLEM_SET'>PROBLEM SET</SelectItem>
                  <SelectItem value='COLLECTION'>COLLECTION</SelectItem>
                  <SelectItem value='ROADMAP'>ROADMAP</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select> */}

            <HoverCard>
              <HoverCardTrigger asChild>
                <Badge
                  className='cursor-default rounded-md border-foreground'
                  variant='outline'
                >
                  {repository.type}
                </Badge>
              </HoverCardTrigger>
              <HoverCardContent
                align={'start'}
                className='mt-4 w-80 bg-background'
              >
                <div className='grid gap-4'>
                  <div className='space-y-2'>
                    <h4 className='font-medium leading-none'>Problem Set</h4>
                    <p className='text-sm text-muted-foreground'>
                      Problem Set allows you to start a session and keep track
                      of your progress.
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
          <h1
            className={cn(
              'mb-4 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'
            )}
          >
            {repository.title}
          </h1>
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant='link' className='pl-0 text-muted-foreground'>
                @{repository.creatorName}
              </Button>
            </HoverCardTrigger>
            <HoverCardContent align={'start'} className='w-80'>
              <div className='flex justify-between space-x-4'>
                <Avatar>
                  <AvatarImage src='https://github.com/vercel.png' />
                  <AvatarFallback>VC</AvatarFallback>
                </Avatar>
                <div className='space-y-1'>
                  <h4 className='text-sm font-semibold'>
                    @{repository.creatorName}
                  </h4>
                  <p className='text-sm'>The dude who owns @devroad.</p>
                  <div className='flex items-center pt-2'>
                    <CalendarDaysIcon className='mr-2 h-4 w-4 opacity-70' />
                    <span className='text-xs text-muted-foreground'>
                      Joined December 2021
                    </span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
      <div
        className={cn(
          'flex flex-[1] flex-col justify-center rounded-md border bg-background p-8',
          'shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'
        )}
      >
        <div className='my-4 flex h-16 justify-around gap-3'>
          <div className='flex w-14 flex-col items-center justify-center gap-2 text-muted-foreground'>
            <ClipboardDocumentListIcon className='size-5' />
            <p className='text-xs'>
              <span className='font-semibold'>120</span> items
            </p>
          </div>

          <div className='flex w-14 flex-col items-center justify-center gap-2 text-muted-foreground'>
            <FolderIcon className='size-5' />
            <p className='text-xs'>
              <span className='font-semibold'>7</span> sections
            </p>
          </div>

          <div className='flex w-14 flex-col items-center justify-center gap-2 text-muted-foreground'>
            <CheckBadgeIcon className='size-5' />
            <p className='text-xs'>
              <span className='font-semibold'>Verified</span>
            </p>
          </div>
        </div>

        <div className='flex cursor-pointer justify-around py-1 text-muted-foreground'>
          <div className='flex items-center gap-1 text-pink-500'>
            <HeartIcon className='size-5' />
            <span className={cn('text-xs font-semibold')}>210</span>
          </div>
          <div className='flex cursor-pointer items-center gap-1 text-primary'>
            <ChatBubbleBottomCenterTextIcon className='size-5' />
            <span className={cn('text-xs font-semibold')}>21</span>
          </div>
          <div className='flex cursor-pointer items-center gap-1 text-foreground'>
            <BookmarkIcon className='size-5' />
            <span className={cn('text-xs font-semibold')}>130</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RepositoryHeader
