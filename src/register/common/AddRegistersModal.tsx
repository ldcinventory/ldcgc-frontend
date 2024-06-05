import {
  CheckCircleIcon,
  PlusIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  AppButton,
  AppButtonSubmitSuccess,
  AppButtonTransparent,
} from "../../common/components/AppButton";
import {
  AppLabeledDateInput,
  AppLabeledTextInput,
  AppNumberInput,
} from "../../common/components/AppInput";
import { AppList } from "../../common/components/AppList";
import { useRegisterModal } from "./useRegisterModal";
import { Toaster } from "sonner";

export function AddRegistersModal() {
  const {
    register,
    toolsRegister,
    consumablesRegister,
    handleToggleModalOpened,
    handleSelectVolunteer,
    handleGetPossibleVolunteers,
    handleGetPossibleTools,
    handleSelectTool,
    handleRemoveSelectedTool,
    handleGetPossibleConsumables,
    handleSelectConsumable,
    handleRemoveSelectedConsumable,
    handleUpdateSelectedConsumable,
    handleAddRegisters,
    handleSetAddRegistersDate,
  } = useRegisterModal();

  return (
    <>
      <Toaster />
      <AppButton
        className="flex items-center gap-2 justify-self-start px-12 py-2 lg:px-4"
        onClick={handleToggleModalOpened}
      >
        <PlusIcon className="h-8" />
        Añadir registros
      </AppButton>
      <div
        className={`fixed left-0 top-0 z-10 flex h-screen w-screen items-center justify-center bg-primary-9 bg-opacity-50 ${register.modalOpened ? "" : "hidden"}`}
      >
        <section
          className={`flex w-4/5 flex-col rounded-md bg-primary-3 p-4 transition-all duration-300 md:w-1/2 xl:w-1/3 dark:bg-primary-6`}
        >
          <AppButtonTransparent
            className="self-end"
            onClick={handleToggleModalOpened}
          >
            <XMarkIcon className="h-7" />
          </AppButtonTransparent>
          <form
            onSubmit={handleAddRegisters}
            className="flex flex-col items-center gap-4"
          >
            <div className="relative w-full rounded-md">
              <AppLabeledTextInput
                placeholder="Voluntario..."
                id="volunteer_input"
                label={
                  <>
                    {register.selectedVolunteer !== null && (
                      <CheckCircleIcon className="h-6 text-success-4" />
                    )}
                    Voluntario
                  </>
                }
                value={register.currentVolunteer}
                onChange={handleGetPossibleVolunteers}
              />
              {register.possibleVolunteers?.length > 0 &&
                register.selectedVolunteer === null && (
                  <AppList
                    items={register.possibleVolunteers.map((volunteer) => {
                      return {
                        id: volunteer.id,
                        display: `${volunteer.name} ${volunteer.lastName}`,
                        onClick: () => handleSelectVolunteer(volunteer),
                      };
                    })}
                  />
                )}
            </div>
            <div className="relative w-full rounded-md">
              <AppLabeledTextInput
                placeholder="Herramienta..."
                id="tool_input"
                label="Herramientas"
                value={toolsRegister.currentTool}
                onChange={handleGetPossibleTools}
              />
              {toolsRegister.possibleTools?.length > 0 && (
                <AppList
                  items={toolsRegister.possibleTools.map((tool) => {
                    return {
                      id: tool.id,
                      display: `${tool.name} - ${tool.brand.name} - ${tool.model}`,
                      onClick: () => handleSelectTool(tool),
                    };
                  })}
                />
              )}
              {toolsRegister.selectedTools?.length > 0 && (
                <ul className="mt-4">
                  {toolsRegister.selectedTools.map((toolRegister) => (
                    <li
                      key={toolRegister.toolBarcode}
                      className="flex items-center justify-between"
                    >
                      <span className="flex gap-2 text-sm">
                        <CheckCircleIcon className="h-6 text-success-4" />{" "}
                        {`${toolRegister.toolName}  - ${toolRegister.toolBarcode}`}
                      </span>
                      <AppButton
                        onClick={() => handleRemoveSelectedTool(toolRegister)}
                      >
                        <XCircleIcon className="h-6" />
                      </AppButton>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="relative w-full rounded-md">
              <AppLabeledTextInput
                placeholder="Consumible..."
                id="tool_input"
                label="Consumibles"
                value={consumablesRegister.currentConsumable}
                onChange={handleGetPossibleConsumables}
              />
              {consumablesRegister.possibleConsumables?.length > 0 && (
                <AppList
                  items={consumablesRegister.possibleConsumables.map(
                    (consumible) => {
                      return {
                        id: consumible.id,
                        display: `${consumible.name} - ${consumible.brand.name} - ${consumible.model}`,
                        onClick: () => handleSelectConsumable(consumible),
                      };
                    },
                  )}
                />
              )}
              {consumablesRegister.selectedConsumables?.length > 0 && (
                <ul className="mt-4 flex flex-col gap-4">
                  {consumablesRegister.selectedConsumables.map(
                    (consumableRegister) => (
                      <li
                        key={consumableRegister.consumableBarcode}
                        className="flex flex-col items-start text-sm"
                      >
                        <div className="flex w-full justify-between">
                          <section className="flex gap-2">
                            {consumableRegister.stockAmountRequest > 0 && (
                              <CheckCircleIcon className="h-6 text-success-4" />
                            )}
                            {`${consumableRegister.consumableName} - ${consumableRegister.consumableBarcode}`}
                          </section>
                          <AppButton
                            onClick={() =>
                              handleRemoveSelectedConsumable(consumableRegister)
                            }
                          >
                            <XCircleIcon className="h-6" />
                          </AppButton>
                        </div>
                        <div className="flex items-center gap-6">
                          <span className="whitespace-nowrap text-xs opacity-80">
                            Stock entregado
                          </span>
                          <AppNumberInput
                            className="w-[45px]"
                            min={0}
                            max={consumableRegister.stockAvailable}
                            step={"any"}
                            value={consumableRegister.stockAmountRequest}
                            onChange={(e) =>
                              handleUpdateSelectedConsumable({
                                ...consumableRegister,
                                stockAmountRequest: Math.min(
                                  consumableRegister.stockAvailable,
                                  Math.max(0, Number(e.target.value)),
                                ),
                              })
                            }
                            onKeyUp={(
                              e: React.KeyboardEvent<HTMLInputElement>,
                            ) => {
                              const input = e.target as HTMLInputElement;
                              input.value = Math.min(
                                consumableRegister.stockAvailable,
                                Math.max(0, Number(input.value)),
                              ).toString();
                            }}
                          />
                        </div>
                      </li>
                    ),
                  )}
                </ul>
              )}
            </div>
            <div className="relative w-full rounded-md">
              <AppLabeledDateInput
                value={register.registersAddDate.slice(0, 10)}
                label="Fecha"
                id="registers_date"
                onChange={handleSetAddRegistersDate}
              />
            </div>
            <AppButtonSubmitSuccess
              className="p-2"
              disabled={
                !register.selectedVolunteer ||
                (toolsRegister.selectedTools.length <= 0 &&
                  (consumablesRegister.selectedConsumables.length <= 0 ||
                    consumablesRegister.selectedConsumables.some(
                      (register) => register.stockAmountRequest <= 0,
                    )))
              }
            >
              Añadir registros
            </AppButtonSubmitSuccess>
            <span className="rounded-md p-2 text-success-6 dark:text-success-4">
              {register.message}
            </span>
          </form>
        </section>
      </div>
    </>
  );
}
