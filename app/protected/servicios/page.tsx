"use client"
import type React from "react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Servicio {
  id: string
  name: string
  price: number
}

export default function Servicios() {
  const [servicios, setServicios] = useState<Servicio[]>([])
  const [nombre, setNombre] = useState("")
  const [precio, setPrecio] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    // Aquí cargaríamos los servicios desde la API
    setServicios([
      { id: "1", name: "Corte de cabello", price: 20 },
      { id: "2", name: "Tinte", price: 50 },
      { id: "3", name: "Peinado", price: 30 },
    ])
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      setServicios(servicios.map((s) => (s.id === editingId ? { ...s, name: nombre, price: Number(precio) } : s)))
      setEditingId(null)
    } else {
      setServicios([...servicios, { id: Date.now().toString(), name: nombre, price: Number(precio) }])
    }
    setNombre("")
    setPrecio("")
  }

  const handleEdit = (servicio: Servicio) => {
    setNombre(servicio.name)
    setPrecio(servicio.price.toString())
    setEditingId(servicio.id)
  }

  const handleDelete = (id: string) => {
    setServicios(servicios.filter((s) => s.id !== id))
  }

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-foreground dark:text-foreground-dark">Gestión de Servicios</h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="mb-4">{editingId ? "Editar" : "Agregar"} Servicio</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingId ? "Editar" : "Agregar"} Servicio</DialogTitle>
              <DialogDescription>Ingrese los detalles del servicio aquí.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <Input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Nombre del servicio"
                />
                <Input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} placeholder="Precio" />
              </div>
              <DialogFooter>
                <Button type="submit">Guardar</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {servicios.map((servicio) => (
              <TableRow key={servicio.id}>
                <TableCell>{servicio.name}</TableCell>
                <TableCell>${servicio.price}</TableCell>
                <TableCell>
                  <Button variant="outline" className="mr-2" onClick={() => handleEdit(servicio)}>
                    Editar
                  </Button>
                  <Button variant="destructive" onClick={() => handleDelete(servicio.id)}>
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

