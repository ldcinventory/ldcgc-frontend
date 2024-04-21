import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

export function AppNavLink({ children, to, className }: { children?: ReactNode, to: string, className?: string }) {
  return (
    <NavLink className={({ isActive, isPending, isTransitioning }) =>
       `hover:text-primary-8 hover:dark:text-primary-3 transition-all duration-300
      ${isActive ? 'text-primary-7 dark:text-primary-3' : ''}
      ${className}`
    }      
    to={to}>
      { children }
    </NavLink>
  )
}

export function AppNavLinkBox({ children, to, className }: { children?: ReactNode, to: string, className?: string }) {
  return (
    <NavLink className={({ isActive, isPending, isTransitioning }) =>
      `hover:text-primary-8 hover:dark:text-primary-3 px-4 py-3 border transition-all duration-300
      ${isActive ? 'bg-primary-2 dark:bg-primary-6' : ''}
      ${className}`
    }
      to={to}>
      {children}
    </NavLink>
  )
}

