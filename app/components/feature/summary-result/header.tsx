import { AccountHeader } from '../account-header'

export const HeaderSummaryResult: React.FC = () => {
  return (
    <div className="sticky top-0 z-10 border-b border-main-divider bg-white">
      <div className="flex items-center justify-end px-10 py-5.5">
        <AccountHeader />
      </div>
    </div>
  )
}
