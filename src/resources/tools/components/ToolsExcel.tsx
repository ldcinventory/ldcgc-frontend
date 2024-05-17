import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { AppFileInput } from "../../../common/components/AppInput";
import { useToolsExcel } from "../hooks/useToolsExcel";

export function ToolsExcel() {
  const { handleUploadExcel } = useToolsExcel()
  return (
    <AppFileInput id="tools-excel-input" className="flex gap-4 px-4 py-[11px]" onChange={handleUploadExcel} accept=".xls, .xlsx, .csv, .ods, .tsv">
      <ArrowUpTrayIcon className="h-6" /> Subir excel
    </AppFileInput>
  
  )
}