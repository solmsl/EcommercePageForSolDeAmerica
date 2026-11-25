import type { FormEventHandler } from "react"

import { Link } from "react-router"

import Icon from "../components/Icon"

export default function DejarResena({
  onSubmit,
}: {
  onSubmit: FormEventHandler<HTMLFormElement>
}) {
  return (
    <section className="bg-white px-5 py-10 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-4xl">
        <Link
          to="/"
          className="mb-7 inline-flex items-center gap-2 text-sm font-bold text-sky-950 transition hover:text-sky-600"
        >
          <Icon name="arrow" className="h-4 w-4 rotate-180" />
          Volver al inicio
        </Link>

        <div className="overflow-hidden rounded-[2rem] border border-sky-100 bg-white shadow-xl shadow-sky-950/5">
          <div className="bg-sky-100/70 p-8 sm:p-10">
            <p className="section-kicker">Tu experiencia importa</p>
            <h1 className="mt-3 text-3xl font-black tracking-[-0.04em] text-sky-950 sm:text-4xl">
              ¿Cómo fue tu visita?
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-sky-950">
              Compartí tu experiencia. Tu opinión ayuda a otros clientes a tomar decisiones informadas y nos permite mejorar nuestros servicios.            </p>
          </div>

          <form
            onSubmit={onSubmit}
            className="grid gap-5 p-8 sm:grid-cols-2 sm:p-10"
          >
            <label className="form-label">
              Nombre
              <input
                name="reviewName"
                required
                placeholder="Tu nombre"
                className="form-input"
              />
            </label>
            <label className="form-label">
              Servicio
              <select
                name="reviewService"
                required
                className="form-input"
                defaultValue=""
              >
                <option value="" disabled>
                  Elegí una opción
                </option>
                <option>Zapatería</option>
                <option>Cerrajería</option>
                <option>Impresiones</option>
                <option>Carga SUBE</option>
                <option>Compra de productos</option>
                <option>Atención en el local</option>
              </select>
            </label>
            <label className="form-label">
              Calificación
              <select
                name="reviewRating"
                required
                className="form-input"
                defaultValue="5"
              >
                <option value="5">5 — Excelente</option>
                <option value="4">4 — Muy buena</option>
                <option value="3">3 — Buena</option>
                <option value="2">2 — Regular</option>
                <option value="1">1 — Mala</option>
              </select>
            </label>
            <label className="form-label sm:col-span-2">
              Tu reseña
              <textarea
                name="reviewMessage"
                required
                rows={4}
                minLength={10}
                maxLength={500}
                placeholder="Contanos qué servicio usaste y cómo fue tu experiencia..."
                className="form-input resize-none py-3"
              />
            </label>
            <div className="flex justify-end sm:col-span-2">
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-sky-500 px-6 text-sm font-bold text-sky-950 transition hover:bg-sky-400"
              >
                Enviar reseña
                <Icon name="arrow" className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
