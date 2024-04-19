import { Bars3Icon, ChevronLeftIcon, HomeIcon } from "@heroicons/react/24/outline";
import { AppNavLink } from "../common/components/AppNavLink";
import { ProfileSmall } from "../profile/ProfileSmall";
import { useState } from "react";
import { AppButtonRounded, AppButtonTransparent } from "../common/components/AppButton";

export function AsideMenu() {
  const [opened, setOpened] = useState(false)
  return (
    <>
      <AppButtonRounded className={`md:hidden absolute top-5 left-5 ${opened && 'hidden'} dark:bg-primary-9 bg-primary-3`}
      onClick={() => setOpened(true)}>
        <Bars3Icon className="h-8" />
      </AppButtonRounded>
      <AppButtonRounded className={`md:hidden absolute top-10 z-20 bg-primary-2 dark:bg-primary-9
       ${opened ? 'right-[17%]' : 'right-[100%]'}`}
        onClick={() => setOpened(false)}>
        <ChevronLeftIcon className="h-8" />
      </AppButtonRounded>
      <aside className={`md:hidden fixed bg-primary-3 dark:bg-primary-9 w-4/5 h-screen top-0 z-10
      transition-all duration-300 pl-10 py-10 flex flex-col justify-between ${opened ? 'left-0' : 'left-[-100%]'}`}>
        <div className="flex flex-col gap-10">
          <AppNavLink to='/'>
            <AppButtonTransparent onClick={() => setOpened(false)} ><HomeIcon className="h-8" /></AppButtonTransparent>
          </AppNavLink>
          <AppNavLink to='/volunteers'>
            <AppButtonTransparent onClick={() => setOpened(false)} >Voluntarios</AppButtonTransparent>
          </AppNavLink>
          <AppNavLink to='/tools'>
            <AppButtonTransparent onClick={() => setOpened(false)} >Herramientas</AppButtonTransparent>
          </AppNavLink>
          <AppNavLink to='/register/tools'>
            <AppButtonTransparent onClick={() => setOpened(false)} >Registro</AppButtonTransparent>
          </AppNavLink>
        </div>
        <ProfileSmall />
      </aside>
    </>
  )
}