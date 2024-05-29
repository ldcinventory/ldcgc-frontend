import { CheckCircleIcon, PlusIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { AppButton, AppButtonSubmitSuccess, AppButtonTransparent } from "../../common/components/AppButton";
import { AppLabeledDateInput, AppLabeledTextInput, AppNumberInput } from "../../common/components/AppInput";
import { AppList } from "../../common/components/AppList";
import { useRegisterModal } from "./useRegisterModal";
import { Toaster } from "sonner";

export function AddRegistersModal() {
  const { register, toolsRegister, consumablesRegister, handleToggleModalOpened, handleSelectVolunteer, handleGetPossibleVolunteers, handleGetPossibleTools, handleSelectTool, handleRemoveSelectedTool, handleGetPossibleConsumables,
    handleSelectConsumable, handleRemoveSelectedConsumable, handleUpdateSelectedConsumable, handleAddRegisters, handleSetAddRegistersDate } = useRegisterModal()

  return (
    <>
      <Toaster />
      <AppButton className="flex gap-2 items-center py-2 px-12 lg:px-4 justify-self-start"
      onClick={handleToggleModalOpened}>
        <PlusIcon className="h-8" />Añadir registros
      </AppButton>
      <div className={`fixed h-screen w-screen bg-opacity-50 bg-primary-9 top-0 left-0 flex items-center justify-center z-10
      ${register.modalOpened ? '' : 'hidden'}`}>
        <section className={`bg-primary-3 dark:bg-primary-6 p-4 rounded-md w-4/5 md:w-1/2 xl:w-1/3 transition-all duration-300
        flex flex-col`}>
          <AppButtonTransparent className="self-end" onClick={handleToggleModalOpened}>
            <XMarkIcon className="h-7" />
          </AppButtonTransparent>
          <form onSubmit={handleAddRegisters} className="flex flex-col gap-4 items-center">
            <div className="relative rounded-md w-full">
              <AppLabeledTextInput placeholder="Voluntario..." id="volunteer_input"
                label={<>{register.selectedVolunteer !== null && <CheckCircleIcon className="h-6 text-success-4" />}Voluntario</>}
                value={register.currentVolunteer} onChange={handleGetPossibleVolunteers} />
              {
                register.possibleVolunteers?.length > 0 && register.selectedVolunteer === null &&
                <AppList items={register.possibleVolunteers.map(volunteer => {
                  return {
                    id: volunteer.id,
                    display: `${volunteer.name} ${volunteer.lastName}`,
                    onClick: () => handleSelectVolunteer(volunteer)
                  }
                })} />
              }
            </div>
            <div className="relative rounded-md w-full">
              <AppLabeledTextInput placeholder="Herramienta..." id="tool_input"
                label="Herramientas"
                value={toolsRegister.currentTool} onChange={handleGetPossibleTools} />
              {
                toolsRegister.possibleTools?.length > 0 &&
                <AppList items={toolsRegister.possibleTools.map(tool => {
                  return {
                    id: tool.id,
                    display: `${tool.name} - ${tool.brand.name} - ${tool.model}`,
                    onClick: () => handleSelectTool(tool)
                  }
                })}/>
              }
              {
                toolsRegister.selectedTools?.length > 0 &&
                <ul className="mt-4">
                    {toolsRegister.selectedTools.map(toolRegister => 
                      <li key={toolRegister.toolBarcode} className="flex items-center justify-between">
                        <span className="flex gap-2 text-sm"><CheckCircleIcon className="h-6 text-success-4" /> {`${toolRegister.toolName}  - ${toolRegister.toolBarcode}`}</span>
                        <AppButton onClick={() => handleRemoveSelectedTool(toolRegister)}><XCircleIcon className="h-6"/></AppButton> 
                      </li>)}
                </ul>

              }
            </div>
            <div className="relative rounded-md w-full">
              <AppLabeledTextInput placeholder="Consumible..." id="tool_input"
                label="Consumibles"
                value={consumablesRegister.currentConsumable} onChange={handleGetPossibleConsumables} />
              {
                consumablesRegister.possibleConsumables?.length > 0 &&
                <AppList items={consumablesRegister.possibleConsumables.map(consumible => {
                  return {
                    id: consumible.id,
                    display: `${consumible.name} - ${consumible.brand.name} - ${consumible.model}`,
                    onClick: () => handleSelectConsumable(consumible)
                  }
                })} />
              }
              {
                consumablesRegister.selectedConsumables?.length > 0 &&
                <ul className="mt-4 flex flex-col gap-4">
                    {consumablesRegister.selectedConsumables.map(consumableRegister =>
                        <li key={consumableRegister.consumableBarcode} className="flex flex-col items-start text-sm">
                          <div className="flex justify-between w-full">
                            <section className="flex gap-2">
                              {consumableRegister.stockAmountRequest > 0 && <CheckCircleIcon className="h-6 text-success-4" />}
                            {`${consumableRegister.consumableName} - ${consumableRegister.consumableBarcode}`}
                            </section>
                            <AppButton onClick={() => handleRemoveSelectedConsumable(consumableRegister)}><XCircleIcon className="h-6" /></AppButton>
                          </div>
                          <div className="flex gap-6 items-center">
                          <span className="whitespace-nowrap text-xs opacity-80">Stock entregado</span>
                          <AppNumberInput className="w-[45px]" min={0} max={consumableRegister.stockAvailable} step={'any'} value={consumableRegister.stockAmountRequest}
                            onChange={(e) => handleUpdateSelectedConsumable(
                              { ...consumableRegister, stockAmountRequest: Math.min(consumableRegister.stockAvailable, Math.max(0, Number(e.target.value))) })}
                            onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                              const input = e.target as HTMLInputElement
                              input.value = Math.min(consumableRegister.stockAvailable, Math.max(0, Number(input.value))).toString()
                            }}/>
                          </div>
                      </li>
                    )}
                </ul>

              }
            </div>
            <div className="relative rounded-md w-full">
              <AppLabeledDateInput value={register.registersAddDate.slice(0, 10)} label="Fecha" id="registers_date" onChange={handleSetAddRegistersDate}/>
            </div>
            <AppButtonSubmitSuccess className="p-2" disabled={!register.selectedVolunteer || (toolsRegister.selectedTools.length <= 0 &&
              (consumablesRegister.selectedConsumables.length <= 0 || consumablesRegister.selectedConsumables.some(register => register.stockAmountRequest <= 0)))}>
              Añadir registros
            </AppButtonSubmitSuccess>
            <span className="text-success-6 dark:text-success-4 p-2 rounded-md">{register.message}</span>
          </form>
        </section>
      </div>
    </>
  )
}