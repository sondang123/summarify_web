import { useMutation } from '@tanstack/react-query'

import { routerApi } from '@/service-api/router-api'

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
      const data = await routerApi('/api/summarize-video', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

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
      const data = await routerApi('/api/transcript-video', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
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
      const data: any = await routerApi('/api/mindmap-video', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
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
