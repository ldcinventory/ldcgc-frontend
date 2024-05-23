import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Tool, ToolPost, ToolsParams, ToolWithId } from "./tTools"
import { PaginatedResponse, StatusType } from "../../common/tCommon"
import { RootState } from "../../app/index"
import { fecthTools, fetchAddTool, fetchDeleteTool, fetchUpdateTool, fetchUploadToolsExcel } from "./toolApi"
import { toast } from "sonner"
import { AnyAsyncThunk, FulfilledActionFromAsyncThunk, RejectedWithValueActionFromAsyncThunk } from "@reduxjs/toolkit/dist/matchers"
import { fetchDeleteToolImages, fetchUploadToolImages } from "../../drive/driveApi"
import { DriveParams } from "../../drive/tDrive"

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
  queryParams: { size: 10, pageIndex: 0, brand: '', barcode: '', name: '', location: '', model: '' },
  totalPages: 0,
  status: "idle",
  toolToDelete: null,
  toolDetail: null
}

export const getTools =
  createAsyncThunk<any, ToolsParams, { state: RootState }>(
    "tools/list",
    async (queryParams, thunkApi) => {
      const state = thunkApi.getState()
      const newParams = { ...state.tools.queryParams, ...queryParams }
      thunkApi.dispatch(updateQueryParams(newParams))
      return fecthTools({ toolsParams: newParams })
        .then(res => res.json())
        .catch((error: string) => thunkApi.rejectWithValue(`The server responded with an error: ${error}`))
    })

export const addTool =
  createAsyncThunk<any, {tool: ToolPost, images: FormData}, { state: RootState }>(
    "tools/add",
    async ({tool, images}, thunkApi) => {
      let error = ''
      const toolCreated = await fetchAddTool(tool)
        .then(res => res.json())
        .then(json => json.data)
        .catch(e => error = `Error al añadir la herramienta: ${e.message}`)
      
      if (error !== '')
        return thunkApi.rejectWithValue(error)
      
      if (!images || images.getAll('images').length === 0)
        return toolCreated

      const urlImages = await fetchUploadToolImages({ images, toolBarcode: toolCreated.barcode })
        .then(res => res.json())
        .catch(e => error = `Error al añadir las imágenes: ${e.message}`)
      
      if (error !== '')
        return thunkApi.rejectWithValue(error)

      toolCreated.urlImages = urlImages
      return toolCreated
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
        .catch(e => {
          if (e.status === 409)
            return thunkApi.rejectWithValue('No se puede eliminar la herramienta porque tiene registros asociados.')
          return thunkApi.rejectWithValue(e.message)
        })
    })

export const selectToolDetail =
  createAsyncThunk<any, string>(
    "resources/tools/detail",
    barcode => fecthTools({ toolsParams: { barcode } })
      .then(res => res.json())
      .then(json => json.data.elements[0])
  )

export const updateTool =
  createAsyncThunk<any, ToolWithId, {state: RootState}>(
    "resources/tools/detail/update",
    (tool, thunkApi) => fetchUpdateTool(tool)
        .then(() => thunkApi.fulfillWithValue('Herramienta actualizada con éxito.'))
  )

export const deleteToolImage = 
  createAsyncThunk < any, DriveParams, { state: RootState }> (
    "resources/tools/images/delete",
    (driveParams, thunkApi) => fetchDeleteToolImages(driveParams)
      .then(res => res.json())
      .then(json => driveParams.imageIds)
    .catch(e => thunkApi.rejectWithValue(`Error al eliminar la imagen: ${e.message}`))
  )

export const addToolImages =
  createAsyncThunk<any, {toolBarcode: string, images: FormData}, { state: RootState }>(
    "resources/tools/images/add",
    ({ toolBarcode, images}, thunkApi) => fetchUploadToolImages({toolBarcode, images})
      .then(res => res.json())
      .then(json => json.data)
      .catch(e => thunkApi.rejectWithValue(`Error al añadir las imágenes: ${e.message}`))
  )


export const toolsSlice = createSlice({
  name: "tools",
  initialState,
  reducers: {
    selectToolToDelete: (state, action: PayloadAction<ToolWithId | null>) => {
      return { ...state, toolToDelete: action.payload }
    },
    updateToolDetail: (state, action: PayloadAction<ToolWithId>) => {
      return { ...state, toolDetail: action.payload }
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
      .addCase(deleteTool.rejected, (state, action: PayloadAction<RejectedWithValueActionFromAsyncThunk<AnyAsyncThunk>, string>) => {
        state.status = "failed"
        toast.error(action.payload)
      })
      .addCase(selectToolDetail.fulfilled, (state, action: PayloadAction<ToolWithId>) => {
        state.toolDetail = action.payload
      })
      .addCase(updateTool.fulfilled, (state, action: PayloadAction<FulfilledActionFromAsyncThunk<AnyAsyncThunk>, string>) => {
        toast.success(action.payload)
      })
      .addCase(addTool.fulfilled, (state, action: PayloadAction<ToolWithId>) => {
        state.tools.push(action.payload)
        state.toolDetail = null
        toast.success('Herramienta añadida correctamente.')
      })
      .addCase(addTool.rejected, (state, action: PayloadAction<RejectedWithValueActionFromAsyncThunk<AnyAsyncThunk>, string>) => {
        toast.error(action.payload)
      })
      .addCase(addTool.pending, () => {
        toast.info('Añadiendo herramienta...')
      })
      .addCase(deleteToolImage.fulfilled, (state, action: PayloadAction<string[]>) => {
        if(state.toolDetail)
          state.toolDetail.urlImages = state.toolDetail.urlImages.filter(i => !action.payload.some(result => i.includes(result)))
        toast.success('Las imágenes se han eliminado correctamente.')
      })
      .addCase(deleteToolImage.rejected, (state, action: PayloadAction<RejectedWithValueActionFromAsyncThunk<AnyAsyncThunk>, string>) => {
        toast.error(action.payload)
      })
      .addCase(addToolImages.fulfilled, (state, action: PayloadAction<ToolWithId>) => {
        state.toolDetail = action.payload
        toast.success('Imágenes añadidas correctamente.')
      })
      .addCase(addToolImages.rejected, (state, action: PayloadAction<RejectedWithValueActionFromAsyncThunk<AnyAsyncThunk>, string>) => {
        toast.error(action.payload)
      })
      .addCase(addToolImages.pending, () => {
      toast.info('Subiendo imágenes...')
    })
  }
})

export const { selectToolToDelete, updateToolDetail } = toolsSlice.actions

export default toolsSlice.reducer
