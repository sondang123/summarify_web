import { HeaderSummaryResult } from '@/components/feature/summary-result/header'
import MobileSidebar from '@/components/feature/summary-result/mobile-sidebar'
import Sidebar from '@/components/feature/summary-result/sidebar'
import { SidebarProvider } from '@/hooks/use-sidebar'
import { MenuIcon } from 'lucide-react'
import { useState } from 'react'

export default function SummaryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden bg-secondary">
        <MobileSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <Sidebar />
        <div className="flex w-0 flex-1 flex-col overflow-hidden">
          <div className="relative z-10 flex h-20 flex-shrink-0 md:hidden">
            <button
              className="pl-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 xl:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <main className="relative flex-1 overflow-y-auto bg-main-background_summary">
            <HeaderSummaryResult />
            <div className="h-full"> {children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
