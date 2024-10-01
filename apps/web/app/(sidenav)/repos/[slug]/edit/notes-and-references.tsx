import React from 'react'
import EditNotes from './edit-notes'
import EditReferences from './edit-references'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ScrollArea, Tabs, TabsList, TabsTrigger } from '@repo/ui'
import { useNotes, useRepository } from '@/store'
import { cn } from '@/lib/utils'
import EditDescription from './edit-description'
import { Jost, Poppins } from 'next/font/google'
const font = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin']
})
const font2 = Jost({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin']
})
const NotesAndReferences = () => {
  const { openItem, setOpenItem } = useRepository()
  const { activeNotesTab, setActiveNotesTab } = useNotes()
  const onTabChange = value => {
    setActiveNotesTab(value)
  }
  if (!openItem) return
  return (
    <div
      className={cn(
        'sticky top-0 h-screen max-h-[1920px] flex-[5] p-4 pl-2 pt-2'
      )}
    >
      <div
        className={cn(
          'overflow-hidden rounded-md border bg-background',
          'shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'
          // 'bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]'
        )}
      >
        {/* <div className='absolute right-4 top-8 z-10'>
        <XMarkIcon className='size-6' onClick={() => setOpenItem(undefined)} />
      </div> */}
        <ScrollArea className='flex h-screen max-h-[1920px] flex-col py-0'>
          <div
            className={cn(
              'sticky top-0 z-10 flex items-center justify-between border-b bg-background px-8 pb-4 pt-4'
              // 'bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]'
            )}
          >
            <h2
              className={cn(
                'scroll-m-20 text-xl font-semibold tracking-tight',
                font2.className
              )}
            >
              {openItem.problem.title}
            </h2>
            <XMarkIcon
              className='size-6'
              onClick={() => setOpenItem(undefined)}
            />
          </div>

          <div className='flex flex-col gap-4 px-8 py-4'>
            <EditDescription />

            <div className='flex'>
              <Tabs
                defaultValue='MyNotes'
                className='w-[400px]'
                value={activeNotesTab}
                onValueChange={onTabChange}
              >
                <TabsList className='grid w-full grid-cols-2'>
                  <TabsTrigger
                    value='MyNotes'
                    // className='border border-transparent data-[state=active]:border-input'
                    className={cn(
                      'outline outline-1 outline-transparent data-[state=active]:outline-input',
                      font2.className
                    )}
                    // className='data-[state=active]:bg-foreground data-[state=active]:text-background'
                  >
                    My Notes
                  </TabsTrigger>
                  <TabsTrigger
                    value='Notes'
                    // className='border border-transparent data-[state=active]:border-input'
                    className={cn(
                      'outline outline-1 outline-transparent data-[state=active]:outline-input',
                      font2.className
                    )}

                    // className='data-[state=active]:bg-foreground data-[state=active]:text-background'
                  >
                    Notes
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              {/* <div
            className={cn(
              'cursor-default rounded-t-md border border-transparent border-b-input',
              activeNotes === 'MyNotes' && 'border-input border-b-transparent'
            )}
            onClick={() => setActiveNotes('MyNotes')}
          >
            
            <h2 className='scroll-m-20 p-4 text-3xl font-extrabold tracking-tight'>
              My Notes.
            </h2>
          </div>
          <div
            className={cn(
              'cursor-default rounded-t-md border border-transparent border-b-input',
              activeNotes === 'Notes' && 'border-input border-b-transparent'
            )}
            onClick={() => setActiveNotes('Notes')}
          >
            <h2 className='scroll-m-20 p-4 text-3xl font-extrabold tracking-tight'>
              Notes.
            </h2>
          </div> */}
              {/* <div className='flex-1 border-b'></div> */}
            </div>
            {/* <div className='min-h-20'>{activeItem?.id}</div> */}
            <EditReferences itemId={openItem.id} />
            <EditNotes itemId={openItem.id} />
            {/* <div className='mt-8 flex-1'>
                <Textarea
                  className='h-full min-h-96 resize-none'
                  value={
                    'Pariatur ullamco pariatur veniam non non esse est commodo deserunt dolore esse. Exercitation elit officia irure laboris fugiat enim deserunt velit deserunt.Pariatur ullamco pariatur veniam non non esse est commodo deserunt dolore esse. Exercitation elit officia irure laboris fugiat enim deserunt velit deserunt. Cillum exercitation eiusmod ullamco pariatur enim pariatur sint ullamco.Pariatur ullamco pariatur veniam non non esse est commodo deserunt dolore esse. Exercitation elit officia irure laboris fugiat enim deserunt velit deserunt. Cillum exercitation eiusmod ullamco pariatur enim pariatur sint ullamco. Nostrud labore officia fugiat adipisicing do in aute culpa mollit ipsum Lorem labore duis. Excepteur sint cillum ad sint pariatur nulla do veniam aliquip esse anim ad veniam consequat.Sint et cupidatat elit excepteur enim. Cupidatat amet id aliqua aute duis. Qui nostrud qui nulla enim cillum et irure Lorem veniam sint cupidatat voluptate excepteur aliquip. Voluptate exercitation labore pariatur Lorem elit occaecat nostrud magna velit id. Est sit cupidatat fugiat sunt.Aute proident ipsum ipsum in aliquip aliquip fugiat minim incididunt eiusmod laborum proident Lorem ipsum. Ad magna sunt Lorem in aliquip. Elit excepteur commodo in ullamco elit occaecat ex adipisicing non reprehenderit sit id anim cillum. Aliquip irure anim non nulla officia ea sit mollit cupidatat adipisicing et nostrud aute aliquip. Commodo dolore proident incididunt ex aute commodo ex duis magna labore esse incididunt cillum. Ullamco do tempor esse et. Aute anim consectetur in incididunt incididunt dolor incididunt ullamco.Sint mollit ipsum ut elit ipsum cupidatat nostrud culpa occaecat. Sint elit voluptate deserunt est irure occaecat non velit aliqua aute. Deserunt incididunt deserunt mollit voluptate irure. Do sit minim consectetur tempor laboris id esse sit eu. Duis dolore magna occaecat excepteur sit ipsum commodo nostrud consectetur cillum aliquip. Aliqua dolore aliqua aliqua commodo enim irure amet reprehenderit.Laborum proident deserunt aliqua incididunt ad. Nostrud anim commodo consequat non occaecat consequat ea. Lorem veniam in do commodo veniam. Officia id velit enim ipsum sit aute. Consequat nisi id et aliqua ad. Magna non amet est incididunt enim sunt esse ad veniam Lorem irure elit.'
                  }
                />
              </div> */}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

export default NotesAndReferences
