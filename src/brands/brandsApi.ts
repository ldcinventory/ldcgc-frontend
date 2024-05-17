import { fetchApi } from "../api/fetchApi"

const BRANDS_PATH = '/resources/brands'

export const fetchBrands = () => fetchApi({ method: 'GET', path: BRANDS_PATH})