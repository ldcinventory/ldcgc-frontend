import { ArrowUturnDownIcon, ArrowsUpDownIcon, Bars2Icon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { useConsumablesRegisterTable } from "../hooks/UseConsumablesRegisterTable"
import { AppNumberInput, AppNumberInputXs, AppTextInput } from "../../../common/components/AppInput"
import { AppSelect } from "../../../common/components/AppSelect"
import { AppButtonError, AppButtonSuccess, AppButtonTransparent } from "../../../common/components/AppButton"
import { AppTableCell5, AppTableHeaderCell5, AppTableHeaderCell7, AppTableCell7 } from "../../../common/components/AppTable"
import { toDateString } from "../../../utils/DateUtils"

export function ConsumablesRegister() {
  const { state,
    closeRegister,
    deleteRegister,
    queryParams,
    updateQueryParams,
    showFilters,
    toggleShowFilters
  } = useConsumablesRegisterTable()

  return (
    <div className="bg-primary-2 dark:bg-primary-7 mb-10 rounded-xl mx-5 lg:mx-auto px-4 pb-2">
      {
        state.status === 'failed' &&
        <section
          className="z-10 text-center p-4 text-error-6 dark:text-error-1 bg-error-1 dark:bg-error-9
           rounded-lg fixed top-10 inset-10 lg:inset-20 max-h-20 lg:max-h-14">
          {state.error}
        </section>
      }

      { /* Tabla sm */}
      <table className="w-full text-left min-h-[80vh] lg:hidden table-fixed">
        <thead className="border-b">
          <tr>
            <th className="p-2 w-2/3">Datos</th>
            <th className="p-2 flex justify-end">
              <AppButtonTransparent onClick={toggleShowFilters}
                className={showFilters ? 'bg-primary-6' : ''}>
                <Bars2Icon className="h-7" />
              </AppButtonTransparent>
            </th>
          </tr>
          <tr className={`${showFilters ? '' : 'hidden'}`}>
            <th className="p-2 w-2/3 font-normal">
              <section className="flex flex-col gap-2">
                <AppTextInput value={queryParams.volunteer} placeholder="Voluntario..."
                  onChange={(e) => updateQueryParams({ volunteer: e.target.value, pageIndex: 0 })} />
                <AppTextInput value={queryParams.consumable} placeholder="Consumible..."
                  onChange={(e) => updateQueryParams({ consumable: e.target.value, pageIndex: 0 })} />
                <AppSelect value={queryParams.status}
                  onChange={(e) => updateQueryParams({ status: e.target.value, pageIndex: 0 })}
                  options={[
                    { name: 'Cualquiera', value: '' },
                    { name: 'Abierto', value: 'OPENED' },
                    { name: 'Cerrado', value: 'CLOSED' },
                  ]}
                />
              </section>
            </th>
            <th className="p-2 font-normal flex justify-end">
              <AppButtonTransparent
                onClick={() =>
                  updateQueryParams({ volunteer: '', consumable: '', status: '', sortField: 'id', descOrder: true })}>
                <XMarkIcon className="h-7" />
              </AppButtonTransparent>
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
          {
            state.consumablesRegister.length !== 0 && state.consumablesRegister.map(register => {
              const stockType = register.consumableStockType.toLocaleLowerCase()
              const isLoading = state.status === 'loading'
              const opened = !register.registerTo

              return (
                <tr key={register.id} className="align-top h-16">
                  <td className="p-2 w-2/3">
                    <div className="flex flex-col">
                      <span>{register.volunteerName} {register.volunteerLastName}</span>
                      <span className="opacity-90">{register.consumableName}</span>
                      <div className="flex gap-2 text-sm opacity-80 items-center ">
                        {`${register.stockAmountRequest.toFixed(2)}${stockType.substring(0, 2)}`}
                        {!opened && ` - ${register.stockAmountReturn?.toFixed(2)}${stockType.substring(0, 2)}`}
                        {
                          opened &&
                          <AppNumberInput step="any" min={0} max={register.stockAmountRequest}
                            onChange={(e) => {
                              register = {
                                ...register,
                                stockAmountReturn: Math.min(register.stockAmountRequest, Math.max(0, Number(e.target.value)))
                              }
                            }}
                            onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                              const input = e.target as HTMLInputElement
                              input.value = Math.min(register.stockAmountRequest, Math.max(0, Number(input.value))).toString()
                            }} />
                        }
                      </div>
                      <div className="text-xs opacity-80">
                        {new Date(register.registerFrom).toLocaleDateString("es-ES",
                          { day: "2-digit", month: "2-digit", year: "2-digit" })}
                        {!opened && ' - ' + toDateString(register.registerTo, "es-ES",
                          { day: "2-digit", month: "2-digit", year: "2-digit" })}
                      </div>
                      <span className={`text-sm ${opened ? 'text-success-4' : 'text-error-4'}`}>
                        {opened ? 'Abierto' : 'Cerrado'}
                      </span>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="flex gap-2 justify-end">
                      {
                        opened &&
                        <AppButtonSuccess onClick={() => closeRegister(register)} disabled={isLoading}
                          className={isLoading ? 'bg-opacity-50' : ''}>
                          <ArrowUturnDownIcon className="h-7" />
                        </AppButtonSuccess>
                      }
                      <AppButtonError onClick={() => deleteRegister(register.id)}
                        className={isLoading ? 'bg-opacity-50' : ''}
                        disabled={isLoading}>
                        <TrashIcon className="h-7" />
                      </AppButtonError>
                    </div>
                  </td>
                </tr>
              )
            })}
        </tbody>
        <tfoot>
          <tr className="border-t">
            <td className="pt-2 w-full">
              <div className="flex items-center justify-between gap-2">
                <nav className="flex">
                  <AppButtonTransparent onClick={() => updateQueryParams({ pageIndex: 0 })}>
                    <ChevronDoubleLeftIcon className="h-5" />
                  </AppButtonTransparent>
                  <AppButtonTransparent onClick={() =>
                    updateQueryParams({ pageIndex: Math.max(0, (queryParams.pageIndex || 0) - 1) })}>
                    <ChevronLeftIcon className="h-5" />
                  </AppButtonTransparent>
                </nav>
                <div className="flex gap-1 justify-center w-full whitespace-nowrap">
                  Página
                  <AppNumberInputXs min={1} max={state.totalPages} value={(queryParams.pageIndex || 0) + 1}
                    onChange={(e) =>
                      updateQueryParams({ pageIndex: Math.max(0, Math.min(state.totalPages - 1, Number(e.target.value) - 1)) })} />
                  de {state.totalPages}
                </div>
              </div>
            </td>
            <td className="pt-2">
              <div className="flex justify-end items-center ">
                <AppButtonTransparent onClick={() =>
                  updateQueryParams({ pageIndex: Math.min(state.totalPages, (queryParams.pageIndex || 0) + 1) })}>
                  <ChevronRightIcon className="h-5" />
                </AppButtonTransparent>
                <AppButtonTransparent onClick={() => updateQueryParams({ pageIndex: state.totalPages - 1 })}>
                  <ChevronDoubleRightIcon className="h-5" />
                </AppButtonTransparent>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
      { /* Tabla lg */}
      <table className="w-full text-left min-h-[80vh] hidden lg:[display:table] xl:hidden">
        <thead className="border-b">
          <tr>
            <AppTableHeaderCell5>Voluntario</AppTableHeaderCell5>
            <AppTableHeaderCell5>Consumible</AppTableHeaderCell5>
            <AppTableHeaderCell5>Stock</AppTableHeaderCell5>
            <AppTableHeaderCell5>Fechas</AppTableHeaderCell5>
            <AppTableHeaderCell5>Estado</AppTableHeaderCell5>
            <th className="p-2 flex justify-end">
              <AppButtonTransparent onClick={toggleShowFilters} className={showFilters ? 'bg-primary-6' : ''}>
                <Bars2Icon className="h-7" />
              </AppButtonTransparent>
            </th>
          </tr>
          <tr className={`${showFilters ? '' : 'hidden'}`}>
            <AppTableHeaderCell5>
              <AppTextInput placeholder="Nombre o BA Id..." value={queryParams.volunteer}
                onChange={(e) => updateQueryParams({ volunteer: e.target.value, pageIndex: 0 })} />
            </AppTableHeaderCell5>
            <th className="p-2 w-1/5 font-normal">
              <AppTextInput placeholder="Nombre o código de barras..." value={queryParams.consumable}
                onChange={(e) => updateQueryParams({ consumable: e.target.value, pageIndex: 0 })} />
            </th>
            <AppTableHeaderCell5 className="gap-6">
              <AppButtonTransparent
                onClick={() => updateQueryParams({ sortField: 'stockAmountRequest', descOrder: !queryParams.descOrder })}>
                <ArrowsUpDownIcon className="h-7" />
              </AppButtonTransparent> -
              <AppButtonTransparent
                onClick={() => updateQueryParams({ sortField: 'stockAmountReturn', descOrder: !queryParams.descOrder })}>
                <ArrowsUpDownIcon className="h-7" />
              </AppButtonTransparent>
            </AppTableHeaderCell5>
            <AppTableHeaderCell5 className="gap-7">
              <AppButtonTransparent
                onClick={() => updateQueryParams({ sortField: 'registerFrom', descOrder: !queryParams.descOrder })}>
                <ArrowsUpDownIcon className="h-7" />
              </AppButtonTransparent> -
              <AppButtonTransparent
                onClick={() => updateQueryParams({ sortField: 'registerTo', descOrder: !queryParams.descOrder })}>
                <ArrowsUpDownIcon className="h-7" />
              </AppButtonTransparent>
            </AppTableHeaderCell5>
            <AppTableHeaderCell5>
              <AppSelect value={queryParams.status}
                onChange={(e) => updateQueryParams({ status: e.target.value, pageIndex: 0 })}
                options={[
                  { name: 'Cualquiera', value: '' },
                  { name: 'Abierto', value: 'OPENED' },
                  { name: 'Cerrado', value: 'CLOSED' },
                ]}/>
            </AppTableHeaderCell5>
            <th className="p-2 font-normal flex justify-end">
              <AppButtonTransparent
                onClick={() =>
                  updateQueryParams({ volunteer: '', consumable: '', status: '', sortField: 'id', descOrder: true })}>
                <XMarkIcon className="h-7" />
              </AppButtonTransparent>
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
            const stockType = register.consumableStockType.toLocaleLowerCase()
            const isLoading = state.status === 'loading'
            const opened = !register.registerTo && !register.stockAmountReturn

            return (
              <tr key={register.id} className="align-top h-16">
                <AppTableCell5>{register.volunteerName} {register.volunteerLastName}</AppTableCell5>
                <AppTableCell5>{register.consumableName}</AppTableCell5>
                <AppTableCell5>
                  <div className="flex gap-3">
                    <span className="w-1/4">{`${register.stockAmountRequest.toFixed(2)}${stockType.substring(0, 2)}`}</span>
                    <span>-</span>
                    {
                      opened ?
                        <AppNumberInput step="any" min={0} max={register.stockAmountRequest}
                          onChange={(e) => {
                            register = {
                              ...register,
                              stockAmountReturn: Math.min(register.stockAmountRequest, Math.max(0, Number(e.target.value)))
                            }
                          }}
                          onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                            const input = e.target as HTMLInputElement
                            input.value = Math.min(register.stockAmountRequest, Math.max(0, Number(input.value))).toString()
                          }} />
                        : <span>{`${register.stockAmountReturn?.toFixed(2)}${stockType.substring(0, 2)}`}</span>
                    }
                  </div>
                </AppTableCell5>
                <AppTableCell5>
                  {toDateString(register.registerFrom, "es-ES",
                    { day: "2-digit", month: "2-digit", year: "2-digit" })}
                  {!opened && ' - ' + toDateString(register.registerTo, "es-ES",
                    { day: "2-digit", month: "2-digit", year: "2-digit" })}
                </AppTableCell5>
                <AppTableCell5>{opened ? 'Abierto' : 'Cerrado'}</AppTableCell5>
                <AppTableCell5 className="p-2">
                  <div className="flex gap-2 justify-end">
                    {
                      opened &&
                      <AppButtonSuccess onClick={() => { closeRegister(register) }} disabled={isLoading}
                        className={isLoading ? 'bg-opacity-50' : ''}>
                        <ArrowUturnDownIcon className="h-7" />
                      </AppButtonSuccess>
                    }
                    <AppButtonError onClick={() => deleteRegister(register.id)} disabled={isLoading}
                      className={isLoading ? 'bg-opacity-50' : ''}>
                      <TrashIcon className="h-7" />
                    </AppButtonError>
                  </div>
                </AppTableCell5>
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          <tr className="border-t">
            <AppTableCell5>
              <div className="flex items-center">
                <AppButtonTransparent onClick={() => updateQueryParams({ pageIndex: 0 })}>
                  <ChevronDoubleLeftIcon className="h-7" />
                </AppButtonTransparent>
                <AppButtonTransparent onClick={() =>
                  updateQueryParams({ pageIndex: Math.max(0, (queryParams.pageIndex || 0) - 1) })}>
                  <ChevronLeftIcon className="h-7" />
                </AppButtonTransparent>
              </div>
            </AppTableCell5>
            <AppTableCell5 />
            <AppTableCell5>
              <div className="flex gap-2 justify-end whitespace-nowrap">
                Página
                <AppNumberInputXs min={1} max={state.totalPages} value={(queryParams.pageIndex || 0) + 1}
                  onChange={(e) =>
                    updateQueryParams({ pageIndex: Math.max(0, Math.min(state.totalPages - 1, Number(e.target.value) - 1)) })} />
                de {state.totalPages}
              </div>
            </AppTableCell5>
            <AppTableCell5 />
            <AppTableCell5 />
            <AppTableCell5>
              <div className="flex justify-end items-center">
                <AppButtonTransparent onClick={() =>
                  updateQueryParams({ pageIndex: Math.min(state.totalPages, (queryParams.pageIndex || 0) + 1) })}>
                  <ChevronRightIcon className="h-7" />
                </AppButtonTransparent>
                <AppButtonTransparent onClick={() => updateQueryParams({ pageIndex: state.totalPages - 1 })}>
                  <ChevronDoubleRightIcon className="h-7" />
                </AppButtonTransparent>
              </div>
            </AppTableCell5>
          </tr>
        </tfoot>
      </table>
      { /* Tabla desktop */}
      <table className="w-full text-left min-h-[80vh] hidden xl:[display:table]">
        <thead className="border-b border-primary-1">
          <tr>
            <AppTableHeaderCell7>Voluntario</AppTableHeaderCell7>
            <AppTableHeaderCell7>Consumible</AppTableHeaderCell7>
            <AppTableHeaderCell7>Stock entregado</AppTableHeaderCell7>
            <AppTableHeaderCell7>Entrega</AppTableHeaderCell7>
            <AppTableHeaderCell7>Stock devuelto</AppTableHeaderCell7>
            <AppTableHeaderCell7>Devolución</AppTableHeaderCell7>
            <AppTableHeaderCell7>Estado</AppTableHeaderCell7>
            <AppTableHeaderCell7 className="justify-end">
              <AppButtonTransparent onClick={toggleShowFilters} className={showFilters ? 'bg-primary-6' : ''}>
                <Bars2Icon className="h-7" />
              </AppButtonTransparent>
            </AppTableHeaderCell7>
          </tr>
          <tr className={`${showFilters ? '' : 'hidden'}`}>
            <AppTableHeaderCell7>
              <AppTextInput placeholder="Nombre o BA Id..." value={queryParams.volunteer}
                onChange={(e) => updateQueryParams({ volunteer: e.target.value, pageIndex: 0 })} />
            </AppTableHeaderCell7>
            <AppTableHeaderCell7>
              <AppTextInput placeholder="Nombre o código de barras..." value={queryParams.consumable}
                onChange={(e) => updateQueryParams({ consumable: e.target.value, pageIndex: 0 })} />
            </AppTableHeaderCell7>
            <AppTableHeaderCell7>
              <AppButtonTransparent
                onClick={() => updateQueryParams({ sortField: 'stockAmountRequest', descOrder: !queryParams.descOrder })}>
                <ArrowsUpDownIcon className="h-7" />
              </AppButtonTransparent>
            </AppTableHeaderCell7>
            <AppTableHeaderCell7>
              <AppButtonTransparent
                onClick={() => updateQueryParams({ sortField: 'registerFrom', descOrder: !queryParams.descOrder })}>
                <ArrowsUpDownIcon className="h-7" />
              </AppButtonTransparent>
            </AppTableHeaderCell7>
            <AppTableHeaderCell7>
              <AppButtonTransparent
                onClick={() => updateQueryParams({ sortField: 'stockAmountReturn', descOrder: !queryParams.descOrder })}>
                <ArrowsUpDownIcon className="h-7" />
              </AppButtonTransparent>
            </AppTableHeaderCell7>
            <AppTableHeaderCell7>
              <AppButtonTransparent
                onClick={() => updateQueryParams({ sortField: 'registerTo', descOrder: !queryParams.descOrder })}>
                <ArrowsUpDownIcon className="h-7" />
              </AppButtonTransparent>
            </AppTableHeaderCell7>
            <AppTableHeaderCell7>
              <AppSelect
                value={queryParams.status}
                onChange={(e) => updateQueryParams({ status: e.target.value, pageIndex: 0 })}
                options={[
                  { value: "", name: "Cualquiera" },
                  { value: "OPENED", name: "Abierto" },
                  { value: "CLOSED", name: "Cerrado" }
                ]}/>
            </AppTableHeaderCell7>
            <AppTableHeaderCell7 className="justify-end">
              <AppButtonTransparent
                onClick={() =>
                  updateQueryParams({ volunteer: '', consumable: '', status: '', sortField: 'id', descOrder: true })}>
                <XMarkIcon className="h-7" />
              </AppButtonTransparent>
            </AppTableHeaderCell7>
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
          {
            state.consumablesRegister.length !== 0 && state.consumablesRegister.map(register => {
              const stockType = register.consumableStockType.toLocaleLowerCase()
              const isLoading = state.status === 'loading'
              const opened = !register.registerTo

              return (
                <tr key={register.id} className="align-top h-16">
                  <AppTableCell7>{register.volunteerName} {register.volunteerLastName}</AppTableCell7>
                  <AppTableCell7>{register.consumableName} </AppTableCell7>
                  <AppTableCell7>{`${register.stockAmountRequest} ${stockType}`} </AppTableCell7>
                  <AppTableCell7>{new Date(register.registerFrom).toLocaleDateString("es-ES")} </AppTableCell7>
                  <AppTableCell7>
                    {opened ?
                      <AppNumberInput step="any" min={0} max={register.stockAmountRequest}
                        onChange={(e) => {
                          register = {
                            ...register,
                            stockAmountReturn: Math.min(register.stockAmountRequest, Math.max(0, Number(e.target.value)))
                          }
                        }
                        }
                        onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                          const input = e.target as HTMLInputElement
                          input.value = Math.min(register.stockAmountRequest, Math.max(0, Number(input.value))).toString()
                        }} />
                      : `${register.stockAmountReturn} ${stockType}`}
                  </AppTableCell7>
                  <AppTableCell7> {!opened && toDateString(register.registerTo, "es-ES")}</AppTableCell7>
                  <AppTableCell7>{opened ? 'Abierto' : 'Cerrado'}</AppTableCell7>
                  <AppTableCell7>
                    <div className="flex gap-2 justify-end">
                      {
                        opened &&
                        <AppButtonSuccess onClick={() => { closeRegister(register) }} disabled={isLoading}
                          className={isLoading ? 'bg-opacity-50' : ''}>
                          <ArrowUturnDownIcon className="h-7" />
                        </AppButtonSuccess>
                      }
                      <AppButtonError onClick={() => deleteRegister(register.id)} disabled={isLoading}
                        className={isLoading ? 'bg-opacity-50' : ''}>
                        <TrashIcon className="h-7" />
                      </AppButtonError>
                    </div>
                  </AppTableCell7>
                </tr>
              )
            })}
        </tbody>
        <tfoot>
          <tr className="border-t">
            <AppTableCell7>
              <div className="flex items-center">
                <AppButtonTransparent onClick={() => updateQueryParams({ pageIndex: 0 })}>
                  <ChevronDoubleLeftIcon className="h-7" />
                </AppButtonTransparent>
                <AppButtonTransparent onClick={() =>
                  updateQueryParams({ pageIndex: Math.max(0, (queryParams.pageIndex || 0) - 1) })}>
                  <ChevronLeftIcon className="h-7" />
                </AppButtonTransparent>
              </div>
            </AppTableCell7>
            <AppTableCell7></AppTableCell7>
            <AppTableCell7> </AppTableCell7>
            <AppTableCell7>
              <div className="flex gap-2 justify-end whitespace-nowrap">
                Página
                <AppNumberInputXs min={1} max={state.totalPages} value={(queryParams.pageIndex || 0) + 1}
                  onChange={(e) =>
                    updateQueryParams({ pageIndex: Math.max(0, Math.min(state.totalPages - 1, Number(e.target.value) - 1)) })} />
                <span>de {state.totalPages}</span>
              </div>
            </AppTableCell7>
            <AppTableCell7 />
            <AppTableCell7 />
            <AppTableCell7 />
            <AppTableCell7>
              <div className="flex justify-end items-center">
                <AppButtonTransparent onClick={() =>
                  updateQueryParams({ pageIndex: Math.min(state.totalPages, (queryParams.pageIndex || 0) + 1) })}>
                  <ChevronRightIcon className="h-7" />
                </AppButtonTransparent>
                <AppButtonTransparent onClick={() => updateQueryParams({ pageIndex: state.totalPages - 1 })}>
                  <ChevronDoubleRightIcon className="h-7" />
                </AppButtonTransparent>
              </div>
            </AppTableCell7>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}