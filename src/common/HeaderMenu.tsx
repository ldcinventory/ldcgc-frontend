import { ProfileSmall } from "../profile/ProfileSmall";
import { AppNavLink } from "./components/AppNavLink";

export function HeaderMenu() {
  return (
    <header className="h-[8vh] flex justify-between items-center p-4
    bg-primary-2 dark:bg-primary-9">
      <AppNavLink to='/register/tools'>Registro de herramientas</AppNavLink>
      <AppNavLink to={'/register/consumables'}>Registro de consumibles</AppNavLink>
      <ProfileSmall />
    </header>
  )
}