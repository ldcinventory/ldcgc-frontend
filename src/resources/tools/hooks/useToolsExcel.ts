import { ChangeEvent } from "react"
import { useAppDispatch } from "../../../app/store"
import { toast } from "sonner"
import { uploadToolsExcel } from "../toolsSlice"

export const useToolsExcel = () => {
  const dispatch = useAppDispatch()
  
  const handleUploadExcel = (e: ChangeEvent<HTMLInputElement>) => {
    const excel = (e.target.files ?? [])[0]
    if (excel !== undefined) {
      const formData = new FormData()
      formData.append('excel', excel)
      toast.info('Subiendo archivo...')
      dispatch(uploadToolsExcel(formData))
    }
  }

  return {handleUploadExcel}
}