import { setToken } from '@/helper/token'

import { routerApi } from '@/service-api/router-api'
import type { SignUp } from '@/types/auth/signup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { infoMe, signUp } from './query-keys'

export const useSignUp = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: [signUp],
    mutationFn: async ({ password, email, username }: SignUp) => {
      const data = await routerApi('/api/sign-up', {
        method: 'POST',
        body: JSON.stringify({ password, email, username }),
      })

      return data as { error?: string; data?: any }
    },
    onSuccess: (data) => {
      if (data.data?.token) {
        setToken(data.data?.token)
        queryClient.invalidateQueries({ queryKey: [infoMe] })
      }
    },
  })
}
