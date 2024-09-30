import create from 'zustand'
import { devtools } from 'zustand/middleware'
import useSummaryQuizStore from './summary-quiz-store'
import useSummaryResultStore from './summary-result-store'

const useGlobalStore = create(
  devtools(() => ({
    summary_result: useSummaryResultStore.getState(),
    summary_quiz: useSummaryQuizStore.getState(),
  })),
)

export default useGlobalStore
