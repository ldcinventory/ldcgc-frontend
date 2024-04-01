import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"


import { ConsumableRegisterWithId, ConsumablesRegisterParams } from "../../../types/consumableRegisterType"
import { fetchConsumablesRegister, fetchDeleteConsumableRegister, fetchUpdateConsumableRegister } from "./consumablesRegisterAPI"
import { PaginatedResponse, StatusType } from "../../../types/commonTypes"
import { RootState } from "../../../app/index"

export interface ConsumablesRegisterState {
  consumablesRegister: ConsumableRegisterWithId[]
  queryParams: ConsumablesRegisterParams
  totalPages: number
  status: StatusType  
  error: string | undefined
}

const initialState: ConsumablesRegisterState = {
  consumablesRegister: [],
  queryParams: { size: 10, pageIndex: 0 },
  totalPages: 0,
  status: "idle",
  error: undefined,
}

export const getConsumablesRegister =
  createAsyncThunk<any, ConsumablesRegisterParams, {state: RootState}>(
    "register/consumables/fetchUsers",
    async (queryParams
      , thunkApi) => {
      const state = thunkApi.getState()
      const newParams = { ...state.consumablesRegister.queryParams, ...queryParams }
      thunkApi.dispatch(updateQueryParams(newParams))
      const response = await fetchConsumablesRegister(newParams)
        .catch(error => { throw new Error(`The server responded with an error: ${error}`)})
      return response.json()
    })

export const deleteConsumableRegister = 
  createAsyncThunk<any, number, {state:RootState}>(
    "register/consumables/delete",
    async (registerId, thunkApi) => {
      const response = await fetchDeleteConsumableRegister(registerId)
        .catch(error => { throw new Error(`The server responded with an error: ${error}`) })
      
      if(response.ok)
        thunkApi.dispatch(getConsumablesRegister(thunkApi.getState().consumablesRegister.queryParams))
      
      return response.json()
    }
  )

export const closeConsumableRegister =
  createAsyncThunk<any, ConsumableRegisterWithId, { state: RootState }>(
    "register/consumables/delete",
    async (register, thunkApi) => {
      if (register.stockAmountReturn === undefined)
        throw new Error('Error! Indica el stock devuelto antes de cerrar el registro')
      register = { ...register, registerTo: new Date() }
      const response = await fetchUpdateConsumableRegister(register)
        .catch(error => { throw new Error(`The server responded with an error: ${error}`) })
      if (response.ok)
        thunkApi.dispatch(getConsumablesRegister(thunkApi.getState().consumablesRegister.queryParams))

      return response.json()
    }
  )

const updateQueryParams = 
  createAsyncThunk<any, ConsumablesRegisterParams, { state: RootState }>(
    "register/consumables/updateParams",
    async (queryParams) => {
      return queryParams;
    }
)

export const consumablesRegisterSlice = createSlice({
  name: "consumablesRegister",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getConsumablesRegister.pending, state => {
        state.status = "loading"
      })
      .addCase(
        getConsumablesRegister.fulfilled,
        (state, action: PayloadAction<{ data: PaginatedResponse<ConsumableRegisterWithId> }>) => {
          state.status = "succeeded"
          state.consumablesRegister = action.payload.data.elements
          state.totalPages = action.payload.data.totalPages
        },
      )
      .addCase(getConsumablesRegister.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
      .addCase(updateQueryParams.fulfilled,
        (state, action: PayloadAction<ConsumablesRegisterParams>) => {
          state.queryParams = action.payload
        }
    )
      .addCase(deleteConsumableRegister.pending, state => {
        state.status = "loading"
      })
      .addCase(deleteConsumableRegister.fulfilled, state => {
        state.status = "succeeded"
      })
      .addCase(deleteConsumableRegister.rejected, (state, action) => {
        state.status = "failed"
        state.error =  action.error.message
      })
  }
})

export const { } = consumablesRegisterSlice.actions

export default consumablesRegisterSlice.reducer
