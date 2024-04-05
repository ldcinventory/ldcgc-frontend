export interface Parent {
  id: number;
  name: string;
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