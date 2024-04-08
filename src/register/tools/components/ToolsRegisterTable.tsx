import { useDebouncedCallback } from 'use-debounce';
import { ChangeEvent } from "react"
import {
  ArrowLeft,
  ArrowRight,
  ArrowTurnDown,
  ArrowUpDown,
  Calendar,
  Delete,
  DoubleArrowLeft,
  DoubleArrowRight,
  List,
  MenuSmall,
  Tool,
  User,
} from "../../../Icons.js"
import { ToolRegisterWithId } from "../tToolRegisters.js"

export function ToolsRegisterTable({
  toolRegister,
  handleQueryParams,
  closeRegister,
  deleteRegister,
  toggleOrderByRegisterFrom,
  toggleOrderByRegisterTo,
  showFilters,
  toggleShowFilters,
  pageIndex,
  changePageIndex,
  maxPage
}: {
  toolRegister: ToolRegisterWithId[],
  handleQueryParams: Function,
  closeRegister: Function,
  deleteRegister: Function,
  toggleOrderByRegisterFrom: () => void,
  toggleOrderByRegisterTo: () => void,
  showFilters: boolean,
  toggleShowFilters: () => void,
  pageIndex: number,
  changePageIndex: (index: number) => void,
  maxPage: number
}) {

  const debouncedVolunteer = useDebouncedCallback(
    (e) => handleQueryParams({ volunteer: e.target.value }),
    500
  )
  const debouncedTool = useDebouncedCallback(
    (e) => handleQueryParams({ tool: e.target.value }),
    500
  )

  const handleChangeStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    handleQueryParams({ status: event.target.value })
  }

  return (
    <div className="bg-slate-600 mx-4 m-auto my-5 p-2 rounded-md xl:mx-16 transition-all duration-300">
      { /* Tabla móvil */}
      <table className="w-full md:hidden">
        <thead className="border-b">
          <tr>
            <th className="w-2/3 p-2">
              <div className="flex gap-4">
                <List />
                Datos
              </div>
            </th>
            <th className="w-1/3 p-2">
              <button className="flex justify-end w-full"
                onClick={toggleShowFilters}>
                <span className={`${showFilters && 'bg-slate-50 bg-opacity-30'} rounded-lg transition-all duration-300`}>
                  <MenuSmall />
                </span>
              </button>
            </th>
          </tr>
          <tr className={`${!showFilters && 'hidden'}`}>
            <th className="w-2/3 p-2">
              <div className="flex w-full gap-3">
                <input className="w-full p-1 rounded-sm text-slate-900 font-normal"
                  type="text" placeholder="Voluntario" onChange={debouncedVolunteer} />
                <input className="w-full p-1 rounded-sm text-slate-900 font-normal"
                  type="text" placeholder="Herramienta" onChange={debouncedTool} />
              </div>
            </th>
            <th className="w-1/2">
              <select className="h-8 text-slate-900 w-full rounded-sm font-normal"
                onChange={handleChangeStatus}>
                <option value="">Cualquiera</option>
                <option value="OPENED">Abierto</option>
                <option value="CLOSED">Cerrado</option>
              </select>
            </th>
          </tr>
        </thead>
        <tbody className="border-b">
          {toolRegister.map(register => {
            const { volunteerName, volunteerLastName, toolName, registerFrom, registerTo, id } = register
            const opened = registerTo === undefined
            const from = new Date(registerFrom).toLocaleDateString("es-ES")
            const to = !opened && new Date(registerTo).toLocaleDateString("es-ES")
            return (
              <tr key={id}>
                <td className="p-2 w-2/3">
                  <p className="font-bold">{`${volunteerName} ${volunteerLastName}`}</p>
                  <p className="text-sm">{toolName}</p>
                  <p className="text-sm opacity-90">{`${from}${opened ? '' : ` - ${to}`}`}</p>
                  <p className={opened ? 'text-green-500' : 'text-red-500'}> {opened ? 'Abierto' : 'Cerrado'}</p>
                </td>
                <td className="align-top p-2 w-1/3">
                  <div className="flex justify-end items-start gap-2 p-2">
                    <button className={`p-1 bg-green-700 rounded-md ${opened || 'hidden'}`}
                      onClick={() => closeRegister(register)}>
                      <ArrowTurnDown />
                    </button>
                    <button className="p-1 bg-red-700 rounded-md" onClick={() => deleteRegister(register)}>
                      <Delete />
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          <tr>
            <td className="w-2/3">
              <div className="w-full flex justify-between">
                <div className="flex flex-1 gap-2 pl-2">
                  <button onClick={() => changePageIndex(0)}>
                    <DoubleArrowLeft />
                  </button>
                  <button onClick={() => changePageIndex(pageIndex - 1)}>
                    <ArrowLeft />
                  </button>
                </div>
                <p className="flex-1 text-center">
                  Página {pageIndex + 1} de {maxPage + 1}
                </p>
              </div>
            </td>
            <td className="w-1/3 p-2">
              <div className="w-full flex justify-end">
                <button onClick={() => changePageIndex(pageIndex + 1)}>
                  <ArrowRight />
                </button>
                <button onClick={() => changePageIndex(maxPage)}>
                  <DoubleArrowRight />
                </button>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>

      {/* Tabla mediana */}
      <table className="w-full hidden md:[display:table] xl:hidden">
        <thead className="border-b">
          <tr>
            <th className="w-1/4 p-2">
              <div className="flex gap-2 ">
                <User />
                Voluntarios
              </div>
            </th>
            <th className="w-1/4 p-2">
              <div className="flex gap-2 ">
                <Tool />
                Herramientas
              </div>
            </th>
            <th className="w-1/4 p-2">
              <div className="flex gap-2 ">
                <List />
                Estado
              </div>
            </th>
            <th className="p-2">
              <div className="flex gap-2">
                <Calendar />
                Fechas
              </div>
            </th>
            <th className="p-2 w-1/12">
              <button className="flex justify-end w-full"
                onClick={toggleShowFilters}>
                <span className={`${showFilters && 'bg-slate-50 bg-opacity-30'} rounded-lg transition-all duration-300`}>
                  <MenuSmall />
                </span>
              </button>
            </th>
          </tr>
          <tr className={`${!showFilters && 'hidden'}`}>
            <th className="w-1/4 p-2">
              <input className="w-full p-1 rounded-sm text-slate-900 font-normal"
                type="text" placeholder="Voluntario" onChange={debouncedVolunteer} />
            </th>
            <th className="w-1/4 p-2">
              <input className="w-full p-1 rounded-sm text-slate-900 font-normal"
                type="text" placeholder="Herramienta" onChange={debouncedTool} />
            </th>
            <th className="w-1/4 p-2">
              <select className="h-8 text-slate-900 w-full rounded-sm font-normal p-1"
                onChange={handleChangeStatus}>
                <option value="">Cualquiera</option>
                <option value="OPENED">Abierto</option>
                <option value="CLOSED">Cerrado</option>
              </select>
            </th>
            <th className="w-1/4 p-2">
              <button className="flex" onClick={toggleOrderByRegisterFrom}>
                <ArrowUpDown />
              </button>
            </th>
          </tr>
        </thead>
        <tbody className="border-b align-top">
          {toolRegister.map(register => {
            const { volunteerName, volunteerLastName, toolName, registerFrom, registerTo, id } = register
            const opened = registerTo === undefined
            const from = new Date(registerFrom).toLocaleDateString("es-ES")
            const to = !opened && new Date(registerTo).toLocaleDateString("es-ES")
            return (
              <tr key={id}>
                <td className="p-2 w-1/4">
                  <p>{`${volunteerName} ${volunteerLastName}`}</p>
                </td>
                <td className="w-6 p-2">
                  <p>{toolName}</p>
                </td>
                <td className="w-1/4 p-2">
                  <p className={opened ? 'text-green-500' : 'text-red-500'}> {opened ? 'Abierto' : 'Cerrado'}</p>
                </td>
                <td className="w-1/4 p-2">
                  <p>{`${from}${opened ? '' : ` - ${to}`}`}</p>
                </td>
                <td className="px-2">
                  <div className="flex justify-end  gap-2 py-2">
                    <button className={`p-1 bg-green-700 rounded-md ${opened || 'hidden'}`}
                      onClick={() => closeRegister(register)}>
                      <ArrowTurnDown />
                    </button>
                    <button className="p-1 bg-red-700 rounded-md" onClick={() => deleteRegister(register)}>
                      <Delete />
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          <tr>
            <td className="w-1/4 p-2">
              <div className="w-full flex justify-between">
                <div className="flex flex-1 gap-2">
                  <button onClick={() => changePageIndex(0)}>
                    <DoubleArrowLeft />
                  </button>
                  <button onClick={() => changePageIndex(pageIndex - 1)}>
                    <ArrowLeft />
                  </button>
                </div>
              </div>
            </td>
            <td className="w-1/4">

            </td>
            <td className="w-1/4">
              <p className="flex-1">
                Página {pageIndex + 1} de {maxPage + 1}
              </p>
            </td>
            <td className="w-1/4"></td>
            <td className="p-2">
              <div className="w-full flex justify-end">
                <button onClick={() => changePageIndex(pageIndex + 1)}>
                  <ArrowRight />
                </button>
                <button onClick={() => changePageIndex(maxPage)}>
                  <DoubleArrowRight />
                </button>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>

      {/* Tabla grande */}
      <table className="w-full hidden xl:[display:table]">
        <thead className="border-b">
          <tr>
            <th className="w-1/5 p-2">
              <div className="flex gap-2 ">
                <User />
                Voluntarios
              </div>
            </th>
            <th className="w-1/5 p-2">
              <div className="flex gap-2 ">
                <Tool />
                Herramientas
              </div>
            </th>
            <th className="w-1/5 p-2">
              <div className="flex gap-2 ">
                <List />
                Estado
              </div>
            </th>
            <th className="w-1/5 p-2">
              <div className="flex gap-2">
                <Calendar />
                Entrega
              </div>
            </th>
            <th className="w-1/5 p-2">
              <div className="flex gap-2">
                <Calendar />
                Devolución
              </div>
            </th>
            <th className="p-2">
              <button className="flex justify-end w-full"
                onClick={toggleShowFilters}>
                <span className={`${showFilters && 'bg-slate-50 bg-opacity-30'} rounded-lg transition-all duration-300`}>
                  <MenuSmall />
                </span>
              </button>
            </th>
          </tr>
          <tr className={`${!showFilters && 'hidden'}`}>
            <th className="w-1/5 p-2">
              <input className="w-full p-1 rounded-sm text-slate-900 font-normal"
                type="text" placeholder="Voluntario" onChange={debouncedVolunteer} />
            </th>
            <th className="w-1/5 p-2">
              <input className="w-full p-1 rounded-sm text-slate-900 font-normal"
                type="text" placeholder="Herramienta" onChange={debouncedTool} />
            </th>
            <th className="w-1/5 p-2">
              <select className="h-8 text-slate-900 w-full rounded-sm font-normal p-1"
                onChange={handleChangeStatus}>
                <option value="">Cualquiera</option>
                <option value="OPENED">Abierto</option>
                <option value="CLOSED">Cerrado</option>
              </select>
            </th>
            <th className="w-1/5 p-2">
              <button className="flex" onClick={toggleOrderByRegisterFrom}>
                <ArrowUpDown />
              </button>
            </th>
            <th className="w-1/5 p-2">
              <button className="flex" onClick={toggleOrderByRegisterTo}>
                <ArrowUpDown />
              </button>
            </th>
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody className="border-b align-top">
          {toolRegister.map(register => {
            const { volunteerName, volunteerLastName, toolName, registerFrom, registerTo, id } = register
            const opened = registerTo === undefined
            const from = new Date(registerFrom).toLocaleDateString("es-ES")
            const to = !opened && new Date(registerTo).toLocaleDateString("es-ES")
            return (
              <tr key={id}>
                <td className="p-2 w-1/5">
                  <p>{`${volunteerName} ${volunteerLastName}`}</p>
                </td>
                <td className="w-1/5 p-2">
                  <p>{toolName}</p>
                </td>
                <td className="w-1/5 p-2">
                  <p className={opened ? 'text-green-500' : 'text-red-500'}> {opened ? 'Abierto' : 'Cerrado'}</p>
                </td>
                <td className="w-1/5 p-2">
                  <p>{from}</p>
                </td>
                <td className="w-1/5 p-2">
                  <p>{to && to}</p>
                </td>
                <td className="p-2">
                  <div className="flex justify-end items-start gap-2 p-2">
                    <button className={`p-1 bg-green-700 rounded-md ${opened || 'hidden'}`}
                      onClick={() => closeRegister(register)}>
                      <ArrowTurnDown />
                    </button>
                    <button className="p-1 bg-red-700 rounded-md" onClick={() => deleteRegister(register)}>
                      <Delete />
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          <tr>
            <td className="w-1/5 p-2">
              <div className="w-full flex justify-between">
                <div className="flex flex-1 gap-2">
                  <button onClick={() => changePageIndex(0)}>
                    <DoubleArrowLeft />
                  </button>
                  <button onClick={() => changePageIndex(pageIndex - 1)}>
                    <ArrowLeft />
                  </button>
                </div>
              </div>
            </td>
            <td className="w-1/5"></td>
            <td className="w-1/5">
              <p className="flex-1 text-right">
                Página {pageIndex + 1} de {maxPage + 1}
              </p>
            </td>
            <td className="w-1/5 text-left"></td>
            <td className="w-1/5"></td>
            <td className="p-2">
              <div className="w-full flex justify-end">
                <button onClick={() => changePageIndex(pageIndex + 1)}>
                  <ArrowRight />
                </button>
                <button onClick={() => changePageIndex(maxPage)}>
                  <DoubleArrowRight />
                </button>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
