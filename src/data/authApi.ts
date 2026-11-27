import { API_BASE_URL } from "./api"

export interface CustomerUser {
  id: number
  name: string
  email: string
  rol: string
}

interface CustomerSession {
  user: CustomerUser
  token: string
}

const SESSION_KEY = "sol-de-america.customer-session"

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

function isCustomerSession(value: unknown): value is CustomerSession {
  if (!isRecord(value) || !isRecord(value.user)) return false

  return (
    typeof value.token === "string" &&
    value.token.length > 0 &&
    Number.isInteger(value.user.id) &&
    typeof value.user.name === "string" &&
    typeof value.user.email === "string" &&
    typeof value.user.rol === "string"
  )
}

function getApiMessage(payload: unknown): string | undefined {
  if (!isRecord(payload)) return undefined

  if (isRecord(payload.errors)) {
    for (const errors of Object.values(payload.errors)) {
      if (Array.isArray(errors)) {
        const firstMessage = errors.find(
          (message): message is string => typeof message === "string",
        )
        if (firstMessage) return firstMessage
      }
    }
  }

  return typeof payload.message === "string" ? payload.message : undefined
}

async function authenticate(
  endpoint: "login" | "register",
  fields: Record<string, string>,
): Promise<CustomerUser> {
  const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fields),
  })

  let payload: unknown
  try {
    payload = await response.json()
  } catch {
    throw new Error("El servidor devolvió una respuesta que no se pudo leer.")
  }

  if (!response.ok) {
    throw new Error(
      getApiMessage(payload) ??
        `No se pudo completar la solicitud (HTTP ${response.status}).`,
    )
  }

  if (!isRecord(payload) || !isRecord(payload.data)) {
    throw new Error("La respuesta de autenticación no tiene el formato esperado.")
  }

  if (!isCustomerSession(payload.data)) {
    throw new Error("La API no devolvió una sesión válida.")
  }

  const { user, token } = payload.data
  if (user.rol.toLowerCase() !== "cliente") {
    throw new Error(
      "Este acceso es solo para clientes. Los administradores deben ingresar desde el panel.",
    )
  }

  const session: CustomerSession = {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      rol: user.rol,
    },
    token,
  }

  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
  } catch {
    throw new Error("No se pudo guardar la sesión en este navegador.")
  }

  return session.user
}

export function loginCustomer(
  email: string,
  password: string,
): Promise<CustomerUser> {
  return authenticate("login", { email, password })
}

export function registerCustomer(
  name: string,
  email: string,
  password: string,
): Promise<CustomerUser> {
  return authenticate("register", { name, email, password })
}

function readCustomerSession(): CustomerSession | null {
  const storedSession = sessionStorage.getItem(SESSION_KEY)
  if (!storedSession) return null

  try {
    const parsed: unknown = JSON.parse(storedSession)
    if (
      isCustomerSession(parsed) &&
      parsed.user.rol.toLowerCase() === "cliente"
    ) {
      return parsed
    }
  } catch {
    sessionStorage.removeItem(SESSION_KEY)
    return null
  }

  sessionStorage.removeItem(SESSION_KEY)
  return null
}

export function getCustomerSessionUser(): CustomerUser | null {
  return readCustomerSession()?.user ?? null
}

export function getCustomerAccessToken(): string | null {
  return readCustomerSession()?.token ?? null
}

export function logoutCustomer() {
  sessionStorage.removeItem(SESSION_KEY)
}
