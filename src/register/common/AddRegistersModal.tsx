import { CheckCircleIcon, PlusIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { AppButton, AppButtonSubmitSuccess, AppButtonTransparent } from "../../common/components/AppButton";
import { AppLabeledDateInput, AppLabeledTextInput, AppNumberInput } from "../../common/components/AppInput";
import { AppList } from "../../common/components/AppList";
import { useRegisterModal } from "./useRegisterModal";

export function AddRegistersModal() {
  const { state, handleToggleModalOpened, handleSelectVolunteer, handleGetPossibleVolunteers, handleGetPossibleTools, handleSelectTool, handleRemoveSelectedTool, handleGetPossibleConsumables,
    handleSelectConsumable, handleRemoveSelectedConsumable, handleUpdateSelectedConsumable, handleAddRegisters, handleSetAddRegistersDate } = useRegisterModal()

  return (
    <>
      <AppButton className="flex gap-2 items-center py-2 px-12 lg:px-4 justify-self-start"
      onClick={handleToggleModalOpened}>
        <PlusIcon className="h-8" />Añadir registros
      </AppButton>
      <div className={`fixed h-screen w-screen bg-opacity-50 bg-primary-9 top-0 left-0 flex items-center justify-center z-10
      ${state.modalOpened ? '' : 'hidden'}`}>
        <section className={`bg-primary-3 dark:bg-primary-6 p-4 rounded-md w-4/5 md:w-1/2 xl:w-1/3 transition-all duration-300
        flex flex-col`}>
          <AppButtonTransparent className="self-end" onClick={handleToggleModalOpened}>
            <XMarkIcon className="h-7" />
          </AppButtonTransparent>
          <form onSubmit={handleAddRegisters} className="flex flex-col gap-4 items-center">
            <div className="relative rounded-md w-full">
              <AppLabeledTextInput placeholder="Voluntario..." id="volunteer_input"
                label={<>{state.selectedVolunteer !== null && <CheckCircleIcon className="h-6 text-success-4" />}Voluntario</>}
                value={state.currentVolunteer} onChange={handleGetPossibleVolunteers} />
              {
                state.possibleVolunteers?.length > 0 && state.selectedVolunteer === null &&
                <AppList items={state.possibleVolunteers.map(volunteer => {
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
                value={state.currentTool} onChange={handleGetPossibleTools} />
              {
                state.possibleTools?.length > 0 &&
                <AppList items={state.possibleTools.map(tool => {
                  return {
                    id: tool.id,
                    display: tool.name,
                    onClick: () => handleSelectTool(tool)
                  }
                })}/>
              }
              {
                state.selectedTools?.length > 0 &&
                <ul className="mt-4">
                    {state.selectedTools.map(toolRegister => 
                      <li key={toolRegister.toolBarcode} className="flex items-center justify-between">
                        <span className="flex gap-2 text-sm"><CheckCircleIcon className="h-6 text-success-4" /> {toolRegister.toolName}</span>
                        <AppButton onClick={() => handleRemoveSelectedTool(toolRegister)}><XCircleIcon className="h-6"/></AppButton> 
                      </li>)}
                </ul>

              }
            </div>
            <div className="relative rounded-md w-full">
              <AppLabeledTextInput placeholder="Consumible..." id="tool_input"
                label="Consumibles"
                value={state.currentConsumable} onChange={handleGetPossibleConsumables} />
              {
                state.possibleConsumables?.length > 0 &&
                <AppList items={state.possibleConsumables.map(consumible => {
                  return {
                    id: consumible.id,
                    display: consumible.name,
                    onClick: () => handleSelectConsumable(consumible)
                  }
                })} />
              }
              {
                state.selectedConsumables?.length > 0 &&
                <ul className="mt-4 flex flex-col gap-4">
                    {state.selectedConsumables.map(consumableRegister =>
                        <li key={consumableRegister.consumableBarcode} className="flex flex-col items-start text-sm">
                          <div className="flex justify-between w-full">
                            <section className="flex gap-2">
                              {consumableRegister.stockAmountRequest > 0 && <CheckCircleIcon className="h-6 text-success-4" />}
                              {consumableRegister.consumableName}
                            </section>
                            <AppButton onClick={() => handleRemoveSelectedConsumable(consumableRegister)}><XCircleIcon className="h-6" /></AppButton>
                          </div>
                          <div className="flex gap-6 items-center">
                          <span className="whitespace-nowrap text-xs opacity-80">Stock entregado</span>
                          <AppNumberInput className="w-[45px]" min={0} value={consumableRegister.stockAmountRequest} onChange={(e) =>
                            handleUpdateSelectedConsumable({...consumableRegister, stockAmountRequest: Number(e.target.value)})} />
                          </div>
                      </li>
                    )}
                </ul>

              }
            </div>
            <div className="relative rounded-md w-full">
              <AppLabeledDateInput value={state.registersAddDate.slice(0, 10)} label="Fecha" id="registers_date" onChange={handleSetAddRegistersDate}/>
            </div>
            <AppButtonSubmitSuccess className="p-2" disabled={!state.selectedVolunteer || (state.selectedTools.length <= 0 &&
              (state.selectedConsumables.length <= 0 || state.selectedConsumables.some(register => register.stockAmountRequest <= 0)))}>
              Añadir registros
            </AppButtonSubmitSuccess> 
            <span className="text-success-6 dark:text-success-4 p-2 rounded-md">{state.message}</span>
          </form>
        </section>
      </div>
    </>
  )
}