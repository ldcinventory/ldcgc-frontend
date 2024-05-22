import { fetchApi } from "../api/fetchApi"
import { User } from "./tUsers"

const USERS_PATH = '/users'

export const fetchUsers = () => fetch(`${import.meta.env.VITE_API_URL}/users`,
  { headers: { "skip-eula": "true" } })


export const fetchMyUser = () =>
  fetchApi({ method: 'GET', path: `${USERS_PATH}/me` })

export const fetchUpdateMyUser = (user: User) => 
  fetchApi({method: 'PUT', path: `${USERS_PATH}/me`, body: JSON.stringify(user)})
