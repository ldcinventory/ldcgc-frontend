import { fetchApi } from "../../api/fetchApi"
import { ConsumableParams, ConsumableWithId } from "./tConsumables"

const payloadToken = localStorage.getItem('payloadToken')
const signatureToken = localStorage.getItem('signatureToken')
const API_HOST = import.meta.env.VITE_API_URL
const CONSUMABLES_PATH = '/resources/consumables'

export const fetchConsumables = (params: ConsumableParams = {}) =>
  fetchApi({ method: "GET", path: `${CONSUMABLES_PATH}/loose`, queryParams: params })

export const fetchDeleteConsumable = (registerId: number) =>
  fetchApi({ method: 'DELETE', path: `${CONSUMABLES_PATH}/${registerId}` })


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