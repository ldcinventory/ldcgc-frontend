import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/store"
import { deleteVolunteer, getVolunteers, updateVolunteer, updateVolunteersParams } from "../volunteersSlice"
import { VolunteerWithId, VolunteersParams } from "../tVolunteers"
import { useDebouncedCallback } from "use-debounce"

export const useVolunteers = () => {
  const { volunteers: volunteersState } = useAppSelector(state => state)
  const dispatch = useAppDispatch()
  const [showFilters, setShowFilters] = useState(false)
  const debouncedGetVolunteers = useDebouncedCallback((newParams) => {
    dispatch(getVolunteers({}))
  }, 500)
  
  useEffect(() => {
    dispatch(getVolunteers({}))
  }, []
  )
  
  const handleDeleteVolunteer = (id: string) => () => dispatch(deleteVolunteer(id))
  
  const toggleShowFilters = () => setShowFilters(!showFilters)

  const handleEditVolunteersParams = (newParams: VolunteersParams) => {
    dispatch(updateVolunteersParams(newParams))
    debouncedGetVolunteers(newParams)
  }

  const handleModifyVolunteer = (volunteer: VolunteerWithId) => () => {
    dispatch(updateVolunteer(volunteer))
  }

  return { volunteersState, handleDeleteVolunteer, showFilters, toggleShowFilters, handleEditVolunteersParams, handleModifyVolunteer }
}