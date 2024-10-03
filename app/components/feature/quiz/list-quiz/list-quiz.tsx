import { Button } from '@/components/ui/button'
import useSummaryResultStore from '@/store/summary-result-store'

import { CellQuiz } from './cell-quiz'
interface ListQuizProps {
  onSubmit: () => void
}
export const ListQuiz: React.FC<ListQuizProps> = ({ onSubmit }) => {
  const { active_recent, addAnswer } = useSummaryResultStore()
  const handleSelect = (value: number, index: number) => {
    addAnswer({
      data: {
        [index]: value,
      },
      id: active_recent?.id ?? '',
    })
  }

  return (
    <div>
      <div className="flex flex-col gap-6">
        {active_recent?.contentQuiz?.quiz?.map((item, index) => (
          <div key={index}>
            <CellQuiz
              defaultCheckedIndex={Number(
                active_recent?.answer?.find(
                  (i) => Number(i?.key) === Number(index + 1),
                )?.value,
              )}
              question={item?.question}
              options={item?.answers ?? []}
              onSelect={(value) => {
                handleSelect(value, index + 1)
              }}
              id={`quiz-${index}`}
              questionNumber={index + 1}
              totalQuestions={active_recent?.contentQuiz?.quiz?.length ?? 0}
            />
          </div>
        ))}
      </div>

      <Button
        className="ml-auto mt-6 flex h-12 rounded-full bg-main-primary hover:bg-main-primary hover:opacity-80 disabled:bg-neutral-5"
        onClick={onSubmit}
      >
        <p className="typo-s16-w600 px-4 text-white"> Continue</p>
      </Button>
    </div>
  )
}
