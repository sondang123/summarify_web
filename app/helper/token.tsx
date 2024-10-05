import { assetToken } from '@/const/app-keys'

export function setToken(token: string) {
  localStorage.setItem(assetToken, token)
}

export function removeToken() {
  localStorage.removeItem(assetToken)
}

export function getToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(assetToken)
  }
  return null
}
