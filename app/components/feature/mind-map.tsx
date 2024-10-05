import { toPng } from 'html-to-image'
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react'
import ReactFlow, {
  type Edge,
  MarkerType,
  type Node,
  type ProOptions,
  type ReactFlowInstance,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from 'reactflow'
import 'reactflow/dist/style.css'
export interface MindmapRef {
  downloadImage: () => void
}

interface MindmapContentProps {
  initialNodes: Node[]
  initialEdges: Edge[]
}

const MindmapContent = forwardRef<MindmapRef, MindmapContentProps>(
  ({ initialNodes, initialEdges }, ref) => {
    const [nodes] = useNodesState<Node>(initialNodes)
    const [edges] = useEdgesState(initialEdges)
    const { zoomIn, zoomOut, fitView } = useReactFlow() // Add fitView here
    const [isLoading, setIsLoading] = useState(true)
    const [reactFlowInstance, setReactFlowInstance] =
      React.useState<ReactFlowInstance | null>(null)

    const downloadImage = useCallback(() => {
      fitView()
      if (reactFlowInstance) {
        const node = document.querySelector('.react-flow') as HTMLElement
        if (node) {
          toPng(node, {
            quality: 1,
            width: node.offsetWidth,
            height: node.offsetHeight,
          })
            .then((dataUrl) => {
              const link = document.createElement('a')
              link.download = 'mind_map.png'
              link.href = dataUrl
              link.click()
            })
            .catch((error) => {
              console.error('Error downloading image:', error)
            })
        }
      }
    }, [reactFlowInstance])

    useImperativeHandle(ref, () => ({ downloadImage }))

    // Add this proOptions object
    const proOptions: ProOptions = {
      hideAttribution: true,
    }

    return (
      <div className="relative h-[600px] w-full overflow-hidden bg-neutral-6">
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-neutral-6 bg-opacity-50">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
          </div>
        )}
        <div className="mx-3 ml-auto mt-3 flex w-fit gap-3 rounded-full border p-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            onClick={() => zoomIn()}
            className="cursor-pointer hover:opacity-80"
          >
            <path
              d="M13.1673 8.00004C13.1673 8.27604 12.9433 8.50004 12.6673 8.50004H8.50065V12.6667C8.50065 12.9427 8.27665 13.1667 8.00065 13.1667C7.72465 13.1667 7.50065 12.9427 7.50065 12.6667V8.50004H3.33398C3.05798 8.50004 2.83398 8.27604 2.83398 8.00004C2.83398 7.72404 3.05798 7.50004 3.33398 7.50004H7.50065V3.33337C7.50065 3.05737 7.72465 2.83337 8.00065 2.83337C8.27665 2.83337 8.50065 3.05737 8.50065 3.33337V7.50004H12.6673C12.9433 7.50004 13.1673 7.72404 13.1673 8.00004Z"
              fill="#505264"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            onClick={() => zoomOut()}
            className="cursor-pointer hover:opacity-80"
          >
            <path
              d="M12.6673 8.5H3.33398C3.05798 8.5 2.83398 8.276 2.83398 8C2.83398 7.724 3.05798 7.5 3.33398 7.5H12.6673C12.9433 7.5 13.1673 7.724 13.1673 8C13.1673 8.276 12.9433 8.5 12.6673 8.5Z"
              fill="#505264"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            onClick={() => fitView()}
            className="cursor-pointer hover:opacity-80"
          >
            <path
              d="M13 4.83333H10.6667C9.72733 4.83333 9.16667 4.27267 9.16667 3.33333V1C9.16667 0.724 9.39067 0.5 9.66667 0.5C9.94267 0.5 10.1667 0.724 10.1667 1V3.33333C10.1667 3.726 10.274 3.83333 10.6667 3.83333H13C13.276 3.83333 13.5 4.05733 13.5 4.33333C13.5 4.60933 13.276 4.83333 13 4.83333ZM4.83333 3.33333V1C4.83333 0.724 4.60933 0.5 4.33333 0.5C4.05733 0.5 3.83333 0.724 3.83333 1V3.33333C3.83333 3.726 3.726 3.83333 3.33333 3.83333H1C0.724 3.83333 0.5 4.05733 0.5 4.33333C0.5 4.60933 0.724 4.83333 1 4.83333H3.33333C4.27267 4.83333 4.83333 4.27267 4.83333 3.33333ZM4.83333 13V10.6667C4.83333 9.72733 4.27267 9.16667 3.33333 9.16667H1C0.724 9.16667 0.5 9.39067 0.5 9.66667C0.5 9.94267 0.724 10.1667 1 10.1667H3.33333C3.726 10.1667 3.83333 10.274 3.83333 10.6667V13C3.83333 13.276 4.05733 13.5 4.33333 13.5C4.60933 13.5 4.83333 13.276 4.83333 13ZM10.1667 13V10.6667C10.1667 10.274 10.274 10.1667 10.6667 10.1667H13C13.276 10.1667 13.5 9.94267 13.5 9.66667C13.5 9.39067 13.276 9.16667 13 9.16667H10.6667C9.72733 9.16667 9.16667 9.72733 9.16667 10.6667V13C9.16667 13.276 9.39067 13.5 9.66667 13.5C9.94267 13.5 10.1667 13.276 10.1667 13Z"
              fill="#505264"
            />
          </svg>
        </div>
        <ReactFlow
          className="!h-[560px]"
          nodes={nodes}
          edges={edges}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          panOnScroll
          zoomOnScroll={false}
          fitView
          minZoom={0.1}
          maxZoom={3}
          onInit={(instance) => {
            setReactFlowInstance(instance)
            setIsLoading(false)
          }}
          proOptions={proOptions} // Add this prop
          defaultEdgeOptions={{
            type: 'step',
            markerEnd: { type: MarkerType.Arrow },
          }}
        ></ReactFlow>
      </div>
    )
  },
)

MindmapContent.displayName = 'MindmapContent'

const Mindmap = forwardRef<MindmapRef, MindmapContentProps>((props, ref) => (
  <ReactFlowProvider>
    <MindmapContent ref={ref} {...props} />
  </ReactFlowProvider>
))

Mindmap.displayName = 'Mindmap'

export default Mindmap
