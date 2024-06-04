import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { addConsumableImages, deleteConsumableImage, selectConsumableDetail, updateConsumable } from "../consumablesSlice";
import { ResourceType } from "../../tResources";
import { Brand } from "../../../brands/tBrands";
import { Location } from "../../../locations/tLocations";
import { toast } from "sonner";

export const useConsumableDetail = ({ resourceTypes, brands, locations }: { resourceTypes: ResourceType[], brands: Brand[], locations: Location[] }) => {
  const { barcode } = useParams()
  const consumablesState = useAppSelector(state => state.consumables)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [currentImageShown, setCurrentImageShown] = useState(0)

  useEffect(() => {
    if (!barcode) {
      navigate("/resources/consumables")
      return
    }
    if (consumablesState.consumableDetail?.barcode === barcode)
      return

    dispatch(selectConsumableDetail(barcode))
  }, [])

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (consumablesState.consumableDetail === null)
      return

    const formData = new FormData(e.currentTarget)

    const consumable = {
      id: consumablesState.consumableDetail.id,
      barcode: consumablesState.consumableDetail.barcode,
      name: formData.get(`${barcode}-name`) as string,
      resourceType: resourceTypes.find(r => r.id === Number(formData.get(`${barcode}-resourceType`))) ?? resourceTypes[0],
      brand: brands.find(b => b.id === Number(formData.get(`${barcode}-brand`))) ?? brands[0],
      model: formData.get(`${barcode}-model`) as string,
      description: formData.get(`${barcode}-description`) as string,
      price: Number(formData.get(`${barcode}-price`)),
      purchaseDate: new Date(formData.get(`${barcode}-purchaseDate`) as string),
      location: locations.find(l => l.id === Number(formData.get(`${barcode}-location`))) ?? locations[0],
      group: consumablesState.consumableDetail.group,
      quantityEachItem: Number(formData.get(`${barcode}-quantityEachItem`)),
      stock: Number(formData.get(`${barcode}-stock`)),
      minStock: Number(formData.get(`${barcode}-minStock`)),
      stockType: formData.get(`${barcode}-stockType`) as string,
      urlImages: consumablesState.consumableDetail.urlImages,
      uploadStatus: consumablesState.consumableDetail.uploadStatus
    }

    if (consumable.name === '') {
      toast.error('El nombre no puede estar vacío.')
      return
    }

    dispatch(updateConsumable(consumable))
  }

  const handleSetCurrentImageShown = (index: number) => () => {
    setCurrentImageShown(index)
  }

  const handleDeleteImage = (index: number) => (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const urlImageToDelete = consumablesState.consumableDetail?.urlImages[index]
    if (!urlImageToDelete)
      return

    const imageId = urlImageToDelete.slice(urlImageToDelete.indexOf('id=') + 3)
    console.log(imageId)
    dispatch(deleteConsumableImage({ consumableBarcode: consumablesState.consumableDetail?.barcode, imageIds: [imageId] }))
  }

  const handleAddImages = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    const newImages = e.target.files ?? []

    if (newImages?.length <= 0 || !consumablesState.consumableDetail)
      return

    const images = new FormData()
    Array.from(newImages).forEach(image => {
      images.append('images', image)
    });

    dispatch(addConsumableImages({ consumableBarcode: consumablesState.consumableDetail?.barcode, images }))
  }

  return { consumablesState, handleSubmitForm, currentImageShown, handleAddImages, handleSetCurrentImageShown, handleDeleteImage, barcode }
}