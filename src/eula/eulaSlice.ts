import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { RootState } from "../app/index"
import { EulaParams, EulaResponse } from "./tEula"
import { fetchEula, fetchUpdateEula } from "./eulaApi"
import { toast } from "sonner"
import { getMyUser } from "../users/usersSlice"

export interface EulaState {
  eula: EulaResponse | null
}

const initialState: EulaState = {
  eula: null
}
export const getEula = createAsyncThunk("eula/get", async () => 
  fetchEula()
    .then(res => res.json())
)

export const updateEula = createAsyncThunk<any, EulaParams, {state: RootState}>("eula/accept", async (eulaParams, thunkApi) => 
  fetchUpdateEula(eulaParams)
    .then(() => thunkApi.dispatch(getMyUser()))
)

export const eulaSlice = createSlice({
  name: "eula",
  initialState,
  reducers: {
    // empty pure reducers for now...
  },
  extraReducers: builder => {
    builder
      .addCase(getEula.fulfilled, (state, action: PayloadAction<EulaResponse>) => {
        state.eula = action.payload
      })
      .addCase(getEula.rejected, () => {
        toast.error('Error al obtener el EULA. Inténtelo de nuevo más tarde. Si el problema persiste, contacte con el adminsitrador.')
      })
      .addCase(updateEula.fulfilled, () => {
        window.location.replace('/')
      })
      .addCase(updateEula.rejected, () => {
        toast.error('Error al aceptar el EULA. Inténtelo de nuevo más tarde. Si el problema persiste, contacte con el adminsitrador.')
      })
  }
})

export const { } = eulaSlice.actions

export const selectAllUsers = (state: RootState) => state.eula.eula

export default eulaSlice.reducer
