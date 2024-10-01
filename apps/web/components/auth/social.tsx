'use client'
import { DEFAULT_LOGIN_REDIRECT_URL } from '@/routes'
import { Button } from '@repo/ui'
import { signIn } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

const Social = () => {
  const pathname = usePathname()

  const onClick = (provider: 'google' | 'github') => {
    signIn(provider, {
      // callbackUrl: pathname ?? DEFAULT_LOGIN_REDIRECT_URL
    })
  }
  return (
    <div className='flex w-full flex-col items-center gap-2'>
      <Button
        size='lg'
        className='w-full'
        variant={'outline'}
        onClick={() => onClick('google')}
      >
        <FcGoogle className='h-5 w-5' />
        <span className='mx-2'>Continue with Google</span>
      </Button>
      <Button
        size='lg'
        className='w-full'
        variant={'outline'}
        onClick={() => onClick('github')}
      >
        <FaGithub className='h-5 w-5' />
        <span className='mx-2'>Continue with Github</span>
      </Button>
    </div>
  )
}

export default Social
