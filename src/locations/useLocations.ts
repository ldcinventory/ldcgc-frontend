import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../app/store"
import { getLocations } from "./locationsSlice"

export const useLocations = () => {
  const locationsState = useAppSelector(state => state.locations)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (locationsState.locations.length <= 0)
      dispatch(getLocations())

  }, [locationsState, dispatch])

  return { locations: locationsState.locations }
}