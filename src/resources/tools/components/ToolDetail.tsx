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
    <section className="min-h-[86vh] py-10 px-5">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{state.toolDetail?.name}</h1>
        <h2 className="font-barcode text-3xl">{state.toolDetail?.barcode}</h2>
        <img src={state.toolDetail?.urlImages[0]} alt={`Herramienta ${state.toolDetail?.name}`}/>        
      </header>

    </section>
  )
}