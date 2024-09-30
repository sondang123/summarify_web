import { Skeleton } from '@/components/ui/skeleton'
import type React from 'react'
import { useMemo } from 'react'
interface IPreviewUploadProps {
  idYoutube: string
  title: string
  description?: string
  channel?: string
  duration?: number | string
  loading?: boolean
}

export const PreviewUpload: React.FC<IPreviewUploadProps> = ({
  idYoutube,
  title,
  channel,
  duration,
  loading = false,
}) => {
  const videoIframe = useMemo(
    () => (
      <iframe
        src={`https://www.youtube.com/embed/${idYoutube}?si=kugn4YM5PhUG2885?rel=0&amp;autoplay=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="aspect-video w-full rounded-2"
      ></iframe>
    ),
    [idYoutube],
  )

  return (
    <div>
      {videoIframe}
      {loading ? (
        <div>
          <Skeleton className="mt-5 h-[20px] w-full rounded-3" />
          <Skeleton className="mt-2 h-[20px] w-[50%] rounded-3" />
        </div>
      ) : (
        <div>
          <p className="typo-s16-w600 pt-4 text-neutral-0">{title}</p>

          <div className="flex items-center justify-between pt-6">
            <p className="typo-s14-w500 text-neutral-0">channel</p>
            <p className="typo-s14-w500 text-neutral-1">{channel}</p>
          </div>
          <div className="flex items-center justify-between pt-4">
            <p className="typo-s14-w500 text-neutral-0">Video Duration</p>
            <p className="typo-s14-w500 text-neutral-1">{duration}</p>
          </div>
        </div>
      )}
    </div>
  )
}
