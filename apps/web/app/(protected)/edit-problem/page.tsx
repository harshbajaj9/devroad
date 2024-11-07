import { auth, signOut } from '@/auth'
import Sidebar from '@/components/sidebar'
import { api, HydrateClient } from '@/trpc/server'
import Image from 'next/image'
import React from 'react'
import EditProblem from './edit-problem'

const page = async () => {
  const session = await auth()
  if (!session || (session && session.user.role === 'USER')) return
  return <EditProblem />
}

export default page
