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
  queryParams?: QueryParams
  body?: string | BodyInit | File | FormData
  contentType?: string
  contentTypeAuto?: boolean
}

export type QueryParams = ConsumableParams | ToolRegisterParams | ConsumablesRegisterParams | VolunteersParams | ToolsParams

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

export interface LabeledInputSelect extends InputSelect {
  id: string
  label: string
}

export interface InputFile extends Input {
  id: string
  children: ReactNode
  accept: string
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

export interface TextArea extends Interactable {
  onChange: ChangeEventHandler<HTMLTextAreaElement>,
  rows?: number
  cols?: number
}

export interface LabeledTextArea extends TextArea {
  id: string
  label: string
}