import { FormEvent, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/store"
import { addVolunteer } from "../volunteersSlice"
import { toast } from "sonner"

export const useAddVolunteers = () => {
  const usersState = useAppSelector(state => state.users)
  const [modalOpened, setModalOpened] = useState(false)
  const dispatch = useAppDispatch()

  const handleAddVolunteer = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    if (!usersState.me) {
      toast.error('Imposible añadir el voluntario. Cierra sesión e inténtalo de nuevo.')
      return
    }

    const volunteer = {
      name: formData.get("volunteer-name") as string,
      lastName: formData.get("volunteer-lastName") as string,
      builderAssistantId: formData.get("volunteer-builderAssistantId") as string,
      isActive: (formData.get("volunteer-active") as string) === '',
      absences: [],
      availability: []
    }
    
    dispatch(addVolunteer(volunteer))
  }

  const handleToggleModal = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setModalOpened(!modalOpened)
  }

  return { handleAddVolunteer, handleToggleModal, modalOpened }
}