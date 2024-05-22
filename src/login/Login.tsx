import { useNavigate } from "react-router-dom"
import { AppButtonSubmit } from "../common/components/AppButton"
import { FormEvent, useEffect } from "react"
import { AppCheckboxInput, AppLabeledPasswordInput, AppLabeledTextInput } from "../common/components/AppInput"
import { Toaster } from "sonner"
import { useAppDispatch } from "../app/store"
import { getMyUser, login } from "../users/usersSlice"

export function Login() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const payloadToken = localStorage.getItem('payloadToken')
    const signatureToken = localStorage.getItem('signatureToken')

    if (payloadToken !== null && signatureToken !== null) {
      dispatch(getMyUser())
      navigate('/')
    }
  },[]
  )

  const handleLogin = async (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const loginForm = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      rememberMe: (formData.get("rememberMe") as string) === ''
    }
    console.log(loginForm)
    dispatch(login(loginForm))
  }

  return (
    <>
      <Toaster />
      <section className="dark:bg-primary-8 py-10 min-h-[92.5vh]">
        <form onSubmit={(e) => { handleLogin(e) }} className="flex flex-col justify-center gap-2 w-4/5 md:w-1/2 xl:w-1/4 mx-auto my-10">
          <h1 className="self-center text-lg font-bold">Inicia sesión</h1>
          <AppLabeledTextInput label="Email" id="emailInput" placeholder="user@example.com" name="email" />
          <AppLabeledPasswordInput label="Contraseña" id="pwdInput" name="password" />
          <label className="flex gap-4 items-center">
            <small >Recordarme</small>
            <AppCheckboxInput label="Recordarme" name="rememberMe" defaultChecked={true} />
          </label>
          <AppButtonSubmit className="rounded-md p-2">Iniciar sesión</AppButtonSubmit>
        </form>
      </section>
    </>
  )
}