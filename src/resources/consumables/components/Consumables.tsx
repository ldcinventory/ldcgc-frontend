import { Toaster } from "sonner";
import { ConsumablesDeleteModal } from "./ConsumablesDeleteModal";
import { ConsumablesExcel } from "./ConsumablesExcel";
import { AppNavLink } from "../../../common/components/AppNavLink";
import { ConsumablesTable } from "./ConsumablesTable";
import { PlusIcon } from "@heroicons/react/24/outline";

export function Consumables() {
  return (
    <>
      <Toaster />
      <ConsumablesDeleteModal />
      <nav className="flex gap-2 items-center mb-7">
        <ConsumablesExcel />
        <AppNavLink to="/resources/consumables/new" className="bg-primary-2 dark:bg-primary-8 px-4 py-[11px] rounded-md flex gap-2" >
          <PlusIcon className="h-6" />
          Añadir consumible
        </AppNavLink>
      </nav>
      <ConsumablesTable />
    </>
  )
}