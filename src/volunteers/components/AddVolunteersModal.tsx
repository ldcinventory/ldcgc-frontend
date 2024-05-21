import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { AppButton, AppButtonSubmit } from "../../common/components/AppButton"
import { AppLabeledCheckboxInput, AppLabeledTextInput } from "../../common/components/AppInput"
import { useAddVolunteers } from "../hooks/useAddVolunteers"
import { Toaster } from "sonner"

export const AddVolunteersModal = () => {
  const { handleAddVolunteer, handleToggleModal, modalOpened } = useAddVolunteers()

  return (
    <>
      <Toaster />
      <AppButton className="flex gap-2 max-w-[180px] p-2 items-center" onClick={handleToggleModal}><PlusIcon className="h-7"/> Añadir voluntario</AppButton>
      <section className={`bg-primary-9 absolute w-full h-screen top-0 left-0 bg-opacity-50 flex items-center ${!modalOpened && 'hidden'}`}>
        <form className="w-4/5 sm:w-2/3 lg:w-1/3 transition-all m-auto bg-primary-2 dark:bg-primary-7 py-4 px-6 rounded-lg z-10 flex flex-col gap-4" onSubmit={handleAddVolunteer} id="addVolunteerForm">
          <h1 className="self-center text-xl font-bold">Añadir voluntario</h1>
          <AppButton className="self-end" onClick={handleToggleModal}> <XMarkIcon className="h-6" /></AppButton>
          <AppLabeledTextInput label="Nombre" id="volunteer-name" name="volunteer-name" />
          <AppLabeledTextInput label="Apellidos" id="volunteer-lastName" name="volunteer-lastName" />
          <AppLabeledTextInput label="Id de Builder Assistant" id="volunteer-builderAssistantId" name="volunteer-builderAssistantId" />
          <AppLabeledCheckboxInput label="Activo" id="volunteer-active" name="volunteer-active" className="w-6 h-6" />
          <AppButtonSubmit className="bg-primary-3 self-center p-2">Crear voluntario</AppButtonSubmit>      
        </form>
      </section>
    </>
  )
}