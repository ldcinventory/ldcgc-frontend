import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../app/index"
import { fetchLocations } from "./locationsApi"
import { Location } from "./tLocations"

export interface LocationState {
  locations: Location[]
}

const initialState: LocationState = {
  locations: [],
}

export const getLocations =
  createAsyncThunk<any, undefined, { state: RootState }>(
    "locations/list",
    async (ignored, thunkApi) =>
      fetchLocations()
        .then(res => res.json())
        .then(json => json.data)
        .catch((error: string) => thunkApi.rejectWithValue(`The server responded with an error: ${error}`))
    )



export const locationsSlice = createSlice({
  name: "locations",
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(
        getLocations.fulfilled,
        (state, action: PayloadAction<Location[]>) => {
        state.locations = action.payload
      })
      .addCase(getLocations.rejected, (state) => {

      })
  }
}
)

export const {  } = locationsSlice.actions

export default locationsSlice.reducer
