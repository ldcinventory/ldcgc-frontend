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
        <a href={`${import.meta.env.VITE_ELM_APP}/volunteers`}>Voluntarios</a>
        <AppNavLink to='/resources/tools'>Materiales</AppNavLink>
        <AppNavLink to='/register/tools'>Registro</AppNavLink>
        <ProfileSmall />
      </header>
      <main className="dark:bg-primary-8 mx-5 lg:mx-20">
        <Outlet />
      </main>
    </>
  )
}