import { FormEvent, useMemo, useState } from "react"
import { Link, useNavigate } from "react-router"
import AccountShell from "../components/AccountShell"
import Icon from "../components/Icon"
import { registerCustomer } from "../data/authApi"

type RegisterErrors = Partial<Record<"name" | "email" | "password" | "confirmation" | "terms", string>>

const inputClass =
  "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"

export default function Registro() {
  const [password, setPassword] = useState("")
  const [confirmation, setConfirmation] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<RegisterErrors>({})
  const [notice, setNotice] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const passwordChecks = useMemo(
    () => [{ label: "6 caracteres", valid: password.length >= 6 }],
    [password],
  )

  const clearError = (field: keyof RegisterErrors) => {
    setErrors((current) => ({ ...current, [field]: undefined }))
    setNotice("")
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get("name") ?? "").trim()
    const email = String(data.get("email") ?? "").trim()
    const acceptedTerms = data.get("terms") === "on"
    const nextErrors: RegisterErrors = {}

    if (name.length < 2) {
      nextErrors.name = "Ingresá tu nombre."
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Ingresá un correo electrónico válido."
    }
    if (!passwordChecks.every((check) => check.valid)) {
      nextErrors.password = "La contraseña debe tener al menos 6 caracteres."
    }
    if (!confirmation || confirmation !== password) {
      nextErrors.confirmation = "Las contraseñas deben coincidir."
    }
    if (!acceptedTerms) {
      nextErrors.terms = "Debés aceptar los términos para continuar."
    }

    setErrors(nextErrors)
    setNotice("")
    if (Object.keys(nextErrors).length > 0) return

    setIsSubmitting(true)
    try {
      await registerCustomer(name, email, password)
      navigate("/", { replace: true })
    } catch (error) {
      setNotice(
        error instanceof Error
          ? error.message
          : "No pudimos crear la cuenta. Intentá nuevamente.",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AccountShell
      eyebrow="Crear una cuenta"
      title="Empezá tu experiencia con Sol de América."
      description="Registrate para crear tu cuenta de cliente en Sol de América."
    >
      <div>
        <p className="text-xs font-extrabold tracking-[0.16em] text-sky-500 uppercase">
          Registro
        </p>
        <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-sky-950">
          Creá tu cuenta
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          Solo te llevará unos minutos.
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

      <form className="mt-7 space-y-4" onSubmit={handleSubmit} noValidate>
        <label className="block text-xs font-bold text-slate-700">
          Nombre
          <input
            name="name"
            type="text"
            onChange={() => clearError("name")}
            className={`${inputClass} mt-2 ${
              errors.name ? "border-red-400 focus:border-red-400" : ""
            }`}
            placeholder="Tu nombre"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "register-name-error" : undefined}
          />
          {errors.name && (
            <span
              id="register-name-error"
              className="mt-2 block text-xs font-semibold text-red-600"
            >
              {errors.name}
            </span>
          )}
        </label>

        <label className="block text-xs font-bold text-slate-700">
          Correo electrónico
          <input
            name="email"
            type="email"
            onChange={() => clearError("email")}
            className={`${inputClass} mt-2 ${
              errors.email ? "border-red-400 focus:border-red-400" : ""
            }`}
            placeholder="nombre@correo.com"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "register-email-error" : undefined}
          />
          {errors.email && (
            <span
              id="register-email-error"
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
                clearError("password")
              }}
              className={`${inputClass} pr-20 ${
                errors.password ? "border-red-400 focus:border-red-400" : ""
              }`}
              placeholder="Creá una contraseña"
              autoComplete="new-password"
              aria-invalid={Boolean(errors.password)}
              aria-describedby={
                errors.password
                  ? "register-password-error"
                  : "password-requirements"
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
              id="register-password-error"
              className="mt-2 block text-xs font-semibold text-red-600"
            >
              {errors.password}
            </span>
          )}
        </label>

        <div
          id="password-requirements"
          className="flex flex-wrap gap-2"
          aria-label="Requisitos de contraseña"
        >
          {passwordChecks.map((check) => (
            <span
              key={check.label}
              className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                check.valid
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {check.valid ? "✓ " : ""}
              {check.label}
            </span>
          ))}
        </div>

        <label className="block text-xs font-bold text-slate-700">
          Confirmar contraseña
          <input
            type={showPassword ? "text" : "password"}
            value={confirmation}
            onChange={(event) => {
              setConfirmation(event.target.value)
              clearError("confirmation")
            }}
            className={`${inputClass} mt-2 ${
              errors.confirmation ? "border-red-400 focus:border-red-400" : ""
            }`}
            placeholder="Repetí tu contraseña"
            autoComplete="new-password"
            aria-invalid={Boolean(errors.confirmation)}
            aria-describedby={
              errors.confirmation ? "register-confirmation-error" : undefined
            }
          />
          {errors.confirmation && (
            <span
              id="register-confirmation-error"
              className="mt-2 block text-xs font-semibold text-red-600"
            >
              {errors.confirmation}
            </span>
          )}
        </label>

        <label className="flex items-start gap-3 text-xs leading-5 font-semibold text-slate-600">
          <input
            name="terms"
            type="checkbox"
            onChange={() => clearError("terms")}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 accent-sky-600"
            aria-invalid={Boolean(errors.terms)}
          />
          <span>
            Acepto los términos y confirmo que los datos ingresados son
            correctos.
            {errors.terms && (
              <span className="mt-1 block font-semibold text-red-600">
                {errors.terms}
              </span>
            )}
          </span>
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-sky-950 px-6 text-sm font-bold text-white transition hover:bg-sky-700 focus:ring-4 focus:ring-sky-200 focus:outline-none disabled:cursor-wait disabled:opacity-60"
        >
          {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
          <Icon name="arrow" className="h-4 w-4" />
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        ¿Ya tenés una cuenta?{" "}
        <Link
          to="/iniciar-sesion"
          className="font-extrabold text-sky-700 hover:text-sky-950"
        >
          Iniciá sesión
        </Link>
      </p>
    </AccountShell>
  )
}
