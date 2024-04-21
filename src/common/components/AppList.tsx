import { List } from "../tCommon";

export function AppList({ items, className }: List) {
  return (
    <ul className="z-10 absolute overflow-auto text-primary-9 dark:text-primary-1 flex flex-col gap-2 p-1 w-full rounded-md bg-primary-4">
      {
        items.map(item =>
          <li key={item.id} onClick={item.onClick}
            className={`hover:bg-primary-5 transition-colors duration-200 ${className}`}>
            {item.display}
          </li>
        )
      }
    </ul>
)
}