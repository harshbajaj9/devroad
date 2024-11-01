import { logout } from '@/actions/logout'
import { auth, signOut } from '@/auth'
import CardWrapper from '@/components/auth/card-wrapper'
import LogoutButton from '@/components/auth/logout-button'
import Social from '@/components/auth/social'
import SocialSetting from '@/components/auth/social-setting'
import { LatestPost } from '@/components/post'
import Sidebar from '@/components/sidebar'
import { prisma } from '@/lib/db'
import { api, HydrateClient } from '@/trpc/server'
import { Button } from '@repo/ui'
import Image from 'next/image'
import React from 'react'

const page = async () => {
  const session = await auth()
  // const user = await prisma.user.findUnique({
  //   where: {
  //     id: session?.user.id
  //   }
  // })

  // prefetching to add query to cache
  // void api.post.getLatest.prefetch()

  // console.log("<<session>>", session);
  // const handleClick = async () => {
  //   await logout()
  // }
  return (
    <div className='relative flex'>
      <Sidebar />

      <div className='flex-1 p-24 xl:mx-20'>
        <HydrateClient>
          {/* <div className=''> */}
          {/* <p>{JSON.stringify(session)}</p> */}
          {/* <LogoutButton>
          <Button>Signout</Button>
        </LogoutButton> */}
          {/* <form
          action={async () => {
            'use server'
            await signOut()
            location.reload()
          }}
        >
          <button type='submit'>Signout</button>
        </form> */}
          {/* <CardWrapper headerLabel="Linked Accounts" > */}

          {/* <SocialSetting
              username={user?.username}
              userMail={user?.email}
              googleMail={user?.googleMail}
              googleImage={user?.googleImage}
              githubMail={user?.githubMail}
              githubImage={user?.githubImage}
            /> */}
          <div className='flex gap-8 rounded-lg border bg-background p-8'>
            <div className='h-20 w-20 overflow-hidden rounded-full'>
              {session?.user?.image ? (
                <Image
                  // className={styles.logo}
                  className='h-20 w-20'
                  src={session?.user?.image}
                  alt={session?.user?.name??'NA'}
                  width={100}
                  height={100}
                  priority
                />
              ) : (
                <></>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <div>
                <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
                  {session?.user?.name}
                </h3>
              </div>
              <div>
                <h4 className='scroll-m-20 text-xl font-semibold tracking-tight text-muted-foreground'>
                  {session?.user?.email}
                </h4>
              </div>
            </div>
            {/* </CardWrapper> */}
            {/* <p>Your posts</p>
        {session?.user && <LatestPost />} */}
          </div>
        </HydrateClient>
      </div>
      {/* <div className='absolute bottom-0 right-0 -z-10 h-64 overflow-hidden opacity-30'>
          <Illustration2 />
        </div> */}
    </div>
  )
}

export default page
