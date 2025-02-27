"use client"
import { useState, useEffect } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface Insumo {
  id: string
  nombre: string
  descripcion: string
  costo: number
}

export default function Insumos() {
  const [insumos, setInsumos] = useState<Insumo[]>([])
  const [nombre, setNombre] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [costo, setCosto] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)

  useEffect(() => {
    // Aquí cargaríamos los insumos desde la API
    const insumosEjemplo = [
      { id: "1", nombre: "Tinte para cabello", descripcion: "Tinte de alta calidad para coloración", costo: 50 },
      { id: "2", nombre: "Champú profesional", descripcion: "Champú para uso en peluquería", costo: 30 },
      { id: "3", nombre: "Alquiler local", descripcion: "Pago mensual del alquiler del local", costo: 1000 },
      { id: "4", nombre: "Luz", descripcion: "Factura mensual de electricidad", costo: 200 },
    ]
    setInsumos(insumosEjemplo)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      setInsumos(
        insumos.map((insumo) =>
          insumo.id === editingId ? { ...insumo, nombre, descripcion, costo: Number(costo) } : insumo,
        ),
      )
      setEditingId(null)
    } else {
      setInsumos([...insumos, { id: Date.now().toString(), nombre, descripcion, costo: Number(costo) }])
    }
    setNombre("")
    setDescripcion("")
    setCosto("")
  }

  const handleEdit = (insumo: Insumo) => {
    setNombre(insumo.nombre)
    setDescripcion(insumo.descripcion)
    setCosto(insumo.costo.toString())
    setEditingId(insumo.id)
  }

  const handleDelete = (id: string) => {
    setInsumos(insumos.filter((insumo) => insumo.id !== id))
  }

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = insumos.slice(indexOfFirstItem, indexOfLastItem)

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Gestión de Insumos</h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="mb-4">{editingId ? "Editar" : "Agregar"} Insumo</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingId ? "Editar" : "Agregar"} Insumo</DialogTitle>
              <DialogDescription>Ingrese los detalles del insumo aquí.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <Input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre del insumo" />
                <Textarea
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  placeholder="Descripción"
                />
                <Input type="number" value={costo} onChange={(e) => setCosto(e.target.value)} placeholder="Costo" />
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
              <TableHead>Descripción</TableHead>
              <TableHead>Costo</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((insumo) => (
              <TableRow key={insumo.id}>
                <TableCell>{insumo.nombre}</TableCell>
                <TableCell>{insumo.descripcion}</TableCell>
                <TableCell>${insumo.costo}</TableCell>
                <TableCell>
                  <Button variant="outline" className="mr-2" onClick={() => handleEdit(insumo)}>
                    Editar
                  </Button>
                  <Button variant="destructive" onClick={() => handleDelete(insumo.id)}>
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => paginate(currentPage - 1)} />
            </PaginationItem>
            {Array.from({ length: Math.ceil(insumos.length / itemsPerPage) }).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink onClick={() => paginate(index + 1)}>{index + 1}</PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext onClick={() => paginate(currentPage + 1)} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

