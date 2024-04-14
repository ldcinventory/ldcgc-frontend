import { ArrowUturnDownIcon, Bars2Icon, BeakerIcon, CalendarIcon, CircleStackIcon, QueueListIcon, UserIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { ArrowLeft, ArrowRight, ArrowTurnDown, ArrowUpDown,  Close, Delete, DoubleArrowLeft, DoubleArrowRight, MenuSmall } from "../../../Icons"
import { useConsumablesRegisterTable } from "../hooks/UseConsumablesRegisterTable"
import { AppNumberInput, AppNumberInputSm, AppTextInput } from "../../../common/components/AppInput"
import { AppSelect } from "../../../common/components/AppSelect"
import { AppButtonError, AppButtonSuccess, AppButtonTransparent } from "../../../common/components/AppButton"
import { AppTableCellMd, AppTableHeaderCellMd, AppTableHeaderCellLg, AppTableCellLg } from "../../../common/components/AppTable"

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
    <div className="bg-primary-4 dark:bg-primary-7 mb-10 rounded-xl mx-auto px-4 pb-2">
      {
        state.status === 'failed' &&
        <section
            className="z-10 text-center p-4 text-error-6 dark:text-error-1 bg-error-1 dark:bg-error-9
           rounded-lg fixed top-10 inset-10 lg:inset-20 max-h-20 lg:max-h-14">
          {state.error}
        </section>
      }

      { /* Tabla sm */}
      <table className="w-full text-left min-h-[80vh] lg:hidden">
        <thead className="border-b">
          <tr>
            <th className="p-2 w-2/3">
              <div className="flex gap-2 items-center">
                <CircleStackIcon className="h-7" />
                Datos
              </div>
            </th>
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
                      {!opened && ` - ${register.stockAmountReturn.toFixed(2)}${stockType.substring(0, 2)}`}
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
                          }}/>
                      }
                    </div>
                    <div className="text-xs opacity-80">
                      {new Date(register.registerFrom).toLocaleDateString("es-ES",
                        { day: "2-digit", month: "2-digit", year: "2-digit" })}
                      {!opened && ' - ' + new Date(register.registerTo).toLocaleDateString("es-ES",
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
                      <AppButtonSuccess onClick={() => closeRegister(register) } disabled={isLoading}
                      className={isLoading ? 'bg-opacity-50' : ''}>
                        <ArrowUturnDownIcon className="h-7"/>
                      </AppButtonSuccess>
                    }
                    <AppButtonError onClick={() => deleteRegister(register.id)}
                      className={isLoading ? 'bg-opacity-50' : ''}
                      disabled={isLoading}>
                      <Delete />
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
              <div className="flex justify-e items-center">
                <AppButtonTransparent onClick={() => updateQueryParams({ pageIndex: 0 })}>
                  <DoubleArrowLeft />
                </AppButtonTransparent>
                <AppButtonTransparent onClick={() =>
                  updateQueryParams({ pageIndex: Math.max(0, (queryParams.pageIndex || 0) - 1) })}>
                  <ArrowLeft />
                </AppButtonTransparent>
                <div className="flex gap-2 justify-center w-full whitespace-nowrap">
                  Página
                  <AppNumberInputSm min={1} max={state.totalPages} value={(queryParams.pageIndex || 0) + 1}
                    onChange={(e) =>
                      updateQueryParams({ pageIndex: Math.max(0, Math.min(state.totalPages - 1, Number(e.target.value) - 1)) })}/>
                  de {state.totalPages}
                </div>
              </div>
            </td>
            <td className="pt-2">
              <div className="flex justify-end items-center ">
                <AppButtonTransparent onClick={() =>
                  updateQueryParams({ pageIndex: Math.min(state.totalPages, (queryParams.pageIndex || 0) + 1) })}>
                  <ArrowRight />
                </AppButtonTransparent>
                <AppButtonTransparent onClick={() => updateQueryParams({ pageIndex: state.totalPages - 1 })}>
                  <DoubleArrowRight />
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
            <AppTableHeaderCellMd><UserIcon className="h-7" />Voluntario</AppTableHeaderCellMd>
            <AppTableHeaderCellMd><BeakerIcon className="h-7" />Consumible</AppTableHeaderCellMd>
            <AppTableHeaderCellMd><CircleStackIcon className="h-7" />Stock</AppTableHeaderCellMd>
            <AppTableHeaderCellMd><CalendarIcon className="h-7" />Fechas</AppTableHeaderCellMd>
            <AppTableHeaderCellMd><QueueListIcon className="h-7" />Estado</AppTableHeaderCellMd>
            <th className="p-2 flex justify-end">
              <AppButtonTransparent onClick={toggleShowFilters} className={showFilters ? 'bg-primary-6' : ''}>
                <Bars2Icon className="h-7" />
              </AppButtonTransparent>
            </th>
          </tr>
          <tr className={`${showFilters ? '' : 'hidden'}`}>
            <AppTableHeaderCellMd>
              <AppTextInput placeholder="Nombre o BA Id..." value={queryParams.volunteer}
                onChange={(e) => updateQueryParams({ volunteer: e.target.value, pageIndex: 0 })}/>
            </AppTableHeaderCellMd>
            <th className="p-2 w-1/5 font-normal">
              <AppTextInput placeholder="Nombre o código de barras..." value={queryParams.consumable}
                onChange={(e) => updateQueryParams({ consumable: e.target.value, pageIndex: 0 })} />
            </th>
            <AppTableHeaderCellMd className="gap-6">              
                <AppButtonTransparent
                  onClick={() => updateQueryParams({ sortField: 'stockAmountRequest', descOrder: !queryParams.descOrder })}>
                  <ArrowUpDown />
                </AppButtonTransparent> -
                <AppButtonTransparent
                  onClick={() => updateQueryParams({ sortField: 'stockAmountReturn', descOrder: !queryParams.descOrder })}>
                  <ArrowUpDown />
                </AppButtonTransparent>
            </AppTableHeaderCellMd>
            <AppTableHeaderCellMd className="gap-7">
              <AppButtonTransparent
                onClick={() => updateQueryParams({ sortField: 'registerFrom', descOrder: !queryParams.descOrder })}>
                <ArrowUpDown />
              </AppButtonTransparent> -
              <AppButtonTransparent
                onClick={() => updateQueryParams({ sortField: 'registerTo', descOrder: !queryParams.descOrder })}>
                <ArrowUpDown />
              </AppButtonTransparent>
            </AppTableHeaderCellMd>
            <AppTableHeaderCellMd>
              <AppSelect value={queryParams.status}
                onChange={(e) => updateQueryParams({ status: e.target.value, pageIndex: 0 })}
                options={[
                  { name: 'Cualquiera', value: '' },
                  { name: 'Abierto', value: 'OPENED' },
                  { name: 'Cerrado', value: 'CLOSED' },
                ]}>

              </AppSelect>
            </AppTableHeaderCellMd>
            <th className="p-2 font-normal flex justify-end">
              <AppButtonTransparent 
                onClick={() =>
                  updateQueryParams({ volunteer: '', consumable: '', status: '', sortField: 'id', descOrder: true })}>
                <Close />
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
            const stockType = register.consumable.stockType.toLocaleLowerCase()
            const isLoading = state.status === 'loading'
            const opened = !register.registerTo

            return (
              <tr key={register.id} className="align-top h-16">
                <AppTableCellMd>{register.volunteerName} {register.volunteerLastName}</AppTableCellMd>
                <AppTableCellMd>{register.consumable.name}</AppTableCellMd>
                <AppTableCellMd>
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
                          }}/>
                        : <span>{`${register.stockAmountReturn.toFixed(2)}${stockType.substring(0, 2)}`}</span>
                    }
                  </div>
                </AppTableCellMd>
                <AppTableCellMd>
                  {new Date(register.registerFrom).toLocaleDateString("es-ES",
                    { day: "2-digit", month: "2-digit", year: "2-digit" })}
                  {!opened && ' - ' + new Date(register.registerTo).toLocaleDateString("es-ES",
                    { day: "2-digit", month: "2-digit", year: "2-digit" })}
                </AppTableCellMd>
                <AppTableCellMd>{opened ? 'Abierto' : 'Cerrado'}</AppTableCellMd>
                <AppTableCellMd className="p-2">
                  <div className="flex gap-2 justify-end">
                    {
                      opened &&
                      <AppButtonSuccess onClick={() => { closeRegister(register) }} disabled={isLoading}
                        className={isLoading ? 'bg-opacity-50' : ''}>
                        <ArrowTurnDown />
                      </AppButtonSuccess>
                    }
                    <AppButtonError onClick={() => deleteRegister(register.id)} disabled={isLoading}
                      className={isLoading ? 'bg-opacity-50' : ''}>
                      <Delete />
                    </AppButtonError>
                  </div>
                </AppTableCellMd>
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          <tr className="border-t">
            <AppTableCellMd>
              <div className="flex items-center">
                <AppButtonTransparent onClick={() => updateQueryParams({ pageIndex: 0 })}>
                  <DoubleArrowLeft />
                </AppButtonTransparent>
                <AppButtonTransparent onClick={() =>
                  updateQueryParams({ pageIndex: Math.max(0, (queryParams.pageIndex || 0) - 1) })}>
                  <ArrowLeft />
                </AppButtonTransparent>
              </div>
            </AppTableCellMd>
            <AppTableCellMd/>
            <AppTableCellMd>
              <div className="flex gap-2 justify-end whitespace-nowrap">
                Página
                <AppNumberInputSm min={1} max={state.totalPages} value={(queryParams.pageIndex || 0) + 1}
                  onChange={(e) =>
                    updateQueryParams({ pageIndex: Math.max(0, Math.min(state.totalPages - 1, Number(e.target.value) - 1)) })}/>
                de {state.totalPages}
              </div>
            </AppTableCellMd>
            <AppTableCellMd/>
            <AppTableCellMd/>
            <AppTableCellMd>
              <div className="flex justify-end items-center">
                <AppButtonTransparent onClick={() =>
                  updateQueryParams({ pageIndex: Math.min(state.totalPages, (queryParams.pageIndex || 0) + 1) })}>
                  <ArrowRight />
                </AppButtonTransparent>
                <AppButtonTransparent onClick={() => updateQueryParams({ pageIndex: state.totalPages - 1 })}>
                  <DoubleArrowRight />
                </AppButtonTransparent>
              </div>
            </AppTableCellMd>
          </tr>
        </tfoot>
      </table>
      { /* Tabla desktop */}
      <table className="w-full text-left min-h-[80vh] hidden xl:[display:table]">
        <thead className="border-b">
          <tr>
            <AppTableHeaderCellLg><UserIcon className="h-7" />Voluntario</AppTableHeaderCellLg>
            <AppTableHeaderCellLg><BeakerIcon className="h-7" />Consumible</AppTableHeaderCellLg>
            <AppTableHeaderCellLg><CircleStackIcon className="h-7" />Stock entregado</AppTableHeaderCellLg>
            <AppTableHeaderCellLg><CalendarIcon className="h-7" />Entrega</AppTableHeaderCellLg>
            <AppTableHeaderCellLg><CircleStackIcon className="h-7" />Stock devuelto</AppTableHeaderCellLg>
            <AppTableHeaderCellLg><CalendarIcon className="h-7" />Devolución</AppTableHeaderCellLg>
            <AppTableHeaderCellLg><QueueListIcon className="h-7" />Estado</AppTableHeaderCellLg>
            <AppTableHeaderCellLg className="justify-end">
              <AppButtonTransparent onClick={toggleShowFilters} className={showFilters ? 'bg-primary-6' : ''}>
                <MenuSmall />
              </AppButtonTransparent>
            </AppTableHeaderCellLg>
          </tr>
          <tr className={`${showFilters ? '' : 'hidden'}`}>
            <AppTableHeaderCellLg>
              <AppTextInput placeholder="Nombre o BA Id..." value={queryParams.volunteer}
                onChange={(e) => updateQueryParams({ volunteer: e.target.value, pageIndex: 0 })} />
            </AppTableHeaderCellLg>
            <AppTableHeaderCellLg>
              <AppTextInput placeholder="Nombre o código de barras..." value={queryParams.consumable}
                onChange={(e) => updateQueryParams({ consumable: e.target.value, pageIndex: 0 })} />
            </AppTableHeaderCellLg>
            <AppTableHeaderCellLg>
              <AppButtonTransparent
                onClick={() => updateQueryParams({ sortField: 'stockAmountRequest', descOrder: !queryParams.descOrder })}>
                <ArrowUpDown />
              </AppButtonTransparent>
            </AppTableHeaderCellLg>
            <AppTableHeaderCellLg>
              <AppButtonTransparent
                onClick={() => updateQueryParams({ sortField: 'registerFrom', descOrder: !queryParams.descOrder })}>
                <ArrowUpDown />
              </AppButtonTransparent>
            </AppTableHeaderCellLg>
            <AppTableHeaderCellLg>
              <AppButtonTransparent
                onClick={() => updateQueryParams({ sortField: 'stockAmountReturn', descOrder: !queryParams.descOrder })}>
                <ArrowUpDown />
              </AppButtonTransparent>
            </AppTableHeaderCellLg>
            <AppTableHeaderCellLg>
              <AppButtonTransparent
                onClick={() => updateQueryParams({ sortField: 'registerTo', descOrder: !queryParams.descOrder })}>
                <ArrowUpDown />
              </AppButtonTransparent>
            </AppTableHeaderCellLg>
            <AppTableHeaderCellLg>
              <AppSelect
                value={queryParams.status}
                onChange={(e) => updateQueryParams({ status: e.target.value, pageIndex: 0 })}
                options={[
                  { value:"", name: "Cualquiera"},
                  { value:"OPENED", name: "Abierto"},
                  { value:"CLOSED", name: "Cerrado"}
              ]}>                
              </AppSelect>
            </AppTableHeaderCellLg>
            <AppTableHeaderCellLg className="justify-end">
              <AppButtonTransparent
                onClick={() =>
                  updateQueryParams({ volunteer: '', consumable: '', status: '', sortField: 'id', descOrder: true })}>
                <Close />
              </AppButtonTransparent>
            </AppTableHeaderCellLg>
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
            const stockType = register.consumable.stockType.toLocaleLowerCase()
            const isLoading = state.status === 'loading'
            const opened = !register.registerTo

            return (
              <tr key={register.id} className="align-top h-16">
                <AppTableCellLg>{register.volunteerName} {register.volunteerLastName}</AppTableCellLg>
                <AppTableCellLg>{register.consumable.name} </AppTableCellLg>
                <AppTableCellLg>{`${register.stockAmountRequest} ${stockType}`} </AppTableCellLg>
                <AppTableCellLg>{new Date(register.registerFrom).toLocaleDateString("es-ES")} </AppTableCellLg>
                <AppTableCellLg>
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
                      }}/>
                    : `${register.stockAmountReturn} ${stockType}`}
                </AppTableCellLg>
                <AppTableCellLg> {!opened && new Date(register.registerTo).toLocaleDateString("es-ES")}</AppTableCellLg>
                <AppTableCellLg>{opened ? 'Abierto' : 'Cerrado'}</AppTableCellLg>
                <AppTableCellLg>
                  <div className="flex gap-2 justify-end">
                    {
                      opened &&
                      <AppButtonSuccess onClick={() => { closeRegister(register) }} disabled={isLoading}
                        className={isLoading ? 'bg-opacity-50' : ''}>
                        <ArrowTurnDown />
                      </AppButtonSuccess>
                    }
                    <AppButtonError onClick={() => deleteRegister(register.id)} disabled={isLoading}
                      className={isLoading ? 'bg-opacity-50' : ''}>
                      <Delete />
                    </AppButtonError>
                  </div>
                </AppTableCellLg>
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          <tr className="border-t">
            <AppTableCellLg>
              <div className="flex items-center">
                <AppButtonTransparent onClick={() => updateQueryParams({ pageIndex: 0 })}>
                  <DoubleArrowLeft />
                </AppButtonTransparent>
                <AppButtonTransparent onClick={() =>
                  updateQueryParams({ pageIndex: Math.max(0, (queryParams.pageIndex || 0) - 1) })}>
                  <ArrowLeft />
                </AppButtonTransparent>
              </div>
            </AppTableCellLg>
            <AppTableCellLg></AppTableCellLg>
            <AppTableCellLg> </AppTableCellLg>
            <AppTableCellLg>
              <div className="flex gap-2 justify-end whitespace-nowrap">
                Página
                <AppNumberInputSm min={1} max={state.totalPages} value={(queryParams.pageIndex || 0) + 1}
                  onChange={(e) =>
                    updateQueryParams({ pageIndex: Math.max(0, Math.min(state.totalPages - 1, Number(e.target.value) - 1)) })} />                
                <span>de {state.totalPages}</span>
              </div>
            </AppTableCellLg>
            <AppTableCellLg/>
            <AppTableCellLg/>
            <AppTableCellLg/>
            <AppTableCellLg>
              <div className="flex justify-end items-center">
                <AppButtonTransparent onClick={() =>
                  updateQueryParams({ pageIndex: Math.min(state.totalPages, (queryParams.pageIndex || 0) + 1) })}>
                  <ArrowRight />
                </AppButtonTransparent>
                <AppButtonTransparent onClick={() => updateQueryParams({ pageIndex: state.totalPages - 1 })}>
                  <DoubleArrowRight />
                </AppButtonTransparent>
              </div>
            </AppTableCellLg>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}