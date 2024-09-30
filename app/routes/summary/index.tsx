import { NewGenerate } from '@/components/feature/summary-result/new-generate'
import { TabsSummary } from '@/components/feature/summary-result/tab-summary'
import { PreviewUpload } from '@/components/feature/summary_demo/upload-preview'
import {
  GET_TRANSCRIPT_FILE,
  GET_TRANSCRIPT_YOUTUBE_URL,
} from '@/query/summary/queryKeys'
import useSummaryResultStore from '@/store/summary-result-store'
import { formatDuration, getYoutubeId } from '@/utils'
import { useIsMutating } from '@tanstack/react-query'
import { useMemo } from 'react'
import SummaryLayout from './layout'

export default function SummaryScreen() {
  const { active_recent } = useSummaryResultStore()
  const isMutating = useIsMutating({
    mutationKey: [GET_TRANSCRIPT_YOUTUBE_URL],
  })
  const isTranscriptFile = useIsMutating({
    mutationKey: [GET_TRANSCRIPT_FILE],
  })

  const videoPlayer = useMemo(() => {
    if (!active_recent?.fileVideo) return null

    return (
      <div>
        <video
          src={URL.createObjectURL(active_recent.fileVideo)}
          controls
          className="w-full rounded-lg"
        >
          <track kind="captions" src="" label="English" />
          Your browser does not support the video tag.
        </video>

        <p className="typo-s16-w600 break-words pt-4 text-neutral-0">
          {active_recent.fileVideo.name}
        </p>
      </div>
    )
  }, [active_recent?.fileVideo])

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
              {active_recent?.fileVideo ? (
                videoPlayer
              ) : (
                <PreviewUpload
                  title={active_recent?.transcript?.info?.title ?? ''}
                  description={
                    active_recent?.transcript?.info?.description ?? ''
                  }
                  duration={formatDuration(
                    Number(active_recent?.transcript?.info?.duration),
                  )}
                  channel={active_recent?.transcript?.info?.channelName || ''}
                  idYoutube={getYoutubeId(active_recent.video ?? '')}
                  loading={!!isMutating || !!isTranscriptFile}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </SummaryLayout>
  )
}
