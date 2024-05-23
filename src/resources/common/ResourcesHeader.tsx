import { Outlet } from "react-router-dom";
import { AppNavLinkBox } from "../../common/components/AppNavLink";

export function ResourcesHeader() {
  return (
    <>
      <header className="flex flex-col lg:flex-row gap-6 lg:gap-20 my-10 items-center w-full justify-center">
        <nav className="justify-self-center">
          <AppNavLinkBox to="/resources/tools" className="rounded-l-md">Herramientas</AppNavLinkBox>
          <AppNavLinkBox to="/resources/consumables" className="rounded-r-md">Consumibles</AppNavLinkBox>
        </nav>
      </header>
      <section>
        <Outlet />
      </section>
    </>
  )
}