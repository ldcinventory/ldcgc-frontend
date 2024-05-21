import { Absence } from "../absences/tAbsences";
import { FindAllParams } from "../common/tCommon";
import { Group } from "../groups/tGroups";

export interface Volunteer {
  name: string
  lastName: string
  builderAssistantId: string
  isActive: boolean
  availability: string[]
  absences: Absence[]
  group: Group
}

export interface VolunteerWithId  extends Volunteer{
  id: number
}

export interface VolunteersParams extends FindAllParams {
  builderAssistantId?: string
  userId?: number
  isActive?: boolean
}