'use client'
import {
  Button,
  Input,
  Toast,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
  Badge
} from '@repo/ui'
import React, { useEffect, useState } from 'react'
import { useRepository } from '../../../../store'
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { api } from '@/trpc/react'
import { Jost } from 'next/font/google'
import { cn } from '@/lib/utils'
import { RepositoryItem } from '@repo/database'
const font2 = Jost({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin']
})
const EditItemTags = ({
  itemData,
  setQueryUserData,
  tags,
  setTags
}: {
  itemData: RepositoryItem & {
    children: RepositoryItem
    lastStatus: number
    tags: string[]
  }
  tags: string[]
  setTags: any
  setQueryUserData: (flag: boolean) => void
}) => {
  const utils = api.useUtils()
  // const { openItem, repositoryTags } = useRepository()
  const { repositoryTags, setRepositoryTags } = useRepository()
  // const [tags, setTags] = useState(openItem?.tags)
  const [newTag, setNewTag] = useState<string>('')
  const [filteredTags, setFilteredTags] = useState(repositoryTags)

  useEffect(() => {
    if (newTag) {
      const filteredStrings = repositoryTags.filter(tag => tag.includes(newTag))
      console.log(filteredStrings, newTag)
      setFilteredTags(filteredStrings)
    }
    console.log(repositoryTags)
  }, [newTag])
  const { mutateAsync: updateTags } = api.repositoryItem.updateTags.useMutation(
    {
      // refetchOnWindowFocus: false,
      onSuccess() {
        // Toast({ title: 'Tags updated', type: 'success' })
        setQueryUserData(true)
        utils.repositoryItem.getOrCreateUserData.invalidate({
          referenceId: itemData?.referenceId ?? undefined,
          referenceType: itemData?.referenceType ?? undefined
        })
        // router.push(`/repositories/${createdCollection.id}`)
      },
      onError(error: { message: any }) {
        Toast({
          type: 'error',
          title: 'Error!',
          message: error?.message || 'Something went wrong',
          duration: 5000
        })
      }
    }
  )

  const handleAddTag = (newTag: string) => {
    if (tags?.includes(newTag)) {
      // TODO:show toast optional
      return
    }
    const oldTags = tags ?? []
    const newRepoTags = [...new Set([...repositoryTags, newTag])]
    setTags(prev => (prev ? [...prev, newTag] : [newTag]))
    setRepositoryTags(newRepoTags)
    updateTags({
      referenceId: itemData.referenceId as string,
      referenceType: itemData.referenceType as 'PROBLEM' | 'CUSTOM_PROBLEM',
      tags: [...oldTags, newTag]
    })
    setNewTag('')

    // const upperCaseArr = tags?.map(tag => tag.toUpperCase())
    // // Use Set to remove duplicates
    // const uniqueTags = [...new Set(upperCaseArr)]
    // if (!itemData) return
    // updateTags({
    //   referenceId: itemData.referenceId as string,
    //   referenceType: itemData.referenceType as 'PROBLEM' | 'CUSTOM_PROBLEM',
    //   tags: uniqueTags
    // })
  }
  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!itemData) return
    if (event.key === 'Enter' && newTag) {
      if (tags?.includes(newTag)) {
        // TODO:show toast optional
        return
      }
      const oldTags = tags ?? []
      setTags(prev => (prev ? [...prev, newTag] : [newTag]))
      const newRepoTags = [...new Set([...repositoryTags, newTag])]
      setRepositoryTags(newRepoTags)
      updateTags({
        referenceId: itemData.referenceId as string,
        referenceType: itemData.referenceType as 'PROBLEM' | 'CUSTOM_PROBLEM',
        tags: [...oldTags, newTag]
      })
    }
  }
  const handleTagRemove = (removedTag: string) => {
    const oldTags = tags ?? []
    const updatedTags = tags.filter(tag => tag !== removedTag)
    setTags(updatedTags)
    updateTags({
      referenceId: itemData.referenceId as string,
      referenceType: itemData.referenceType as 'PROBLEM' | 'CUSTOM_PROBLEM',
      tags: updatedTags
    })
  }
  return (
    <div className='max-w-84 flex flex-wrap items-center'>
      {tags &&
        tags.map(tag => (
          // <Badge variant='secondary' className='text-muted-foreground'>
          //   {tag}
          // </Badge>
          <div
            className={cn(
              'group mx-1 flex items-center rounded-full border border-muted-foreground px-1 text-[10px] font-semibold uppercase text-muted-foreground'
              //
            )}
          >
            <span className=''></span>
            {tag}
            <span className='hidden group-hover:inline-block'>
              <XMarkIcon
                className='size-4'
                onClick={() => handleTagRemove(tag)}
              />
            </span>
          </div>
        ))}
      <Popover open={newTag.length > 0 && filteredTags?.length > 0}>
        <PopoverTrigger>
          <div className='mx-1 flex gap-4'>
            <Input
              value={newTag}
              placeholder='Add tag'
              onKeyDown={handleKeyDown}
              onChange={e => setNewTag(e.target.value.toUpperCase())}
              className='h-5 w-32 rounded-none border-2 border-transparent bg-transparent text-[10px] uppercase tracking-tight focus-visible:border-b-primary focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0'
            />
            {/* {isSearchResultLoading && <ArrowPathIcon className='size-5' />} */}
          </div>
        </PopoverTrigger>

        {newTag && (
          <PopoverContent className='relative w-36' align='start'>
            <div className='mb-2 text-xs'>Existing tags</div>
            <ScrollArea className='h-32 text-xs'>
              {filteredTags.length > 0 &&
                filteredTags.map(tag => (
                  <div
                    className={cn(
                      'hover:muted relative mb-1 flex-1 cursor-pointer rounded-full border border-transparent bg-background hover:border-foreground'
                      // isEditMode && 'scale-[1.01] border border-primary shadow-md'
                    )}
                    onClick={() => {
                      // setNewTag(tag)
                      handleAddTag(tag)

                      // setSelectedProblem(problem), setItemSearchTerm('')
                    }}
                  >
                    <div
                      className={cn(
                        'flex-1 justify-center gap-1 px-1 text-foreground'
                      )}
                    >
                      {tag}
                    </div>
                  </div>
                ))}
            </ScrollArea>
            <div className='absolute bottom-0 z-10 min-w-max bg-background pb-4 pt-1 text-[8px]'>
              Press Enter to add new
            </div>
          </PopoverContent>
        )}
      </Popover>
    </div>
  )
}

export default EditItemTags
