import {
  ArrowUturnDownIcon, Bars2Icon, CalendarIcon, ChevronDoubleLeftIcon, CircleStackIcon, QueueListIcon, UserIcon, WrenchIcon,
  ArrowsUpDownIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon, TrashIcon, XMarkIcon
 } from "@heroicons/react/24/outline"
import { AppNumberInputSm, AppTextInput } from "../../../common/components/AppInput"
import { AppSelect } from "../../../common/components/AppSelect"
import { AppButtonError, AppButtonSuccess, AppButtonTransparent } from "../../../common/components/AppButton"
import { AppTableHeaderCell5, AppTableCell5 } from "../../../common/components/AppTable"
import { toDateString } from "../../../utils/DateUtils"
import { useToolsRegisterTable } from "../hooks/useToolRegister.js"

export function ToolsRegister() {
  const {
    state,
    closeRegister,
    deleteRegister,
    queryParams,
    updateQueryParams,
    showFilters,
    toggleShowFilters
  } = useToolsRegisterTable()
  return (

    <div className="bg-primary-4 dark:bg-primary-7 mb-10 rounded-xl mx-5 lg:mx-auto px-4 pb-2">
      {
        state.status === 'failed' &&
        <section
          className="z-10 text-center p-4 text-error-6 dark:text-error-1 bg-error-1 dark:bg-error-9
           rounded-lg fixed top-10 inset-10 lg:inset-20 max-h-20 lg:max-h-14">
          {state.error}
        </section>
      }

      { /* Table mobile */}
      <table className="w-full text-left min-h-[80vh] lg:hidden table-fixed">
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
                <AppTextInput value={queryParams.tool} placeholder="Herramienta..."
                  onChange={(e) => updateQueryParams({ tool: e.target.value, pageIndex: 0 })} />
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
                  updateQueryParams({ volunteer: '', tool: '', status: '', descOrder: true })}>
                <TrashIcon className="h-7" />
              </AppButtonTransparent>
            </th>
          </tr>
        </thead>
        <tbody className="h-full">
          {
            state.status === 'loading' && state.toolsRegister.length === 0 &&
            <tr>
              <td className="text-center align-top p-4">
                Cargando...
              </td>
            </tr>
          }
          {
            state.toolsRegister.length !== 0 && state.toolsRegister.map(register => {
              const isLoading = state.status === 'loading'
              const opened = !register.registerTo

              return (
                <tr key={register.id} className="align-top h-16">
                  <td className="p-2 w-2/3">
                    <div className="flex flex-col">
                      <span>{register.volunteerName} {register.volunteerLastName}</span>
                      <span className="opacity-90">{register.toolName}</span>
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
              <div className="flex justify-e items-center">
                <AppButtonTransparent onClick={() => updateQueryParams({ pageIndex: 0 })}>
                  <ChevronDoubleLeftIcon className="h-7" />
                </AppButtonTransparent>
                <AppButtonTransparent onClick={() =>
                  updateQueryParams({ pageIndex: Math.max(0, (queryParams.pageIndex || 0) - 1) })}>
                  <ChevronLeftIcon className="h-7" />
                </AppButtonTransparent>
                <div className="flex gap-2 justify-center w-full whitespace-nowrap">
                  Página
                  <AppNumberInputSm min={1} max={state.totalPages} value={(queryParams.pageIndex || 0) + 1}
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
                  <ChevronRightIcon className="h-7" />
                </AppButtonTransparent>
                <AppButtonTransparent onClick={() => updateQueryParams({ pageIndex: state.totalPages - 1 })}>
                  <ChevronDoubleRightIcon className="h-7" />
                </AppButtonTransparent>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
      { /* Table desktop */}
      <table className="w-full text-left min-h-[80vh] hidden lg:[display:table]">
        <thead className="border-b">
          <tr>
            <AppTableHeaderCell5 ><UserIcon className="h-7" />Voluntario</AppTableHeaderCell5>
            <AppTableHeaderCell5><WrenchIcon className="h-7" />Herramienta</AppTableHeaderCell5>
            <AppTableHeaderCell5><CalendarIcon className="h-7" />Entrega</AppTableHeaderCell5>
            <AppTableHeaderCell5><CalendarIcon className="h-7" />Devolución</AppTableHeaderCell5>
            <AppTableHeaderCell5><QueueListIcon className="h-7" />Estado</AppTableHeaderCell5>
            <AppTableHeaderCell5 className="justify-end">
              <AppButtonTransparent onClick={toggleShowFilters} className={showFilters ? 'bg-primary-6' : ''}>
                <Bars2Icon className="h-7" />
              </AppButtonTransparent>
            </AppTableHeaderCell5>
          </tr>
          <tr className={`${showFilters ? '' : 'hidden'}`}>
            <AppTableHeaderCell5>
              <AppTextInput placeholder="Nombre o BA Id..." value={queryParams.volunteer}
                onChange={(e) => updateQueryParams({ volunteer: e.target.value, pageIndex: 0 })} />
            </AppTableHeaderCell5>
            <AppTableHeaderCell5>
              <AppTextInput placeholder="Nombre o código de barras..." value={queryParams.tool}
                onChange={(e) => updateQueryParams({ tool: e.target.value, pageIndex: 0 })} />
            </AppTableHeaderCell5>
            <AppTableHeaderCell5>
              <AppButtonTransparent
                onClick={() => updateQueryParams({ sortString: 'registerFrom', descOrder: !queryParams.descOrder })}>
                <ArrowsUpDownIcon className="h-7" />
              </AppButtonTransparent>
            </AppTableHeaderCell5>
            <AppTableHeaderCell5>
              <AppButtonTransparent
                onClick={() => updateQueryParams({ sortString: 'registerTo', descOrder: !queryParams.descOrder })}>
                <ArrowsUpDownIcon className="h-7" />
              </AppButtonTransparent>
            </AppTableHeaderCell5>
            <AppTableHeaderCell5>
              <AppSelect
                value={queryParams.status}
                onChange={(e) => updateQueryParams({ status: e.target.value, pageIndex: 0 })}
                options={[
                  { value: "", name: "Cualquiera" },
                  { value: "OPENED", name: "Abierto" },
                  { value: "CLOSED", name: "Cerrado" }
                ]}>
              </AppSelect>
            </AppTableHeaderCell5>
            <AppTableHeaderCell5 className="justify-end">
              <AppButtonTransparent
                onClick={() =>
                  updateQueryParams({ volunteer: '', tool: '', status: '', descOrder: true })}>
                <XMarkIcon className="h-7" />
              </AppButtonTransparent>
            </AppTableHeaderCell5>
          </tr>
        </thead>
        <tbody className="h-full">
          {
            state.status === 'loading' && state.toolsRegister.length === 0 &&
            <tr>
              <td className="text-center align-top p-4">
                Cargando...
              </td>
            </tr>
          }
          {
            state.toolsRegister.length !== 0 && state.toolsRegister.map(register => {
              const isLoading = state.status === 'loading'
              const opened = !register.registerTo

              return (
                <tr key={register.id} className="align-top h-16">
                  <AppTableCell5>{register.volunteerName} {register.volunteerLastName}</AppTableCell5>
                  <AppTableCell5>{register.toolName} </AppTableCell5>
                  <AppTableCell5>{new Date(register.registerFrom).toLocaleDateString("es-ES")} </AppTableCell5>
                  <AppTableCell5> {!opened && toDateString(register.registerTo, "es-ES")}</AppTableCell5>
                  <AppTableCell5>{opened ? 'Abierto' : 'Cerrado'}</AppTableCell5>
                  <AppTableCell5>
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
                <AppNumberInputSm min={1} max={state.totalPages} value={(queryParams.pageIndex || 0) + 1}
                  onChange={(e) =>
                    updateQueryParams({ pageIndex: Math.max(0, Math.min(state.totalPages - 1, Number(e.target.value) - 1)) })} />
                <span>de {state.totalPages}</span>
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
    </div>
  )
}