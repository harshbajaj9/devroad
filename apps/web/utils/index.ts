// import { RepositoryItem } from '@repo/database'

// type NodeType = RepositoryItem & {
//   children?: NodeType[] | undefined
//   depth: number
// }
// export const getNodeDepth = (node: NodeType) => {
//   if (!node.children || (node.children.length && node.children.length === 0)) {
//     return 0
//   }
//   let max = 0
//   for (const child of node.children) {
//     if (child.type === 'SECTION') max = Math.max(getNodeDepth(child), max)
//   }
//   return max + 1
// }
