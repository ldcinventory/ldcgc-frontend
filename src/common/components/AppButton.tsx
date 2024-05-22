import { Button } from "../tCommon";

export function AppButtonTransparent({ children, onClick, className, disabled }: Button) {
  return ( 
    <button onClick={onClick}
      className={`dark:hover:text-primary-3 dark:hover:bg-primary-6 
      rounded-md p-1 transition-all duration-300
      ${className}`}
      disabled={disabled}>
      {children}
    </button>
  )
}

export function AppButtonSuccess({children, onClick, className, disabled}: Button) {
  return (
    <button onClick={onClick}
      className={`bg-success-4 dark:bg-success-6 dark:hover:bg-success-5 rounded-md p-1 hover:bg-success-3 transition-all duration-300
      ${className}`}
      disabled={disabled}>
      {children}
    </button>
  )
}

export function AppButtonError({ children, onClick, className, disabled }: Button) {
  return (
    <button onClick={onClick}
      className={`bg-error-3 rounded-md p-1 hover:bg-error-4 transition-all duration-300
      ${className}`}
      disabled={disabled}>
      {children}
    </button>
  )
}


export function AppButton({ children, onClick, className, disabled }: Button) {
  return (
    <button onClick={onClick}
      className={`bg-primary-2 rounded-md p-1 hover:bg-primary-4 transition-all duration-300 dark:bg-primary-7
      ${className}`}
      disabled={disabled}>
      {children}
    </button>
  )
}


export function AppButtonRounded({ children, onClick, className, disabled }: Button) {
  return (
    <button onClick={onClick}
      className={`bg-primary-2 rounded-full p-1 hover:bg-primary-4 transition-all duration-300
      ${className}`}
      disabled={disabled}>
      {children}
    </button>
  )
}


export function AppButtonSubmit({ children, onClick, className, disabled }: Button) {
  return (
    <button onClick={onClick}
      className={`bg-primary-2 rounded-md p-1 hover:bg-primary-4 transition-all duration-300 dark:bg-primary-6
      ${className}`}
      disabled={disabled}
      type="submit">
      {children}
    </button>
  )
}

export function AppButtonSubmitSuccess({ children, onClick, className, disabled }: Button) {
  return (
    <button type="submit"
      onClick={onClick}
      className={`bg-success-5 rounded-md p-1 transition-all duration-300 ${disabled ? 'opacity-50' : 'hover:bg-success-4'}
      ${className}`}
      disabled={disabled}>
      {children}
    </button>
  )
}