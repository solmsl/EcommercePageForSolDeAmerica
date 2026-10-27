import { useMemo, useState } from "react"
import { Link } from "react-router"
import Icon from "../components/Icon"

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  tag?: string;
}

interface ProductosProps {
  products: Product[];
  onAddToCart: (productId: number) => void;
  formatPrice: (price: number) => string;
}

export default function ProductosSection({ products, onAddToCart, formatPrice }: ProductosProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  const [sort, setSort] = useState("destacados")

  const categories = useMemo(
    () => ["Todos", ...new Set(products.map((product) => product.category))],
    [products],
  )

  const filteredProducts = useMemo(() => {
    const matches = products.filter((product) => {
      const query = search.trim().toLowerCase()
      const matchesSearch = [product.name, product.category, product.tag]
        .join(" ")
        .toLowerCase()
        .includes(query)
      const matchesCategory =
        category === "Todos" || product.category === category

      return matchesSearch && matchesCategory
    })

    return [...matches].sort((first, second) => {
      if (sort === "menor-precio") return first.price - second.price
      if (sort === "mayor-precio") return second.price - first.price
      if (sort === "nombre") return first.name.localeCompare(second.name)
      return 0
    })
  }, [category, products, search, sort])

  return (
    <section
      id="productos"
      className="min-h-[70vh] scroll-mt-24 bg-white px-5 py-12 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <nav
          className="mb-8 flex items-center gap-2 text-xs font-semibold text-slate-500"
          aria-label="Ruta de navegación"
        >
          <Link to="/" className="transition hover:text-sky-600">
            Inicio
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-sky-950">Productos</span>
        </nav>

        <div className="rounded-[2rem] bg-sky-50 px-6 py-8 sm:px-10 sm:py-10">
          <div>
            <p className="section-kicker">Nuestra tienda</p>
            <h1 className="section-title">Todos los productos</h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-500">
              Todo lo que necesitás para cuidar tu calzado y proteger tu hogar.
            </p>
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-[minmax(0,1fr)_220px]">
            <div className="relative">
              <Icon
                name="search"
                className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-sky-500"
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar por nombre o categoría..."
                className="h-13 w-full rounded-2xl border border-sky-100 bg-white pr-4 pl-12 text-sm font-medium text-sky-950 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                aria-label="Buscar productos"
              />
            </div>
            <label className="relative">
              <span className="sr-only">Ordenar productos</span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="h-13 w-full appearance-none rounded-2xl border border-sky-100 bg-white px-4 pr-10 text-sm font-bold text-sky-950 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              >
                <option value="destacados">Ordenar: destacados</option>
                <option value="menor-precio">Menor precio</option>
                <option value="mayor-precio">Mayor precio</option>
                <option value="nombre">Nombre A–Z</option>
              </select>
              <Icon
                name="chevron"
                className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-sky-700"
              />
            </label>
          </div>

          <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`shrink-0 rounded-full px-5 py-2.5 text-xs font-bold transition ${
                  category === item
                    ? "bg-sky-950 text-white"
                    : "border border-sky-100 bg-white text-slate-600 hover:border-sky-300"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <p className="text-sm font-bold text-sky-950">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "producto" : "productos"}
          </p>
          {(search || category !== "Todos") && (
            <button
              onClick={() => {
                setSearch("")
                setCategory("Todos")
              }}
              className="text-xs font-bold text-sky-600 transition hover:text-sky-950"
            >
              Limpiar filtros
            </button>
          )}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-5 sm:gap-y-10 lg:grid-cols-4">
          {filteredProducts.map((product) => (
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
                {/* Botón flotante para computadora */}
                <button
                  onClick={() => onAddToCart(product.id)}
                  className="absolute right-4 bottom-4 left-4 z-20 hidden h-12 translate-y-3 items-center justify-center gap-2 rounded-full bg-sky-950 text-sm font-bold text-white opacity-0 shadow-lg transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 focus:translate-y-0 focus:opacity-100 sm:flex"
                >
                  <Icon name="bag" className="h-4 w-4" /> Agregar al carrito
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
                {/* Botón simplificado para celular */}
                <button
                  onClick={() => onAddToCart(product.id)}
                  className="mt-3 flex items-center gap-1.5 text-xs font-bold text-sky-600 sm:hidden"
                >
                  <Icon name="bag" className="h-4 w-4" /> Agregar al carrito
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
  );
}
