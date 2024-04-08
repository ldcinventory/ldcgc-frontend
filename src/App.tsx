import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css"
import { Login } from './login/Login';
import { ConsumablesRegister } from "./register/consumables/components/ConsumableRegister";
import { ToolsRegister } from "./register/tools/components/ToolsRegister";
import { Home } from "./home/Home";
import { HeaderMenu } from "./common/HeaderMenu";

const ProtectedRoute = ({ children }: {children: JSX.Element}) => {
  const isAuthenticated = localStorage.getItem('payloadToken') !== null

  if (isAuthenticated)
    return <>
      <HeaderMenu />
      <main className="bg-primary-4 dark:bg-primary-8">
        {children}
      </main>
    </>

  return <Navigate to={'/login'}/>
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={ <ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path='/register'>
        <Route path='consumables' element={<ProtectedRoute><ConsumablesRegister /></ProtectedRoute>} />
        <Route path='tools' element={<ProtectedRoute><ToolsRegister /></ProtectedRoute>} />
      </Route>      
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

function App() {
  return (
    <div>
      <AppRoutes />
      <footer className="h-[7.6vh] bg-primary-2 dark:bg-primary-9">
        <p className="text-xs w-full p-2 flex h-full items-end justify-center">
          LDC Inventory App 2024 | Todos los derechos reservados
        </p>
      </footer>
    </div>
  )
}

export default App
