import { useState } from "react";
import { Calendar, Close, Delete, MinusCircle, Plus, Switch, Tool, User, XCircle } from "../../../../Icons";

export function AddRegisterModal({ handleCloseModal }) {
  const [registerDate, setRegisterDate] = useState(new Date().toLocaleString())
  const [selectedTools, setSelectedTools] = useState([])
  const [currentTool, setCurrentTool] = useState('')
  const [selectedVolunteer, setSelectedVolunteer] = useState('')
  const [currentVolunteer, setCurrentVolunteer] = useState('')
  const [isToday, setIsToday] = useState(true)

  const handleChangeCurrentVolunteer = (event) => {
    setCurrentVolunteer(event.target.value)
  }

  const handleAddVolunteer = () => {
    setSelectedVolunteer(currentVolunteer)
    setCurrentVolunteer('')
  }

  const handleDeleteVolunteer = () => {
    setSelectedVolunteer('')
  }

  const handleChangeCurrentTool = (event) => {
    setCurrentTool(event.target.value)
  }

  const handleAddTool = () => {
    setSelectedTools([...selectedTools, currentTool])
    setCurrentTool('')
  }

  const handleClearTools = () => {
    setSelectedTools([])
  }

  const handleDeleteTool = (tool) => {
    setSelectedTools(selectedTools.filter(t => t !== tool))
  }

  const toggleIsToday = () => {
    if (!isToday){
      setRegisterDate(new Date().toLocaleString())
    }
    setIsToday(!isToday)
  }

  const handleChangeDate = (event) => {
    setRegisterDate(event.target.value)
  }

  return (
    <>
      <div className="flex fixed min-h-full min-w-full justify-center items-center top-0 bg-slate-900 bg-opacity-80 text-lg font-semibold">
        <div className="bg-slate-600 p-4 flex flex-col gap-4 rounded-xl mx-auto w-4/5 lg:w-2/3 overflow-hidden transition-all">
          <div className="flex justify-end">
            <button onClick={handleCloseModal}>
              <Close />
            </button>
          </div>
          <section className="flex flex-col sm:flex-row justify-between items-center gap-2 w-full border-slate-500 border p-2 rounded-lg">
            <label className="flex-1 flex gap-2 items-center" htmlFor="volunteer_input">
              < User /> <span className="hidden sm:inline">Voluntario</span>
            </label>
            <input id="volunteer_input" value={currentVolunteer} onChange={handleChangeCurrentVolunteer}
              type="text" placeholder="BA ID o nombre..." className="px-2 py-1 rounded-md flex-1 text-slate-900 font-normal" />
            <button className={`bg-green-700 rounded-md p-1 ${selectedVolunteer === '' && currentVolunteer !== '' ? '' : 'hidden'}`}
            onClick={handleAddVolunteer}>
              <Plus />
            </button>
            <button className={`rounded-md p-1 bg-cyan-700 ${selectedVolunteer !== '' && currentVolunteer !== '' && selectedVolunteer !== currentVolunteer ? '' : 'hidden'}`}
            onClick={handleAddVolunteer}
            >
              <Switch />
            </button>
          </section>
          <section className="flex flex-col sm:flex-row justify-between items-center gap-2 w-full border-slate-500 border p-2 rounded-lg">
            <label className="flex-1 flex gap-2 items-center" htmlFor="tool_input">
              <Tool /> <span className="hidden sm:inline">Herramienta</span>
            </label>
            <input id="tool_input" type="text" value={currentTool} onChange={handleChangeCurrentTool} placeholder="Código de barras o nombre..." className="px-2 py-1 rounded-md flex-1 text-slate-900 font-normal" />
            <button className={`bg-green-700 rounded-md p-1 ${currentTool !== '' && !selectedTools.includes(currentTool) ? '' : 'hidden'}`}
              onClick={handleAddTool}>
              <Plus />
            </button>
            <button className={`bg-cyan-700 rounded-md p-1 ${selectedTools.length > 0 ? '' : 'hidden'}`}
              onClick={handleClearTools}>
              <XCircle />
            </button>
          </section>
          <section className="flex flex-col sm:flex-row justify-start items-center gap-2 w-full border-slate-500 border p-2 rounded-lg">
            <label htmlFor="isToday" className="flex-1 py-1">Usar fecha de hoy</label>
            <div className="flex justify-start flex-1">
              <input type="checkbox" id="isToday" className="w-6 h-6" checked={isToday} value={isToday} onChange={toggleIsToday}/>
            </div>
          </section>
          <section className={`${isToday ? 'hidden' : ''} flex flex-col sm:flex-row justify-between items-center gap-2 w-full border-slate-500 border p-2 rounded-lg`}>
            <label className="flex-1 flex gap-2 items-center">
              <Calendar /> <span className="hidden sm:inline">Fecha</span>
            </label>
            <input type="date" value={registerDate} onChange={handleChangeDate}
              className="text-slate-900 rounded-md px-2 py-1 flex-1 font-normal" />
          </section>
          <div className="flex flex-col font-light text-sm gap-2">
            {
              selectedVolunteer !== '' &&
              <section className="flex gap-2 items-center font-semibold text-lg">
                <button onClick={() => handleDeleteVolunteer()} className="text-red-600 rounded-md p-1"><MinusCircle/></button>
                <User />
                <span>{selectedVolunteer}</span>
              </section>
            }
            {
              selectedTools.length > 0 && selectedTools.map(tool => {
                return(
                  <div className="flex gap-2 items-center ">
                    <button onClick={() => handleDeleteTool(tool)} className="text-red-600 rounded-md p-1"><MinusCircle/></button>
                    <Tool />
                    <span>{tool}</span>
                  </div>
                )
              })
            }
            {
              registerDate !== '' && registerDate
            }
          </div>
          <button className={`col-span-2 self-center flex justify-center gap-2 p-2 items-center bg-green-700 rounded-md py-2
          ${selectedTools.length > 0 ? '' : 'disabled opacity-50'}`}>
            <Plus />{`Añadir registro${selectedTools.length <= 1 ? '' : 's'}`}
          </button>
        </div>
      </div>
    </>
  )
}