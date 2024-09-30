import { useMutation } from '@tanstack/react-query'

import { mindMapFile, summarizeFile, transcriptFile } from '@/service/video-api'
import useSummaryResultStore from '@/store/summary-result-store'
import {
  GET_MIND_MAP_FILE,
  GET_SUMMARIZE_FILE,
  GET_TRANSCRIPT_FILE,
} from './queryKeys'

export const useSummarizeFile = () => {
  const { updateSummary } = useSummaryResultStore()
  return useMutation({
    mutationKey: [GET_SUMMARIZE_FILE],
    mutationFn: async ({ formData }: { formData: FormData }) => {
      const data: any = await summarizeFile({ formData: formData })
      const { active_recent } = useSummaryResultStore.getState()
      if (active_recent?.id) {
        updateSummary({
          data: {
            summarize: data?.data,
          },
          id: active_recent?.id,
        })
      }
      return data
    },
  })
}
export function useTranscriptFile() {
  const { updateSummary } = useSummaryResultStore()
  return useMutation({
    mutationKey: [GET_TRANSCRIPT_FILE],
    mutationFn: async ({ formData }: { formData: FormData }) => {
      const data: any = await transcriptFile({ formData: formData })
      const { active_recent } = useSummaryResultStore.getState()
      if (active_recent?.id) {
        updateSummary({
          data: {
            transcript: data?.data,
          },
          id: active_recent?.id,
        })
      }
      return data
    },
  })
}

export const useMindMapFile = () => {
  const { updateSummary } = useSummaryResultStore()
  return useMutation({
    mutationKey: [GET_MIND_MAP_FILE],
    mutationFn: async ({ formData }: { formData: FormData }) => {
      const data: any = await mindMapFile({ formData: formData })
      const { active_recent } = useSummaryResultStore.getState()
      if (active_recent?.id) {
        updateSummary({
          data: {
            mindMap: data?.data?.mindmap,
          },
          id: active_recent?.id,
        })
      }
      return data
    },
  })
}
