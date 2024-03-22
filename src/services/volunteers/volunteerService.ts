const payloadToken = localStorage.getItem('payloadToken')
const signatureToken = localStorage.getItem('signatureToken')
const API_HOST = import.meta.env.VITE_API_URL
const VOLUNTEERS_PATH = '/volunteers'

export const getVolunteers = ({query, size}) => {
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

  const baID = Number(query)
  const url = `${API_HOST}${VOLUNTEERS_PATH}?${isNaN(baID) || query === '' ? 'filterString' : 'builderAssistantId'}=${query}&size=${size}`

  return fetch(url, options)
    .then(response => response.json())
    .then(json => {
      if (!isNaN(baID))
        return [json.data]
      return json.data.elements
    })
}