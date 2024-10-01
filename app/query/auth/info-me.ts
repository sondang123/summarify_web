import { getToken } from '@/helper/helper-token'
import { infoMe } from '@/service/auth-api'
import { useQuery } from '@tanstack/react-query'
import { INFO_ME } from './queryKeys'

export const useInfoMe = () => {
  const token = getToken()
  return useQuery({
    queryKey: [INFO_ME, token],
    queryFn: async () => {
      const data = await infoMe()
      return data as { error?: string; data?: any }
    },
  })
}
