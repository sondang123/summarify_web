import { routerApi } from '@/service-api/router-api'
import type { createQuiz } from '@/types/quiz/create-quiz'
import { useMutation } from '@tanstack/react-query'
import { GET_QUIZ } from './queryKeys'

export const useGetQuiz = () => {
  return useMutation({
    mutationKey: [GET_QUIZ],
    mutationFn: async ({ caption, translate }: createQuiz) => {
      const data = await routerApi('/api/quiz', {
        method: 'POST',
        body: JSON.stringify({
          caption,
          translate,
        }),
      })
      return data as { error?: string; data?: any }
    },
  })
}
