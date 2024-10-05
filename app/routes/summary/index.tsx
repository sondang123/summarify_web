import { PreviewUpload } from '@/components/feature/summary-demo/upload-preview'
import { NewGenerate } from '@/components/feature/summary-result/new-generate'
import { TabsSummary } from '@/components/feature/summary-result/tab-summary'
import useSummaryResultStore from '@/store/summary-result-store'
import SummaryLayout from './layout'

export default function SummaryScreen() {
  const { active_recent } = useSummaryResultStore()

  return (
    <SummaryLayout>
      <div className="h-full p-10">
        {!active_recent ? (
          <NewGenerate />
        ) : (
          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-8">
              <TabsSummary />
            </div>
            <div className="col-span-4 h-fit rounded-2 bg-white p-6">
              <PreviewUpload />
            </div>
          </div>
        )}
      </div>
    </SummaryLayout>
  )
}
