import { ConsumableRegisterWithId, ConsumablesRegisterParams } from "../../../types/consumableRegisterType"

const payloadToken = localStorage.getItem('payloadToken')
const signatureToken = localStorage.getItem('signatureToken')
const API_HOST = import.meta.env.VITE_API_URL
const TOOLS_RESOURCES_PATH = '/resources/consumables/registers'

export function fetchConsumablesRegister(params: ConsumablesRegisterParams = {}) {
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

  const url = `${API_HOST}${TOOLS_RESOURCES_PATH}${paramsStr}`
  return fetch(url, options)
}

export function fetchDeleteConsumableRegister(registerId: number) {
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


  const url = `${API_HOST}${TOOLS_RESOURCES_PATH}/${registerId}`
  return fetch(url, options)
}


export function fetchUpdateConsumableRegister(register: ConsumableRegisterWithId) {
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

  const url = `${API_HOST}${TOOLS_RESOURCES_PATH}/${register.id}`
  return fetch(url, options)
}