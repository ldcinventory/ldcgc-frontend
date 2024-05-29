import { AppButton, AppButtonError } from "../../common/components/AppButton";
import { useVolunteers } from "../hooks/useVolunteers";
import { VolunteerWithId } from "../tVolunteers";

export const VolunteerDeleteModal = ({ showModal, volunteer, handleToggleModal }: { showModal: boolean, volunteer: VolunteerWithId | null, handleToggleModal: () => void }) => {
  const { handleDeleteVolunteer } = useVolunteers()
  
  if (volunteer === null)
    return <></>

  const handleClickDelete = () => {
    handleDeleteVolunteer(volunteer.builderAssistantId)
    handleToggleModal()
  }

  
  return (
    <div className={`${!showModal && 'hidden'} absolute w-screen h-screen flex items-center justify-center bg-primary-9 bg-opacity-50 top-0 left-0`}>
      <section className="bg-primary-2 dark:bg-primary-7 flex flex-col px-10 py-4 rounded-md gap-10">
        ¿Quieres eliminar el voluntario {`${volunteer.name} ${volunteer.lastName}`}?
        <nav className="flex w-full items-center justify-center gap-2">
          <AppButtonError onClick={handleClickDelete} className="px-2">Eliminar</AppButtonError>
          <AppButton onClick={handleToggleModal} className="px-2">Cancelar</AppButton>
        </nav>
      </section>
    </div>
  )
}