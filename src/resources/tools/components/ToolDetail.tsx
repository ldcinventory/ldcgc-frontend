import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { selectToolDetail } from "../toolsSlice";

export function ToolDetail() {
  const { barcode } = useParams()
  const state = useAppSelector(state => state.tools)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (barcode === undefined) {
      navigate("/resources/tools")
      return
    }
    if (state.toolDetail?.barcode === barcode)
      return

    dispatch(selectToolDetail(barcode))
  }, [])

  return (
    <>
      <h1>{state.toolDetail?.name}</h1>
    </>
  )
}