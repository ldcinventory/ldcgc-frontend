import { ArrowUturnLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import { AppButton, AppButtonError } from "../../common/components/AppButton";

export function DeleteModal({ handleDeleteResource, handleCloseModal, resourceName, isHidden }:
  { handleDeleteResource: () => void, handleCloseModal: () => void, resourceName: string, isHidden: boolean }) {
  const handleDeleteAndClose = () => {
    handleDeleteResource()
    handleCloseModal()
  }

  return (
    <div className={`fixed min-h-screen bg-primary-9 w-full top-0 bg-opacity-50 left-0 flex justify-center items-center ${isHidden && 'hidden'}`}>
      <section className="flex flex-col items-center bg-primary-3 px-4 py-10 rounded-xl max-w-[90%]">
        <span>¿Estás seguro de que quieres eliminar el siguiente recurso?</span>
        <strong>{resourceName}</strong>
        <div className="flex justify-center w-full gap-4 mt-10">
          <AppButtonError onClick={handleDeleteAndClose} className="flex gap-2 p-2"><TrashIcon className="h-6" />Eliminar</AppButtonError>
          <AppButton onClick={handleCloseModal} className="flex gap-2 p-2"><ArrowUturnLeftIcon className="h-6" />Cancelar</AppButton>
        </div>
      </section>
    </div>
  )
}