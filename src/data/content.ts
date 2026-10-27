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

export const products: Product[] = [
  {
    id: 1,
    code: "SDA-CAL-001",
    name: "Plantillas confort premium",
    category: "Calzado",
    price: 8900,
    image:
      "https://images.unsplash.com/photo-1550998358-08b4f83dc345?auto=format&fit=crop&w=700&q=82",
    images: [
      "https://images.unsplash.com/photo-1550998358-08b4f83dc345?auto=format&fit=crop&w=1200&q=88",
      "https://images.unsplash.com/photo-1662135426497-eaa054ba53a3?auto=format&fit=crop&w=1200&q=88",
      "https://images.unsplash.com/photo-1591940704483-683982102b36?auto=format&fit=crop&w=1200&q=88",
    ],
    tag: "Más vendido",
    stock: 18,
    colors: ["Negro", "Beige"],
    description:
      "Plantillas acolchadas para uso diario, pensadas para mejorar el apoyo y reducir el cansancio al caminar.",
    features: [
      "Espuma de alta densidad",
      "Recortables para adaptar al calzado",
      "Superficie respirable",
      "Aptas para calzado urbano y laboral",
    ],
  },
  {
    id: 2,
    code: "SDA-CUI-002",
    name: "Kit de limpieza para cuero",
    category: "Cuidado",
    price: 12800,
    image:
      "https://images.unsplash.com/photo-1577467013350-7c22a844e1a9?auto=format&fit=crop&w=700&q=82",
    images: [
      "https://images.unsplash.com/photo-1577467013350-7c22a844e1a9?auto=format&fit=crop&w=1200&q=88",
      "https://images.unsplash.com/photo-1653868249587-284b275a1c67?auto=format&fit=crop&w=1200&q=88",
      "https://images.unsplash.com/photo-1653869225353-8101df710ff4?auto=format&fit=crop&w=1200&q=88",
    ],
    tag: "Nuevo",
    stock: 11,
    colors: ["Neutro", "Negro", "Marrón"],
    description:
      "Un set completo para limpiar, nutrir y proteger zapatos, botas, carteras y otros artículos de cuero.",
    features: [
      "Crema nutritiva para cuero",
      "Cepillo aplicador",
      "Paño de terminación",
      "Presentación lista para regalar",
    ],
  },
  // {
  //   id: 3,
  //   name: "Cordones encerados clásicos",
  //   category: "Calzado",
  //   price: 3500,
  //   image:
  //     "https://images.unsplash.com/photo-1543201017-a54835bbbc5d?auto=format&fit=crop&w=700&q=82",
  //   tag: "",
  // },
  {
    id: 4,
    code: "SDA-CER-004",
    name: "Candado de seguridad 50 mm",
    category: "Cerrajería",
    price: 15900,
    image:
      "https://images.unsplash.com/photo-1758351507272-aa6929fe997e?auto=format&fit=crop&w=700&q=82",
    images: [
      "https://images.unsplash.com/photo-1758351507272-aa6929fe997e?auto=format&fit=crop&w=1200&q=88",
      "https://images.unsplash.com/photo-1555529902-5261145633bf?auto=format&fit=crop&w=1200&q=88",
      "https://images.unsplash.com/photo-1635602739175-bab409a6e94c?auto=format&fit=crop&w=1200&q=88",
    ],
    tag: "Stock limitado",
    stock: 5,
    colors: ["Bronce", "Plateado"],
    description:
      "Candado reforzado para portones, depósitos y usos generales que requieren mayor resistencia.",
    features: [
      "Cuerpo metálico de 50 mm",
      "Arco de acero reforzado",
      "Incluye juego de llaves",
      "Uso interior y exterior cubierto",
    ],
  },
  // {
  //   id: 5,
  //   name: "Cepillo profesional de crin",
  //   category: "Cuidado",
  //   price: 7600,
  //   image:
  //     "https://images.unsplash.com/photo-1577467013301-3cfafe7079a3?auto=format&fit=crop&w=700&q=82",
  //   tag: "",
  // },
  {
    id: 6,
    code: "SDA-CER-006",
    name: "Cilindro de seguridad reforzado",
    category: "Cerrajería",
    price: 28500,
    image:
      "https://images.unsplash.com/photo-1756341782434-3020b9d17372?auto=format&fit=crop&w=700&q=82",
    images: [
      "https://images.unsplash.com/photo-1756341782434-3020b9d17372?auto=format&fit=crop&w=1200&q=88",
      "https://images.unsplash.com/photo-1585914641050-fa9883c4e21c?auto=format&fit=crop&w=1200&q=88",
      "https://images.unsplash.com/photo-1677951570313-b0750351c461?auto=format&fit=crop&w=1200&q=88",
    ],
    tag: "Stock limitado",
    stock: 4,
    colors: ["Niquelado", "Bronce"],
    description:
      "Cilindro reforzado para renovar la seguridad de puertas residenciales y comerciales.",
    features: [
      "Construcción metálica reforzada",
      "Incluye tres llaves",
      "Compatible con cerraduras estándar",
      "Instalación disponible en el local",
    ],
  },
  // {
  //   id: 7,
  //   code: "SDA-CER-007",
  //   name: "Candado de seguridad reforzado 32 mm",
  //   category: "Cerrajería",
  //   price: 14500,
  //   image:
  //     "https://images.unsplash.com/photo-1756341782434-3020b9d17372?auto=format&fit=crop&w=700&q=82",
  //   images: [
  //     "https://images.unsplash.com/photo-1756341782434-3020b9d17372?auto=format&fit=crop&w=1200&q=88",
  //     "https://images.unsplash.com/photo-1585914641050-fa9883c4e21c?auto=format&fit=crop&w=1200&q=88",
  //     "https://images.unsplash.com/photo-1677951570313-b0750351c461?auto=format&fit=crop&w=1200&q=88",
  //   ],
  //   tag: "",
  //   stock: 3,
  //   colors: ["Niquelado", "Bronce"],
  //   description:
  //     "Candado reforzado para renovar la seguridad de puertas residenciales y comerciales.",
  //   features: [
  //     "Construcción metálica reforzada",
  //     "Incluye 2 llaves",
  //     "Compatible con cerraduras estándar",
  //     "Instalación disponible en el local",
  //   ],
  // },
]

export const services = [
  {
    title: "Zapatería",
    text: "Composturas, restauración y cuidado de calzado.",
    image:
      "https://images.unsplash.com/photo-1759662232622-6c0754a379f4?auto=format&fit=crop&w=700&q=82",
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
