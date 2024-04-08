import { Absence } from "../absences/tAbsences";
import { Group } from "../groups/tGroups";

export interface Volunteer {
  id: number;
  name: string;
  lastName: string;
  builderAssistantId: string;
  isActive: boolean;
  availability: string[];
  absences: Absence[];
  groupDto: Group;
}
