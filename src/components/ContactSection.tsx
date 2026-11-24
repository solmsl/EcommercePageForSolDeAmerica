import type { FormEventHandler } from "react"
import Icon from "./Icon"

export default function ContactSection({
  onSubmit,
}: {
  onSubmit: FormEventHandler<HTMLFormElement>
}) {
  return (
    <section
      id="contacto"
      className="scroll-mt-20 bg-sky-50 px-5 pt-14 pb-8 lg:px-8 lg:pt-20 lg:pb-9"
    >
      <p className="text-[#082f49] text-[clamp(2.25rem,5vw,4rem)] font-extrabold tracking-[-0.055em] leading-[1.02] mb-8 text-center">
        Contacto
      </p>
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-sky-950/5 lg:grid-cols-2">
        <div className="bg-sky-950 p-8 text-white sm:p-12 lg:p-16">
          {/* <p className="text-xs font-bold tracking-[0.2em] text-sky-950 uppercase">
              Contacto
            </p> */}
          <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] text-center lg:text-left sm:text-5xl">
            ¿En qué podemos ayudarte?
          </h2>
          <p className="mt-5 max-w-md text-sm leading-7 text-sky-50 text-center lg:text-left">
            Contanos qué necesitás. Al enviar el formulario se abrirá WhatsApp
            con tu consulta lista para enviar.
          </p>
          <div className="mt-10 space-y-6">
            <div className="flex gap-4">
              <Icon name="map" className="mt-0.5 h-5 w-5 text-sky-50" />
              <div>
                <p className="font-bold">Nuestro local</p>
                <p className="mt-1 text-sm text-sky-50 font-bold">
                  Calle 115 1736 Berazategui Oeste, Buenos Aires
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Icon name="clock" className="mt-0.5 h-5 w-5 text-sky-50" />
              <div>
                <p className="font-bold">Horarios</p>
                <p className="mt-1 text-sm text-sky-50 font-bold">
                  Lun a Vie de 9:00–13:30 y de 17:00-20:30
                </p>
                <p className="mt-1 text-sm text-sky-50 font-bold">
                  Sáb 10:00–14:00 y de 17:00-20:00.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Icon name="phone" className="mt-0.5 h-5 w-5 text-sky-50" />
              <div>
                <p className="font-bold">WhatsApp</p>
                <p className="mt-1 text-sm text-sky-50 font-bold">
                  +54 9 11 2192-8109
                </p>
              </div>
            </div>
          </div>
        </div>
        <form onSubmit={onSubmit} className="p-8 sm:p-12 lg:p-16">
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
                <option>Carteras y mochilas</option>
                <option>Duplicado de llaves</option>
                <option>Cerrajería</option>
                <option>Cerrajería del automotor</option>
                <option>Impresiones y copias</option>
                <option>Carga de SUBE</option>
                <option>Consulta por un producto</option>
                <option>Trabajos en General</option>
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
              <Icon
                name="whatsapp"
                className="h-5 w-5 fill-current stroke-none"
              />
              Enviar por WhatsApp
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
