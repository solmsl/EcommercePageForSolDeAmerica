import productPlaceholder from "../assets/product-placeholder.svg"
import { API_BASE_URL } from "./api"
import type { Product } from "./content"

const API_ORIGIN = new URL(API_BASE_URL).origin

interface ProductPage {
  data: unknown[]
  last_page: number
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

function isProductPage(value: unknown): value is ProductPage {
  return (
    isRecord(value) &&
    Array.isArray(value.data) &&
    Number.isInteger(value.last_page) &&
    Number(value.last_page) > 0
  )
}

async function getProductPage(
  page: number,
  signal: AbortSignal,
): Promise<ProductPage> {
  const response = await fetch(`${API_BASE_URL}/productos?page=${page}`, {
    signal,
  })

  if (!response.ok) {
    throw new Error(`La API respondió con el estado ${response.status}.`)
  }

  const payload: unknown = await response.json()
  if (!isProductPage(payload)) {
    throw new Error("La respuesta de productos de la API tiene un formato inválido.")
  }

  return payload
}

function getImageUrls(value: unknown): string[] {
  if (!Array.isArray(value)) return []

  return value.flatMap((image) => {
    if (!isRecord(image) || typeof image.imagen_url !== "string") return []
    const url = image.imagen_url.trim()
    return url ? [new URL(url, `${API_ORIGIN}/`).href] : []
  })
}

function mapProduct(value: unknown): Product {
  if (!isRecord(value)) {
    throw new Error("La API devolvió un producto inválido.")
  }

  const id = Number(value.id)
  const price = Number(value.precio_actual)
  const stock = Number(value.stock_actual)

  if (
    !Number.isInteger(id) ||
    typeof value.nombre !== "string" ||
    !Number.isFinite(price) ||
    !Number.isFinite(stock)
  ) {
    throw new Error("La API devolvió un producto con datos incompletos.")
  }

  const images = getImageUrls(value.imagenes)

  return {
    id,
    code: String(value.codigo ?? value.sku ?? id),
    name: value.nombre,
    category:
      typeof value.categoria === "string" && value.categoria.trim()
        ? value.categoria
        : "Otros",
    price,
    image: images[0] ?? productPlaceholder,
    images: images.length > 0 ? images : [productPlaceholder],
    tag: typeof value.tag === "string" ? value.tag : undefined,
    stock,
    colors: Array.isArray(value.colores)
      ? value.colores.filter(
          (color): color is string => typeof color === "string",
        )
      : [],
    description:
      typeof value.descripcion === "string" ? value.descripcion : "",
    features: Array.isArray(value.caracteristicas)
      ? value.caracteristicas.filter(
          (feature): feature is string => typeof feature === "string",
        )
      : [],
  }
}

export async function fetchProducts(signal: AbortSignal): Promise<Product[]> {
  const firstPage = await getProductPage(1, signal)
  const remainingPages = await Promise.all(
    Array.from({ length: firstPage.last_page - 1 }, (_, index) =>
      getProductPage(index + 2, signal),
    ),
  )

  return [firstPage, ...remainingPages].flatMap((page) =>
    page.data.map(mapProduct),
  )
}
