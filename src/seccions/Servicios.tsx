import { Link } from "react-router"
import servicesProductImage from "../assets/servicios-productos.png"
import Icon from "../components/Icon"
import WorkComparisonCard from "../components/WorkComparisonCard"
import { featuredWorkComparisons, serviceDetails } from "../data/content"

interface Service {
  title: string
  text: string
}

interface ServiciosProps {
  services: Service[]
  waLink: (message: string) => string
}

export default function Servicios({ services, waLink }: ServiciosProps) {
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
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center xl:gap-14">
            <div className="max-w-3xl">
              <p className="section-kicker">Oficio y soluciones</p>
              <h1 className="section-title">Conocé todo lo que hacemos.</h1>
              <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                Desde una suela nueva hasta una copia de tus llaves. Descubrí
                nuestros trabajos, organizados por sector y explicados en
                detalle.
              </p>
            </div>
            <div className="hidden justify-end lg:flex">
              <div className="aspect-[3/2] w-full max-w-[440px] overflow-hidden rounded-2xl border border-sky-100 bg-sky-50 shadow-xl shadow-sky-950/10">
                <img
                  src={servicesProductImage}
                  alt="Mochilas, zapatos, zapatillas, carteras, llaves, candados, cerraduras, papeles y una tarjeta SUBE"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
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
        <div className="mx-auto max-w-7xl space-y-14 lg:space-y-20">
          {services.map((service, index) => {
            const detail = serviceDetails.find(
              (item) => item.title === service.title,
            )
            return (
              <article
                id={`sector-${index}`}
                key={service.title}
                className="scroll-mt-28 border-b border-sky-200/80 pb-12 last:border-0 last:pb-0 lg:pb-16"
              >
                <header className="mb-7 max-w-3xl">
                  <p className="section-kicker">
                    Servicio {String(index + 1).padStart(2, "0")} /{" "}
                    {String(services.length).padStart(2, "0")}
                  </p>
                  <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-sky-950 sm:text-4xl">
                    {service.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                    {detail?.introduction ?? service.text}
                  </p>
                </header>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {detail?.jobs.map((job) => (
                    <article
                      key={job.title}
                      className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-sky-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-950/10"
                    >
                      <div className="aspect-[16/10] overflow-hidden bg-sky-100">
                        <img
                          src={job.image}
                          alt={`${job.title} en ${service.title}`}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <h3 className="text-lg font-extrabold tracking-tight text-sky-950">
                          {job.title}
                        </h3>
                        <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
                          {job.description}
                        </p>
                        <a
                          href={waLink(
                            `Hola, quisiera consultar por el trabajo ${job.title} del servicio ${service.title}.`,
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Consultar por ${job.title} en WhatsApp`}
                          className="mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-extrabold text-sky-700 transition hover:text-sky-950"
                        >
                          Consultar
                          <Icon name="arrow" className="h-4 w-4" />
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section
        id="trabajos-destacados"
        className="scroll-mt-24 bg-white px-5 py-14 lg:px-8 lg:py-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="section-kicker">Una muestra del taller</p>
            <h2 className="section-title mt-2">Trabajos destacados</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Deslizá cada comparador para ver las imágenes de referencia. Son
              ilustrativas y no muestran la misma pieza antes y después.
            </p>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {featuredWorkComparisons.map((work) => (
              <WorkComparisonCard
                key={work.id}
                work={work}
                consultationHref={waLink(
                  `Hola, quisiera consultar por el trabajo ${work.title} del servicio ${work.category}.`,
                )}
              />
            ))}
          </div>
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
            aparece en la lista, contanos qué necesitás y evaluamos cómo
            ayudarte.
          </p>
          <Link
            to="/#contacto"
            className="mx-auto mt-7 flex h-13 w-fit items-center gap-3 rounded-full bg-sky-950 px-7 text-sm font-bold text-white shadow-lg shadow-sky-950/10 transition hover:bg-sky-800"
          >
            Ir al formulario de contacto
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  )
}
