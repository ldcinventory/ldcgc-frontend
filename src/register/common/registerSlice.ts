import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { PaginatedResponse, StatusType } from "../../common/tCommon"
import { Volunteer, VolunteersParams } from "../../volunteers/tVolunteers"
import { RootState } from "../../app/index"
import { fetchVolunteers } from "../../volunteers/volunteerService"
import { Tool, ToolsParams } from "../../resources/tools/tTools"
import { ConsumableParams, ConsumableWithId } from "../../resources/consumables/tConsumables"
import { fecthToolsLoose } from "../../resources/tools/toolService"
import { fetchConsumables } from "../../resources/consumables/consumablesAPI"
import { ConsumableRegister } from "../consumables/tConsumableRegisters"
import { ToolRegister } from "../tools/tToolRegisters"
import { fetchCreateToolRegisters } from "../tools/toolRegisterApi"
import { fetchCreateConsumableRegisters } from "../consumables/consumablesRegisterApi"

export interface RegisterState {
  status: StatusType
  error: string | undefined
  message: string | undefined
  currentVolunteer: string
  possibleVolunteers: Volunteer[]
  selectedVolunteer: Volunteer | null
  volunteersParams: VolunteersParams
  currentTool: string
  possibleTools: Tool[]
  selectedTools: ToolRegister[]
  toolsParams: ToolsParams
  currentConsumable: string
  possibleConsumables: ConsumableWithId[]
  selectedConsumables: ConsumableRegister[]
  consumablesParams: ConsumableParams
  modalOpened: boolean
}

const initialState: RegisterState = {
  status: "idle",
  error: undefined,
  message: undefined,
  currentVolunteer: "",
  possibleVolunteers: [],
  selectedVolunteer: null,
  volunteersParams: { pageIndex: 0, size: 10 },
  currentTool: "",
  possibleTools: [],
  selectedTools: [],
  toolsParams: { pageIndex: 0, size: 10, status: 'AVAILABLE' },
  currentConsumable: "",
  possibleConsumables: [],
  selectedConsumables: [],
  consumablesParams: { pageIndex: 0, size: 10, hasStock: true },
  modalOpened: false
}

export const getPossibleVolunteers =
  createAsyncThunk<any, VolunteersParams, { state: RootState }>(
    "register/possibleVolunteers",
    async (volunteersParams
      , thunkApi) => {
      const state = thunkApi.getState()
      const newParams = { ...state.register.volunteersParams, ...volunteersParams }
      thunkApi.dispatch(updateVolunteersParams(newParams))
      const response = await fetchVolunteers({ volunteersParams: newParams })
        .catch((error:string) => { throw new Error(`The server responded with an error: ${error}`) })
      return response.json()
    })


export const getPossibleTools =
  createAsyncThunk<any, ToolsParams, { state: RootState }>(
    "register/possibleTools",
    async (toolsParams
      , thunkApi) => {
      const state = thunkApi.getState()
      const newParams = { ...state.register.toolsParams, ...toolsParams }
      thunkApi.dispatch(updateToolsParams(newParams))
      const response = await fecthToolsLoose({ toolsParams: newParams })
        .catch((error:string) => { throw new Error(`The server responded with an error: ${error}`) })
      return response.json()
    })


export const getPossibleConsumables =
  createAsyncThunk<any, ConsumableParams, { state: RootState }>(
    "register/possibleConsumables",
    async (consumablesParams
      , thunkApi) => {
      const state = thunkApi.getState()
      const newParams = { ...state.register.consumablesParams, ...consumablesParams }      
      thunkApi.dispatch(updateConsumablesParams(newParams))
      const response = await fetchConsumables(newParams)
        .catch((error:string) => { throw new Error(`The server responded with an error: ${error}`) })
      return response.json()
    })

export const addRegisters =
  createAsyncThunk<any, void, { state: RootState }>(
    "register/AddRegisters",
    async (ignored, thunkApi) => {
      const state = thunkApi.getState().register
      const volunteer = state.selectedVolunteer
      if (volunteer === null)
        throw new Error('El campo de voluntario no puede estar vacío')

      const toolRegisters = state.selectedTools.map(toolRegister => {
        return { ...toolRegister, volunteerBuilderAssistantId: volunteer.builderAssistantId, registerFrom: new Date() }
      })
      const toolsResponse = await fetchCreateToolRegisters(toolRegisters)
        .catch((error:string) => { throw new Error(`The server responded with an error: ${error}`) })

      const consumablesRegisters = state.selectedConsumables
        .filter(consumableRegister => consumableRegister.stockAmountRequest > 0)
        .map(consumableRegister => {
        return { ...consumableRegister, volunteerBAId: volunteer.builderAssistantId, registerFrom: new Date() }
      })

      const consumablesResponse = await fetchCreateConsumableRegisters(consumablesRegisters)
        .catch((error:string) => { throw new Error(`The server responded with an error: ${error}`) })

      if (toolsResponse.ok && consumablesResponse.ok) {
        thunkApi.dispatch(resetState({ ...initialState, modalOpened: state.modalOpened, message: "Registros añadidos correctamente" }))
        setTimeout(() => thunkApi.dispatch(resetState({ ...initialState, modalOpened: state.modalOpened, message: undefined })),
          1500)
      }

      return toolsResponse.json()
    })


