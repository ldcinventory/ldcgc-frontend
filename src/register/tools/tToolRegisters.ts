export interface ToolRegister {
  registerFrom: Date
  registerTo?: Date
  toolName: string
  toolBarcode: string
  toolUrlImages: string[]
  volunteerName: string
  volunteerLastName: string
  volunteerBuilderAssistantId: string
}

export interface ToolRegisterWithId extends ToolRegister {
  id: number
}

export interface ToolRegisterParams {
  pageIndex?: number
  size?: number
  sortString?: string
  descOrder?: boolean
  status?: string
  volunteer?: string
  tool?: string
}