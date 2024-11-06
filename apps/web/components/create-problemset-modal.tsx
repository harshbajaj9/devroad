'use client'
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  RadioGroup,
  RadioGroupItem,
  // Toast,
  Input
  // Toaster
} from '@repo/ui'

// import { api } from "~/utils/api";
import { useForm } from 'react-hook-form'
// import {
//   OutboundWorkflowFormSchema,
//   outboundWorkflowFormSchema,
// } from "~/zod/forms/visitorFlow";
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { cn } from '@/lib/utils'
import {
  BookmarkIcon,
  BookOpenIcon,
  MapIcon
} from '@heroicons/react/24/outline'
import { api } from '@/trpc/react'
import { Toast } from '@repo/ui/components/ui/sonnertoast'
import { useRouter } from 'next/navigation'

export const createRepositorySchema = z.object({
  title: z.string().min(2),
  description: z.string().min(2),
  starting_trigger: z.enum(['PROBLEM_SET', 'ROADMAP', 'COLLECTION'])
})

// import { ProblemSetTypes } from "@repo/database";

export const allowedProblemSetTypes: any[] = [
  // $Enums.ProblemSetTypes.DSA,
  // $Enums.ProblemSetTypes.CUSTOM,
  'PROBLEM_SET',
  'ROADMAP',
  'COLLECTION'
]

export const problemSetTypes = [
  {
    id: 'PROBLEM_SET',
    title: 'Problem Set',
    description: 'Problem Set, users can start a session on it.',
    icon: <BookOpenIcon className='size-4' />
  },
  {
    id: 'ROADMAP',
    title: 'Roadmap',
    description:
      'Roadmap is a collection of diverse resources and problems which can be worked on in a progressive manner.',
    icon: <MapIcon className='size-4' />
  },
  {
    id: 'COLLECTION',
    title: 'Custom Collection',
    description: 'Custom collection, for anything else',
    icon: <BookmarkIcon className='size-4' />
  }
]

export type RepositoryCreationSchema = z.infer<typeof createRepositorySchema>

type Props = {
  isOpen: boolean
  onClose: () => void
  // flowDetails?: VisitorFlowV2;
  refetchData?: () => void
}

const CreateProblemSetModal = ({
  isOpen,
  onClose,
  // flowDetails,
  refetchData
}: Props) => {
  if (!isOpen) return null
  const router = useRouter()
  const { mutateAsync: createRepository } = api.repository.create.useMutation({
    // refetchOnWindowFocus: false,
    onSuccess(createdCollection: { id: String }) {
      Toast({
        title: 'Repository created successfully',
        type: 'success'
      })
      // Toaster({ title: 'Collection Created', type: 'success' })
      // const prevData = utils.autoGreet.getAllAutoGreetMessages.getData(
      //   autoGreet.segment_id
      // )
      // setLiveFeedCards(data)
      router.push(`/repositories/${createdCollection.id}`)
    },
    onError(error: { message: any }) {
      Toast({
        type: 'error',
        title: 'Error!',
        message: error?.message || 'Something went wrong',
        duration: 5000
      })
    }
  })
  // const {
  //   selectedFlowId,
  //   setSelectedFlowId,
  //   setSelectedFlowData,
  //   setStartingTriggerType,
  //   setTriggerConditions,
  // } = useVisitorFlow();

  // useEffect(() => {
  //   if (flowDetails) {
  //     form.setValue("name", flowDetails.name);
  //     form.setValue("description", flowDetails.description ?? "");
  //     form.setValue("problemset_type", flowDetails.starting_trigger);
  //   }
  // }, [flowDetails]);

  const handleSave = async (values: z.infer<typeof createRepositorySchema>) => {
    if (!values) return
    if (!allowedProblemSetTypes.includes(values.starting_trigger)) {
      Toast({
        title: `Error: Only Custom, Segment, Webhhoks and Account List Triggers are supported`,
        type: 'error'
      })
      return
    }

    const data = {
      title: values.title as string,
      description: values.description as string,
      type: values.starting_trigger
      // flow_id: selectedFlowId ?? "",
    }
    try {
      const collection = await createRepository(data)

      onClose()
      // setStartingTriggerType(values.starting_trigger);
      // const url = `/outbound-workflows/flow/${flowId}`;
      // setSelectedFlowData(null);
      // router.push(url);
      // setSelectedFlowId(flowId);
      // setTriggerConditions([]);
      if (refetchData) refetchData()
    } catch (error) {
      console.error(error)
      Toast({
        type: 'error',
        title: 'Collection creation failed'
        // message: "Something went wrong. Please try again.",
      })
    }
  }

  const form = useForm<RepositoryCreationSchema>({
    resolver: zodResolver(createRepositorySchema),
    defaultValues: {
      title: '',
      description: '',
      starting_trigger: 'PROBLEM_SET'
    }
  })

  const handlecreateRepository = async (values: RepositoryCreationSchema) => {
    handleSave(values)
  }

  return (
    <>
      <div className='fixed inset-0 z-40 bg-foreground/10'></div>
      <div className='border-gray fixed inset-0 left-[50%] top-[50%] z-50 m-4 flex h-fit w-max -translate-x-1/2 -translate-y-1/2 flex-col gap-6 rounded-2xl border bg-background p-8'>
        <div className='flex flex-col'>
          <p className='text-lg font-medium text-foreground'>New Collection</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handlecreateRepository)}>
            <div className='flex flex-col gap-3'>
              <div className='flex flex-col gap-1.5'>
                {/* <p className='text-sm font-medium text-muted-foreground'>
                  Title
                </p> */}
                <FormField
                  control={form.control}
                  name='title'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className={cn('w-80 bg-background')}
                          placeholder='Problem Set Title'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className={cn('w-80 bg-background')}
                        placeholder='Description'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='starting_trigger'
                render={({ field }) => (
                  <FormItem className='space-y-4'>
                    <FormLabel className='text-sm font-medium text-muted-foreground'>
                      Select Type
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        className='grid grid-cols-3 gap-3'
                        value={field.value}
                      >
                        {problemSetTypes.map(s => {
                          return (
                            <FormItem
                              key={s.id}
                              // value={s.title}
                              className={cn(
                                'relative flex h-32 min-w-[236px] max-w-[236px] cursor-pointer flex-col items-start justify-start space-y-0 rounded-2xl border-2 p-4 text-sm font-medium',
                                field.value === s.id
                                  ? 'border-primary bg-primary/10'
                                  : 'border-border'
                              )}
                            >
                              <div className='flex flex-col gap-1'>
                                <span className='flex w-full items-center justify-between'>
                                  <FormLabel className='text-lg font-medium text-foreground'>
                                    {s.title}
                                  </FormLabel>
                                  {s.icon}
                                </span>
                                <FormDescription className='text-xs font-normal text-muted-foreground'>
                                  {s.description}
                                </FormDescription>
                              </div>
                              <FormControl
                                className={cn(
                                  'absolute left-0 top-0',
                                  field.value === s.id
                                    ? 'border-primary-600'
                                    : 'border-gray-300 bg-white'
                                )}
                              >
                                <RadioGroupItem
                                  disabled={
                                    s.id !== 'PROBLEM_SET' ? true : false
                                  }
                                  value={s.id}
                                  className='h-full w-full opacity-0 disabled:opacity-0'
                                />
                              </FormControl>
                            </FormItem>
                          )
                        })}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
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
            variant={'default'}
            onClick={form.handleSubmit(handlecreateRepository)}
            size={'lg'}
            type='submit'
          >
            Create
          </Button>
        </div>
      </div>
    </>
  )
}

export default CreateProblemSetModal
