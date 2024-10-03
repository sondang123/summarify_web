import { GlobalIndicator } from '@/components/app-components/loading-indicator'
import { CountDownTimeQuiz } from '@/components/feature/quiz/count-down-time-quiz'
import { DialogScore } from '@/components/feature/quiz/dialog-score'
import { ListQuiz } from '@/components/feature/quiz/list-quiz/list-quiz'
import { QuestionPanel } from '@/components/feature/quiz/question-panel'
import useSummaryResultStore from '@/store/summary-result-store'
import { useState } from 'react'
import QuizLayout from './layout'

export default function QuizScreen() {
  const [showDialogScore, setShowDialogScore] = useState(false)
  const { active_recent } = useSummaryResultStore()
  const handleSubmit = () => {
    setShowDialogScore(true)
  }
  return (
    <QuizLayout>
      <main className="bg-main-background_summary flex min-h-screen flex-col items-center justify-between pb-28 pt-24">
        <div className="container pt-17">
          <p className="typo-s32-w700 mx-auto text-center text-neutral-0 lg:w-[68%]">
            {active_recent?.contentQuiz?.title}
          </p>

          <div className="mt-12.5 grid grid-cols-10 gap-6">
            <div className="col-span-6">
              <ListQuiz onSubmit={handleSubmit} />
            </div>
            <div className="sticky top-30 col-span-4 flex h-fit flex-col items-center justify-center rounded-4 bg-white p-8">
              <p className="typo-s20-w600 pb-4 text-neutral-0">
                Remaining Time
              </p>

              <CountDownTimeQuiz
                onComplete={() => {
                  GlobalIndicator.show()
                  setTimeout(() => {
                    setShowDialogScore(true)
                    GlobalIndicator.hide()
                  }, 1000)
                }}
              />
              <QuestionPanel />
            </div>
          </div>
        </div>
        <DialogScore open={showDialogScore} onOpenChange={setShowDialogScore} />
      </main>
    </QuizLayout>
  )
}
