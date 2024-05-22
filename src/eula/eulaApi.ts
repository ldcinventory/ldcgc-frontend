import { fetchApi } from "../api/fetchApi";
import { EulaParams } from "./tEula";

const EULA_PATH = '/eula'

export const fetchEula = () => 
  fetchApi({ method: 'GET', path: EULA_PATH })

export const fetchUpdateEula = (queryParams: EulaParams) => 
  fetchApi({method: 'PUT', path: EULA_PATH, queryParams})
