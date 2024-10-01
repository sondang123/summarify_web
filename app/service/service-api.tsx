import { getToken } from '@/helper/helper-token'
import { showToastError } from '@/helper/toast'

export async function serviceApi<T>(
  endpoint: string,
  option: {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'
    body?: any
    headers?: HeadersInit
    redirect?: any
  },
): Promise<{ data: T | null; error: string | null }> {
  const baseUrlApi =
    typeof process !== 'undefined'
      ? (process.env.BASE_URL_API ?? '')
      : (window.ENV.BASE_URL_API ?? '')
  const url = `${baseUrlApi}/${endpoint}`

  const token = getToken()
  try {
    const response = await fetch(url, {
      ...option,
      headers: {
        Authorization: `Bearer ${token} `,
        ...option.headers,
      },
    })

    const data: any = await response.json()
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
