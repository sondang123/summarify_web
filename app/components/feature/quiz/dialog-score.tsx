import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'
import type React from 'react'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import useSummaryResultStore from '@/store/summary-result-store'
import { Link } from '@remix-run/react'

import { useMemo } from 'react'

interface IDialogScoreProps {
  children?: React.ReactNode | string
  open?: boolean
  onOpenChange?: React.Dispatch<React.SetStateAction<any>>
  onPlayAgain?: () => void
}

export const DialogScore: React.FC<IDialogScoreProps> = ({
  children,
  open,
  onOpenChange = () => {},
  onPlayAgain,
}) => {
  const { active_recent } = useSummaryResultStore()

  const matchingAnswersCount = useMemo(() => {
    if (!active_recent?.contentQuiz?.quiz || !active_recent?.answer) {
      return 0
    }

    return active_recent.contentQuiz.quiz.reduce((count, question, index) => {
      const matchingAnswer = active_recent?.answer?.find(
        (item) => Number(item.key) === Number(index + 1),
      )

      if (
        matchingAnswer &&
        Number(matchingAnswer.value) === Number(question.keyAnswer)
      ) {
        return count + 1
      }

      return count
    }, 0)
  }, [active_recent])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent
        hideCloseButton={false}
        className="max-w-[45vw] gap-0 rounded-[20px] p-6"
      >
        <div className="mb-6 rounded-3 bg-main-primary p-5 text-center">
          <p className="typo-s20-w600 text-white">
            Congratulation! You completed!
          </p>
          <p className="typo-s28-w600 text-white">
            Your Score : {matchingAnswersCount ?? 0}/
            {active_recent?.contentQuiz?.quiz?.length ?? 0}
          </p>
        </div>
        <ScrollArea className="max-h-[60lvh]">
          <div className="bg-neutral-3 rounded-3 border border-neutral-2 p-4 text-center">
            <p className="typo-s16-w600 text-neutral-0">My Answer</p>
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              {active_recent?.contentQuiz?.quiz?.map((item, index) => (
                <div
                  key={index}
                  className={cn(
                    'typo-s16-w600 flex size-13 items-center justify-center rounded-2.5',
                    Number(
                      active_recent?.answer?.find(
                        (i) => Number(i?.key) === Number(index + 1),
                      )?.value,
                    ) === Number(item?.keyAnswer)
                      ? 'bg-main-success text-white'
                      : 'bg-main-error text-white',
                  )}
                >
                  {index + 1}
                </div>
              ))}
            </div>

            <p className="typo-s14-w600 mt-5 cursor-pointer text-main-primary hover:opacity-80">
              See my answers
            </p>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-6">
            <div className="rounded-3 border p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
              >
                <path
                  d="M14.0007 2.3335C7.57232 2.3335 2.33398 7.57183 2.33398 14.0002C2.33398 20.4285 7.57232 25.6668 14.0007 25.6668C20.429 25.6668 25.6673 20.4285 25.6673 14.0002C25.6673 7.57183 20.429 2.3335 14.0007 2.3335ZM19.5773 11.3168L12.9623 17.9318C12.799 18.0952 12.5773 18.1885 12.344 18.1885C12.1107 18.1885 11.889 18.0952 11.7257 17.9318L8.42398 14.6302C8.08565 14.2918 8.08565 13.7318 8.42398 13.3935C8.76232 13.0552 9.32232 13.0552 9.66065 13.3935L12.344 16.0768L18.3407 10.0802C18.679 9.74183 19.239 9.74183 19.5773 10.0802C19.9157 10.4185 19.9157 10.9668 19.5773 11.3168Z"
                  fill="#56C490"
                />
              </svg>
              <p className="typo-s14-w600 pt-2 text-neutral-0">
                {matchingAnswersCount} questions
              </p>
              <p className="typo-s14-w400 pt-2 text-neutral-1">
                Correct answer
              </p>
            </div>
            <div className="rounded-3 border p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
              >
                <path
                  d="M13.9987 2.33325C7.57036 2.33325 2.33203 7.57159 2.33203 13.9999C2.33203 20.4283 7.57036 25.6666 13.9987 25.6666C20.427 25.6666 25.6654 20.4283 25.6654 13.9999C25.6654 7.57159 20.427 2.33325 13.9987 2.33325ZM17.9187 16.6833C18.257 17.0216 18.257 17.5816 17.9187 17.9199C17.7437 18.0949 17.522 18.1766 17.3004 18.1766C17.0787 18.1766 16.857 18.0949 16.682 17.9199L13.9987 15.2366L11.3154 17.9199C11.1404 18.0949 10.9187 18.1766 10.697 18.1766C10.4754 18.1766 10.2537 18.0949 10.0787 17.9199C9.74037 17.5816 9.74037 17.0216 10.0787 16.6833L12.762 13.9999L10.0787 11.3166C9.74037 10.9783 9.74037 10.4183 10.0787 10.0799C10.417 9.74159 10.977 9.74159 11.3154 10.0799L13.9987 12.7633L16.682 10.0799C17.0204 9.74159 17.5804 9.74159 17.9187 10.0799C18.257 10.4183 18.257 10.9783 17.9187 11.3166L15.2354 13.9999L17.9187 16.6833Z"
                  fill="#FE5353"
                />
              </svg>
              <p className="typo-s14-w600 pt-2 text-neutral-0">
                {(active_recent?.contentQuiz?.quiz?.length ?? 0) -
                  matchingAnswersCount}
                <span> questions</span>
              </p>
              <p className="typo-s14-w400 pt-2 text-neutral-1">Incorrect</p>
            </div>
          </div>
        </ScrollArea>
        <div className="mt-10 flex gap-6">
          <Link to="/" className="flex-1">
            <Button
              className="h-12 w-full rounded-full border-main-primary text-main-primary hover:text-main-primary focus-visible:outline-none focus-visible:ring-0"
              variant={'outline'}
            >
              <p className="typo-s16-w600"> Back to Home</p>
            </Button>
          </Link>
          <DialogClose className="flex-1">
            <Button
              className="h-12 w-full rounded-full bg-gradient-to-r from-[#5F1BFE] to-[#8B66E1] hover:opacity-80"
              onClick={onPlayAgain}
            >
              <p className="typo-s16-w600">Play again</p>
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
