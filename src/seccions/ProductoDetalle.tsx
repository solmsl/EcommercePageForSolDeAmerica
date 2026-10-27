import { useEffect, useState } from "react"
import { Link } from "react-router"
import Icon from "../components/Icon"
import type { Product } from "../data/content"

interface ProductoDetalleProps {
  product?: Product
  formatPrice: (price: number) => string
  onAddToCart: (productId: number, quantity: number) => void
  consultationHref: string
}

export default function ProductoDetalle({
  product,
  formatPrice,
  onAddToCart,
  consultationHref,
}: ProductoDetalleProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    setSelectedImage(0)
    setSelectedColor(product?.colors[0] ?? "")
    setQuantity(1)
  }, [product])

  if (!product) {
    return (
      <section className="grid min-h-[60vh] place-items-center px-5 py-20 text-center">
        <div>
          <p className="section-kicker">Producto no encontrado</p>
          <h1 className="section-title">No pudimos encontrar ese producto.</h1>
          <Link
            to="/productos"
            className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-sky-950 px-6 text-sm font-bold text-white"
          >
            Volver a productos <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white px-5 py-10 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <nav
          className="mb-8 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500"
          aria-label="Ruta de navegación"
        >
          <Link to="/" className="transition hover:text-sky-600">
            Inicio
          </Link>
          <span aria-hidden="true">/</span>
          <Link to="/productos" className="transition hover:text-sky-600">
            Productos
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-sky-950">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <div className="aspect-square overflow-hidden rounded-[2rem] bg-sky-50">
              <img
                src={product.images[selectedImage]}
                alt={`${product.name}, imagen ${selectedImage + 1}`}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={image}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-[4/3] overflow-hidden rounded-2xl border-2 transition ${
                    selectedImage === index
                      ? "border-sky-500"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                  aria-label={`Ver imagen ${index + 1} de ${product.name}`}
                >
                  <img
                    src={image}
                    alt=""
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:pt-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-sky-100 px-3 py-1.5 text-[10px] font-extrabold tracking-[0.12em] text-sky-800 uppercase">
                {product.category}
              </span>
              <span className="text-xs font-bold text-slate-400">
                Código {product.code}
              </span>
            </div>

            <h1 className="mt-5 text-4xl leading-[1.05] font-extrabold tracking-[-0.045em] text-sky-950 sm:text-5xl">
              {product.name}
            </h1>
            <p className="mt-5 text-3xl font-black text-sky-600">
              {formatPrice(product.price)}
            </p>
            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600">
              {product.description}
            </p>

            <div className="mt-7 flex items-center gap-2 text-sm font-bold text-emerald-700">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              {product.stock} unidades disponibles
            </div>

            <div className="mt-8">
              <p className="text-xs font-extrabold tracking-[0.12em] text-sky-950 uppercase">
                Color
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`rounded-full border px-4 py-2 text-xs font-bold transition ${
                      selectedColor === color
                        ? "border-sky-950 bg-sky-950 text-white"
                        : "border-slate-200 text-slate-600 hover:border-sky-300"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <p className="text-xs font-extrabold tracking-[0.12em] text-sky-950 uppercase">
                Cantidad
              </p>
              <div className="mt-3 inline-flex h-12 items-center rounded-full border border-slate-200 bg-white">
                <button
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  className="grid h-12 w-12 place-items-center text-xl font-bold text-sky-950"
                  aria-label="Disminuir cantidad"
                >
                  −
                </button>
                <span className="w-10 text-center text-sm font-extrabold">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity((value) => Math.min(product.stock, value + 1))
                  }
                  className="grid h-12 w-12 place-items-center text-xl font-bold text-sky-950"
                  aria-label="Aumentar cantidad"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() => onAddToCart(product.id, quantity)}
              className="mt-8 flex h-14 w-full items-center justify-center gap-3 rounded-full bg-sky-950 px-7 text-sm font-bold text-white shadow-lg shadow-sky-950/15 transition hover:bg-sky-800"
            >
              <Icon name="bag" className="h-5 w-5" />
              Agregar {quantity > 1 ? `${quantity} unidades` : "al carrito"}
            </button>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-sky-50 p-5">
                <Icon name="check" className="h-5 w-5 text-sky-600" />
                <p className="mt-3 text-sm font-extrabold text-sky-950">
                  Métodos de pago
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-600">
                  Efectivo, transferencia, débito y crédito en el local.
                </p>
              </div>
              <div className="rounded-2xl bg-sky-50 p-5">
                <Icon name="map" className="h-5 w-5 text-sky-600" />
                <p className="mt-3 text-sm font-extrabold text-sky-950">
                  Entrega y envío
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-600">
                  Retiro en el local o envío a coordinar por WhatsApp.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-8 border-t border-sky-100 pt-12 lg:grid-cols-[1fr_auto] lg:items-start">
          <div>
            <p className="section-kicker">Información del producto</p>
            <h2 className="text-3xl font-extrabold tracking-[-0.04em] text-sky-950">
              Características técnicas
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {product.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 text-sm font-semibold text-slate-700"
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sky-100 text-sky-700">
                    <Icon name="check" className="h-3.5 w-3.5" />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <a
            href={consultationHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-13 items-center justify-center gap-3 rounded-full bg-[#25D366] px-6 text-sm font-bold text-white transition hover:brightness-95"
          >
            <Icon
              name="whatsapp"
              className="h-5 w-5 fill-current stroke-none"
            />
            Consultar por este producto
          </a>
        </div>
      </div>
    </section>
  )
}
