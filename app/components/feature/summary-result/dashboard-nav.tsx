import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useSidebar } from '@/hooks/use-sidebar'
import { cn } from '@/lib/utils'
import useSummaryResultStore from '@/store/summary-result-store'

import type { Dispatch, SetStateAction } from 'react'
import { SummaryItem } from './recent-item'

interface DashboardNavProps {
  setOpen?: Dispatch<SetStateAction<boolean>>
  isMobileNav?: boolean
}

export default function DashboardNav({
  setOpen,
  isMobileNav = false,
}: DashboardNavProps) {
  const { isMinimized } = useSidebar()
  const {
    recent_summary,
    active_recent,
    setActiveRecent,
    deleteRecentSummary,
    renameItemRecent,
  } = useSummaryResultStore()
  if (!recent_summary?.length) {
    return null
  }

  return (
    <div className="px-4">
      <nav className="grid h-full items-start gap-2 pb-4">
        <TooltipProvider>
          {recent_summary.map((item, index) => {
            return (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <div
                    className={cn(
                      'flex cursor-pointer items-center gap-2 overflow-hidden rounded-full hover:bg-main-light_primary',
                      active_recent?.id === item?.id
                        ? 'bg-main-light_primary'
                        : '',

                      !isMinimized ? 'px-4 py-2.5' : 'px-3 py-2',
                    )}
                    onClick={() => {
                      setActiveRecent({ data: item })
                      if (setOpen) setOpen(false)
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="shrink-0"
                    >
                      <path
                        d="M20.53 8.47L14.53 2.47C14.389 2.329 14.199 2.25 14 2.25H8C5.582 2.25 4.25 3.582 4.25 6V18C4.25 20.418 5.582 21.75 8 21.75H17C19.418 21.75 20.75 20.418 20.75 18V9C20.75 8.801 20.671 8.61 20.53 8.47ZM14.75 4.811L18.189 8.25H17C15.423 8.25 14.75 7.577 14.75 6V4.811ZM17 20.25H8C6.423 20.25 5.75 19.577 5.75 18V6C5.75 4.423 6.423 3.75 8 3.75H13.25V6C13.25 8.418 14.582 9.75 17 9.75H19.25V18C19.25 19.577 18.577 20.25 17 20.25Z"
                        fill="#505264"
                      />
                    </svg>

                    {isMobileNav || (!isMinimized && !isMobileNav) ? (
                      <SummaryItem
                        item={item}
                        deleteRecentSummary={() => {
                          deleteRecentSummary({ id: item?.id })
                        }}
                        updateSummaryTitle={(newName) => {
                          renameItemRecent({ id: item?.id, newName: newName })
                        }}
                      />
                    ) : null}
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  align="center"
                  side="right"
                  sideOffset={8}
                  className={!isMinimized ? 'hidden' : 'inline-block'}
                >
                  {item.title}
                </TooltipContent>
              </Tooltip>
            )
          })}
        </TooltipProvider>
      </nav>
    </div>
  )
}
