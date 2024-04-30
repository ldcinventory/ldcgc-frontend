import { Input, InputFile, LabeledInput } from "../tCommon";
import { AppButton } from "./AppButton";

export function AppTextInput({ value, onChange, placeholder }: Input) {
  return (
    <input type="text" placeholder={placeholder}
      value={value}
      className="font-normal rounded-md w-full p-1 dark:bg-primary-1 dark:text-primary-9 placeholder:dark:text-primary-5"
      onChange={onChange} />
  )
}

export function AppNumberInput({ value, defaultValue, onChange, placeholder, min, max, step, onKeyUp, className }: Input) {
  return (
    <input type="number" placeholder={placeholder}
      min={min}
      max={max}
      step={step}
      onKeyUp={onKeyUp}
      value={value}
      defaultValue={defaultValue}
      className={` ${className} font-normal rounded-md w-full p-1 
      dark:bg-primary-1 dark:text-primary-9 placeholder:dark:text-primary-5`}
      onChange={onChange} />
  )
}

export function AppNumberInputSm({ value, onChange, placeholder, min, max, step, onKeyUp, className }: Input) {
  return (
    <input type="number" placeholder={placeholder}
      min={min}
      max={max}
      step={step}
      onKeyUp={onKeyUp}
      value={value}
      className={` ${className} font-normal rounded-md w-12 px-1 
      dark:bg-primary-1 dark:text-primary-9 placeholder:dark:text-primary-5`}
      onChange={onChange} />
  )
}

export function AppNumberInputXs({ value, onChange, placeholder, min, max, step, onKeyUp, className }: Input) {
  return (
    <input type="number" placeholder={placeholder}
      min={min}
      max={max}
      step={step}
      onKeyUp={onKeyUp}
      value={value}
      className={` ${className} font-normal rounded-md w-10 px-1 
      dark:bg-primary-1 dark:text-primary-9 placeholder:dark:text-primary-5`}
      onChange={onChange} />
  )
}


export function AppLabeledTextInput({ value, onChange, placeholder, label, id }: LabeledInput) { 
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="flex gap-2">{label}</label>
      <input id={id} type="text" placeholder={placeholder}
        value={value}
        className="font-normal rounded-md w-full p-1 dark:bg-primary-1 dark:text-primary-9 placeholder:dark:text-primary-5"
        onChange={onChange} />
    </div>
  )
}

export function AppLabeledDateInput({ defaultValue, value, onChange, placeholder, label, id }: LabeledInput) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="flex gap-2">{label}</label>
      <input id={id} type="date" placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        className="font-normal rounded-md w-full p-1 dark:bg-primary-1 dark:text-primary-9 placeholder:dark:text-primary-5"
        onChange={onChange} />
    </div>
  )
}

export function AppFileInput({ value, onChange, children, id, className, accept }: InputFile) {
  return (
    <>
      <AppButton className={className} onClick={() => {
        const input = document.getElementById(id) as HTMLInputElement        
        input.value = ""
        input.click()
      }}>
        {children}
      </AppButton>
      <input id={id} type="file"
        value={value}
        className="hidden"
        onChange={onChange}
        accept={accept}
      />
    </>
  )
}
