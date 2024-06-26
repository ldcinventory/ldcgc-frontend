import { AppNavLink } from "../../common/components/AppNavLink";

export function NotFound() {
  return (
    <section className="flex flex-col gap-4 min-h-[92.5vh] items-center mt-10">
      <h1 className="text-5xl">Página no encontrada</h1> 
      <span>Ir a la <AppNavLink to="/" className='text-primary-7 dark:text-primary-4'>home</AppNavLink></span>
    </section>
  )
}