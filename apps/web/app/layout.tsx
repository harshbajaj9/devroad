import type { Metadata } from 'next'
import localFont from 'next/font/local'
// import "./globals.css";

import { auth } from '@/auth'
import SessionProvider from '@/components/auth/session-provider'
import { NavigationMenuDemo } from '@/components/navigation-menu'
import { cn } from '@/lib/utils'
import { TRPCReactProvider } from '@/trpc/react'
import { ThemeProvider, Toaster } from '@repo/ui'
import '@repo/ui/styles/globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans'
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono'
})

export const metadata: Metadata = {
  title: 'devroad.io',
  description:
    'All in one super app to share your Roadmaps, Experiences, Insights and Collections.'
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  return (
    <html lang='en'>
      <body
        // className={`${geistSans.variable} ${geistMono.variable} bg-[#f5f5f5] dark:bg-[#120e17]`}
        // className={`${geistSans.variable} ${geistMono.variable} bg-[#f5f5f5] dark:bg-[#1a1b1c]`}
        // className={`${geistSans.variable} ${geistMono.variable} max-w-screen-[1800px] mx-auto max-w-[1920px] bg-backgroundalt dark:bg-backgroundalt`}
        // className={`max-w-screen-[1800px] mx-auto max-w-[1920px] bg-backgroundalt dark:bg-backgroundalt`}
        className={cn(
          'max-w-screen-[1800px] mx-auto max-w-[1920px] bg-backgroundalt dark:bg-backgroundalt'
        )}
      >
        <SessionProvider session={session}>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            {/* <nav className='sticky left-0 top-0 z-20 flex h-16 items-center justify-between border-b bg-backgroundalt px-4'> */}
            <div className='flex justify-between border-b bg-background px-4'>
              <NavigationMenuDemo />
            </div>
            {/* <div className='px-8 pt-4 xl:mx-20'>
              <BreadcrumbDemo />
            </div> */}

            {/* <Nav /> */}
            {/* <nav className="z-10 fixed w-full bg-white">
          <div className="w-[90vw] max-w-[1200px] h-16 m-auto bg-white flex p-3 justify-between">
            <div className="flex gap-2">
              <div
                className={cn(
                  "m-auto font-bold text-black text-3xl drop-shadow-md"
                  // font.className
                )}
              >
                <a
                  className={styles.primary}
                  href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className={styles.logo}
                    src="/devroad3.png"
                    alt="devroad logomark"
                    width={36}
                    height={36}
                  />
                </a>
              </div>

              <div
                className={cn(
                  "font-bold text-black text-2xl drop-shadow-md align-bottom pt-[4px]",
                  font.className
                )}
              >
                dev<span className="font-light">road</span>.io
              </div>
            </div>

            <div className="flex gap-2">
              <Input
                className="rounded-full text-md font-semibold text-gray-700 px-4 placeholder:text-gray-300"
                placeholder="john@example.com"
              ></Input>
              <Button
                variant="test"
                className="m-y-auto rounded-full text-md font-bold"
              >
                Join the waitlist
              </Button>
              <LoginButton mode="redirect">
                <Button
                  className="m-y-auto rounded-full text-md font-bold"
                  variant={"ghost"}
                  size={"lg"}
                >
                  Login
                </Button>
              </LoginButton>
            </div>
          </div>
        </nav> */}

            <TRPCReactProvider>{children}</TRPCReactProvider>
            <Toaster
              richColors
              closeButton
              toastOptions={{
                // className:
                //   'bg-background text-foreground h-20 border border-muted-foreground rounded-none',
                className: '  rounded-none',
                style: {
                  fontSize: '14px'
                }
              }}
            />
          </ThemeProvider>
        </SessionProvider>
        {/* <footer className='bg-background'>
          <div className='h-16 w-full border-t px-8 pt-4'>
          </div>
        </footer> */}
      </body>
    </html>
  )
}
