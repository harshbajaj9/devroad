'use client'
import { RepoStructureNode, useEditRepository, useRepoStructure } from '@/store'
import {
  ChevronRightIcon,
  EllipsisVerticalIcon,
  FolderIcon,
  FolderOpenIcon
} from '@heroicons/react/24/outline'
// import { Folder, FolderOpen } from 'lucide-react'
import { useEffect, useState } from 'react'
import { MoveItemType } from './section-picker-move'
// import { ItemType } from './add-item-modal'

export const MoveDirectorPickerNode: React.FC<{
  path?: {
    id: string
    title: string
  }[]
  item: RepoStructureNode
  depth: number
  itemType: MoveItemType
  popoverClose: () => void
}> = ({ path, item, depth, popoverClose, itemType }) => {
  const [isOpen, setIsOpen] = useState(true)
  // console.log(path)
  const [curPath, setCurPath] = useState<{ id: string; title: string }[]>([])
  const { repoStructure } = useRepoStructure()
  const { movingItem } = useEditRepository()
  useEffect(() => {
    if (path && path.length > 0) {
      // console.log('render1yeah', path, { id: item.id, title: item.title })
      setCurPath([...path, { id: item.id, title: item.title }])
    } else {
      // console.log('render1no', path, { id: item.id, title: item.title })

      setCurPath([
        // { id: repoStructure.id, title: repoStructure.title },
        { id: item.id, title: item.title }
      ])
    }
  }, [path])
  // console.log('render14', path, curPath )

  const { currentPath, setCurrentPath } = useRepoStructure()
  return (
    <div>
      <div
        className={`group flex cursor-pointer items-center space-x-2 px-2 py-1 hover:bg-muted`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={() => {
          console.log('render12', currentPath)

          setCurrentPath(curPath)
          console.log('render13', currentPath)
          popoverClose()
        }}
      >
        <span
          className='inline-flex'
          onClick={e => {
            e.stopPropagation()
            setIsOpen(!isOpen)
          }}
        >
          {item.childNodes && (
            <ChevronRightIcon
              className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-90' : ''}`}
            />
          )}
          {isOpen ? (
            <FolderOpenIcon className='h-4 w-4' />
          ) : (
            <FolderIcon className='h-4 w-4' />
          )}
        </span>
        <span className='flex-grow text-sm'>{item.title}</span>
        {
          <span className='inline-block px-1 text-xs text-muted-foreground group-hover:hidden'>
            {item.childNodes?.length ?? 0}
          </span>
        }

        <span className='hidden text-gray-400 text-muted-foreground group-hover:inline-block'>
          <EllipsisVerticalIcon className='size-4' />
        </span>
      </div>
      {isOpen &&
        item.childNodes &&
        !(itemType === 'SECTION' && depth === 1) && (
          <div>
            {item.childNodes.map(child => (
              <MoveDirectorPickerNode
                path={curPath}
                key={child.id}
                item={child}
                depth={depth + 1}
                popoverClose={popoverClose}
                itemType={itemType}
              />
            ))}
          </div>
        )}
    </div>
  )
}
