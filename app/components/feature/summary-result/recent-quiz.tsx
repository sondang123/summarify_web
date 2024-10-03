import { AppLoading } from '@/components/app-components/app-loading'
import { AppConfirmDelete } from '@/components/app-components/dialog-confirm-delete'
import { Button } from '@/components/ui/button'
import { useIsMutatingSummary } from '@/hooks/use-is-mutating'
import { cn } from '@/lib/utils'
import useSummaryResultStore from '@/store/summary-result-store'
import { DialogCustomQuestion } from './dialog-custom-question'
import { EmptyQuiz } from './empty-quiz'

export const RecentQuiz: React.FC = () => {
  const CellRecentQuiz = () => {
    return (
      <div className="flex justify-between rounded-3 border border-neutral-2 p-4">
        <div className="flex h-full items-start gap-3">
          <div className="flex items-center justify-center rounded-full bg-main-light_primary p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
            >
              <path
                d="M12.7174 17.4933C12.4307 17.63 12.0958 17.7317 11.7166 17.8L6.24158 18.7584C4.41658 19.0834 3.34149 18.3334 3.02483 16.5084L1.74166 9.21672C1.41666 7.39172 2.16662 6.31673 3.99162 5.99173L5.48983 5.72836C5.66067 5.69836 5.80997 5.84755 5.77914 6.01838L4.79912 11.5667C4.35745 14.0917 5.54905 15.7917 8.06572 16.2334C8.06572 16.2334 12.4149 16.9975 12.6391 17.0409C12.9158 17.0909 12.9599 17.3858 12.7174 17.4933ZM18.2616 6.42172L16.9748 13.7167C16.6648 15.4734 15.6516 16.2242 13.9475 15.9909C13.8825 15.9817 13.8241 15.9817 13.7566 15.9701L8.28565 15.005C6.46148 14.6834 5.71077 13.6109 6.03243 11.7867L7.15162 5.44002L7.31906 4.49169C7.64072 2.66752 8.71327 1.9167 10.5374 2.23837L16.009 3.20339C17.8324 3.52505 18.5833 4.59839 18.2616 6.42172ZM12.9624 12.08C13.0224 11.74 12.7958 11.4159 12.4558 11.3559L9.03577 10.7525C8.69744 10.6917 8.37167 10.92 8.3125 11.2592C8.2525 11.5992 8.4791 11.9234 8.8191 11.9834L12.2391 12.5867C12.2758 12.5934 12.3123 12.5959 12.3481 12.5959C12.6456 12.5967 12.909 12.3834 12.9624 12.08ZM15.4982 9.69585C15.5582 9.35585 15.3316 9.03172 14.9916 8.97172L9.5208 8.0067C9.18413 7.94753 8.85649 8.17423 8.79733 8.51339C8.73733 8.85339 8.96412 9.17753 9.30412 9.23753L14.7749 10.2025C14.8116 10.2092 14.8483 10.2117 14.8842 10.2117C15.1817 10.2117 15.4448 9.99835 15.4982 9.69585ZM16.0817 6.97755C16.1417 6.63755 15.9149 6.31336 15.5749 6.25336L10.1041 5.28835C9.76742 5.22835 9.43999 5.45587 9.38082 5.79504C9.32082 6.13504 9.54742 6.45922 9.88742 6.51922L15.3582 7.48419C15.3949 7.49086 15.4316 7.4934 15.4675 7.4934C15.765 7.49423 16.0283 7.28088 16.0817 6.97755Z"
                fill="#8C60F4"
              />
            </svg>
          </div>
          <div>
            <p className="typo-s16-w600 text-neutral-0">
              Lorem ipsum dolor sit amet consectetur. Justo congue aliq....
            </p>
            <div className="mt-2 grid grid-cols-12 gap-2">
              <div className="col-span-6">
                <p>Total: 20 questions</p>
              </div>
              <div className="col-span-6">
                <p>Time used: 10 minutes</p>
              </div>
              <div className="col-span-6">
                <p>Correct: 19 questions</p>
              </div>
              <div className="col-span-6">
                <p>Incorrect: 1 questions</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <AppConfirmDelete>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="ml-auto cursor-pointer hover:opacity-80"
            >
              <path
                d="M21 5.25H17.441C16.54 5.25 16.502 5.136 16.255 4.396L16.053 3.789C15.746 2.869 14.889 2.25 13.919 2.25H10.081C9.11099 2.25 8.253 2.868 7.947 3.789L7.745 4.396C7.498 5.137 7.46 5.25 6.559 5.25H3C2.586 5.25 2.25 5.586 2.25 6C2.25 6.414 2.586 6.75 3 6.75H4.298L5.065 18.249C5.213 20.474 6.57701 21.75 8.80701 21.75H15.194C17.423 21.75 18.787 20.474 18.936 18.249L19.703 6.75H21C21.414 6.75 21.75 6.414 21.75 6C21.75 5.586 21.414 5.25 21 5.25ZM9.37 4.263C9.473 3.956 9.75799 3.75 10.081 3.75H13.919C14.242 3.75 14.528 3.956 14.63 4.263L14.832 4.87C14.876 5.001 14.92 5.128 14.968 5.25H9.03C9.078 5.127 9.12301 5 9.16701 4.87L9.37 4.263ZM17.438 18.149C17.343 19.582 16.629 20.25 15.193 20.25H8.806C7.37 20.25 6.657 19.583 6.561 18.149L5.801 6.75H6.558C6.683 6.75 6.787 6.737 6.899 6.729C6.933 6.734 6.964 6.75 6.999 6.75H16.999C17.035 6.75 17.065 6.734 17.099 6.729C17.211 6.737 17.315 6.75 17.44 6.75H18.197L17.438 18.149ZM14.75 11V16C14.75 16.414 14.414 16.75 14 16.75C13.586 16.75 13.25 16.414 13.25 16V11C13.25 10.586 13.586 10.25 14 10.25C14.414 10.25 14.75 10.586 14.75 11ZM10.75 11V16C10.75 16.414 10.414 16.75 10 16.75C9.586 16.75 9.25 16.414 9.25 16V11C9.25 10.586 9.586 10.25 10 10.25C10.414 10.25 10.75 10.586 10.75 11Z"
                fill="#505264"
              />
            </svg>
          </AppConfirmDelete>
          <p className="typo-s14-w500 mt-auto cursor-pointer text-main-primary underline hover:opacity-80">
            View details
          </p>
        </div>
      </div>
    )
  }
  const isEmpty = true
  const { isMutating, isMutatingFile } = useIsMutatingSummary()
  const { active_recent } = useSummaryResultStore()
  if (isMutating || isMutatingFile) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <AppLoading />
      </div>
    )
  }
  return (
    <div>
      {isEmpty ? (
        <EmptyQuiz />
      ) : (
        <div>
          <p className="text-s16-w500 py-4 text-neutral-1">Recent Quiz:</p>
          <CellRecentQuiz />
        </div>
      )}

      <DialogCustomQuestion>
        <Button
          className="typo-s14-w500 mx-auto mt-10 flex w-[40%] rounded-full bg-main-secondary_1 py-6 hover:bg-main-secondary_1 hover:bg-opacity-80"
          disabled={
            !!isMutating || !!isMutatingFile || !active_recent?.transcript?.text
          }
        >
          {isEmpty ? 'Create Quiz' : 'Start Quiz'}
        </Button>
      </DialogCustomQuestion>
    </div>
  )
}
