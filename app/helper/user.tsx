import { removeToken } from './token'

export function logoutAccount() {
  removeToken()
  window.location.reload()
}
