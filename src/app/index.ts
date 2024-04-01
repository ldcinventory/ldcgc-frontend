import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"

import usersReducer from "../features/users/usersSlice"
import consumablesRegisterReducer from "../features/register/consumables/consumablesRegisterSlice"

export const store = configureStore({
  reducer: {
    users: usersReducer,
 
    consumablesRegister: consumablesRegisterReducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
