import { Absence } from "../absences/tAbsences";
import { FindAllParams } from "../common/tCommon";
import { Group } from "../groups/tGroups";

export interface VolunteerPayload {
  name: string
  lastName: string
  builderAssistantId: string
  isActive: boolean
  availability: string[]
  absences: Absence[]
}

export interface Volunteer extends VolunteerPayload{
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