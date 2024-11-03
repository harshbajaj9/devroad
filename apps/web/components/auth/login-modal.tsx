'use client'

import { Button } from '@repo/ui'
import LoginForm from './login-form'
import { cn } from '@/lib/utils'
import { Poppins } from 'next/font/google'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useLoginModalState } from '@/store'
const font = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin']
})
// import {
//   Button,
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
//   RadioGroup,
//   RadioGroupItem,
//   Toast
// } from 'ui'
// import { Input } from 'ui'
// import { api } from '~/utils/api'
// import { useForm } from 'react-hook-form'
// import {
//   OutboundWorkflowFormSchema,
//   outboundWorkflowFormSchema
// } from '~/zod/forms/visitorFlow'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { z } from 'zod'
// import router from 'next/router'
// import { useVisitorFlow } from '~/store'
// import { OutboundWorkflowStartingTrigger, VisitorFlowV2 } from 'database'
// import { useEffect } from 'react'
// import { cn } from '~/lib/utils'
// import { OutboundWorkflowStartingTriggers } from '~/lib/outboundWorkflows'
// import { allowedOutboundWorkflowStartingTriggers } from '~/utils/constants/outbound-workflow'

type Props = {
  isOpen: boolean
  onClose: () => void
}

const LoginModal = ({ isOpen, onClose }: Props) => {
  if (!isOpen) return null
  // const { mutateAsync: createVisitorFlow } =
  //   api.visitorFlowV2.createVisitorflow.useMutation()

  // const {
  //   selectedFlowId,
  //   setSelectedFlowId,
  //   setSelectedFlowData,
  //   setStartingTriggerType,
  //   setTriggerConditions
  // } = useVisitorFlow()

  // useEffect(() => {
  //   if (flowDetails) {
  //     form.setValue('name', flowDetails.name)
  //     form.setValue('description', flowDetails.description ?? '')
  //     form.setValue('starting_trigger', flowDetails.starting_trigger)
  //   }
  // }, [flowDetails])

  // const handleSave = async (values: OutboundWorkflowFormSchema) => {
  //   if (!values) return
  //   if (
  //     !allowedOutboundWorkflowStartingTriggers.includes(values.starting_trigger)
  //   ) {
  //     Toast({
  //       title: `Error: Only Custom, Segment, Webhhoks and Account List Triggers are supported`,
  //       type: 'error'
  //     })
  //     return
  //   }

  //   const data = {
  //     name: values.name,
  //     description: values.description,
  //     starting_trigger: values.starting_trigger,
  //     flow_id: selectedFlowId ?? ''
  //   }
  //   try {
  //     const flowId = await createVisitorFlow(data)
  //     Toast({
  //       title: 'Outbound workflow created successfully'
  //     })
  //     onClose()
  //     setStartingTriggerType(values.starting_trigger)
  //     const url = `/outbound-workflows/flow/${flowId}`
  //     setSelectedFlowData(null)
  //     router.push(url)
  //     setSelectedFlowId(flowId)
  //     setTriggerConditions([])
  //     if (refetchData) refetchData()
  //   } catch (error) {
  //     console.error(error)
  //     Toast({
  //       type: 'error',
  //       title: 'Outbound workflow creation failed',
  //       message: 'Something went wrong. Please try again.'
  //     })
  //   }
  // }

  // const form = useForm<OutboundWorkflowFormSchema>({
  //   resolver: zodResolver(outboundWorkflowFormSchema),
  //   defaultValues: {
  //     name: '',
  //     description: '',
  //     starting_trigger: OutboundWorkflowStartingTrigger.custom_trigger
  //   }
  // })

  // const handleCreateFlow = async (values: OutboundWorkflowFormSchema) => {
  //   handleSave(values)
  // }
  const { setIsLoginModalOpen } = useLoginModalState()

  return (
    <>
      <div className='fixed inset-0 z-40 h-screen w-screen bg-black opacity-50'></div>
      {/* <div className='border-gray fixed inset-0 left-[50%] top-[50%] z-50 m-4 flex h-fit w-max -translate-x-1/2 -translate-y-1/2 flex-col gap-6 rounded-lg border bg-white p-8'> */}
      <div className='fixed inset-0 left-[50%] top-[50%] z-50 m-4 h-fit w-max -translate-x-1/2 -translate-y-1/2 sm:w-[350px]'>
        <div className='absolute right-2 top-2'>
          <XMarkIcon
            className='size-5 cursor-pointer'
            onClick={() => {
              setIsLoginModalOpen(false)
            }}
          />
        </div>
        {/* <div className='flex flex-col'>
          <p className='text-lg font-medium text-gray-900'>
            New Outbound Workflow
          </p>
        </div>

        <div className='flex justify-end gap-2'>
          <Button
            variant={'outline'}
            onClick={() => {
              onClose()
            }}
            size={'lg'}
          >
            Cancel
          </Button>
          <Button
            // variant={'primary'}
            // onClick={form.handleSubmit(handleCreateFlow)}
            size={'lg'}
            type='submit'
          >
            Create
          </Button>
        </div> */}

        {/* <div className='flex items-center justify-start text-lg font-medium'>
          <div className={cn('mx-4 drop-shadow-md')}>
            <a
              // className={styles.primary}
              href={`${process.env.NEXT_URL}` ?? '/'}
              // target="_blank"
              // rel="noopener noreferrer"
            >
              <img
                // className={styles.logo}
                src='/devroad5.png'
                alt='devroad logomark'
                width={40}
                height={40}
              />
            </a>
          </div>

          <div
            className={cn(
              'pt-[2px] align-bottom text-3xl font-bold text-white drop-shadow-md',
              font.className
            )}
          >
            dev<span className='font-light'>road</span>.io
          </div>
        </div> */}

        <LoginForm />
      </div>
    </>
  )
}

export default LoginModal
