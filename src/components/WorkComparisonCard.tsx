import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react"

import Icon from "./Icon"
import type { WorkComparison } from "../data/content"

interface WorkComparisonCardProps {
  work: WorkComparison

  imageClassName?: string
  consultationHref?: string
}

function BeforeAfterSlider({
  work,

  imageClassName,
}: WorkComparisonCardProps) {
  const [position, setPosition] = useState(50)

  const sliderRef = useRef<HTMLDivElement>(null)

  const updatePosition = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = sliderRef.current?.getBoundingClientRect()

    if (!bounds || bounds.width === 0) return

    const nextPosition = ((event.clientX - bounds.left) / bounds.width) * 100

    setPosition(Math.round(Math.max(0, Math.min(100, nextPosition))))
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 10 : 5

    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault()

      setPosition((current) => Math.max(0, current - step))
    } else if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault()

      setPosition((current) => Math.min(100, current + step))
    } else if (event.key === "Home") {
      event.preventDefault()

      setPosition(0)
    } else if (event.key === "End") {
      event.preventDefault()

      setPosition(100)
    }
  }

  return (
    <div
      ref={sliderRef}
      role="slider"
      tabIndex={0}
      aria-label={`Comparar antes y después: ${work.title}`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={position}
      aria-valuetext={`${position}% antes visible`}
      className={`relative isolate w-full touch-pan-y overflow-hidden bg-slate-100 outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-sky-400 ${
        imageClassName ?? "aspect-[4/3]"
      }`}
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId)

        updatePosition(event)
      }}
      onPointerMove={(event) => {
        if (event.buttons !== 0) updatePosition(event)
      }}
      onKeyDown={handleKeyDown}
    >
      <img
        src={work.afterImage}
        alt={`${work.title}, vista de referencia después`}
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
        draggable={false}
        loading="lazy"
        decoding="async"
      />
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img
          src={work.beforeImage}
          alt={`${work.title}, vista de referencia antes`}
          className="absolute inset-0 h-full w-full select-none object-cover"
          draggable={false}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 z-10 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_8px_rgba(8,47,73,0.45)]"
        style={{ left: `${position}%` }}
      >
        <span className="absolute top-1/2 left-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white bg-sky-950/85 text-white shadow-lg">
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m8 5-7 7 7 7M16 5l7 7-7 7" />
          </svg>
        </span>
      </div>
      <span className="pointer-events-none absolute bottom-3 left-3 z-10 rounded-full bg-sky-950/75 px-3 py-1.5 text-[10px] font-bold tracking-wider text-white uppercase">
        Antes
      </span>
      <span className="pointer-events-none absolute right-3 bottom-3 z-10 rounded-full bg-sky-950/75 px-3 py-1.5 text-[10px] font-bold tracking-wider text-white uppercase">
        Después
      </span>
    </div>
  )
}

export default function WorkComparisonCard({
  work,

  imageClassName,
  consultationHref,
}: WorkComparisonCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-sky-100 bg-white shadow-lg shadow-sky-950/5">
      <div className="relative">
        <BeforeAfterSlider work={work} imageClassName={imageClassName} />
        <span className="pointer-events-none absolute top-3 left-3 z-10 rounded-full border border-white/60 bg-white/90 px-3 py-1.5 text-[10px] font-extrabold tracking-wide text-sky-950 shadow-sm">
          Imágenes ilustrativas
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="section-kicker">{work.category}</p>
        <h3 className="mt-2 text-xl font-extrabold tracking-tight text-sky-950">
          {work.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
          {work.description}
        </p>
        {consultationHref && (
          <a
            href={consultationHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Consultar por ${work.title} en WhatsApp`}
            className="mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-extrabold text-sky-700 transition hover:text-sky-950"
          >
            Consultar
            <Icon name="arrow" className="h-4 w-4" />
          </a>
        )}
      </div>
    </article>
  )
}
