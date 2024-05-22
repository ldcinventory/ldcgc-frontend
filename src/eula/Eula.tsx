import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../app/store"
import { getEula, updateEula } from "./eulaSlice"
import { AppButtonSubmitSuccess, AppButtonSuccess, AppButtonTransparent } from "../common/components/AppButton"
import { useNavigate } from "react-router-dom"

export const Eula = () => {
  const state = useAppSelector(state => state.eula)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getEula())
  }, [])

  const handleRejectEula = () => {
    localStorage.clear()
    sessionStorage.clear()
    navigate('/login')
  }

  const handleAcceptEula = () => {
    dispatch(updateEula({ action: 'ACCEPT' }))
  }

  if (state.eula === null)
    return <h1>Error: Eula no encontrado. Contacte con el administrador. </h1>

  return (
    <>
      <iframe title="eula" src={state.eula.data.url} className="w-full max-w-[800px] h-screen m-auto" />
      <section className="my-4 flex justify-center items-center gap-2">
        <AppButtonSuccess onClick={handleAcceptEula} className="px-2">Aceptar</AppButtonSuccess>
        <AppButtonTransparent onClick={handleRejectEula}>Rechazar</AppButtonTransparent>
      </section>
    </>
  )
}