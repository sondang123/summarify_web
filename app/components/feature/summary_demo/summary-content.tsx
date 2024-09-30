import { Button } from '@/components/ui/button'

import { AppTabs } from '@/components/app-components/app-tabs'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import useMindmapToFlow from '@/hooks/use-horizontal-flow'

import type { ISegments } from '@/types/store/summary-result'
import { formatTime } from '@/utils'
import { useRef, useState } from 'react'
import type { HorizontalFlowRef } from '../horizontal-flow'

import HorizontalFlow from '../horizontal-flow'
import { Transcript } from './transcript'

interface ISummaryContentProps {
  transcript?: any
  summary?: any
  mindMap?: any
}
export const SummaryContent: React.FC<ISummaryContentProps> = ({
  transcript,
  summary,
  mindMap,
}) => {
  const [activeTab, setActiveTab] = useState('Transcript')
  const [showTooltip, setShowTooltip] = useState(false)
  const mindmapRef = useRef<HorizontalFlowRef>(null)
  const handleDownload = () => {
    if (mindmapRef.current) {
      mindmapRef.current.downloadImage()
    }
  }

  const { initialNodes, initialEdges } = useMindmapToFlow(mindMap)
  const ReturnTabs = () => {
    switch (activeTab) {
      case 'Transcript':
        return <Transcript segments={transcript?.segments ?? []} />
      case 'Summary':
        return (
          <p className="typo-s16-w400 mt-4 text-neutral-1">{summary ?? ''}</p>
        )
      case 'Mindmap':
        return (
          <HorizontalFlow
            ref={mindmapRef}
            initialNodes={initialNodes}
            initialEdges={initialEdges}
          />
        )
      default:
        return <div></div>
    }
  }

  const handleCopy = async () => {
    if (activeTab === 'Transcript') {
      const formattedText = transcript?.segments
        ?.map(
          (item: ISegments) =>
            `${formatTime(Number(item?.start))}-${formatTime(Number(item?.end))}: ${item.text}`,
        )
        .join('\n')
      navigator.clipboard.writeText(formattedText)

      setShowTooltip(true)
      setTimeout(() => setShowTooltip(false), 1000)
    } else {
      try {
        await navigator.clipboard.writeText(summary ?? '')
        setShowTooltip(true)
        setTimeout(() => setShowTooltip(false), 1000)
      } catch (err) {
        console.error('Không thể sao chép:', err)
      }
    }
  }
  return (
    <div className="rounded-4 border p-4">
      <div className="flex items-center justify-between gap-20">
        <div className="flex-1">
          <AppTabs
            arrTabs={['Transcript', 'Summary', 'Mindmap']}
            setActiveTab={setActiveTab}
          />
        </div>
        <div className="flex items-center gap-4">
          {activeTab === 'Mindmap' ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="cursor-pointer hover:opacity-80"
              onClick={handleDownload}
            >
              <path
                d="M8.46997 13.53C8.17697 13.237 8.17697 12.762 8.46997 12.469C8.76297 12.176 9.23801 12.176 9.53101 12.469L11.251 14.189V3C11.251 2.586 11.587 2.25 12.001 2.25C12.415 2.25 12.751 2.586 12.751 3V14.189L14.4709 12.469C14.7639 12.176 15.239 12.176 15.532 12.469C15.825 12.762 15.825 13.237 15.532 13.53L12.532 16.53C12.463 16.599 12.3801 16.654 12.2881 16.692C12.1961 16.73 12.099 16.75 12.001 16.75C11.903 16.75 11.8061 16.73 11.7141 16.692C11.6221 16.654 11.539 16.599 11.47 16.53L8.46997 13.53ZM18 9.25C17.586 9.25 17.25 9.586 17.25 10C17.25 10.414 17.586 10.75 18 10.75C19.577 10.75 20.25 11.423 20.25 13V18C20.25 19.577 19.577 20.25 18 20.25H6C4.423 20.25 3.75 19.577 3.75 18V13C3.75 11.423 4.423 10.75 6 10.75C6.414 10.75 6.75 10.414 6.75 10C6.75 9.586 6.414 9.25 6 9.25C3.582 9.25 2.25 10.582 2.25 13V18C2.25 20.418 3.582 21.75 6 21.75H18C20.418 21.75 21.75 20.418 21.75 18V13C21.75 10.582 20.418 9.25 18 9.25Z"
                fill="#8C60F4"
              />
            </svg>
          ) : (
            <TooltipProvider>
              <Tooltip open={showTooltip}>
                <TooltipTrigger asChild>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="cursor-pointer hover:opacity-80"
                    onClick={handleCopy}
                  >
                    <path
                      d="M20.53 7.47L15.53 2.47C15.389 2.329 15.199 2.25 15 2.25H10.3999C8.3979 2.25 7.25 3.39799 7.25 5.39999V6.25H6.3999C4.3979 6.25 3.25 7.39799 3.25 9.39999V19.6C3.25 21.601 4.3979 22.75 6.3999 22.75H13.5991C15.6011 22.75 16.749 21.602 16.749 19.6V18.75H17.5991C19.6011 18.75 20.749 17.602 20.749 15.6V8C20.75 7.801 20.671 7.61 20.53 7.47ZM15.75 4.811L18.189 7.25H17.5C16.24 7.25 15.75 6.759 15.75 5.5V4.811ZM15.25 19.6C15.25 20.787 14.7871 21.25 13.6001 21.25H6.40088C5.21288 21.25 4.75098 20.787 4.75098 19.6V9.39999C4.75098 8.21299 5.21388 7.75 6.40088 7.75H7.25098V15.6C7.25098 17.601 8.39888 18.75 10.4009 18.75H15.251V19.6H15.25ZM17.6001 17.25H10.4009C9.21288 17.25 8.75098 16.787 8.75098 15.6V5.39999C8.75098 4.21299 9.21388 3.75 10.4009 3.75H14.251V5.5C14.251 7.596 15.405 8.75 17.501 8.75H19.251V15.6C19.25 16.787 18.7871 17.25 17.6001 17.25Z"
                      fill="#8C60F4"
                    />
                  </svg>
                </TooltipTrigger>
                <TooltipContent className="typo-s16-w600 border-none bg-main-success text-white shadow-none outline-none">
                  Copy success!
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          <Button className="rounded-[30px] bg-main-secondary_1 text-center hover:bg-main-secondary_1 hover:opacity-80">
            Create Quiz
          </Button>
        </div>
      </div>
      <div className="pt-4">
        <ReturnTabs />
      </div>
    </div>
  )
}
