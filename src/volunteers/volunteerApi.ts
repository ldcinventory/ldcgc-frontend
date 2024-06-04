import { fetchApi } from "../api/fetchApi"
import { Volunteer, VolunteerPayload, VolunteerWithId, VolunteersParams } from "./tVolunteers"
const VOLUNTEERS_PATH = '/volunteers'

export const fetchVolunteers = ({ volunteersParams }: { volunteersParams: VolunteersParams }) =>
  fetchApi({ method: 'GET', path: VOLUNTEERS_PATH, queryParams: volunteersParams })

export const fetchDeleteVolunteer = (volunteerBuilderAssistantId: string) => 
  fetchApi({ method: 'DELETE', path: `${VOLUNTEERS_PATH}/${volunteerBuilderAssistantId}` })

export const fetchUpdateVolunteer = (volunteer: VolunteerWithId) =>
  fetchApi({ method: 'PUT', path: `${VOLUNTEERS_PATH}/${volunteer.builderAssistantId}`, body: JSON.stringify(volunteer) })

export const fetchAddVolunteer = (volunteer: VolunteerPayload) => 
  fetchApi({method: 'POST', path: VOLUNTEERS_PATH, body: JSON.stringify(volunteer)})