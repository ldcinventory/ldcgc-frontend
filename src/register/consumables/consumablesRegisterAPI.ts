import { fetchApi } from "../../api/fetchApi"
import { ConsumableRegister, ConsumableRegisterWithId, ConsumablesRegisterParams } from "./tConsumableRegisters"

const CONSUMABLES_RESOURCES_PATH = '/resources/consumables/registers'

export const fetchConsumablesRegister = (params: ConsumablesRegisterParams = {}) =>
  fetchApi({ method: 'GET', path: CONSUMABLES_RESOURCES_PATH, queryParams: params })

export const fetchDeleteConsumableRegister = (registerId: number) =>
  fetchApi({ method: 'DELETE', path: `${CONSUMABLES_RESOURCES_PATH}/${registerId}` })

export const fetchUpdateConsumableRegister = (register: ConsumableRegisterWithId) =>
  fetchApi({ method: 'PUT', path: `${CONSUMABLES_RESOURCES_PATH}/${register.id}`, body: JSON.stringify(register) })

export const fetchCreateConsumableRegisters = (consumableRegisters: ConsumableRegister[]) => 
  fetchApi({ method: "POST", path: `${CONSUMABLES_RESOURCES_PATH}/many`, body: JSON.stringify(consumableRegisters) })
