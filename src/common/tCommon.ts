import { ChangeEventHandler, KeyboardEventHandler, ReactNode } from "react"
import { ConsumablesRegisterParams } from "../register/consumables/tConsumableRegisters"
import { ToolRegisterParams } from "../register/tools/tToolRegisters"
import { ConsumableParams } from "../resources/consumables/tConsumables"
import { VolunteersParams } from "../volunteers/tVolunteers"
import { ToolsParams } from "../resources/tools/tTools"

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
  queryParams?: ConsumableParams | ToolRegisterParams | ConsumablesRegisterParams | VolunteersParams | ToolsParams
  body?: string
}

export type StatusType = "idle" | "loading" | "failed" | "succeeded"

export interface Interactable {
  value?: string | number,
  defaultValue?: string | number,
  placeholder?: string,
  className?: string
}

export interface Input extends Interactable {
  onChange: ChangeEventHandler<HTMLInputElement>,
  max?: number,
  min?: number,
  step?: number | "any"
  onKeyUp?: KeyboardEventHandler<HTMLInputElement>
}

export interface LabeledInput extends Input {
  id: string;
  label: ReactNode
}

export interface InputSelect extends Interactable {
  onChange: ChangeEventHandler<HTMLSelectElement>,
  options: Option[]
}

type Option = {
  name: string
  value: string
}

export interface Button {
  children?: ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
}

export interface List {
  items: ListItem[]
  className?: string
}

interface ListItem {
  id: string | number
  display: ReactNode
  onClick: () => void
}

export interface FindAllParams {
  filterString?: string
  size?: number
  pageIndex?: number
}