import { FormEvent, useState } from "react"
import { Link } from "react-router"
import AccountShell from "../components/AccountShell"
import Icon from "../components/Icon"

type LoginErrors = Partial<Record<"email" | "password", string>>

const inputClass =
  "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"

export default function IniciarSesion() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<LoginErrors>({})
  const [notice, setNotice] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors: LoginErrors = {}

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = "Ingresá un correo electrónico válido."
    }
    if (password.length < 8) {
      nextErrors.password = "La contraseña debe tener al menos 8 caracteres."
    }

    setErrors(nextErrors)
    setNotice("")
    setSubmitted(Object.keys(nextErrors).length === 0)
  }

  return (
    <AccountShell
      eyebrow="Acceso a tu cuenta"
      title="Qué bueno tenerte de vuelta."
      description="Ingresá tus datos para continuar. Esta es una experiencia demostrativa: la información se valida únicamente en tu navegador."
    >
      <div>
        <p className="text-xs font-extrabold tracking-[0.16em] text-sky-500 uppercase">
          Iniciar sesión
        </p>
        <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-sky-950">
          Accedé a tu cuenta
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          Completá los campos para validar el acceso.
        </p>
      </div>

      {submitted && (
        <div
          className="mt-6 flex gap-3 rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sm text-sky-950"
          role="status"
        >
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-sky-500 text-white">
            <Icon name="check" className="h-4 w-4" />
          </span>
          <span>
            <strong className="block">Datos validados correctamente.</strong>
            <span className="mt-1 block text-slate-600">
              El acceso real estará disponible cuando se conecte el sistema de
              cuentas.
            </span>
          </span>
        </div>
      )}

      {notice && (
        <p
          className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900"
          role="status"
        >
          {notice}
        </p>
      )}

      <form className="mt-7 space-y-5" onSubmit={handleSubmit} noValidate>
        <label className="block text-xs font-bold text-slate-700">
          Correo electrónico
          <input
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
              setErrors((current) => ({ ...current, email: undefined }))
              setSubmitted(false)
            }}
            className={`${inputClass} mt-2 ${
              errors.email ? "border-red-400 focus:border-red-400" : ""
            }`}
            placeholder="nombre@correo.com"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "login-email-error" : undefined}
          />
          {errors.email && (
            <span
              id="login-email-error"
              className="mt-2 block text-xs font-semibold text-red-600"
            >
              {errors.email}
            </span>
          )}
        </label>

        <label className="block text-xs font-bold text-slate-700">
          Contraseña
          <span className="relative mt-2 block">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => {
                setPassword(event.target.value)
                setErrors((current) => ({ ...current, password: undefined }))
                setSubmitted(false)
              }}
              className={`${inputClass} pr-20 ${
                errors.password ? "border-red-400 focus:border-red-400" : ""
              }`}
              placeholder="Mínimo 8 caracteres"
              autoComplete="current-password"
              aria-invalid={Boolean(errors.password)}
              aria-describedby={
                errors.password ? "login-password-error" : undefined
              }
            />
            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              className="absolute top-1/2 right-4 -translate-y-1/2 text-xs font-bold text-sky-700 hover:text-sky-950"
              aria-label={
                showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
              }
            >
              {showPassword ? "Ocultar" : "Mostrar"}
            </button>
          </span>
          {errors.password && (
            <span
              id="login-password-error"
              className="mt-2 block text-xs font-semibold text-red-600"
            >
              {errors.password}
            </span>
          )}
        </label>

        <div className="flex items-center justify-between gap-4">
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-600">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 accent-sky-600"
            />
            Recordarme
          </label>
          <button
            type="button"
            onClick={() =>
              setNotice(
                "La recuperación de contraseña estará disponible cuando se conecte el sistema de cuentas.",
              )
            }
            className="text-xs font-bold text-sky-700 hover:text-sky-950"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        <button
          type="submit"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-sky-950 px-6 text-sm font-bold text-white transition hover:bg-sky-700 focus:ring-4 focus:ring-sky-200 focus:outline-none"
        >
          Iniciar sesión
          <Icon name="arrow" className="h-4 w-4" />
        </button>
      </form>

      <p className="mt-7 text-center text-sm text-slate-600">
        ¿Todavía no tenés una cuenta?{" "}
        <Link
          to="/registro"
          className="font-extrabold text-sky-700 hover:text-sky-950"
        >
          Registrate
        </Link>
      </p>
    </AccountShell>
  )
}
