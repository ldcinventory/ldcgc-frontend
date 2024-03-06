import { UsersList } from "./features/users/Users"
import "./App.css"
import { ToolsRegister } from "./features/register/tools/ToolsRegister"

function App() {
  return (
    <div className="bg-slate-800 min-h-screen text-slate-50">
      <header className="min-h-16 grid place-content-center bg-slate-900">
        <h1>Header</h1>
      </header>
      <main>
        <ToolsRegister />
      </main>        
    </div>
  )
}

export default App
