import { toast } from "sonner";
import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { addTool } from "../toolsSlice";
import { getMyUser } from "../../../users/usersSlice";
import { AppButton } from "../../../common/components/AppButton";
import { TrashIcon } from "@heroicons/react/24/outline";
import { ResourceType } from "../../tResources";
import { Brand } from "../../../brands/tBrands";
import { Location } from "../../../locations/tLocations";

export const useAddTool = ({ resourceTypes, brands, locations }: { resourceTypes: ResourceType[], brands: Brand[], locations: Location[] }) => {
  const { users: usersState } = useAppSelector(state => state)
  const dispatch = useAppDispatch()
  const [images, setImages] = useState<File[]>([])

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (usersState.me === null) {
      dispatch(getMyUser())
      toast.error('No se ha podido añadir la herramienta porque no se encuentra el usuario. Inténtalo de nuevo en unos segundos.')
      return
    }

    const formData = new FormData(e.currentTarget)

    const tool = {
      name: formData.get('tool-name') as string,
      resourceType: resourceTypes.find(r => r.id === Number(formData.get('tool-resourceType'))) ?? resourceTypes[0],
      brand: brands.find(b => b.id === Number(formData.get('tool-brand'))) ?? brands[0],
      model: formData.get('tool-model') as string,
      description: formData.get('tool-description') as string,
      weight: Number(formData.get('tool-weight')),
      stockWeightType: formData.get('tool-stockWeightType') as string,
      price: Number(formData.get('tool-price')),
      purchaseDate: new Date(formData.get('tool-purchaseDate') as string),
      maintenancePeriod: Number(formData.get('tool-maintenancePeriod')),
      maintenanceTime: formData.get('tool-maintenanceTime') as string,
      location: locations.find(l => l.id === Number(formData.get('tool-location'))) ?? locations[0],
      group: usersState.me?.group,
      status: 'NEW'
    }

    const imagesForm = new FormData()
    images.forEach(i => imagesForm.append('images', i))

    //imagesForm.append('images', images)

    dispatch(addTool({ tool, images: imagesForm }))
  }

  const handleAddImages = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    const newImages = e.target.files ?? []

    if (!newImages || newImages.length <= 0)
      return

    setImages([...images, ...Array.from(newImages)])
  }

  const handleDeleteImage = (index: number) => () => {
    setImages(images.filter((image, i) => index !== i))
  }

  const generateHtmlImages = () => {
    if (images.length <= 0)
      return ''

    return images.map((image, index) =>
      <nav key={ index } className = "flex flex-col items-center justify-between" >
        <img src={ URL.createObjectURL(image) } alt = {`Imagen de la herramienta número ${index}`} className = "w-[100px] rounded-md" />
        <AppButton onClick={ handleDeleteImage(index)}>
          <TrashIcon className="h-4" />
        </AppButton>
      </nav>
    )
  }
  
return { handleFormSubmit, handleAddImages, generateHtmlImages }
}