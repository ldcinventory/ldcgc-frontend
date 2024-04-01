import { ArrowLeft, ArrowRight, ArrowTurnDown, ArrowUpDown, Calendar, Close, Delete, DoubleArrowLeft, DoubleArrowRight, List, MenuSmall, Potion, Stack, User } from "../../../../Icons"
import { useConsumablesTable } from "../../../../hooks/register/consumables/UseConsumablesTable"

export function ConsumablesRegisterTable() {
  const { state,
    closeRegister,
    deleteRegister,
    queryParams,
    updateQueryParams,
    showFilters,
    toggleShowFilters
    } = useConsumablesTable()

  return (
    <div className="bg-slate-600 p-2 rounded-xl w-full mx-auto my-10">
      {
        state.status === 'failed' &&
        <section
          className="z-10 text-center p-4 text-red-500 bg-red-100 rounded-lg fixed top-10 inset-10 lg:inset-20 max-h-20 lg:max-h-14">
          {state.error}
        </section>        
      }

      { /* Tabla sm */}
      <table className="w-full text-left min-h-[80vh] lg:hidden">
        <thead className="border-b">
          <tr>
            <th className="p-2 w-2/3">
              <div className="flex gap-2">
                <Stack />
                Datos
              </div>
            </th>
            <th className="p-2 flex justify-end">
              <button onClick={toggleShowFilters}
                className={`${showFilters ? 'bg-slate-500' : ''} rounded-md p-1 transition-all duration-300
               hover:text-slate-300`}>
                <MenuSmall />
              </button>
            </th>
          </tr>
          <tr className={`${showFilters ? '' : 'hidden'}`}>
            <th className="p-2 w-2/3 font-normal">
              <section className="flex flex-col gap-2">  
                <input type="text" placeholder="Voluntario..."
                  value={queryParams.volunteer}
                  className="rounded-md w-full p-1 text-slate-900"
                  onChange={(e) => updateQueryParams({ volunteer: e.target.value, pageIndex: 0 })} />
                <input type="text" placeholder="Consumible..."
                  value={queryParams.consumable}
                  className="rounded-md w-full p-1 text-slate-900"
                  onChange={(e) => updateQueryParams({ consumable: e.target.value, pageIndex: 0 })} />
                <select className="rounded-md w-full p-1 text-slate-900"
                  value={queryParams.status}
                  onChange={(e) => updateQueryParams({ status: e.target.value, pageIndex: 0 })}>
                  <option value="">Cualquiera</option>
                  <option value="OPENED">Abierto</option>
                  <option value="CLOSED">Cerrado</option>
                </select>
              </section>
            </th>
            <th className="p-2 font-normal flex justify-end">
              <button className="hover:bg-slate-500 rounded-md transition-colors duration-300 p-1"
                onClick={() =>
                  updateQueryParams({ volunteer: '', consumable: '', status: '', sortField: 'id', descOrder: true })}>
                <Close />
              </button>
            </th>
          </tr>
        </thead>
        <tbody className="h-full">
          {
            state.status === 'loading' && state.consumablesRegister.length === 0 &&
            <tr>
              <td className="text-center align-top p-4">
                Cargando...
              </td>
            </tr>
          }
          {state.consumablesRegister.length !== 0 && state.consumablesRegister.map(register => {
            const stockType = register.consumable.stockType.toLocaleLowerCase()
            const isLoading = state.status === 'loading'
            const opened = !register.registerTo

            return (
              <tr key={register.id} className="align-top h-16">
                <td className="p-2 w-2/3">
                  <div className="flex flex-col">
                    <span>{register.volunteerName} {register.volunteerLastName}</span>
                    <span className="opacity-90">{register.consumable.name}</span>
                    <div className="flex gap-2 text-sm opacity-80 items-center ">
                      {`${register.stockAmountRequest.toFixed(2)}${stockType.substring(0, 2)}`}
                      {!opened && ` - ${register.stockAmountReturn.toFixed(2)}${stockType.substring(0, 2)}` }
                      {
                        opened &&
                          <input type="number" step="any" min={0} max={register.stockAmountRequest}
                            onChange={(e) => {
                              register = {
                                ...register,
                                stockAmountReturn: Math.min(register.stockAmountRequest, Math.max(0, Number(e.target.value)))
                              }
                            }}
                            onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                              const input = e.target as HTMLInputElement
                              input.value = Math.min(register.stockAmountRequest, Math.max(0, Number(input.value))).toString()
                            }}
                            className="rounded-md p-1 text-slate-900 w-1/3" />
                      }
                    </div>
                    <div className="text-xs opacity-80">
                      {new Date(register.registerFrom).toLocaleDateString("es-ES",
                        { day: "2-digit", month: "2-digit", year: "2-digit" })}
                      {!opened && ' - ' + new Date(register.registerTo).toLocaleDateString("es-ES",
                        { day: "2-digit", month: "2-digit", year: "2-digit" })}
                    </div>
                    <span className={`text-sm ${opened ? 'text-green-500': 'text-red-500'}`}>
                      {opened ? 'Abierto' : 'Cerrado'}
                    </span>
                  </div>
                </td>
                <td className="p-2">
                  <div className="flex gap-2 justify-end">
                    {
                      opened &&
                      <button onClick={() => { closeRegister(register) }}
                        className={`bg-green-700 rounded-md p-1 ${isLoading && 'bg-opacity-50'} hover:bg-green-600`}
                        disabled={isLoading}>
                        <ArrowTurnDown />
                      </button>
                    }
                    <button onClick={() => deleteRegister(register.id)}
                      className={`bg-red-700 rounded-md p-1 ${isLoading && 'bg-opacity-50'} hover:bg-red-600`}
                      disabled={isLoading}>
                      <Delete />
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          <tr className="border-t">
            <td className="pt-2 w-full">
              <div className="flex justify-e items-center">
                <button onClick={() => updateQueryParams({ pageIndex: 0 })}>
                  <DoubleArrowLeft />
                </button>
                <button onClick={() =>
                  updateQueryParams({ pageIndex: Math.max(0, (queryParams.pageIndex || 0) - 1) })}>
                  <ArrowLeft />
                </button>
                <div className="flex gap-2 justify-center w-full">
                  Página
                  <input type="number"
                    min={1} max={state.totalPages}
                    value={(queryParams.pageIndex || 0) + 1}
                    onChange={(e) =>
                      updateQueryParams({ pageIndex: Math.max(0, Math.min(state.totalPages - 1, Number(e.target.value) - 1)) })}
                    className="text-slate-900 px-1 w-12 rounded-md" />
                  de {state.totalPages}
                </div>
              </div>
            </td>
            <td className="pt-2">
              <div className="flex justify-end items-center">
                <button onClick={() =>
                  updateQueryParams({ pageIndex: Math.min(state.totalPages, (queryParams.pageIndex || 0) + 1) })}>
                  <ArrowRight />
                </button>
                <button onClick={() => updateQueryParams({ pageIndex: state.totalPages - 1 })}>
                  <DoubleArrowRight />
                </button>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
      { /* Tabla lg */}
      <table className="w-full text-left min-h-[80vh] hidden lg:[display:table] xl:hidden">
        <thead className="border-b">
          <tr>
            <th className="p-2 w-1/5">
              <div className="flex gap-2">
                <User />
                Voluntario
              </div>
            </th>
            <th className="p-2 w-1/5">
              <div className="flex gap-2">
                <Potion />
                Consumible
              </div>
            </th>
            <th className="p-2 w-1/5">
              <div className="flex gap-2">
                <Stack />
                Stock
              </div>
            </th>
            <th className="p-2 w-1/5">
              <div className="flex gap-2">
                <Calendar />
                Fechas
              </div>
            </th>
            <th className="p-2 w-1/5">
              <div className="flex gap-2">
                <List />
                Estado
              </div>
            </th>
            <th className="p-2 flex justify-end">
              <button onClick={toggleShowFilters}
                className={`${showFilters ? 'bg-slate-500' : ''} rounded-md p-1 transition-all duration-300
               hover:text-slate-300`}>
                <MenuSmall />
              </button>
            </th>
          </tr>
          <tr className={`${showFilters ? '' : 'hidden'}`}>
            <th className="p-2 w-1/5 font-normal">
              <input type="text" placeholder="Nombre o BA Id..."
                value={queryParams.volunteer}
                className="rounded-md w-full p-1 text-slate-900"
                onChange={(e) => updateQueryParams({ volunteer: e.target.value, pageIndex: 0 })} />
            </th>
            <th className="p-2 w-1/5 font-normal">
              <input type="text" placeholder="Nombre o código de barras..."
                value={queryParams.consumable}
                className="rounded-md w-full p-1 text-slate-900"
                onChange={(e) => updateQueryParams({ consumable: e.target.value, pageIndex: 0 })} />
            </th>
            <th className="p-2 w-1/5 font-normal">
              <div className="flex justify-between items-center">
                <button className="hover:bg-slate-500 rounded-md transition-colors duration-300 p-1"
                  onClick={() => updateQueryParams({ sortField: 'stockAmountRequest', descOrder: !queryParams.descOrder })}>
                  <ArrowUpDown />
                </button> -
                <button className="hover:bg-slate-500 rounded-md transition-colors duration-300 p-1"
                  onClick={() => updateQueryParams({ sortField: 'stockAmountReturn', descOrder: !queryParams.descOrder })}>
                  <ArrowUpDown />
                </button>
              </div>
            </th>
            <th className="p-2 w-1/5 font-normal">
              <div className="flex justify-between items-center">
                <button className="hover:bg-slate-500 rounded-md transition-colors duration-300 p-1"
                  onClick={() => updateQueryParams({ sortField: 'registerFrom', descOrder: !queryParams.descOrder })}>
                  <ArrowUpDown />
                </button> - 
                <button className="hover:bg-slate-500 rounded-md transition-colors duration-300 p-1"
                  onClick={() => updateQueryParams({ sortField: 'registerTo', descOrder: !queryParams.descOrder })}>
                  <ArrowUpDown />
                </button>
              </div>
            </th>
            <th className="p-2 w-1/5 font-normal">
              <select className="rounded-md w-full p-1 text-slate-900"
                value={queryParams.status}
                onChange={(e) => updateQueryParams({ status: e.target.value, pageIndex: 0 })}>
                <option value="">Cualquiera</option>
                <option value="OPENED">Abierto</option>
                <option value="CLOSED">Cerrado</option>
              </select>
            </th>
            <th className="p-2 font-normal flex justify-end">
              <button className="hover:bg-slate-500 rounded-md transition-colors duration-300 p-1"
                onClick={() =>
                  updateQueryParams({ volunteer: '', consumable: '', status: '', sortField: 'id', descOrder: true })}>
                <Close />
              </button>
            </th>
          </tr>
        </thead>
        <tbody className="h-full text-sm">
          {
            state.status === 'loading' && state.consumablesRegister.length === 0 &&
            <tr>
              <td className="text-center align-top p-4">
                Cargando...
              </td>
            </tr>
          }
          {state.consumablesRegister.length !== 0 && state.consumablesRegister.map(register => {
            const stockType = register.consumable.stockType.toLocaleLowerCase()
            const isLoading = state.status === 'loading'
            const opened = !register.registerTo

            return (
              <tr key={register.id} className="align-top h-16">
                <td className="p-2 w-1/5">{register.volunteerName} {register.volunteerLastName}</td>
                <td className="p-2 w-1/5">{register.consumable.name} </td>
                <td className="p-2 w-1/5">
                  <div className="flex justify-between">
                    <span className="w-1/3">{`${register.stockAmountRequest.toFixed(2)}${stockType.substring(0,2)}`}</span>
                    <span> - </span>
                    {
                      opened ?
                        <input type="number" step="any" min={0} max={register.stockAmountRequest}
                          onChange={(e) => {
                            register = {
                              ...register,
                              stockAmountReturn: Math.min(register.stockAmountRequest, Math.max(0, Number(e.target.value)))
                            }}}
                          onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                            const input = e.target as HTMLInputElement
                            input.value = Math.min(register.stockAmountRequest, Math.max(0, Number(input.value))).toString()
                          }}
                          className="rounded-md p-1 text-slate-900 w-1/3" />
                        : <span className="w-1/3">{`${register.stockAmountReturn.toFixed(2)}${stockType.substring(0, 2) }`}</span>
                    }
                  </div>
                </td>
                <td className="p-2 w-1/5">
                  {new Date(register.registerFrom).toLocaleDateString("es-ES",
                    { day: "2-digit", month: "2-digit", year: "2-digit" })} 
                  {!opened && ' - ' + new Date(register.registerTo).toLocaleDateString("es-ES",
                    { day: "2-digit", month: "2-digit", year: "2-digit" })}
                </td>
                <td className="p-2 w-1/5">{opened ? 'Abierto' : 'Cerrado'}</td>
                <td className="p-2">
                  <div className="flex gap-2 justify-end">
                    {
                      opened &&
                      <button onClick={() => { closeRegister(register) }}
                        className={`bg-green-700 rounded-md p-1 ${isLoading && 'bg-opacity-50'} hover:bg-green-600`}
                        disabled={isLoading}>
                        <ArrowTurnDown />
                      </button>
                    }
                    <button onClick={() => deleteRegister(register.id)}
                      className={`bg-red-700 rounded-md p-1 ${isLoading && 'bg-opacity-50'} hover:bg-red-600`}
                      disabled={isLoading}>
                      <Delete />
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          <tr className="border-t">
            <td className="pt-2 w-1/5">
              <div className="flex items-center">
                <button onClick={() => updateQueryParams({ pageIndex: 0 })}>
                  <DoubleArrowLeft />
                </button>
                <button onClick={() =>
                  updateQueryParams({ pageIndex: Math.max(0, (queryParams.pageIndex || 0) - 1) })}>
                  <ArrowLeft />
                </button>
              </div>
            </td>
            <td className="w-1/5"></td>
            <td className="pt-2 w-1/5 text-center">
              <div className="flex gap-2 justify-end">
                Página
                <input type="number"
                  min={1} max={state.totalPages}
                  value={(queryParams.pageIndex || 0) + 1}
                  onChange={(e) =>
                    updateQueryParams({ pageIndex: Math.max(0, Math.min(state.totalPages - 1, Number(e.target.value) - 1)) })}
                  className="text-slate-900 px-1 w-12 rounded-md" />
                de {state.totalPages}
              </div>
            </td>
            <td className="w-1/5"></td>
            <td className="w-1/5"></td>
            <td className="pt-2">
              <div className="flex justify-end items-center">
                <button onClick={() =>
                  updateQueryParams({ pageIndex: Math.min(state.totalPages, (queryParams.pageIndex || 0) + 1) })}>
                  <ArrowRight />
                </button>
                <button onClick={() => updateQueryParams({ pageIndex: state.totalPages - 1 })}>
                  <DoubleArrowRight />
                </button>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>      
      { /* Tabla desktop */}
      <table className="w-full text-left min-h-[80vh] hidden xl:[display:table]">
        <thead className="border-b">
          <tr>
            <th className="p-2 w-[14%]">
              <div className="flex gap-2">
                <User />
                Voluntario
              </div>
            </th>
            <th className="p-2 w-[14%]">
              <div className="flex gap-2">
                <Potion />
                Consumible
              </div>
            </th>
            <th className="p-2 w-[14%]">
              <div className="flex gap-2">
                <Stack />
                Stock entregado
              </div>
            </th>
            <th className="p-2 w-[14%]">
              <div className="flex gap-2">
                <Calendar />
                Entrega
              </div>
            </th>
            <th className="p-2 w-[14%]">
              <div className="flex gap-2">
                <Stack />
                Stock devuelto
              </div>
            </th>
            <th className="p-2 w-[14%]">
              <div className="flex gap-2">
                <Calendar />
                Devolución
              </div>
            </th>
            <th className="p-2 w-[14%]">
              <div className="flex gap-2">
                <List />
                Estado
              </div>
            </th>
            <th className="p-2 flex justify-end">
              <button onClick={toggleShowFilters}
                className={`${showFilters ? 'bg-slate-500' : ''} rounded-md p-1 transition-all duration-300
               hover:text-slate-300`}>
                <MenuSmall />
              </button>
            </th>
          </tr>
          <tr className={`${showFilters ? '' : 'hidden'}`}>
            <th className="p-2 w-[14%] font-normal">
              <input type="text" placeholder="Nombre o BA Id..."
                value={queryParams.volunteer}
                className="rounded-md w-full p-1 text-slate-900"
                onChange={(e) => updateQueryParams({ volunteer: e.target.value, pageIndex: 0 })} />
            </th>
            <th className="p-2 w-[14%] font-normal">
              <input type="text" placeholder="Nombre o código de barras..."
                value={queryParams.consumable}
                className="rounded-md w-full p-1 text-slate-900"
                onChange={(e) => updateQueryParams({ consumable: e.target.value, pageIndex: 0 })}/>
            </th>
            <th className="p-2 w-[14%] font-normal">
              <button className="hover:bg-slate-500 rounded-md transition-colors duration-300 p-1"
                onClick={() => updateQueryParams({ sortField: 'stockAmountRequest', descOrder: !queryParams.descOrder })}>
                <ArrowUpDown />
              </button>
            </th>
            <th className="p-2 w-[14%] font-normal">
              <button className="hover:bg-slate-500 rounded-md transition-colors duration-300 p-1"
              onClick={() => updateQueryParams({ sortField: 'registerFrom', descOrder: !queryParams.descOrder })}>
                <ArrowUpDown />
              </button>
            </th>
            <th className="p-2 w-[14%] font-normal">
              <button className="hover:bg-slate-500 rounded-md transition-colors duration-300 p-1"
                onClick={() => updateQueryParams({ sortField: 'stockAmountReturn', descOrder: !queryParams.descOrder })}>
                <ArrowUpDown />
              </button>
            </th>
            <th className="p-2 w-[14%] font-normal">
              <button className="hover:bg-slate-500 rounded-md transition-colors duration-300 p-1"
              onClick={() => updateQueryParams({ sortField: 'registerTo', descOrder: !queryParams.descOrder })}>
                <ArrowUpDown />
              </button>
            </th>
            <th className="p-2 w-[14%] font-normal">
              <select className="rounded-md w-full p-1 text-slate-900"
                value={queryParams.status}
                onChange={(e) => updateQueryParams({  status: e.target.value, pageIndex: 0 })}>
                <option value="">Cualquiera</option>
                <option value="OPENED">Abierto</option>
                <option value="CLOSED">Cerrado</option>
              </select>
            </th>
            <th className="p-2 font-normal flex justify-end">
              <button className="hover:bg-slate-500 rounded-md transition-colors duration-300 p-1"
                onClick={() =>
                  updateQueryParams({ volunteer: '', consumable: '', status: '', sortField: 'id', descOrder: true })}>
                <Close />
              </button>
            </th>
          </tr>        
        </thead>
        <tbody className="h-full">
          {
            state.status === 'loading' && state.consumablesRegister.length === 0 &&
            <tr>
              <td className="text-center align-top p-4">
                Cargando...
              </td>
            </tr>
          }
          {state.consumablesRegister.length !== 0 && state.consumablesRegister.map(register => {
            const stockType = register.consumable.stockType.toLocaleLowerCase()
            const isLoading = state.status === 'loading'
            const opened = !register.registerTo
            
            return (
              <tr key={register.id} className="align-top h-16">
                <td className="p-2 w-[14%]">{register.volunteerName} {register.volunteerLastName}</td>
                <td className="p-2 w-[14%]">{register.consumable.name} </td>
                <td className="p-2 w-[14%]">{`${register.stockAmountRequest} ${stockType}`} </td>
                <td className="p-2 w-[14%]">{new Date(register.registerFrom).toLocaleDateString("es-ES")} </td>
                <td className="p-2 w-[14%]">
                  {opened ?
                    <input type="number" step="any" min={0} max={register.stockAmountRequest}
                      onChange={(e) => {
                        register = {
                          ...register,
                          stockAmountReturn: Math.min(register.stockAmountRequest, Math.max(0, Number(e.target.value)))
                        }
                      }
                      }
                      onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        const input = e.target as HTMLInputElement
                        input.value = Math.min(register.stockAmountRequest, Math.max(0, Number(input.value))).toString()}}
                    className="rounded-md p-1 text-slate-900"/>
                    : `${register.stockAmountReturn} ${stockType}`}
                </td>
                <td className="p-2 w-[14%]">
                  {!opened &&  new Date(register.registerTo).toLocaleDateString("es-ES")}
                </td>
                <td className="p-2 w-[14%]">{opened ? 'Abierto' : 'Cerrado'}</td>
                <td className="p-2">
                  <div className="flex gap-2 justify-end">
                    {
                      opened &&
                      <button onClick={() => { closeRegister(register) }}
                          className={`bg-green-700 rounded-md p-1 ${isLoading && 'bg-opacity-50'} hover:bg-green-600`}
                          disabled={isLoading}>
                        <ArrowTurnDown />
                      </button>
                    }
                    <button onClick={() => deleteRegister(register.id)}
                      className={`bg-red-700 rounded-md p-1 ${isLoading && 'bg-opacity-50'} hover:bg-red-600`}
                      disabled={isLoading}>
                      <Delete />
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          <tr className="border-t">
            <td className="pt-2 w-[14%]">
              <div className="flex items-center">
                <button onClick={() => updateQueryParams({ pageIndex: 0 })}>
                  <DoubleArrowLeft />
                </button>
                <button onClick={() =>
                  updateQueryParams({ pageIndex: Math.max(0, (queryParams.pageIndex || 0) - 1) })}>
                  <ArrowLeft />
                </button>
              </div>              
            </td>
            <td className="w-[14%]"></td>
            <td className="w-[14%]"> </td>
            <td className="pt-2 w-[14%] text-center">
              <div className="flex gap-2 justify-end">
                Página
                <input type="number"
                  min={1} max={state.totalPages}
                  value={(queryParams.pageIndex || 0) + 1}
                  onChange={(e) =>
                    updateQueryParams({ pageIndex: Math.max(0, Math.min(state.totalPages - 1, Number(e.target.value) - 1)) })}                  
                className="text-slate-900 px-1 w-12 rounded-md"/>
                de {state.totalPages}
              </div>
            </td>
            <td className="w-[14%]"></td>
            <td className="w-[14%]"></td>
            <td className="w-[14%]"></td>
            <td className="pt-2 w-[14%]">
              <div className="flex justify-end items-center">
                <button onClick={() =>
                  updateQueryParams({ pageIndex: Math.min(state.totalPages, (queryParams.pageIndex || 0) + 1) })}>
                  <ArrowRight />
                </button>
                <button onClick={() => updateQueryParams({ pageIndex: state.totalPages - 1})}>
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