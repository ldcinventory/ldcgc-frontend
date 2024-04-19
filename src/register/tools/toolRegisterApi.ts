import { fetchApi } from "../../api/fetchApi"
import { ToolRegister, ToolRegisterParams, ToolRegisterWithId } from "./tToolRegisters"

const TOOLS_REGISTERS_PATH = '/resources/tools/registers'

export const fetchGetToolRegisters = (queryParameters: ToolRegisterParams) =>
  fetchApi({ method: "GET", path: TOOLS_REGISTERS_PATH, queryParams: queryParameters })

export const fetchUpdateToolRegister = (toolRegister: ToolRegisterWithId) =>
  fetchApi({ method: "PUT", path: `${TOOLS_REGISTERS_PATH}/${toolRegister.id}`, body: JSON.stringify(toolRegister) })

export const fetchDeleteToolRegister = (toolRegisterId: number) =>
  fetchApi({ method: "DELETE", path: `${TOOLS_REGISTERS_PATH}/${toolRegisterId}` })

export const fetchCreateToolRegisters = (toolRegister: ToolRegister[]) =>
  fetchApi({ method: "POST", path: `${TOOLS_REGISTERS_PATH}/many`, body: JSON.stringify(toolRegister) })
