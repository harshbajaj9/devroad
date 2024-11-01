import HomePage from '@/app/home/page'
import { auth } from '@/auth'
import Sidebar from '@/components/sidebar'
import { cn } from '@/lib/utils'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button
} from '@repo/ui'
import { Bricolage_Grotesque } from 'next/font/google'
import Image from 'next/image'

const font2 = Bricolage_Grotesque({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin']
})
export default async function Home() {
  const session = await auth()
  if (session) {
    return (
      // <div className='absolute left-0 top-0 z-20 ml-[72px] flex w-[calc(100%-72px)] flex-col'>
      //   <div className='min-h-[58px] bg-backgroundalt'></div>
      //   <div className='mb-2 mr-2 rounded-md border bg-backgroundalt p-8'>
      //     <HomePage />
      //   </div>
      // </div>
      <div className='relative flex'>
        <Sidebar />

        <div className='p-8 xl:mx-20'>
          <HomePage />
        </div>
        {/* <div className='absolute bottom-0 right-0 -z-10 h-64 overflow-hidden opacity-30'>
          <Illustration2 />
        </div> */}
      </div>
    )
  }
  return (
    <>
      <main
        className={cn(
          'min-h-svh bg-background py-20',
          'pattern-boxes pattern-gray-500 pattern-bg-white pattern-size-6 pattern-opacity-20',
          'bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-none'
        )}
      >
        <div className='mx-auto grid max-w-[1200px] grid-cols-1 gap-4 md:grid-cols-2'>
          {/* <div className="mx-10 max-w-[1200px]"> */}
          <div className=''>
            <h1
              className={cn(
                'm-auto text-6xl font-bold text-foreground drop-shadow-md',
                font2.className
              )}
            >
              The easy way to learn & upskill
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
            {/* <div
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
              </div> */}
            {/* <div
                className={cn(
                  'm-auto mt-8 text-2xl font-semibold text-gray-600'
                )}
              >
                <p className={cn('', font2.className)}>
                  Join now to experience the beta.
                </p>
              </div> */}
            <div className='mt-2 flex w-96 gap-2'>
              {/* <Input
                  className='text-md rounded-full px-4 font-semibold text-gray-700 placeholder:text-gray-300'
                  placeholder='john@example.com'
                ></Input> */}
              <Button
                // variant="test"
                className='m-y-auto w-24 rounded-full text-sm'
              >
                Log in
              </Button>
            </div>
          </div>
          {/* <div className='flex justify-center'>
              <ul>
                <li>
                  <div className='flex items-start gap-2 p-4'>
                    <div className='mt-1'>
                      <img
                        className={styles.logo}
                        src='/devroad3.png'
                        alt='devroad logomark'
                        width={20}
                        height={20}
                      />
                    </div>
                    <div>
                      <h2 className='scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0'>
                        Solve popular DSA problem sets
                      </h2>
                      <p>
                        Find all go to problem sets by your favorite teachers.
                        Why{' '}
                        <span className='font-bold underline decoration-primary'>
                          make an account
                        </span>{' '}
                        on different platforms, just to solve various roadmaps /
                        sheets.
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className='flex items-start gap-2 p-4'>
                    <div className='mt-1'>
                      <img
                        className={styles.logo}
                        src='/devroad3.png'
                        alt='devroad logomark'
                        width={20}
                        height={20}
                      />
                    </div>
                    <div>
                      <h2 className='scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0'>
                        Create custom problem sets
                      </h2>
                      <p>
                        No need for managing{' '}
                        <span className='font-bold underline decoration-primary'>
                          unbearable
                        </span>{' '}
                        excel sheets with minimal tracking while trying hard to
                        focus on problem solving.
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className='flex items-start gap-2 p-4'>
                    <div className='mt-1'>
                      <img
                        className={styles.logo}
                        src='/devroad3.png'
                        alt='devroad logomark'
                        width={20}
                        height={20}
                      />
                    </div>
                    <div>
                      <h2 className='scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0'>
                        Track problems across problem sets
                      </h2>
                      <p>
                        <span className='font-bold underline decoration-primary'>
                          Have I solved it earlier?
                        </span>{' '}
                        All your problems' data synced across various problem
                        sets, so you can focus on exploring the uncharted lands.
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className='flex items-start gap-2 p-4'>
                    <div className='mt-1'>
                      <img
                        className={styles.logo}
                        src='/devroad3.png'
                        alt='devroad logomark'
                        width={20}
                        height={20}
                      />
                    </div>
                    <div>
                      <h2 className='scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0'>
                        Save notes & references
                      </h2>
                      <p>
                        We all know solving problems is important, but it is{' '}
                        <span className='font-bold underline decoration-primary'>
                          more important to revise.
                        </span>{' '}
                        Well, what is better than having{' '}
                        <span className='font-bold underline decoration-primary'>
                          all your notes in one place
                        </span>
                        ,{' '}
                        <span className='bold'>
                          no hustle in opening link after link
                        </span>
                        . No need to open that messy excel column which you{' '}
                        <span className='font-bold underline decoration-primary'>
                          can't even format properly.
                        </span>
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div> */}
          <div className='flex justify-center'>
            <Accordion type='single' collapsible className='w-full'>
              <AccordionItem value='item-1'>
                <AccordionTrigger>
                  <h2
                    className={cn(
                      'scroll-m-20 pb-2 text-2xl font-bold tracking-tight first:mt-0',
                      font2.className
                    )}
                  >
                    Solve popular DSA problem sets
                  </h2>
                </AccordionTrigger>
                <AccordionContent>
                  <div>
                    <p>
                      Find all go to problem sets by your favorite teachers. Why{' '}
                      <span className='font-bold underline decoration-primary'>
                        make an account
                      </span>{' '}
                      on different platforms, just to solve various roadmaps /
                      sheets.
                    </p>
                    <div className='mt-1 overflow-hidden rounded-lg border p-1 shadow-inner'>
                      <Image
                        className='w-full dark:hidden'
                        src='/img-1.png'
                        alt='devroad logomark'
                        width={400}
                        height={400}
                      />
                      <Image
                        className='hidden w-full dark:block'
                        src='/img-1dark.png'
                        alt='devroad logomark'
                        width={400}
                        height={400}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-2'>
                <AccordionTrigger>
                  <h2
                    className={cn(
                      'scroll-m-20 pb-2 text-2xl font-bold tracking-tight first:mt-0',
                      font2.className
                    )}
                  >
                    Create custom problem sets
                  </h2>
                </AccordionTrigger>
                <AccordionContent>
                  <div>
                    <p>
                      No need for managing{' '}
                      <span className='font-bold underline decoration-primary'>
                        unbearable
                      </span>{' '}
                      excel sheets with minimal tracking while trying hard to
                      focus on problem solving.
                    </p>
                    <div className='mt-1 overflow-hidden rounded-lg border p-1 shadow-inner'>
                      <Image
                        className='w-full dark:hidden'
                        src='/img-1.png'
                        alt='devroad logomark'
                        width={400}
                        height={400}
                      />
                      <Image
                        className='hidden w-full dark:block'
                        src='/img-1dark.png'
                        alt='devroad logomark'
                        width={400}
                        height={400}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-3'>
                <AccordionTrigger>
                  <h2
                    className={cn(
                      'scroll-m-20 pb-2 text-2xl font-bold tracking-tight first:mt-0',
                      font2.className
                    )}
                  >
                    Track problems across problem sets
                  </h2>
                </AccordionTrigger>
                <AccordionContent>
                  <div>
                    <p>
                      <span className='font-bold underline decoration-primary'>
                        Have I solved it earlier?
                      </span>{' '}
                      All your problems' data synced across various problem
                      sets, so you can focus on exploring the uncharted lands.
                    </p>
                    <div className='mt-1 overflow-hidden rounded-lg border p-1 shadow-inner'>
                      <Image
                        className='w-full dark:hidden'
                        src='/img-1.png'
                        alt='devroad logomark'
                        width={400}
                        height={400}
                      />
                      <Image
                        className='hidden w-full dark:block'
                        src='/img-1dark.png'
                        alt='devroad logomark'
                        width={400}
                        height={400}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-4'>
                <AccordionTrigger>
                  <h2
                    className={cn(
                      'scroll-m-20 pb-2 text-2xl font-bold tracking-tight first:mt-0',
                      font2.className
                    )}
                  >
                    Save notes & references
                  </h2>
                </AccordionTrigger>
                <AccordionContent>
                  <div className='flex flex-col gap-2'>
                    <p>
                      We all know solving problems is important, but it is{' '}
                      <span className='font-bold underline decoration-primary'>
                        more important to revise them.
                      </span>{' '}
                      Well, what is better than having{' '}
                      <span className='font-bold underline decoration-primary'>
                        all your notes in one place
                      </span>
                      ,{' '}
                      <span className='bold'>
                        no hustle in opening link after link
                      </span>
                      . No need to open that messy excel column which you{' '}
                      <span className='font-bold underline decoration-primary'>
                        can't even format properly.
                      </span>
                    </p>
                    <div className='mt-1 overflow-hidden rounded-lg border p-1 shadow-inner'>
                      <Image
                        // className={styles.logo}
                        // className='h-96 w-96'
                        className='w-full dark:hidden'
                        src='/img-1.png'
                        alt='devroad logomark'
                        width={400}
                        height={400}
                      />
                      <Image
                        // className={styles.logo}
                        // className='h-96 w-96'
                        className='hidden w-full dark:block'
                        src='/img-1dark.png'
                        alt='devroad logomark'
                        width={400}
                        height={400}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-5'>
                <AccordionTrigger>
                  <h2
                    className={cn(
                      'scroll-m-20 pb-2 text-2xl font-bold tracking-tight first:mt-0',
                      font2.className
                    )}
                  >
                    WYSIWYG Editor powered by Novel.sh
                  </h2>
                </AccordionTrigger>
                <AccordionContent>
                  <div className='flex flex-col gap-2'>
                    <p>
                      Best in class editing experience, with{' '}
                      <a
                        href={'https://novel.sh/'}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <span className='font-bold underline decoration-primary'>
                          Novel.sh
                        </span>
                      </a>
                      .
                    </p>
                    <ul className='list-disc pl-10'>
                      <li>
                        <span className='italic'>
                          Supports extensive text formatting
                        </span>
                      </li>
                      <li>
                        <span className='italic'>Supports image upload</span>
                      </li>
                      <li>
                        <span className='italic'>Supports code formatting</span>
                      </li>
                    </ul>
                    <div className='mt-1 overflow-hidden rounded-lg border p-1 shadow-inner'>
                      <Image
                        // className={styles.logo}
                        // className='h-96 w-96'
                        className='w-full dark:hidden'
                        src='/img-2.png'
                        alt='devroad logomark'
                        width={400}
                        height={400}
                      />
                      <Image
                        // className={styles.logo}
                        // className='h-96 w-96'
                        className='hidden w-full dark:block'
                        src='/img-2dark.png'
                        alt='devroad logomark'
                        width={400}
                        height={400}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </main>
      {/* <footer className={styles.footer}> */}
      {/* <footer className='flex w-full bg-white px-20'>
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
        <a
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
        </a>
      </footer> */}
    </>
  )
}
