import { ReactNode } from "react";

export function AppTableHeaderCellMd({ children, className }:{children?: ReactNode, className?: string}) {
  return (
    <th className="p-2 w-1/5">
      <div className={`flex gap-2 items-center ${className}`}>
        {children}
      </div>
    </th>
  )
}

export function AppTableCellMd({ children, className }: { children?: ReactNode, className?: string }) {
  return ( 
    <td className={`p-2 w-1/5 ${className}`}>
      {children}
    </td>
  )
}

export function AppTableHeaderCellLg({ children, className }: { children?: ReactNode, className?: string }) {
  return (
    <th className="p-2 w-[14%]">
      <div className={`flex gap-2 items-center ${className}`}>
        {children}
      </div>
    </th>
  )
}

export function AppTableCellLg({ children, className }: { children?: ReactNode, className?: string }) {
  return (
    <td className={`p-2 w-[14%] ${className}`}>
      {children}
    </td>
  )
}