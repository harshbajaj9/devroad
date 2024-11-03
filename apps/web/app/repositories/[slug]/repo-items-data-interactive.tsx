'use client'
import { cn, getStatusCountValues, NodeType } from '@/lib/utils'
import { useFilterTags, useRepository } from '@/store'
import { Button } from '@repo/ui'
import React, { useEffect, useState } from 'react'

const RepoItemsDataInteractive = ({ repoNode }: { repoNode: NodeType }) => {
  const { setRepositoryDetails, setRepositoryTags } = useRepository()
  const { repositoryTags } = useRepository()
  const {
    filterTags,
    setFilterTags,
    difficultyTag,
    setDifficultyTag,
    hideTags,
    setHideTags
  } = useFilterTags()
  const { doneItems, revisitItems } = useRepository()
  const [countValues, setCountValues] = useState<{
    done: number
    revisit: number
    total: number
  }>({ done: 0, revisit: 0, total: 0 })
  useEffect(() => {
    const { done, total, revisit } = getStatusCountValues(
      repoNode,
      doneItems,
      revisitItems
    )
    console.log('hey there', done, total, revisit, doneItems, revisitItems)
    // const done = 1
    // const total = 2
    // const revisit = 1
    setCountValues({ done, revisit, total })
  }, [revisitItems, doneItems])

  return (
    <>
      <div
        className={cn(
          'relative h-2 overflow-hidden rounded-md',
          (countValues.done > 0 || countValues.revisit > 0) && 'border shadow'
        )}
      >
        <div
          className='absolute top-0 flex h-full items-center justify-center bg-green-500'
          style={{
            width: `${(countValues.done / countValues.total) * 100}%`,
            left: `0%`
          }}
        ></div>
        <div
          className='absolute top-0 flex h-full items-center justify-center bg-yellow-500'
          style={{
            width: `${(countValues.revisit / countValues.total) * 100}%`,
            left: `${(countValues.done / countValues.total) * 100}%`
          }}
        ></div>
      </div>
      <div className='my-4 flex flex-wrap items-center gap-4 px-4'>
        <Button
          variant={'outline'}
          className={cn(
            'cursor-pointer rounded-full p-1 px-4 text-xs font-semibold'
          )}
          onClick={() => {
            setHideTags(prev => !prev)
          }}
        >
          {hideTags ? 'Show Tags' : 'Hide Tags'}
        </Button>
        {!hideTags && (
          <div className='flex flex-wrap gap-2'>
            <span
              className={cn(
                'cursor-pointer rounded-full p-1 px-2 text-xs font-semibold text-muted-foreground',
                // ,
                difficultyTag === 'EASY' && 'bg-foreground text-background'
              )}
              onClick={() => {
                if (difficultyTag === 'EASY') setDifficultyTag(undefined)
                else setDifficultyTag('EASY')
              }}
            >
              EASY
            </span>
            <span
              className={cn(
                'cursor-pointer rounded-full p-1 px-2 text-xs font-semibold text-muted-foreground',
                // ,
                difficultyTag === 'MED' && 'bg-foreground text-background'
              )}
              onClick={() => {
                if (difficultyTag === 'MED') setDifficultyTag(undefined)
                else setDifficultyTag('MED')
              }}
            >
              MEDIUM
            </span>
            <span
              className={cn(
                'cursor-pointer rounded-full p-1 px-2 text-xs font-semibold text-muted-foreground',
                // ,
                difficultyTag === 'HARD' && 'bg-foreground text-background'
              )}
              onClick={() => {
                if (difficultyTag === 'HARD') setDifficultyTag(undefined)
                else setDifficultyTag('HARD')
              }}
            >
              HARD
            </span>

            {repositoryTags.map(tag => {
              return (
                <span
                  className={cn(
                    'cursor-pointer rounded-full p-1 px-2 text-xs font-semibold text-muted-foreground',
                    // ,
                    filterTags.includes(tag) && 'bg-foreground text-background'
                  )}
                  onClick={() => {
                    console.log(filterTags)
                    if (filterTags.includes(tag))
                      setFilterTags(prev => prev.filter(ftag => ftag !== tag))
                    else setFilterTags(prev => (prev ? [...prev, tag] : [tag]))
                  }}
                >
                  {tag}
                </span>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}

export default RepoItemsDataInteractive
