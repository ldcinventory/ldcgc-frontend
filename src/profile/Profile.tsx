import { Toaster, toast } from "sonner"
import { useAppDispatch, useAppSelector } from "../app/store"
import { AppButton, AppButtonSubmit } from "../common/components/AppButton"
import { VolunteerWithId } from "../volunteers/tVolunteers"
import { FormEvent, useState } from "react"
import { AppLabeledPasswordInput, AppLabeledTextInput, AppTextInput } from "../common/components/AppInput"
import { updateMyUser } from "../users/usersSlice"

const VolunteerDetails = ({ volunteer }: {volunteer: VolunteerWithId}) =>
  <>
    <h1>{`${volunteer.name} ${volunteer.lastName}`}</h1>
    <h2 className="font-barcode text-3xl">{volunteer.builderAssistantId}</h2>
  </>

export const Profile = () => {
  const state = useAppSelector(state => state.users)
  const dispatch = useAppDispatch()
  const [changeCredentials, setChangeCredentials] = useState(false)
  const [linkVolunteer, setLinkVolunteer] = useState(false)
  
  if (!state.me)
    return <h1 className="h-screen flex items-center my-10">Usuario no encontrado. Cierre sesión e inténtelo de nuevo</h1>

  const volunteer = state.me.volunteer
  const toggleChangeCredentials = () => setChangeCredentials(!changeCredentials)
  const toggleLinkVolunteer = () => setLinkVolunteer(!linkVolunteer)
  const handleChangeCredentials = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const password = formData.get('new-password') as string
    const passwordConfirm = formData.get('new-password-confirm') as string

    if (password !== passwordConfirm) {
      toast.error('Las contraseñas no coinciden.')
      return
    }
    
    if (!state.me) {
      toast.error('Usuario no encontrado. Cierra sesión e inténtalo de nuevo.')
      return
    }

    const newUser = { ...state.me }
    newUser.email = formData.get('new-email') as string
    newUser.password = password
    dispatch(updateMyUser(newUser))
    setChangeCredentials(false)
  }

  return (
    <>
      <Toaster />
      <section className="my-10 flex flex-col gap-4 min-h-[77vh]">
        {volunteer && <VolunteerDetails volunteer={volunteer}/>}
        <p>{state.me.email}</p>
        <p>{state.me.responsibility?.name}</p>
        <p>{state.me.group?.name}</p>
        {
          changeCredentials ? 
          <form className="flex flex-col gap-2 max-w-xs" onSubmit={handleChangeCredentials}>
              <h1 className="font-bold my-4">Elige las nuevas credenciales</h1>
              <AppLabeledTextInput id="new-email" name="new-email" label="Nuevo email" />
              <AppLabeledPasswordInput id="new-password" name="new-password" label="Nueva contraseña" />
              <AppLabeledPasswordInput id="new-password-confirm" name="new-password-confirm" label="Confirmar nueva contraseña" />
              <AppButtonSubmit>Guardar</AppButtonSubmit>
            </form> :
            <AppButton onClick={toggleChangeCredentials} className="max-w-[200px] p-2"> Cambiar credenciales </AppButton> 
          }
        {!volunteer && <AppButton onClick={toggleLinkVolunteer} className="max-w-[200px] p-2">Vincular voluntario</AppButton>}
        {
          linkVolunteer &&
          <section className="max-w-[200px]">
            <AppLabeledTextInput id="volunteer-search-name" label="Nombre" />
          </section>
        }
      </section>
    </>
  )
}