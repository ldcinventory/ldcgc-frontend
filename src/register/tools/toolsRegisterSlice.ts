import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"


import { PaginatedResponse, StatusType } from "../../common/tCommon"
import { RootState } from "../../app/index"
import { SelectedTool, ToolRegister, ToolRegisterParams, ToolRegisterWithId } from "./tToolRegisters"
import { fetchCreateToolRegisters, fetchDeleteToolRegister, fetchGetToolRegisters, fetchUpdateToolRegister } from "./toolRegisterApi"
import { toast } from "sonner"
import { AnyAsyncThunk, FulfilledActionFromAsyncThunk, RejectedWithValueActionFromAsyncThunk } from "@reduxjs/toolkit/dist/matchers"
import { Tool, ToolsParams, ToolWithId } from "../../resources/tools/tTools"
import { fecthToolsLoose } from "../../resources/tools/toolApi"

export interface ToolsRegisterState {
  toolsRegister: ToolRegisterWithId[]
  queryParams: ToolRegisterParams
  totalPages: number
  currentTool: string
  possibleTools: ToolWithId[]
  selectedTools: SelectedTool[]
  toolsParams: ToolsParams
  status: StatusType
  error: string | undefined
}

const initialState: ToolsRegisterState = {
  toolsRegister: [],
  queryParams: { size: 10, pageIndex: 0, tool: '', volunteer: '', descOrder: true, sortString: 'id', status: ''},
  totalPages: 0,
  currentTool: "",
  possibleTools: [],
  selectedTools: [],
  toolsParams: { pageIndex: 0, size: 10, status: 'AVAILABLE', filterString: '' },
  status: "idle",
  error: undefined,
}

export const getPossibleTools =
  createAsyncThunk<any, ToolsParams, { state: RootState }>(
    "register/possibleTools",
    async (toolsParams
      , thunkApi) => {
      const state = thunkApi.getState()
      const newParams = { ...state.toolsRegister.toolsParams, ...toolsParams }      
      thunkApi.dispatch(updateToolsParams(newParams))

      const response = await fecthToolsLoose({ toolsParams: newParams })
        .catch((error: string) => { throw new Error(`The server responded with an error: ${error}`) })
      return response.json()
    })


export const getToolsRegister =
  createAsyncThunk<any, ToolRegisterParams, { state: RootState }>(
    "register/tools/list",
    async (queryParams
      , thunkApi) => {
      const state = thunkApi.getState()
      const newParams = { ...state.toolsRegister.queryParams, ...queryParams }
      thunkApi.dispatch(updateQueryParams(newParams))
      const response = await fetchGetToolRegisters(newParams)
        .catch((error:string) => { throw new Error(`The server responded with an error: ${error}`) })
      return response.json()
    })

export const deleteToolRegister =
  createAsyncThunk<any, number, { state: RootState }>(
    "register/tools/delete",
    async (registerId, thunkApi) => {
      const response = await fetchDeleteToolRegister(registerId)
        .catch((error:string) => { throw new Error(`The server responded with an error: ${error}`) })

      if (response.ok)
        thunkApi.dispatch(getToolsRegister(thunkApi.getState().toolsRegister.queryParams))

      return response.json()
    }
  )

export const closeToolRegister =
  createAsyncThunk<any, ToolRegisterWithId, { state: RootState }>(
    "register/tools/delete",
    async (register, thunkApi) => {
      register = { ...register, registerTo: new Date() }
      const response = await fetchUpdateToolRegister(register)
        .catch((error:string) => { throw new Error(`The server responded with an error: ${error}`) })
      
      if (response.ok)
        thunkApi.dispatch(getToolsRegister(thunkApi.getState().toolsRegister.queryParams))

      return response.json()
    }
  )

export const addToolRegisters =
  createAsyncThunk<ToolsRegisterState, ToolRegister[]>(
    "register/tools/add",
    async (registers, thunkApi) => fetchCreateToolRegisters(registers)
      .then(res => {
        if (res.ok) {
          thunkApi.dispatch(setSelectedTools([]))
          return thunkApi.fulfillWithValue("Registros de herramientas añadidos correctamente.")
        }
        
        return res.json()
      })
      .catch(error => thunkApi.rejectWithValue(error.message))
  )

export const toolsRegisterSlice = createSlice({
  name: "toolsRegister",
  initialState,
  reducers: {
    updateQueryParams: (state, action: PayloadAction<ToolRegisterParams>) => {
      return {...state, queryParams: action.payload}
    },
    setCurrentTool: (state, action: PayloadAction<string>) => {
      const newCurrentTool = action.payload

      return { ...state, currentTool: newCurrentTool }
    },
    updateToolsParams: (state, action: PayloadAction<ToolsParams>) => {
      return { ...state, toolsParams: action.payload }
    },
    selectTool: (state, action: PayloadAction<Tool>) => {
      const newTool = action.payload
      const selectedTool = { toolName: newTool.name, toolBarcode: newTool.barcode }
      return { ...state, selectedTools: [...state.selectedTools, selectedTool], currentTool: '', possibleTools: [] }
    },
    removeSelectedTool: (state, action: PayloadAction<SelectedTool>) => {
      const newSelectedTools = state.selectedTools.filter(t => t.toolBarcode !== action.payload.toolBarcode)
      return { ...state, selectedTools: newSelectedTools }
    },
    setSelectedTools: (state, action: PayloadAction<SelectedTool[]>) => {
      return {...state, selectedTools: action.payload}
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getToolsRegister.pending, state => {
        state.status = "loading"
      })
      .addCase(
        getToolsRegister.fulfilled,
        (state, action: PayloadAction<{ data: PaginatedResponse<ToolRegisterWithId> }>) => {
          state.status = "succeeded"
          state.toolsRegister = action.payload.data.elements
          state.totalPages = action.payload.data.totalPages
        },
      )
      .addCase(getToolsRegister.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
      .addCase(deleteToolRegister.pending, state => {
        state.status = "loading"
      })
      .addCase(deleteToolRegister.fulfilled, state => {
        state.status = "succeeded"
      })
      .addCase(deleteToolRegister.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
      .addCase(addToolRegisters.fulfilled, (state, action: PayloadAction<FulfilledActionFromAsyncThunk<AnyAsyncThunk>, string>) => {
        state.status = "succeeded"
        toast.success(action.payload)
      })
      .addCase(addToolRegisters.rejected, (state, action: PayloadAction<RejectedWithValueActionFromAsyncThunk<AnyAsyncThunk>, string>) => {
        state.status = "failed"
        toast.error(action.payload)
      })
      .addCase(getPossibleTools.fulfilled, (state, action: PayloadAction<{ data: PaginatedResponse<ToolWithId> }>) => {
        state.status = "succeeded"
        if (state.currentTool === '') {
          state.possibleTools = []
          return
        }
          
        const excludedBarcodes = state.selectedTools.map(t => t.toolBarcode)
        const newPossibleTools = action.payload.data.elements.filter(t => !excludedBarcodes.includes(t.barcode))
        
        if (newPossibleTools.length === 1){
          state.selectedTools = [...state.selectedTools, { toolName: newPossibleTools[0].name, toolBarcode: newPossibleTools[0].barcode }]
          state.possibleTools = []
          state.currentTool = ''
          return
        }
        
        state.possibleTools = newPossibleTools
        
      })
  }
})

export const { updateQueryParams, updateToolsParams, selectTool, removeSelectedTool, setCurrentTool, setSelectedTools } = toolsRegisterSlice.actions

export default toolsRegisterSlice.reducer
