import { TOKEN } from '@/const/app_keys'

export async function setToken(token: string) {
  localStorage.setItem(TOKEN, token)
}

export async function removeToken() {
  localStorage.removeItem(TOKEN)
}

export function getToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN)
  }
  return null
}
