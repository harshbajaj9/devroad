import { logout } from '@/actions/logout'
import { auth, signOut } from '@/auth'
import CardWrapper from '@/components/auth/card-wrapper'
import LogoutButton from '@/components/auth/logout-button'
import Social from '@/components/auth/social'
import SocialSetting from '@/components/auth/social-setting'
import { LatestPost } from '@/components/post'
import { prisma } from '@/lib/db'
import { api, HydrateClient } from '@/trpc/server'
import { Button } from '@repo/ui'
import React from 'react'

const page = async () => {
  const session = await auth()
  const user = await prisma.user.findUnique({
    where: {
      id: session?.user.id
    }
  })

  // prefetching to add query to cache
  void api.post.getLatest.prefetch()

  // console.log("<<session>>", session);
  const handleClick = async () => {
    await logout()
  }
  return (
    <HydrateClient>
      <div>
        {/* <p>{JSON.stringify(session)}</p> */}
        <LogoutButton>
          <Button>Signout</Button>
        </LogoutButton>
        <form
          action={async () => {
            'use server'
            await signOut()
            location.reload()
          }}
        >
          <button type='submit'>Signout</button>
        </form>
        {/* <CardWrapper headerLabel="Linked Accounts" > */}
        <SocialSetting
          username={user?.username}
          userMail={user?.email}
          googleMail={user?.googleMail}
          googleImage={user?.googleImage}
          githubMail={user?.githubMail}
          githubImage={user?.githubImage}
        />
        {/* </CardWrapper> */}
        <p>Your posts</p>
        {session?.user && <LatestPost />}
      </div>
    </HydrateClient>
  )
}

export default page