export const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1529953717281-81a40b131119?auto=format&fit=crop&w=1800&q=86",
    eyebrow: "Oficio, experiencia y dedicación",
    title: "Tus zapatos, como nuevos.",
    text: "Composturas artesanales y soluciones de cerrajería en un mismo lugar.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1749477417968-2bc986bc6a42?auto=format&fit=crop&w=1800&q=86",
    eyebrow: "Cerrajería de confianza",
    title: "La solución está más cerca.",
    text: "Duplicado de llaves, cambios de combinación y aperturas.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1653868249587-284b275a1c67?auto=format&fit=crop&w=1800&q=86",
    eyebrow: "Cuidado profesional",
    title: "Reparamos lo que te acompaña.",
    text: "Renovamos calzado, carteras, mochilas y mucho más.",
  },
]

export interface Product {
  id: number
  code: string
  name: string
  category: string
  price: number
  image: string
  images: string[]
  tag?: string
  stock: number
  colors: string[]
  description: string
  features: string[]
}

const shoemakingImage =
  "https://images.unsplash.com/photo-1759662232622-6c0754a379f4?auto=format&fit=crop&w=700&q=82"

const serviceWorkImages = {
  shoeSoles:
    "https://images.unsplash.com/photo-1662135426497-eaa054ba53a3?auto=format&fit=crop&w=700&q=82",
  shoeStitching:
    "https://images.unsplash.com/photo-1591940704483-683982102b36?auto=format&fit=crop&w=700&q=82",
  shoeCare:
    "https://images.unsplash.com/photo-1577467013350-7c22a844e1a9?auto=format&fit=crop&w=700&q=82",
  boots:
    "https://images.unsplash.com/photo-1653868249587-284b275a1c67?auto=format&fit=crop&w=700&q=82",
  leatherGoods:
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=82",
  homeKeys:
    "https://images.unsplash.com/photo-1737442886747-9fb768b96ed2?auto=format&fit=crop&w=700&q=82",
  padlockKeys:
    "https://images.unsplash.com/photo-1758351507272-aa6929fe997e?auto=format&fit=crop&w=700&q=82",
  furnitureKeys:
    "https://images.unsplash.com/photo-1585914641050-fa9883c4e21c?auto=format&fit=crop&w=700&q=82",
  locks:
    "https://images.unsplash.com/photo-1756341782434-3020b9d17372?auto=format&fit=crop&w=700&q=82",
  openings:
    "https://images.unsplash.com/photo-1555529902-5261145633bf?auto=format&fit=crop&w=700&q=82",
  carKeys:
    "https://images.unsplash.com/photo-1533558701576-23c65e0272fb?auto=format&fit=crop&w=700&q=82",
  printing:
    "https://images.unsplash.com/photo-1706895040634-62055892cbbb?auto=format&fit=crop&w=700&q=82",
  sube: "https://images.unsplash.com/photo-1632276536839-84cad7fd03b0?auto=format&fit=crop&w=700&q=82",
}

export const designerTestimonial = {
  author: "Sofi Martire",
  role: "Diseñadora y autora de la reseña",
  title: "Compostura de calzados y mochilas: Sol de América",
  image: shoemakingImage,
  summary:
    "Sofi Martire destaca el cuidado artesanal y la calidad de cada compostura.",
  highlights: [
    {
      title: "Botas como nuevas",
      text: "La reseña resalta resultados prolijos y un buen acabado.",
    },
    {
      title: "Calzado y mochilas",
      text: "Arreglos para distintos materiales y tipos de pieza.",
    },
    {
      title: "Precios justos",
      text: "Una alternativa a reemplazar lo que todavía puede repararse.",
    },
  ],
  url: "https://sofimartire.com.ar/zapateria/compostura-de-calzados-y-mochilas-sol-de-america/",
}

