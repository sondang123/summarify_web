import { setToken } from '@/helper/helper-token'

import { routerApi } from '@/service-api/router-api'
import type { SignIn } from '@/types/auth/signup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { INFO_ME, SIGN_IN } from './queryKeys'

export const useSignIn = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: [SIGN_IN],
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
        queryClient.invalidateQueries({ queryKey: [INFO_ME] })
      }
    },
  })
}
