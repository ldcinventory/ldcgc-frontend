import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"

import usersReducer from "../users/usersSlice"
import registerReducer from "../register/common/registerSlice"
import consumablesRegisterReducer from "../register/consumables/consumablesRegisterSlice"
import toolsRegisterReducer from "../register/tools/toolsRegisterSlice"
import consumablesReducer from "../resources/consumables/consumablesSlice"
import toolsReducer from "../resources/tools/toolsSlice"


export const store = configureStore({
  reducer: {
    users: usersReducer,
    consumables: consumablesReducer,
    consumablesRegister: consumablesRegisterReducer,
    tools: toolsReducer,
    toolsRegister: toolsRegisterReducer,
    register: registerReducer,
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
