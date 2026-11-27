import { FormEvent, useEffect, useMemo, useRef, useState } from "react"
import { Link, matchPath, useLocation, useNavigate } from "react-router"
import Icon, { type IconName } from "./components/Icon"
import { brandLogo } from "./data/brand"
import ContactSection from "./components/ContactSection"
import {
  customerReviews,
  designerTestimonial,
  faqs,
  homeWorkComparison,
  services,
  slides,
} from "./data/content"
import type { Product } from "./data/content"
import {
  getCustomerSessionUser,
  logoutCustomer,
  type CustomerUser,
} from "./data/authApi"
import { fetchProducts } from "./data/productsApi"
import WorkComparisonCard from "./components/WorkComparisonCard"
import ProductoDetalle from "./seccions/ProductoDetalle"
import ProductosSection from "./seccions/Productos"
import Servicios from "./seccions/Servicios"
import DejarResena from "./seccions/DejarResena"

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

type CustomerReview = typeof customerReviews[number]
type Service = typeof services[number]

function ReviewStars() {
  return (
    <div
      className="flex items-center gap-1 text-sky-500"
      aria-label="5 de 5 estrellas"
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          viewBox="0 0 24 24"
          className="h-4 w-4 fill-current"
          aria-hidden="true"
        >
          <path d="m12 2.7 2.8 5.7 6.3.9-4.6 4.4 1.1 6.3-5.6-3-5.6 3 1.1-6.3-4.6-4.4 6.3-.9L12 2.7Z" />
        </svg>
      ))}
    </div>
  )
}

function ReviewAuthor({ review }: { review: CustomerReview }) {
  return (
    <figcaption className="mt-7 flex items-center gap-3 border-t border-sky-200/70 pt-5">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sky-950 text-[11px] font-extrabold text-white">
        {review.name
          .split(" ")
          .map((part) => part[0])
          .join("")}
      </span>
      <span>
        <span className="block text-sm font-extrabold text-sky-950">
          {review.name}
        </span>
        <span className="mt-0.5 block text-xs text-slate-500">
          {review.service}
        </span>
      </span>
    </figcaption>
  )
}

function ServiceCard({
  service,
  stackIndex,
}: {
  service: Service
  stackIndex?: number
}) {
  const isStacked = stackIndex !== undefined

  return (
    <article
      className={`group aspect-[3/4] overflow-hidden rounded-[1.5rem] bg-sky-950 ${
        isStacked
          ? "sticky w-full shadow-[0_18px_45px_rgba(8,47,73,0.18)]"
          : "relative shadow-sm"
      }`}
      style={
        isStacked
          ? {
              top: `calc(6.25rem + ${stackIndex * 0.45}rem)`,
              zIndex: stackIndex + 1,
            }
          : undefined
      }
    >
      <img
        src={service.image}
        alt={service.title}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        referrerPolicy="no-referrer"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-sky-950/65 via-transparent to-transparent" />
      <a
        href={waLink(
          `Hola, quisiera consultar por el servicio de ${service.title}.`,
        )}
        target="_blank"
        rel="noreferrer"
        className="absolute right-3 bottom-3 left-3 flex min-h-14 items-center justify-between gap-3 rounded-2xl bg-white/95 px-4 py-3 text-sky-950 shadow-lg backdrop-blur-sm transition hover:bg-sky-400"
      >
        <span className="text-sm leading-tight font-extrabold">
          {service.title}
        </span>
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-sky-200">
          <Icon name="arrow" className="h-4 w-4" />
        </span>
      </a>
    </article>
  )
}

