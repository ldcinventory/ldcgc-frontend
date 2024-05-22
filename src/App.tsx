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
import { ResourcesHeader } from "./resources/common/ResourcesHeader";
import { Consumables } from "./resources/consumables/components/Consumables";
import { ToolDetail } from "./resources/tools/components/ToolDetail";
import { AddTool } from "./resources/tools/components/AddTool";
import { AddConsumable } from "./resources/consumables/components/AddConsumable";
import { ConsumableDetail } from "./resources/consumables/components/ConsumableDetail";
import { Eula } from "./eula/Eula";

const ProtectedRoute = ({ children }: {children: JSX.Element}) => {
  const isAuthenticated = sessionStorage.getItem('payloadToken') !== null && sessionStorage.getItem('signatureToken') !== null

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
        <Route path='/resources' element={<ProtectedRoute><ResourcesHeader /></ProtectedRoute>}>
          <Route path='consumables' element={<ProtectedRoute><Consumables /></ProtectedRoute>} />
          <Route path='tools' element={<ProtectedRoute><Tools /></ProtectedRoute>} />
        </Route>
        <Route path="/resources/tools/:barcode" element={<ProtectedRoute><ToolDetail /></ProtectedRoute>} />
        <Route path="/resources/tools/new" element={<ProtectedRoute><AddTool /></ProtectedRoute>} />
        <Route path='/register' element={<ProtectedRoute><RegisterHeader /></ProtectedRoute>}>
          <Route path='consumables' element={<ProtectedRoute><ConsumablesRegister /></ProtectedRoute>} />
          <Route path='tools' element={<ProtectedRoute><ToolsRegister /></ProtectedRoute>} />
        </Route>      
        <Route path="/resources/consumables/:barcode" element={<ProtectedRoute><ConsumableDetail /></ProtectedRoute>} />
        <Route path="/resources/consumables/new" element={<ProtectedRoute><AddConsumable /></ProtectedRoute>} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/eula" element={<Eula />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

function App() {
  return (
    <div>
      <AppRoutes />
      <footer className="h-[7.6vh] bg-primary-2 dark:bg-primary-9 wfull">
        <p className="text-xs w-full p-2 flex h-full items-center justify-center">
          LDC Inventory App 2024 | Todos los derechos reservados
        </p>
      </footer>
    </div>
  )
}

export default App
