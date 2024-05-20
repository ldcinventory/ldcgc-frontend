import { useAppDispatch, useAppSelector } from "../../../app/store"
import { DeleteModal } from "../../common/DeleteModal"
import { deleteConsumable, getConsumables, selectConsumableToDelete } from "../consumablesSlice"

export const ConsumablesDeleteModal = () => {
  const state = useAppSelector(state => state.consumables)
  const dispatch = useAppDispatch()

  const handleDeleteResource = () => {
    if (state.consumableToDelete === null)
      return

    dispatch(deleteConsumable(state.consumableToDelete))
    dispatch(selectConsumableToDelete(null))
  }
  const handleCloseModal = () => dispatch(selectConsumableToDelete(null))

  return (
    <DeleteModal handleDeleteResource={handleDeleteResource} handleCloseModal={handleCloseModal} resourceName={state.consumableToDelete?.name || 'herramienta'} isHidden={state.consumableToDelete === null} />
  )
}