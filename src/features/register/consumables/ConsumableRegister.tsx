import { AddConsumableRegisterModal } from "./components/AddConsumableRegisterModal";
import { ConsumablesRegisterTable } from "./components/ConsumablesRegisterTable";

export function ConsumablesRegister() {
  return (
    <div className="flex flex-col items-start mt-10 mx-20">
      <AddConsumableRegisterModal />
      <ConsumablesRegisterTable />
    </div>
  )
}