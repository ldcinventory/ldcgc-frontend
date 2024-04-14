import { Button } from "../tCommon";

export function AppButtonTransparent({ children, onClick, className, disabled }: Button) {
  return ( 
    <button onClick={onClick}
      className={`dark:hover:text-primary-3 dark:hover:bg-primary-6 
      rounded-md transition-colors duration-300 p-1 transition-all duration-300
      ${className}`}
      disabled={disabled}>
      {children}
    </button>
  )
}

export function AppButtonSuccess({children, onClick, className, disabled}: Button) {
  return (
    <button onClick={onClick}
      className={`bg-success-5 rounded-md p-1 hover:bg-success-4 transition-all duration-300
      ${className}`}
      disabled={disabled}>
      {children}
    </button>
  )
}

export function AppButtonError({ children, onClick, className, disabled }: Button) {
  return (
    <button onClick={onClick}
      className={`bg-error-5 rounded-md p-1 hover:bg-error-4 transition-all duration-300
      ${className}`}
      disabled={disabled}>
      {children}
    </button>
  )
}


export function AppButton({ children, onClick, className, disabled }: Button) {
  return (
    <button onClick={onClick}
      className={`bg-primary-6 rounded-md p-1 hover:bg-primary-5 transition-all duration-300
      ${className}`}
      disabled={disabled}>
      {children}
    </button>
  )
}

export function AppButtonSubmit({ children, onClick, className, disabled }: Button) {
  return (
    <button onClick={onClick}
      className={`bg-primary-6 rounded-md p-1 hover:bg-primary-5 transition-all duration-300
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
      className={`bg-success-5 rounded-md p-1 hover:bg-success-4 transition-all duration-300
      ${className}`}
      disabled={disabled}>
      {children}
    </button>
  )
}