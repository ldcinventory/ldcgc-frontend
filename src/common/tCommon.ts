import { ChangeEventHandler, KeyboardEventHandler, MouseEventHandler, ReactNode } from "react"
import { ConsumablesRegisterParams } from "../register/consumables/tConsumableRegisters"
import { ToolRegisterParams } from "../register/tools/tToolRegisters"
import { ConsumableParams } from "../resources/consumables/tConsumables"
import { VolunteersParams } from "../volunteers/tVolunteers"
import { ToolsParams } from "../resources/tools/tTools"
import { DriveParams } from "../drive/tDrive"

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

export type QueryParams = ConsumableParams | ToolRegisterParams | ConsumablesRegisterParams | VolunteersParams | ToolsParams | DriveParams

export type StatusType = "idle" | "loading" | "failed" | "succeeded"

export interface Interactable {
  value?: string | number,
  defaultValue?: string | number,
  placeholder?: string,
  className?: string
}

export interface Input extends Interactable {
  onChange?: ChangeEventHandler<HTMLInputElement>,
  max?: number,
  min?: number,
  step?: number | "any"
  onKeyUp?: KeyboardEventHandler<HTMLInputElement>
  name?: string
}

export interface LabeledInput extends Input {
  id: string;
  label: ReactNode
}

export interface InputSelect extends Interactable {
  onChange?: ChangeEventHandler<HTMLSelectElement>,
  options: Option[]
  name?: string
}

export interface LabeledInputSelect extends InputSelect {
  id: string
  label: ReactNode
}

export interface InputFile extends Input {
  id: string
  children: ReactNode
  accept: string
  multiple?: boolean
}

type Option = {
  name: string
  value: string
}

export interface Button {
  children?: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
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
  onChange?: ChangeEventHandler<HTMLTextAreaElement>,
  rows?: number
  cols?: number
  name?: string
}

export interface LabeledTextArea extends TextArea {
  id: string
  label: ReactNode
}