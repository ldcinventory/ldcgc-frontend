import { useAppDispatch, useAppSelector } from "../../../app/store"
import { DeleteModal } from "../../common/DeleteModal"
import { deleteTool, getTools, selectToolToDelete } from "../toolsSlice"

export function ToolDeleteModal() {
  const state = useAppSelector(state => state.tools)
  const dispatch = useAppDispatch()

  const handleDeleteResource = () => {
    if (state.toolToDelete === null)
      return

    dispatch(deleteTool(state.toolToDelete))
    dispatch(selectToolToDelete(null))
  }
  const handleCloseModal = () => dispatch(selectToolToDelete(null))

  return (
    <DeleteModal handleDeleteResource={handleDeleteResource} handleCloseModal={handleCloseModal} resourceName={state.toolToDelete?.name || 'herramienta'} isHidden={state.toolToDelete === null} />
  )
}