import { CustomItem, Problem, Repository, RepositoryItem } from '@repo/database'
import { type ClassValue, clsx } from 'clsx'
import { ReadonlyURLSearchParams } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export type NodeType = (RepositoryItem | Repository) & {
  children?: NodeType[] | undefined
  depth?: number
  problem?: Problem
  customProblem?: CustomItem
}

export type ItemNodeType = RepositoryItem & {
  children?: ItemNodeType[] | undefined
  depth?: number
  problem?: Problem
  customProblem?: CustomItem
  // Below 2 attributes are not part of actual data, but are sent during the api call to get all items
  lastStatus?: number
  tags?: string[]
}

export const getStatusCountValues = (
  node: NodeType,
  doneItems: string[],
  revisitItems: string[]
) => {
  let done = 0
  let revisit = 0
  let total = 0
  if (node?.children) {
    for (const child of node.children) {
      if (child.type === 'ITEM') {
        done = done + (doneItems.includes(child.referenceId as string) ? 1 : 0)
        revisit =
          revisit + (revisitItems.includes(child.referenceId as string) ? 1 : 0)
        total++
      } else {
        const {
          done: childDone,
          revisit: childRevisit,
          total: childTotal
        } = getStatusCountValues(child, doneItems, revisitItems)
        done += childDone
        revisit += childRevisit
        total += childTotal
      }
    }
  }
  return { done, revisit, total }
}

export const getRepositoryTags = (
  node: (Repository | RepositoryItem) & {
    children?: RepositoryItem[]
    tags?: string[]
  }
) => {
  if (node.type === 'ITEM') {
    return node.tags
  }
  const items: ((Repository | RepositoryItem) & {
    children?: RepositoryItem[]
    tags?: string[]
  })[] = node.children ?? []
  let tagsSet = new Set<string>([])
  for (const item of items) {
    const childTags = getRepositoryTags(item)
    if (childTags) tagsSet = new Set([...tagsSet, ...childTags])
  }
  return [...tagsSet]
}

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams
) => {
  // console.log('createurl', pathname, params.toString())

  const paramsString = params.toString()
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`
  // console.log('createurl', paramsString, queryString)
  return `${pathname}${queryString}`
}
import { DefaultCompanies, PSCategoryFilter, PSRoleFilter } from 'lib/lib'

export const getRoleById = (roleId: string) => {
  for (const roleCategory of PSRoleFilter) {
    const foundRole = roleCategory.items.find(item => item.id === roleId)
    if (foundRole) {
      return foundRole // Return the value if a matching id is found
    }
  }
  return undefined // Return undefined if the id doesn't exist
}

export const getCatById = (catId: string | undefined) => {
  if (catId === undefined) return undefined
  const foundCategory = PSCategoryFilter.find(item => item.id === catId)
  if (foundCategory) {
    return foundCategory // Return the value if a matching id is found
  }
  return undefined // Return undefined if the id doesn't exist
}

export const getCompanyById = (compId: string) => {
  const foundCompany = DefaultCompanies.find(item => item.id === compId)
  if (foundCompany) {
    return foundCompany // Return the value if a matching id is found
  }
  return undefined // Return undefined if the id doesn't exist
}

export const getPlatformIconSrc = (platform: string | null) => {
  if (platform === 'LC') return '/lc.png'
  return '/na.png'
  // return (
  //   <Image
  //     className='drop-shadow-2xl'
  //     src={'/lc.png'}
  //     width={20}
  //     height={20}
  //     alt='lc'
  //   ></Image>
  // )
}
