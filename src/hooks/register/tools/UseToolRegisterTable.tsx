import { useEffect, useState } from "react"
import { getToolRegisters } from "../../../services/register/tools/ToolRegisterService"

export function useToolRegisterTable() {
  const [toolRegister, setToolRegister] = useState([])
  const [queryParameters, setQueryParameters] = useState({ status: 'opened', size: '10' })

  useEffect(() => {
    async function fetch() {
      const newToolRegister = await getToolRegisters(queryParameters)
      setToolRegister(newToolRegister)
    }
    fetch()
  },
    [queryParameters])

  const refreshRegister = async () => {
    const newRegister = await getToolRegisters(queryParameters)
    setToolRegister(newRegister)
  }
  
  return {
    toolRegister,
    refreshRegister,
    queryParameters,
    setQueryParameters
  }
}