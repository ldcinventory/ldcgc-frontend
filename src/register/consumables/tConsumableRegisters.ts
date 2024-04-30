import { Consumable } from "../../resources/consumables/tConsumables"

export interface ConsumableRegister {
  consumableBarcode: string
  consumableName: string
  consumableStockType: string
  volunteerBAId: string
  volunteerName: string
  volunteerLastName: string
  registerFrom: Date
  registerTo?: Date
  stockAmountRequest: number
  stockAmountReturn?: number
  closedRegister: boolean
  processingStockChanges: boolean
}

export interface ConsumableRegisterWithId extends ConsumableRegister {
  id: number
}

export interface ConsumablesRegisterParams {
  pageIndex?: number
  size?: number
  volunteer?: number | string
  consumable?: string
  registerFrom?: string
  registerTo?: string
  status?: string
  sortField?: string
  descOrder?: boolean
}

export interface SelectedConsumable {
  consumableBarcode: string
  consumableName: string
  consumableStockType: string
  stockAmountRequest: number
}