import { useNavigate } from "react-router-dom"
import { ApiLogin } from "./LoginService"
import { AppButtonSubmit } from "../common/components/AppButton"
import { FormEvent, useState } from "react"

export function Login() {
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError("")
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    await ApiLogin({ email, password })
      .then(headers => {
        const payloadToken = headers.get('x-header-payload-token')

        if (payloadToken !== null)
          localStorage.setItem('payloadToken', payloadToken)

        const signatureToken = headers.get('x-signature-token')
        if (signatureToken !== null)
          localStorage.setItem('signatureToken', signatureToken)

        navigate('/')
      })
      .catch((error: string) => setError('Usuario o contraseña incorrectos'))
  }

  return (
    <section className="dark:bg-primary-8 py-10 min-h-[92.5vh]">
      <span>{error}</span>
      <form onSubmit={(e) => { handleLogin(e) }} className="flex flex-col justify-center gap-2 w-4/5 md:w-1/2 xl:w-1/4 mx-auto my-10">
        <p className="self-center text-lg font-bold">Inicia sesión</p>
        <label htmlFor="emailInput">Email</label>
        <input className="text-slate-900 p-2 rounded-md" id="emailInput" type="text" placeholder="noeula@adminv" name='email' />
        <label htmlFor="pwdInput">Contraseña</label>
        <input className="text-slate-900 p-2 rounded-md" id="pwdInput" type="password" placeholder="admin" name='password' />
        <AppButtonSubmit className="rounded-md p-2">Iniciar sesión</AppButtonSubmit>
      </form>
    </section>
  )
}