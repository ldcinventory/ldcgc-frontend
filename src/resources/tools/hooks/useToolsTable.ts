import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/store"
import { useDebouncedCallback } from "use-debounce"
import { ToolWithId, ToolsParams } from "../tTools"
import { getTools, selectToolToDelete } from "../toolsSlice"

export const useToolsTable = () => {
  const state = useAppSelector(state => state.tools)
  const dispatch = useAppDispatch()
  const [showFilters, setShowFilters] = useState<boolean>(false)
  const [queryParams, setQueryParams] = useState<ToolsParams>(state.queryParams)
  const updateQueryParamsDebounced = useDebouncedCallback((newParams) => {
    dispatch(getTools(newParams))
  }, 500)

  useEffect(() => { dispatch(getTools(state.queryParams)) }, [])

  const handleUpdateQueryParams = (newParams: ToolsParams) => {
    setQueryParams({ ...state.queryParams, ...newParams })
    updateQueryParamsDebounced(newParams)
  }

  const toggleShowFilters = () => setShowFilters(!showFilters)

  const handleOpenDeleteToolModal = (tool: ToolWithId) => dispatch(selectToolToDelete(tool))

  return {
    handleUpdateQueryParams, toggleShowFilters, handleOpenDeleteToolModal, queryParams, showFilters, state
  }
}