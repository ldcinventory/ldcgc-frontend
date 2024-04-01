import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { RootState } from "../../app"
import { fetchUsers } from "./usersAPI"

export interface User {
  id: number
  email: string
  password: string
  role: "admin" | "user" | "manager"
}

export interface UsersState {
  users: User[]
  status: "idle" | "loading" | "failed" | "succeeded"
  error: string | undefined
}

const initialState: UsersState = {
  users: [],
  status: "idle",
  error: undefined,
}

export const getUsersList = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetchUsers()
  return response.json()
})

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // empty pure reducers for now...
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersList.pending, (state) => {
        state.status = "loading"
      })
      .addCase(
        getUsersList.fulfilled,
        (state, action: PayloadAction<{ data: User[] }>) => {
          state.status = "succeeded"
          state.users = action.payload.data
          console.log(action.payload.data)
        },
      )
      .addCase(getUsersList.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
  },
})

export const { } = usersSlice.actions

export const selectAllUsers = (state: RootState) => state.users.users

export default usersSlice.reducer
