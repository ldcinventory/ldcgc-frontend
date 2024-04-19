import { fetchApi } from "../../api/fetchApi"
import { ConsumableParams, ConsumableWithId } from "./tConsumables"
const CONSUMABLES_PATH = '/resources/consumables'

export const fetchConsumables = (params: ConsumableParams = {}) =>
  fetchApi({ method: "GET", path: `${CONSUMABLES_PATH}/loose`, queryParams: params })

export const fetchDeleteConsumable = (registerId: number) =>
  fetchApi({ method: 'DELETE', path: `${CONSUMABLES_PATH}/${registerId}` })


export const fetchUpdateConsumable = (register: ConsumableWithId) =>
  fetchApi({ method: "PUT", path: `${CONSUMABLES_PATH}/${register.id}`, body: JSON.stringify(register) })
  