import { AppButton, AppButtonSubmit } from "../../../common/components/AppButton";
import { AppLabeledSelect, AppLabeledSelectForm } from "../../../common/components/AppSelect";
import { AppFileInput, AppLabeledDateInput, AppLabeledDateInputForm, AppLabeledNumberInputForm,  AppLabeledTextArea, AppLabeledTextInput, AppLabeledTextInputForm, AppTextInput } from "../../../common/components/AppInput";
import { Toaster } from "sonner";
import { useResourceTypes } from "../../common/hooks/useResourceTypes";
import { useBrands } from "../../../brands/useBrands";
import { useLocations } from "../../../locations/useLocations";
import { PhotoIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useConsumableDetail } from "../hooks/useConsumableDetail";
import { StockWeightTypes } from "../../tools/tTools";

export const ConsumableDetail = () => {
  const { resourceTypes } = useResourceTypes()
  const { brands } = useBrands()
  const { locations } = useLocations()
  const { consumablesState, handleSubmitForm, currentImageShown, handleAddImages, handleSetCurrentImageShown, handleDeleteImage, barcode } = useConsumableDetail({ resourceTypes, brands, locations })

  if (consumablesState.consumableDetail === null || consumablesState.consumableDetail === undefined)
    return <h1>No existe el consumible seleccionado</h1>

  return (
    <>
      <Toaster />
      <form className="min-h-[86vh] py-10 px-5 flex flex-col md:flex-row gap-10 justify-center mt-10" onSubmit={handleSubmitForm}>
        <header className="flex flex-col gap-4 items-center max-w-lg">
          <AppTextInput className="text-2xl font-bold text-center bg-primary-2" defaultValue={consumablesState.consumableDetail.name} name={`${barcode}-name`} />
          <h2 className="font-barcode text-5xl">{consumablesState.consumableDetail.barcode}</h2>
          {
            (consumablesState.consumableDetail.urlImages === undefined || consumablesState.consumableDetail.urlImages?.length === 0) ?
              <img src="../../../public/images/default.webp" alt={`Herramienta ${consumablesState.consumableDetail.name}`} className="min-w-[60px] max-w-[300px] w-full rounded-full bg-primary-2 p-3" /> :
              <img src={consumablesState.consumableDetail.urlImages[currentImageShown]} className="min-w-[60px] max-w-[300px] w-full rounded-full bg-primary-2 p-3" alt={`Consumable ${consumablesState.consumableDetail.name}`} />
          }
          <section className="grid grid-cols-4 gap-2 ">
            <AppFileInput id="consumables-images" name="consumables-images" onChange={handleAddImages} accept=".png, .jpg, .webp, .jpeg, .svg" multiple={true}>
              <section className="flex items-center gap-2 border border-primary-9 dark:border-primary-1 rounded-md p-2">
                <PhotoIcon className="h-20" /> <PlusIcon className="h-7" />
              </section>
            </AppFileInput>
            {
              consumablesState.consumableDetail.urlImages &&
              consumablesState.consumableDetail.urlImages.map((urlImage, index) => {
                return (
                  <div key={index} className={`flex flex-col items-center gap-2`}>
                    <img src={urlImage} className={`max-w-[60px] rounded-md ${index === currentImageShown && 'outline'}`}
                      onClick={handleSetCurrentImageShown(index)} alt={`Consumable ${consumablesState.consumableDetail?.name}, n${index}`} />
                    <AppButton onClick={handleDeleteImage(index)}> <TrashIcon className="h-4" /> </AppButton>
                  </div>
                )
              })
            }
          </section>
        </header>
        <aside className="bg-primary-2 dark:bg-primary-8 p-5 rounded-lg flex flex-col gap-4 flex-1 max-w-[700px]">
          <AppLabeledSelectForm id={`${barcode}-resourceType`} name={`${barcode}-resourceType`} label="Tipo"
            options={(resourceTypes || []).map(r => { return { name: r.name, value: r.id.toString() } })}
            defaultValue={consumablesState.consumableDetail.resourceType.id}
          />
          <AppLabeledSelectForm id={`${barcode}-brand`} name={`${barcode}-brand`} label="Marca"
            options={(brands || []).map(b => { return { name: b.name, value: b.id.toString() } })}
            defaultValue={consumablesState.consumableDetail.brand.id}
          />
          <AppLabeledTextInputForm id={`${barcode}-model`} name={`${barcode}-model`} label="Modelo" defaultValue={consumablesState.consumableDetail.model}/>
          <AppLabeledTextArea id={`${barcode}-description`} name={`${barcode}-description`} label="Descripción" rows={5} defaultValue={consumablesState.consumableDetail.description} />

          <section className="flex gap-2">
            <AppLabeledNumberInputForm id={`${barcode}-stock`} name={`${barcode}-stock`} label="Stock" min={0} className="flex-1" step="any" defaultValue={consumablesState.consumableDetail.stock}/>
            <AppLabeledSelectForm id={`${barcode}-stockType`} name={`${barcode}-stockType`} label="Unidad de medida"
              options={StockWeightTypes} defaultValue={consumablesState.consumableDetail.stockType}/>
          </section>
          <AppLabeledNumberInputForm id={`${barcode}-minStock`} name={`${barcode}-minStock`} label="Stock mínimo" min={0} defaultValue={consumablesState.consumableDetail.minStock} />

          <AppLabeledNumberInputForm id={`${barcode}-price`} name={`${barcode}-price`} label="Precio" min={0} step="any" defaultValue={consumablesState.consumableDetail.price} />

          <AppLabeledDateInputForm id={`${barcode}-purchaseDate`} name={`${barcode}-purchaseDate`} label="Fecha de compra" defaultValue={new Date(consumablesState.consumableDetail.purchaseDate).toISOString().slice(0, 10)}/>

          <AppLabeledSelectForm id={`${barcode}-location`} name={`${barcode}-location`} label="Ubicación"
            options={(locations || []).map(l => { return { name: l.name, value: l.id.toString() } })}
            defaultValue={consumablesState.consumableDetail.location.id}
          />
          <AppLabeledNumberInputForm id={`${barcode}-quantityEachItem`} name={`${barcode}-quantityEachItem`} label="Unidades por paquete" min={0} defaultValue={consumablesState.consumableDetail.quantityEachItem} />
          <AppButtonSubmit className="bg-primary-3 max-w-[300px] self-center py-2 px-4">Guardar cambios</AppButtonSubmit>
        </aside>
      </form>
    </>
  )
}