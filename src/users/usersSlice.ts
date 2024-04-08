import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { RootState } from "../app/index"
import { fetchMyUser, fetchUsers } from "./usersAPI"
import { User } from "./tUsers"
import { ac } from "vitest/dist/types-e3c9754d.js"

export interface UsersState {
  users: User[]
  status: "idle" | "loading" | "failed" | "succeeded"
  error: string | undefined
  me: User | null
}

const initialState: UsersState = {
  users: [],
  status: "idle",
  error: undefined,
  me: null
}

export const getUsersList = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetchUsers()
  return response.json()
})

export const getMyUser = createAsyncThunk("users/me", async () => {
  return fetchMyUser()
    .then(res => res.json())
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
        },
      )
      .addCase(getUsersList.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
      .addCase(getMyUser.pending, state => { state.status = "loading" })
      .addCase(getMyUser.fulfilled, (state, action: PayloadAction<{ data: User }>) => {
        state.status = "succeeded"
        state.me = action.payload.data
      })
      .addCase(getMyUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
    
  },
})

export const { } = usersSlice.actions

export const selectAllUsers = (state: RootState) => state.users.users

export default usersSlice.reducer
