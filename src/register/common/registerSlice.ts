import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { PaginatedResponse, StatusType } from "../../common/tCommon"
import { Volunteer, VolunteersParams } from "../../volunteers/tVolunteers"
import { RootState } from "../../app/index"
import { fetchVolunteers } from "../../volunteers/volunteerService"
import { Tool, ToolsParams } from "../../resources/tools/tTools"
import { Consumable } from "../../resources/consumables/tConsumables"
import { fecthToolsLoose } from "../../resources/tools/toolService"

export interface RegisterState {  
  status: StatusType
  error: string | undefined
  currentVolunteer: string
  possibleVolunteers: Volunteer[]
  selectedVolunteer: Volunteer | null
  volunteersParams: VolunteersParams
  currentTool: string
  possibleTools: Tool[]
  selectedTools: Tool[]
  toolsParams: ToolsParams
  currentConsumable: string
  possibleConsumables: Consumable[]
  selectedConsumables: Consumable[]
  modalOpened: boolean
}

const initialState: RegisterState = {
  status: "idle",
  error: undefined,
  currentVolunteer: "",
  possibleVolunteers: [],
  selectedVolunteer: null,
  volunteersParams: { pageIndex: 0, size: 10 },
  currentTool: "",
  possibleTools: [],
  selectedTools: [],
  toolsParams: {},
  currentConsumable: "",
  possibleConsumables: [],
  selectedConsumables: [],
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
        .catch(error => { throw new Error(`The server responded with an error: ${error}`) })
      return response.json()
    })
  
  
export const getPossibleTools =
  createAsyncThunk<any, ToolsParams, { state: RootState }>(
    "register/possibleTools",
    async (toolsParams
      , thunkApi) => {
      const state = thunkApi.getState()
      const newParams = { ...state.register.toolsParams, ...toolsParams }
      newParams.status = 'AVAILABLE'
      thunkApi.dispatch(updateToolsParams(newParams))
      const response = await fecthToolsLoose({ toolsParams: newParams })
        .catch(error => { throw new Error(`The server responded with an error: ${error}`) })
      return response.json()
    })


export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    toggleModalOpened: (state) => {
      return {...state, modalOpened: !state.modalOpened}
    },
    setCurrentVolunteer: (state, action: PayloadAction<string>) => {
      const newCurrentVolunteer = action.payload
      
      return {...state, currentVolunteer: newCurrentVolunteer, selectedVolunteer: null}
    },
    updateVolunteersParams: (state, action: PayloadAction<VolunteersParams>) => {
      return {...state, volunteersParams: action.payload}
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
      return {...state, toolsParams: action.payload}
    },
    selectTool: (state, action: PayloadAction<Tool>) => {
      const newTool = action.payload
      return { ...state, selectedTools: [...state.selectedTools, newTool], currentTool: '', possibleTools: [] }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPossibleVolunteers.fulfilled, (state, action: PayloadAction<{ data: PaginatedResponse<Volunteer> }>) => {
        state.status = "succeeded"
        state.possibleVolunteers = action.payload.data.elements 
      })
      .addCase(getPossibleTools.fulfilled, (state, action: PayloadAction<{ data: PaginatedResponse<Tool> }>) => {
        state.status = "succeeded"
        state.possibleTools = action.payload.data.elements
    })
  }
})

export const { toggleModalOpened, setCurrentVolunteer, updateVolunteersParams, selectVolunteer, setCurrentTool, updateToolsParams, selectTool } = registerSlice.actions

export default registerSlice.reducer
