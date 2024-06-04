import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/store"
import { useDebouncedCallback } from "use-debounce"
import { ConsumableWithId, ConsumableParams } from "../tConsumables"
import { getConsumables, selectConsumableToDelete } from "../consumablesSlice"

export const useConsumablesTable = () => {
  const state = useAppSelector(state => state.consumables)
  const dispatch = useAppDispatch()
  const [showFilters, setShowFilters] = useState<boolean>(false)
  const [queryParams, setQueryParams] = useState<ConsumableParams>(state.queryParams)
  const updateQueryParamsDebounced = useDebouncedCallback((newParams) => {
    dispatch(getConsumables(newParams))
  }, 500)

  useEffect(() => { dispatch(getConsumables(state.queryParams)) }, [])

  const handleUpdateQueryParams = (newParams: ConsumableParams) => {
    setQueryParams({ ...state.queryParams, ...newParams })
    updateQueryParamsDebounced(newParams)
  }

  const toggleShowFilters = () => setShowFilters(!showFilters)

  const handleOpenDeleteConsumableModal = (consumable: ConsumableWithId) => dispatch(selectConsumableToDelete(consumable))
  
  return {
    handleUpdateQueryParams, toggleShowFilters, handleOpenDeleteConsumableModal, queryParams, showFilters, state
  }
}