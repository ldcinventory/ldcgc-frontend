import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/store"
import { getResourceTypes } from "../resourceTypeSlice"

export const useResourceTypes = () => {
  const  resourceTypesState = useAppSelector(state => state.resourceTypes)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (resourceTypesState.resourceTypes.length <= 0)
      dispatch(getResourceTypes())
  }, [resourceTypesState, dispatch])

  return {resourceTypes: resourceTypesState.resourceTypes}
}