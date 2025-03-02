"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Building, Users, Settings, Plus } from "lucide-react"
import InviteMemberModal from "@/components/business/invite-member-modal"

export default function BusinessDashboard({ params }: { params: { id: string } }) {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)

  // En una aplicación real, estos datos vendrían de una base de datos
  const business = {
    id: params.id,
    name: "Mi Primer Negocio",
    description: "Tienda de ropa online",
    members: 3,
    createdAt: "2023-10-15",
  }

  // En una aplicación real, estos datos vendrían de una base de datos
  const teamMembers = [
    {
      id: "1",
      name: "Ana García",
      email: "ana@example.com",
      role: "Administrador",
      joinedAt: "2023-11-10",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      name: "Carlos López",
      email: "carlos@example.com",
      role: "Editor",
      joinedAt: "2024-01-05",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      name: "María Rodríguez",
      email: "maria@example.com",
      role: "Visualizador",
      joinedAt: "2024-02-15",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{business.name}</h1>
          <p className="text-muted-foreground">{business.description}</p>
        </div>
        <Button onClick={() => setIsInviteModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Invitar Miembro
        </Button>
      </div>

      <Tabs defaultValue="overview" className="mt-6">
        <TabsList>
          <TabsTrigger value="overview">
            <Building className="mr-2 h-4 w-4" />
            Resumen
          </TabsTrigger>
          <TabsTrigger value="members">
            <Users className="mr-2 h-4 w-4" />
            Miembros
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="mr-2 h-4 w-4" />
            Configuración
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Miembros</CardTitle>
                <CardDescription>Total de miembros en el equipo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{business.members}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Fecha de Creación</CardTitle>
                <CardDescription>Cuando se creó este negocio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-xl">{new Date(business.createdAt).toLocaleDateString()}</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="members" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Miembros del Equipo</CardTitle>
                <CardDescription>{teamMembers.length} miembros en este negocio</CardDescription>
              </div>
              <Button size="sm" onClick={() => setIsInviteModalOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Invitar
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        {member.role}
                      </span>
                      <Button variant="ghost" size="sm">
                        Eliminar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuración del Negocio</CardTitle>
              <CardDescription>Actualiza la información de tu negocio</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Aquí irían los formularios para actualizar la información del negocio.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <InviteMemberModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        businessId={business.id}
      />
    </>
  )
}

