import { Brand } from "../../brands/tBrands";
import { Group } from "../../groups/tGroups";

export interface Tool {
  id: number;
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