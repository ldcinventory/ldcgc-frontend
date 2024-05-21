import { useAppDispatch, useAppSelector } from "../../app/store";
import { getPossibleVolunteers, selectVolunteer, setCurrentVolunteer, toggleModalOpened, updateAddRegistersDate } from "./registerSlice";
import { ChangeEvent, FormEvent } from "react";
import { addConsumableRegisters, getConsumablesRegister, getPossibleConsumables, removeSelectedConsumable, selectConsumable, setCurrentConsumable, updateSelectedConsumable } from "../consumables/consumablesRegisterSlice";
import { VolunteerWithId } from "../../volunteers/tVolunteers";
import { Tool } from "../../resources/tools/tTools";
import { SelectedTool } from "../tools/tToolRegisters";
import { ConsumableWithId } from "../../resources/consumables/tConsumables";
import { SelectedConsumable } from "../consumables/tConsumableRegisters";
import { useDebouncedCallback } from "use-debounce";
import { addToolRegisters, getPossibleTools, removeSelectedTool, selectTool, setCurrentTool } from "../tools/toolsRegisterSlice";

export const useRegisterModal = () => {
  const { toolsRegister, register, consumablesRegister } = useAppSelector(state => state)
  const dispatch = useAppDispatch()
  const getPossibleVolunteerssDebounced = useDebouncedCallback((volunteersParams) => dispatch(getPossibleVolunteers(volunteersParams)), 500)
  const getPossibleToolsDebounced = useDebouncedCallback((toolsParams) => dispatch(getPossibleTools(toolsParams)), 500)
  const getPossibleConsumablesDebounced = useDebouncedCallback((consumablesParams) => dispatch(getPossibleConsumables(consumablesParams)), 500)

  const handleToggleModalOpened = () => dispatch(toggleModalOpened())
  const handleSelectVolunteer = (volunteer: VolunteerWithId) => dispatch(selectVolunteer(volunteer))
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
    //dispatch(addRegisters())


    const volunteer = register.selectedVolunteer
    if (volunteer === null)
      return

    const registerFrom = new Date(register.registersAddDate)

    if (toolsRegister.selectedTools.length > 0) {

      const toolRegisters = toolsRegister.selectedTools.map(toolRegister => {
        return { ...toolRegister, volunteerBuilderAssistantId: volunteer.builderAssistantId, registerFrom, volunteerName: volunteer.name, volunteerLastName: volunteer.lastName, toolUrlImages: [] }
      })
      dispatch(addToolRegisters(toolRegisters))
    }

    const validConsumables = consumablesRegister.selectedConsumables
      .filter(consumableRegister => consumableRegister.stockAmountRequest > 0)

    if (validConsumables.length > 0) {
      const consumablesRegistersToAdd = validConsumables
        .map(consumableRegister => {
          return {
            ...consumableRegister, volunteerBuilderAssistantId: volunteer.builderAssistantId, registerFrom, closedRegister: false, volunteerName: volunteer.name,
            volunteerLastName: volunteer.lastName, processingStockChanges: true
          }
        })

      dispatch(addConsumableRegisters(consumablesRegistersToAdd))
    }

    dispatch(getConsumablesRegister({}))
  }

  const handleSetAddRegistersDate = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateAddRegistersDate(e.target.value))
  }

  return {
    register, toolsRegister, consumablesRegister, handleToggleModalOpened, handleSelectVolunteer, handleGetPossibleVolunteers, handleGetPossibleTools, handleSelectTool, handleRemoveSelectedTool, handleGetPossibleConsumables,
    handleSelectConsumable, handleRemoveSelectedConsumable, handleUpdateSelectedConsumable, handleAddRegisters, handleSetAddRegistersDate
  }
}