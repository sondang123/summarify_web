import type { SignIn, SignUp } from '@/types/auth/signup'
import { serviceApi } from './service-api'

export async function signUpApi({ username, password, email }: SignUp) {
  try {
    const json = await serviceApi('auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, password, email }),
      redirect: 'follow',
    })
    return json
  } catch (error) {
    console.error('Error fetching video data:', error)
    throw error
  }
}
export async function signInApi({ password, email }: SignIn) {
  try {
    const json = await serviceApi('auth/login', {
      method: 'POST',
      body: JSON.stringify({ password, email }),
      redirect: 'follow',
    })
    return json
  } catch (error) {
    console.error('Error fetching video data:', error)
    throw error
  }
}
export async function infoMe() {
  try {
    const json = await serviceApi('web/info/current', {
      method: 'GET',
      redirect: 'follow',
    })
    return json
  } catch (error) {
    console.error('Error fetching video data:', error)
    throw error
  }
}
