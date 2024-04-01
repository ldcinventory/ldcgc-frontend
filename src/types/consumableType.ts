import { Brand, Group, Location } from "./commonTypes";

export interface Consumable {
  id: number;
  barcode: string;
  category: Brand;
  brand: Brand;
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
}