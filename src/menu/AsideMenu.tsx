import { Bars3Icon, ChevronLeftIcon, HomeIcon } from "@heroicons/react/24/outline";
import { AppNavLink } from "../common/components/AppNavLink";
import { ProfileSmall } from "../profile/ProfileSmall";
import { useState } from "react";
import { AppButton } from "../common/components/AppButton";

export function AsideMenu() {
  const [opened, setOpened] = useState(false)
  return (
    <>
      <AppButton className={`md:hidden absolute top-10 left-10 rounded-full ${opened && 'hidden'}`}
      onClick={() => setOpened(true)}>
        <Bars3Icon className="h-8" />
      </AppButton>
      <AppButton className={`md:hidden absolute top-10 right-[17%] z-20 rounded-full bg-primary-2 dark:bg-primary-9
       ${!opened && 'hidden'}`}
        onClick={() => setOpened(false)}>
        <ChevronLeftIcon className="h-8" />
      </AppButton>
      <aside className={`md:hidden fixed bg-primary-3 dark:bg-primary-9 w-4/5 h-screen top-0 z-10
      transition-all duration-300 pl-10 py-10 ${opened ? 'flex flex-col justify-between' : 'hidden'}`}>
        <div className="flex flex-col gap-10">
          <AppNavLink to='/'><HomeIcon className="h-8" /></AppNavLink>
          <AppNavLink to='/volunteers'>Voluntarios</AppNavLink>
          <AppNavLink to='/tools'>Herramientas</AppNavLink>
          <AppNavLink to='/register'>Registro</AppNavLink>
        </div>
        <ProfileSmall />
      </aside>
    </>
  )
}