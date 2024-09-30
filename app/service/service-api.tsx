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
          'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjVhYWZmNDdjMjFkMDZlMjY2Y2NlMzk1YjIxNDVjN2M2ZDQ3MzBlYTUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI3OTA0MjkzNDA5MzEtdGFlYjZiaW43czJsYWVxYjYxZG0xZmtkYW5vZmZycm4uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI3OTA0MjkzNDA5MzEtdGFlYjZiaW43czJsYWVxYjYxZG0xZmtkYW5vZmZycm4uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTMyOTQwMTE1MzkyODUxMTk0NzYiLCJlbWFpbCI6InNvbmRhbmcya2tAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiIyY0dRQ2NsalB3ZEJma0VuTmQ3Tm53IiwibmFtZSI6IlPGoW4gxJDhurduZyIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NKM0ZtNm1RYlpHam5TejF6NFJaUXlxVVhKNlB2M2Q3MGg3VlRJTHBBejV1NGpTanMzaz1zOTYtYyIsImdpdmVuX25hbWUiOiJTxqFuIiwiZmFtaWx5X25hbWUiOiLEkOG6t25nIiwiaWF0IjoxNzI3NjYwNzQ5LCJleHAiOjE3Mjc2NjQzNDl9.VxM3-oEq4XZg86ymci7_mj0geyC0m19vjQPo5S45y0PZv4gCKspzeTJ0SV6e8W5B6bRz-dCmaexrv2_1QqXWsvX3gS4WHteg7roJ_IvvFrXV2cihLmicFKZnxZtOqKrbvyWimud0M1MEnVzXPFj8rDPeJzsd_NRun1xe0hxLXRUYS2QOadJ3Md8NAbTuCKd8yokzz7K6dEWRLcpeLj75cC3HquKWmroa97Nwj58WIJl09yIhVUmwPJ6HJQnqMr2qYdy2C-oCisDGUksP2VVAsFOHwhQBAzn8J6wdO1aVKYsd-5c8pza7cA4CxvD4fO57YxONuE12UL5ZwgeyPU7YHg',
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
