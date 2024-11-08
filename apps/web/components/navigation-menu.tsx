'use client'

import * as React from 'react'
import Link from 'next/link'

// import { Icons } from '@repo/ui/components/ui/icons'

const font = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin']
})
const font2 = Jost({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin']
})
import {
  NavigationMenu,
  NavigationMenuContent,
  navigationMenuContentStyle,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@repo/ui/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import { Jost, Poppins } from 'next/font/google'
import Image from 'next/image'
import {
  BriefcaseIcon,
  BuildingOffice2Icon,
  ChatBubbleLeftRightIcon,
  CircleStackIcon,
  ClipboardDocumentListIcon,
  CodeBracketIcon,
  ComputerDesktopIcon,
  CpuChipIcon,
  PuzzlePieceIcon
} from '@heroicons/react/24/outline'
import LoginModal from './auth/login-modal'
import { ModeToggle } from './theme-toggle-button'
import { auth } from '@/auth'
import { useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage, Button } from '@repo/ui'
import ProfileDropdown from './profile-dropdown'
import { useLoginModalState } from '@/store'
import { parser } from '@/actions/add-dsa-problems'

const questionComponents: {
  icon: any
  title: string
  href: string
  description: string
}[] = [
  {
    icon: <CircleStackIcon className='size-5 text-primary' />,
    title: 'SQL Questions',
    href: '/docs/primitives/alert-dialog',
    description:
      'A modal dialog that interrupts the user with important content and expects a response.'
  },
  {
    icon: <ComputerDesktopIcon className='size-5 text-primary' />,
    title: 'Frontend Coding Questions',
    href: '/docs/primitives/hover-card',
    description: 'For sighted users to preview content available behind a link.'
  },
  {
    icon: <ChatBubbleLeftRightIcon className='size-5 text-primary' />,
    title: 'Behaviorial',
    href: '/docs/primitives/progress',
    description:
      'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.'
  },
  {
    icon: <CpuChipIcon className='size-5 text-primary' />,
    title: 'Machine Learning',
    href: '/docs/primitives/scroll-area',
    description: 'Visually or semantically separates content.'
  },
  {
    icon: <PuzzlePieceIcon className='size-5 text-primary' />,
    title: 'System Design',
    href: '/docs/primitives/tabs',
    description:
      'A set of layered sections of content—known as tab panels—that are displayed one at a time.'
  },
  {
    icon: <CodeBracketIcon className='size-5 text-primary' />,
    title: 'DSA',
    href: '/docs/primitives/tooltip',
    description:
      'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.'
  },
  {
    icon: <ClipboardDocumentListIcon className='size-5 text-primary' />,
    title: 'PM Guesstimates',
    href: '/docs/primitives/tooltip',
    description:
      'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.'
  }
]

const solveSubMenuItems: {
  title: string
  icon: any
  href: string
  description: string
}[] = [
  // {
  //   title: 'Problem Sets',
  //   icon: <ClipboardDocumentListIcon className='size-5 text-primary' />,
  //   // href: '/repositories?type=ps',
  //   href: '/problem-sets',
  //   description: 'Explore problem sets and get better at solving them.'
  // },
  // {
  //   title: 'Collections',
  //   icon: <ClipboardDocumentListIcon className='size-5 text-primary' />,
  //   // href: '/repositories?type=cs',
  //   href: '/repositories',
  //   description:
  //     'Make the most out of collections, extensible sets of resources created by the community.'
  // },
  // {
  //   title: 'Road Maps',
  //   icon: <ClipboardDocumentListIcon className='size-5 text-primary' />,
  //   // href: '/repositories?type=rs',
  //   href: '/repositories',
  //   description:
  //     'Find road maps for a targeted approach for preparation and upskilling.'
  // },
  {
    title: 'DSA Problem Sets',
    icon: <ClipboardDocumentListIcon className='size-5 text-primary' />,
    // href: '/repositories?type=ps',
    href: '/problemsets?cat=algorithms&sort=popular',
    description: 'Find all problem sets on Data Structures and Algorithms.'
  },
  // {
  //   title: 'Resources',
  //   icon: <ClipboardDocumentListIcon className='size-5 text-primary' />,
  //   href: '/resources',
  //   description:
  //     'Get exposed to blogs, youtube channels, courses, websites etc.'
  // },
  {
    title: 'Problems',
    icon: <ClipboardDocumentListIcon className='size-5 text-primary' />,
    href: '/problems',
    description:
      'Find assorted problems from various platforms covering a range of categories.'
  }
  // {
  //   title: 'Tooltip',
  //   icon: <ClipboardDocumentListIcon className='size-5 text-primary' />,

  //   href: '/docs/primitives/tooltip',
  //   description:
  //     'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.'
  // }
]

export function NavigationMenuDemo() {
  const { data: session, status } = useSession()
  const { isLoginModalOpen, setIsLoginModalOpen } = useLoginModalState()
  const handleParser = async () => {
    console.log('parser')
    await parser()
  }
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          {/* <div className={cn('mx-4 py-4 drop-shadow-md')}> */}
          <NavigationMenuItem className='mx-4 flex cursor-pointer gap-2 py-4 drop-shadow-md'>
            <Link
              href={`${process.env.NEXT_URL || '/'}`}
              legacyBehavior
              passHref
            >
              <NavigationMenuLink
              // className={navigationMenuTriggerStyle()}
              >
                {/* <Image
                src='/devroad4.png'
                width={32}
                height={32}
                alt='Icon'
                className='block dark:hidden'
                unoptimized={true}
              />
              <Image
                src='/devroad5.png'
                width={32}
                height={32}
                alt='Icon'
                className='hidden dark:block'
                unoptimized={true}
              /> */}
                <div
                  className={cn(
                    'align-bottom text-2xl font-bold text-foreground'
                  )}
                >
                  devroad
                </div>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          {/* </div> */}
          {/* <NavigationMenuItem>
            <Link href='/problem-sets' legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  'cursor-pointer text-sm font-semibold text-foreground/80',
                  
                )}
              >
                Problem Sets
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href='/problems' legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  'cursor-pointer text-sm font-semibold text-foreground/80',
                  
                )}
              >
                Problems
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem> */}
          {/* <NavigationMenuItem>
            <NavigationMenuTrigger
              className={cn(
                navigationMenuTriggerStyle(),
                'cursor-pointer text-sm font-semibold text-foreground/80',
                
              )}
            >
              Solve
            </NavigationMenuTrigger>
            <NavigationMenuContent
              className={cn(navigationMenuContentStyle(), 'left-0')}
            >
              <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
                {solveSubMenuItems.map(component => (
                  <ListItem
                    icon={component.icon}
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
              <Link
                // className='w-full border-t'
                href='/problem-sets'
                legacyBehavior
                passHref
              >
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    'w-full cursor-pointer border-t text-sm font-semibold text-foreground/80',
                    
                  )}
                >
                  Browse All Resources
                </NavigationMenuLink>
              </Link>
            </NavigationMenuContent>
          </NavigationMenuItem> */}
          <NavigationMenuItem>
            <Link
              href='/problemsets?cat=algorithms&sort=popular'
              legacyBehavior
              passHref
            >
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  'cursor-pointer text-sm font-semibold text-foreground/80'
                )}
              >
                DSA Problem Sets
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          {/* <NavigationMenuItem>
            <NavigationMenuTrigger
              className={cn(
                navigationMenuTriggerStyle(),
                'cursor-pointer text-sm font-semibold text-foreground/80',
                
              )}
            >
              Explore
            </NavigationMenuTrigger>
            <NavigationMenuContent
              className={cn(navigationMenuContentStyle(), '')}
            >
              <ul className='grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
                <li className='row-span-3'>
                  <NavigationMenuLink asChild>
                    <a
                      className='flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md'
                      href='/'
                    >
                      <Icons.logo className='h-6 w-6' />
                      <div className='mb-2 mt-4 text-lg font-medium'>
                        shadcn/ui
                      </div>
                      <p className='text-sm leading-tight text-muted-foreground'>
                        Beautifully designed components built with Radix UI and
                        Tailwind CSS.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href='/docs' title='Introduction'>
                  Re-usable components built using Radix UI and Tailwind CSS.
                </ListItem>
                <ListItem href='/docs/installation' title='Installation'>
                  How to install dependencies and structure your app.
                </ListItem>
                <ListItem href='/docs/primitives/typography' title='Typography'>
                  Styles for headings, paragraphs, lists...etc
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem> */}
          {/* <NavigationMenuItem>
            <NavigationMenuTrigger
              className={cn(
                navigationMenuTriggerStyle(),
                'cursor-pointer text-sm font-semibold text-foreground/80',
                
              )}
            >
              Job hunt
            </NavigationMenuTrigger>
            <NavigationMenuContent
              className={cn(navigationMenuContentStyle(), '')}
            >
              <ul className='grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
                <li className='row-span-3'>
                  <NavigationMenuLink asChild>
                    <a
                      className='flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md'
                      href='/jobs'
                    >
                      <div
                        className={cn(
                          'mb-2 mt-4 text-lg font-medium',
                          
                        )}
                      >
                        Jobs archive
                      </div>
                      <p
                        className={cn(
                          'text-sm leading-tight text-muted-foreground',
                          
                        )}
                      >
                        Collected from various sources across internet, stay
                        updated!
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>

                <ListItem
                  href='/companies'
                  title='Companies'
                  icon={<BuildingOffice2Icon className='size-5 text-primary' />}
                >
                  How to install dependencies and structure your app.
                </ListItem>
                <ListItem
                  href='/interview-questions'
                  title='Interview Questions'
                  icon={
                    <ClipboardDocumentListIcon className='size-5 text-primary' />
                  }
                >
                  Interview questions across categories and companies
                </ListItem>
                <ListItem
                  href='/interview-experiences'
                  title='Interview Experiences'
                  icon={<BriefcaseIcon className='size-5 text-primary' />}
                >
                  Grab your popcorn to watch world's most thrilling
                  documentaries
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem> */}
          {/* <NavigationMenuItem>
            <NavigationMenuTrigger
              className={cn(
                navigationMenuTriggerStyle(),
                'cursor-pointer text-sm font-semibold text-foreground/80',
                
              )}
            >
              Questions
            </NavigationMenuTrigger>
            <NavigationMenuContent
              className={cn(navigationMenuContentStyle(), 'left-0')}
            >
              <ul className='grid w-[400px] gap-0 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
                {questionComponents.map(component => (
                  <ListItem
                    icon={component.icon}
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
              <Link
                // className='w-full border-t'
                href='/problem-sets'
                legacyBehavior
                passHref
              >
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    'h-12 w-full cursor-pointer border-t text-sm font-semibold text-foreground/80 hover:text-primary',
                    
                  )}
                >
                  Browse All Questions
                </NavigationMenuLink>
              </Link>
            </NavigationMenuContent>
          </NavigationMenuItem> */}
          {/* <NavigationMenuItem>
          <Link href='/docs' legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                'cursor-pointer text-sm font-semibold text-foreground/80',
                font.className
              )}
            >
              Documentation
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem> */}
        </NavigationMenuList>
      </NavigationMenu>
      <div className='flex items-center gap-4'>
        {session && session.user.role === 'ADMIN' && (
          <div>
            <Button className='w-24' onClick={() => handleParser()}>
              Parser
            </Button>
          </div>
        )}
        <div>
          <ModeToggle />
        </div>
        {session ? (
          <div className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-green-900'>
            <div className='text-center text-yellow-300'>
              {/* <div className='mb-1'>{session.user.email}</div> */}

              {/* <Avatar>
                <AvatarImage
                  src={session.user.image ?? undefined}
                  alt={session.user.name ?? undefined}
                />
                <AvatarFallback>{session.user.email}</AvatarFallback>
              </Avatar> */}
              <ProfileDropdown />
              {/* <ProfileDropdown
                imgSrc={session.user.image}
                name={session.user.name}
                email={session.user.email}
              /> */}
            </div>
          </div>
        ) : (
          <div>
            <Button
              className='w-24 rounded-full'
              onClick={() => setIsLoginModalOpen(true)}
            >
              Log in
            </Button>
          </div>
        )}
      </div>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => {
          setIsLoginModalOpen(false)
        }}
      />
    </>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
  // @ts-ignore: Unreachable code error
>(({ icon, className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div
            // className='text-sm font-medium leading-none'
            className={cn(
              'flex gap-2 text-sm font-semibold text-foreground/70'
              // 'flex gap-2 text-sm font-semibold text-muted-foreground',
            )}
          >
            <span>{icon}</span>
            {title}
          </div>
          <p
            className={cn(
              'line-clamp-2 text-xs leading-snug text-muted-foreground'
            )}
          >
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'
