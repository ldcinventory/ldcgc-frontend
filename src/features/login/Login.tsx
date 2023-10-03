import ImageProps from "../../types/ImageProps"
import Button from "../button/Button"
import Onboarding from "./Onboarding"

const images: ImageProps[] = [
  {
    src: "assets/images/volunteers.png",
    alt: "Volunteers Image",
    title: "Gestor de voluntarios",
    description:
      "Gestión básica de los voluntarios para participar en el ddepartamento de construcción de LDC.",
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
  return (
    <div className="flex flex-col justify-around h-screen">
      <div className="h-[70%] mt-[70px]">
        <Onboarding images={images} />
      </div>
      <div className="flex-grow">
        <Button buttonName="Entrar" />
      </div>
    </div>
  )
}

export default Login
