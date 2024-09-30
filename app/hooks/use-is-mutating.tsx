import { useIsMutating } from '@tanstack/react-query'

const MUTATION_KEYS = {
  GET_TRANSCRIPT_YOUTUBE_URL: 'GET_TRANSCRIPT_YOUTUBE_URL',
  GET_SUMMARIZE_YOUTUBE_URL: 'GET_SUMMARIZE_YOUTUBE_URL',
  GET_MIND_MAP_YOUTUBE_URL: 'GET_MIND_MAP_YOUTUBE_URL',
  GET_TRANSCRIPT_FILE: 'GET_TRANSCRIPT_FILE',
  GET_SUMMARIZE_FILE: 'GET_SUMMARIZE_FILE',
  GET_MIND_MAP_FILE: 'GET_MIND_MAP_FILE',
}

export const useIsMutatingSummary = () => {
  const isMutating = useIsMutating({
    mutationKey: [MUTATION_KEYS.GET_TRANSCRIPT_YOUTUBE_URL],
  })
  const isSummarizeLink = useIsMutating({
    mutationKey: [MUTATION_KEYS.GET_SUMMARIZE_YOUTUBE_URL],
  })
  const isMindMapLink = useIsMutating({
    mutationKey: [MUTATION_KEYS.GET_MIND_MAP_YOUTUBE_URL],
  })
  const isMutatingFile = useIsMutating({
    mutationKey: [MUTATION_KEYS.GET_TRANSCRIPT_FILE],
  })
  const isSummarizeFile = useIsMutating({
    mutationKey: [MUTATION_KEYS.GET_SUMMARIZE_FILE],
  })
  const isMindMapFile = useIsMutating({
    mutationKey: [MUTATION_KEYS.GET_MIND_MAP_FILE],
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
