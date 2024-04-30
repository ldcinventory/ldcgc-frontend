import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ToolsParams, ToolWithId } from "./tTools"
import { PaginatedResponse, StatusType } from "../../common/tCommon"
import { RootState } from "../../app/index"
import { fecthTools, fetchDeleteTool, fetchUploadToolsExcel } from "./toolApi"
import { toast } from "sonner"
import { json } from "react-router-dom"

export interface ToolsState {
  tools: ToolWithId[]
  queryParams: ToolsParams
  totalPages: number
  status: StatusType
  toolToDelete: ToolWithId | null
  toolDetail: ToolWithId | null
}

const initialState: ToolsState = {
  tools: [],
  queryParams: { size: 10, pageIndex: 0 },
  totalPages: 0,
  status: "idle",
  toolToDelete: null,
  toolDetail: null
}

export const getTools =
  createAsyncThunk<any, ToolsParams, { state: RootState }>(
    "tools/list",
    async (queryParams
      , thunkApi) => {
      const state = thunkApi.getState()
      const newParams = { ...state.tools.queryParams, ...queryParams }
      thunkApi.dispatch(updateQueryParams(newParams))
      const response = await fecthTools({ toolsParams: newParams })
        .then(res => {
          if (!res.ok)
            throw new Error('Internal server error')

          return res.json()
        })
        .catch((error: string) => { throw new Error(`The server responded with an error: ${error}`) })

      return response
    })


const updateQueryParams =
  createAsyncThunk<any, ToolsParams, { state: RootState }>(
    "tools/updateParams",
    async (queryParams) => {
      return queryParams;
    }
  )

export const uploadToolsExcel =
  createAsyncThunk<any, FormData, {state: RootState}>(
    "tools/excel",
    async (formData, thunkApi) => 
      fetchUploadToolsExcel(formData)
        .then(res => {
          if(res.ok)
            thunkApi.dispatch(getTools({}))
        })
  )
    
export const deleteTool =
  createAsyncThunk<any, ToolWithId, { state: RootState }>(
    "resources/tools/delete",
    async (tool, thunkApi) => {
      if (tool === null)
        return

      return fetchDeleteTool(tool.id)
        .then(() => thunkApi.dispatch(getTools({})))
    })

export const selectToolDetail =
  createAsyncThunk<any, string>(
    "resources/tools/detail",
    barcode => fecthTools({ toolsParams: { barcode } })
      .then(res => res.json())
      .then(json => json.data.elements[0])
  )

export const toolsSlice = createSlice({
  name: "tools",
  initialState,
  reducers: {
    selectToolToDelete: (state, action: PayloadAction<ToolWithId | null>) => {
      return {...state, toolToDelete: action.payload}
    } 
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTools.pending, state => {
        state.status = "loading"
      })
      .addCase(
        getTools.fulfilled,
        (state, action: PayloadAction<{ data: PaginatedResponse<ToolWithId> }>) => {
          state.status = "succeeded"
          state.tools = action.payload.data.elements
          state.totalPages = action.payload.data.totalPages
        },
      )
      .addCase(getTools.rejected, (state, action) => {
        state.status = "failed"
        toast.error(action.error.message)
      })
      .addCase(updateQueryParams.fulfilled,
        (state, action: PayloadAction<ToolsParams>) => {
          state.queryParams = action.payload
        }
    )
      .addCase(uploadToolsExcel.rejected,
        (state, action) => {
          state.status = "failed"
          toast.error(action.error.message)
        }
    )
      .addCase(uploadToolsExcel.fulfilled,
        state => {
          state.status = "succeeded"
          toast.success("Herramientas añadidas correctamete")
        }
      )
      .addCase(deleteTool.pending, state => {
        state.status = "loading"
      })
      .addCase(
        deleteTool.fulfilled,
        (state) => {
          state.status = "succeeded"
          state.toolToDelete = null
          toast.success("Herramienta eliminada con éxito")
        },
      )
      .addCase(deleteTool.rejected, state => {
        state.status = "failed"
        toast.error("Error al eliminar la herramienta, asegúrate de que no hay registros asociados.")
      })
      .addCase(selectToolDetail.fulfilled, (state, action: PayloadAction<ToolWithId>) => {
        state.toolDetail = action.payload
      })
  }
  }
)

export const { selectToolToDelete } = toolsSlice.actions

export default toolsSlice.reducer