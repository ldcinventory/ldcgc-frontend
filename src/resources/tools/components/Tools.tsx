import { Toaster } from "sonner";
import { ToolDeleteModal } from "./ToolDeleteModal";
import { ToolsTable } from "./ToolsTable";
import { ToolsExcel } from "./ToolsExcel";

export function Tools() {

  return (
    <>
      <Toaster />
      <ToolDeleteModal />
      <ToolsExcel />
      <ToolsTable />
    </>
  )
}