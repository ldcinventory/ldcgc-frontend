import { Toaster } from "sonner";
import { ToolDeleteModal } from "./ToolDeleteModal";
import { ToolsTable } from "./ToolsTable";
import { ToolsExcel } from "./ToolsExcel";
import { AppNavLink } from "../../../common/components/AppNavLink";
import { PlusIcon } from "@heroicons/react/24/outline";

export function Tools() {

  return (
    <>
      <Toaster />
      <ToolDeleteModal />
      <nav className="flex gap-2 items-center mb-7">
        <ToolsExcel />
        <AppNavLink to="/resources/tools/new" className="bg-primary-2 dark:bg-primary-7 px-4 py-[11px] rounded-md flex gap-2" >
          <PlusIcon className="h-6"/>
          Añadir herramienta
        </AppNavLink>
      </nav>
      <ToolsTable />
    </>
  )
}