const payloadToken = localStorage.getItem('payloadToken')
const signatureToken = localStorage.getItem('signatureToken')
const API_HOST = import.meta.env.VITE_API_URL
const TOOLS_PATH = '/resources/tools/loose'

export const getToolsLoose = ({filterString, status, size}) => {
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

  const url = `${API_HOST}${TOOLS_PATH}?filterString=${filterString}&status=${status}&size=${size}`

  return fetch(url, options)
    .then(response => response.json())
    .then(json => json.data.elements)
}