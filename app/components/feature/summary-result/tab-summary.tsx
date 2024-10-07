import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Tooltip } from '@radix-ui/react-tooltip'
import { type MouseEvent, useRef, useState } from 'react'
import { type Edge, type Node, Position } from 'reactflow'
import Mindmap, { type MindmapRef } from '../mind-map'
import { RecentQuiz } from './recent-quiz'
const initialNodes: Node[] = [
  {
    id: 'aji',
    type: 'input',
    data: { label: 'Aji' },
    position: { x: 0, y: 0 },
    style: {
      background: '#FFA500',
      color: 'white',
      borderRadius: '20px',
      padding: '10px',
    },
    sourcePosition: Position.Right,
  },

  {
    id: 'category1',
    data: { label: 'Category 1' },
    position: { x: 200, y: -100 },
    style: {
      background: '#FF6347',
      color: 'white',
      borderRadius: '15px',
      padding: '5px',
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: 'subcategory1-1',
    data: { label: 'Subcategory 1-1' },
    position: { x: 400, y: -150 },
    style: {
      background: '#4682B4',
      color: 'white',
      borderRadius: '10px',
      padding: '3px',
    },
    sourcePosition: Position.Left,
    targetPosition: Position.Left,
  },
  {
    id: 'subcategory1-2',
    data: { label: 'Subcategory 1-2' },
    position: { x: 400, y: -50 },
    style: {
      background: '#4682B4',
      color: 'white',
      borderRadius: '10px',
      padding: '3px',
    },
    sourcePosition: Position.Left,
    targetPosition: Position.Left,
  },

  {
    id: 'category2',
    data: { label: 'Category 2' },
    position: { x: 200, y: 100 },
    style: {
      background: '#32CD32',
      color: 'white',
      borderRadius: '15px',
      padding: '5px',
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: 'subcategory2-1',
    data: { label: 'Subcategory 2-1' },
    position: { x: 400, y: 50 },
    style: {
      background: '#9370DB',
      color: 'white',
      borderRadius: '10px',
      padding: '3px',
    },
    sourcePosition: Position.Left,
    targetPosition: Position.Left,
  },
  {
    id: 'subcategory2-2',
    data: { label: 'Subcategory 2-2' },
    position: { x: 400, y: 150 },
    style: {
      background: '#9370DB',
      color: 'white',
      borderRadius: '10px',
      padding: '3px',
    },
    sourcePosition: Position.Left,
    targetPosition: Position.Left,
  },
  {
    id: 'subcategory2-3',
    data: { label: 'Subcategory 2-3' },
    position: { x: 400, y: 250 },
    style: {
      background: '#9370DB',
      color: 'white',
      borderRadius: '10px',
      padding: '3px',
    },
    sourcePosition: Position.Left,
    targetPosition: Position.Left,
  },
  {
    id: 'subcategory2-4',
    data: { label: 'subcategory2-4' },
    position: { x: 400, y: 350 },
    style: {
      background: '#FF6347',
      color: 'white',
      borderRadius: '15px',
      padding: '5px',
    },
    sourcePosition: Position.Left,
    targetPosition: Position.Left,
  },
]

const initialEdges: Edge[] = [
  {
    id: 'e-aji-category1',
    source: 'aji',
    target: 'category1',

    type: 'step',
    style: { stroke: '#FF6347' },
  },
  {
    id: 'e-aji-category2',
    source: 'aji',
    target: 'category2',
    style: { stroke: '#32CD32' },
    type: 'step',
  },
  {
    id: 'e-category1-sub1-1',
    source: 'category1',
    target: 'subcategory1-1',
    style: { stroke: '#4682B4' },
    type: 'step',
  },
  {
    id: 'e-category1-sub1-2',
    source: 'category1',
    target: 'subcategory1-2',
    style: { stroke: '#4682B4' },
    type: 'step',
  },
  {
    id: 'e-category2-sub2-1',
    source: 'category2',
    target: 'subcategory2-1',
    style: { stroke: '#9370DB' },
    type: 'step',
  },
  {
    id: 'e-category2-sub2-2',
    source: 'category2',
    target: 'subcategory2-2',
    style: { stroke: '#9370DB' },
    type: 'step',
  },
  {
    id: 'e-category2-sub2-3',
    source: 'category2',
    target: 'subcategory2-3',
    style: { stroke: '#9370DB' },
    type: 'step',
  },
  {
    id: 'e-category2-sub2-4',
    source: 'category2',
    target: 'subcategory2-4',
    style: { stroke: '#9370DB' },
    type: 'step',
  },
]

interface IHeaderCopy {
  title: string
  clickCopy?: (event: MouseEvent<HTMLDivElement>) => void
  iconLeft: React.ReactNode
  showCopy?: boolean
  iconRight?: React.ReactNode
}

export const TabsSummary = () => {
  const [showTooltip, setShowTooltip] = useState(false)
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText('Nội dung cần sao chép')
      setShowTooltip(true)
      setTimeout(() => setShowTooltip(false), 1000)
    } catch (err) {
      console.error('Không thể sao chép:', err)
    }
  }
  const HeaderCopy = ({
    iconLeft,
    title,
    clickCopy,
    showCopy = true,
    iconRight,
  }: IHeaderCopy) => {
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {iconLeft}
          <p className="typo-s20-w600 text-neutral-0">{title}</p>
        </div>
        {showCopy ? (
          <TooltipProvider>
            <Tooltip open={showTooltip}>
              <TooltipTrigger asChild>
                <div
                  className="flex cursor-pointer items-center hover:opacity-80"
                  onClick={clickCopy}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="me-2"
                  >
                    <path
                      d="M20.53 7.47L15.53 2.47C15.389 2.329 15.199 2.25 15 2.25H10.3999C8.3979 2.25 7.25 3.39799 7.25 5.39999V6.25H6.3999C4.3979 6.25 3.25 7.39799 3.25 9.39999V19.6C3.25 21.601 4.3979 22.75 6.3999 22.75H13.5991C15.6011 22.75 16.749 21.602 16.749 19.6V18.75H17.5991C19.6011 18.75 20.749 17.602 20.749 15.6V8C20.75 7.801 20.671 7.61 20.53 7.47ZM15.75 4.811L18.189 7.25H17.5C16.24 7.25 15.75 6.759 15.75 5.5V4.811ZM15.25 19.6C15.25 20.787 14.7871 21.25 13.6001 21.25H6.40088C5.21288 21.25 4.75098 20.787 4.75098 19.6V9.39999C4.75098 8.21299 5.21388 7.75 6.40088 7.75H7.25098V15.6C7.25098 17.601 8.39888 18.75 10.4009 18.75H15.251V19.6H15.25ZM17.6001 17.25H10.4009C9.21288 17.25 8.75098 16.787 8.75098 15.6V5.39999C8.75098 4.21299 9.21388 3.75 10.4009 3.75H14.251V5.5C14.251 7.596 15.405 8.75 17.501 8.75H19.251V15.6C19.25 16.787 18.7871 17.25 17.6001 17.25Z"
                      fill="#8C60F4"
                    />
                  </svg>
                  <p className="typo-s14-w500 text-main-primary">Copy</p>
                </div>
              </TooltipTrigger>
              <TooltipContent className="typo-s16-w600 border-none bg-main-success text-white shadow-none outline-none">
                Copy success!
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : null}
        {iconRight ?? null}
      </div>
    )
  }

  const mindmapRef = useRef<MindmapRef>(null)
  const handleDownload = () => {
    if (mindmapRef.current) {
      mindmapRef.current.downloadImage()
    }
  }
  return (
    <div>
      <Tabs defaultValue="Summary">
        <TabsList className="w-[70%] justify-between bg-transparent p-0">
          <TabsTrigger
            value="Summary"
            className="typo-s14-w500 flex-1 py-2.5 data-[state=active]:typo-s14-w600 data-[state=active]:rounded-none data-[state=active]:rounded-tl-2 data-[state=active]:rounded-tr-2 data-[state=active]:bg-white data-[state=active]:shadow-none"
          >
            Summary
          </TabsTrigger>
          <TabsTrigger
            value="Transcript"
            className="typo-s14-w500 flex-1 py-2.5 data-[state=active]:typo-s14-w600 data-[state=active]:rounded-none data-[state=active]:rounded-tl-2 data-[state=active]:rounded-tr-2 data-[state=active]:bg-white data-[state=active]:shadow-none"
          >
            Transcript
          </TabsTrigger>
          <TabsTrigger
            value="Mindmap"
            className="typo-s14-w500 flex-1 py-2.5 data-[state=active]:typo-s14-w600 data-[state=active]:rounded-none data-[state=active]:rounded-tl-2 data-[state=active]:rounded-tr-2 data-[state=active]:bg-white data-[state=active]:shadow-none"
          >
            Mindmap
          </TabsTrigger>
          <TabsTrigger
            value="Quiz"
            className="typo-s14-w500 flex-1 py-2.5 data-[state=active]:typo-s14-w600 data-[state=active]:rounded-none data-[state=active]:rounded-tl-2 data-[state=active]:rounded-tr-2 data-[state=active]:bg-white data-[state=active]:shadow-none"
          >
            Quiz
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="Summary"
          className="mt-0 rounded-2 rounded-tl-none border-t border-main-divider bg-white p-6"
        >
          <HeaderCopy
            title="Summary"
            clickCopy={() => {
              handleCopy()
            }}
            iconLeft={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                className="me-2"
              >
                <path
                  d="M13.3333 25.6667H8C5.89733 25.6667 5 24.7694 5 22.6667V6.66669C5 4.56402 5.89733 3.66669 8 3.66669H15V6.66669C15 9.89069 16.776 11.6667 20 11.6667H23V13.3334C23 13.8854 23.448 14.3334 24 14.3334C24.552 14.3334 25 13.8854 25 13.3334V10.6667C25 10.4014 24.8947 10.1467 24.7067 9.96002L16.7067 1.96002C16.5187 1.77202 16.2653 1.66669 16 1.66669H8C4.776 1.66669 3 3.44269 3 6.66669V22.6667C3 25.8907 4.776 27.6667 8 27.6667H13.3333C13.8853 27.6667 14.3333 27.2187 14.3333 26.6667C14.3333 26.1147 13.8853 25.6667 13.3333 25.6667ZM17 6.66669V5.08136L21.5853 9.66669H20C17.8973 9.66669 17 8.76935 17 6.66669ZM10.3333 14.6667C10.3333 15.2187 9.88533 15.6667 9.33333 15.6667C8.78133 15.6667 8.33333 15.2187 8.33333 14.6667C8.33333 14.1147 8.78133 13.6667 9.33333 13.6667C9.88533 13.6667 10.3333 14.1147 10.3333 14.6667ZM10.3333 20C10.3333 20.552 9.88533 21 9.33333 21C8.78133 21 8.33333 20.552 8.33333 20C8.33333 19.448 8.78133 19 9.33333 19C9.88533 19 10.3333 19.448 10.3333 20ZM18.6667 13.6667C19.2187 13.6667 19.6667 14.1147 19.6667 14.6667C19.6667 15.2187 19.2187 15.6667 18.6667 15.6667H12.6667C12.1147 15.6667 11.6667 15.2187 11.6667 14.6667C11.6667 14.1147 12.1147 13.6667 12.6667 13.6667H18.6667ZM15.6667 20C15.6667 20.552 15.2187 21 14.6667 21H12.6667C12.1147 21 11.6667 20.552 11.6667 20C11.6667 19.448 12.1147 19 12.6667 19H14.6667C15.2187 19 15.6667 19.448 15.6667 20ZM28.36 18.2934L27.04 16.9734C26.6267 16.56 26.0788 16.3334 25.4961 16.3334C25.4948 16.3334 25.4935 16.3334 25.4935 16.3334C24.9095 16.3334 24.3586 16.5627 23.9479 16.9774L16.6266 24.332C16.4386 24.5187 16.3346 24.7734 16.3346 25.0374V28C16.3346 28.552 16.7826 29 17.3346 29H20.2988C20.5628 29 20.8172 28.8947 21.0039 28.708L28.3587 21.3867C28.7734 20.9747 29 20.4254 29.0013 19.8414C29 19.2574 28.7734 18.708 28.36 18.2934ZM25.4948 18.3334C25.5295 18.3334 25.58 18.3427 25.6253 18.388L26.9453 19.708C26.9906 19.7534 27 19.8054 27 19.84C27 19.8747 26.9906 19.9254 26.9453 19.9707L26.0973 20.8147L24.5186 19.236L25.3626 18.388C25.4093 18.3427 25.4601 18.3334 25.4948 18.3334ZM19.8841 27H18.3333V25.4494L23.1081 20.6533L24.68 22.2254L19.8841 27Z"
                  fill="#FE8253"
                />
              </svg>
            }
          />
        </TabsContent>
        <TabsContent
          value="Transcript"
          className="mt-0 rounded-2 border-t border-main-divider bg-white p-6"
        >
          <HeaderCopy
            title="Transcript"
            clickCopy={() => {
              handleCopy()
            }}
            iconLeft={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                className="me-2"
              >
                <path
                  d="M9.88444 29C9.70177 29 9.51911 28.9507 9.35645 28.848C8.96178 28.6013 8.78843 28.1147 8.94043 27.6747L12.6057 16.9987H9.33773C8.5884 16.9987 7.88037 16.636 7.44304 16.028C7.0057 15.4213 6.88705 14.636 7.12305 13.9267L10.6178 5.00134C11.0218 3.78401 12.0697 2.99866 13.335 2.99866H19.307C20.095 2.99866 20.8231 3.392 21.2564 4.04934C21.6898 4.708 21.7617 5.53334 21.4497 6.256L19.4031 10.9987H22.6658C23.6124 10.9987 24.4591 11.564 24.8218 12.4387C25.1844 13.3133 24.9857 14.312 24.3164 14.9813L10.5938 28.7053C10.3991 28.9 10.1431 29 9.88444 29ZM13.3337 5C12.8031 5 12.5818 5.428 12.4964 5.684L9.00171 14.6107C8.97238 14.7027 9.02837 14.8107 9.06437 14.8613C9.10171 14.9133 9.18709 15 9.33643 15H13.1644C13.6804 15 14.167 15.2507 14.467 15.6693C14.767 16.088 14.8457 16.6307 14.679 17.1187L12.2364 24.236L22.9018 13.5693C23.0391 13.432 23.0057 13.2827 22.9737 13.2067C22.9417 13.1307 22.8591 13.0013 22.6658 13.0013H18.7951C18.2551 13.0013 17.7564 12.732 17.4591 12.2813C17.1617 11.8307 17.1124 11.264 17.3258 10.768L19.6138 5.46667C19.6751 5.32267 19.6231 5.20668 19.5858 5.15068C19.5484 5.09468 19.4644 5 19.3084 5H13.3337ZM13.1644 17H13.1777H13.1644Z"
                  fill="#FE8253"
                />
              </svg>
            }
          />
        </TabsContent>
        <TabsContent
          value="Mindmap"
          className="mt-0 rounded-2 border-t border-main-divider bg-white p-6"
        >
          <div className="mb-4">
            <HeaderCopy
              title="Mindmap"
              showCopy={false}
              iconRight={
                <div
                  className="flex cursor-pointer items-center hover:opacity-80"
                  onClick={handleDownload}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="me-2"
                  >
                    <path
                      d="M8.46997 13.53C8.17697 13.237 8.17697 12.762 8.46997 12.469C8.76297 12.176 9.23801 12.176 9.53101 12.469L11.251 14.189V3C11.251 2.586 11.587 2.25 12.001 2.25C12.415 2.25 12.751 2.586 12.751 3V14.189L14.4709 12.469C14.7639 12.176 15.239 12.176 15.532 12.469C15.825 12.762 15.825 13.237 15.532 13.53L12.532 16.53C12.463 16.599 12.3801 16.654 12.2881 16.692C12.1961 16.73 12.099 16.75 12.001 16.75C11.903 16.75 11.8061 16.73 11.7141 16.692C11.6221 16.654 11.539 16.599 11.47 16.53L8.46997 13.53ZM18 9.25C17.586 9.25 17.25 9.586 17.25 10C17.25 10.414 17.586 10.75 18 10.75C19.577 10.75 20.25 11.423 20.25 13V18C20.25 19.577 19.577 20.25 18 20.25H6C4.423 20.25 3.75 19.577 3.75 18V13C3.75 11.423 4.423 10.75 6 10.75C6.414 10.75 6.75 10.414 6.75 10C6.75 9.586 6.414 9.25 6 9.25C3.582 9.25 2.25 10.582 2.25 13V18C2.25 20.418 3.582 21.75 6 21.75H18C20.418 21.75 21.75 20.418 21.75 18V13C21.75 10.582 20.418 9.25 18 9.25Z"
                      fill="#8C60F4"
                    />
                  </svg>
                  <p className="typo-s14-w500 text-main-primary">Download</p>
                </div>
              }
              iconLeft={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  className="me-2"
                >
                  <path
                    d="M27.3334 12.3333C28.9881 12.3333 30.3334 10.988 30.3334 9.33329C30.3334 7.67863 28.9881 6.33329 27.3334 6.33329C26.0321 6.33329 24.9321 7.17196 24.5174 8.33329H19.6401C19.5107 6.66129 18.4268 5.66663 16.6654 5.66663H15.3321C13.5708 5.66663 12.4881 6.66129 12.3574 8.33329H7.48006C7.0654 7.17196 5.96673 6.33329 4.66406 6.33329C3.0094 6.33329 1.66406 7.67863 1.66406 9.33329C1.66406 10.988 3.0094 12.3333 4.66406 12.3333C5.9654 12.3333 7.0654 11.4946 7.48006 10.3333H9.60539C7.27472 12.1466 5.9201 15.1439 5.72144 19.0213C4.0161 19.1306 2.99878 20.2186 2.99878 22V23.3333C2.99878 25.212 4.12011 26.3333 5.99878 26.3333H7.33211C9.21078 26.3333 10.3321 25.212 10.3321 23.3333V22C10.3321 20.2493 9.34804 19.1693 7.69604 19.028C7.85338 16.2586 8.77874 12.4319 12.4587 10.9573C12.7881 12.2466 13.8041 13 15.3321 13H16.6654C18.1948 13 19.2094 12.2479 19.5387 10.9573C23.2187 12.4319 24.1441 16.2586 24.3014 19.028C22.6481 19.168 21.6654 20.2493 21.6654 22V23.3333C21.6654 25.212 22.7868 26.3333 24.6654 26.3333H25.9988C27.8774 26.3333 28.9988 25.212 28.9988 23.3333V22C28.9988 20.2186 27.9814 19.1306 26.276 19.0213C26.0774 15.1439 24.7228 12.1466 22.3921 10.3333H24.5174C24.9321 11.4946 26.0321 12.3333 27.3334 12.3333ZM8.33342 22V23.3333C8.33342 24.1186 8.11875 24.3333 7.33342 24.3333H6.00008C5.21475 24.3333 5.00008 24.1186 5.00008 23.3333V22C5.00008 21.2146 5.21475 21 6.00008 21H7.33342C8.11875 21 8.33342 21.2146 8.33342 22ZM27.0001 22V23.3333C27.0001 24.1186 26.7854 24.3333 26.0001 24.3333H24.6667C23.8814 24.3333 23.6667 24.1186 23.6667 23.3333V22C23.6667 21.2146 23.8814 21 24.6667 21H26.0001C26.7854 21 27.0001 21.2146 27.0001 22ZM27.3334 8.33329C27.8854 8.33329 28.3334 8.78129 28.3334 9.33329C28.3334 9.88529 27.8854 10.3333 27.3334 10.3333C26.7814 10.3333 26.3334 9.88529 26.3334 9.33329C26.3334 8.78129 26.7814 8.33329 27.3334 8.33329ZM4.66675 10.3333C4.11475 10.3333 3.66675 9.88529 3.66675 9.33329C3.66675 8.78129 4.11475 8.33329 4.66675 8.33329C5.21875 8.33329 5.66675 8.78129 5.66675 9.33329C5.66675 9.88529 5.21875 10.3333 4.66675 10.3333ZM17.6667 9.99996C17.6667 10.7853 17.4521 11 16.6667 11H15.3334C14.5481 11 14.3334 10.7853 14.3334 9.99996V8.66663C14.3334 7.88129 14.5481 7.66663 15.3334 7.66663H16.6667C17.4521 7.66663 17.6667 7.88129 17.6667 8.66663V9.99996Z"
                    fill="#FE8253"
                  />
                </svg>
              }
            />
          </div>
          <Mindmap
            ref={mindmapRef}
            initialNodes={initialNodes}
            initialEdges={initialEdges}
          />
        </TabsContent>
        <TabsContent
          value="Quiz"
          className="mt-0 rounded-2 border-t border-main-divider bg-white p-6"
        >
          <HeaderCopy
            title="Quiz"
            iconLeft={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                className="me-2"
              >
                <path
                  d="M14.3333 17.3333C14.3333 17.8853 13.8853 18.3333 13.3333 18.3333H11.6667V20C11.6667 20.552 11.2187 21 10.6667 21C10.1147 21 9.66667 20.552 9.66667 20V18.3333H8C7.448 18.3333 7 17.8853 7 17.3333C7 16.7813 7.448 16.3333 8 16.3333H9.66667V14.6667C9.66667 14.1147 10.1147 13.6667 10.6667 13.6667C11.2187 13.6667 11.6667 14.1147 11.6667 14.6667V16.3333H13.3333C13.8853 16.3333 14.3333 16.7813 14.3333 17.3333ZM29 17.3333V22.6667C29 25.8133 27.2827 29 24 29H23.6546C21.8653 29 20.2052 28.112 19.2132 26.624C19.1665 26.5534 18.1 25 16 25C13.8613 25 12.8014 26.5878 12.7907 26.6038C11.796 28.1065 10.1332 29 8.33724 29H8C4.71733 29 3 25.8133 3 22.6667V17.3333C3 11.6973 5.86533 8.33333 10.6667 8.33333H15V8C15 6.34533 16.3467 5 18 5H19.3333C19.884 5 20.3333 4.552 20.3333 4C20.3333 3.448 20.7813 3 21.3333 3C21.8853 3 22.3333 3.448 22.3333 4C22.3333 5.65467 20.9867 7 19.3333 7H18C17.4493 7 17 7.448 17 8V8.33333H21.3333C26.1347 8.33333 29 11.6973 29 17.3333ZM27 17.3333C27 12.8187 24.9867 10.3333 21.3333 10.3333H10.6667C7.01333 10.3333 5 12.8187 5 17.3333V22.6667C5 24.7533 5.93867 27 8 27H8.33724C9.45991 27 10.5001 26.4412 11.1201 25.5052C11.1828 25.4079 12.7907 23 16 23C19.2107 23 20.8174 25.4214 20.8841 25.5254C21.4988 26.4441 22.536 27 23.6546 27H24C26.0613 27 27 24.7533 27 22.6667V17.3333ZM19.6667 17.6667C18.9307 17.6667 18.3333 18.264 18.3333 19C18.3333 19.736 18.9307 20.3333 19.6667 20.3333C20.4027 20.3333 21 19.736 21 19C21 18.264 20.4027 17.6667 19.6667 17.6667ZM23 14.3346C22.264 14.3346 21.6667 14.932 21.6667 15.668C21.6667 16.404 22.264 17.0013 23 17.0013C23.736 17.0013 24.3333 16.404 24.3333 15.668C24.3333 14.932 23.736 14.3346 23 14.3346Z"
                  fill="#FE8253"
                />
              </svg>
            }
            showCopy={false}
          />
          <RecentQuiz />
        </TabsContent>
      </Tabs>
    </div>
  )
}
