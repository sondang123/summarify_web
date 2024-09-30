import { Sheet, SheetContent } from '@/components/ui/sheet'

import { Link } from '@remix-run/react'
import type { Dispatch, SetStateAction } from 'react'
import DashboardNav from './dashboard-nav'

type TMobileSidebarProps = {
  className?: string
  setSidebarOpen: Dispatch<SetStateAction<boolean>>
  sidebarOpen: boolean
}
export default function MobileSidebar({
  setSidebarOpen,
  sidebarOpen,
}: TMobileSidebarProps) {
  return (
    <>
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="bg-background !px-0">
          <div className="space-y-4 py-4">
            <div className="space-y-4 px-3 py-2">
              <Link to="/" className="px-2 py-2 text-2xl font-bold text-white">
                Logo
              </Link>
              <div className="space-y-1 px-2">
                <DashboardNav setOpen={setSidebarOpen} />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
