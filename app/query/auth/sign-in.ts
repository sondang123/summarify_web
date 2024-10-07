import { setToken } from '@/helper/token'

import { routerApi } from '@/service-api/router-api'
import type { SignIn } from '@/types/auth/signup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { infoMe, signIn } from './query-keys'

export const useSignIn = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: [signIn],
    mutationFn: async ({ password, email }: SignIn) => {
      const data = await routerApi('/api/sign-in', {
        method: 'POST',
        body: JSON.stringify({ password, email }),
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
