'use client'
import { cn } from '@/lib/utils'
import { $Enums, RepositoryItem } from '@repo/database'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@repo/ui'
import Image from 'next/image'
import { ItemNode } from './item-node'
import { SectionNode } from './section-node'

export const InnerSectionNode = ({ sectionData }) => {
  return (
    <div className='flex flex-col gap-1 p-4 pb-8 pt-0'>
      {sectionData.children?.length > 0 &&
        sectionData.children.map(childNode => {
          return (
            <Node
              // path={curPath}
              key={childNode.id}
              nodeData={childNode}
            />
          )
        })}
    </div>
  )
}

interface InnerItemNodeProps {
  itemData: RepositoryItem & { children: RepositoryItem }
}
export const InnerItemNode = ({ itemData }: InnerItemNodeProps) => {
  const getPlatformIcon = (platform: $Enums.Platform) => {
    if (platform === $Enums.Platform.LC)
      return (
        <Image
          className='drop-shadow-2xl'
          src={'/lc.png'}
          width={20}
          height={20}
          alt='lc'
        ></Image>
      )
  }
  return (
    <div className='select-none'>
      <div className='flex'>
        <div className='p-auto flex min-h-full items-center justify-start border-0 px-2'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className='border-0'>
                  <a
                    target='_blank'
                    rel='noopener noreferrer'
                    href={itemData.problem?.url ?? '#'}
                    className={cn(
                      'flex items-center gap-1 font-semibold leading-7 text-muted-foreground [&:not(:first-child)]:mt-6'
                    )}
                  >
                    <span className=''>
                      {getPlatformIcon(itemData.problem.platform ?? 'LC')}
                    </span>
                    {itemData.problem?.title ?? itemData.id}
                  </a>
                  {/* <p
                        className={cn(
                          'font-semibold leading-7 text-muted-foreground [&:not(:first-child)]:mt-6',
                          
                        )}
                      >
                        {
                          itemData.problem?.title
                            ? itemData.problem.title
                            : itemData.title

                          // itemData.id
                          // problem?.title
                          // ? formatDate(new Date(problem.lastVisited), 'do MMM yyyy')
                          // : '-'
                        }
                      </p> */}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p
                // className={cn()}
                >
                  {itemData.problem?.title ?? itemData.id}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* <div className='border-0 p-2'>
            <p className='flex justify-start'>
              <EllipsisVerticalIcon />
            </p>
          </div> */}
      </div>
      <div className='flex items-center'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className='border-0 px-2'>
                <p className='flex justify-start'>
                  <span className='px-1 text-[10px] font-semibold text-background text-green-600 dark:text-green-400'>
                    {/* {problem.difficulty ?? '-'} */}EASY
                  </span>
                </p>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Difficulty</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className='border-0 px-2'>
                <p className='flex justify-start text-xs font-semibold text-muted-foreground'>
                  {/* {problem.category ?? '-'} */}
                  DSA
                </p>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Category</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}

interface NodeProps {
  // nodeData: { details: RepositoryItem; children: EditableNodeProps }
  nodeData: any
  // path: { id: string; title: string }[]
  isOwner?: boolean
}
export const Node = ({
  isOwner = false,
  // path,
  nodeData
  // deleteItem
}: NodeProps) => {
  return (
    <div
      className={cn(
        'flex items-center justify-start overflow-hidden rounded-md border bg-muted'
        // 'shadow-sm shadow-muted-foreground/10',

        // path.length === 1 &&
        //   'shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'
      )}
    >
      {nodeData.type === 'SECTION' ? (
        <SectionNode
          // path={path}
          sectionData={nodeData}
        >
          <InnerSectionNode sectionData={nodeData} />
        </SectionNode>
      ) : (
        <ItemNode
          // path={path}
          itemData={nodeData}
        >
          <InnerItemNode itemData={nodeData} />
        </ItemNode>
      )}
    </div>
  )
}