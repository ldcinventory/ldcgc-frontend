import { UsersList } from "./features/users/Users"
import { Routes, Route } from "react-router-dom"
import "./App.css"
import Login from "./features/login/Login"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/users" element={<UsersList />} />
        </Routes>
      </header>
    </div>
  )
}

export default App
