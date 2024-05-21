import { Toaster } from "sonner";
import { VolunteersTable } from "./VolunteersTable";
import { AddVolunteersModal } from "./AddVolunteersModal";

export function Volunteers() {

  return (
    <>
      <Toaster />
      <section className="my-16 min-h-[77vh] flex flex-col gap-4">
        <AddVolunteersModal />
        <VolunteersTable />
      </section>
    </>
  )
}