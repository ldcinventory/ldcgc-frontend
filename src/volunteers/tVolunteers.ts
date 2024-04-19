import { Absence } from "../absences/tAbsences";
import { FindAllParams } from "../common/tCommon";
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

export interface VolunteersParams extends FindAllParams {
  builderAssistantId?: number
  userId?: number
}