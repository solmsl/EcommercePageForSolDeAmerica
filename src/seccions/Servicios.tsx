import { Link } from "react-router"
import Icon from "../components/Icon"

interface Service {
  title: string
  text: string
  image: string
}

interface ServiciosProps {
  services: Service[]
  createWhatsAppLink: (message: string) => string
}

export default function Servicios({
  services,
  createWhatsAppLink,
}: ServiciosProps) {
  return (
    <section className="min-h-[70vh] bg-sky-50 px-5 py-12 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <nav
          className="mb-8 flex items-center gap-2 text-xs font-semibold text-slate-500"
          aria-label="Ruta de navegación"
        >
          <Link to="/" className="transition hover:text-sky-600">
            Inicio
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-sky-950">Servicios</span>
        </nav>

        <div className="max-w-3xl">
          <p className="section-kicker">Nuestro taller</p>
          <h1 className="section-title">Todos nuestros servicios</h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600">
            Soluciones de zapatería, cerrajería, impresiones y servicios para
            resolver todo en un mismo lugar.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="group overflow-hidden rounded-[1.75rem] bg-white shadow-sm"
            >
              <div className="aspect-[4/3] overflow-hidden bg-sky-100">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-extrabold tracking-[-0.025em] text-sky-950">
                  {service.title}
                </h2>
                <p className="mt-2 min-h-12 text-sm leading-6 text-slate-600">
                  {service.text}
                </p>
                <a
                  href={createWhatsAppLink(
                    `Hola, quisiera consultar por el servicio de ${service.title}.`,
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-sky-600 transition hover:text-sky-950"
                >
                  Consultar servicio
                  <Icon name="arrow" className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
