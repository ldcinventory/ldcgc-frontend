import { ReactNode } from "react";

export function AppButtonTransparent({ children, onClick }: { children?: ReactNode, onClick?: () => void }) {
  return ( 
    <button onClick={onClick}
    className="dark:hover:text-primary-3">
      {children}
    </button>
  )
}