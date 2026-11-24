import { Link } from "react-router"
import { serviceDetails } from "../data/content"

interface Service {
  title: string
  text: string
  image: string
}

export default function Servicios({ services }: { services: Service[] }) {
  return (
    <>
      <section className="bg-white px-5 pt-10 pb-12 lg:px-8 lg:pt-14 lg:pb-16">
        <div className="mx-auto max-w-7xl">
          <nav
            className="mb-9 flex items-center gap-2 text-xs font-semibold text-slate-500"
            aria-label="Ruta de navegación"
          >
            <Link to="/" className="transition hover:text-sky-600">
              Inicio
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-sky-950">Servicios</span>
          </nav>
          <div className="max-w-3xl">
            <p className="section-kicker">Oficio y soluciones</p>
            <h1 className="section-title">Conocé todo lo que hacemos.</h1>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              Desde una suela nueva hasta una copia de tus llaves. Descubrí
              nuestros trabajos, organizados por sector y explicados en detalle.
            </p>
          </div>
          <nav
            className="mt-8 flex flex-wrap gap-2"
            aria-label="Sectores de servicios"
          >
            {services.map((service, index) => (
              <a
                key={service.title}
                href={`#sector-${index}`}
                className="rounded-full border border-sky-200 bg-sky-50 px-4 py-2.5 text-xs font-bold text-sky-950 transition hover:border-sky-400 hover:bg-sky-100"
              >
                {service.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="bg-sky-50 px-5 py-10 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl space-y-8 lg:space-y-12">
          {services.map((service, index) => {
            const detail = serviceDetails.find(
              (item) => item.title === service.title,
            )
            return (
              <article
                id={`sector-${index}`}
                key={service.title}
                className="scroll-mt-28 overflow-hidden rounded-[1.75rem] border border-sky-100 bg-white shadow-lg shadow-sky-950/5 lg:grid lg:grid-cols-[0.36fr_0.64fr]"
              >
                <div className="relative min-h-64 bg-sky-950 sm:min-h-80">
                  <img
                    src={service.image}
                    alt={`Sector de ${service.title}`}
                    className="absolute inset-0 h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sky-950 via-sky-950/20 to-transparent" />
                  <div className="relative flex h-full min-h-64 flex-col justify-end p-7 sm:min-h-80 sm:p-9">
                    <span className="mb-auto w-fit rounded-full border border-white/30 bg-sky-950/30 px-3 py-1 text-[10px] font-bold tracking-widest text-white backdrop-blur-sm">
                      {String(index + 1).padStart(2, "0")} /{" "}
                      {String(services.length).padStart(2, "0")}
                    </span>
                    <h2 className="mt-12 text-3xl font-black tracking-[-0.04em] text-white">
                      {service.title}
                    </h2>
                    <p className="mt-3 max-w-sm text-sm leading-6 text-sky-100">
                      {detail?.introduction ?? service.text}
                    </p>
                  </div>
                </div>

                <div className="p-6 sm:p-9">
                  <p className="mb-5 text-[10px] font-extrabold tracking-[0.18em] text-sky-600 uppercase">
                    Nuestros trabajos
                  </p>
                  <ul className="grid gap-x-7 gap-y-6 sm:grid-cols-2">
                    {detail?.jobs.map((job) => (
                      <li
                        key={job.title}
                        className="border-t border-sky-100 pt-4"
                      >
                        <h3 className="text-base font-extrabold tracking-tight text-sky-950">
                          {job.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {job.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <div className="bg-sky-50 px-5 py-10 text-center lg:px-8 lg:py-14">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-sky-100 bg-white px-6 py-9 shadow-lg shadow-sky-950/5 sm:px-10">
          <p className="section-kicker">Cada trabajo es diferente</p>
          <h2 className="mx-auto max-w-2xl text-2xl font-extrabold tracking-tight text-sky-950 sm:text-3xl">
            ¿No encontraste lo que necesitás?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600">
            Esta guía reúne nuestros principales trabajos. Si tu reparación no
            aparece en la lista, contanos qué necesitás y evaluamos cómo ayudarte.
          </p>
          <Link
            to="/#contacto"
            className="mx-auto mt-7 flex h-13 w-fit items-center gap-3 rounded-full bg-sky-950 px-7 text-sm font-bold text-white shadow-lg shadow-sky-950/10 transition hover:bg-sky-800"
          >
            Ir al formulario de contacto
          </Link>
        </div>
      </div>
    </>
  )
}
