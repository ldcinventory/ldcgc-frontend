import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Consumable, ConsumableParams, ConsumableWithId } from "./tConsumables"
import { PaginatedResponse, StatusType } from "../../common/tCommon"
import { RootState } from "../../app/index"
import { fetchConsumables } from "./consumablesApi"

export interface ConsumablesState {
  consumables: Consumable[]
  queryParams: ConsumableParams
  totalPages: number
  status: StatusType
  error: string | undefined
}

const initialState: ConsumablesState = {
  consumables: [],
  queryParams: { size: 10, pageIndex: 0 },
  totalPages: 0,
  status: "idle",
  error: undefined,
}

export const getConsumables =
  createAsyncThunk<any, ConsumableParams, { state: RootState }>(
    "consumables/list",
    async (queryParams
      , thunkApi) => {
      const state = thunkApi.getState()
      const newParams = { ...state.consumables.queryParams, ...queryParams }
      thunkApi.dispatch(updateQueryParams(newParams))
      const response = await fetchConsumables(newParams)
        .then(res => {
          if (!res.ok)
            throw new Error('Internal server error')

          return res.json()
        })
        .catch((error: string) => { throw new Error(`The server responded with an error: ${error}`) })

      return response
    })


const updateQueryParams =
  createAsyncThunk<any, ConsumableParams, { state: RootState }>(
    "consumables/updateParams",
    async (queryParams) => {
      return queryParams;
    }
  )

export const consumablesSlice = createSlice({
  name: "consumables",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getConsumables.pending, state => {
        state.status = "loading"
      })
      .addCase(
        getConsumables.fulfilled,
        (state, action: PayloadAction<{ data: PaginatedResponse<ConsumableWithId> }>) => {
          state.status = "succeeded"
          console.log(action.payload.data)
          state.consumables = action.payload.data.elements
          state.totalPages = action.payload.data.totalPages
        },
      )
      .addCase(getConsumables.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
      .addCase(updateQueryParams.fulfilled,
        (state, action: PayloadAction<ConsumableParams>) => {
          state.queryParams = action.payload
        }
      )
  }
})

export const { } = consumablesSlice.actions

export default consumablesSlice.reducer
