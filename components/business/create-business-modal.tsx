'use client'

import type React from 'react'

import { createBusiness } from '@/actions/business'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface CreateBusinessModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CreateBusinessModal({
  isOpen,
  onClose,
}: CreateBusinessModalProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const name = formData.get('name') as string
    const description = formData.get('description') as string

    try {
      // En una aplicación real, esto guardaría los datos en una base de datos
      const business = await createBusiness({ name, description })
      router.refresh()
      onClose()
      // Opcionalmente, redirigir al detalle del negocio recién creado
      // router.push(`/dashboard/business/${business.id}`);
    } catch (error) {
      console.error('Error al crear el negocio:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Negocio</DialogTitle>
          <DialogDescription>
            Completa la información para configurar tu nuevo negocio
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre del Negocio</Label>
              <Input
                id="name"
                name="name"
                placeholder="Ingresa el nombre de tu negocio"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe brevemente tu negocio"
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="logo">Logo (opcional)</Label>
              <Input id="logo" name="logo" type="file" accept="image/*" />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Creando...' : 'Crear Negocio'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
