export interface Brand {
  id: number;
  name: string;
  parent: Parent;
}

export interface Parent {
  id: number;
  name: string;
}

export interface Group {
  id: number;
  name: string;
  phoneNumber: string;
  location: Location;
}

export interface Location {
  id: number;
  name: string;
  description: string;
}

export interface PaginatedResponse<T> {
  elements: T[];
  numElements: number;
  elementsPerPage: number;
  elementsThisPage: number;
  actualPage: number;
  actualPageFrom: number;
  actualPageTo: number;
  totalPages: number;
}

export type StatusType = "idle" | "loading" | "failed" | "succeeded" 