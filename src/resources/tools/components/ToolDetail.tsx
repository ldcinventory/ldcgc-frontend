import { FormEvent, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { selectToolDetail, updateTool, updateToolDetail } from "../toolsSlice";
import { AppButtonSubmit } from "../../../common/components/AppButton";
import { AppLabeledSelect } from "../../../common/components/AppSelect";
import { AppLabeledDateInput, AppLabeledNumberInput, AppLabeledTextArea, AppLabeledTextInput, AppTextInput } from "../../../common/components/AppInput";
import { Toaster } from "sonner";

export function ToolDetail() {
  const { barcode } = useParams()
  const state = useAppSelector(state => state.tools)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (barcode === undefined) {
      navigate("/resources/tools")
      return
    }
    if (state.toolDetail?.barcode === barcode)
      return

    dispatch(selectToolDetail(barcode))
  }, [])

  const handleEditTool = (toolProperties: {}) => {
    if (state.toolDetail === null)
      return

    dispatch(updateToolDetail({...state.toolDetail,  ...toolProperties}))
  }

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (state.toolDetail === null)
      return

    dispatch(updateTool(state.toolDetail))
  }

  if (state.toolDetail === null)
    return <h1>No existe la herramienta seleccionada</h1>

  return (
    <>
      <Toaster />
      <form className="min-h-[86vh] py-10 px-5 flex flex-col md:flex-row gap-10 justify-center" onSubmit={handleSubmitForm}>
        <header className="flex flex-col gap-4 items-center">
          <AppTextInput className="text-2xl font-bold text-center bg-primary-2" value={state.toolDetail.name} onChange={(e) => handleEditTool({name: e.target.value})} />
          <h2 className="font-barcode text-5xl">{state.toolDetail.barcode}</h2>
          <object data={state.toolDetail.urlImages[0]} type="img">
            <img src="../../../public/images/default.webp" alt={`Herramienta ${state.toolDetail.name}`} className="min-w-[60px] max-w-[300px] rounded-full bg-primary-2 p-3"/>        
          </object>
        </header>
        <aside className="bg-primary-2 dark:bg-primary-8 p-5 rounded-lg flex flex-col gap-4 flex-1 max-w-[700px]">
          <div className="flex flex-col gap-2">
            Tipo de recurso
            <strong>{state.toolDetail.resourceType.name}</strong>
          </div>
          {/*<AppLabeledSelect id={`${state.toolDetail.barcode}-resource-type-input`} label="Tipo de recurso"
            value={state.toolDetail.resourceType.name} options={
              [
                {
                  name: "Herramienta",
                  value: "h"
                },
                {
                  name: "Consumible",
                  value: "c"
                }
              ]
            } />*/}
          <div className="flex flex-col gap-2">
            Marca
            <strong>{state.toolDetail.brand.name}</strong>
          </div>
          {/*<AppLabeledTextInput id={`${state.toolDetail.barcode}-model-input`} label="Marca" value={state.toolDetail.brand} onChange={(e) => handleEditTool({ brand: e.target.value })} />*/}
          <AppLabeledTextInput id={`${state.toolDetail.barcode}-model-input`} label="Modelo" value={state.toolDetail.model} onChange={(e) => handleEditTool({ model: e.target.value })} />
          <AppLabeledTextArea id={`${state.toolDetail.barcode}-description-input`} label="Descripción" rows={5}
            value={state.toolDetail.description} onChange={(e) => handleEditTool({ description: e.target.value })} />
          
          <section className="flex gap-2">
            <AppLabeledNumberInput id={`${state.toolDetail.barcode}-weight-input`} label="Cantidad"
              value={state.toolDetail.weight} onChange={(e) => handleEditTool({ weight: Number(e.target.value) })} />
            <AppLabeledSelect id={`${state.toolDetail.barcode}-weight-units-input`} label="Unidad de medida"
              value={state.toolDetail.stockWeightType} onChange={(e) => handleEditTool({stockWeightType: e.target.value})}
              options={
                [
                  {
                    name: "Unidades",
                    value: "UNITS"
                  },
                  {
                    name: "Litros",
                    value: "LITERS"
                  },
                  {
                    name: "Mililitros",
                    value: "MILLILITERS"
                  },
                  {
                    name: "Kilogramos",
                    value: "KILOGRAMS"
                  },
                  {
                    name: "Gramos",
                    value: "GRAMS"
                  },
                  {
                    name: "Metros",
                    value: "METERS"
                  },
                  {
                    name: "Centímetros",
                    value: "CENTIMETERS"
                  },
                  {
                    name: "Milímetros",
                    value: "MILLIMETERS"
                  },
                  {
                    name: "Libras",
                    value: "POUNDS"
                  },
                  {
                    name: "Onzas",
                    value: "OUNCES"
                  },
                ]
              }/>
          </section>
          <AppLabeledNumberInput id={`${state.toolDetail.barcode}-price-input`} label="Precio"
            value={state.toolDetail.price} onChange={(e) => handleEditTool({ price: Number(e.target.value) })} />
          
          <AppLabeledDateInput id={`${state.toolDetail.barcode}-purchase-date-input`} label="Fecha de compra"
            value={new Date(state.toolDetail.purchaseDate).toISOString().slice(0, 10)} onChange={(e) => handleEditTool({ purchaseDate: new Date(e.target.value) })} />
          
          <section className="flex gap-2">
            <AppLabeledNumberInput id={`${state.toolDetail.barcode}-maintenance-period-input`} label="Tiempo de mantenimiento"
              value={state.toolDetail.maintenancePeriod} onChange={(e) => handleEditTool({ maintenancePeriod: Number(e.target.value) })} />
            <AppLabeledSelect id={`${state.toolDetail.barcode}-maintenance-time-input`} label="Unidad de mantenimiento"
              value={state.toolDetail.maintenanceTime} onChange={(e) => handleEditTool({maintenanceTime: e.target.value})}
              options={
                [
                  {
                    name: "Horas",
                    value: "HOURS"
                  },
                  {
                    name: "Días",
                    value: "DAYS"
                  },
                  {
                    name: "Semanas",
                    value: "WEEKS"
                  },
                  {
                    name: "Meses",
                    value: "MONTHS"
                  },
                  {
                    name: "Años",
                    value: "YEARS"
                  },
                ]
              } />
          </section>

          <AppLabeledDateInput id={`${state.toolDetail.barcode}-last-maintenance-input`} label="Último mantenimiento"
            value={!state.toolDetail.lastMaintenance ? '' : new Date(state.toolDetail.lastMaintenance).toISOString().slice(0, 10)}
            onChange={(e) => handleEditTool({ lastMaintenance: new Date(e.target.value) })} />
          
          <AppLabeledDateInput id={`${state.toolDetail.barcode}-next-maintenance-input`} label="Próximo mantenimiento"
            value={new Date(state.toolDetail.nextMaintenance).toISOString().slice(0, 10)} onChange={(e) => handleEditTool({ nextMaintenance: new Date(e.target.value) })} />
          
          <AppLabeledSelect id={`${state.toolDetail.barcode}-status-input`} label="Estado"
            value={state.toolDetail.status} onChange={(e) => handleEditTool({status: e.target.value})}
            options={
              [
                {
                  name: "Disponible",
                  value: "AVAILABLE"
                },
                {
                  name: "No disponible",
                  value: "NOT_AVAILABLE"
                },
                {
                  name: "En mantenimiento",
                  value: "IN_MAINTENANCE"
                },
                {
                  name: "Dañada",
                  value: "DAMAGED"
                },
                {
                  name: "Nueva",
                  value: "NEW"
                },
                {
                  name: "En desuso",
                  value: "DEPRECATED"
                },
              ]
            } />
          
          <div className="flex flex-col gap-2">
            Ubicación
            <strong>{state.toolDetail.location.name}</strong>
          </div>
          {/*<AppLabeledSelect id={`${state.toolDetail.barcode}-location-input`} label="Ubicación"
            value={state.toolDetail.stockWeightType} options={
              [
                {
                  name: "Arcón 1",
                  value: "arcon1"
                },
                {
                  name: "Betel",
                  value: "betel"
                }
              ]
            } />*/}
          
          <AppButtonSubmit className="bg-primary-3 max-w-[300px] self-center py-2 px-4">Guardar cambios</AppButtonSubmit>
        </aside>
      </form>
    </>
  )
}
