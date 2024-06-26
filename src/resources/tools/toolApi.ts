import { fetchApi } from "../../api/fetchApi"
import { Tool, ToolPost, ToolWithId, ToolsParams } from "./tTools"

const TOOLS_PATH = '/resources/tools'

export const fecthToolsLoose = ({ toolsParams }: { toolsParams: ToolsParams }) => fetchApi({ method: 'GET', path: `${TOOLS_PATH}/loose`, queryParams: toolsParams })
export const fecthTools = ({ toolsParams }: { toolsParams: ToolsParams }) => fetchApi({ method: 'GET', path: TOOLS_PATH, queryParams: toolsParams })
export const fetchDeleteTool = (toolId: number) => fetchApi({ method: "DELETE", path: `${TOOLS_PATH}/${toolId}` })
export const fetchUploadToolsExcel = (formData: FormData) =>
  fetchApi({ method: "POST", path: `${TOOLS_PATH}/excel`, body: formData, contentTypeAuto: true })
export const fetchUpdateTool = (tool: ToolWithId) => fetchApi({ method: 'PUT', path: `${TOOLS_PATH}/${tool.id}`, body: JSON.stringify(tool) })
export const fetchAddTool = (tool: ToolPost) => fetchApi({ method: 'POST', path: TOOLS_PATH, body: JSON.stringify(tool)})