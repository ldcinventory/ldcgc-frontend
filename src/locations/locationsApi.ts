import { fetchApi } from "../api/fetchApi"

const LOCATIONS_PATH = '/locations'

export const fetchLocations = () => fetchApi({ method: 'GET', path: LOCATIONS_PATH })