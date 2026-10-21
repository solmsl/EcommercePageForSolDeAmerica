import { FormEvent, useEffect, useMemo, useRef, useState } from "react"
import Icon, { type IconName } from "./components/Icon"
import { faqs, products, services, slides } from "./data/content"

const WHATSAPP_NUMBER = "5491121928109"

function formatPrice(price: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(price)
}

function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export default function App() {
  const [slide, setSlide] = useState(0)
  const [category, setCategory] = useState("Todos")
  const [search, setSearch] = useState("")
  const [searchOpen, setSearchOpen] = useState(false)
  const [cart, setCart] = useState<number[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const timer = window.setInterval(
      () => setSlide((current) => (current + 1) % slides.length),
      6000,
    )
    return () => window.clearInterval(timer)
  }, [])

  const filteredProducts = useMemo(
    () =>
      products.filter(
        (product) =>
          (category === "Todos" || product.category === category) &&
          [product.name, product.category, product.tag]
            .join(" ")
            .toLowerCase()
            .includes(search.trim().toLowerCase()),
      ),
    [category, search],
  )
  const filteredServices = useMemo(
    () =>
      services.filter((service) =>
        [service.title, service.text]
          .join(" ")
          .toLowerCase()
          .includes(search.trim().toLowerCase()),
      ),
    [search],
  )

  const cartProducts = cart
    .map((id) => products.find((product) => product.id === id))
    .filter(Boolean) as typeof products
  const cartTotal = cartProducts.reduce(
    (sum, product) => sum + product.price,
    0,
  )

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setMobileOpen(false)
  }

  const handleContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const message = `Hola, soy ${data.get("nombre")}. Quisiera consultar por: ${data.get("servicio")}.\n\n${data.get("mensaje")}`
    window.open(waLink(message), "_blank", "noopener,noreferrer")
  }

  const checkout = () => {
    const items = cartProducts.map((item) => `• ${item.name}`).join("\n")
    window.open(
      waLink(
        `Hola, quiero consultar por este pedido:\n${items}\n\nTotal estimado: ${formatPrice(cartTotal)}`,
      ),
      "_blank",
      "noopener,noreferrer",
    )
  }

  const openSearch = () => {
    setSearchOpen((open) => {
      if (!open) {
        setCategory("Todos")
        window.setTimeout(() => searchInputRef.current?.focus(), 100)
      }
      return !open
    })
  }

  const closeSearch = () => {
    setSearchOpen(false)
    setSearch("")
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="bg-sky-950 px-4 py-2.5 text-center text-[11px] font-semibold tracking-[0.13em] text-white uppercase sm:text-xs">
        Presupuestos sin cargo · Atención personalizada · Retiro en el local
      </div>

      <header className="sticky top-0 z-40 border-b border-sky-100 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8">
          <button
            onClick={() => scrollTo("inicio")}
            className="grid grid-cols-[48px_auto] grid-rows-[auto_auto] items-center gap-x-1.5 gap-y-1 text-left sm:flex sm:gap-3"
            aria-label="Ir al inicio"
          >
            <span className="grid h-[38px] w-[48px] place-items-center sm:h-[44px] sm:w-[60px]">
              <img
                src={
                  new URL("./assets/sol-de-america-logo.png", import.meta.url)
                    .href
                }
                alt=""
                className="h-full w-full object-contain"
                width="62"
                height="46"
                decoding="async"
              />
            </span>
            <span className="contents sm:block">
              {/* Logo */}
              <span className="block self-center whitespace-nowrap font-['Jersey_25'] text-[18px] leading-none font-semibold tracking-[-0.04px] text-black sm:text-[22px]">
                <span className="block sm:inline">SOL DE</span>{" "}
                <span className="block sm:inline">AMÉRICA</span>
              </span>
              <span className="col-span-2 -mt-0.5 block text-center text-[8px] leading-none font-bold tracking-[1px] text-sky-500 uppercase sm:mt-1 sm:text-left sm:tracking-[1.44px] sm:text-[9px]">
                Zapatería · Cerrajería
              </span>
            </span>
          </button>

          <nav className="hidden items-center gap-7 lg:flex">
            {[
              ["inicio", "Inicio"],
              ["productos", "Productos"],
              ["servicios", "Servicios"],
              ["preguntas", "Preguntas"],
              ["contacto", "Contacto"],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-sm font-semibold text-slate-600 transition hover:text-sky-600"
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={openSearch}
              className={`grid h-11 w-11 place-items-center rounded-full border transition ${
                searchOpen
                  ? "border-sky-950 bg-sky-950 text-white"
                  : "border-sky-100 text-sky-950 hover:border-sky-200 hover:bg-sky-50"
              }`}
              aria-label={
                searchOpen ? "Cerrar búsqueda" : "Buscar productos y servicios"
              }
              aria-expanded={searchOpen}
              aria-controls="site-search"
            >
              <Icon name="search" />
            </button>
            <a
              href={waLink("Hola, quisiera hacer una consulta.")}
              target="_blank"
              rel="noreferrer"
              className="grid h-11 w-11 place-items-center rounded-full border border-sky-100 text-sky-950 transition hover:border-sky-200 hover:bg-sky-50"
              aria-label="Contactar atención al cliente por WhatsApp"
            >
              <Icon name="user" />
            </a>
            <button
              onClick={() => setCartOpen(true)}
              className="relative grid h-11 w-11 place-items-center rounded-full border border-sky-100 text-sky-950 transition hover:bg-sky-50"
              aria-label="Ver carrito"
            >
              <Icon name="bag" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full bg-sky-500 px-1 text-[10px] font-bold text-white">
                  {cart.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen((value) => !value)}
              className="grid h-11 w-11 place-items-center rounded-full bg-sky-950 text-white lg:hidden"
              aria-label="Abrir menú"
            >
              <Icon name={mobileOpen ? "close" : "menu"} />
            </button>
          </div>
        </div>
        {searchOpen && (
          <div id="site-search" className="border-t border-sky-100 bg-white">
            <div className="mx-auto max-w-7xl px-5 py-4 lg:px-8">
              <div className="relative">
                <Icon
                  name="search"
                  className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-sky-500"
                />
                <input
                  ref={searchInputRef}
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Buscar productos o servicios..."
                  className="h-13 w-full rounded-2xl border border-sky-200 bg-sky-50/60 pr-14 pl-12 text-sm font-medium text-sky-950 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                  aria-label="Buscar productos o servicios"
                />
                <button
                  onClick={closeSearch}
                  className="absolute top-1/2 right-2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-slate-400 transition hover:bg-white hover:text-sky-950"
                  aria-label="Cerrar búsqueda"
                >
                  <Icon name="close" className="h-4 w-4" />
                </button>
              </div>
              {search.trim() && (
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                  {filteredProducts.length > 0 && (
                    <button
                      onClick={() => scrollTo("productos")}
                      className="rounded-full bg-sky-100 px-3 py-2 font-bold text-sky-800 transition hover:bg-sky-200"
                    >
                      {filteredProducts.length}{" "}
                      {filteredProducts.length === 1 ? "producto" : "productos"}
                    </button>
                  )}
                  {filteredServices.length > 0 && (
                    <button
                      onClick={() => scrollTo("servicios")}
                      className="rounded-full bg-sky-950 px-3 py-2 font-bold text-white transition hover:bg-sky-800"
                    >
                      {filteredServices.length}{" "}
                      {filteredServices.length === 1 ? "servicio" : "servicios"}
                    </button>
                  )}
                  {filteredProducts.length === 0 &&
                    filteredServices.length === 0 && (
                      <span className="py-1 font-semibold text-slate-500">
                        No encontramos productos ni servicios con esa búsqueda.
                      </span>
                    )}
                </div>
              )}
            </div>
          </div>
        )}
        {mobileOpen && (
          <nav className="border-t border-sky-100 bg-white px-5 py-4 lg:hidden">
            {[
              ["inicio", "Inicio"],
              ["productos", "Productos"],
              ["servicios", "Servicios"],
              ["preguntas", "Preguntas frecuentes"],
              ["contacto", "Contacto"],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="block w-full border-b border-slate-100 py-3 text-left text-sm font-semibold"
              >
                {label}
              </button>
            ))}
          </nav>
        )}
      </header>

      <section
        id="inicio"
        className="relative h-[600px] overflow-hidden sm:h-[680px]"
      >
        {slides.map((item, index) => (
          <div
            key={item.title}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              slide === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <img
              src={item.image}
              alt=""
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "low"}
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-sky-950/90 via-sky-950/55 to-sky-950/10" />
          </div>
        ))}
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-5 lg:px-8">
          <div className="max-w-2xl pt-8 text-white">
            <p className="mb-5 flex items-center gap-3 text-xs font-bold tracking-[0.22em] uppercase">
              <span className="h-px w-10 bg-sky-300" />
              {slides[slide].eyebrow}
            </p>
            <h1 className="max-w-xl text-5xl leading-[0.98] font-black tracking-[-0.055em] sm:text-7xl">
              {slides[slide].title}
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-sky-50 sm:text-lg">
              {slides[slide].text}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <button
                onClick={() => scrollTo("servicios")}
                className="flex h-13 items-center gap-3 rounded-full bg-sky-500 px-7 text-sm font-bold text-white shadow-lg shadow-sky-950/20 transition hover:bg-sky-400"
              >
                Ver servicios <Icon name="arrow" />
              </button>
              <a
                href={waLink("Hola, quisiera solicitar un presupuesto.")}
                target="_blank"
                rel="noreferrer"
                className="flex h-13 items-center gap-3 rounded-full border border-white/40 bg-white/10 px-7 text-sm font-bold text-white backdrop-blur transition hover:bg-white hover:text-sky-950"
              >
                Pedir presupuesto
              </a>
            </div>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 left-0 mx-auto flex max-w-7xl items-center justify-between px-5 pb-7 lg:px-8">
          <div className="flex gap-2">
            {slides.map((item, index) => (
              <button
                key={item.title}
                onClick={() => setSlide(index)}
                className={`h-1 rounded-full transition-all ${
                  slide === index ? "w-10 bg-sky-400" : "w-5 bg-white/50"
                }`}
                aria-label={`Ver imagen ${index + 1}`}
              />
            ))}
          </div>
          <span className="text-xs font-semibold tracking-[0.2em] text-white/80">
            0{slide + 1} / 0{slides.length}
          </span>
        </div>
      </section>

      <section className="border-b border-sky-100 bg-sky-50">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 py-6 sm:grid-cols-3 lg:px-8">
          {[
            ["check", "Trabajo garantizado", "Cuidamos cada detalle"],
            ["clock", "Atención rápida", "Consultá por trabajos en el día"],
            ["map", "Retiro en el local", "Lunes a sábados"],
          ].map(([icon, title, text]) => (
            <div
              key={title}
              className="flex items-center gap-4 sm:justify-center"
            >
              <Icon name={icon as IconName} className="h-6 w-6 text-sky-500" />
              <div>
                <p className="text-sm font-bold text-sky-950">{title}</p>
                <p className="text-xs text-slate-500">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        id="productos"
        className="scroll-mt-24 px-5 py-20 lg:px-8 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="section-kicker">Nuestra tienda</p>
              <h2 className="section-title">Productos destacados</h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-500">
                Todo lo que necesitás para cuidar tu calzado y proteger tu
                hogar.
              </p>
            </div>
            {/* <div className="relative w-full md:w-72">
              <Icon
                name="search"
                className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400"
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar productos..."
                className="h-12 w-full rounded-full border border-slate-200 bg-white pr-4 pl-11 text-sm outline-none transition focus:border-sky-400"
              />
            </div> */}
          </div>

          {/* <div className="mt-10 flex gap-2 overflow-x-auto pb-2">
            {["Todos", "Calzado", "Cuidado", "Cerrajería"].map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`shrink-0 rounded-full px-5 py-2.5 text-xs font-bold transition ${
                  category === item
                    ? "bg-sky-950 text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-sky-300"
                }`}
              >
                {item}
              </button>
            ))}
          </div> */}

          <div className="mt-8 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <article key={product.id} className="group">
                <div className="relative aspect-[4/4.3] overflow-hidden rounded-[1.5rem] bg-sky-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                  />
                  {product.tag && (
                    <span className="absolute top-4 left-4 rounded-full bg-white px-3 py-1.5 text-[10px] font-extrabold tracking-wide text-sky-950 uppercase shadow-sm">
                      {product.tag}
                    </span>
                  )}
                  <button
                    onClick={() => setCart((items) => [...items, product.id])}
                    className="absolute right-4 bottom-4 left-4 flex h-12 translate-y-3 items-center justify-center gap-2 rounded-full bg-sky-950 text-sm font-bold text-white opacity-0 shadow-lg transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 focus:translate-y-0 focus:opacity-100"
                  >
                    <Icon name="bag" className="h-4 w-4" /> Agregar al carrito
                  </button>
                </div>
                <div className="px-1 pt-4">
                  <p className="text-[10px] font-bold tracking-[0.15em] text-sky-500 uppercase">
                    {product.category}
                  </p>
                  <div className="mt-1 flex items-start justify-between gap-4">
                    <h3 className="font-semibold text-slate-800">
                      {product.name}
                    </h3>
                    <p className="shrink-0 font-extrabold text-sky-950">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                  <button
                    onClick={() => setCart((items) => [...items, product.id])}
                    className="mt-3 text-xs font-bold text-sky-600 sm:hidden"
                  >
                    + Agregar al carrito
                  </button>
                </div>
              </article>
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <p className="py-20 text-center text-slate-500">
              No encontramos productos con esa búsqueda.
            </p>
          )}
        </div>
      </section>

      <section
        id="servicios"
        className="scroll-mt-20 bg-sky-950 px-5 py-20 text-white lg:px-8 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="section-kicker !text-sky-300">Nuestro taller</p>
              <h2 className="section-title !text-white">
                Soluciones hechas para durar.
              </h2>
              <p className="mt-6 max-w-md text-sm leading-7 text-sky-100/70">
                Más que reparar, recuperamos esas cosas que forman parte de tu
                día a día. Combinamos oficio tradicional, buenos materiales y
                atención honesta.
              </p>
              <a
                href={waLink(
                  "Hola, quisiera consultar por un servicio del taller.",
                )}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex h-12 items-center gap-3 rounded-full bg-sky-400 px-6 text-sm font-bold text-sky-950 transition hover:bg-white"
              >
                Consultar un trabajo <Icon name="arrow" />
              </a>
            </div>
            <div className="grid gap-px overflow-hidden rounded-[1.75rem] bg-white/10 sm:grid-cols-2">
              {filteredServices.map((service) => (
                <article
                  key={service.title}
                  className="bg-sky-950 p-7 transition hover:bg-sky-900 lg:p-8"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sky-400/10 text-sky-300">
                    <Icon name={service.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-bold">{service.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-sky-100/60">
                    {service.text}
                  </p>
                </article>
              ))}
              {filteredServices.length === 0 && (
                <p className="bg-sky-950 p-8 text-sm text-sky-100/70 sm:col-span-2">
                  No encontramos servicios con esa búsqueda.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] bg-sky-50 lg:grid-cols-2">
          <div className="min-h-[420px]">
            <img
              src="https://images.unsplash.com/photo-1597318404273-4dfde9917a01?auto=format&fit=crop&w=1000&q=85"
              alt="Artesano trabajando en el taller"
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="flex items-center p-8 sm:p-14 lg:p-16">
            <div>
              <p className="section-kicker">Cada pieza importa</p>
              <h2 className="section-title">El valor de reparar.</h2>
              <p className="mt-6 text-sm leading-7 text-slate-600">
                Creemos en extender la vida útil de lo que ya tenés. Una buena
                reparación cuida tu bolsillo, reduce residuos y conserva objetos
                con historia.
              </p>
              <ul className="mt-7 space-y-3">
                {[
                  "Evaluación y presupuesto sin cargo",
                  "Materiales seleccionados para cada trabajo",
                  "Garantía en nuestras reparaciones",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm font-semibold"
                  >
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-sky-500 text-white">
                      <Icon name="check" className="h-3.5 w-3.5" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section
        id="preguntas"
        className="scroll-mt-20 border-y border-sky-100 bg-white px-5 py-20 lg:px-8 lg:py-28"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <p className="section-kicker">Antes de visitarnos</p>
            <h2 className="section-title">Preguntas frecuentes</h2>
            <p className="mt-5 text-sm leading-7 text-slate-500">
              ¿No encontrás lo que buscás? Escribinos y te respondemos a la
              brevedad.
            </p>
          </div>
          <div className="divide-y divide-slate-200 border-t border-slate-200">
            {faqs.map((faq, index) => (
              <div key={faq.q}>
                <button
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 py-6 text-left font-bold text-sky-950"
                >
                  {faq.q}
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sky-50 transition ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  >
                    <Icon name="chevron" className="h-4 w-4" />
                  </span>
                </button>
                {openFaq === index && (
                  <p className="max-w-2xl pb-6 text-sm leading-7 text-slate-500">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contacto"
        className="scroll-mt-20 bg-sky-50 px-5 py-20 lg:px-8 lg:py-28"
      >
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-sky-950/5 lg:grid-cols-2">
          <div className="bg-sky-500 p-8 text-white sm:p-12 lg:p-16">
            <p className="text-xs font-bold tracking-[0.2em] text-sky-950 uppercase">
              Hablemos
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.045em] sm:text-5xl">
              ¿En qué podemos ayudarte?
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-sky-950/75">
              Contanos qué necesitás. Al enviar el formulario se abrirá WhatsApp
              con tu consulta lista para enviar.
            </p>
            <div className="mt-10 space-y-6">
              <div className="flex gap-4">
                <Icon name="map" className="mt-0.5 h-5 w-5 text-sky-950" />
                <div>
                  <p className="font-bold">Nuestro local</p>
                  <p className="mt-1 text-sm text-sky-950/70">
                    Av. Principal 1234, Buenos Aires
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Icon name="clock" className="mt-0.5 h-5 w-5 text-sky-950" />
                <div>
                  <p className="font-bold">Horarios</p>
                  <p className="mt-1 text-sm text-sky-950/70">
                    Lun a Vie 9:00–19:00 · Sáb 9:00–13:30
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Icon name="phone" className="mt-0.5 h-5 w-5 text-sky-950" />
                <div>
                  <p className="font-bold">WhatsApp</p>
                  <p className="mt-1 text-sm text-sky-950/70">
                    +54 9 11 2345-6789
                  </p>
                </div>
              </div>
            </div>
          </div>
          <form onSubmit={handleContact} className="p-8 sm:p-12 lg:p-16">
            <div className="grid gap-5">
              <label className="form-label">
                Nombre
                <input
                  name="nombre"
                  required
                  placeholder="Tu nombre"
                  className="form-input"
                />
              </label>
              <label className="form-label">
                Servicio
                <select name="servicio" className="form-input">
                  <option>Compostura de calzado</option>
                  <option>Restauración y limpieza</option>
                  <option>Carteras y mochilas</option>
                  <option>Duplicado de llaves</option>
                  <option>Cerrajería</option>
                  <option>Consulta por un producto</option>
                </select>
              </label>
              <label className="form-label">
                Tu consulta
                <textarea
                  name="mensaje"
                  required
                  rows={4}
                  placeholder="Contanos brevemente qué necesitás..."
                  className="form-input resize-none py-3"
                />
              </label>
              <button className="mt-2 flex h-13 items-center justify-center gap-3 rounded-full bg-sky-950 text-sm font-bold text-white transition hover:bg-sky-800">
                <Icon name="whatsapp" className="h-5 w-5" /> Enviar por WhatsApp
              </button>
            </div>
          </form>
        </div>
      </section>

      <footer className="bg-sky-950 px-5 pt-16 text-white lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <p className="text-2xl font-black tracking-[-0.04em]">
              PASO & LLAVE
            </p>
            <p className="mt-4 max-w-sm text-sm leading-6 text-sky-100/60">
              Zapatería y cerrajería de barrio. Oficio, confianza y soluciones
              para todos los días.
            </p>
          </div>
          <div>
            <p className="text-xs font-bold tracking-[0.15em] text-sky-300 uppercase">
              Secciones
            </p>
            <div className="mt-4 space-y-3 text-sm text-sky-100/70">
              <button
                onClick={() => scrollTo("productos")}
                className="block hover:text-white"
              >
                Productos
              </button>
              <button
                onClick={() => scrollTo("servicios")}
                className="block hover:text-white"
              >
                Servicios
              </button>
              <button
                onClick={() => scrollTo("preguntas")}
                className="block hover:text-white"
              >
                Preguntas
              </button>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold tracking-[0.15em] text-sky-300 uppercase">
              Contacto
            </p>
            <div className="mt-4 space-y-3 text-sm text-sky-100/70">
              <p>Av. Principal 1234</p>
              <p>Buenos Aires, Argentina</p>
              <p>+54 9 11 2345-6789</p>
            </div>
          </div>
        </div>
        <div className="mx-auto flex max-w-7xl flex-col gap-2 border-t border-white/10 py-6 text-[11px] text-sky-100/40 sm:flex-row sm:justify-between">
          <p>© 2025 Paso & Llave. Todos los derechos reservados.</p>
          <p>Hecho con dedicación, como cada reparación.</p>
        </div>
      </footer>

      <a
        href={waLink("Hola, quisiera hacer una consulta.")}
        target="_blank"
        rel="noreferrer"
        className="fixed right-5 bottom-5 z-30 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl shadow-slate-950/20 transition hover:-translate-y-1 hover:scale-105"
        aria-label="Consultar por WhatsApp"
      >
        <Icon name="whatsapp" className="h-7 w-7 fill-current stroke-none" />
      </a>

      {cartOpen && (
        <div className="fixed inset-0 z-50">
          <button
            className="absolute inset-0 bg-sky-950/50 backdrop-blur-sm"
            onClick={() => setCartOpen(false)}
            aria-label="Cerrar carrito"
          />
          <aside className="absolute top-0 right-0 flex h-full w-full max-w-md flex-col bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-5">
              <div>
                <p className="text-xl font-black text-sky-950">Tu carrito</p>
                <p className="text-xs text-slate-500">
                  {cart.length} productos
                </p>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full bg-sky-50"
              >
                <Icon name="close" />
              </button>
            </div>
            <div className="flex-1 space-y-4 overflow-auto py-6">
              {cartProducts.length === 0 ? (
                <div className="grid h-full place-items-center text-center">
                  <div>
                    <Icon
                      name="bag"
                      className="mx-auto h-10 w-10 text-sky-300"
                    />
                    <p className="mt-4 font-bold">Tu carrito está vacío</p>
                    <p className="mt-1 text-sm text-slate-500">
                      Descubrí nuestros productos.
                    </p>
                  </div>
                </div>
              ) : (
                cartProducts.map((product, index) => (
                  <div
                    key={`${product.id}-${index}`}
                    className="flex items-center gap-4"
                  >
                    <img
                      src={product.image}
                      alt=""
                      className="h-20 w-20 rounded-2xl object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{product.name}</p>
                      <p className="mt-1 text-sm text-sky-600">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setCart((items) =>
                          items.filter((_, itemIndex) => itemIndex !== index),
                        )
                      }
                      className="text-xs font-semibold text-slate-400 hover:text-red-500"
                    >
                      Quitar
                    </button>
                  </div>
                ))
              )}
            </div>
            {cartProducts.length > 0 && (
              <div className="border-t border-slate-100 pt-5">
                <div className="mb-5 flex justify-between">
                  <span className="font-semibold">Total estimado</span>
                  <span className="text-xl font-black text-sky-950">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
                <button
                  onClick={checkout}
                  className="flex h-13 w-full items-center justify-center gap-2 rounded-full bg-[#25D366] text-sm font-bold text-white"
                >
                  <Icon name="whatsapp" /> Consultar pedido
                </button>
              </div>
            )}
          </aside>
        </div>
      )}
    </main>
  )
}
