"use client"
import { useState, useEffect } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Empleado {
  id: string
  name: string
}

export default function Empleados() {
  const [empleados, setEmpleados] = useState<Empleado[]>([])
  const [nombre, setNombre] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    // Aquí cargaríamos los empleados desde la API
    setEmpleados([
      { id: "1", name: "Juan Pérez" },
      { id: "2", name: "María García" },
      { id: "3", name: "Pedro López" },
    ])
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      setEmpleados(empleados.map((emp) => (emp.id === editingId ? { ...emp, name: nombre } : emp)))
      setEditingId(null)
    } else {
      setEmpleados([...empleados, { id: Date.now().toString(), name: nombre }])
    }
    setNombre("")
  }

  const handleEdit = (empleado: Empleado) => {
    setNombre(empleado.name)
    setEditingId(empleado.id)
  }

  const handleDelete = (id: string) => {
    setEmpleados(empleados.filter((emp) => emp.id !== id))
  }

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-foreground dark:text-foreground-dark">Gestión de Empleados</h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="mb-4">{editingId ? "Editar" : "Agregar"} Empleado</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingId ? "Editar" : "Agregar"} Empleado</DialogTitle>
              <DialogDescription>Ingrese el nombre del empleado aquí.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <Input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Nombre del empleado"
                />
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
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {empleados.map((empleado) => (
              <TableRow key={empleado.id}>
                <TableCell>{empleado.name}</TableCell>
                <TableCell>
                  <Button variant="outline" className="mr-2" onClick={() => handleEdit(empleado)}>
                    Editar
                  </Button>
                  <Button variant="destructive" onClick={() => handleDelete(empleado.id)}>
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

