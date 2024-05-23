import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { RootState } from "../app/index"
import { fetchMyUser, fetchUpdateMyUser, fetchUsers } from "../users/usersApi"
import { User } from "./tUsers"
import { apiLogin } from "../login/LoginService"
import { LoginRequestBody } from "../login/tLogin"
import { AnyAsyncThunk, RejectedActionFromAsyncThunk } from "@reduxjs/toolkit/dist/matchers"
import { toast } from "sonner"

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

export const login = createAsyncThunk<any, LoginRequestBody, {state: RootState}>("login", async (loginRequestBody, thunkApi) => {
  return apiLogin(loginRequestBody)
    .then(res => {
      if (res.status === 400)
        throw new Error('Contraseña incorrecta.')

      if (res.status === 401)
        throw new Error('Este usuario no está habilitado. Contacte con el adminsitrador.')

      if (res.status === 404)
        throw new Error('Este usuario no existe.')


      const headers = res.headers
      const payloadToken = headers.get('x-header-payload-token')
      const signatureToken = headers.get('x-signature-token')

      if (payloadToken === null || signatureToken === null)
        throw new Error('Error del servidor. No se encuentran tokens en la respuesta. Contacte con el administrador')
      
      sessionStorage.setItem('payloadToken', payloadToken)
      sessionStorage.setItem('signatureToken', signatureToken)

      if (loginRequestBody.rememberMe) {        
        localStorage.setItem('payloadToken', payloadToken)
        localStorage.setItem('signatureToken', signatureToken)
      } else {
        localStorage.removeItem('payloadToken')
        localStorage.removeItem('signatureToken')
      }
      return res.json()
    })
    .catch(error => {
      console.log(error)
      return thunkApi.rejectWithValue(`Error al hacer login: ${error.message}`)
    })
})

export const updateMyUser = createAsyncThunk<any, User, {state: RootState}>("users/me/update", async (user, thunkApi) => {
  return fetchUpdateMyUser(user)
    .then(res => {
      const headers = res.headers
      const payloadToken = headers.get('x-header-payload-token')
      const signatureToken = headers.get('x-signature-token')

      if (payloadToken === null || signatureToken === null)
        throw new Error('Error del servidor. No se encuentran tokens en la respuesta. Contacte con el administrador')

      sessionStorage.setItem('payloadToken', payloadToken)
      sessionStorage.setItem('signatureToken', signatureToken)

      return res.json()
    })
    .then(json => json.data.data)
    .catch(error => thunkApi.rejectWithValue(`Error al actualizar el usuario: ${error.message}`))
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
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.me = action.payload
        window.location.replace('/')
      })
      .addCase(login.rejected, (state, action: PayloadAction<RejectedActionFromAsyncThunk<AnyAsyncThunk>>) => {
        state.me = null
        toast.error(action.payload)
      })
      .addCase(updateMyUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.me = { ...action.payload }
        toast.success('Usuario actualizado correctamente.')
      })
      .addCase(updateMyUser.rejected, (state, action: PayloadAction<RejectedActionFromAsyncThunk<AnyAsyncThunk>>) => {
        toast.error(action.payload)
      })
  },
})

export const { } = usersSlice.actions

export const selectAllUsers = (state: RootState) => state.users.users

export default usersSlice.reducer
