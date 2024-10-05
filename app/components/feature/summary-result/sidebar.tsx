import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { logo } from '@/const/app-resource'
import { useSidebar } from '@/hooks/use-sidebar'
import { cn } from '@/lib/utils'
import useSummaryResultStore from '@/store/summary-result-store'

import { Link } from '@remix-run/react'
import { useState } from 'react'
import DashboardNav from './dashboard-nav'
import { UpgradeSideBar } from './upgrade-sidebar'

type SidebarProps = {
  className?: string
}

export default function Sidebar({ className }: SidebarProps) {
  const { isMinimized, toggle } = useSidebar()
  const [status, setStatus] = useState(false)
  const { setActiveRecent } = useSummaryResultStore()
  const handleToggle = () => {
    setStatus(true)
    toggle()
    setTimeout(() => setStatus(false), 500)
  }

  return (
    <nav
      className={cn(
        'flex border-r border-main-divider bg-white',
        'relative z-10 hidden h-screen flex-none md:block',
        status && 'duration-500',
        !isMinimized ? 'w-80' : 'w-[80px]',
        className,
      )}
    >
      <div className="flex h-full flex-col">
        <div className="px-4">
          <div
            className={cn(
              'flex items-center py-5.5',
              isMinimized ? 'justify-center' : 'justify-between',
            )}
          >
            {!isMinimized && (
              <Link
                to="/"
                className="flex cursor-pointer items-center hover:opacity-80"
              >
                <img
                  src={logo}
                  width={53}
                  height={500}
                  alt="sumarify"
                  className="me-2.5"
                />
                <p className="typo-s24-w700 inline-block text-neutral-0">
                  Summarify
                </p>
              </Link>
            )}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              onClick={handleToggle}
              className={cn('cursor-pointer', isMinimized && 'rotate-180')}
            >
              <path
                d="M11.9998 19.75C11.8078 19.75 11.6157 19.6771 11.4697 19.5301L4.46975 12.5301C4.17675 12.2371 4.17675 11.762 4.46975 11.469L11.4697 4.46902C11.7628 4.17602 12.2378 4.17602 12.5308 4.46902C12.8238 4.76202 12.8238 5.23705 12.5308 5.53005L6.06081 12L12.5308 18.47C12.8238 18.763 12.8238 19.238 12.5308 19.531C12.3838 19.677 12.1918 19.75 11.9998 19.75ZM19.5298 19.5301C19.8228 19.2371 19.8228 18.762 19.5298 18.469L13.0598 11.999L19.5298 5.52908C19.8228 5.23608 19.8228 4.76104 19.5298 4.46804C19.2368 4.17504 18.7618 4.17504 18.4688 4.46804L11.4688 11.468C11.1758 11.761 11.1758 12.2361 11.4688 12.5291L18.4688 19.5291C18.6148 19.6751 18.8068 19.749 18.9988 19.749C19.1908 19.749 19.3838 19.6771 19.5298 19.5301Z"
                fill="#505264"
              />
            </svg>
          </div>

          <div className="border-b border-t border-main-divider py-6">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="w-full">
                  <Button
                    className="typo-s14-w500 w-full rounded-full bg-main-primary py-6 text-white hover:bg-main-primary hover:opacity-80"
                    onClick={() => {
                      setActiveRecent({ data: undefined })
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                      className={!isMinimized ? 'me-3' : 'me-0'}
                    >
                      <path
                        d="M20.25 12C20.25 12.414 19.914 12.75 19.5 12.75H13.25V19C13.25 19.414 12.914 19.75 12.5 19.75C12.086 19.75 11.75 19.414 11.75 19V12.75H5.5C5.086 12.75 4.75 12.414 4.75 12C4.75 11.586 5.086 11.25 5.5 11.25H11.75V5C11.75 4.586 12.086 4.25 12.5 4.25C12.914 4.25 13.25 4.586 13.25 5V11.25H19.5C19.914 11.25 20.25 11.586 20.25 12Z"
                        fill="white"
                      />
                    </svg>
                    {!isMinimized ? 'Start New Generate' : ''}
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  align="center"
                  side="right"
                  sideOffset={8}
                  className={!isMinimized ? 'hidden' : 'inline-block'}
                >
                  <p>Start New Generate</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <p className="typo-s14-w500 px-4 py-6 text-neutral-700">Recent</p>
        <ScrollArea className="flex-1">
          <DashboardNav />
        </ScrollArea>
        <div className="pb-10">
          <UpgradeSideBar />
        </div>
      </div>
    </nav>
  )
}
