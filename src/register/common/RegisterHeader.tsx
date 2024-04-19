import { Outlet } from "react-router-dom";
import { AppNavLinkBox } from "../../common/components/AppNavLink";
import { AddRegistersModal } from "./AddRegistersModal";

export function RegisterHeader() {

  return ( 
    <>
      <header className="flex flex-col lg:flex-row gap-6 lg:gap-20 my-10 items-center">
        <AddRegistersModal />
        <nav className="justify-self-center">
          <AppNavLinkBox to="/register/tools" className="rounded-l-md">Herramientas</AppNavLinkBox>
          <AppNavLinkBox to="/register/consumables" className="rounded-r-md">Consumibles</AppNavLinkBox>
        </nav>
      </header>
      <section>
        <Outlet />
      </section>
    </>
  )
}