import { fetchApi } from "../../api/fetchApi";

const RESOURCE_TYPE_PATH = '/resources/types'

export const fetchResourceTypes = () => fetchApi({method: 'GET', path: RESOURCE_TYPE_PATH})