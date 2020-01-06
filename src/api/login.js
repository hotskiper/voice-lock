import axios from 'axios'
import qs from 'qs'
import baseurl from './base'
// let base = 'http://10.1.122.207:8080'

export const microappLogin = params => {
  // ajaxTag=1&reqSource=wx&wxcode="+wxcode
  return axios.get(baseurl.microapp + `/j_spring_security_check`, params).then(res => res.data)
}

export const requestLogin = params => {
  // return axios.post(baseurl.api + `/fh-auth/login/microapp`, qs.stringify(params)).then(res => res.data)
  return axios.post(baseurl.api + `/fh-auth/login/xcube`, qs.stringify(params)).then(res => res.data)
}

export const requestLoginWx = params => {
  // return axios.post(baseurl.api + `/fh-auth/login/wechart`, qs.stringify(params)).then(res => res.data)
  return axios.post(baseurl.api + `/parse`, qs.stringify(params)).then(res => res.data)
}

export const requestLoginToken = params => {
  // console.log(qs.stringify(params))
  // return axios.post(baseurl.api + `/fh-auth/login/token/`, qs.stringify(params)).then(res => res.data)
  return axios.post(baseurl.api + `/parse`, qs.stringify(params)).then(res => res.data)
}

export const getMenus = params => {
  return axios.post(baseurl.api + `/fh-auth/menu`, params).then(res => res.data)
}

export const logout = params => {
  return axios.post(baseurl.api + `/fh-auth/logout`, params).then(res => res.data)
}
