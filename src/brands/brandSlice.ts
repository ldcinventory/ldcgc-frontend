import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../app/index"
import { Brand } from "./tBrands"
import { fetchBrands } from "./brandsApi"
import { PaginatedResponse } from "../common/tCommon"


export interface BrandState {
  brands: Brand[]
}

const initialState: BrandState = {
  brands: [],
}

export const getBrands =
  createAsyncThunk<any, undefined, { state: RootState }>(
    "brands/list",
    async (ignored, thunkApi) =>
      fetchBrands()
        .then(res => res.json())
        .then(json => json.data)
        .catch((error: string) => thunkApi.rejectWithValue(`The server responded with an error: ${error}`))
    )

export const brandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(
        getBrands.fulfilled,
        (state, action: PayloadAction<PaginatedResponse<Brand>>) => {
        state.brands = action.payload.elements
      })
      .addCase(getBrands.rejected, (state) => {

      })
  }
}
)

export const {  } = brandsSlice.actions

export default brandsSlice.reducer
