import { FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router"
import AccountShell from "../components/AccountShell"
import Icon from "../components/Icon"
import { loginCustomer } from "../data/authApi"

type LoginErrors = Partial<Record<"email" | "password", string>>

const inputClass =
  "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"

export default function IniciarSesion() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<LoginErrors>({})
  const [notice, setNotice] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors: LoginErrors = {}

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = "Ingresá un correo electrónico válido."
    }
    if (!password) {
      nextErrors.password = "Ingresá tu contraseña."
    }

    setErrors(nextErrors)
    setNotice("")
    if (Object.keys(nextErrors).length > 0) return

    setIsSubmitting(true)
    try {
      await loginCustomer(email.trim(), password)
      navigate("/", { replace: true })
    } catch (error) {
      setNotice(
        error instanceof Error
          ? error.message
          : "No pudimos iniciar sesión. Intentá nuevamente.",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AccountShell
      eyebrow="Acceso a tu cuenta"
      title="Qué bueno tenerte de vuelta."
      description="Ingresá con el correo y la contraseña de tu cuenta de cliente."
    >
      <div>
        <p className="text-xs font-extrabold tracking-[0.16em] text-sky-500 uppercase">
          Iniciar sesión
        </p>
        <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-sky-950">
          Accedé a tu cuenta
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          Usá los datos que registraste en Sol de América.
        </p>
      </div>

      {notice && (
        <p
          className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900"
          role="alert"
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
              setNotice("")
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
                setNotice("")
              }}
              className={`${inputClass} pr-20 ${
                errors.password ? "border-red-400 focus:border-red-400" : ""
              }`}
              placeholder="Tu contraseña"
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

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() =>
              setNotice(
                "La recuperación de contraseña todavía no está habilitada. Contactá al local para restablecerla.",
              )
            }
            className="text-xs font-bold text-sky-700 hover:text-sky-950"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-sky-950 px-6 text-sm font-bold text-white transition hover:bg-sky-700 focus:ring-4 focus:ring-sky-200 focus:outline-none disabled:cursor-wait disabled:opacity-60"
        >
          {isSubmitting ? "Ingresando..." : "Iniciar sesión"}
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
