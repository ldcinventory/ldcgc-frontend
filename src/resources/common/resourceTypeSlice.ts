import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/index"
import { ResourceType } from "../tResources"
import { fetchResourceTypes } from "./resourceTypeApi"
import { PaginatedResponse } from "../../common/tCommon"

export interface ResourceTypeState {
  resourceTypes: ResourceType[]
}

const initialState: ResourceTypeState = {
  resourceTypes: [],
}

export const getResourceTypes =
  createAsyncThunk<any, undefined, { state: RootState }>(
    "resourceTypes/list",
    async (ignored, thunkApi) =>
      fetchResourceTypes()
        .then(res => res.json())
        .then(json => json.data)
        .catch((error: string) => thunkApi.rejectWithValue(`The server responded with an error: ${error}`))
    )



export const resourceTypesSlice = createSlice({
  name: "resourceTypes",
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(
        getResourceTypes.fulfilled,
        (state, action: PayloadAction<PaginatedResponse<ResourceType>>) => {
        state.resourceTypes = action.payload.elements
      })
      .addCase(getResourceTypes.rejected, (state) => {

      })
  }
}
)

export const {  } = resourceTypesSlice.actions

export default resourceTypesSlice.reducer
