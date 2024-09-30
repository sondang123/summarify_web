import { useMutation } from '@tanstack/react-query'

import {
  mindMapLink,
  summarizeLink,
  transcriptLink,
} from '@/service/youtube-api'
import useSummaryResultStore from '@/store/summary-result-store'
import {
  GET_MIND_MAP_YOUTUBE_URL,
  GET_SUMMARIZE_YOUTUBE_URL,
  GET_TRANSCRIPT_YOUTUBE_URL,
} from './queryKeys'

export const useSummarizeLinkYoutube = () => {
  const { updateSummary } = useSummaryResultStore()
  return useMutation({
    mutationKey: [GET_SUMMARIZE_YOUTUBE_URL],
    mutationFn: async ({ youtubeId }: { youtubeId: string }) => {
      const data: any = await summarizeLink({ youtubeId })
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
export function useTranscriptLinkMutation() {
  const { updateSummary } = useSummaryResultStore()
  return useMutation({
    mutationKey: [GET_TRANSCRIPT_YOUTUBE_URL],
    mutationFn: async ({ youtubeId }: { youtubeId: string }) => {
      const data: any = await transcriptLink({ youtubeId })
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

export const useMindMapLinkYoutube = () => {
  const { updateSummary } = useSummaryResultStore()
  return useMutation({
    mutationKey: [GET_MIND_MAP_YOUTUBE_URL],
    mutationFn: async ({ youtubeId }: { youtubeId: string }) => {
      const data: any = await mindMapLink({ youtubeId })
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
