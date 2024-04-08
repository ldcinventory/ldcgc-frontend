import { ConsumablesRegisterParams } from "../register/consumables/tConsumableRegisters"
import { ToolRegisterQueryParams } from "../register/tools/tToolRegisters"
import { ConsumableParams } from "../resources/consumables/tConsumables"

export interface Parent {
  id: number
  name: string
}


export interface PaginatedResponse<T> {
  elements: T[]
  numElements: number
  elementsPerPage: number
  elementsThisPage: number
  actualPage: number
  actualPageFrom: number
  actualPageTo: number
  totalPages: number
}

export interface FetchApiParams {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  path: string
  queryParams?: ConsumableParams | ToolRegisterQueryParams | ConsumablesRegisterParams 
  body?: string
}

export type StatusType = "idle" | "loading" | "failed" | "succeeded" 