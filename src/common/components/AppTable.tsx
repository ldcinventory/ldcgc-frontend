import { ReactNode } from "react";

export function AppTableCell({ children, className, columns }: { children?: ReactNode, className?: string, columns?: number }) {
  const width = columns ? `w-[${100/columns}%]` : ''

  return (
    <td className={`p-2 ${width}`}>
      <div className={`flex gap-2 items-center ${className ? className : ''}`}>
        {children}
      </div>
    </td>
  )
}

export function AppTableHeaderCell({ children, className }: { children?: ReactNode, className?: string }) {
  return (
    <th className="p-2">
      <div className={`flex gap-2 items-center ${className ? className : ''}`}>
        {children}
      </div>
    </th>
  )
}

export function AppTableHeaderCell5({ children, className }:{children?: ReactNode, className?: string}) {
  return (
    <th className="p-2 w-1/5">
      <div className={`flex gap-2 items-center ${className ? className : ''}`}>
        {children}
      </div>
    </th>
  )
}

export function AppTableCell5({ children, className }: { children?: ReactNode, className?: string }) {
  return ( 
    <td className={`p-2 w-1/5 ${className ? className : ''}`}>
      {children}
    </td>
  )
}

export function AppTableHeaderCell7({ children, className }: { children?: ReactNode, className?: string }) {
  return (
    <th className="p-2 w-[14%]">
      <div className={`flex gap-2 items-center ${className ? className : ''}`}>
        {children}
      </div>
    </th>
  )
}

export function AppTableCell7({ children, className }: { children?: ReactNode, className?: string }) {
  return (
    <td className={`p-2 w-[14%] ${className ? className : ''}`}>
      {children}
    </td>
  )
}