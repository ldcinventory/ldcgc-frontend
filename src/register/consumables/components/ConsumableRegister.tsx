import { AddConsumableRegisterModal } from "./AddConsumableRegisterModal";
import { ConsumablesRegisterTable } from "./ConsumablesRegisterTable";

export function ConsumablesRegister() {
  return (
    <div className="flex flex-col items-start mt-10 mx-5 lg:mx-20">
      <AddConsumableRegisterModal />
      <ConsumablesRegisterTable />
    </div>
  )
}