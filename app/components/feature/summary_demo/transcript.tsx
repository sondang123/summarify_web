import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import type { ISegments } from '@/types/store/summary-result'
import { formatTime } from '@/utils'

interface ITranscriptProps {
  segments?: ISegments[]
}
export const Transcript: React.FC<ITranscriptProps> = ({ segments }) => {
  return (
    <ScrollArea className="mt-4 h-[60vh]">
      <div>
        <ul className="ml-8 list-disc">
          {segments?.map((item, index) => (
            <li
              className={cn(
                index > 0 ? 'pt-1' : 'pt-0',
                'typo-s16-w400 leading-6 text-neutral-1 marker:text-xs',
              )}
              key={index}
            >
              {formatTime(Number(item?.start))}-{formatTime(Number(item?.end))}:
              <span> {item?.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </ScrollArea>
  )
}
