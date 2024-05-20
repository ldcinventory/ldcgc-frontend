import { Toaster } from "sonner";
import { AppFileInput, AppLabeledDateInputForm, AppLabeledNumberInputForm, AppLabeledTextArea, AppLabeledTextInputForm } from "../../../common/components/AppInput";
import { AppLabeledSelectForm } from "../../../common/components/AppSelect";
import { AppButtonSubmit } from "../../../common/components/AppButton";
import { PhotoIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useResourceTypes } from "../../common/hooks/useResourceTypes";
import { useBrands } from "../../../brands/useBrands";
import { useLocations } from "../../../locations/useLocations";
import { useAddConsumable } from "../hooks/useAddConsumable";
import { StockWeightTypes } from "../../tools/tTools";

export const AddConsumable = () => {
  const { resourceTypes } = useResourceTypes()
  const { brands } = useBrands()
  const { locations } = useLocations()
  const { handleFormSubmit, handleAddImages, generateHtmlImages } = useAddConsumable({ resourceTypes, brands, locations })

  return (
    <>
      <Toaster />
      <form onSubmit={handleFormSubmit}
        className="flex flex-col min-h-[87vh] my-10 bg-primary-2 dark:bg-primary-8 p-5 max-w-[500px] rounded-lg mx-auto gap-2">
        <h1 className="font-bold text-2xl mb-10">Añadir consumible</h1>
        <AppLabeledTextInputForm id="consumable-name" label="Nombre" name="consumable-name" />
        <AppLabeledSelectForm id="consumable-resourceType" name="consumable-resourceType" label="Tipo"
          options={(resourceTypes || []).map(r => { return { name: r.name, value: r.id.toString() } })} />
        <AppLabeledSelectForm id="consumable-brand" name="consumable-brand" label="Marca"
          options={(brands || []).map(b => { return { name: b.name, value: b.id.toString() } })} />
        <AppLabeledTextInputForm id="consumable-model" label="Modelo" name="consumable-model" />
        <AppLabeledTextArea id="consumable-description" label="Descripción" name="consumable-description" />
        <section className="flex gap-2">
          <AppLabeledNumberInputForm id="consumable-stock" name="consumable-stock" label="Stock" min={0} className="flex-1" />
          <AppLabeledSelectForm id="consumable-stockType" label="Unidad de medida" name="consumable-stockType" options={StockWeightTypes} />
        </section>
        <AppLabeledNumberInputForm id="consumable-minStock" name="consumable-minStock" label="Stock mínimo" min={0}/>
        <AppLabeledNumberInputForm id="consumable-price" label="Precio" name="consumable-price" min={0} />
        <AppLabeledDateInputForm id="consumable-purchaseDate" label="Fecha de compra" defaultValue={new Date().toISOString().slice(0, 10)} name="consumable-purchaseDate" />
        <AppLabeledSelectForm id="consumable-location" name="consumable-location" label="Ubicación"
          options={(locations || []).map(l => { return { name: l.name, value: l.id.toString() } })} />
        <AppLabeledNumberInputForm id="consumable-quantityEachItem" name="consumable-quantityEachItem" label="Unidades por paquete" min={0}/>
        <section className="grid grid-cols-4 sm:grid-cols-4 gap-2">
          <AppFileInput id="consumables-images" name="consumables-images" onChange={handleAddImages} accept=".png, .jpg, .webp, .jpeg, .svg" multiple={true}>
            <section className="flex items-center gap-2 border border-primary-9 dark:border-primary-1 rounded-md p-2">
              <PhotoIcon className="h-20" /> <PlusIcon className="h-7" />
            </section>
          </AppFileInput>
          {generateHtmlImages()}
        </section>

        <AppButtonSubmit className="bg-primary-3 self-center p-2 mt-auto flex gap-2 items-center">
          <PlusIcon className="h-7" />
          Añadir consumible
        </AppButtonSubmit>
      </form>
    </>
  )
}
