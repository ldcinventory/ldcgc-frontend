import logo from "../../assets/logo.svg"

export function Home() {
  return (
    <section className="h-full min-h-[93vh] flex flex-col justify-center items-center text-center gap-10">
      <img src={logo} alt="Logo de ldc inventory" />
      <h1 className="text-2xl font-bold">Bienvenido a LDC Inventory</h1>
      <p>Una aplicación hecha con cariño para los grupos de construcción.</p>
    </section>
  )
}