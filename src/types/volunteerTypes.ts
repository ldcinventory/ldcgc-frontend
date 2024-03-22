import { Location } from "./toolTypes";

export interface Volunteer {
  id: number;
  name: string;
  lastName: string;
  builderAssistantId: string;
  isActive: boolean;
  availability: string[];
  absences: Absence[];
  groupDto: GroupDto;
}

export interface Absence {
  id: number;
  dateFrom: Date;
  dateTo: Date;
  builderAssistantId: string;
}

export interface GroupDto {
  id: number;
  name: string;
  description: string;
  urlImage: string;
  phoneNumber: string;
  location: Location;
}
