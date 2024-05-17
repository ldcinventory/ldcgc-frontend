import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface DriveState {
}

const initialState: DriveState = {
}


export const driveSlice = createSlice({
  name: "drive",
  initialState,
  reducers: {},
  extraReducers: (builder) => {}
}
)

export const {  } = driveSlice.actions

export default driveSlice.reducer
