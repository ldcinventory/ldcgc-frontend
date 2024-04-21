import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css"
import { Login } from './login/Login';
import { ToolsRegister } from "./register/tools/components/ToolsRegister";
import { Home } from "./home/Home";
import { RegisterHeader } from "./register/common/RegisterHeader";
import { NotFound } from "./app/components/NotFound";
import { Tools } from "./resources/tools/components/Tools";
import { Volunteers } from "./volunteers/components/Volunteers";
import { Menu } from "./menu/Menu";
import { ConsumablesRegister } from "./register/consumables/components/ConsumablesRegister";

const ProtectedRoute = ({ children }: {children: JSX.Element}) => {
  const isAuthenticated = localStorage.getItem('payloadToken') !== null

  if (isAuthenticated)
    return children

  return <Navigate to={'/login'}/>
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<ProtectedRoute><Menu /></ProtectedRoute>}>
        <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/volunteers' element={<ProtectedRoute><Volunteers /></ProtectedRoute>} />
        <Route path='/tools' element={<ProtectedRoute><Tools /></ProtectedRoute>} />
        <Route path='/register' element={<ProtectedRoute><RegisterHeader /></ProtectedRoute>}>
          <Route path='consumables' element={<ProtectedRoute><ConsumablesRegister /></ProtectedRoute>} />
          <Route path='tools' element={<ProtectedRoute><ToolsRegister /></ProtectedRoute>} />
        </Route>      
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

function App() {
  return (
    <div>
      <AppRoutes />
      <footer className="h-[7.6vh] bg-primary-2 dark:bg-primary-9">
        <p className="text-xs w-full p-2 flex h-full items-center justify-center">
          LDC Inventory App 2024 | Todos los derechos reservados
        </p>
      </footer>
    </div>
  )
}

export default App
