import { ReactNode } from "react";

export function AppTableHeaderCell5({ children, className }:{children?: ReactNode, className?: string}) {
  return (
    <th className="p-2 w-1/5">
      <div className={`flex gap-2 items-center ${className}`}>
        {children}
      </div>
    </th>
  )
}

export function AppTableCell5({ children, className }: { children?: ReactNode, className?: string }) {
  return ( 
    <td className={`p-2 w-1/5 ${className}`}>
      {children}
    </td>
  )
}

export function AppTableHeaderCell7({ children, className }: { children?: ReactNode, className?: string }) {
  return (
    <th className="p-2 w-[14%]">
      <div className={`flex gap-2 items-center ${className}`}>
        {children}
      </div>
    </th>
  )
}

export function AppTableCell7({ children, className }: { children?: ReactNode, className?: string }) {
  return (
    <td className={`p-2 w-[14%] ${className}`}>
      {children}
    </td>
  )
}