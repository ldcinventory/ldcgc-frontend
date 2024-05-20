import { Brand } from "../../brands/tBrands"
import { Group } from "../../groups/tGroups"
import { Location } from "../../locations/tLocations"
import { ResourceType } from "../tResources"


export interface ConsumablePost {
  resourceType: ResourceType
  brand: Brand
  name: string
  model: string
  description: string
  stock: number
  minStock: number
  stockType: string
  quantityEachItem: number
  price: number
  purchaseDate: Date
  location: Location
  group: Group
}

export interface Consumable extends ConsumablePost{
  barcode: string
  urlImages: string[]  
  uploadStatus: string
}

export interface ConsumableWithId extends Consumable {
  id: number
}

export interface ConsumableParams {
  pageIndex?: number
  size?: number
  filterString?: string
  sortField?: string
  hasStock?: boolean
  name?: string
  barcode?: string
  location?: string
  model?: string
  brand?: string
  groupId?: number
}

export interface ConsumablePost {

}