import { useAppDispatch, useAppSelector } from "../../app/store";
import { addRegisters, getPossibleConsumables, getPossibleTools, getPossibleVolunteers, removeSelectedConsumable, removeSelectedTool, selectConsumable, selectTool, selectVolunteer, setCurrentConsumable, setCurrentTool, setCurrentVolunteer, toggleModalOpened, updateAddRegistersDate, updateSelectedConsumable } from "./registerSlice";
import { ChangeEvent, FormEvent } from "react";
import { getConsumablesRegister } from "../consumables/consumablesRegisterSlice";
import { Volunteer } from "../../volunteers/tVolunteers";
import { Tool } from "../../resources/tools/tTools";
import { SelectedTool, ToolRegister } from "../tools/tToolRegisters";
import { ConsumableWithId } from "../../resources/consumables/tConsumables";
import { ConsumableRegister, SelectedConsumable } from "../consumables/tConsumableRegisters";
import { useDebouncedCallback } from "use-debounce";

export const useRegisterModal = () => {
  const state = useAppSelector(state => state.register)
  const dispatch = useAppDispatch()
  const getPossibleVolunteerssDebounced = useDebouncedCallback((volunteersParams) => dispatch(getPossibleVolunteers(volunteersParams)), 500)
  const getPossibleToolsDebounced = useDebouncedCallback((toolsParams) => dispatch(getPossibleTools(toolsParams)), 500)
  const getPossibleConsumablesDebounced = useDebouncedCallback((consumablesParams) => dispatch(getPossibleConsumables(consumablesParams)), 500)

  const handleToggleModalOpened = () => dispatch(toggleModalOpened())
  const handleSelectVolunteer = (volunteer: Volunteer) => dispatch(selectVolunteer(volunteer))
  const handleGetPossibleVolunteers = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    dispatch(setCurrentVolunteer(inputValue))
    let volunteersParams
    const baId = Number(inputValue)
    if (isNaN(baId))
      volunteersParams = { filterString: inputValue }
    else
      volunteersParams = { builderAssistantId: baId }

    getPossibleVolunteerssDebounced(volunteersParams)
  }
  const handleGetPossibleTools = (e: ChangeEvent<HTMLInputElement>) => {
    const newTool = e.target.value
    dispatch(setCurrentTool(newTool))

    const toolsParams = { filterString: newTool }
    getPossibleToolsDebounced(toolsParams)
  }

  const handleSelectTool = (tool: Tool) => dispatch(selectTool(tool))
  const handleRemoveSelectedTool = (toolRegister: SelectedTool) => dispatch(removeSelectedTool(toolRegister))
  const handleGetPossibleConsumables = (e: ChangeEvent<HTMLInputElement>) => {
    const newConsumable = e.target.value
    dispatch(setCurrentConsumable(newConsumable))

    const consumablesParams = { filterString: newConsumable }
    getPossibleConsumablesDebounced(consumablesParams)
  }

  const handleSelectConsumable = (consumable: ConsumableWithId) => dispatch(selectConsumable(consumable))
  const handleRemoveSelectedConsumable = (consumableRegister: SelectedConsumable) => dispatch(removeSelectedConsumable(consumableRegister))
  const handleUpdateSelectedConsumable = (consumableRegister: SelectedConsumable) => dispatch(updateSelectedConsumable(consumableRegister))
  const handleAddRegisters = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(addRegisters())
    dispatch(getConsumablesRegister({}))
  }

  const handleSetAddRegistersDate = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateAddRegistersDate(e.target.value))
  }

  return {
    state, handleToggleModalOpened, handleSelectVolunteer, handleGetPossibleVolunteers, handleGetPossibleTools, handleSelectTool, handleRemoveSelectedTool, handleGetPossibleConsumables,
    handleSelectConsumable, handleRemoveSelectedConsumable, handleUpdateSelectedConsumable, handleAddRegisters, handleSetAddRegistersDate
  }
}