export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    toggleModalOpened: (state) => {
      return { ...state, modalOpened: !state.modalOpened }
    },
    setCurrentVolunteer: (state, action: PayloadAction<string>) => {
      const newCurrentVolunteer = action.payload

      return { ...state, currentVolunteer: newCurrentVolunteer, selectedVolunteer: null }
    },
    updateVolunteersParams: (state, action: PayloadAction<VolunteersParams>) => {
      return { ...state, volunteersParams: action.payload }
    },
    selectVolunteer: (state, action: PayloadAction<Volunteer>) => {
      const newVolunteer = action.payload
      return { ...state, selectedVolunteer: newVolunteer, currentVolunteer: `${newVolunteer.name} ${newVolunteer.lastName} (${newVolunteer.builderAssistantId})` }
    },
    setCurrentTool: (state, action: PayloadAction<string>) => {
      const newCurrentTool = action.payload

      return { ...state, currentTool: newCurrentTool }
    },
    updateToolsParams: (state, action: PayloadAction<ToolsParams>) => {
      return { ...state, toolsParams: action.payload }
    },
    selectTool: (state, action: PayloadAction<Tool>) => {
      const newTool = action.payload
      const selectedTool = {
        toolName: newTool.name, toolBarcode: newTool.barcode,
        registerFrom: new Date(), toolUrlImages: newTool.urlImages,
        volunteerName: state.selectedVolunteer === null ? '' : state.selectedVolunteer.name,
        volunteerLastName: state.selectedVolunteer === null ? '' : state.selectedVolunteer?.lastName,
        volunteerBuilderAssistantId: state.selectedVolunteer === null ? '' : state.selectedVolunteer?.builderAssistantId
      }
      return { ...state, selectedTools: [...state.selectedTools, selectedTool], currentTool: '', possibleTools: [] }
    },
    removeSelectedTool: (state, action: PayloadAction<ToolRegister>) => {
      const newSelectedTools = state.selectedTools.filter(t => t.toolBarcode !== action.payload.toolBarcode)
      return { ...state, selectedTools: newSelectedTools }
    },
    setCurrentConsumable: (state, action: PayloadAction<string>) => {
      const newCurrentConsumable = action.payload

      return { ...state, currentConsumable: newCurrentConsumable }
    },
    updateConsumablesParams: (state, action: PayloadAction<ConsumableParams>) => {
      return { ...state, consumablesParams: action.payload }
    },
    selectConsumable: (state, action: PayloadAction<ConsumableWithId>) => {
      const newConsumable = action.payload
      const selectedConsumable = {
        consumableName: newConsumable.name, consumableStockType: newConsumable.stockType, consumableBarcode: newConsumable.barcode, stockAmountRequest: 0, closedRegister: false, volunteerBAId: '', volunteerName: '',
        volunteerLastName: '', registerFrom: new Date(), processingStockChanges: true }
      return { ...state, selectedConsumables: [...state.selectedConsumables, selectedConsumable], currentConsumable: '', possibleConsumables: [] }
    },
    updateSelectedConsumable: (state, action: PayloadAction<ConsumableRegister>) => {
      const newConsumable = action.payload
      const newSelectedConsumables = state.selectedConsumables.filter(consumableRegister => newConsumable.consumableBarcode !== consumableRegister.consumableBarcode)
      return { ...state, selectedConsumables: [...newSelectedConsumables, newConsumable]}
    },
    removeSelectedConsumable: (state, action: PayloadAction<ConsumableRegister>) => {
      const newSelectedConsumables = state.selectedConsumables.filter(c => c.consumableBarcode !== action.payload.consumableBarcode)
      return { ...state, selectedConsumables: newSelectedConsumables }
    },
    resetState: (state, action: PayloadAction<RegisterState>) => {
      return { ...initialState, ...action.payload }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPossibleVolunteers.fulfilled, (state, action: PayloadAction<{ data: PaginatedResponse<Volunteer> }>) => {
        state.status = "succeeded"
        state.possibleVolunteers = action.payload.data.elements
      })
      .addCase(getPossibleTools.fulfilled, (state, action: PayloadAction<{ data: PaginatedResponse<Tool> }>) => {
        state.status = "succeeded"
        const excludedBarcodes = state.selectedTools.map(t => t.toolBarcode)
        const newPossibleTools = action.payload.data.elements.filter(t => !excludedBarcodes.includes(t.barcode))
        state.possibleTools = newPossibleTools
      })
      .addCase(getPossibleConsumables.fulfilled, (state, action: PayloadAction<{ data: PaginatedResponse<ConsumableWithId> }>) => {
        state.status = "succeeded"
        const excludedBarcodes = state.selectedConsumables.map(c => c.consumableBarcode)
        const newPossibleConsumables = action.payload.data.elements.filter(c => !excludedBarcodes.includes(c.barcode))
        state.possibleConsumables = newPossibleConsumables
      })
      .addCase(addRegisters.fulfilled, (state, action: PayloadAction) => {
        state.status = "succeeded"
      })
  }
})

export const { toggleModalOpened, setCurrentVolunteer, updateVolunteersParams, selectVolunteer, setCurrentTool, updateToolsParams, selectTool, removeSelectedTool,
  setCurrentConsumable, updateConsumablesParams, selectConsumable, updateSelectedConsumable, removeSelectedConsumable, resetState
} = registerSlice.actions

export default registerSlice.reducer
