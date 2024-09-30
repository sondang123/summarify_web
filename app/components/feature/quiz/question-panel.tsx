import { cn } from '@/lib/utils'
import type React from 'react'

export const QuestionPanel: React.FC = () => {
  return (
    <div className="mt-10">
      <p className="typo-s20-w600 pb-4 text-center text-neutral-0">
        Question Panel
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <div
          className={cn(
            'typo-s16-w400 flex size-12 cursor-pointer items-center justify-center rounded-full border text-neutral-0 hover:opacity-80',
            'bg-main-primary text-white',
          )}
        >
          1
        </div>
        <div
          className={cn(
            'typo-s16-w400 flex size-12 cursor-pointer items-center justify-center rounded-full border text-neutral-0 hover:opacity-80',
          )}
        >
          1
        </div>
        <div className="flex size-12 cursor-pointer items-center justify-center rounded-full border border-neutral-2 hover:opacity-80">
          3
        </div>
      </div>
    </div>
  )
}
