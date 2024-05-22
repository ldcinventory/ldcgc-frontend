import { fetchApi, fetchApiPublic } from "../api/fetchApi"
import { LoginRequestBody } from "./tLogin"

const ACCOUNTS_PATH = '/accounts'
const LOGIN_PATH = ACCOUNTS_PATH + '/login'
const LOGOUT_PATH = ACCOUNTS_PATH + '/logout'

export const apiLogin = ({ email, password }: LoginRequestBody) =>
  fetchApiPublic({ method: "POST", path: LOGIN_PATH, body: JSON.stringify({ email, password }) })

export const ApiLogout = () => fetchApi({ method: "POST", path: LOGOUT_PATH })
