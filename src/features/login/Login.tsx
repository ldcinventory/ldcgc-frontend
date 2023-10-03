import ImageProps from "../../types/ImageProps"
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
function Login() {
  return (
    <div className="App">
      <Onboarding images={images} />
    </div>
  )
}

export default Login
