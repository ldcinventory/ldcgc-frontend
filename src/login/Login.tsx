import { useNavigate } from "react-router-dom"
import { ApiLogin } from "./LoginService"
import { AppButtonSubmit } from "../common/components/AppButton"
import { FormEvent, useState } from "react"
import { AppCheckboxInput, AppLabeledCheckboxInput, AppLabeledPasswordInput, AppLabeledTextInput } from "../common/components/AppInput"
import { Toaster, toast } from "sonner"

export function Login() {
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError("")
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const rememberMe = (formData.get("rememberMe") as string) === ''
    
    await ApiLogin({ email, password })
      .then(headers => {
        if(rememberMe) {
          const payloadToken = headers.get('x-header-payload-token')

          if (payloadToken !== null)
            localStorage.setItem('payloadToken', payloadToken)

          const signatureToken = headers.get('x-signature-token')
          if (signatureToken !== null)
            localStorage.setItem('signatureToken', signatureToken)
        } else {
          localStorage.clear()
          localStorage.setItem('payloadToken', '')
        }
        navigate('/')
      })
      .catch((error) => toast.error(`Error al hacer login: ${error.message}`))
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
        <span className="text-error-4 mx-auto">{error}</span>
      </section>
    </>
  )
}