import "./App.css"
import { Login } from './features/login/Login';
import { ConsumablesRegister } from "./features/register/consumables/ConsumableRegister";
import { ToolsRegister } from "./features/register/tools/ToolsRegister";

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
        {localStorage.getItem('signatureToken') ? <ConsumablesRegister /> : <Login />}
      </main>
      <footer className="bottom-0">
        <p className="text-xs w-full p-2 text-center">
          LDC Inventory App 2024 | Todos los derechos reservados
        </p>
      </footer>
    </div>
  )
}

export default App
