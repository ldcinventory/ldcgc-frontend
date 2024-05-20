import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Consumable, ConsumableParams, ConsumablePost, ConsumableWithId } from "./tConsumables"
import { PaginatedResponse, StatusType } from "../../common/tCommon"
import { RootState } from "../../app/index"
import { fecthConsumables, fetchAddConsumable, fetchConsumablesLoose, fetchDeleteConsumable, fetchUpdateConsumable, fetchUploadConsumablesExcel } from "./consumablesApi"
import { fetchDeleteConsumableImages, fetchUploadConsumableImages } from "../../drive/driveApi"
import { toast } from "sonner"
import { AnyAsyncThunk, FulfilledActionFromAsyncThunk, RejectedWithValueActionFromAsyncThunk } from "@reduxjs/toolkit/dist/matchers"
import { DriveParams } from "../../drive/tDrive"

export interface ConsumablesState {
  consumables: ConsumableWithId[]
  queryParams: ConsumableParams
  totalPages: number
  status: StatusType
  error: string | undefined
  consumableToDelete: ConsumableWithId | null
  consumableDetail: ConsumableWithId | null
}

const initialState: ConsumablesState = {
  consumables: [],
  queryParams: { size: 10, pageIndex: 0, barcode: '', brand: '', name: '', model: '', location: '' },
  totalPages: 0,
  status: "idle",
  error: undefined,
  consumableToDelete: null,
  consumableDetail: null
}

export const getConsumables =
  createAsyncThunk<any, ConsumableParams, { state: RootState }>(
    "consumables/list",
    async (queryParams, thunkApi) => {
      const state = thunkApi.getState()
      const newParams = { ...state.consumables.queryParams, ...queryParams }
      thunkApi.dispatch(updateQueryParams(newParams))
      const response = await fetchConsumablesLoose(newParams)
        .then(res => {
          if (!res.ok)
            throw new Error('Internal server error')

          return res.json()
        })
        .catch((error: string) => { throw new Error(`The server responded with an error: ${error}`) })

      return response
    })


const updateQueryParams =
  createAsyncThunk<any, ConsumableParams, { state: RootState }>(
    "consumables/updateParams",
    async (queryParams) => {
      return queryParams;
    }
  )

export const uploadConsumablesExcel =
  createAsyncThunk<any, FormData, { state: RootState }>(
    "consumables/excel",
    (formData, thunkApi) => {
      const state = thunkApi.getState()
      if (!state.users.me)
        return thunkApi.rejectWithValue('Cierra sesión e inténtalo de nuevo.')
        
      return  fetchUploadConsumablesExcel({formData, groupId: state.users.me.group.id})
        .then(res => res.json())
        .then(json => {
          thunkApi.dispatch(getConsumables({}))
          return thunkApi.fulfillWithValue('Excel añadido correctamente.')
        })
    }
  )

export const addConsumable =
  createAsyncThunk<any, { consumable: ConsumablePost, images: FormData }, { state: RootState }>(
    "consumables/add",
    async ({ consumable, images }, thunkApi) => {
      let error = ''
      const consumableCreated = await fetchAddConsumable(consumable)
        .then(res => res.json())
        .then(json => json.data)
        .catch(e => error = `Error al añadir el consumible: ${e.message}`)

      if (error !== '')
        return thunkApi.rejectWithValue(error)

      let urlImages = ''
      if (images.get('images')) {
        urlImages = await fetchUploadConsumableImages({ images, consumableBarcode: consumableCreated.barcode })
          .then(res => res.json())
          .catch(e => error = `Error al añadir las imágenes: ${e.message}`)
      }

      if (error !== '')
        return thunkApi.rejectWithValue(error)

      consumableCreated.urlImages = urlImages
      return consumableCreated
    })

export const deleteConsumable =
  createAsyncThunk<any, ConsumableWithId, { state: RootState }>(
    "resources/consumables/delete",
    async (consumable, thunkApi) => {
      if (consumable === null)
        return

      return fetchDeleteConsumable(consumable.id)
        .then(res => res.json())
        .then(json => thunkApi.dispatch(getConsumables({})))
        .catch(e => {
          if (e.status === 409)
            return thunkApi.rejectWithValue('No se puede eliminar el consumible porque tiene registros asociados.')
          return thunkApi.rejectWithValue(e.message)
        })
    })

export const updateConsumable =
  createAsyncThunk<any, ConsumableWithId, { state: RootState }>(
    "resources/consumables/detail/update",
    (consumable, thunkApi) => fetchUpdateConsumable(consumable)
      .then(() => thunkApi.fulfillWithValue('Herramienta actualizada con éxito.'))
  )

export const selectConsumableDetail =
  createAsyncThunk<any, string>(
    "resources/consumables/detail",
    barcode => fecthConsumables({ consumablesParams: { barcode } })
      .then(res => res.json())
      .then(json => json.data)
  )

