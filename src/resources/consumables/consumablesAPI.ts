import { ConsumableParams, ConsumableWithId } from "./tConsumables"

const payloadToken = localStorage.getItem('payloadToken')
const signatureToken = localStorage.getItem('signatureToken')
const API_HOST = import.meta.env.VITE_API_URL
const CONSUMABLES_PATH = '/resources/consumables'

export function fetchConsumables(params: ConsumableParams = {}) {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Origin: "localhost:3000",
    "x-header-payload-token": payloadToken || "",
    "x-signature-token": signatureToken || "",
  }

  const options: RequestInit = {
    method: "GET",
    headers,
    cache: "no-cache",
  }

  let paramsStr = Object.entries(params)
    .map(param => `${param[0]}=${param[1]}`)
    .join('&')

  if (paramsStr !== '')
    paramsStr = '?' + paramsStr

  const url = `${API_HOST}${CONSUMABLES_PATH}/loose${paramsStr}`
  return fetch(url, options)
}

export function fetchDeleteConsumable(registerId: number) {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Origin: "localhost:3000",
    "x-header-payload-token": payloadToken || "",
    "x-signature-token": signatureToken || "",
  }

  const options: RequestInit = {
    method: "DELETE",
    headers,
    cache: "no-cache",
  }


  const url = `${API_HOST}${CONSUMABLES_PATH}/${registerId}`
  return fetch(url, options)
}


export function fetchUpdateConsumable(register: ConsumableWithId) {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Origin: "localhost:3000",
    "x-header-payload-token": payloadToken || "",
    "x-signature-token": signatureToken || "",
  }

  const options: RequestInit = {
    method: "PUT",
    headers,
    body: JSON.stringify(register),
    cache: "no-cache",
  }

  console.log(register)

  const url = `${API_HOST}${CONSUMABLES_PATH}/${register.id}`
  return fetch(url, options)
}