export default function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const [slide, setSlide] = useState(0)
  const [category, setCategory] = useState("Todos")
  const [search, setSearch] = useState("")
  const [searchOpen, setSearchOpen] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [productsLoading, setProductsLoading] = useState(true)
  const [productsError, setProductsError] = useState<string | null>(null)
  const [productsRequest, setProductsRequest] = useState(0)
  const [customer, setCustomer] = useState<CustomerUser | null>(() =>
    getCustomerSessionUser(),
  )
  const [cart, setCart] = useState<number[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)
  const [reviewIndex, setReviewIndex] = useState(0)
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const timer = window.setInterval(
      () => setSlide((current) => (current + 1) % slides.length),
      6000,
    )
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    let active = true
    setProductsLoading(true)
    setProductsError(null)

    fetchProducts(controller.signal)
      .then((loadedProducts) => {
        if (active) setProducts(loadedProducts)
      })
      .catch((error: unknown) => {
        if (!active) return
        const detail =
          error instanceof Error ? ` ${error.message}` : " Error desconocido."
        setProductsError(`No se pudieron cargar los productos.${detail}`)
      })
      .finally(() => {
        if (active) setProductsLoading(false)
      })

    return () => {
      active = false
      controller.abort()
    }
  }, [productsRequest])

  useEffect(() => {
    if (!location.hash) return

    const frame = window.requestAnimationFrame(() => {
      document
        .getElementById(location.hash.slice(1))
        ?.scrollIntoView({ behavior: "smooth" })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [location.pathname, location.hash])

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
    [category, products, search],
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
  const featuredProducts = useMemo(
    () => products.slice(0, 4),
    [products],
  )

  const cartProducts = cart
    .map((id) => products.find((product) => product.id === id))
    .filter(Boolean) as typeof products
  const cartTotal = cartProducts.reduce(
    (sum, product) => sum + product.price,
    0,
  )
  const productRoute = matchPath(
    { path: "/productos/:productId", end: true },
    location.pathname,
  )
  const selectedProduct = products.find(
    (product) => product.id === Number(productRoute?.params.productId),
  )

  const scrollTo = (id: string) => {
    setMobileOpen(false)
    setSearchOpen(false)

    if (id === "productos" || id === "servicios") {
      navigate(`/${id}`)
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }

    const scrollToSection = () =>
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" })
    const scrollAfterMenuCloses = () =>
      window.requestAnimationFrame(() =>
        window.requestAnimationFrame(scrollToSection),
      )

    if (location.pathname !== "/") {
      navigate("/")
      window.setTimeout(
        mobileOpen ? scrollAfterMenuCloses : scrollToSection,
        50,
      )
    } else if (mobileOpen) {
      scrollAfterMenuCloses()
    } else {
      scrollToSection()
    }
  }

  const handleContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const message = `Hola, soy ${data.get("nombre")}. Quisiera consultar por: ${data.get("servicio")}.\n\n${data.get("mensaje")}`
    window.open(waLink(message), "_blank", "noopener,noreferrer")
  }

  const changeReview = (direction: 1 | -1) => {
    setReviewIndex(
      (current) =>
        (current + direction + customerReviews.length) % customerReviews.length,
    )
  }

  const handleReviewSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const message = [
      "Hola, quiero enviar una reseña para Sol de América:",
      "",
      `Nombre: ${data.get("reviewName")}`,
      `Servicio: ${data.get("reviewService")}`,
      `Calificación: ${data.get("reviewRating")} de 5`,
      "",
      `${data.get("reviewMessage")}`,
    ].join("\n")

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
                src={brandLogo}
                alt=""
                className="h-full w-full object-contain"
                width="62"
                height="46"
                decoding="async"
              />
            </span>
            <span className="contents sm:block">
              {/* Logo */}
              <span className="block self-center whitespace-nowrap font-['Jersey_25'] text-[18px] leading-none font-semibold tracking-[-0.02px] text-black sm:text-[22px]">
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
            {customer ? (
              <button
                type="button"
                onClick={() => {
                  logoutCustomer()
                  setCustomer(null)
                  setCart([])
                }}
                className="grid h-11 w-11 place-items-center rounded-full border border-sky-100 text-sky-950 transition hover:border-sky-200 hover:bg-sky-50"
                aria-label={`Cerrar sesión de ${customer.name}`}
                title={`Cerrar sesión de ${customer.name}`}
              >
                <Icon name="user" />
              </button>
            ) : (
              <Link
                to="/iniciar-sesion"
                className="grid h-11 w-11 place-items-center rounded-full border border-sky-100 text-sky-950 transition hover:border-sky-200 hover:bg-sky-50"
                aria-label="Iniciar sesión"
              >
                <Icon name="user" />
              </Link>
            )}
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

      {productsError && (
        <div
          className="flex flex-wrap items-center justify-center gap-3 bg-rose-50 px-5 py-3 text-center text-sm text-rose-800"
          role="alert"
        >
          <span>{productsError}</span>
          <button
            type="button"
            onClick={() => setProductsRequest((request) => request + 1)}
            className="font-bold underline underline-offset-2"
          >
            Reintentar
          </button>
        </div>
      )}

      {productRoute ? (
        <ProductoDetalle
          product={selectedProduct}
          isLoading={productsLoading}
          formatPrice={formatPrice}
          onAddToCart={(productId, quantity) =>
            setCart((items) => [
              ...items,
              ...Array.from({ length: quantity }, () => productId),
            ])
          }
          consultationHref={waLink(
            `Hola, quisiera consultar por el producto ${selectedProduct?.code ?? ""} - ${selectedProduct?.name ?? ""}.`,
          )}
        />
      ) : location.pathname === "/productos" ? (
        <ProductosSection
          products={products}
          isLoading={productsLoading}
          hasError={Boolean(productsError)}
          onAddToCart={(productId) => setCart((items) => [...items, productId])}
          formatPrice={formatPrice}
        />
      ) : location.pathname === "/servicios" ? (
        <Servicios services={services} waLink={waLink} />
      ) : location.pathname === "/dejar-resena" ? (
        <DejarResena onSubmit={handleReviewSubmit} />
      ) : (
        <>
          <section
            id="inicio"
            className="relative h-[600px] overflow-hidden sm:h-[680px]"
          >
            {slides.map((item, index) => (
              <div
                key={item.title}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  slide === index
                    ? "opacity-100"
                    : "pointer-events-none opacity-0"
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
            <div className="mx-auto grid max-w-7xl grid-cols-3 items-center justify-items-center gap-x-2 gap-y-4 px-3 py-6 sm:gap-4 sm:px-8 lg:px-8">
              {[
                ["check", "Trabajo garantizado", "Cuidamos cada detalle"],
                ["clock", "Atención rápida", "Consultá por trabajos en el día"],
                ["map", "Retiro en el local", "Lunes a sábados"],
              ].map(([icon, title, text]) => (
                <div
                  key={title}
                  className="flex h-full w-full max-w-[280px] flex-col items-center justify-start gap-2 text-center sm:max-w-none sm:flex-row sm:justify-center sm:gap-4 sm:text-left"
                >
                  <Icon
                    name={icon as IconName}
                    className="h-6 w-6 shrink-0 text-sky-500"
                  />
                  <div className="min-w-0">
                    <p className="text-[11px] leading-tight font-bold text-sky-950 sm:text-sm sm:leading-normal">
                      {title}
                    </p>
                    <p className="mt-1 text-[10px] leading-tight text-slate-500 sm:mt-0 sm:text-xs sm:leading-normal">
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section
            id="productos"
            className="scroll-mt-24 px-5 pt-[75px] pb-[62px] lg:px-8 lg:py-26"
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

              <div className="mt-8 grid gap-x-3 gap-y-8 sm:gap-x-5 sm:gap-y-10 grid-cols-2 lg:grid-cols-4">
                {featuredProducts.map((product) => (
                  <article key={product.id} className="group">
                    <div className="relative aspect-[4/4.3] overflow-hidden rounded-[1.5rem] bg-sky-50">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover sm:transition sm:duration-700 sm:group-hover:scale-105"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        decoding="async"
                      />
                      <Link
                        to={`/productos/${product.id}`}
                        className="absolute inset-0 z-10"
                        aria-label={`Ver ${product.name}`}
                      />
                      {product.tag && (
                        <span className="absolute top-4 left-4 z-20 rounded-full bg-white px-3 py-1.5 text-[10px] font-extrabold tracking-wide text-sky-950 uppercase shadow-sm">
                          {product.tag}
                        </span>
                      )}
                      <button
                        onClick={() =>
                          setCart((items) => [...items, product.id])
                        }
                        disabled={product.stock <= 0}
                        className="absolute right-4 bottom-4 left-4 z-20 hidden h-12 translate-y-3 items-center justify-center gap-2 rounded-full bg-sky-950 text-sm font-bold text-white opacity-0 shadow-lg transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 focus:translate-y-0 focus:opacity-100 disabled:cursor-not-allowed disabled:opacity-50 sm:flex"
                      >
                        <Icon name="bag" className="h-4 w-4" />
                        {product.stock > 0 ? "Agregar al carrito" : "Sin stock"}
                      </button>
                    </div>
                    <div className="px-1 pt-4">
                      <p className="text-[10px] font-bold tracking-[0.15em] text-sky-500 uppercase">
                        {product.category}
                      </p>
                      <div className="mt-1">
                        <h3 className="font-semibold text-slate-800 transition hover:text-sky-600">
                          <Link to={`/productos/${product.id}`}>
                            {product.name}
                          </Link>
                        </h3>
                        <p className="mt-1 font-extrabold text-sky-950">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          setCart((items) => [...items, product.id])
                        }
                        disabled={product.stock <= 0}
                        className="mt-3 flex items-center gap-1.5 text-xs font-bold text-sky-600 disabled:cursor-not-allowed disabled:opacity-50 sm:hidden"
                      >
                        <Icon name="bag" className="h-3.5 w-3.5" />
                        {product.stock > 0 ? "Agregar al carrito" : "Sin stock"}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
              {productsLoading && (
                <p className="py-12 text-center text-slate-500" role="status">
                  Cargando productos...
                </p>
              )}
              {!productsLoading &&
                !productsError &&
                featuredProducts.length === 0 && (
                <p className="py-20 text-center text-slate-500">
                  Los productos destacados estarán disponibles próximamente.
                </p>
                )}
              <div className="mt-12 flex justify-center">
                <Link
                  to="/productos"
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-sky-950 px-6 text-sm font-bold text-white transition hover:bg-sky-800"
                >
                  Ver todos los productos
                  <Icon name="arrow" className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>

          <section
            id="servicios"
            className="scroll-mt-20 bg-sky-50 px-5 py-20 lg:px-8 lg:py-26"
          >
            <div className="mx-auto max-w-7xl">
              <div className="flex items-end justify-between gap-6">
                <div>
                  <p className="section-kicker">Nuestros servicios</p>
                  <h2 className="section-title max-w-xl">
                    Todo lo que necesitás en un solo lugar.
                  </h2>
                </div>
                <Link
                  to="/servicios"
                  className="mb-1 hidden shrink-0 items-center gap-2 text-sm font-bold text-sky-950 transition hover:text-sky-600 sm:flex"
                >
                  Ver todos
                  <Icon name="arrow" className="h-4 w-4" />
                </Link>
              </div>

              {filteredServices.length > 0 ? (
                <>
                  <div className="mt-10 grid gap-4 sm:hidden">
                    {filteredServices.map((service, index) => (
                      <ServiceCard
                        key={service.title}
                        service={service}
                        stackIndex={index}
                      />
                    ))}
                  </div>
                  <div className="mt-10 hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-5">
                    {filteredServices.map((service) => (
                      <ServiceCard key={service.title} service={service} />
                    ))}
                  </div>
                </>
              ) : (
                <p className="w-full py-16 text-center text-sm text-slate-500">
                  No encontramos servicios con esa búsqueda.
                </p>
              )}

              <Link
                to="/servicios"
                className="mx-auto mt-14 flex w-fit items-center gap-2 text-base font-bold text-sky-950 sm:hidden"
              >
                Ver todos
                <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
          </section>

          {/* sector sobre nosotros */}
          <section className="px-5 py-20 lg:px-8 lg:py-18">
            <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-sky-50 p-8 sm:p-14 lg:p-16">
              <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
                {/* Columna izquierda: Texto descriptivo principal */}
                <div className="flex flex-col">
                  <div>
                    <p className="section-kicker">Sobre nosotros</p>
                    <h2 className="section-title text-3xl sm:text-5xl font-black tracking-tight text-sky-950 mt-2">
                      Oficio, Experiencia y Dedicación.
                    </h2>
                    <p className="mt-6 text-sm sm:text-base leading-7 text-slate-600">
                      Más que reparar, recuperamos esas cosas que forman parte
                      de tu día a día. Combinamos oficio tradicional con buenos
                      materiales para darte una solución ingeniosa.
                    </p>
                  </div>
                </div>

                {/* Columna derecha: Lista de tildes, tira exclusiva de iconos sin texto y botón centrado */}
                <div className="flex flex-col justify-between h-full space-y-8 lg:pt-4">
                  <ul className="space-y-4">
                    {[
                      "Evaluación y presupuesto sin cargo.",
                      "Materiales seleccionados para cada trabajo.",
                      "Cuidado profesional y cerrajería de confianza.",
                    ].map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-4 text-sm sm:text-base font-semibold text-sky-950"
                      >
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sky-500 text-white shadow-sm">
                          <Icon name="check" className="h-4 w-4" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Tira compacta solo de iconos limpios separados por barras verticales */}
                  <div className="mx-auto flex w-full max-w-xl items-center justify-between py-3 text-sky-700">
                    <span role="img" aria-label="Zapato" title="Zapato">
                      <svg
                        className="h-5 w-5 sm:h-7 sm:w-7"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 14.5c4.2 0 5.5-1.5 6.2-6l3.4 1.2c1.3 3.2 3.7 4.4 7.7 4.8l.7 3.5H5a2 2 0 0 1-2-2v-1.5Z" />
                        <path d="M11.5 11.5h3M13.5 13.5h3" />
                      </svg>
                    </span>
                    <span
                      className="h-6 w-px bg-sky-300/70 sm:h-8"
                      aria-hidden="true"
                    />

                    <span role="img" aria-label="Cartera" title="Cartera">
                      <svg
                        className="h-5 w-5 sm:h-7 sm:w-7"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="8" width="18" height="12" rx="2.5" />
                        <path d="M8 8V6a4 4 0 0 1 8 0v2M3 12h18M12 12v3" />
                      </svg>
                    </span>
                    <span
                      className="h-6 w-px bg-sky-300/70 sm:h-8"
                      aria-hidden="true"
                    />

                    <span role="img" aria-label="Mochila" title="Mochila">
                      <svg
                        className="h-5 w-5 sm:h-7 sm:w-7"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M7 8V6a5 5 0 0 1 10 0v2M6 8h12a2 2 0 0 1 2 2v10H4V10a2 2 0 0 1 2-2Z" />
                        <path d="M8 13h8v5H8zM4 12H2v5h2M20 12h2v5h-2" />
                      </svg>
                    </span>
                    <span
                      className="h-6 w-px bg-sky-300/70 sm:h-8"
                      aria-hidden="true"
                    />

                    <span role="img" aria-label="Ojota" title="Ojota">
                      <svg
                        className="h-5 w-5 sm:h-7 sm:w-7"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 2c3 0 5 3.3 5 8.5S15.3 22 12 22 7 16.2 7 10.5 9 2 12 2Z" />
                        <path d="M12 11V7M12 11 8.5 14M12 11l3.5 3" />
                      </svg>
                    </span>
                    <span
                      className="h-6 w-px bg-sky-300/70 sm:h-8"
                      aria-hidden="true"
                    />

                    <span
                      role="img"
                      aria-label="Llave de hogar"
                      title="Llave de hogar"
                    >
                      <svg
                        className="h-5 w-5 sm:h-7 sm:w-7"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m3 9 5-4 5 4v6H3V9ZM6 15v4h4v-4" />
                        <path d="M13 12h8M18 12v3M15.5 12v2" />
                      </svg>
                    </span>
                    <span
                      className="h-6 w-px bg-sky-300/70 sm:h-8"
                      aria-hidden="true"
                    />

                    <span role="img" aria-label="Candado" title="Candado">
                      <svg
                        className="h-5 w-5 sm:h-7 sm:w-7"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="4" y="10" width="16" height="11" rx="2" />
                        <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
                      </svg>
                    </span>
                    <span
                      className="h-6 w-px bg-sky-300/70 sm:h-8"
                      aria-hidden="true"
                    />

                    <span
                      role="img"
                      aria-label="Llave codificada de auto"
                      title="Llave codificada de auto"
                    >
                      <svg
                        className="h-5 w-5 sm:h-7 sm:w-7"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="3" width="10" height="14" rx="3" />
                        <circle cx="8" cy="8" r="1.5" />
                        <path d="M8 13h.01M13 14l8 7M15 16l2-2M18 19l2-2" />
                      </svg>
                    </span>
                    <span
                      className="h-6 w-px bg-sky-300/70 sm:h-8"
                      aria-hidden="true"
                    />

                    <span role="img" aria-label="Impresora" title="Impresora">
                      <svg
                        className="h-5 w-5 sm:h-7 sm:w-7"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                        <path d="M6 15h12v6H6zM18 12h.01" />
                      </svg>
                    </span>
                  </div>

                  {/* Botón centrado perfectamente debajo de la barra de iconos */}
                  <div className="flex justify-center pt-2">
                    <a
                      href={waLink(
                        "Hola, quisiera consultar por un trabajo del taller.",
                      )}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-12 items-center gap-2 rounded-full bg-sky-950 px-8 text-sm font-bold text-white transition hover:bg-sky-800 shadow-md"
                    >
                      Consultar un trabajo{" "}
                      <Icon name="arrow" className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-sky-50 px-5 py-16 lg:px-8 lg:py-20">
            <div className="mx-auto grid max-w-7xl gap-9 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-14">
              <div className="max-w-xl">
                <p className="section-kicker">Antes y después</p>
                <h2 className="section-title mt-2">
                  Una nueva oportunidad para tu calzado.
                </h2>
                <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
                  Deslizá la barra para explorar una comparación ilustrativa.
                  Las imágenes son de referencia y no muestran la misma pieza.
                </p>
                <Link
                  to="/servicios#trabajos-destacados"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-sky-950 transition hover:text-sky-600"
                >
                  Ver más trabajos
                  <Icon name="arrow" className="h-4 w-4" />
                </Link>
              </div>
              <WorkComparisonCard
                work={homeWorkComparison}
                imageClassName="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]"
              />
            </div>
          </section>

          <section className="bg-white pb-24 lg:pb-30">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
              <div className="mt-20">
                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                  <div>
                    <p className="section-kicker">Experiencias reales</p>
                    <h2 className="section-title">
                      Reseñas de nuestros clientes
                    </h2>
                  </div>
                  <p className="max-w-md text-sm leading-6 text-slate-500">
                    La confianza se construye con cada trabajo y con cada
                    persona que vuelve a elegirnos.
                  </p>
                </div>

                <div className="-mx-5 mt-9 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-5 sm:hidden">
                  {customerReviews.map((review, index) => (
                    <figure
                      key={review.name}
                      className="flex min-h-80 w-[82vw] max-w-[340px] shrink-0 snap-start flex-col rounded-[1.75rem] border border-sky-100 bg-sky-50 p-7 shadow-lg shadow-sky-950/5"
                    >
                      <ReviewStars />
                      <blockquote className="mt-7 flex-1 text-lg leading-8 font-semibold tracking-[-0.015em] text-slate-700">
                        “{review.quote}”
                      </blockquote>
                      <ReviewAuthor review={review} />
                      <span className="mt-5 text-right text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                        {index + 1} / {customerReviews.length}
                      </span>
                    </figure>
                  ))}
                </div>

                <div
                  id="customer-review-carousel"
                  className="relative mt-10 hidden sm:block"
                  aria-live="polite"
                >
                  <button
                    type="button"
                    onClick={() => changeReview(-1)}
                    className="absolute top-1/2 left-0 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-sky-200 bg-white text-sky-950 shadow-lg transition hover:border-sky-400 hover:bg-sky-50 lg:left-3"
                    aria-label="Ver reseña anterior"
                  >
                    <Icon name="arrow" className="h-5 w-5 rotate-180" />
                  </button>

                  <div className="grid grid-cols-[minmax(0,0.68fr)_minmax(340px,1.25fr)_minmax(0,0.68fr)] items-center gap-5 overflow-hidden px-8 py-6 lg:gap-7 lg:px-14">
                    {[-1, 0, 1].map((offset) => {
                      const index =
                        (reviewIndex + offset + customerReviews.length) %
                        customerReviews.length
                      const review = customerReviews[index]
                      const isActive = offset === 0

                      return (
                        <button
                          type="button"
                          key={`${review.name}-${offset}`}
                          onClick={() =>
                            isActive
                              ? undefined
                              : changeReview(offset as 1 | -1)
                          }
                          className={`text-left transition-all duration-500 ${
                            isActive
                              ? "relative z-10 scale-100 opacity-100"
                              : "scale-[0.92] opacity-45 blur-[2px] hover:opacity-65"
                          }`}
                          aria-label={
                            isActive
                              ? `Reseña actual de ${review.name}`
                              : `Ver reseña de ${review.name}`
                          }
                        >
                          <figure
                            className={`flex min-h-72 flex-col rounded-[1.75rem] border p-7 ${
                              isActive
                                ? "border-sky-200 bg-white shadow-2xl shadow-sky-950/10 lg:p-9"
                                : "border-sky-100 bg-sky-50"
                            }`}
                          >
                            <ReviewStars />
                            <blockquote
                              className={`mt-6 flex-1 font-semibold tracking-[-0.015em] text-slate-700 ${
                                isActive
                                  ? "text-lg leading-8 lg:text-xl lg:leading-9"
                                  : "line-clamp-5 text-sm leading-6"
                              }`}
                            >
                              “{review.quote}”
                            </blockquote>
                            <ReviewAuthor review={review} />
                          </figure>
                        </button>
                      )
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() => changeReview(1)}
                    className="absolute top-1/2 right-0 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-sky-200 bg-white text-sky-950 shadow-lg transition hover:border-sky-400 hover:bg-sky-50 lg:right-3"
                    aria-label="Ver siguiente reseña"
                  >
                    <Icon name="arrow" className="h-5 w-5" />
                  </button>

                  <div className="mt-2 flex items-center justify-center gap-2">
                    {customerReviews.map((review, index) => (
                      <button
                        type="button"
                        key={review.name}
                        onClick={() => setReviewIndex(index)}
                        className={`h-2 rounded-full transition-all ${
                          reviewIndex === index
                            ? "w-7 bg-sky-500"
                            : "w-2 bg-sky-200 hover:bg-sky-300"
                        }`}
                        aria-label={`Ver reseña ${index + 1}`}
                        aria-current={
                          reviewIndex === index ? "true" : undefined
                        }
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-sky-100 pt-8 text-center sm:flex-row sm:text-left">
                  <div className="max-w-2xl">
                    <p className="section-kicker">Tu experiencia nos ayuda</p>
                    <h3 className="mt-1 text-xl font-black tracking-[-0.04em] text-sky-950">
                      ¿Cómo fue tu visita?
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      Compartí tu experiencia y ayudá a otros clientes.
                    </p>
                  </div>
                  <Link
                    to="/dejar-resena"
                    className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-sky-950 px-6 text-sm font-bold text-white transition hover:bg-sky-800"
                  >
                    Dejar una reseña
                    <Icon name="arrow" className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-16 bg-sky-100/70 px-5 py-14 lg:px-8 lg:py-20">
              <div className="mx-auto max-w-7xl">
                <article className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
                  <div>
                    <p className="text-[0.68rem] font-extrabold tracking-[0.2em] text-sky-700 uppercase">
                      Reseña destacada
                    </p>
                    <h2 className="mt-3 max-w-xl text-2xl leading-tight font-black tracking-[-0.04em] text-sky-950 sm:text-3xl">
                      Que tus favoritos vuelvan a acompañarte.
                    </h2>
                    <p className="mt-4 max-w-xl text-sm leading-6 text-slate-700 sm:text-base sm:leading-7">
                      {designerTestimonial.summary}
                    </p>

                    <div className="mt-7 grid gap-4 sm:grid-cols-3">
                      {designerTestimonial.highlights.map((highlight) => (
                        <div
                          key={highlight.title}
                          className="border-t border-sky-300/80 pt-3"
                        >
                          <h3 className="text-sm font-extrabold text-sky-950">
                            {highlight.title}
                          </h3>
                          <p className="mt-1.5 text-xs leading-5 text-slate-700">
                            {highlight.text}
                          </p>
                        </div>
                      ))}
                    </div>

                    <footer className="mt-8 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-extrabold text-sky-950">
                          {designerTestimonial.author}
                        </p>
                        <p className="mt-1 text-xs text-slate-600">
                          {designerTestimonial.role}
                        </p>
                      </div>
                      <a
                        href={designerTestimonial.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-11 items-center gap-2 rounded-full bg-sky-950 px-5 text-sm font-bold text-white transition hover:bg-sky-800"
                      >
                        Leer la reseña
                        <Icon name="arrow" className="h-4 w-4" />
                      </a>
                    </footer>
                  </div>

                  <figure className="w-full max-w-[34rem] justify-self-end">
                    <img
                      src={designerTestimonial.image}
                      alt="Trabajo de reparación artesanal de calzado"
                      className="aspect-[4/3] w-full rounded-[1.75rem] object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <figcaption className="mt-3 text-xs font-semibold tracking-wide text-sky-800">
                      Compostura de calzado y mochilas
                    </figcaption>
                  </figure>
                </article>
              </div>
            </div>
          </section>

          {/* SECTOR DE PREGUNTAS */}
          <section
            id="preguntas"
            className="scroll-mt-20 bg-white px-5 pt-6 pb-18 lg:px-8 lg:pt-8 lg:pb-26"
          >
            <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
              <div>
                <p className="section-kicker">Antes de visitarnos</p>
                <h2 className="section-title">Preguntas frecuentes</h2>
                <p className="mt-5 text-sm leading-7 text-slate-700">
                  ¿No encontrás lo que buscás?{" "}
                  <a
                    href={waLink(
                      "Hola! Tengo una consulta sobre sus servicios.",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent font-semibold text-[#2B8FD4] hover:underline"
                  >
                    Escribinos por WhatsApp
                  </a>{" "}
                  y te respondemos a la brevedad.
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
                      <p className="max-w-2xl pb-6 text-sm leading-7 text-slate-900">
                        {faq.a}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <ContactSection onSubmit={handleContact} />

          {/* Sección de Redes Sociales */}
          <section className="bg-sky-50 pb-5 px-5 ">
            <div className="mx-auto max-w-5xl pt-10 pb-26 text-center">
              <h3 className="mb-12 text-4xl font-extrabold tracking-tight text-[#082f49] lg:text-6xl">
                Nuestras Redes
              </h3>
              <div className="grid grid-cols-2 items-start justify-center gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-8">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/5491121928109"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex min-w-0 flex-col items-center transition hover:-translate-y-1"
                >
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-[#25D366] text-white shadow-md shadow-[#25D366]/20 transition group-hover:scale-105">
                    <Icon
                      name="whatsapp"
                      className="h-8 w-8 fill-current stroke-none"
                    />
                  </div>
                  <span className="mt-3 max-w-full text-[13px] leading-5 font-bold text-slate-700 group-hover:text-sky-900 sm:text-sm">
                    +54 9 11 2192-8109
                  </span>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/soldeamerica115?utm_source=ig_web_button_share_sheet&gwpx=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noreferrer"
                  className="group flex min-w-0 flex-col items-center transition hover:-translate-y-1"
                >
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#FCAF45] text-white shadow-md shadow-[#E1306C]/20 transition group-hover:scale-105">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-8 w-8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle
                        cx="17.5"
                        cy="6.5"
                        r="1"
                        fill="currentColor"
                        stroke="none"
                      />
                    </svg>
                  </div>
                  <span className="mt-3 max-w-full text-[13px] leading-5 font-bold text-slate-700 group-hover:text-sky-900 sm:text-sm">
                    @soldeamerica115
                  </span>
                </a>

                {/* Facebook */}
                <a
                  href="https://www.facebook.com/profile.php?id=61583695944675"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex min-w-0 flex-col items-center transition hover:-translate-y-1"
                >
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-[#1877F2] text-white shadow-md shadow-[#1877F2]/20 transition group-hover:scale-105">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-9 w-9 fill-current"
                      aria-hidden="true"
                    >
                      <path d="M14.2 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.5 1.6-1.5h1.7V3.7c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2H8V13h2.8v8h3.4Z" />
                    </svg>
                  </div>
                  <span className="mt-3 max-w-full text-[13px] leading-5 font-bold text-slate-700 group-hover:text-sky-900 sm:text-sm">
                    Sol de América
                  </span>
                </a>

                {/* Correo Electrónico */}
                <a
                  href="mailto:soldeamerica.zc@gmail.com"
                  className="group flex min-w-0 flex-col items-center transition hover:-translate-y-1"
                >
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-white shadow-md shadow-slate-300/60 ring-1 ring-slate-200 transition group-hover:scale-105">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-9 w-9"
                      fill="none"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M4 7v11" stroke="#4285F4" />
                      <path d="M20 7v11" stroke="#34A853" />
                      <path d="M4 7l8 6 8-6" stroke="#EA4335" />
                      <path d="M4 18h16" stroke="#FBBC04" />
                    </svg>
                  </div>
                  <span className="mt-3 max-w-full text-[12px] leading-5 font-bold text-slate-700 group-hover:text-sky-900 sm:text-sm">
                    <span className="block sm:inline">soldeamerica.zc</span>
                    <span className="block sm:inline">@gmail.com</span>
                  </span>
                </a>
              </div>
            </div>
          </section>
        </>
      )}

      <footer className="bg-sky-950 px-5 pt-16 text-white lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr_1fr_1fr]">
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="text-2xl font-['Jersey_25'] font-black leading-none font-semibold tracking-[-0.03px]">
              SOL DE AMÉRICA
            </p>
            <p className="mt-4 max-w-sm text-sm leading-6 text-sky-100/60">
              Zapatería, Cerrajería y más servicios. Oficio, confianza y
              soluciones para todos los días.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://instagram.com/soldeamerica115"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram de Sol de América"
                className="grid h-10 w-10 place-items-center rounded-full border border-sky-400/70 text-sky-300 transition hover:border-sky-300 hover:bg-sky-400 hover:text-sky-950"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook de Sol de América"
                className="grid h-10 w-10 place-items-center rounded-full border border-sky-400/70 text-sky-300 transition hover:border-sky-300 hover:bg-sky-400 hover:text-sky-950"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 fill-current"
                  aria-hidden="true"
                >
                  <path d="M14.2 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.5 1.6-1.5h1.7V3.7c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2H8V13h2.8v8h3.4Z" />
                </svg>
              </a>
              <a
                href="mailto:soldeamerica.zc@gmail.com"
                aria-label="Correo electrónico de Sol de América"
                className="grid h-10 w-10 place-items-center rounded-full border border-sky-400/70 text-sky-300 transition hover:border-sky-300 hover:bg-sky-400 hover:text-sky-950"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m4 7 8 6 8-6" />
                </svg>
              </a>
            </div>
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
              <p>Calle 115 1736, Berazategui Oeste</p>
              <p>Buenos Aires, Argentina</p>
              <p>+54 9 11 2192-8109</p>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold tracking-[0.15em] text-sky-300 uppercase">
              Horario
            </p>
            <div className="mt-4 space-y-3 text-sm leading-6 text-sky-100/70">
              <p>
                Lun a Vie
                <span className="block">9:00–13:30 y 17:00–20:30</span>
              </p>
              <p>
                Sábados
                <span className="block">10:00–14:00 y 17:00–20:00</span>
              </p>
            </div>
          </div>
        </div>
        <div className="mx-auto flex max-w-7xl flex-col gap-2 border-t border-white/10 py-6 text-[11px] text-sky-100/80 sm:flex-row sm:justify-between">
          <p>© 2026 Sol De América. Todos los derechos reservados.</p>
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
                  <Icon
                    name="whatsapp"
                    className="h-5 w-5 fill-current stroke-none"
                  />
                  Consultar pedido
                </button>
              </div>
            )}
          </aside>
        </div>
      )}
    </main>
  )
}