export const addConsumableImages =
  createAsyncThunk<any, { consumableBarcode: string, images: FormData }, { state: RootState }>(
    "resources/consumables/images/add",
    ({ consumableBarcode, images }, thunkApi) => fetchUploadConsumableImages({ consumableBarcode, images })
      .then(res => res.json())
      .then(json => json.data)
      .catch(e => thunkApi.rejectWithValue(`Error al añadir las imágenes: ${e.message}`))
  )

export const deleteConsumableImage =
  createAsyncThunk<any, DriveParams, { state: RootState }>(
    "resources/consumables/images/delete",
    (driveParams, thunkApi) => fetchDeleteConsumableImages(driveParams)
      .then(res => res.json())
      .then(json => driveParams.imageIds)
      .catch(e => thunkApi.rejectWithValue(`Error al eliminar la imagen: ${e.message}`))
  )

export const consumablesSlice = createSlice({
  name: "consumables",
  initialState,
  reducers: {
    selectConsumableToDelete: (state, action: PayloadAction<ConsumableWithId | null>) => {
      return {...state, consumableToDelete: action.payload}
    },
    updateConsumableDetail: (state, action: PayloadAction<ConsumableWithId>) => {
      return { ...state, consumableDetail: action.payload }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getConsumables.pending, state => {
        state.status = "loading"
      })
      .addCase(
        getConsumables.fulfilled,
        (state, action: PayloadAction<{ data: PaginatedResponse<ConsumableWithId> }>) => {
          state.status = "succeeded"
          state.consumables = action.payload.data.elements
          state.totalPages = action.payload.data.totalPages
        },
      )
      .addCase(getConsumables.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
      .addCase(updateQueryParams.fulfilled,
        (state, action: PayloadAction<ConsumableParams>) => {
          state.queryParams = action.payload
        }
      )
      .addCase(addConsumable.fulfilled, (state, action: PayloadAction<ConsumableWithId>) => {
        state.consumables.push(action.payload)        
        toast.success('Consumible añadido correctamente.')
      })
      .addCase(addConsumable.rejected, (state, action: PayloadAction<RejectedWithValueActionFromAsyncThunk<AnyAsyncThunk>, string>) => {
        toast.error(action.payload)
      })
      .addCase(addConsumable.pending, () => {
        toast.info('Añadiendo consumible...')
      })
      .addCase(selectConsumableDetail.fulfilled, (state, action: PayloadAction<ConsumableWithId>) => {
        state.consumableDetail = action.payload
      })
      .addCase(uploadConsumablesExcel.fulfilled, (state, action: PayloadAction<FulfilledActionFromAsyncThunk<AnyAsyncThunk>, string>) => {
        toast.success(action.payload)
      })
      .addCase(uploadConsumablesExcel.rejected, (state, action: PayloadAction<RejectedWithValueActionFromAsyncThunk<AnyAsyncThunk>, string>) => {
        toast.error("Error al subir el excel: " + action.payload)
      })
      .addCase(deleteConsumable.pending, state => {
        state.status = "loading"
      })
      .addCase(
        deleteConsumable.fulfilled,
        (state) => {
          state.status = "succeeded"
          state.consumableToDelete = null
          toast.success("Consumible eliminado con éxito")
        },
      )
      .addCase(deleteConsumable.rejected, (state, action: PayloadAction<RejectedWithValueActionFromAsyncThunk<AnyAsyncThunk>, string>) => {
        state.status = "failed"
        toast.error(action.payload)
      })
      .addCase(updateConsumable.fulfilled, (state, action: PayloadAction<FulfilledActionFromAsyncThunk<AnyAsyncThunk>, string>) => {
        toast.success(action.payload)
      })
      .addCase(addConsumableImages.fulfilled, (state, action: PayloadAction<ConsumableWithId>) => {
        state.consumableDetail = action.payload
        toast.success('Imágenes añadidas correctamente.')
      })
      .addCase(addConsumableImages.rejected, (state, action: PayloadAction<RejectedWithValueActionFromAsyncThunk<AnyAsyncThunk>, string>) => {
        toast.error(action.payload)
      })
      .addCase(addConsumableImages.pending, () => {
        toast.info('Subiendo imágenes...')
      })

      .addCase(deleteConsumableImage.fulfilled, (state, action: PayloadAction<string[]>) => {
        if (state.consumableDetail)
          state.consumableDetail.urlImages = state.consumableDetail.urlImages.filter(i => !action.payload.some(result => i.includes(result)))
        toast.success('Las imágenes se han eliminado correctamente.')
      })
      .addCase(deleteConsumableImage.rejected, (state, action: PayloadAction<RejectedWithValueActionFromAsyncThunk<AnyAsyncThunk>, string>) => {
        toast.error(action.payload)
      })
  }
})

export const { selectConsumableToDelete } = consumablesSlice.actions

export default consumablesSlice.reducer
