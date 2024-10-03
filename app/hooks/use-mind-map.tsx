import type { IMindmapItem } from '@/types/store/summary-result'
import { useMemo } from 'react'
import { MarkerType, Position } from 'reactflow'
interface Node {
  id: string
  data: { label: string }
  position: { x: number; y: number }
  style: {
    width: string
    height: string
    background: string
    color: string
    border: string
    borderRadius: string
    padding?: string
    display?: string
    justifyContent?: string
    alignItems?: string
    fontSize?: string
    fontWeight?: string
  }
  sourcePosition?: Position
  targetPosition?: Position
}

interface Edge {
  id: string
  source: string
  target: string
  type: 'step'
  style: { stroke: string }
  markerEnd: {
    type: MarkerType.ArrowClosed
    width: number
    height: number
    color: string
  }
}

export const useMindMapTransform = (
  mindMapData: IMindmapItem[] | undefined,
) => {
  const nodeWidth = 250 // Fixed width for all nodes
  const nodeHeight = 50 // Fixed height for all nodes
  const horizontalGap = 250 // Fixed horizontal gap between nodes
  const verticalGap = 100 // Fixed vertical gap between nodes

  const levelColors = [
    '#ffdd00', // Root
    '#FF6347', // Level 1
    '#a0dca9', // Level 2
    '#5a9dc1', // Level 3
    '#9ab7e2', // Level 4
    '#D6A2E8', // Level 5
    '#82CCDD', // Level 6
    '#df7605', // Level 7
    '#eb82aa', // Level 8
    '#8ca0ea', // Level 8 and beyond
  ]

  const darkenColor = (color: string, amount: number): string => {
    return `#${color.replace(/^#/, '').replace(
      /../g,
      (color) =>
        `0${Math.min(255, Math.max(0, Number.parseInt(color, 16) - amount))
          .toString(16)
          .padStart(2, '0')}`,
    )}`
  }

  const getNodeColor = (level: number): string =>
    levelColors[Math.min(level, levelColors.length - 1)]

  const transformData = (data: IMindmapItem[]) => {
    const nodes: Node[] = []
    const edges: Edge[] = []

    const layoutNodes = (
      item: IMindmapItem,
      x = 0,
      y = 0,
      level = 0,
    ): { width: number; height: number } => {
      const nodeColor = level === 0 ? '#FFA500' : getNodeColor(level)
      // Xóa dòng này: const edgeColor = darkenColor(nodeColor, 40)

      const node: Node = {
        id: item.id,
        data: { label: item.label },
        position: { x, y },
        style: {
          width: level === 0 ? '200px' : `${nodeWidth}px`,
          height: level === 0 ? '200px' : 'auto',
          background: nodeColor,
          color: 'black',
          border: level === 0 ? '3px dotted #98810a' : '1px solid #222',
          borderRadius: level === 0 ? '50%' : '12px',
          padding: '10px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: level === 0 ? '16px' : '14px',
          fontWeight: 'bold',
        },
        sourcePosition: Position.Right,
        targetPosition: level === 0 ? undefined : Position.Left,
      }
      nodes.push(node)

      if (item.parent) {
        edges.push({
          id: `e${item.parent}-${item.id}`,
          source: item.parent,
          target: item.id,
          type: 'step',
          style: { stroke: nodeColor }, // Sử dụng nodeColor thay vì edgeColor
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 20,
            height: 20,
            color: nodeColor, // Sử dụng nodeColor thay vì edgeColor
          },
        })
      }

      const children = data.filter((d) => d.parent === item.id)
      let totalChildrenHeight = 0
      let maxChildWidth = 0

      for (let i = 0; i < children.length; i++) {
        const child = children[i]
        const childX = x + nodeWidth + horizontalGap
        const childY = y + totalChildrenHeight
        const { width: childWidth, height: childHeight } = layoutNodes(
          child,
          childX,
          childY,
          level + 1,
        )
        totalChildrenHeight +=
          childHeight + (i < children.length - 1 ? verticalGap : 0)
        maxChildWidth = Math.max(maxChildWidth, childWidth)
      }

      const nodeWidthWithChildren =
        children.length > 0
          ? nodeWidth + horizontalGap + maxChildWidth
          : nodeWidth
      const nodeHeightWithChildren = Math.max(nodeHeight, totalChildrenHeight)

      // Center the node vertically relative to its children
      if (children.length > 0) {
        node.position.y = y + (nodeHeightWithChildren - nodeHeight) / 2
      }

      return {
        width: nodeWidthWithChildren,
        height: nodeHeightWithChildren,
      }
    }

    const rootNode = data.find((item) => !item.parent)
    if (rootNode) {
      layoutNodes(rootNode, 0, 0)
    }

    return { nodes, edges }
  }

  return useMemo(() => transformData(mindMapData ?? []), [mindMapData])
}
