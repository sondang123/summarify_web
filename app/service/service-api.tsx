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

  try {
    const response = await fetch(url, {
      ...option,
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjgwMDIyNjMsInVzZXJfZW1haWwiOiJzb25kYW5nMmtrQGdtYWlsLmNvbSJ9.BQQBv_QuDWuvzMI7SDOv6-i7nijrscNaIoh1YTTSTqA',
        ...option.headers,
      },
    })

    if (!response.ok) {
      let errorMessage = 'Please try again!'
      try {
        const errorData: unknown = await response.json()
        if (
          typeof errorData === 'object' &&
          errorData &&
          'error' in errorData
        ) {
          errorMessage = (errorData as { error: string }).error || errorMessage
        }
      } catch {}

      showToastError(errorMessage)
      return {
        data: null,
        error: errorMessage,
      }
    }

    const data: any = await response.json()
    return { data: data?.data, error: null }
  } catch (error) {
    let errorMessage = 'Please try again!'
    if (error instanceof Error) {
      errorMessage = error.message
    }
    showToastError(errorMessage)
    return {
      data: null,
      error: errorMessage,
    }
  }
}
