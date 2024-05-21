import { Toaster } from "sonner";
import { useVolunteers } from "../hooks/useVolunteers";
import { AppCheckboxInput, AppNumberInputSm, AppTextInput } from "../../common/components/AppInput";
import { AppButton, AppButtonError, AppButtonTransparent } from "../../common/components/AppButton";
import { Bars2Icon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon, ClipboardIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { AppSelect } from "../../common/components/AppSelect";
import { handleCopyText } from "../../utils/textUtils";

export const VolunteersTable = () => {
  const { volunteersState, handleDeleteVolunteer, showFilters, toggleShowFilters, handleEditVolunteersParams, handleModifyVolunteer } = useVolunteers()

  return (
    <>
      <Toaster />    
      {/* Table mobile */}
      <ul className=" px-6 pb-2 pt-4 flex-col gap-2 bg-primary-2 dark:bg-primary-7 rounded-lg flex sm:hidden">
        <li className={`flex justify-between ${!showFilters && 'border-b pb-2 border-primary-1 dark:border-primary-5'}`}>
          <strong className="flex-1">Datos</strong>
          <strong className="flex-1">Activo</strong>
          <AppButtonTransparent onClick={toggleShowFilters} className={`${showFilters && 'bg-primary-4 dark:bg-primary-6'}`}><Bars2Icon className="h-6" /></AppButtonTransparent>
        </li>
        <li className={`${!showFilters && 'hidden'} flex justify-between gap-2 border-b pb-2 border-primary-1 dark:border-primary-5`}>
          <nav className="flex flex-col gap-2 flex-1">
            <AppTextInput placeholder="Nombre y apellidos"
              value={volunteersState.volunteersParams.filterString} onChange={(e) => handleEditVolunteersParams({ filterString: e.target.value, pageIndex: 0 })} />
            <AppTextInput placeholder="Id de Builder"
              value={volunteersState.volunteersParams.builderAssistantId} onChange={(e) => handleEditVolunteersParams({ builderAssistantId: e.target.value, pageIndex: 0 })} />
          </nav>
          <nav className="flex-1">
            <AppSelect
              options={[{ name: 'Cualquiera', value: '' }, { name: 'Sí', value: 'true' }, { name: 'No', value: 'false' }]}
              onChange={(e) => handleEditVolunteersParams({ isActive: e.target.value === '' ? undefined : e.target.value === 'true', pageIndex: 0 })} />
          </nav>
          <nav>
            <AppButtonTransparent onClick={(e) => handleEditVolunteersParams({ filterString: '', builderAssistantId: '', isActive: undefined })}><XMarkIcon className="h-6" /></AppButtonTransparent>
          </nav>
        </li>
        {
          volunteersState.volunteers.map(volunteer =>
            <li key={volunteer.id} className="flex justify-between w-full items-center">
              <div className="flex-1">
                <strong className="font-semibold">{`${volunteer.name} ${volunteer.lastName}`}</strong>
                <div className="flex gap-4 items-start">
                  <span className="font-barcode text-3xl opacity-80">{volunteer.builderAssistantId}</span>
                  <AppButton onClick={handleCopyText(volunteer.builderAssistantId)}><ClipboardIcon className="h-5" /></AppButton>
                </div>
              </div>
              <div className="flex-1">
                <AppCheckboxInput checked={volunteer.isActive} onChange={handleModifyVolunteer({ ...volunteer, isActive: !volunteer.isActive })} className="h-6 w-6" />
              </div>
              <AppButtonError onClick={handleDeleteVolunteer(volunteer.builderAssistantId)}><TrashIcon className="h-6 text-primary-1" /></AppButtonError>
            </li>
          )
        }
        <li className="flex justify-between w-full border-t border-primary-1 dark:border-primary-5 pt-2">
          <nav>
            <AppButtonTransparent onClick={(e) => handleEditVolunteersParams({ pageIndex: 0 })}><ChevronDoubleLeftIcon className="h-6" /></AppButtonTransparent>
            <AppButtonTransparent onClick={(e) => handleEditVolunteersParams({ pageIndex: Math.max(0, volunteersState.actualPage - 1) })}><ChevronLeftIcon className="h-6" /></AppButtonTransparent>
          </nav>
          <nav className="flex gap-2 items-center">
            Página <AppNumberInputSm value={volunteersState.actualPage + 1} onChange={(e) => handleEditVolunteersParams({
              pageIndex: Math.max(0, Math.min(volunteersState.totalPages, Number(e.target.value)) - 1)
            })} />
            de {volunteersState.totalPages}
          </nav>
          <nav>
            <AppButtonTransparent onClick={(e) => handleEditVolunteersParams({ pageIndex: Math.min(volunteersState.totalPages, volunteersState.actualPage + 1) })}><ChevronRightIcon className="h-6" /></AppButtonTransparent>
            <AppButtonTransparent onClick={(e) => handleEditVolunteersParams({ pageIndex: volunteersState.totalPages - 1 })}><ChevronDoubleRightIcon className="h-6" /></AppButtonTransparent>
          </nav>
        </li>
      </ul>
      {/* Table desktop */}
      <ul className=" px-6 pb-2 pt-4 flex-col gap-2 bg-primary-2 dark:bg-primary-7 rounded-lg hidden sm:flex">
        <li className={`flex justify-between ${!showFilters && 'border-b pb-2 border-primary-1 dark:border-primary-5'}`}>
          <strong className="flex-1">Voluntario</strong>
          <strong className="flex-1">ID de Builder Assistant</strong>
          <strong className="flex-1">Activo</strong>
          <AppButtonTransparent onClick={toggleShowFilters} className={`${showFilters && 'bg-primary-4 dark:bg-primary-6'}`}><Bars2Icon className="h-6" /></AppButtonTransparent>
        </li>
        <li className={`${!showFilters && 'hidden'} flex justify-between gap-2 border-b pb-2 border-primary-1 dark:border-primary-5`}>
          <AppTextInput placeholder="Pedro, Antonio, Juan..."
            value={volunteersState.volunteersParams.filterString} onChange={(e) => handleEditVolunteersParams({ filterString: e.target.value, pageIndex: 0 })} />
          <AppTextInput placeholder="CNUsvEx8..."
            value={volunteersState.volunteersParams.builderAssistantId} onChange={(e) => handleEditVolunteersParams({ builderAssistantId: e.target.value, pageIndex: 0 })} />
          <AppSelect
            options={[{ name: 'Cualquiera', value: '' }, { name: 'Sí', value: 'true' }, { name: 'No', value: 'false' }]}
            onChange={(e) => handleEditVolunteersParams({ isActive: e.target.value === '' ? undefined : e.target.value === 'true', pageIndex: 0 })} />
          <AppButton onClick={(e) => handleEditVolunteersParams({ filterString: '', builderAssistantId: '', isActive: undefined })}><XMarkIcon className="h-6" /></AppButton>
        </li>
        {
          volunteersState.volunteers.map(volunteer =>
            <li key={volunteer.id} className="flex justify-between w-full items-center">
              <strong className="font-semibold flex-1">{`${volunteer.name} ${volunteer.lastName}`}</strong>
              <div className="flex-1 flex gap-4 items-start">
                <span className="font-barcode text-4xl">{volunteer.builderAssistantId}</span>
                <AppButton onClick={handleCopyText(volunteer.builderAssistantId)}><ClipboardIcon className="h-6" /></AppButton>
              </div>
              <div className="flex-1">
                <AppCheckboxInput checked={volunteer.isActive} onChange={handleModifyVolunteer({ ...volunteer, isActive: !volunteer.isActive })} className="h-6 w-6" />
              </div>
              <AppButtonError onClick={handleDeleteVolunteer(volunteer.builderAssistantId)}><TrashIcon className="h-6 text-primary-1" /></AppButtonError>
            </li>
          )
        }
        <li className="flex justify-between w-full border-t border-primary-1 dark:border-primary-5 pt-2">
          <nav>
            <AppButtonTransparent onClick={(e) => handleEditVolunteersParams({ pageIndex: 0 })}><ChevronDoubleLeftIcon className="h-6" /></AppButtonTransparent>
            <AppButtonTransparent onClick={(e) => handleEditVolunteersParams({ pageIndex: Math.max(0, volunteersState.actualPage - 1) })}><ChevronLeftIcon className="h-6" /></AppButtonTransparent>
          </nav>
          <nav className="flex gap-2 items-center">
            Página <AppNumberInputSm value={volunteersState.actualPage + 1} onChange={(e) => handleEditVolunteersParams({
              pageIndex: Math.max(0, Math.min(volunteersState.totalPages, Number(e.target.value)) - 1)
            })} />
            de {volunteersState.totalPages}
          </nav>
          <nav>
            <AppButtonTransparent onClick={(e) => handleEditVolunteersParams({ pageIndex: Math.min(volunteersState.totalPages, volunteersState.actualPage + 1) })}><ChevronRightIcon className="h-6" /></AppButtonTransparent>
            <AppButtonTransparent onClick={(e) => handleEditVolunteersParams({ pageIndex: volunteersState.totalPages - 1 })}><ChevronDoubleRightIcon className="h-6" /></AppButtonTransparent>
          </nav>
        </li>
      </ul>
    </>
  )
}