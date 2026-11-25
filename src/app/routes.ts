import { createBrowserRouter } from "react-router"
import Site from "../App"
import IniciarSesion from "../seccions/IniciarSesion"
import Registro from "../seccions/Registro"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Site,
  },
  {
    path: "/productos",
    Component: Site,
  },
  {
    path: "/productos/:productId",
    Component: Site,
  },
  {
    path: "/servicios",
    Component: Site,
  },
  {
    path: "/dejar-resena",
    Component: Site,
  },
  {
    path: "/iniciar-sesion",
    Component: IniciarSesion,
  },
  {
    path: "/registro",
    Component: Registro,
  },
  {
    path: "*",
    Component: Site,
  },
])
