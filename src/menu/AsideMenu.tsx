import { Bars3Icon, ChevronLeftIcon, HomeIcon } from "@heroicons/react/24/outline";
import { AppNavLink } from "../common/components/AppNavLink";
import { ProfileSmall } from "../profile/ProfileSmall";
import { useState } from "react";
import { AppButtonRounded, AppButtonTransparent } from "../common/components/AppButton";

export function AsideMenu() {
  const [opened, setOpened] = useState(false)
  return (
    <>
      <AppButtonTransparent className={`md:hidden absolute top-5 left-5 ${opened && 'hidden'}`}
      onClick={() => setOpened(true)}>
        <Bars3Icon className="h-8" />
      </AppButtonTransparent>      
      <aside className={`md:hidden fixed bg-primary-3 dark:bg-primary-9 w-4/5 h-full top-0 z-10
      transition-all duration-300 pl-10 py-10 flex flex-col justify-between ${opened ? 'left-0' : 'left-[-100%]'}`}>
        <AppButtonRounded className={`md:hidden absolute top-10 z-20 ${opened ? 'right-[-5%]' : 'right-[100%]'} bg-primary-3`}
          onClick={() => setOpened(false)}>
          <ChevronLeftIcon className="h-8" />
        </AppButtonRounded>
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