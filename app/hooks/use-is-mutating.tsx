import { useIsMutating } from '@tanstack/react-query'

export const useIsMutatingSummary = () => {
  const isMutating = useIsMutating({
    mutationKey: [GET_TRANSCRIPT_YOUTUBE_URL],
  })
  const isSummarizeLink = useIsMutating({
    mutationKey: [GET_SUMMARIZE_YOUTUBE_URL],
  })
  const isMindMapLink = useIsMutating({
    mutationKey: [GET_MIND_MAP_YOUTUBE_URL],
  })
  const isMutatingFile = useIsMutating({
    mutationKey: [GET_TRANSCRIPT_FILE],
  })
  const isSummarizeFile = useIsMutating({
    mutationKey: [GET_SUMMARIZE_FILE],
  })
  const isMindMapFile = useIsMutating({
    mutationKey: [GET_MIND_MAP_FILE],
  })
  const isLoadingOne =
    isMutating ||
    isSummarizeLink ||
    isMindMapLink ||
    isSummarizeFile ||
    isMindMapFile ||
    isMutatingFile
  return {
    isMutating,
    isSummarizeLink,
    isMindMapLink,
    isMutatingFile,
    isSummarizeFile,
    isMindMapFile,
    isLoadingOne,
  }
}
