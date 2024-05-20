import { fetchApi } from "../../api/fetchApi"
import { ConsumableParams, ConsumablePost, ConsumableWithId } from "./tConsumables"
const CONSUMABLES_PATH = '/resources/consumables'

export const fetchConsumablesLoose = (params: ConsumableParams = {}) =>
  fetchApi({ method: "GET", path: `${CONSUMABLES_PATH}`, queryParams: params })

export const fecthConsumables = ({ consumablesParams }: { consumablesParams: ConsumableParams }) =>
  fetchApi({ method: 'GET', path: CONSUMABLES_PATH, queryParams: consumablesParams })

export const fetchUploadConsumablesExcel = ({ formData, groupId }: { groupId: number, formData: FormData }) =>
  fetchApi({ method: "POST", path: `${CONSUMABLES_PATH}/excel`, body: formData, queryParams: { groupId }, contentTypeAuto: true })

export const fetchAddConsumable = (consumable: ConsumablePost) =>
  fetchApi({ method: 'POST', path: CONSUMABLES_PATH, body: JSON.stringify(consumable) })

export const fetchDeleteConsumable = (consumableId: number) => 
  fetchApi({ method: 'DELETE', path: `${CONSUMABLES_PATH}/${consumableId}`, })

export const fetchUpdateConsumable = (consumable: ConsumableWithId) =>
  fetchApi({ method: 'PUT', path: `${CONSUMABLES_PATH}/${consumable.id}`, body: JSON.stringify(consumable) })