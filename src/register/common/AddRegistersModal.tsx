import { CheckCircleIcon, CheckIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { AppButton, AppButtonSubmit, AppButtonSubmitSuccess } from "../../common/components/AppButton";
import { AppLabeledTextInput } from "../../common/components/AppInput";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { getPossibleTools, getPossibleVolunteers, selectTool, selectVolunteer, setCurrentTool, setCurrentVolunteer, toggleModalOpened } from "./registerSlice";
import { AppList } from "../../common/components/AppList";

export function AddRegistersModal() {
  const state = useAppSelector(state => state.register)
  const dispatch = useAppDispatch()

  return (
    <>
      <AppButton className="flex gap-2 items-center py-2 px-12 lg:px-4 justify-self-start"
      onClick={() => dispatch(toggleModalOpened())}>
        <PlusIcon className="h-8" />Añadir registros
      </AppButton>
      <div className={`fixed h-screen w-screen bg-opacity-50 bg-primary-9 top-0 left-0 flex items-center justify-center
      ${state.modalOpened ? '' : 'hidden'}`}>
        <section className={`bg-primary-3 dark:bg-primary-6 p-4 rounded-md w-3/5 md:w-1/2 xl:w-1/3 transition-all duration-300
        flex flex-col`}>
          <AppButton className="self-end" onClick={() => dispatch(toggleModalOpened())}>
            <XMarkIcon className="h-7" />
          </AppButton>
          <form action="" className="flex flex-col gap-4 items-center">
            <div className="relative rounded-md w-full">
              <AppLabeledTextInput placeholder="Voluntario..." id="volunteer_input"
                label={<>{state.selectedVolunteer !== null && <CheckCircleIcon className="h-6 text-success-4" />}Voluntario</>}
                value={state.currentVolunteer} onChange={(e) => {
                  const inputValue = e.target.value
                  dispatch(setCurrentVolunteer(inputValue))
                  let volunteersParams
                  const baId = Number(inputValue)
                  if (isNaN(baId))
                    volunteersParams = { filterString: inputValue }
                  else
                    volunteersParams = { builderAssistantId: baId }
                  
                  dispatch(getPossibleVolunteers(volunteersParams))
                }} />
              {
                state.possibleVolunteers?.length > 0 && state.selectedVolunteer === null &&
                <ul className="z-10 absolute overflow-auto text-primary-9 dark:text-primary-1 flex flex-col gap-2 p-1 w-full rounded-md bg-primary-5">
                  {
                    state.possibleVolunteers?.map(v =>
                      <li key={v.id} onClick={() => { dispatch(selectVolunteer(v)) }}
                        className="hover:bg-primary-5 transition-colors duration-200">
                        {`${v.name} ${v.lastName} (${v.builderAssistantId})`}
                      </li>
                    )
                  }
                </ul>
              }
            </div>
            <div className="relative rounded-md w-full bg-primary-6">
              <AppLabeledTextInput placeholder="Herramienta..." id="tool_input"
                label={<>{state.selectedTools.length > 0 && <CheckCircleIcon className="h-6 text-success-4" />} Herramientas</>}
                value={state.currentTool} onChange={(e) => {
                  const newTool = e.target.value
                  dispatch(setCurrentTool(newTool))

                  const toolsParams = {filterString: newTool}
                  dispatch(getPossibleTools(toolsParams))
                }} />
              {
                state.possibleTools?.length > 0 &&
                <AppList items={state.possibleTools.map(tool => {
                  return {
                    id: tool.id,
                    display: tool.name,
                    onClick: () => dispatch(selectTool(tool))
                  }
                })}/>
              }
            </div>

            <AppButtonSubmitSuccess className="p-2" >Añadir registros</AppButtonSubmitSuccess>  
          </form>
        </section>
      </div>
    </>
  )
}