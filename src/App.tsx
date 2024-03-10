import "./App.css"
import { ToolsRegister } from "./features/register/tools/ToolsRegister"
import { Login } from './features/login/Login';

function App() {
  
  const handleLogout = () => {
    localStorage.clear()
    window.location.reload()
  }
  return (
    <div className="bg-slate-800 min-h-screen text-slate-50">
      <header className="min-h-16 grid place-content-center bg-slate-900">
        <button onClick={handleLogout}>Logout</button>
      </header>
      <main>
        {localStorage.getItem('signatureToken') ? <ToolsRegister /> : <Login />}
      </main>        
    </div>
  )
}

export default App
