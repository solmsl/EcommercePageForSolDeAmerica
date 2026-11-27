import type { ReactNode } from "react"
import { Link } from "react-router"
import Icon from "./Icon"
import { brandLogo } from "../data/brand"

export default function AccountShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <main className="min-h-screen bg-sky-50 px-5 py-5 text-slate-900 sm:px-8 sm:py-8">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/"
          className="inline-flex items-center gap-3 rounded-full py-2 pr-4 text-sky-950 transition hover:text-sky-600"
          aria-label="Volver al inicio"
        >
          <img src={brandLogo} alt="" className="h-10 w-14 object-contain" />
          <span>
            <span className="block font-['Jersey_25'] text-xl leading-none">
              SOL DE AMÉRICA
            </span>
            <span className="mt-1 block text-[8px] font-bold tracking-[0.14em] text-sky-500 uppercase">
              Zapatería · Cerrajería
            </span>
          </span>
        </Link>

        <div className="mt-5 overflow-hidden rounded-[2rem] border border-sky-100 bg-white shadow-2xl shadow-sky-950/8 lg:grid lg:min-h-[680px] lg:grid-cols-[0.82fr_1.18fr]">
          <section className="relative overflow-hidden bg-sky-950 p-8 text-white sm:p-10 lg:flex lg:flex-col lg:justify-between lg:p-12">
            <div
              className="absolute -top-24 -right-20 h-64 w-64 rounded-full border-[48px] border-sky-400/10"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative">
              <p className="text-[0.68rem] font-extrabold tracking-[0.2em] text-sky-300 uppercase">
                {eyebrow}
              </p>
              <h1 className="mt-4 max-w-md text-3xl leading-tight font-black tracking-[-0.045em] sm:text-4xl">
                {title}
              </h1>
              <p className="mt-5 max-w-md text-sm leading-7 text-sky-100/70">
                {description}
              </p>
            </div>

            <div className="relative mt-8 hidden space-y-4 lg:block">
              {[
                "Validaciones claras antes de continuar",
                "Acceso exclusivo para clientes",
                "Podés volver a la tienda en cualquier momento",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm font-semibold text-sky-100/80"
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-sky-400 text-sky-950">
                    <Icon name="check" className="h-4 w-4" />
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="flex items-center p-7 sm:p-10 lg:p-14">
            <div className="mx-auto w-full max-w-md">{children}</div>
          </section>
        </div>

        <Link
          to="/"
          className="mx-auto mt-6 flex w-fit items-center gap-2 text-sm font-bold text-sky-950 transition hover:text-sky-600"
        >
          <Icon name="arrow" className="h-4 w-4 rotate-180" />
          Volver a la tienda
        </Link>
      </div>
    </main>
  )
}
