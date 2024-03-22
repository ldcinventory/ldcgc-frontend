import { Check, Close, MinusCircle } from "../../../../Icons"
import { useAddToolRegisterModal } from "../../../../hooks/register/tools/UseAddToolRegisterModal"

export function AddRegisterModal({ closeRegisterModal, refreshRegister }:
  { closeRegisterModal: () => void, refreshRegister: () => void }) {
  const {
    selectedVolunteer,
    date,
    selectedTools,
    loading,
    handleAddRegisters,
    handleChangeCurrentVolunteer,
    currentVolunteer,
    possibleVolunteers,
    handleChangeSelectedVolunteer,
    removeTool,
    currentTool,
    handleChangeCurrentTool,
    possibleTools,
    handleSelectTool,
    handleSetDate,
    successMessage
  } = useAddToolRegisterModal({ refreshRegister });

  const isSubmitDisabled = () => selectedVolunteer === null || date === '' || selectedTools.length <= 0 || loading

  return (
    <div className="flex fixed min-h-full min-w-full justify-center items-center top-0 bg-slate-900 bg-opacity-80 text-lg font-semibold">
      <section className="w-4/5 m-auto flex flex-col gap-4 items-end bg-slate-600 p-6 lg:w-1/3 rounded-xl">
        <button onClick={closeRegisterModal}>
          <Close />
        </button>
        <form onSubmit={handleAddRegisters} className="flex flex-col gap-4 mx-auto w-full overflow-hidden transition-all">
          <label htmlFor="volunteerInput" className="flex items-center gap-4">
            {
              selectedVolunteer !== null &&
              <span className="text-green-500">
                  <Check />
              </span>  
            }
            Voluntario
          </label>
          <div className="bg-slate-50 relative rounded-md">
            <input id="volunteerInput" name="volunteer" type="text" placeholder="Nombre o BA ID..."
              onChange={(event) => handleChangeCurrentVolunteer(event.target.value)} value={currentVolunteer}
                className="text-slate-900 font-normal bg-slate-50 w-full p-2 rounded-md" />
            {
              possibleVolunteers?.length > 0 && selectedVolunteer === null &&
              <ul className="z-10 absolute mt-2 overflow-auto max-h-60 text-slate-900 font-normal w-full bg-inherit rounded-md">
              {
                possibleVolunteers?.map(v => 
                  <li key={v.id} onClick={() => handleChangeSelectedVolunteer(v, `${v.name} ${v.lastName} (${v.builderAssistantId})`)}
                  className="hover:bg-slate-200 transition-colors duration-200">
                    {`${v.name} ${v.lastName} (${v.builderAssistantId})`}
                  </li>
                )            
              }
              </ul>
            }
          </div>
          <label className="flex items-center gap-4">
            {
              selectedTools.length > 0  &&
              <span className="text-green-500">
                <Check />
              </span>
            }
            Herramientas
          </label>
          
          {
            selectedTools.map(tool => 
              <div key={tool.id} className="flex justify-between gap-4">
                <input type="text" value={`${tool.name} (${tool.barcode})`} disabled
                  className="text-slate-900 font-normal bg-slate-50 w-full p-2 rounded-md"/>
                <button className="text-red-500" onClick={() => removeTool(tool.id)}> <MinusCircle /> </button>
              </div>
            )
          }
          <div className="bg-slate-50 relative rounded-md">
            <input type="text" className="text-slate-900 font-normal bg-slate-50 w-full p-2 rounded-md" 
              value={currentTool} onChange={(e) => handleChangeCurrentTool(e.target.value)} />
            {
              possibleTools?.length > 0 &&
              <ul className="z-10 absolute mt-2 overflow-auto max-h-60 text-slate-900 font-normal w-full bg-inherit rounded-md">
              {
                possibleTools?.map(t => 
                  <li key={t.id} onClick={() => handleSelectTool(t)}
                    className="hover:bg-slate-200 transition-colors duration-200">
                    {t.name}
                  </li>
                )     
              }
              </ul>
            }
          </div>
          <label className="flex gap-4 items-center">
            {
              date !== '' &&
              <span className="text-green-500">
                <Check />
              </span>
            }
            Fecha
          </label>
          <input type="date" className="text-slate-900 p-2 rounded-md font-normal" value={date}
            onChange={(e) => handleSetDate(e.target.value)} />
          <button type="submit"
            className={`bg-green-700 w-1/3 m-auto p-2 rounded-md ${isSubmitDisabled() ? 'opacity-50' : ''}`}
            disabled={isSubmitDisabled()}>
            Añadir</button>
        </form>
        {
          successMessage !== '' &&
          <span className="self-center text-green-500 p-2 rounded-md">
              {successMessage}
            </span>
        }
      </section>
    </div>
  )
}