import { Outlet } from "react-router-dom";
import { AppNavLinkBox } from "../../common/components/AppNavLink";
import { DeleteModal } from "./DeleteModal";

export function ResourcesHeader() {
  return (
    <>
      <header className="flex flex-col lg:flex-row gap-6 lg:gap-20 my-10 items-center w-full justify-center">
        <nav className="justify-self-center">
          <AppNavLinkBox to="/resources/tools" className="rounded-l-md">Herramientas</AppNavLinkBox>
          <a href={`${import.meta.env.VITE_ELM_APP}/consumables`} className="hover:text-primary-8 hover:dark:text-primary-3 px-4 py-3 border transition-all duration-300 rounded-r-md">
            Consumibles
          </a>
        </nav>
      </header>
      <section>
        <Outlet />
      </section>
    </>
  )
}