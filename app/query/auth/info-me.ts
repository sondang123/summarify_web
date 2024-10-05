import { getToken } from '@/helper/token'

import { routerApi } from '@/service-api/router-api'
import { useQuery } from '@tanstack/react-query'
import { infoMe } from './query-keys'

export const useInfoMe = () => {
  const token = getToken()
  return useQuery({
    queryKey: [infoMe, token],
    queryFn: async () => {
      const data = await routerApi('/api/info-me', {
        method: 'GET',
      })

      return data as { error?: string; data?: any }
    },
  })
}
