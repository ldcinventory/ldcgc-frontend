export function TableHeaderCell({ children, thStyle }) {
  return (
    <th className={thStyle}>
      <div className="flex gap-2 mb-2">
        {children}
      </div>
    </th>
  )
}