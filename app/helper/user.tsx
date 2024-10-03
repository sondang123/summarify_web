import { removeToken } from './helper-token'

export function logoutAccount() {
  removeToken()
  window.location.reload()
}
