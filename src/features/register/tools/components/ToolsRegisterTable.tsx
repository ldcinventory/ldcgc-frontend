import { ArrowDown, ArrowTurnDown, ArrowUp, Calendar, Delete, List, Tool, User } from "../../../../Icons.js"
import { TableHeaderCell } from "./TableHeaderCell.js"
import { useToolRegisterTable } from "../../../../hooks/register/tools/UseToolRegisterTable.js"
import { deleteToolRegister, updateToolRegister } from "../../../../services/register/tools/ToolRegisterService.js"
import { useState } from "react"

export function ToolsRegisterTable() {
  const { toolRegister, refreshRegister, queryParameters, setQueryParameters } =
    useToolRegisterTable()
  
  const [fromDesc, setFromDesc] = useState(true)
  const [toDesc, setToDesc] = useState(true)

  const handleFilterVolunteer = (event) => {
    const volunteer = event.target.value
    setQueryParameters({ ...queryParameters, volunteer })
  }

  const handleFilterTool = (event) => {
    const tool = event.target.value
    setQueryParameters({ ...queryParameters, tool })
  }

  const handleChangeStatus = (event) => {
    const status = event.target.value === "any" ? "" : event.target.value
    setQueryParameters({ ...queryParameters, status })
  }

  const handleCloseRegister = async (register) => {
    register.registerTo = new Date().toISOString()
    await updateToolRegister(register)
    refreshRegister()
  }

  const handleDeleteRegister = async (register) => {
    await deleteToolRegister(register.id)
    refreshRegister()
  }

  const handleOrderByRegisterFrom = () => {    
    setFromDesc(!fromDesc)
    setQueryParameters({ ...queryParameters, sortString: "registerFrom", descOrder: fromDesc })
  }

  const handleOrderByRegisterTo = () => {
    setToDesc(!toDesc)
    setQueryParameters({ ...queryParameters, sortString: "registerTo", descOrder: toDesc })
  }

  return (
    <div className="px-4 lg:px-16 transition-all duration-500">
      <div className="mt-10 container mx-auto min-w-full sm:overflow-hidden overflow-scroll bg-slate-600 bg-opacity-20 p-4 rounded-xl">      
        <table className="min-w-full divide-y divide-slate-300 text-left">
          <thead>
            <tr>
              <TableHeaderCell thStyle="flex hidden sm:table-cell">
                <User /> Vouluntario
              </TableHeaderCell>
              <TableHeaderCell thStyle="flex sm:hidden">
                <List /> Datos
              </TableHeaderCell>
              <TableHeaderCell thStyle="hidden sm:table-cell">
                <Tool />
                Herramienta
              </TableHeaderCell>
              <TableHeaderCell thStyle="hidden md:table-cell">
                <Calendar />
                <span className="hidden lg:inline-block">Fecha de entrega</span>
                <span className="lg:hidden">Período de registro</span>
              </TableHeaderCell>
              <TableHeaderCell thStyle="hidden lg:table-cell">
                <Calendar />
                Fecha de devolución
              </TableHeaderCell>
              <TableHeaderCell thStyle="hidden sm:table-cell">
                <label htmlFor="status_selector">Estado</label>
              </TableHeaderCell>
              <th>
                <div className="flex flex-col sm:hidden items-end w-full">
                  <input
                    className="rounded-sm mb-2 p-1 font-normal truncate w-full"
                    onChange={handleFilterVolunteer}
                    type="text"
                    placeholder="Voluntario (nombre o BA)..."
                  ></input>
                  <input
                    className="rounded-sm mb-2 p-1 font-normal truncate sm:hidden w-full"
                    onChange={handleFilterTool}
                    type="text"
                    placeholder="Herramienta (nombre o código)..."
                  ></input>
                  <select
                    name="status"
                    id="status_selector"
                    className="rounded-sm text-sm p-1 text-slate-500 font-normal sm:hidden w-full"
                    onChange={handleChangeStatus}
                    value={queryParameters.status}>
                    <option value="any">Cualquiera</option>
                    <option value="opened">Abierto</option>
                    <option value="closed">Cerrado</option>
                  </select>
                </div>
              </th>
            </tr>
            <tr className="text-sm text-slate-950">
              <TableHeaderCell>
                <input
                  className="rounded-sm mb-2 p-1 font-normal truncate hidden sm:inline-block"
                  onChange={handleFilterVolunteer}
                  type="text"
                  placeholder="Nombre o BA ID"
                ></input>
                
              </TableHeaderCell>
              <TableHeaderCell thStyle="hidden sm:table-cell">
                <input
                  className="rounded-sm mb-2 p-1 font-normal truncate"
                  onChange={handleFilterTool}
                  type="text"
                  placeholder="Nombre o código de barras"
                ></input>
              </TableHeaderCell>
              <TableHeaderCell thStyle="hidden md:table-cell">
                <button onClick={handleOrderByRegisterFrom} className="text-slate-200">
                  {fromDesc ? <ArrowUp /> : <ArrowDown/> }
                </button>
              </TableHeaderCell>
              <TableHeaderCell thStyle="hidden lg:table-cell">
                <button onClick={handleOrderByRegisterTo} className="text-slate-200">
                  {toDesc ? <ArrowUp /> : <ArrowDown />}
                </button>
              </TableHeaderCell>
              <TableHeaderCell thStyle="hidden sm:table-cell">
                <select
                  name="status"
                  id="status_selector"
                  className="rounded-sm text-sm p-1 text-slate-500 font-normal"
                  onChange={handleChangeStatus}
                  value={queryParameters.status}>
                  <option value="any">Cualquiera</option>
                  <option value="opened">Abierto</option>
                  <option value="closed">Cerrado</option>
                </select>
              </TableHeaderCell>
              <th></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-500">
            {toolRegister.map((register) => {
              const status = register.registerTo ? 'Cerrado' : 'Abierto'
              const registerFrom = new Date(register.registerFrom).toLocaleDateString("es-ES")
              const registerTo = register.registerTo && new Date(register.registerTo).toLocaleDateString("es-ES")
              return (
                <tr key={register.id}>
                  <td>
                    <div className="flex flex-col">
                      {`${register.volunteerName} ${register.volunteerLastName}`}

                      <span className="sm:hidden font-light text-sm opacity-80">
                        {register.toolName}
                      </span>

                      <span className="md:hidden font-light text-sm opacity-80">
                        {registerFrom}{registerTo && ` - ${registerTo}`}
                      </span>

                      <span className={`sm:hidden text-sm font-semibold
                        ${register.registerTo ? 'text-red-600' : 'text-green-600'}`}>
                        {status}
                      </span>
                    </div>
                  </td>
                  <td className="truncate hidden sm:table-cell">{register.toolName}</td>
                  <td className="hidden md:table-cell">
                    <span className="hidden lg:inline-block">{registerFrom}</span>
                    <span className="lg:hidden">{registerFrom}{registerTo && ` - ${registerTo}`}</span>
                  </td>
                  <td className="hidden lg:table-cell">
                    {registerTo}
                  </td>
                  <td className="hidden sm:table-cell">{status}</td>
                  <td className="flex justify-end gap-2 my-2">
                    <button
                      onClick={() => handleCloseRegister(register)}
                      className={`rounded bg-green-700 p-2 ${register.registerTo ? 'hidden' : ''}`}
                    >
                      <ArrowTurnDown />
                    </button>
                    <button
                      onClick={() => handleDeleteRegister(register)}
                      className="rounded bg-red-700 p-2"
                    >
                      <Delete />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
