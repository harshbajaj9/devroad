import { auth } from '@/auth'
import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import EditRepositoryHeader from './edit/edit-repo-header'
import EditRepositoryItems from './edit/edit-repo-items'
import RepositoryHeader from './repo-header'
import RepositoryItems from './repo-items'
import type { Metadata, ResolvingMetadata } from 'next'
import { getRepoTitle } from '@/server/api/routers/utils/repositories-utils'

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = (await params).id

  // fetch data
  const { title: repoTitle } = await getRepoTitle(id)

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: repoTitle
    // openGraph: {
    //   images: ['/some-specific-page-image.jpg', ...previousImages]
    // }
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const repository = await prisma.repository.findFirst({
    where: {
      id: params.slug
      // OR: [
      //   { visibility: $Enums.RepositoryVisibilityMode.SHARED },
      //   { visibility: $Enums.RepositoryVisibilityMode.DISCOVERABLE }
      // ]
    }
  })
  if (!repository) notFound()
  const session = await auth()
  const isOwner = session?.user.id === repository.creatorId
  if (repository.visibility === 'PRIVATE' && !isOwner) notFound()
  if (!repository) notFound()
  // const user = await prisma.user.findFirst({
  //   where: { id: repositorycreatorId }
  // })

  return (
    <main
      className='bg-backgroundalt p-16 pt-8'
      // className='bg-transparent bg-[linear-gradient(180deg,#FFFFFF_0%,#F0EBE3_100%)] p-8 dark:bg-[linear-gradient(0deg,#31363c_0%,#222831_100%)]'
    >
      {isOwner ? (
        <>
          <EditRepositoryHeader repository={repository} />
          <EditRepositoryItems repository={repository} />
        </>
      ) : (
        <>
          <RepositoryHeader repository={repository} />
          <RepositoryItems repository={repository} />
          {/* <div className='border-b-2'></div>
          <div className='flex gap-4 border-y-2 px-8'>
            <div className='sticky top-0 flex h-screen flex-1 flex-col border-l p-8 py-16'>
              <div className='absolute right-0 top-8'>
                <XMarkIcon className='size-6' />
              </div>
              <h1 className='scroll-m-20 px-8 text-4xl font-extrabold tracking-tight lg:text-5xl'>
                Notes.
              </h1>
              <div className='mt-8 flex-1'>
                <Textarea
                  className='h-full resize-none'
                  value={
                    'Pariatur ullamco pariatur veniam non non esse est commodo deserunt dolore esse. Exercitation elit officia irure laboris fugiat enim deserunt velit deserunt.Pariatur ullamco pariatur veniam non non esse est commodo deserunt dolore esse. Exercitation elit officia irure laboris fugiat enim deserunt velit deserunt. Cillum exercitation eiusmod ullamco pariatur enim pariatur sint ullamco.Pariatur ullamco pariatur veniam non non esse est commodo deserunt dolore esse. Exercitation elit officia irure laboris fugiat enim deserunt velit deserunt. Cillum exercitation eiusmod ullamco pariatur enim pariatur sint ullamco. Nostrud labore officia fugiat adipisicing do in aute culpa mollit ipsum Lorem labore duis. Excepteur sint cillum ad sint pariatur nulla do veniam aliquip esse anim ad veniam consequat.Sint et cupidatat elit excepteur enim. Cupidatat amet id aliqua aute duis. Qui nostrud qui nulla enim cillum et irure Lorem veniam sint cupidatat voluptate excepteur aliquip. Voluptate exercitation labore pariatur Lorem elit occaecat nostrud magna velit id. Est sit cupidatat fugiat sunt.Aute proident ipsum ipsum in aliquip aliquip fugiat minim incididunt eiusmod laborum proident Lorem ipsum. Ad magna sunt Lorem in aliquip. Elit excepteur commodo in ullamco elit occaecat ex adipisicing non reprehenderit sit id anim cillum. Aliquip irure anim non nulla officia ea sit mollit cupidatat adipisicing et nostrud aute aliquip. Commodo dolore proident incididunt ex aute commodo ex duis magna labore esse incididunt cillum. Ullamco do tempor esse et. Aute anim consectetur in incididunt incididunt dolor incididunt ullamco.Sint mollit ipsum ut elit ipsum cupidatat nostrud culpa occaecat. Sint elit voluptate deserunt est irure occaecat non velit aliqua aute. Deserunt incididunt deserunt mollit voluptate irure. Do sit minim consectetur tempor laboris id esse sit eu. Duis dolore magna occaecat excepteur sit ipsum commodo nostrud consectetur cillum aliquip. Aliqua dolore aliqua aliqua commodo enim irure amet reprehenderit.Laborum proident deserunt aliqua incididunt ad. Nostrud anim commodo consequat non occaecat consequat ea. Lorem veniam in do commodo veniam. Officia id velit enim ipsum sit aute. Consequat nisi id et aliqua ad. Magna non amet est incididunt enim sunt esse ad veniam Lorem irure elit.'
                  }
                />
              </div>
            </div>
          </div> */}
        </>
      )}
    </main>
  )
}
