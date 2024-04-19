import { fetchApi } from "../api/fetchApi"

const ACCOUNTS_PATH = '/accounts'
const LOGIN_PATH = ACCOUNTS_PATH + '/login'
const LOGOUT_PATH = ACCOUNTS_PATH + '/logout'

export const ApiLogin = ({ email, password }) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "localhost:3000",
    },
    body: JSON.stringify({email, password}),
    cache: "no-cache",
  }

  const url = `${import.meta.env.VITE_API_URL}${LOGIN_PATH}`
  return fetch(url, options)
    .then(response => response.headers)
}

export const ApiLogout = () => fetchApi({ method: "POST", path: LOGOUT_PATH })
