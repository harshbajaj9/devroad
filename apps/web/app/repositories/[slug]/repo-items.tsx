import {
  ArrowRightIcon,
  CheckCircleIcon,
  ClipboardDocumentIcon,
  DocumentIcon,
  EllipsisVerticalIcon
} from '@heroicons/react/24/outline'
import { $Enums, Repository } from '@repo/database'

import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@repo/ui'
import { Mail, MessageSquare, PlusCircle, User, UserPlus } from 'lucide-react'
import Image from 'next/image'
import { getItems } from '@/server/api/routers/utils/repository-item-utils'
import { auth } from '@/auth'
import { Node } from './node'
import { RepoStructureNode } from '@/store'
import MultiNotesAndReferences from './multi-notes-and-references'

interface EditableNodeProps {
  sectionData: any
}

// import { EditableNode } from './editable-node'
// import EditReferences from './edit-references'
// import EditNotes from './edit-notes'
// import AddItemModal from './add-item-modal'
// import DeleteItemModal from './delete-item-modal'
// import MoveItemModal from './move-item-modal'
// import NotesAndReferences from './notes-and-references'
// import SectionDescriptionAndReferences from './section-desc-and-ref'
// import RepoDescriptionAndReferences from './repo-desc-and-ref'

interface RepositoryItems {
  repository: Repository
  isOwner?: boolean
}

const RepositoryItems = async ({
  repository,
  isOwner = false
}: RepositoryItems) => {
  // const {
  //   data: repoNode,
  //   isLoading,
  //   isSuccess
  // } = api.repository.get.useQuery(repository.id)
  // const [repoKids, setRepoKids] = useState(repoNode?.children)
  const session = await auth()
  const userId = session?.user.id
  const repositoryNode = await getItems({ node: repository, userId })
  if (!repositoryNode) {
    return
  }
  const repoKids = repositoryNode.children
  // const repoKidsMemo = useMemo(() => {
  //   return repoKids?.map(repoKid => {
  //     return (
  //       <EditableNode
  //         path={[{ id: repoNode.id, title: repoNode.title }]}
  //         // deleteItem={deleteItem}
  //         key={repoKid.id}
  //         nodeData={repoKid}
  //         updateOrder={updateOrder}
  //       />
  //     )
  //   })
  // }, [repoNode, repoKids, isSuccess])

  // const closeNotesAndResources = () => {
  //   setOpenItem(undefined)
  // }

  const getRepoStructure = (repoNode: any): RepoStructureNode => {
    const repoStructureSection: RepoStructureNode = {
      id: repoNode.id,
      title: repoNode.title
    }
    repoStructureSection.childNodes = [] as RepoStructureNode[]
    for (const repoItem of repoNode.children) {
      if (repoItem.type === 'ITEM') continue
      repoStructureSection.childNodes.push(getRepoStructure(repoItem))
    }
    return repoStructureSection
  }

  return (
    <>
      <div className='flex max-w-full pt-0'>
        <div className={cn('min-w-[50%]')}>
          <div className='sticky left-0 top-0 z-10'>
            <div className='flex justify-start'></div>
          </div>
          {repoKids?.length > 0 && (
            <div className='mr-2 mt-2 flex flex-col gap-1'>
              {repoKids?.map(repoKid => {
                return (
                  <Node
                    isOwner={isOwner}
                    path={[
                      { id: repositoryNode.id, title: repositoryNode.title }
                    ]}
                    key={repoKid.id}
                    nodeData={repoKid}
                  />
                )
              })}
            </div>
          )}
        </div>
        <MultiNotesAndReferences repository={repository} />
      </div>
    </>
  )
}

export default RepositoryItems
