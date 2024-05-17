import { MouseEvent } from "react";
import { Input, InputFile, LabeledInput, LabeledTextArea } from "../tCommon";
import { AppButton } from "./AppButton";

export function AppTextInput({ value, onChange, placeholder, className }: Input) {
  return (
    <input type="text" placeholder={placeholder}
      value={value}
      className={`font-normal rounded-md w-full p-1 dark:bg-primary-1 dark:text-primary-9 placeholder:dark:text-primary-5 ${className}`}
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

export function AppLabeledNumberInput({ value, defaultValue, onChange, placeholder, min, max, step, onKeyUp, className, id, label }: LabeledInput) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="flex gap-2">{label}</label>
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
    </div>
  )
}


export function AppLabeledNumberInputForm({ defaultValue, name, placeholder, min, max, step, onKeyUp, className, id, label }: LabeledInput) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="flex gap-2">{label}</label>
      <input type="number" placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        onKeyUp={onKeyUp}
        name={name}
        defaultValue={defaultValue}
        className={` ${className} font-normal rounded-md w-full p-1 
        dark:bg-primary-1 dark:text-primary-9 placeholder:dark:text-primary-5`}/>
    </div>
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

export function AppLabeledTextInputForm({ name, placeholder, label, id }: LabeledInput) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="flex gap-2">{label}</label>
      <input id={id} type="text" placeholder={placeholder}
        className="font-normal rounded-md w-full p-1 dark:bg-primary-1 dark:text-primary-9 placeholder:dark:text-primary-5"
        name={name}
         />
    </div>
  )
}

export function AppLabeledTextArea({ value, onChange, placeholder, label, id, rows = 4, cols = 20 }: LabeledTextArea) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="flex gap-2">{label}</label>
      <textarea id={id} placeholder={placeholder} rows={rows} cols={cols}
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

export function AppLabeledDateInputForm({ defaultValue, name, placeholder, label, id }: LabeledInput) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="flex gap-2">{label}</label>
      <input id={id} type="date" placeholder={placeholder}
        name={name}
        defaultValue={defaultValue}
        className="font-normal rounded-md w-full p-1 dark:bg-primary-1 dark:text-primary-9 placeholder:dark:text-primary-5"/>
    </div>
  )
}


export function AppFileInput({ value, onChange, children, id, className, accept, multiple = false }: InputFile) {
  return (
    <>
      <AppButton className={className} onClick={(e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
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
        multiple={multiple}
      />
    </>
  )
}
