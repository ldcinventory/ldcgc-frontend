import { Group } from "../groups/tGroups"
import { Volunteer } from "../volunteers/tVolunteers"

export interface User {
  id: number
  email: string
  password: string
  role: "admin" | "user" | "manager"
  volunteer: Volunteer
  //responsibility: Respon
  group: Group
}