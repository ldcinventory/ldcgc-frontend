import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/store"
import { closeConsumableRegister, deleteConsumableRegister, getConsumablesRegister } from "../../../features/register/consumables/consumablesRegisterSlice"
import { useDebounce } from "use-debounce"
import { ConsumableRegisterWithId, ConsumablesRegisterParams } from "../../../types/consumableRegisterType"

export function useConsumablesTable() {
  const state = useAppSelector((state) => state.consumablesRegister)
  const dispatch = useAppDispatch()
  const [queryParams, setQueryParams] = useState<ConsumablesRegisterParams>(state.queryParams)
  const [debouncedQueryParams] = useDebounce(queryParams, 500)

  const closeRegister = (register: ConsumableRegisterWithId) => {
    dispatch(closeConsumableRegister(register))
  }
  
  const deleteRegister = (registerId: number) => {
    dispatch(deleteConsumableRegister(registerId))
  }
  
  useEffect(
    () => { dispatch(getConsumablesRegister(debouncedQueryParams)) }
    , [debouncedQueryParams]
  )

  const updateQueryParams = (newParams: ConsumablesRegisterParams) => setQueryParams(newParams)

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