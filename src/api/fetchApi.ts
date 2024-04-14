import { FetchApiParams } from "../common/tCommon"

const API_URL = import.meta.env.VITE_API_URL

export const fetchApi = ({ method, path, queryParams, body }: FetchApiParams) => {
  const payloadToken = localStorage.getItem('payloadToken')
  const signatureToken = localStorage.getItem('signatureToken')


  if (!payloadToken || !signatureToken || payloadToken === '' || signatureToken === '') {
    window.location.replace('/login')
    return Promise.reject();
  }
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Origin: "localhost:3000",
    "x-header-payload-token":  payloadToken ||"",
    "x-signature-token": signatureToken || "",
  }

  const options: RequestInit = {
    method,
    headers,
    cache: "no-cache",
    body
  }

  let paramsStr = ''
  if(queryParams !== undefined){
    paramsStr = '?' + Object.entries(queryParams)
      .map(param => `${param[0]}=${param[1]}`)
      .join('&')    
  }
  
  const url = `${API_URL}${path}${paramsStr}`
  
  return fetch(url, options)
    .then(res => {
      if (!res.ok && (res.status === 401 || res.statusText.toLowerCase().includes('token'))) {
        localStorage.removeItem('payloadToken')
        localStorage.removeItem('signatureToken')
        window.location.replace('/login')
        return Promise.reject();
      }
      return res
  })
}
