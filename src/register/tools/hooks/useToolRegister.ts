import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/store"
import { ToolRegisterParams, ToolRegisterWithId } from "../tToolRegisters"
import { useDebouncedCallback } from "use-debounce"
import { closeToolRegister, deleteToolRegister, getToolsRegister } from "../toolsRegisterSlice"

export function useToolsRegisterTable() {
  const state = useAppSelector((state) => state.toolsRegister)
  const dispatch = useAppDispatch()
  const [queryParams, setQueryParams] = useState(state.queryParams)
  const updateQueryParamsDebounced = useDebouncedCallback(() => {
    dispatch(getToolsRegister(queryParams))
  }, 500)
  useEffect(() => { dispatch(getToolsRegister(queryParams)) }, [])

  const updateQueryParams = (newParams: ToolRegisterParams) => {
    setQueryParams({...queryParams, ...newParams})
    updateQueryParamsDebounced()
  }
  const closeRegister = (register: ToolRegisterWithId) => {
    dispatch(closeToolRegister(register))
  }

  const deleteRegister = (registerId: number) => {
    dispatch(deleteToolRegister(registerId))
  }

  const [showFilters, setShowFilters] = useState(false)
  const toggleShowFilters = () => setShowFilters(!showFilters)

  return {
    state,
    closeRegister,
    deleteRegister,
    queryParams,
    updateQueryParams,
    showFilters,
    toggleShowFilters
  }
}