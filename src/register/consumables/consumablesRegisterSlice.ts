import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { ConsumableRegister, ConsumableRegisterWithId, ConsumablesRegisterParams, SelectedConsumable } from "./tConsumableRegisters"
import { fetchConsumablesRegister, fetchCreateConsumableRegisters, fetchDeleteConsumableRegister, fetchUpdateConsumableRegister } from "../consumables/consumablesRegisterApi"
import { PaginatedResponse, StatusType } from "../../common/tCommon"
import { RootState } from "../../app/index"
import { toast } from "sonner"
import { ConsumableParams, ConsumableWithId } from "../../resources/consumables/tConsumables"
import { fetchConsumablesLoose } from "../../resources/consumables/consumablesApi"
import { AnyAsyncThunk, FulfilledActionFromAsyncThunk, RejectedWithValueActionFromAsyncThunk } from "@reduxjs/toolkit/dist/matchers"

export interface ConsumablesRegisterState {
  consumablesRegister: ConsumableRegisterWithId[]
  queryParams: ConsumablesRegisterParams
  totalPages: number
  currentConsumable: string
  possibleConsumables: ConsumableWithId[]
  selectedConsumables: SelectedConsumable[]
  consumablesParams: ConsumableParams
  status: StatusType
  error: string | undefined
}

const initialState: ConsumablesRegisterState = {
  consumablesRegister: [],
  queryParams: { size: 10, pageIndex: 0, status: '', volunteer: '', consumable: '', sortField: '', descOrder: true },
  totalPages: 0,
  currentConsumable: "",
  possibleConsumables: [],
  selectedConsumables: [],
  consumablesParams: { pageIndex: 0, size: 10, hasStock: true },
  status: "idle",
  error: undefined,
}

export const getConsumablesRegister =
  createAsyncThunk<any, ConsumablesRegisterParams, { state: RootState }>(
    "register/consumables/list",
    async (queryParams
      , thunkApi) => {
      const state = thunkApi.getState()
      const newParams = { ...state.consumablesRegister.queryParams, ...queryParams }
      thunkApi.dispatch(updateQueryParams(newParams))
      const response = await fetchConsumablesRegister(newParams)
        .catch((error: string) => { throw new Error(`The server responded with an error: ${error}`) })
      return response.json()
    })


export const deleteConsumableRegister =
  createAsyncThunk<any, number, { state: RootState }>(
    "register/consumables/delete",
    async (registerId, thunkApi) => {
      const response = await fetchDeleteConsumableRegister(registerId)
        .catch((error: string) => { throw new Error(`The server responded with an error: ${error}`) })

      if (response.ok)
        thunkApi.dispatch(getConsumablesRegister(thunkApi.getState().consumablesRegister.queryParams))

      return response.json()
    }
  )

export const closeConsumableRegister =
  createAsyncThunk<any, ConsumableRegisterWithId, { state: RootState }>(
    "register/consumables/delete",
    async (register, thunkApi) => {
      if (register.stockAmountReturn === undefined)
        throw new Error('Error! Indica el stock devuelto antes de cerrar el registro')
      register = { ...register, registerTo: new Date() }
      const response = await fetchUpdateConsumableRegister(register)
        .catch((error: string) => { throw new Error(`The server responded with an error: ${error}`) })
      if (response.ok)
        thunkApi.dispatch(getConsumablesRegister(thunkApi.getState().consumablesRegister.queryParams))

      return response.json()
    }
  )

export const getPossibleConsumables =
  createAsyncThunk<any, ConsumableParams, { state: RootState }>(
    "register/possibleConsumables",
    async (consumablesParams
      , thunkApi) => {
      const state = thunkApi.getState()
      const newParams = { ...state.consumablesRegister.consumablesParams, ...consumablesParams }
      thunkApi.dispatch(updateConsumablesParams(newParams))
      const response = await fetchConsumablesLoose(newParams)
        .catch((error: string) => { throw new Error(`The server responded with an error: ${error}`) })
      return response.json()
    })

