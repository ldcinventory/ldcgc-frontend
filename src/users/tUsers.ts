import { Group } from "../groups/tGroups"
import { VolunteerWithId } from "../volunteers/tVolunteers"

export interface User {
  id: number
  email: string
  password: string
  role: "admin" | "user" | "manager"
  volunteer: VolunteerWithId
  //responsibility: Respon
  group: Group
}