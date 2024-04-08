import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

export function AppNavLink({ children, to }: {children?: ReactNode, to:string}) {
  return (
    <NavLink className='hover:text-primary-8 hover:dark:text-primary-3'
    to={to}>
      { children }
    </NavLink>
  )
}
