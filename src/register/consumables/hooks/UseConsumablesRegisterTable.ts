import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/store"
import { closeConsumableRegister, deleteConsumableRegister, getConsumablesRegister } from "../consumablesRegisterSlice"
import { useDebouncedCallback } from "use-debounce"
import { ConsumableRegisterWithId, ConsumablesRegisterParams } from "../tConsumableRegisters"

export function useConsumablesRegisterTable() {
  const state = useAppSelector((state) => state.consumablesRegister)
  const dispatch = useAppDispatch()
  const [queryParams, setQueryParams] = useState<ConsumablesRegisterParams>(state.queryParams)
  const updateQueryParamsDebounced = useDebouncedCallback((queryParams) => {
    dispatch(getConsumablesRegister(queryParams))
  }, 500)

  useEffect(() => { dispatch(getConsumablesRegister(queryParams)) }, [])

  const closeRegister = (register: ConsumableRegisterWithId) => {
    dispatch(closeConsumableRegister(register))
  }

  const deleteRegister = (registerId: number) => {
    dispatch(deleteConsumableRegister(registerId))
  }

  const updateQueryParams = (newParams: ConsumablesRegisterParams) => {
    setQueryParams({...queryParams, ...newParams})
    updateQueryParamsDebounced(newParams)
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