const payloadToken = "eyJraWQiOiI0OTQ5N2I1My0zNWVmLTQ3OTUtYWNkYi0wYWY2MzA5MmZjOWQiLCJhbGciOiJFZERTQSJ9.eyJpc3MiOiJodHRwczovL2djOGludmVudG9yeS5lcyIsInN1YiI6IjMiLCJleHAiOjE3MDk3MjY5NjUsImlhdCI6MTcwOTY0MDU2NSwidXNlckNsYWltcyI6eyJyb2xlIjoiQURNSU4iLCJlbWFpbCI6Im5vZXVsYUBhZG1pbnYifSwianRpIjoiNDk0OTdiNTMtMzVlZi00Nzk1LWFjZGItMGFmNjMwOTJmYzlkIn0"
const signatureToken = "5tkeJQKndCeZDI93uKoXggSvNPcKDd6XIvb7IgLJh2SlJCm5EomqqMINzn8cBd_OY3SQ-GxYIY3nkj_OaEapBA"
const API_HOST = 'http://localhost:8081'
const TOOLS_RESOURCES_PATH = '/api/resources/tools/registers'

export async function getToolRegisters(queryParameters) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Origin: "localhost:3000",
      "x-header-payload-token": payloadToken,
      "x-signature-token": signatureToken,
    },
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
    .then(json => json.data.elements)
}

export async function updateToolRegister(toolRegister) {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Origin: "localhost:3000",
      "x-header-payload-token": payloadToken,
      "x-signature-token": signatureToken,
    },
    body: JSON.stringify(toolRegister),
    cache: "no-cache",
  }

  const url = `${API_HOST}${TOOLS_RESOURCES_PATH}/${toolRegister.id}`
  return fetch(url, options)
    .then(response => response.json())
    .then(json => json.data)
}


export async function deleteToolRegister(toolRegisterId) {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Origin: "localhost:3000",
      "x-header-payload-token": payloadToken,
      "x-signature-token": signatureToken,
    },
    cache: "no-cache",
  }

  const url = `${API_HOST}${TOOLS_RESOURCES_PATH}/${toolRegisterId}`
  return fetch(url, options)
    .then(response => response.json())
    .then(json => json.data)
}

