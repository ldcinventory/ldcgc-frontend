import { ProfileSmall } from "../profile/ProfileSmall";
import { AppNavLink } from "../common/components/AppNavLink";
import { Outlet } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/24/outline";

export function HeaderMenu() {
  return (
    <>
      <header className="h-16 justify-between items-center p-4
      bg-primary-2 dark:bg-primary-9 hidden md:flex">
        <AppNavLink to='/'><HomeIcon className="h-8" /></AppNavLink>
        <AppNavLink to='/volunteers'>Voluntarios</AppNavLink>
        <AppNavLink to='/tools'>Herramientas</AppNavLink>
        <AppNavLink to='/register/tools'>Registro</AppNavLink>
        <ProfileSmall />
      </header>
      <main className="bg-primary-4 dark:bg-primary-8 mx-5 lg:mx-20">
        <Outlet />
      </main>
    </>
  )
}