import { useState } from "react"
import { Plus } from "../../../Icons.js"
import { ToolsRegisterTable } from "./components/ToolsRegisterTable.js"
import { AddRegisterModal } from "./components/AddRegisterModal.js"

export function ToolsRegister() {
  const [addRegisterModal, setAddRegisterModal] = useState(false)

  const openRegisterModal = () => {
    setAddRegisterModal(true)
  }

  const closeRegisterModal = () => {
    console.log('hola')
    setAddRegisterModal(false)
  }
  return (
    <>
      <h1 className="container mx-auto mt-10 text-center text-lg font-bold ">Registro de herramientas</h1>
      <div className="ml-4 lg:ml-16 transition-all duration-500 overflow-clip">
        <button onClick={openRegisterModal} className="p-4 bg-slate-700 rounded-xl flex gap-4">
          <Plus />
          Añadir registro
        </button>
      </div>
      
      <ToolsRegisterTable />
      <section className={`${addRegisterModal ? '' : 'hidden' }`}>
        <AddRegisterModal handleCloseModal={closeRegisterModal}/>
      </section>
    </>
  )
}