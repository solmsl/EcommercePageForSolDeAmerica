import { createBrowserRouter } from "react-router"
import Site from "../App"

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
    path: "*",
    Component: Site,
  },
])
