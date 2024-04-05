import { Brand } from "../../brands/tBrands";
import { Group } from "../../groups/tGroups";

export interface Consumable {
  barcode: string;
  resourceType: Brand;
  brand: Brand;
  price: number;
  purchaseDate: Date;
  name: string;
  model: string;
  description: string;
  urlImages: string[];
  quantityEachItem: number;
  stock: number;
  minStock: number;
  stockType: string;
  location: Location;
  group: Group;
  uploadStatus: string;
}

export interface ConsumableWithId extends Consumable {
  id: number;
}

export interface ConsumableParams {
  pageIndex?: number;
  size?: number;
  filterString?: string;
  sortField?: string;
}