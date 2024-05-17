import { Brand } from "../../brands/tBrands";
import { FindAllParams } from "../../common/tCommon";
import { Group } from "../../groups/tGroups";
import { Location } from "../../locations/tLocations";
import { ResourceType } from "../tResources";

const ToolStatus = {
  AVAILABLE: "AVAILABLE",
  NOT_AVAILABLE: "NOT_AVAILABLE",
  IN_MAINTENANCE: "IN_MAINTENANCE",
  DAMAGED: "DAMAGED",
  NEW: "NEW",
  DEPRECATED: "DEPRECATED",
} as const

export interface ToolPost {
  resourceType: ResourceType
  brand: Brand
  name: string
  model: string
  description: string
  weight: number
  stockWeightType: string
  price: number
  purchaseDate: Date
  maintenancePeriod: number
  maintenanceTime: string
  location: Location
  group: Group
}

export interface Tool extends ToolPost {
  barcode: string
  urlImages: string[]
  lastMaintenance: Date
  nextMaintenance: Date
  status: string
  uploadStatus: 'INSERTED' | 'UPDATED' | 'SKIPPED'
}

export interface ToolWithId extends Tool {
  id: number
}

export interface ToolsParams extends FindAllParams{
  status?: 'AVAILABLE' | 'IN_USE'
  category?: string
  brand?: string
  name?: string
  model?: string
  description?: string
  barcode?: string
  location?: string
}

export function toolStatusConverter(status:string) {

  if(status === "AVAILABLE") return "Disp"
  if(status === "NOT_AVAILABLE") return "Entr"
  if(status === "IN_MAINTENANCE") return "Mant"
  if(status === "DAMAGED") return "Rota"
  if(status === "NEW") return "Nuev"
  if(status === "DEPRECATED") return "Anti"
  
  return status
}

export const StockWeightTypes =
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

export const MaintenaceTimes = 
  [
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

export const StatusTypes =
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