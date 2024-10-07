import create from 'zustand'
import { devtools } from 'zustand/middleware'

import useSummaryResultStore from './summary-result-store'

const useGlobalStore = create(
  devtools(() => ({
    summary_result: useSummaryResultStore.getState(),
  })),
)

export default useGlobalStore
