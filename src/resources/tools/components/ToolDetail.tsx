import {
  AppButton,
  AppButtonSubmit,
} from "../../../common/components/AppButton"
import {
  AppLabeledSelect,
  AppLabeledSelectForm,
} from "../../../common/components/AppSelect"
import {
  AppFileInput,
  AppLabeledDateInput,
  AppLabeledNumberInput,
  AppLabeledTextArea,
  AppLabeledTextInput,
  AppTextInput,
} from "../../../common/components/AppInput"
import { Toaster } from "sonner"
import { MaintenaceTimes, StatusTypes, StockWeightTypes } from "../tTools"
import { useResourceTypes } from "../../common/hooks/useResourceTypes"
import { useBrands } from "../../../brands/useBrands"
import { useLocations } from "../../../locations/useLocations"
import {
  CheckIcon,
  ClipboardIcon,
  PencilIcon,
  PhotoIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline"
import { useToolDetail } from "../hooks/useToolDetail"

export function ToolDetail() {
  const {
    toolsState,
    handleSubmitForm,
    handleEditTool,
    currentImageShown,
    handleAddImages,
    handleSetCurrentImageShown,
    handleDeleteImage,
    editBarcode,
    toggleEditBarcode,
  } = useToolDetail()
  const { resourceTypes } = useResourceTypes()
  const { brands } = useBrands()
  const { locations } = useLocations()

  if (toolsState.toolDetail === null || toolsState.toolDetail === undefined)
    return <h1>No existe la herramienta seleccionada</h1>

  return (
    <>
      <Toaster />
      <form
        className="mt-10 flex min-h-[86vh] flex-col justify-center gap-10 px-5 py-10 md:flex-row"
        onSubmit={handleSubmitForm}
      >
        <header className="flex max-w-lg flex-col items-center gap-4">
          <AppTextInput
            className="bg-primary-2 text-center text-2xl font-bold"
            value={toolsState.toolDetail.name}
            onChange={(e) => handleEditTool({ name: e.target.value })}
          />
          <section className="flex items-center gap-4">
            {!editBarcode ? (
              <>
                <h2 className="font-barcode text-5xl">
                  {toolsState.toolDetail.barcode}
                </h2>
                <AppButton onClick={toggleEditBarcode}>
                  <PencilIcon className="h-6" />
                </AppButton>
              </>
            ) : (
              <>
                <AppTextInput
                  className="bg-primary-2 text-center text-2xl font-bold"
                  value={toolsState.toolDetail.barcode}
                  onChange={(e) => handleEditTool({ barcode: e.target.value })}
                />
                <AppButton onClick={toggleEditBarcode}>
                  <CheckIcon className="h-6" />
                </AppButton>
              </>
            )}
          </section>

          {toolsState.toolDetail.urlImages === undefined ||
          toolsState.toolDetail.urlImages?.length === 0 ? (
            <img
              src="../../../public/images/default.webp"
              alt={`Herramienta ${toolsState.toolDetail.name}`}
              className="w-full min-w-[60px] max-w-[300px] rounded-full bg-primary-2 p-3"
            />
          ) : (
            <img
              src={toolsState.toolDetail.urlImages[currentImageShown]}
              className="w-full min-w-[60px] max-w-[300px] rounded-full bg-primary-2 p-3"
              alt={`Tool ${toolsState.toolDetail.name}`}
            />
          )}
          <section className="grid grid-cols-4 gap-2">
            <AppFileInput
              id="tools-images"
              name="tools-images"
              onChange={handleAddImages}
              accept=".png, .jpg, .webp, .jpeg, .svg"
              multiple={true}
            >
              <section className="flex items-center gap-2 rounded-md border border-primary-9 p-2 dark:border-primary-1">
                <PhotoIcon className="h-20" /> <PlusIcon className="h-7" />
              </section>
            </AppFileInput>
            {toolsState.toolDetail.urlImages &&
              toolsState.toolDetail.urlImages.map((urlImage, index) => {
                return (
                  <div
                    key={index}
                    className={`flex flex-col items-center gap-2`}
                  >
                    <img
                      src={urlImage}
                      className={`max-w-[60px] rounded-md ${index === currentImageShown && "outline"}`}
                      onClick={handleSetCurrentImageShown(index)}
                      alt={`Tool ${toolsState.toolDetail?.name}, n${index}`}
                    />
                    <AppButton onClick={handleDeleteImage(index)}>
                      {" "}
                      <TrashIcon className="h-4" />{" "}
                    </AppButton>
                  </div>
                )
              })}
          </section>
        </header>
        <aside className="flex max-w-[700px] flex-1 flex-col gap-4 rounded-lg bg-primary-2 p-5 dark:bg-primary-7">
          <AppLabeledSelectForm
            id="tool-resourceType"
            name="tool-resourceType"
            label="Tipo"
            options={(resourceTypes || []).map((r) => {
              return { name: r.name, value: r.id.toString() }
            })}
            onChange={(e) =>
              handleEditTool({
                resourceType: resourceTypes.find(
                  (r) => r.id === Number(e.target.value),
                ),
              })
            }
            defaultValue={toolsState.toolDetail.resourceType.id}
          />
          <AppLabeledSelectForm
            id="tool-brand"
            name="tool-brand"
            label="Marca"
            options={(brands || []).map((b) => {
              return { name: b.name, value: b.id.toString() }
            })}
            onChange={(e) =>
              handleEditTool({
                brand: brands.find((b) => b.id === Number(e.target.value)),
              })
            }
            defaultValue={toolsState.toolDetail.brand.id}
          />
          <AppLabeledTextInput
            id={`${toolsState.toolDetail.barcode}-model-input`}
            label="Modelo"
            value={toolsState.toolDetail.model}
            onChange={(e) => handleEditTool({ model: e.target.value })}
          />
          <AppLabeledTextArea
            id={`${toolsState.toolDetail.barcode}-description-input`}
            label="Descripción"
            rows={5}
            value={toolsState.toolDetail.description}
            onChange={(e) => handleEditTool({ description: e.target.value })}
          />

          <section className="flex gap-2">
            <AppLabeledNumberInput
              id={`${toolsState.toolDetail.barcode}-weight-input`}
              label="Cantidad"
              min={0}
              value={toolsState.toolDetail.weight}
              onChange={(e) =>
                handleEditTool({ weight: Number(e.target.value) })
              }
            />
            <AppLabeledSelect
              id={`${toolsState.toolDetail.barcode}-weight-units-input`}
              label="Unidad de medida"
              value={toolsState.toolDetail.stockWeightType}
              onChange={(e) =>
                handleEditTool({ stockWeightType: e.target.value })
              }
              options={StockWeightTypes}
            />
          </section>
          <AppLabeledNumberInput
            id={`${toolsState.toolDetail.barcode}-price-input`}
            label="Precio"
            min={0}
            value={toolsState.toolDetail.price}
            onChange={(e) => handleEditTool({ price: Number(e.target.value) })}
          />

          <AppLabeledDateInput
            id={`${toolsState.toolDetail.barcode}-purchase-date-input`}
            label="Fecha de compra"
            value={
              toolsState.toolDetail.purchaseDate
                ? new Date(toolsState.toolDetail.purchaseDate)
                    .toISOString()
                    .slice(0, 10)
                : ""
            }
            onChange={(e) =>
              handleEditTool({ purchaseDate: new Date(e.target.value) })
            }
          />

          <section className="flex gap-2">
            <AppLabeledNumberInput
              id={`${toolsState.toolDetail.barcode}-maintenance-period-input`}
              label="Tiempo hasta mantenimiento"
              min={0}
              value={toolsState.toolDetail.maintenancePeriod}
              onChange={(e) =>
                handleEditTool({ maintenancePeriod: Number(e.target.value) })
              }
            />
            <AppLabeledSelect
              id={`${toolsState.toolDetail.barcode}-maintenance-time-input`}
              label="Unidad de mantenimiento"
              value={toolsState.toolDetail.maintenanceTime}
              onChange={(e) =>
                handleEditTool({ maintenanceTime: e.target.value })
              }
              options={MaintenaceTimes}
            />
          </section>

          <AppLabeledDateInput
            id={`${toolsState.toolDetail.barcode}-last-maintenance-input`}
            label="Último mantenimiento"
            value={
              !toolsState.toolDetail.lastMaintenance
                ? ""
                : new Date(toolsState.toolDetail.lastMaintenance)
                    .toISOString()
                    .slice(0, 10)
            }
            onChange={(e) =>
              handleEditTool({ lastMaintenance: new Date(e.target.value) })
            }
          />

          <AppLabeledDateInput
            id={`${toolsState.toolDetail.barcode}-next-maintenance-input`}
            label="Próximo mantenimiento"
            value={
              toolsState.toolDetail.nextMaintenance
                ? new Date(toolsState.toolDetail.nextMaintenance)
                    .toISOString()
                    .slice(0, 10)
                : ""
            }
            onChange={(e) =>
              handleEditTool({ nextMaintenance: new Date(e.target.value) })
            }
          />

          <AppLabeledSelect
            id={`${toolsState.toolDetail.barcode}-status-input`}
            label="Estado"
            value={toolsState.toolDetail.status}
            onChange={(e) => handleEditTool({ status: e.target.value })}
            options={StatusTypes}
          />
          <AppLabeledSelectForm
            id="tool-location"
            name="tool-location"
            label="Ubicación"
            options={(locations || []).map((l) => {
              return { name: l.name, value: l.id.toString() }
            })}
            onChange={(e) =>
              handleEditTool({
                location: locations.find(
                  (l) => l.id === Number(e.target.value),
                ),
              })
            }
            defaultValue={toolsState.toolDetail.location.id}
          />
          <AppButtonSubmit className="max-w-[300px] self-center bg-primary-3 px-4 py-2">
            Guardar cambios
          </AppButtonSubmit>
        </aside>
      </form>
    </>
  )
}
