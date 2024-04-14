import { useState } from "react"
import { Plus } from "../../../Icons.js"
import { ToolsRegisterTable } from "./ToolsRegisterTable.js"
import { useToolRegisterTable } from "../hooks/UseToolRegisterTable.js"
import { AddToolRegisterModal } from "./AddToolRegisterModal.js"

export function ToolsRegister() {
  const [addRegisterModal, setAddRegisterModal] = useState(false)
  const {
    toolRegister,
    queryParameters,
    handleQueryParams,
    closeRegister,
    deleteRegister,
    toggleOrderByRegisterFrom,
    toggleOrderByRegisterTo,
    fromDesc,
    refreshRegister,
    toDesc,
    showFilters,
    toggleShowFilters,
    pageIndex,
    changePageIndex,
    maxPage
  } = useToolRegisterTable()

  const openRegisterModal = () => {
    setAddRegisterModal(true)
  }

  const closeRegisterModal = () => {
    setAddRegisterModal(false)
  }
  return (
    <>
      <div className="mx-4 xl:ml-16 transition-all duration-300 overflow-clip my-5">
        <button onClick={openRegisterModal}
          className="p-4 bg-slate-700 rounded-xl flex gap-4 hover:bg-slate-500 transition-colors">
          <Plus />
          Añadir registro
        </button>
      </div>

      <ToolsRegisterTable toolRegister={toolRegister} queryParameters={queryParameters} handleQueryParams={handleQueryParams}
        closeRegister={closeRegister} deleteRegister={deleteRegister} toggleOrderByRegisterFrom={toggleOrderByRegisterFrom}
        toggleOrderByRegisterTo={toggleOrderByRegisterTo} fromDesc={fromDesc} toDesc={toDesc} showFilters={showFilters}
        toggleShowFilters={toggleShowFilters} pageIndex={pageIndex} changePageIndex={changePageIndex} maxPage={maxPage} />
      <section className={`${addRegisterModal ? '' : 'hidden'}`}>
        <AddToolRegisterModal closeRegisterModal={closeRegisterModal} refreshRegister={refreshRegister} />
      </section>
    </>
  )
}