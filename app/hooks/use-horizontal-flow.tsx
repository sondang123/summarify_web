import type { Edge, Node } from '@xyflow/react'
import { MarkerType, Position } from '@xyflow/react'
import dagre from 'dagre'
import { useCallback } from 'react'

interface MindmapItem {
  id: string
  parent: string
  label: string
}
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
const useMindmapToFlow = (mindmap: MindmapItem[]) => {
  const convertMindmapToFlow = useCallback(() => {
    const nodes: Node[] = []
    const edges: Edge[] = []
    const graph = new dagre.graphlib.Graph()

    graph.setGraph({ rankdir: 'LR', nodesep: 100, ranksep: 200 })
    graph.setDefaultEdgeLabel(() => ({}))

    // Create nodes and edges
    for (const item of mindmap) {
      if (!item.id || !item.label) {
        console.error('Invalid mindmap item:', item)
        continue
      }
      graph.setNode(item.id, { width: 150, height: 100, label: item.label })
      if (item.parent) {
        graph.setEdge(item.parent, item.id)
      }
    }

    dagre.layout(graph)

    // Tạo một Map để lưu trữ cấp độ ca mỗi node
    const nodeLevels = new Map<string, number>()

    // Hàm đệ quy để xác định cấp độ của mỗi node
    const setNodeLevel = (id: string, level: number) => {
      nodeLevels.set(id, level)
      for (const child of mindmap.filter((item) => item.parent === id)) {
        setNodeLevel(child.id, level + 1)
      }
    }

    // Tìm node gốc và bắt đầu xác định cấp độ
    const rootNode = mindmap.find(
      (item) => !item.parent || item.parent === '0' || item.parent === '',
    )
    if (rootNode) {
      setNodeLevel(rootNode.id, 0)
    }

    // Hàm để tạo màu viền đậm hơn
    const getDarkerColor = (color: string): string => {
      const darkenFactor = 0.2
      const hex = color.replace('#', '')
      const r = Number.parseInt(hex.substr(0, 2), 16)
      const g = Number.parseInt(hex.substr(2, 2), 16)
      const b = Number.parseInt(hex.substr(4, 2), 16)

      const darkerR = Math.round(r * (1 - darkenFactor))
      const darkerG = Math.round(g * (1 - darkenFactor))
      const darkerB = Math.round(b * (1 - darkenFactor))

      return `#${darkerR.toString(16).padStart(2, '0')}${darkerG.toString(16).padStart(2, '0')}${darkerB.toString(16).padStart(2, '0')}`
    }

    // Chuyển đổi graph thành nodes và edges
    for (const id of graph.nodes()) {
      const node = graph.node(id)
      if (!node || !node.label) {
        console.error('Invalid node:', id, node)
        continue
      }
      const level = nodeLevels.get(id) || 0
      const isRoot = level === 0
      const backgroundColor =
        levelColors[Math.min(level, levelColors.length - 1)]
      const borderColor = getDarkerColor(backgroundColor)
      nodes.push({
        id,
        data: { label: node.label },
        position: { x: node.x, y: node.y },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        style: {
          backgroundColor,
          borderRadius: isRoot ? '50%' : '12px',
          border: isRoot
            ? `2px dotted ${borderColor}`
            : `2px solid ${borderColor}`,
          width: isRoot ? '200px' : '250px',
          height: isRoot ? '200px' : 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: isRoot ? '18px' : '16px',
          fontWeight: isRoot ? 'bold' : 'semibold',
        },
      })
    }

    // Thay đổi cách tạo edges
    for (const item of mindmap) {
      if (item.parent) {
        const sourceLevel = nodeLevels.get(item.parent) || 0
        const sourceColor =
          levelColors[Math.min(sourceLevel + 1, levelColors.length - 1)]
        edges.push({
          id: `e${item.parent}-${item.id}`,
          source: item.parent,
          target: item.id,
          type: 'smoothstep',
          style: { stroke: sourceColor },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: sourceColor,
          },
        })
      }
    }

    return { initialNodes: nodes, initialEdges: edges }
  }, [mindmap])

  return convertMindmapToFlow()
}

export default useMindmapToFlow
