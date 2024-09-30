// import {
//   mindMapLink,
//   summarizeLink,
//   transcriptLink,
// } from '@/app/action/youtube-api'
import { formatDuration } from '@/utils'

import { Skeleton } from '@/components/ui/skeleton'
import { Suspense } from 'react'
import { SummaryContent } from './summary-content'
import { PreviewUpload } from './upload-preview'
async function getData() {
  const youtubeId = process.env.YOUTUBE_ID_DEMO ?? 'Au6LqK1UH8g'
  // const [summary, transcript, mindMap] = await Promise.all([
  //   summarizeLink({ youtubeId }),
  //   transcriptLink({ youtubeId }),
  //   mindMapLink({ youtubeId }),
  // ])
  // return { summary, transcript, mindMap, youtubeId }
}
const SummaryDemoContent: any = async () => {
  // const data: any = await getData()
  const data: any = null
  return (
    <div className="py-10">
      <div className="rounded-5 bg-white p-10">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-5">
            <div className="rounded-4 border p-4">
              <PreviewUpload
                title={data?.transcript?.data?.info?.title}
                idYoutube={data?.youtubeId}
                channel={data?.transcript?.data?.info?.channelName}
                duration={formatDuration(
                  Number(data?.transcript?.data?.info?.duration),
                )}
                description={data?.transcript?.data?.info?.description?.slice(
                  0,
                  120,
                )}
              />
            </div>
          </div>
          <div className="col-span-7">
            <SummaryContent
              transcript={data?.transcript?.data}
              summary={data?.summary?.data}
              mindMap={data?.mindMap?.data?.mindmap}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export const SummaryDemo = () => {
  return (
    <div className="py-10">
      <Suspense
        fallback={
          <div className="py-10">
            <div className="rounded-5 bg-white p-10">
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-5">
                  <div className="rounded-4 border p-4">
                    <Skeleton className="h-[200px] w-full rounded-sm" />
                    <Skeleton className="mt-3 h-10 w-full rounded-sm" />
                  </div>
                </div>
                <div className="col-span-7">
                  <div className="h-[200px] rounded-4 border p-4">
                    <Skeleton className="h-[200px] w-full rounded-sm" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      >
        <SummaryDemoContent />
      </Suspense>
    </div>
  )
}
