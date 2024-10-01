'use client'

import { useState } from 'react'
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@repo/ui/components/ui/avatar'
import { Button } from '@repo/ui/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@repo/ui/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@repo/ui/components/ui/dialog'
import { LogOut, User } from 'lucide-react'
import Link from 'next/link'
import LogoutButton from './auth/logout-button'
import { usePathname, useRouter } from 'next/navigation'
import { logout } from '@/actions/logout'
import { useSession } from 'next-auth/react'

// interface ProfileDropdownProps {
//   // children: React.ReactNode;
//   imgSrc: string | undefined | null
//   name: string | undefined | null
//   email: string | undefined | null
//   // asChild?: boolean
// }
export default function ProfileDropdown() {
  //   {
  //   imgSrc,
  //   name,
  //   email
  // }: ProfileDropdownProps
  const { data: session, update } = useSession()
  const imgSrc = session?.user?.image
  const name = session?.user?.name
  const email = session?.user?.email

  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const handleLogout = async () => {
    // Implement your logout logic here
    console.log('Logged out')
    await logout()
    location.reload()
    setShowLogoutDialog(false)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className='h-10 w-10 cursor-pointer'>
            <AvatarImage
              src={imgSrc ?? '/placeholder.svg?height=40&width=40'}
              alt={name ?? 'NA'}
            />
            <AvatarFallback>{email ?? 'NA'}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56' align='end'>
          <DropdownMenuLabel>{name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href='/profile' className='flex w-full items-center'>
              <User className='mr-2 h-4 w-4' />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setShowLogoutDialog(true)}>
            <LogOut className='mr-2 h-4 w-4' />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to logout?</DialogTitle>
            <DialogDescription>
              You will be redirected to the login page.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => setShowLogoutDialog(false)}
            >
              Cancel
            </Button>
            <Button variant='destructive' onClick={handleLogout}>
              Logout
            </Button>
            {/* <LogoutButton>
              <Button>Signout</Button>
            </LogoutButton> */}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
