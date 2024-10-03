import { cn } from '@/lib/utils'
import useSummaryResultStore from '@/store/summary-result-store'
import type React from 'react'

export const QuestionPanel: React.FC = () => {
  const { active_recent } = useSummaryResultStore()
  return (
    <div className="mt-10">
      <p className="typo-s20-w600 pb-4 text-center text-neutral-0">
        Question Panel
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        {active_recent?.contentQuiz?.quiz?.map((_, index) => (
          <div
            key={index}
            className={cn(
              'typo-s16-w400 flex size-12 cursor-pointer items-center justify-center rounded-full border text-neutral-0 hover:opacity-80',
              active_recent?.answer?.some((i) => Number(i?.key) === index + 1)
                ? 'bg-main-primary text-white'
                : 'bg-main-white text-neutral-0',
            )}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  )
}
