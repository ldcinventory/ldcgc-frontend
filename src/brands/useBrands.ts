import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../app/store"
import { getBrands } from "./brandSlice"

export const useBrands = () => {
  const brandsState = useAppSelector(state => state.brands)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (brandsState.brands.length <= 0)
      dispatch(getBrands())
    
  }, [brandsState, dispatch])

  return { brands: brandsState.brands }
}