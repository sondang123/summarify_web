import { formatDuration } from '@/utils'

import { Skeleton } from '@/components/ui/skeleton'
import {
  fakeDataDemoHomeMindMap,
  fakeDataDemoHomeSummary,
  fakeDataDemoHomeTranscript,
} from '@/const/app-data'

import { SummaryContent } from './summary-content'
import { PreviewUpload } from './upload-preview'

export const SummaryDemo = () => {
  return (
    <div className="py-10">
      <div className="rounded-5 bg-white p-10">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-5">
            <div className="rounded-4 border p-4">
              <PreviewUpload
                title={fakeDataDemoHomeTranscript?.info?.title}
                idYoutube={fakeDataDemoHomeTranscript?.youtubeId}
                channel={fakeDataDemoHomeTranscript?.info?.channelName}
                duration={formatDuration(
                  Number(fakeDataDemoHomeTranscript?.info?.duration),
                )}
                description={fakeDataDemoHomeTranscript?.info?.description?.slice(
                  0,
                  120,
                )}
              />
            </div>
          </div>
          <div className="col-span-7">
            <SummaryContent
              transcript={fakeDataDemoHomeTranscript}
              summary={fakeDataDemoHomeSummary}
              mindMap={fakeDataDemoHomeMindMap}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
