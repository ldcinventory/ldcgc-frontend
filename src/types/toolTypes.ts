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

export interface Brand {
  id: number;
  name: string;
  locked: boolean;
  parent: string;
  categories: string[];
}

export interface Group {
  id: number;
  name: string;
  description: string;
  urlImage: string;
  phoneNumber: string;
  location: Location;
}

export interface Location {
  id: number;
  name: string;
  description: string;
  url: string;
  parent: string;
  locations: string[];
}