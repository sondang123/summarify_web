import { Skeleton } from '@/components/ui/skeleton'
import useSummaryResultStore from '@/store/summary-result-store'
import { formatTimeZero, timeToSeconds } from '@/utils'
import type React from 'react'
import { Suspense, lazy } from 'react'

const CountdownCircleTimer = lazy(() =>
  import('react-countdown-circle-timer').then((module) => ({
    default: module.CountdownCircleTimer,
  })),
)

interface ICountDownTimeQuizProps {
  onComplete?: () => void
}

export const CountDownTimeQuiz: React.FC<ICountDownTimeQuizProps> = ({
  onComplete,
}) => {
  const { active_recent } = useSummaryResultStore()
  return (
    <Suspense
      fallback={<Skeleton className="w-[280px] rounded-full aspect-square" />}
    >
      <CountdownCircleTimer
        isPlaying
        duration={timeToSeconds(active_recent?.contentQuiz?.time ?? '00:05:00')}
        size={280}
        strokeLinecap="butt"
        colors={['#8C60F4', '#F7B801', '#FE5353']}
        colorsTime={[20 * 0.5, 20 * 0.4, 0]}
        onComplete={onComplete}
        trailColor="#E5E3E7"
      >
        {({
          remainingTime,
          color,
        }: { remainingTime: number; color: string }) => {
          const hours = Math.floor(remainingTime / 3600)
          const minutes = Math.floor((remainingTime % 3600) / 60)
          const seconds = remainingTime % 60

          return (
            <div className="text-center">
              <p className="typo-s16-w500 text-neutral-1">Remaining Time</p>

              <div className="flex">
                <div>
                  <p className="typo-s48-w600" style={{ color }}>
                    {formatTimeZero(hours.toString())}:
                  </p>
                  <p className="typo-s14-w400 text-neutral-1">Hour</p>
                </div>
                <div>
                  <p className="typo-s48-w600" style={{ color }}>
                    {formatTimeZero(minutes.toString())}:
                  </p>
                  <p className="typo-s14-w400 text-neutral-1">Min</p>
                </div>
                <div>
                  <p className="typo-s48-w600" style={{ color }}>
                    {formatTimeZero(seconds.toString())}
                  </p>
                  <p className="typo-s14-w400 text-neutral-1">Sec</p>
                </div>
              </div>
            </div>
          )
        }}
      </CountdownCircleTimer>
    </Suspense>
  )
}
