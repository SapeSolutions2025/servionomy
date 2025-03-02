"use server"

interface BusinessData {
  name: string
  description: string
}

interface InviteData {
  businessId: string
  contact: string
  role: string
  method: "email" | "whatsapp"
}

// Función para generar un código de invitación aleatorio
function generateInviteCode(): string {
  return Math.random().toString(36).substring(2, 10).toUpperCase()
}

// Acción del servidor para crear un nuevo negocio
export async function createBusiness(data: BusinessData) {
  // Simulamos un retraso para imitar una operación de base de datos
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // En una aplicación real, aquí guardaríamos los datos en una base de datos
  console.log("Creando negocio:", data)

  // Devolvemos un ID simulado
  return {
    id: Math.random().toString(36).substring(2, 9),
    ...data,
    createdAt: new Date().toISOString(),
  }
}

// Acción del servidor para invitar a un miembro del equipo
export async function inviteTeamMember(data: InviteData) {
  // Simulamos un retraso para imitar una operación de base de datos
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Generamos un código de invitación
  const code = generateInviteCode()

  // En una aplicación real, aquí enviaríamos un email o un mensaje de WhatsApp
  console.log(`Invitando a ${data.contact} como ${data.role} al negocio ${data.businessId} vía ${data.method}`)
  console.log(`Código de invitación: ${code}`)

  // Devolvemos el código generado
  return {
    success: true,
    code,
  }
}

