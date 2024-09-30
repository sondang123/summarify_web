import { AccountHeader } from '@/components/feature/account-header'
import { logo } from '@/const/app-resource'
import { cn } from '@/lib/utils'
import { Link } from '@remix-run/react'

export const HeaderQuiz: React.FC = () => {
  return (
    <div
      className={cn(
        'border-main-divider fixed left-0 right-0 top-0 z-40 border-b bg-white',
      )}
    >
      <div className="container py-6">
        <div className="flex items-center justify-between">
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
            <p className="typo-s32-w700 text-neutral-0">Summarify</p>
          </Link>

          <AccountHeader />
        </div>
      </div>
    </div>
  )
}
