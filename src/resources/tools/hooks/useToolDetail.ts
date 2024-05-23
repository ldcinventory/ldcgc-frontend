import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { addToolImages, deleteToolImage, selectToolDetail, updateTool, updateToolDetail } from "../toolsSlice";
import { toast } from "sonner";

export const useToolDetail = () => {
  const { barcode } = useParams()
  const { tools: toolsState } = useAppSelector(state => state)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [currentImageShown, setCurrentImageShown] = useState(0)

  useEffect(() => {
    if (barcode === undefined) {
      navigate("/resources/tools")
      return
    }
    if (toolsState.toolDetail?.barcode === barcode)
      return

    dispatch(selectToolDetail(barcode))
  }, [])

  const handleEditTool = (toolProperties: {}) => {
    if (toolsState.toolDetail === null)
      return
    dispatch(updateToolDetail({ ...toolsState.toolDetail, ...toolProperties }))
  }

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (toolsState.toolDetail === null)
      return

    if (toolsState.toolDetail.name === '') {
      toast.error('El nombre no puede estar vacío.')
      return
    }
      
    dispatch(updateTool(toolsState.toolDetail))
  }

  const handleSetCurrentImageShown = (index: number) => () => {
    setCurrentImageShown(index)
  }

  const handleDeleteImage = (index: number) => (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const urlImageToDelete = toolsState.toolDetail?.urlImages[index]
    if (!urlImageToDelete)
      return

    const imageId = urlImageToDelete.slice(urlImageToDelete.indexOf('id=') + 3)
    console.log(imageId)
    dispatch(deleteToolImage({ toolBarcode: toolsState.toolDetail?.barcode, imageIds: [imageId] }))
  }

  const handleAddImages = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    const newImages = e.target.files ?? []

    if (newImages?.length <= 0 || !toolsState.toolDetail)
      return

    const images = new FormData()
    Array.from(newImages).forEach(image => {
      images.append('images', image)
    });

    dispatch(addToolImages({ toolBarcode: toolsState.toolDetail?.barcode, images }))
  }

  return { toolsState, handleSubmitForm, handleEditTool, currentImageShown, handleAddImages, handleSetCurrentImageShown, handleDeleteImage }
}