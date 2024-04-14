import { fetchApi } from "../../api/fetchApi"
import { ToolsParams } from "./tTools"

const TOOLS_PATH = '/resources/tools'

export const fecthToolsLoose = ({ toolsParams }: { toolsParams: ToolsParams }) => fetchApi({ method: 'GET', path: `${TOOLS_PATH}/loose`, queryParams: toolsParams})