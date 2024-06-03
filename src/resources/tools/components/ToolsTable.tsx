import { Bars2Icon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon, ClipboardIcon, PencilIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { AppButton, AppButtonError, AppButtonTransparent } from "../../../common/components/AppButton";
import { AppTableCell, AppTableCell5, AppTableHeaderCell, AppTableHeaderCell5 } from "../../../common/components/AppTable";
import { useToolsTable } from "../hooks/useToolsTable";
import { AppNumberInputSm, AppNumberInputXs, AppTextInput } from "../../../common/components/AppInput";
import { toolStatusConverter } from "../tTools";
import { AppNavLink } from "../../../common/components/AppNavLink";

export function ToolsTable() {
  const { handleUpdateQueryParams, toggleShowFilters, handleOpenDeleteToolModal, queryParams, showFilters, state } = useToolsTable()
  return (
    <div className="bg-primary-2 dark:bg-primary-7 mb-10 rounded-xl lg:mx-auto px-4 pb-2">
      { /* Tabla sm */}
      <table className="w-full text-left min-h-[80vh] md:hidden">
        <thead className="border-b border-primary-1">
          <tr>
            <AppTableHeaderCell>Datos</AppTableHeaderCell>
            <AppTableHeaderCell className="flex justify-end">
              <AppButton onClick={toggleShowFilters} className={`${showFilters && 'bg-primary-3 dark:bg-primary-5'}`}>
                <Bars2Icon className="h-7" />
              </AppButton>
            </AppTableHeaderCell>
          </tr>
          <tr className={showFilters ? '' : 'hidden'}>
            <AppTableHeaderCell className="flex flex-col">
              <AppTextInput placeholder="Nombre" value={queryParams.name} onChange={(e) => handleUpdateQueryParams({ pageIndex: 0,  name: e.target.value })} />
              <AppTextInput placeholder="Código de barras" value={queryParams.barcode} onChange={(e) => handleUpdateQueryParams({ pageIndex: 0,  barcode: e.target.value })} />
              <AppTextInput placeholder="Ubicación" value={queryParams.location} onChange={(e) => handleUpdateQueryParams({ pageIndex: 0,  location: e.target.value })} />
              <AppTextInput placeholder="Marca" value={queryParams.brand} onChange={(e) => handleUpdateQueryParams({ pageIndex: 0,  brand: e.target.value })} />
              <AppTextInput placeholder="Modelo" value={queryParams.model} onChange={(e) => handleUpdateQueryParams({ pageIndex: 0,  model: e.target.value })} />
            </AppTableHeaderCell>
            <AppTableHeaderCell className="flex justify-end">
              <AppButtonTransparent onClick={() => handleUpdateQueryParams({ name: "", barcode: "", brand: "", model: "", location: "" })}>
                <XMarkIcon className="h-7" />
              </AppButtonTransparent>
            </AppTableHeaderCell>
          </tr>
        </thead>
        <tbody>
          {state.tools.map(tool =>
            <tr key={tool.id} className="align-top">
              <AppTableCell columns={2} className="flex-col">
                <div className="flex gap-2 whitespace-nowrap self-start">
                  <span className={`rounded-lg p-1 text-xs font-monospace font-bold
                    ${(tool.status === 'AVAILABLE' || tool.status === 'NEW') && 'bg-success-3 dark:bg-success-6'}
                    ${(tool.status === 'NOT_AVAILABLE' || tool.status === 'IN_MAINTENANCE') && 'bg-warning-3 dark:bg-warning-7'}
                    ${(tool.status === 'DAMAGED' || tool.status === 'DEPRECATED') && 'bg-error-3 dark:bg-error-7'}`}>
                    {toolStatusConverter(tool.status)}
                  </span>
                  {tool.name}
                </div>
                <div className="self-start">
                  <span className="font-barcode text-4xl mr-4">
                    {tool.barcode}
                  </span>
                  <AppButtonTransparent onClick={async () => await navigator.clipboard.writeText(tool.barcode)}>
                    <ClipboardIcon className="h-5" />
                  </AppButtonTransparent>
                </div>
                <span className="self-start">
                  {tool.location.name}
                </span>
                <small className="self-start">{tool.brand.name} [{tool.model}]</small>

              </AppTableCell>
              <AppTableCell columns={2} className="justify-end">
                <AppNavLink to={`/resources/tools/${tool.barcode}`} className="bg-primary-3 dark:bg-primary-5 p-1 rounded-md"><PencilIcon className="h-5" /> </AppNavLink>
                <AppButtonError onClick={() => handleOpenDeleteToolModal(tool)}>
                  <TrashIcon className="h-5" />
                </AppButtonError>
              </AppTableCell>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr className="border-t border-primary-1">
            <AppTableCell columns={2}>
              <div className="flex justify-between w-full">
                <section className="flex">
                  <AppButtonTransparent onClick={() => handleUpdateQueryParams({ pageIndex: 0 })}> <ChevronDoubleLeftIcon className="h-4" /> </AppButtonTransparent>
                  <AppButtonTransparent onClick={() => handleUpdateQueryParams({ pageIndex: (queryParams.pageIndex || 1) - 1 })}> <ChevronLeftIcon className="h-4" /> </AppButtonTransparent>
                </section>
                <section className="whitespace-nowrap text-sm flex gap-1">
                  Página
                  <AppNumberInputXs min={1} max={state.totalPages} value={(queryParams.pageIndex || 0) + 1}
                    onChange={(e) =>
                      handleUpdateQueryParams({ pageIndex: Math.max(0, Math.min(state.totalPages - 1, Number(e.target.value) - 1)) })} />
                  de {state.totalPages}
                </section>
              </div>
            </AppTableCell>
            <AppTableCell columns={2} className="flex justify-end" >
              <AppButtonTransparent onClick={() => handleUpdateQueryParams({ pageIndex: Math.min((queryParams.pageIndex || 0) + 1, state.totalPages - 1) })}>
                <ChevronRightIcon className="h-4" />
              </AppButtonTransparent>
              <AppButtonTransparent onClick={() => handleUpdateQueryParams({ pageIndex: state.totalPages - 1 })}> <ChevronDoubleRightIcon className="h-4" /></AppButtonTransparent>
            </AppTableCell>
          </tr>
        </tfoot>
      </table>

      { /* Tabla md */}
      <table className="w-full text-left min-h-[80vh] hidden md:[display:table] lg:hidden">
        <thead className="border-b border-primary-1">
          <tr>
            <AppTableHeaderCell>Herramienta</AppTableHeaderCell>
            <AppTableHeaderCell>Código de barras</AppTableHeaderCell>
            <AppTableHeaderCell>Ubicación</AppTableHeaderCell>
            <AppTableHeaderCell>
              <AppButton onClick={toggleShowFilters} className={`${showFilters && 'bg-primary-3 dark:bg-primary-5'}`}>
                <Bars2Icon className="h-7" />
              </AppButton>
            </AppTableHeaderCell>
          </tr>
          <tr className={showFilters ? '' : 'hidden'}>
            <AppTableHeaderCell className="flex flex-col">
              <AppTextInput placeholder="Nombre" value={queryParams.name} onChange={(e) => handleUpdateQueryParams({ pageIndex: 0, name: e.target.value })} />
              <AppTextInput placeholder="Marca" value={queryParams.brand} onChange={(e) => handleUpdateQueryParams({ pageIndex: 0, brand: e.target.value })} />
              <AppTextInput placeholder="Modelo" value={queryParams.model} onChange={(e) => handleUpdateQueryParams({ pageIndex: 0, model: e.target.value })} />
            </AppTableHeaderCell>
            <AppTableHeaderCell>
              <AppTextInput placeholder="19XG87F..." value={queryParams.barcode} onChange={(e) => handleUpdateQueryParams({ pageIndex: 0, barcode: e.target.value })} />
            </AppTableHeaderCell>
            <AppTableHeaderCell>
              <AppTextInput placeholder="Arcón, oficina..." value={queryParams.location} onChange={(e) => handleUpdateQueryParams({ pageIndex: 0, location: e.target.value })} />
            </AppTableHeaderCell>
            <AppTableHeaderCell>
              <AppButtonTransparent onClick={() => handleUpdateQueryParams({ name: "", barcode: "", brand: "", model: "", location: "" })}>
                <XMarkIcon className="h-7" />
              </AppButtonTransparent>
            </AppTableHeaderCell>
          </tr>
        </thead>
        <tbody>
          {state.tools.map(tool =>
            <tr key={tool.id} className="align-top">
              <AppTableCell columns={3} className="flex-col">
                <div className="flex gap-2 whitespace-nowrap self-start">
                  <span className={`rounded-lg p-1 text-xs font-monospace font-bold
                    ${(tool.status === 'AVAILABLE' || tool.status === 'NEW') && 'bg-success-3 dark:bg-success-6'}
                    ${(tool.status === 'NOT_AVAILABLE' || tool.status === 'IN_MAINTENANCE') && 'bg-warning-3 dark:bg-warning-7'}
                    ${(tool.status === 'DAMAGED' || tool.status === 'DEPRECATED') && 'bg-error-3 dark:bg-error-7'}`}>
                    {toolStatusConverter(tool.status)}
                  </span>
                  {tool.name}
                </div>
                <small className="self-start">{tool.brand.name} [{tool.model}]</small>

              </AppTableCell>
              <AppTableCell columns={3} className="whitespace-nowrap">
                <span className="font-barcode text-4xl mr-4">
                  {tool.barcode}
                </span>
                <AppButtonTransparent onClick={async () => await navigator.clipboard.writeText(tool.barcode)}>
                  <ClipboardIcon className="h-6" />
                </AppButtonTransparent>
              </AppTableCell>
              <AppTableCell columns={3}>
                {tool.location.name}
              </AppTableCell>
              <AppTableCell columns={3}>
                <AppNavLink to={`/resources/tools/${tool.barcode}`} className="bg-primary-3 dark:bg-primary-5 p-1 rounded-md"><PencilIcon className="h-6" /> </AppNavLink>
                <AppButtonError onClick={() => handleOpenDeleteToolModal(tool)}>
                  <TrashIcon className="h-6" />
                </AppButtonError>
              </AppTableCell>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr className="border-t border-primary-1">
            <AppTableCell columns={3}>
              <AppButtonTransparent onClick={() => handleUpdateQueryParams({ pageIndex: 0 })}> <ChevronDoubleLeftIcon className="h-6" /> </AppButtonTransparent>
              <AppButtonTransparent onClick={() => handleUpdateQueryParams({ pageIndex: (queryParams.pageIndex || 1) - 1 })}> <ChevronLeftIcon className="h-6" /> </AppButtonTransparent>
            </AppTableCell>
            <AppTableCell columns={3} className="justify-end">
              Página
              <AppNumberInputSm min={1} max={state.totalPages} value={(queryParams.pageIndex || 0) + 1}
                onChange={(e) =>
                  handleUpdateQueryParams({ pageIndex: Math.max(0, Math.min(state.totalPages - 1, Number(e.target.value) - 1)) })} />
            </AppTableCell>
            <AppTableCell columns={3}>
                de {state.totalPages}
            </AppTableCell>
            <AppTableCell columns={3} >
              <AppButtonTransparent onClick={() => handleUpdateQueryParams({ pageIndex: Math.min((queryParams.pageIndex || 0) + 1, state.totalPages - 1) })}>
                <ChevronRightIcon className="h-6" />
              </AppButtonTransparent>
              <AppButtonTransparent onClick={() => handleUpdateQueryParams({ pageIndex: state.totalPages - 1 })}> <ChevronDoubleRightIcon className="h-6" /></AppButtonTransparent>
            </AppTableCell>
          </tr>
        </tfoot>
      </table>
      
      { /* Tabla desktop */}
      <table className="w-full text-left min-h-[80vh] hidden lg:[display:table]">
        <thead className="border-b border-primary-1">
          <tr>
            <AppTableHeaderCell columns={6}>Herramienta</AppTableHeaderCell>
            <AppTableHeaderCell columns={6}>Código de barras</AppTableHeaderCell>
            <AppTableHeaderCell columns={6}>Marca</AppTableHeaderCell>
            <AppTableHeaderCell columns={6}>Modelo</AppTableHeaderCell>
            <AppTableHeaderCell columns={6}>Ubicación</AppTableHeaderCell>
            <AppTableHeaderCell columns={6}>Almacén</AppTableHeaderCell>
            <AppTableHeaderCell columns={6}>
              <AppButton onClick={toggleShowFilters} className={`${showFilters && 'bg-primary-3 dark:bg-primary-5'}`}>
                <Bars2Icon className="h-7" />
              </AppButton>
            </AppTableHeaderCell>
          </tr>
          <tr className={showFilters ? '' : 'hidden'}>
            <AppTableHeaderCell columns={6}>
              <AppTextInput placeholder="Martillo, destornillador..." value={queryParams.name} onChange={(e) => handleUpdateQueryParams({ pageIndex: 0, name: e.target.value })} />
            </AppTableHeaderCell>
            <AppTableHeaderCell columns={6}>
              <AppTextInput placeholder="19XG87F..." value={queryParams.barcode} onChange={(e) => handleUpdateQueryParams({ pageIndex: 0, barcode: e.target.value })} />
            </AppTableHeaderCell>
            <AppTableHeaderCell columns={6}>
              <AppTextInput placeholder="Bosch, Hilti..." value={queryParams.brand} onChange={(e) => handleUpdateQueryParams({ pageIndex: 0, brand: e.target.value })} />
            </AppTableHeaderCell>
            <AppTableHeaderCell columns={6}>
              <AppTextInput placeholder="B2..." value={queryParams.model} onChange={(e) => handleUpdateQueryParams({ pageIndex: 0, model: e.target.value })} />
            </AppTableHeaderCell>
            <AppTableHeaderCell columns={6}>
              <AppTextInput placeholder="Betel, SR Guadalajara..." value={queryParams.location} onChange={(e) => handleUpdateQueryParams({ pageIndex: 0, location: e.target.value })} />
            </AppTableHeaderCell>
            <AppTableHeaderCell columns={6} />
            <AppTableHeaderCell columns={6}>
              <AppButtonTransparent onClick={() => handleUpdateQueryParams({ name: "", barcode: "", brand: "", model: "", location: "" })}>
                <XMarkIcon className="h-7" />
              </AppButtonTransparent>
            </AppTableHeaderCell>
          </tr>
        </thead>
        <tbody>
          {state.tools.map(tool =>
            <tr key={tool.id} className="align-top">
              <AppTableCell columns={6}>
                <div className="flex gap-2 whitespace-nowrap self-start">
                  <span className={`rounded-lg p-1 text-xs font-monospace font-bold
                    ${(tool.status === 'AVAILABLE' || tool.status === 'NEW') && 'bg-success-3 dark:bg-success-6'}
                    ${(tool.status === 'NOT_AVAILABLE' || tool.status === 'IN_MAINTENANCE') && 'bg-warning-3 dark:bg-warning-7'}
                    ${(tool.status === 'DAMAGED' || tool.status === 'DEPRECATED') && 'bg-error-3 dark:bg-error-7'}`}>
                    {toolStatusConverter(tool.status)}
                  </span>
                  {tool.name}
                </div>
              </AppTableCell>
              <AppTableCell columns={6}>
                <span className="font-barcode text-2xl xl:text-4xl mr-4">
                  {tool.barcode}
                </span>
                <AppButtonTransparent onClick={async () => await navigator.clipboard.writeText(tool.barcode)} >
                  <ClipboardIcon className="h-4 xl:h-6" />
                </AppButtonTransparent>
              </AppTableCell>
              <AppTableCell columns={6}>{tool.brand.name}</AppTableCell>
              <AppTableCell columns={6}>{tool.model}</AppTableCell>
              <AppTableCell columns={6}>
                {tool.group.location.name}
              </AppTableCell>
              <AppTableCell columns={6}>
                {tool.location.name}
              </AppTableCell>
              <AppTableCell columns={6}>
                <AppNavLink to={`/resources/tools/${tool.barcode}`} className="bg-primary-3 dark:bg-primary-5 p-1 rounded-md"><PencilIcon className="h-6" /> </AppNavLink>
                <AppButtonError onClick={() => handleOpenDeleteToolModal(tool)}>
                  <TrashIcon className="h-6" />
                </AppButtonError>
              </AppTableCell>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr className="border-t border-primary-1">
            <AppTableCell columns={6}>
              <AppButtonTransparent onClick={() => handleUpdateQueryParams({ pageIndex: 0 })}> <ChevronDoubleLeftIcon className="h-6" /> </AppButtonTransparent>
              <AppButtonTransparent onClick={() => handleUpdateQueryParams({ pageIndex: (queryParams.pageIndex || 1) - 1 })}> <ChevronLeftIcon className="h-6" /> </AppButtonTransparent>
            </AppTableCell>
            <AppTableCell columns={6} />
            <AppTableCell columns={6}>
              <div className="flex gap-2 whitespace-nowrap justify-end">
                Página
                <AppNumberInputSm min={1} max={state.totalPages} value={(queryParams.pageIndex || 0) + 1}
                  onChange={(e) =>
                    handleUpdateQueryParams({ pageIndex: Math.max(0, Math.min(state.totalPages - 1, Number(e.target.value) - 1)) })} />
                de {state.totalPages}
              </div>
            </AppTableCell>
            <AppTableCell columns={6} />
            <AppTableCell columns={6} />
            <AppTableCell columns={6} >
              <AppButtonTransparent onClick={() => handleUpdateQueryParams({ pageIndex: Math.min((queryParams.pageIndex || 0) + 1, state.totalPages - 1) })}>
                <ChevronRightIcon className="h-6" />
              </AppButtonTransparent>
              <AppButtonTransparent onClick={() => handleUpdateQueryParams({ pageIndex: state.totalPages - 1 })}> <ChevronDoubleRightIcon className="h-6" /></AppButtonTransparent>
            </AppTableCell>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}