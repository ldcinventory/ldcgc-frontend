import { Toaster } from "sonner";
import { AppFileInput, AppLabeledDateInputForm, AppLabeledNumberInputForm, AppLabeledTextInputForm } from "../../../common/components/AppInput";
import { AppLabeledSelectForm } from "../../../common/components/AppSelect";
import { MaintenaceTimes, StockWeightTypes } from "../tTools";
import { AppButtonSubmit } from "../../../common/components/AppButton";
import { PhotoIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useResourceTypes } from "../../common/hooks/useResourceTypes";
import { useBrands } from "../../../brands/useBrands";
import { useLocations } from "../../../locations/useLocations";
import { useAddTool } from "../hooks/useAddTool";

export function AddTool() {
  const { resourceTypes } = useResourceTypes()
  const { brands } = useBrands()
  const { locations } = useLocations()  
  const { handleFormSubmit, handleAddImages, generateHtmlImages } = useAddTool({resourceTypes, brands, locations})

  return (
    <>
      <Toaster />
      <form onSubmit={handleFormSubmit}
        className="flex flex-col min-h-[87vh] my-10 bg-primary-2 dark:bg-primary-8 p-5 max-w-[500px] rounded-lg mx-auto gap-2">
        <h1 className="font-bold text-2xl mb-10">Añadir herramienta</h1>
        <AppLabeledTextInputForm id="tool-name" label="Nombre" name="tool-name" />
        <AppLabeledSelectForm id="tool-resourceType" name="tool-resourceType" label="Tipo" 
          options={(resourceTypes || []).map(r => { return { name: r.name, value: r.id.toString() } })} />
        <AppLabeledSelectForm id="tool-brand" name="tool-brand" label="Marca"
          options={(brands || []).map(b => { return { name: b.name, value: b.id.toString() } })} />
        <AppLabeledTextInputForm id="tool-model" label="Modelo" name="tool-model" />
        <AppLabeledTextInputForm id="tool-description" label="Descripción" name="tool-description" />
        <section className="flex gap-2">  
          <AppLabeledNumberInputForm className="flex-1" id="tool-weight" label="Magnitud" min={0} name="tool-weight" />
          <AppLabeledSelectForm id="tool-stockWeightType" label="Unidad de medida" name="tool-stockWeightType" options={StockWeightTypes}/>
        </section>
        <AppLabeledNumberInputForm id="tool-price" label="Precio" name="tool-price" min={0} />
        <AppLabeledDateInputForm id="tool-purchaseDate" label="Fecha de compra" defaultValue={new Date().toISOString().slice(0, 10)} name="tool-purchaseDate" />
        <section className="flex gap-2">
          <AppLabeledNumberInputForm className="flex-1" id="tool-maintenancePeriod" label="Tiempo hasta mantenimiento" min={0} name="tool-maintenancePeriod" />
          <AppLabeledSelectForm id="tool-maintenanceTime" label="Unidad de mantenimiento" name="tool-maintenanceTime" options={MaintenaceTimes} />
        </section>
        <AppLabeledSelectForm id="tool-location" name="tool-location" label="Ubicación"
          options={(locations || []).map(l => { return { name: l.name, value: l.id.toString() } })} />        
        <section className="grid grid-cols-4 sm:grid-cols-4 gap-2">
          <AppFileInput id="tools-images" name="tools-images" onChange={handleAddImages} accept=".png, .jpg, .webp, .jpeg, .svg" multiple={true}>
            <section className="flex items-center gap-2 border border-primary-9 dark:border-primary-1 rounded-md p-2">
              <PhotoIcon className="h-20" /> <PlusIcon className="h-7" />
            </section>
          </AppFileInput>
          { generateHtmlImages() }
        </section>

        <AppButtonSubmit className="bg-primary-3 self-center p-2 mt-auto flex gap-2 items-center">
          <PlusIcon className="h-7" />
          Añadir herramienta
        </AppButtonSubmit>
      </form>
    </>
  )
}
