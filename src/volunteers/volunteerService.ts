import { fetchApi } from "../api/fetchApi"
import { VolunteersParams } from "./tVolunteers"
const VOLUNTEERS_PATH = '/volunteers'

export const fetchVolunteers = ({ volunteersParams }: { volunteersParams: VolunteersParams }) =>
  fetchApi({ method: 'GET', path: VOLUNTEERS_PATH, queryParams: volunteersParams })