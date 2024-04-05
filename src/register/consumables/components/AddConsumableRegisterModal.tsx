import { useState } from "react";
import { Close, Plus } from "../../../Icons";
import { Consumable } from "../../../resources/consumables/tConsumables";
import { useDebouncedCallback } from "use-debounce";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { getConsumables } from "../../../resources/consumables/consumablesSlice";

export function AddConsumableRegisterModal() {
  const [modalOpened, setModalOpened] = useState(false)
  const state = useAppSelector((state) => state.consumables)
  const dispatch = useAppDispatch()
  const [possibleConsumables, setPossibleConsumables] = useState<Consumable[]>([])
  const handlePossibleConsumables = useDebouncedCallback(
    (consumablesParams) => dispatch(getConsumables(consumablesParams)), 500)

  return (
    <>
      <button className="flex gap-2 bg-slate-600 py-4 px-10 rounded-xl hover:bg-slate-500 transition-colors"
        onClick={() => setModalOpened(true)}>
        <Plus /> Añadir registros
      </button>
      <div className={`${!modalOpened && 'hidden'} 
      fixed w-full h-full top-0 left-0 bg-slate-900 bg-opacity-50 flex justify-center items-center`}>
        <section className="bg-slate-500 rounded-md flex flex-col items-end p-4 w-3/12">
          <button className="hover:text-slate-200"
            onClick={() => setModalOpened(false)}>
            <Close />
          </button>
          <form action="" className="flex flex-col gap-4 px-10 pb-10 pt-4 w-full">
            {JSON.stringify(state)}
            <label htmlFor="volunteer-input">Voluntario</label>
            <input id="volunteer-input" type="text" className="rounded-md p-1 text-slate-900 font-normal" />
            <label htmlFor="consumable-input">Consumibles</label>
            <input id="consumable-input" type="text" className="rounded-md p-1 text-slate-900 font-normal"
              onChange={(e) => handlePossibleConsumables({ filterString: e.target.value })} />
            <label htmlFor="date-input">Fecha</label>
            <input id="date-input" type="date" className="text-slate-900 p-1 rounded-md font-normal" />
            <button type="submit" className="bg-green-700 px-4 py-2 m-auto rounded-md mt-5 hover:bg-green-600
            transition-colors duration-300">
              Añadir registros
            </button>
          </form>
        </section>
      </div>
    </>
  )
}