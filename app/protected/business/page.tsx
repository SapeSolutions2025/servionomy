'use client'

import CreateBusinessModal from '@/components/business/create-business-modal'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Plus, Users } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function Business() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  // En una aplicación real, estos datos vendrían de una base de datos
  const businesses = [
    {
      id: '1',
      name: 'Mi Primer Negocio',
      description: 'Tienda de ropa online',
      members: 3,
      createdAt: '2023-10-15',
    },
    {
      id: '2',
      name: 'Consultora ABC',
      description: 'Servicios de consultoría empresarial',
      members: 5,
      createdAt: '2024-01-20',
    },
  ]

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mis Negocios</h1>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Negocio
        </Button>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {businesses.map((business) => (
          <Card key={business.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{business.name}</CardTitle>
              <CardDescription>{business.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="mr-2 h-4 w-4" />
                <span>{business.members} miembros</span>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                Creado el {new Date(business.createdAt).toLocaleDateString()}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href={`/protected/business/${business.id}`}>
                  Gestionar
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <CreateBusinessModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </>
  )
}
