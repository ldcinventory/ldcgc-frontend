import { Consumable } from "./consumableType";

export interface ConsumableRegister {
  consumableBardcode: string;
  volunteerBAId: string;
  volunteerName: string;
  volunteerLastName: string;
  registerFrom: Date;
  registerTo: Date;
  stockAmountRequest: number;
  stockAmountReturn: number;
  consumable: Consumable;
  closedRegister: boolean;
  processingStockChanges: boolean;
}

export interface ConsumableRegisterWithId extends ConsumableRegister {
  id: number;
}

export interface ConsumablesRegisterParams {
  pageIndex?: number;
  size?: number;
  volunteer?: number | string;
  consumable?: string;
  registerFrom?: string;
  registerTo?: string;
  status?: string;
  sortField?: string;
  descOrder?: boolean;
}