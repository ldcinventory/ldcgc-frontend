import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Volunteer, VolunteerPayload, VolunteerWithId, VolunteersParams } from "./tVolunteers";
import { fetchAddVolunteer, fetchDeleteVolunteer, fetchUpdateVolunteer, fetchVolunteers } from "./volunteerApi";
import { PaginatedResponse } from "../common/tCommon";
import { RootState } from "../app/index";
import { toast } from "sonner";
import { AnyAsyncThunk, FulfilledActionFromAsyncThunk, RejectedActionFromAsyncThunk } from "@reduxjs/toolkit/dist/matchers";

interface VolunteersState {
  volunteers: VolunteerWithId[]
  volunteersParams: VolunteersParams
  totalPages: number
  actualPage: number
}

const initialState: VolunteersState = {
  volunteers: [],
  volunteersParams: { pageIndex: 0, size: 10, filterString: '', isActive: undefined, builderAssistantId: '' },
  totalPages: 0,
  actualPage: 0
}

export const getVolunteers = createAsyncThunk<any, any, {state: RootState}>("volunteers/getVolunteers",
  async (ignored, thunkApi) => 
    fetchVolunteers({ volunteersParams: thunkApi.getState().volunteers.volunteersParams  })
      .then(res => res.json())
      .then(json => json.data)
)


export const deleteVolunteer = createAsyncThunk<any, string, { state: RootState }>("volunteers/deleteVolunteer",
  async (volunteerBuilderAssistantId, thunkApi) =>
    fetchDeleteVolunteer(volunteerBuilderAssistantId)
      .then(res => res.json())
      .then(() => thunkApi.dispatch(getVolunteers({})))
      .then(() => volunteerBuilderAssistantId)
      .catch(error => thunkApi.rejectWithValue(`Error al eliminar el voluntario: ${error.message}`))
)

export const updateVolunteer = createAsyncThunk<any, VolunteerWithId, { state: RootState }>("volunteers/updateVolunteer",
  async (volunteer, thunkApi) =>
  {
    const state = thunkApi.getState().volunteers
    const oldVolunteer = state.volunteers.find(v => v.id === volunteer.id)

    if (!oldVolunteer)
      return thunkApi.rejectWithValue('Error al eliminar el usuario: No hay ningún usuario con ese id.')

    thunkApi.dispatch(updateVolunteers(state.volunteers.map(v => v.id === volunteer.id ? volunteer : v)))

    return fetchUpdateVolunteer(volunteer)
      .then(res => res.json())
      .then(() => thunkApi.fulfillWithValue('Voluntario actualizado correctamente.'))
      .catch(error => {
        thunkApi.dispatch(updateVolunteers(state.volunteers.map(v => v.id === oldVolunteer.id ? oldVolunteer : v)))
        return thunkApi.rejectWithValue(`Error al actualizar el voluntario: ${error.message}`)
      })
  }
)

export const addVolunteer = createAsyncThunk<any, VolunteerPayload, { state: RootState }>("volunteers/addVolunteer",
  async (volunteer, thunkApi) =>
    fetchAddVolunteer(volunteer)
      .then(res => res.json())
      .then(() => thunkApi.dispatch(getVolunteers({})))
      .then(() => thunkApi.fulfillWithValue('Voluntario creado correctamente.'))
      .catch(error => thunkApi.rejectWithValue(`Error al crear el voluntario: ${error.message}`))
)

export const volunteersSlice = createSlice({
  name: 'volunteers',
  initialState,
  reducers: {
    updateVolunteersParams: (state, action: PayloadAction<VolunteersParams>) => {
      const newParams = {...state.volunteersParams, ...action.payload}
      return {...state, volunteersParams: newParams}
    },
    updateVolunteers: (state, action: PayloadAction<VolunteerWithId[]>) => {
      return {...state, volunteers: action.payload}
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVolunteers.fulfilled, (state, action: PayloadAction<PaginatedResponse<VolunteerWithId>>) => {
        state.volunteers = action.payload.elements
        state.totalPages = action.payload.totalPages
        state.actualPage = action.payload.actualPage
      })
      .addCase(deleteVolunteer.fulfilled, (state, action: PayloadAction<string>) => {
        state.volunteers = state.volunteers.filter(v => v.builderAssistantId !== action.payload)
        toast.success('Voluntario eliminado correctamente')      
      })
      .addCase(deleteVolunteer.rejected, (state, action: PayloadAction<RejectedActionFromAsyncThunk<AnyAsyncThunk>>) => {
        toast.error(action.payload)
      })
      .addCase(updateVolunteer.fulfilled, (state, action: PayloadAction<FulfilledActionFromAsyncThunk<AnyAsyncThunk>>) => {
        toast.success(action.payload)
      })
      .addCase(updateVolunteer.rejected, (state, action: PayloadAction<RejectedActionFromAsyncThunk<AnyAsyncThunk>>) => {
        toast.error(action.payload)
      })
      .addCase(addVolunteer.fulfilled, (state, action: PayloadAction<FulfilledActionFromAsyncThunk<AnyAsyncThunk>>) => {
        const form = document.getElementById("addVolunteerForm") as HTMLFormElement
        form.reset();
        
        toast.success(action.payload)
      })
      .addCase(addVolunteer.rejected, (state, action: PayloadAction<RejectedActionFromAsyncThunk<AnyAsyncThunk>>) => {
        toast.error(action.payload)
      })
  }
})

export const { updateVolunteersParams, updateVolunteers } = volunteersSlice.actions

export default volunteersSlice.reducer