export const addConsumableRegisters =
  createAsyncThunk<ConsumablesRegisterState, ConsumableRegister[]>(
    "register/consumables/add",
    async (registers, thunkApi) => fetchCreateConsumableRegisters(registers)
      .then(res => {
        if (res.ok) {
          thunkApi.dispatch(setSelectedConsumables([]))
          return thunkApi.fulfillWithValue("Registros de consumibles añadidos correctamente.")
        }

        return res.json()
      })
      .catch(error => thunkApi.rejectWithValue(error.message))
  )

export const consumablesRegisterSlice = createSlice({
  name: "consumablesRegister",
  initialState,
  reducers: {
    updateQueryParams: (state, action: PayloadAction<ConsumablesRegisterParams>) => {
      return { ...state, queryParams: action.payload }
    },
    setCurrentConsumable: (state, action: PayloadAction<string>) => {
      const newCurrentConsumable = action.payload

      return { ...state, currentConsumable: newCurrentConsumable }
    },
    updateConsumablesParams: (state, action: PayloadAction<ConsumableParams>) => {
      return { ...state, consumablesParams: action.payload }
    },
    selectConsumable: (state, action: PayloadAction<ConsumableWithId>) => {
      const newConsumable = action.payload
      const selectedConsumable = {
        consumableName: newConsumable.name, consumableStockType: newConsumable.stockType,
        consumableBarcode: newConsumable.barcode, stockAmountRequest: 0, stockAvailable: newConsumable.stock
      }
      return { ...state, selectedConsumables: [...state.selectedConsumables, selectedConsumable], currentConsumable: '', possibleConsumables: [] }
    },
    updateSelectedConsumable: (state, action: PayloadAction<SelectedConsumable>) => {
      const newConsumable = action.payload
      const newSelectedConsumables = state.selectedConsumables
        .map(consumableRegister => {
          if (newConsumable.consumableBarcode === consumableRegister.consumableBarcode)
            return newConsumable
          return consumableRegister
        })
      return { ...state, selectedConsumables: newSelectedConsumables }
    },
    removeSelectedConsumable: (state, action: PayloadAction<SelectedConsumable>) => {
      const newSelectedConsumables = state.selectedConsumables.filter(c => c.consumableBarcode !== action.payload.consumableBarcode)
      return { ...state, selectedConsumables: newSelectedConsumables }
    },
    setSelectedConsumables: (state, action: PayloadAction<SelectedConsumable[]>) => {
      return { ...state, selectedConsumables: action.payload }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getConsumablesRegister.pending, state => {
        state.status = "loading"
      })
      .addCase(
        getConsumablesRegister.fulfilled,
        (state, action: PayloadAction<{ data: PaginatedResponse<ConsumableRegisterWithId> }>) => {
          state.status = "succeeded"
          state.consumablesRegister = action.payload.data.elements
          state.totalPages = action.payload.data.totalPages
        },
      )
      .addCase(getConsumablesRegister.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
      .addCase(deleteConsumableRegister.pending, state => {
        state.status = "loading"
      })
      .addCase(deleteConsumableRegister.fulfilled, state => {
        state.status = "succeeded"
      })
      .addCase(deleteConsumableRegister.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
      .addCase(addConsumableRegisters.fulfilled, (state, action: PayloadAction<FulfilledActionFromAsyncThunk<AnyAsyncThunk>, string>) => {
        state.status = "succeeded"
        toast.success(action.payload)
      })
      .addCase(addConsumableRegisters.rejected, (state, action: PayloadAction<RejectedWithValueActionFromAsyncThunk<AnyAsyncThunk>, string>) => {
        state.status = "failed"
        toast.error(action.payload)
      })
      .addCase(getPossibleConsumables.fulfilled, (state, action: PayloadAction<{ data: PaginatedResponse<ConsumableWithId> }>) => {
        state.status = "succeeded"
        const excludedBarcodes = state.selectedConsumables.map(c => c.consumableBarcode)
        const newPossibleConsumables = action.payload.data.elements.filter(c => !excludedBarcodes.includes(c.barcode))
        state.possibleConsumables = newPossibleConsumables
      })
  }
})

export const { updateQueryParams, setCurrentConsumable, updateConsumablesParams, selectConsumable, updateSelectedConsumable, removeSelectedConsumable, setSelectedConsumables }
  = consumablesRegisterSlice.actions

export default consumablesRegisterSlice.reducer
