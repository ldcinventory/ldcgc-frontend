import { ArrowUpTrayIcon } from "@heroicons/react/24/outline"
import { AppFileInput } from "../../../common/components/AppInput"
import { useConsumablesExcel } from "../hooks/useConsumablesExcel"

export const ConsumablesExcel = () => {
  const { handleUploadExcel } = useConsumablesExcel()
  return (
    
    <AppFileInput id="consumables-excel-input" className="flex gap-4 px-4 py-[11px]" onChange={handleUploadExcel} accept=".xls, .xlsx, .csv, .ods, .tsv">
      <ArrowUpTrayIcon className="h-6" /> Subir excel
    </AppFileInput>
  )
}