import { ApiLogin } from "../../services/login/LoginService"

export function Login() {
  
  const handleLogin = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const headers = await ApiLogin({ email, password })
    console.log(headers.get('x-header-payload-token'))
    console.log(headers.get('x-signature-token'))
    localStorage.setItem('payloadToken', headers.get('x-header-payload-token'))
    localStorage.setItem('signatureToken', headers.get('x-signature-token'))
    window.location.reload()
  }

  return (
    <form onSubmit={handleLogin} className="flex flex-col justify-center gap-2 w-1/4 mx-auto my-10">
      <p className="self-center text-lg font-bold">Inicia sesión</p>
      <label htmlFor="emailInput">Email</label>
      <input className="text-slate-900 p-2 rounded-md" id="emailInput" type="text" placeholder="noeula@adminv" name='email'/>
      <label htmlFor="pwdInput">Contraseña</label>
      <input className="text-slate-900 p-2 rounded-md" id="pwdInput" type="password" placeholder="admin" name='password'/>
      <button type="submit" className="bg-slate-500 rounded-md p-2">Iniciar sesión</button>
    </form>
  )
}