import Cookies from 'js-cookie'

const TokenKey = 'xauth'
const TokenCode = 'xauthc'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function getTokenCode () {
  return Cookies.get(TokenCode)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function setTokenCode (token) {
  return Cookies.set(TokenCode, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

export function removeTokenCode () {
  return Cookies.remove(TokenCode)
}
