import { ToolRegister, ToolRegisterQueryParams } from "../../../types/toolRegisterType"

const payloadToken = localStorage.getItem('payloadToken')
const signatureToken = localStorage.getItem('signatureToken')
const API_HOST = import.meta.env.VITE_API_URL
const TOOLS_RESOURCES_PATH = '/resources/tools/registers'

export async function getToolRegisters(queryParameters: ToolRegisterQueryParams) {
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

  let str = Object.entries(queryParameters)
    .map(e => `${e[0]}=${e[1]}`)
    .join('&')

  if (str !== '')
    str = '?' + str

  const url = `${API_HOST}${TOOLS_RESOURCES_PATH}${str}`
  return fetch(url, options)
    .then(response => response.json())
}

export async function updateToolRegister(toolRegister: ToolRegister) {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Origin: "localhost:3000",
    "x-header-payload-token": payloadToken || "",
    "x-signature-token": signatureToken || "",
  }

  const options: RequestInit = {
    method: "PUT",
    headers,
    body: JSON.stringify(toolRegister),
    cache: "no-cache",
  }

  const url = `${API_HOST}${TOOLS_RESOURCES_PATH}/${toolRegister.id}`
  return fetch(url, options)
    .then(response => response.json())
    .then(json => json.data)
}


export async function deleteToolRegister(toolRegisterId: number) {
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

  const url = `${API_HOST}${TOOLS_RESOURCES_PATH}/${toolRegisterId}`
  return fetch(url, options)
    .then(response => response.json())
    .then(json => json.data)
}

export async function createToolRegister(toolRegister: ToolRegister[]) {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Origin: "localhost:3000",
    "x-header-payload-token": payloadToken || "",
    "x-signature-token": signatureToken || "",
  }

  const options: RequestInit = {
    method: "POST",
    headers,
    body: JSON.stringify(toolRegister),
    cache: "no-cache",
  }
  const url = `${API_HOST}${TOOLS_RESOURCES_PATH}/many`
  return fetch(url, options)
    .then(response => response.json())
    .then(json => {
      console.log(json)
      return json.data
    })  
}

