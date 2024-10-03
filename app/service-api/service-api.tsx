export async function serviceApi<T>(
  endpoint: string,
  option: {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'
    body?: any
    headers?: HeadersInit
    redirect?: any
  },
): Promise<{ data: T | null; error: string | null }> {
  const baseUrlApi = process.env.BASE_URL_API

  const url = `${baseUrlApi}/${endpoint}`

  try {
    const response = await fetch(url, {
      ...option,
      headers: {
        'Content-Type': 'application/json',
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
