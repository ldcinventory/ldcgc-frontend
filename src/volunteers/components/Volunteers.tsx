import { Toaster } from "sonner";
import { VolunteersTable } from "./VolunteersTable";
import { AddVolunteersModal } from "./AddVolunteersModal";
import { useState } from "react";
import { VolunteerDeleteModal } from "./VolunteerDeleteModal";
import { Volunteer, VolunteerWithId } from "../tVolunteers";

export function Volunteers() {
  const [showModal, setShowModal] = useState(false)
  const [volunteerToDelete, setVolunteerToDelete] = useState<VolunteerWithId | null>(null)

  const handleToggleModal = () => { setShowModal(!showModal) }
  const handleOpenModal = (volunteer: VolunteerWithId) => () => {
    setVolunteerToDelete(volunteer)
    handleToggleModal()
  }

  return (
    <>
      <Toaster />
      <section className="my-16 min-h-[77vh] flex flex-col gap-4">
        <VolunteerDeleteModal showModal={showModal } handleToggleModal={handleToggleModal} volunteer={volunteerToDelete}/>
        <AddVolunteersModal />
        <VolunteersTable handleOpenModal={handleOpenModal} />
      </section>
    </>
  )
}