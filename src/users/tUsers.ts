import { Group } from "../groups/tGroups"
import { VolunteerWithId } from "../volunteers/tVolunteers"


export interface User {
  id: number;
  email: string;
  password: string;
  role: string;
  volunteer: VolunteerWithId;
  responsibility: Responsibility;
  group: Group;
  tokenExpires: Date;
  refreshExpires: Date;
}

export interface Responsibility {
  id: number;
  name: string;
  locked: boolean;
}
