import { useLocation } from "react-router-dom"

import { ImageProps } from "./loginSlice"
import Onboarding from "./Onboarding"

const images: ImageProps[] = [
  {
    src: "assets/images/volunteers.png",
    alt: "Volunteers Image",
    title: "Gestor de voluntarios",
    description:
      "Gestión básica de los voluntarios para participar en el departamento de construcción de LDC.",
  },
  {
    src: "assets/images/tools1.png",
    alt: "Tools 1 Image",
    title: "Gestor de herramientas y consumibles",
    description: "Gestión de stock y mantenimiento",
  },
  {
    src: "assets/images/tools2.png",
    alt: "Tools 2 Image",
    title: "Asignación de recursos",
    description:
      "Gestión de recursos para los voluntarios, para llevar un control más detallado de qué, quién, y cuándo.",
  },
]
const Login = () => {
  const location = useLocation()

  return (
    <div className="flex flex-col h-screen">
      <div className="h-2/3">
        <Onboarding images={images} active={location.hash} />
      </div>
      <div className="flex flex-col flex-grow gap-3 mt-20 bg-amber-500 w-[390px] p-10 justify-center">
        <button className="btn btn-neutral">Entrar</button>
        <button className="btn">Registrarse</button>
      </div>
    </div>
  )
}

export default Login
