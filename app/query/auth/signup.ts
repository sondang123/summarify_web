import { setToken } from '@/helper/helper-token'

import { signUpApi } from '@/service/auth-api'
import type { SignUp } from '@/types/auth/signup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { INFO_ME, SIGN_UP } from './queryKeys'

export const useSignUp = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: [SIGN_UP],
    mutationFn: async ({ password, email, username }: SignUp) => {
      const data = await signUpApi({ password, email, username })
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
