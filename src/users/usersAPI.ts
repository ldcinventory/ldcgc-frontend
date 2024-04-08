import { fetchApi } from "../common/fetchApi"

const USERS_PATH = '/users'

export const fetchUsers = () => fetch(`${import.meta.env.VITE_API_URL}/users`, 
{ headers: { "skip-eula": "true" }})


export const fetchMyUser = () => fetchApi({method: 'GET', path: `${USERS_PATH}/me`})