export const customerReviews = [
  {
    name: "María G.",
    service: "Compostura de calzado",
    quote:
      "Dejé unas botas que pensaba que ya no tenían arreglo y quedaron impecables. Me explicaron todo antes de empezar y cumplieron con el tiempo de entrega.",
  },
  {
    name: "Carlos R.",
    service: "Cerrajería",
    quote:
      "Excelente atención y mucha paciencia. Me hicieron las copias de las llaves en el momento y funcionaron perfecto.",
  },
  {
    name: "Lucía M.",
    service: "Atención en el local",
    quote:
      "Siempre encuentro una solución y me atienden con muy buena predisposición. Es un local de confianza al que vuelvo cada vez que lo necesito.",
  },
]

export const services = [
  {
    title: "Zapatería",
    text: "Composturas, restauración y cuidado de calzado.",
    image: shoemakingImage,
  },
  {
    title: "Cerrajería del Hogar",
    text: "Llaves, cerraduras y soluciones para tu hogar.",
    image:
      "https://images.unsplash.com/photo-1737442886747-9fb768b96ed2?auto=format&fit=crop&w=700&q=82",
  },
  {
    title: "Cerrajería del Automotor",
    text: "Copias y soluciones para llaves de vehículos.",
    image:
      "https://images.unsplash.com/photo-1533558701576-23c65e0272fb?auto=format&fit=crop&w=700&q=82",
  },
  {
    title: "Impresiones",
    text: "Impresiones y copias rápidas en el local.",
    image:
      "https://images.unsplash.com/photo-1706895040634-62055892cbbb?auto=format&fit=crop&w=700&q=82",
  },
  {
    title: "SUBE",
    text: "Carga de saldo para tu tarjeta SUBE.",
    image:
      "https://images.unsplash.com/photo-1632276536839-84cad7fd03b0?auto=format&fit=crop&w=700&q=82",
  },
]

// Detalle público de los trabajos descritos en el sitio y en la reseña del taller.
export const serviceDetails = [
  {
    title: "Zapatería",
    introduction:
      "Reparamos calzado y artículos de marroquinería para recuperar su uso, su forma y su terminación.",
    jobs: [
      {
        title: "Cambio de suela",
        description:
          "Cambiamos la suela rota o gastada de tu calzado por una nueva, según el material y el estado de la pieza.",
        image: serviceWorkImages.shoeSoles,
      },
      {
        title: "Reparación de costuras",
        description:
          "Reparamos costuras abiertas o descosidas en zapatos, zapatillas, botas y botines.",
        image: serviceWorkImages.shoeStitching,
      },
      {
        title: "Restauración y cuidado",
        description:
          "Trabajamos sobre el calzado deteriorado para recuperar su funcionalidad y mejorar su acabado, evaluando cada reparación.",
        image: serviceWorkImages.shoeCare,
      },
      {
        title: "Botas y calzado deportivo",
        description:
          "Composturas para botas, botines, zapatillas urbanas y calzado deportivo o formal.",
        image: serviceWorkImages.boots,
      },
      {
        title: "Mochilas y carteras",
        description:
          "Reparamos cierres, correas, manijas, costuras abiertas, desgarros y roturas.",
        image: serviceWorkImages.leatherGoods,
      },
    ],
  },
  {
    title: "Cerrajería del Hogar",
    introduction:
      "Trabajos de cerrajería para recuperar el acceso y mantener en funcionamiento las cerraduras de tu hogar.",
    jobs: [
      {
        title: "Copias de llaves de hogar",
        description:
          "Duplicamos llaves de puertas del hogar a partir de tu llave original, según el modelo.",
        image: serviceWorkImages.homeKeys,
      },
      {
        title: "Copias de llaves de candados",
        description:
          "Hacemos duplicados de llaves de candados para que tengas una copia de respaldo.",
        image: serviceWorkImages.padlockKeys,
      },
      {
        title: "Llaves de muebles y modelos especiales",
        description:
          "Realizamos copias de llaves de muebles y distintos modelos especiales, previa verificación de compatibilidad.",
        image: serviceWorkImages.furnitureKeys,
      },
      {
        title: "Cambios de combinación",
        description:
          "Modificamos la combinación de cerraduras compatibles para que funcionen con un nuevo juego de llaves.",
        image: serviceWorkImages.locks,
      },
      {
        title: "Aperturas",
        description:
          "Evaluamos y realizamos aperturas de cerraduras según el tipo de mecanismo y el trabajo necesario.",
        image: serviceWorkImages.openings,
      },
    ],
  },
  {
    title: "Cerrajería del Automotor",
    introduction:
      "Copias y soluciones para llaves de vehículos. La posibilidad de realizar el trabajo depende del tipo de llave y del modelo.",
    jobs: [
      {
        title: "Copias y evaluación de llaves",
        description:
          "Revisamos el tipo de llave y el modelo del vehículo para confirmar compatibilidad y realizar duplicados cuando sea posible.",
        image: serviceWorkImages.carKeys,
      },
    ],
  },
  {
    title: "Impresiones",
    introduction:
      "Resolvé tus impresiones y copias de documentos en el mismo local.",
    jobs: [
      {
        title: "Impresiones y copias",
        description:
          "Imprimimos y hacemos copias de documentos. Coordiná en el local el formato y las características que necesitás.",
        image: serviceWorkImages.printing,
      },
    ],
  },
  {
    title: "SUBE",
    introduction:
      "Un servicio práctico para seguir viajando, disponible en nuestro local.",
    jobs: [
      {
        title: "Carga de saldo",
        description:
          "Realizamos cargas de saldo en tu tarjeta SUBE. Acercate al local con tu tarjeta para cargarla.",
        image: serviceWorkImages.sube,
      },
    ],
  },
]

