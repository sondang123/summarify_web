import { dataHomeVideoSummaries } from '@/const/app-data'

export const VideoSummaries: React.FC = () => {
  return (
    <div className="py-10">
      <p className="typo-s48-w800 text-center text-neutral-0">
        Video Summaries with Summarify
      </p>

      <div className="mt-15 grid grid-cols-12 gap-15">
        {dataHomeVideoSummaries?.map((item, index) => (
          <div key={index} className="col-span-6">
            <div className="flex size-15 items-center justify-center rounded-full bg-main-primary">
              {item?.icon}
            </div>
            <p className="typo-s24-w700 pb-4 pt-6 text-neutral-0">
              {item?.title}
            </p>
            <p className="typo-s16-w400 text-neutral-1">{item?.subtle}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
