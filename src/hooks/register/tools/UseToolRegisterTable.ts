import { useEffect, useState } from "react"
import { deleteToolRegister, getToolRegisters, updateToolRegister } from "../../../services/register/tools/ToolRegisterService"
import { ToolRegister, ToolRegisterQueryParams, ToolRegisterWithId } from "../../../types/toolRegisterType"

export function useToolRegisterTable() {
  const [toolRegister, setToolRegister] = useState<ToolRegisterWithId[]>([])
  const [queryParameters, setQueryParameters] = useState<ToolRegisterQueryParams>({
    status: "opened",
    size: 10,
    pageIndex: 0
  })
  const [fromDesc, setFromDesc] = useState(true)
  const [toDesc, setToDesc] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [pageIndex, setPageIndex] = useState(0);
  const [maxPage, setMaxPage] = useState(0);

  const refreshRegister = () => {
    getToolRegisters(queryParameters)
      .then(res => {
        setMaxPage(res.data.totalPages - 1)
        setToolRegister(res.data.elements)
      })
  }

  useEffect(() => refreshRegister(), [queryParameters])
  useEffect(() => setQueryParameters({
    ...queryParameters,
    
  }),
    [])

  const handleQueryParams = (newQueryParameters: ToolRegisterQueryParams) => {
    setQueryParameters({ ...queryParameters, ...newQueryParameters })
  }

  const closeRegister = async (register: ToolRegisterWithId) => {
    register.registerTo = new Date()
    await updateToolRegister(register)
    refreshRegister()
  }

  const deleteRegister = async (register: ToolRegisterWithId) => {
    await deleteToolRegister(register.id)
    refreshRegister()
  }

  const toggleOrderByRegisterFrom = () => {
    setFromDesc(!fromDesc)
    handleQueryParams({ sortString: "registerFrom", descOrder: fromDesc })
  }

  const toggleOrderByRegisterTo = () => {
    setToDesc(!toDesc)
    handleQueryParams({ sortString: "registerTo", descOrder: toDesc })
  }

  const toggleShowFilters = () => {
    setShowFilters(!showFilters)
  }

  const changePageIndex = (index: number) => {
    const pageIndex = Math.min(maxPage, Math.max(0, index))
    setPageIndex(pageIndex)
    handleQueryParams({pageIndex})
  }

  return {
    toolRegister,
    queryParameters,
    handleQueryParams,
    closeRegister,
    deleteRegister,
    toggleOrderByRegisterFrom,
    toggleOrderByRegisterTo,
    refreshRegister,
    showFilters,
    toggleShowFilters,
    pageIndex,
    changePageIndex,
    maxPage
  }
}
