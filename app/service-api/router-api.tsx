import { showToastError } from '@/helper/toast'
import { getToken } from '@/helper/token'

export async function routerApi<T>(
  endpoint: string,
  option: {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'
    body?: any
    headers?: HeadersInit
    redirect?: any
  },
): Promise<{ data: T | null; error: string | null }> {
  try {
    const token = getToken()
    const response = await fetch(endpoint, {
      ...option,
      headers: {
        Authorization: `Bearer ${token}`,
        ...option.headers,
      },
    })

    const data: any = await response.json()
    if (endpoint !== '/api/info-me' && data?.error) {
      showToastError(data?.error ?? 'Please try again!')
    }
    return data
  } catch (error) {
    let errorMessage = 'Please try again!'
    if (error instanceof Error) {
      errorMessage = error.message
    }

    return {
      data: null,
      error: errorMessage,
    }
  }
}
