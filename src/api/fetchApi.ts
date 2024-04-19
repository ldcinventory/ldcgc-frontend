import { FetchApiParams, QueryParams } from "../common/tCommon"

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

  const paramsStr = generateParamsStr(queryParams)
  
  const url = `${API_URL}${path}${paramsStr}`
  return fetch(url, options)  
    .then(async res => {
      const json = await res.json()
      if (!res.ok && (res.status === 401 || json.message.toLowerCase().includes('token'))) {
        localStorage.removeItem('payloadToken')
        localStorage.removeItem('signatureToken')
        window.location.replace('/login')
        return Promise.reject();
      }

      res.json = () => json
      return res
  })
}

export const fetchApiPublic = ({ method, path, queryParams, body }: FetchApiParams) => {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      Origin: "localhost:3000",
    },
    body,
    cache: "no-cache",
  }

  const paramsStr = generateParamsStr(queryParams)

  const url = `${API_URL}${path}${paramsStr}`

  return fetch(url, options)
    .then(response => response.headers)
}

const generateParamsStr = (queryParams?: QueryParams) => {
  
  let paramsStr = ''
  if (queryParams !== undefined) {
    paramsStr = '?' + Object.entries(queryParams)
      .map(param => `${param[0]}=${param[1]}`)
      .join('&')
  }

  return paramsStr
}