import { getToken } from '@/helper/helper-token'

import { routerApi } from '@/service-api/router-api'
import { useQuery } from '@tanstack/react-query'
import { INFO_ME } from './queryKeys'

export const useInfoMe = () => {
  const token = getToken()
  return useQuery({
    queryKey: [INFO_ME, token],
    queryFn: async () => {
      const data = await routerApi('/api/info-me', {
        method: 'GET',
      })

      return data as { error?: string; data?: any }
    },
  })
}
