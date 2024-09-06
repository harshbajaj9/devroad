import Image from 'next/image'
import styles from './page.module.css'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Card,
  Input
} from '@repo/ui'
import HomePage from '@/app/(sidenav)/home/page'
import LoginButton from '@/components/auth/login-button'
import { cn } from '@/lib/utils'
import { Bricolage_Grotesque, Poppins } from 'next/font/google'
import { auth } from '@/auth'
const font = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin']
})
const font2 = Bricolage_Grotesque({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin']
})
export default async function Home() {
  // const session = await auth()
  // if (session) {
  //   return (
  //     <div className='absolute left-0 top-0 z-20 ml-[72px] flex w-[calc(100%-72px)] flex-col'>
  //       <div className='min-h-[58px] bg-backgroundalt'></div>
  //       <div className='mb-2 mr-2 rounded-md border bg-backgroundalt p-8'>
  //         <HomePage />
  //       </div>
  //     </div>
  //   )
  // }
  return (
    <>
      <nav>
        <div className='m-auto flex min-h-16 w-[90vw] justify-between bg-white p-4'>
          <div className='flex gap-2'>
            <div
              className={cn(
                'm-auto text-3xl font-bold text-black drop-shadow-md'
                // font.className
              )}
            >
              <a
                className={styles.primary}
                href='https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
                target='_blank'
                rel='noopener noreferrer'
              >
                <img
                  className={styles.logo}
                  src='/devroad3.png'
                  alt='devroad logomark'
                  width={40}
                  height={40}
                />
              </a>
            </div>

            <div
              className={cn(
                'pt-[2px] align-bottom text-3xl font-bold text-black drop-shadow-md',
                font.className
              )}
            >
              dev<span className='font-light'>road</span>.io
            </div>
          </div>

          <div className='flex gap-2'>
            <Input
              className='text-md rounded-full px-4 font-semibold text-gray-700 placeholder:text-gray-300'
              placeholder='john@example.com'
            ></Input>
            <Button
              // variant="test"
              className='m-y-auto text-md rounded-full font-bold'
            >
              Join the waitlist
            </Button>
            <LoginButton mode='redirect'>
              <Button
                className='m-y-auto text-md rounded-full font-bold'
                variant={'ghost'}
                size={'lg'}
              >
                Login
              </Button>
            </LoginButton>
          </div>
        </div>
      </nav>
      <div className={styles.page}>
        <main className={styles.main}>
          <div className='m-20 mt-8 grid max-w-[1200px] grid-cols-1 gap-4 md:grid-cols-2'>
            {/* <div className="mx-10 max-w-[1200px]"> */}
            <div className=''>
              <h1
                className={cn(
                  'm-auto text-6xl font-bold text-black drop-shadow-md',
                  font2.className
                )}
              >
                The all in one super app for every step of your journey
                {/* <span className=" relative whitespace-nowrap">
                  <span className="absolute bg-[#f0f0f0] -left-2 -top-1 -bottom-1 -right-2 md:-left-3 md:-top-0 md:-bottom-0 md:-right-3 -rotate-1"></span>
                  <span className="relative text-neutral italic">prep</span>
                </span>{" "}
                and{" "}
                <span className=" relative whitespace-nowrap">
                  <span className="absolute bg-[#f0f0f0] -left-2 -top-1 -bottom-1 -right-2 md:-left-3 md:-top-0 md:-bottom-0 md:-right-3 -rotate-1"></span>
                  <span className="relative text-neutral italic">job-hunt</span>
                </span> */}
                .
              </h1>
              <div
                className={cn(
                  'm-auto mt-4 text-lg font-semibold text-gray-600'
                )}
              >
                <p className={cn('', font2.className)}>
                  We have seen the bulls and the bears. These tough times have
                  uncovered many{' '}
                  <span className={cn('font-medium italic', font.className)}>
                    road
                  </span>
                  -blocks in our journey.
                </p>
                <br />
                <p className={cn('', font2.className)}>
                  Whether you are a solopreneur or professional looking for
                  work, this app is an attempt to assist you in your
                  preparation, be it sharpening your core skills, managing your
                  side-projects or a more deterministic job hunt.
                </p>
              </div>
              <div
                className={cn(
                  'm-auto mt-8 text-2xl font-semibold text-gray-600'
                )}
              >
                <p className={cn('', font2.className)}>
                  Join now to experience the beta.
                </p>
              </div>
              <div className='mt-2 flex w-96 gap-2'>
                <Input
                  className='text-md rounded-full px-4 font-semibold text-gray-700 placeholder:text-gray-300'
                  placeholder='john@example.com'
                ></Input>
                <Button
                  // variant="test"
                  className='m-y-auto text-md rounded-full font-bold'
                >
                  Join the waitlist
                </Button>
              </div>
            </div>
            <div className=''>
              <ul>
                <li>
                  <div className='flex items-center gap-4 p-4'>
                    <div className=''>
                      <img
                        className={styles.logo}
                        src='/devroad3.png'
                        alt='devroad logomark'
                        width={40}
                        height={40}
                      />
                    </div>
                    <div>
                      <h2 className='text-xl font-semibold'>
                        Create & share repositories
                      </h2>
                      <p>Create & share roadmaps, tutorials, courses etc.</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className='flex items-center gap-4 p-4'>
                    <div className=''>
                      <img
                        className={styles.logo}
                        src='/devroad3.png'
                        alt='devroad logomark'
                        width={40}
                        height={40}
                      />
                    </div>
                    <div>
                      <h2 className='text-xl font-semibold'>
                        Share repositories
                      </h2>
                      <p>Create & share roadmaps, tutorials, courses etc.</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className='flex items-center gap-4 p-4'>
                    <div className=''>
                      <img
                        className={styles.logo}
                        src='/devroad3.png'
                        alt='devroad logomark'
                        width={40}
                        height={40}
                      />
                    </div>
                    <div>
                      <h2 className='text-xl font-semibold'>
                        Share repositories
                      </h2>
                      <p>Create & share roadmaps, tutorials, courses etc.</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className='flex items-center gap-4 p-4'>
                    <div className=''>
                      <img
                        className={styles.logo}
                        src='/devroad3.png'
                        alt='devroad logomark'
                        width={40}
                        height={40}
                      />
                    </div>
                    <div>
                      <h2 className='text-xl font-semibold'>
                        Share repositories
                      </h2>
                      <p>Create & share roadmaps, tutorials, courses etc.</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </main>
        {/* <footer className={styles.footer}> */}
      </div>
      <footer className='flex w-full bg-white px-20'>
        <div className=''>
          <div className='m-auto flex h-16 max-w-[1200px] justify-between bg-white p-3'>
            <div className='flex gap-2'>
              <div
                className={cn(
                  'm-auto text-3xl font-bold text-black drop-shadow-md'
                  // font.className
                )}
              >
                <a
                  className={styles.primary}
                  href='https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <img
                    className={styles.logo}
                    src='/devroad3.png'
                    alt='devroad logomark'
                    width={36}
                    height={36}
                  />
                </a>
              </div>

              <div
                className={cn(
                  'pt-[4px] align-bottom text-2xl font-bold text-black drop-shadow-md',
                  font.className
                )}
              >
                dev<span className='font-light'>road</span>.io
              </div>
            </div>

            <div className='flex gap-2'>
              <Input
                className='text-md rounded-full px-4 font-semibold text-gray-700 placeholder:text-gray-300'
                placeholder='john@example.com'
              ></Input>
              <Button
                // variant="test"
                className='m-y-auto text-md rounded-full font-bold'
              >
                Join the waitlist
              </Button>
            </div>
          </div>
        </div>
        {/* <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file-text.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a> */}
      </footer>
    </>
  )
}
