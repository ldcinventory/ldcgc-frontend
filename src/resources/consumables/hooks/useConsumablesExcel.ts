import { ChangeEvent } from "react"
import { useAppDispatch } from "../../../app/store"
import { toast } from "sonner"
import { uploadConsumablesExcel } from "../consumablesSlice"

export const useConsumablesExcel = () => {
  const dispatch = useAppDispatch()

  const handleUploadExcel = (e: ChangeEvent<HTMLInputElement>) => {

    const file = (e.target.files ?? [])[0]
    if (file !== undefined) {
      const formData = new FormData()
      formData.append('file', file)
      toast.info('Subiendo archivo...')
      dispatch(uploadConsumablesExcel(formData))
    }
  }

  return { handleUploadExcel }
}