import { Brand } from "../../brands/tBrands";
import { FindAllParams } from "../../common/tCommon";
import { Group } from "../../groups/tGroups";
import { Location } from "../../locations/tLocations";

const ToolStatus = {
  AVAILABLE: "AVAILABLE",
  NOT_AVAILABLE: "NOT_AVAILABLE",
  IN_MAINTENANCE: "IN_MAINTENANCE",
  DAMAGED: "DAMAGED",
  NEW: "NEW",
  DEPRECATED: "DEPRECATED",
} as const

//Type ToolStatus = { typeof keyof ToolStatus }

export interface Tool {
  barcode: string;
  category: Brand;
  brand: Brand;
  name: string;
  model: string;
  description: string;
  weight: number;
  stockWeightType: string;
  price: number;
  purchaseDate: Date;
  urlImages: string[];
  maintenancePeriod: number;
  maintenanceTime: string;
  lastMaintenance: Date;
  nextMaintenance: Date;
  status: string;
  location: Location;
  group: Group;
}

export interface ToolWithId extends Tool {
  id: number;
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