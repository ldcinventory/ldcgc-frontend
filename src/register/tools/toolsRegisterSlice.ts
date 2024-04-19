import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"


import { PaginatedResponse, StatusType } from "../../common/tCommon"
import { RootState } from "../../app/index"
import { ToolRegisterParams, ToolRegisterWithId } from "./tToolRegisters"
import { fetchDeleteToolRegister, fetchGetToolRegisters, fetchUpdateToolRegister } from "./toolRegisterApi"

export interface ToolsRegisterState {
  toolsRegister: ToolRegisterWithId[]
  queryParams: ToolRegisterParams
  totalPages: number
  status: StatusType
  error: string | undefined
}

const initialState: ToolsRegisterState = {
  toolsRegister: [],
  queryParams: { size: 10, pageIndex: 0 },
  totalPages: 0,
  status: "idle",
  error: undefined,
}

export const getToolsRegister =
  createAsyncThunk<any, ToolRegisterParams, { state: RootState }>(
    "register/tools/list",
    async (queryParams
      , thunkApi) => {
      const state = thunkApi.getState()
      const newParams = { ...state.toolsRegister.queryParams, ...queryParams }
      thunkApi.dispatch(updateQueryParams(newParams))
      const response = await fetchGetToolRegisters(newParams)
        .catch((error:string) => { throw new Error(`The server responded with an error: ${error}`) })
      return response.json()
    })

export const deleteToolRegister =
  createAsyncThunk<any, number, { state: RootState }>(
    "register/tools/delete",
    async (registerId, thunkApi) => {
      const response = await fetchDeleteToolRegister(registerId)
        .catch((error:string) => { throw new Error(`The server responded with an error: ${error}`) })

      if (response.ok)
        thunkApi.dispatch(getToolsRegister(thunkApi.getState().toolsRegister.queryParams))

      return response.json()
    }
  )

export const closeToolRegister =
  createAsyncThunk<any, ToolRegisterWithId, { state: RootState }>(
    "register/tools/delete",
    async (register, thunkApi) => {
      register = { ...register, registerTo: new Date() }
      const response = await fetchUpdateToolRegister(register)
        .catch((error:string) => { throw new Error(`The server responded with an error: ${error}`) })
      
      if (response.ok)
        thunkApi.dispatch(getToolsRegister(thunkApi.getState().toolsRegister.queryParams))

      return response.json()
    }
  )

export const toolsRegisterSlice = createSlice({
  name: "toolsRegister",
  initialState,
  reducers: {
    updateQueryParams: (state, action: PayloadAction<ToolRegisterParams>) => {
      return {...state, queryParams: action.payload}
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getToolsRegister.pending, state => {
        state.status = "loading"
      })
      .addCase(
        getToolsRegister.fulfilled,
        (state, action: PayloadAction<{ data: PaginatedResponse<ToolRegisterWithId> }>) => {
          state.status = "succeeded"
          state.toolsRegister = action.payload.data.elements
          state.totalPages = action.payload.data.totalPages
        },
      )
      .addCase(getToolsRegister.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
      .addCase(deleteToolRegister.pending, state => {
        state.status = "loading"
      })
      .addCase(deleteToolRegister.fulfilled, state => {
        state.status = "succeeded"
      })
      .addCase(deleteToolRegister.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
  }
})

export const { updateQueryParams } = toolsRegisterSlice.actions

export default toolsRegisterSlice.reducer
