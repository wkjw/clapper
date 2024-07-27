'use client'

import { cn } from '@/lib/utils'
import { isClapEntity } from '@/components/tree-browsers/utils/isSomething'
import { TreeNodeItem, LibraryNodeType } from '@/components/tree-browsers/types'
import { Tree } from '@/components/core/tree'

import { useWorkflowTree } from './useWorkflowTree'

export function WorkflowTree({
  className = '',
}: {
  className?: string
} = {}) {
  const libraryTreeRoot = useWorkflowTree((s) => s.libraryTreeRoot)
  const selectTreeNode = useWorkflowTree((s) => s.selectTreeNode)
  const selectedTreeNodeId = useWorkflowTree((s) => s.selectedTreeNodeId)

  /**
   * handle click on tree node
   * yes, this is where the magic happens!
   *
   * @param id
   * @param nodeType
   * @param node
   * @returns
   */
  const handleOnChange = async (
    id: string | null,
    nodeType?: LibraryNodeType,
    nodeItem?: TreeNodeItem
  ) => {
    console.log(`calling selectTreeNodeById(id)`)
    selectTreeNode(id, nodeType, nodeItem)

    if (!nodeType || !nodeItem) {
      console.log('tree-browser: clicked on an undefined node')
      return
    }
    if (isClapEntity(nodeType, nodeItem)) {
      // ClapEntity
    } else {
      console.log(
        `tree-browser: no action attached to ${nodeType}, so skipping`
      )
      return
    }
    console.log(`tree-browser: clicked on a ${nodeType}`, nodeItem)
  }

  return (
    <Tree.Root<LibraryNodeType, TreeNodeItem>
      value={selectedTreeNodeId}
      onChange={handleOnChange}
      className={cn(`not-prose h-full w-full px-2 pt-2`, className)}
      label="Workflows"
    >
      {libraryTreeRoot.map((node) => (
        <Tree.Node node={node} key={node.id} />
      ))}
    </Tree.Root>
  )
}
