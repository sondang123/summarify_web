import { GlobalIndicator } from '@/components/app-components/loading-indicator'
import { CountDownTimeQuiz } from '@/components/feature/quiz/count-down-time-quiz'
import { DialogScore } from '@/components/feature/quiz/dialog-score'
import { ListQuiz } from '@/components/feature/quiz/list-quiz/list-quiz'
import { QuestionPanel } from '@/components/feature/quiz/question-panel'
import { useState } from 'react'
import QuizLayout from './layout'

export default function QuizScreen() {
  const [showDialogScore, setShowDialogScore] = useState(false)
  return (
    <QuizLayout>
      <main className="bg-main-background_summary flex min-h-screen flex-col items-center justify-between pb-28 pt-24">
        <div className="container pt-17">
          <p className="typo-s32-w700 mx-auto text-center text-neutral-0 lg:w-[68%]">
            VẤN ĐỀ LY KHAI VÀ THÀNH LẬP QUỐC GIA MỚI Ở INDONESIA - NẾU THÀNH
            CÔNG SẼ CÓ BAO NHIÊU QUỐC GIA
          </p>

          <div className="mt-12.5 grid grid-cols-10 gap-6">
            <div className="col-span-6">
              <ListQuiz />
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
