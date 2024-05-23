import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { InputSelect, LabeledInputSelect } from "../tCommon";

export function AppSelect({value, onChange, options} : InputSelect) {
  return (
    <select className="rounded-md w-full p-1 dark:text-slate-900 dark:bg-primary-4 font-normal"
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

export function AppLabeledSelect({ value, onChange, options, label, id }: LabeledInputSelect) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="flex gap-2">{label}</label>
        <select className="rounded-md w-full p-1 dark:text-slate-900 dark:bg-primary-4 font-normal"
          value={value}
          onChange={onChange}>
          {
            options.map(o =>
              <option key={o.name} value={o.value}>{o.name}</option>
            )
          }
        </select>
      </div>
  )
}

export function AppLabeledSelectForm({ name, options, label, id, defaultValue, onChange }: LabeledInputSelect) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="flex gap-2">{label}</label>
      <select name={name} defaultValue={defaultValue} className="rounded-md w-full p-1 dark:text-slate-900 dark:bg-primary-4 font-normal" onChange={onChange}>
        {
          options.map(o =>
            <option key={o.name} value={o.value}>{o.name}</option>
          )
        }
      </select>
    </div>
  )
}
