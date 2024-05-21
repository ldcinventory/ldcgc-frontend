import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { PaginatedResponse, StatusType } from "../../common/tCommon"
import { VolunteerWithId, VolunteersParams } from "../../volunteers/tVolunteers"
import { RootState } from "../../app/index"
import { fetchVolunteers } from "../../volunteers/volunteerApi"

export interface RegisterState {
  status: StatusType
  error: string | undefined
  message: string | undefined
  currentVolunteer: string
  possibleVolunteers: VolunteerWithId[]
  selectedVolunteer: VolunteerWithId | null
  volunteersParams: VolunteersParams
  modalOpened: boolean
  registersAddDate: string
}

const initialState: RegisterState = {
  status: "idle",
  error: undefined,
  message: undefined,
  currentVolunteer: "",
  possibleVolunteers: [],
  selectedVolunteer: null,
  volunteersParams: { pageIndex: 0, size: 10 },
  modalOpened: false,
  registersAddDate: new Date().toISOString()
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
        .catch((error: string) => { throw new Error(`The server responded with an error: ${error}`) })
      return response.json()
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
    selectVolunteer: (state, action: PayloadAction<VolunteerWithId>) => {
      const newVolunteer = action.payload
      return { ...state, selectedVolunteer: newVolunteer, currentVolunteer: `${newVolunteer.name} ${newVolunteer.lastName} (${newVolunteer.builderAssistantId})` }
    },
    resetState: (state, action: PayloadAction<RegisterState>) => {
      return { ...initialState, ...action.payload }
    },
    updateAddRegistersDate: (state, action: PayloadAction<string>) => {
      return { ...state, registersAddDate: action.payload }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPossibleVolunteers.fulfilled, (state, action: PayloadAction<{ data: PaginatedResponse<VolunteerWithId> }>) => {
        state.status = "succeeded"
        state.possibleVolunteers = action.payload.data.elements
      })
  }
})

export const { toggleModalOpened, setCurrentVolunteer, updateVolunteersParams, selectVolunteer, resetState, updateAddRegistersDate } = registerSlice.actions

export default registerSlice.reducer