export interface WorkComparison {
  id: string
  category: string
  title: string
  description: string
  beforeImage: string
  afterImage: string
}

export const homeWorkComparison: WorkComparison = {
  id: "calzado-urbano",
  category: "Zapatería",
  title: "Renovación de calzado urbano",
  description:
    "Un ejemplo visual de los trabajos de compostura y cuidado del calzado.",
  beforeImage:
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=82",
  afterImage:
    "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=82",
}

export const featuredWorkComparisons: WorkComparison[] = [
  homeWorkComparison,
  {
    id: "cambio-de-suela",
    category: "Zapatería",
    title: "Cambio y reparación de suela",
    description:
      "Una muestra ilustrativa del tipo de reparación que ayuda a extender la vida útil del calzado.",
    beforeImage: serviceWorkImages.shoeStitching,
    afterImage: serviceWorkImages.shoeSoles,
  },
  {
    id: "cuidado-de-botas",
    category: "Zapatería",
    title: "Cuidado y terminación de botas",
    description:
      "Trabajos de cuidado y terminación, evaluados según el material y el estado de cada pieza.",
    beforeImage:
      "https://images.unsplash.com/photo-1529953717281-81a40b131119?auto=format&fit=crop&w=1000&q=82",
    afterImage: serviceWorkImages.boots,
  },
  {
    id: "marroquineria",
    category: "Mochilas y carteras",
    title: "Reparación de mochilas",
    description:
      "Reparamos cierres, costuras, correas y otros detalles de mochilas y artículos de marroquinería.",
    beforeImage:
      "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?auto=format&fit=crop&w=1000&q=82",
    afterImage:
      "https://images.unsplash.com/photo-1622560480654-d96214fdc887?auto=format&fit=crop&w=1000&q=82",
  },
]

export const faqs = [
  {
    q: "¿Cuánto demora una compostura?",
    a: "La mayoría de los trabajos se entregan con una demora de 1 o 2 días dependiendo su complejidad. También contamos con reparaciones express según el tipo de trabajo.",
  },
  {
    q: "¿Puedo pedir presupuesto por WhatsApp?",
    a: "Sí. Envianos fotos claras del calzado, cartera o cerradura y te damos una primera estimación sin cargo.",
  },
  {
    q: "¿Hacen copias de todo tipo de llaves?",
    a: "Trabajamos con llaves de hogar, candados, muebles y varios modelos especiales. Consultanos con una foto para confirmar disponibilidad.",
  },
  {
    q: "¿Qué medios de pago aceptan?",
    a: "Aceptamos efectivo, transferencia, tarjetas de débito y crédito en el local.",
  },
]
