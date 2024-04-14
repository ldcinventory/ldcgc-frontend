import { InputSelect } from "../tCommon";

export function AppSelect({value, onChange, options} : InputSelect) {
  return (
    <select className="rounded-md w-full p-1 dark:text-slate-900 dark:bg-primary-1 font-normal"
      value={value}
      onChange={onChange}>
      {
        options.map(o => 
          <option key={o.name} value={o.value}>{o.name}</option>
        )
      }
    </select>
  )
}