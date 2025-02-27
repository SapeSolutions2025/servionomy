"use client"
import { useState, useEffect } from "react"
import type React from "react"
import { useRouter } from "next/navigation"
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Compra {
  id: string
  insumo: string
  cantidad: number
  costo: number
  fecha: string
}

interface Caja {
  id: string
  fechaApertura: Date
}

export default function Compras() {
  const [compras, setCompras] = useState<Compra[]>([])
  const [insumo, setInsumo] = useState("")
  const [cantidad, setCantidad] = useState("")
  const [costo, setCosto] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)
  const [cajaAbierta, setCajaAbierta] = useState<Caja | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchCajaAbierta = async () => {
      try {
        const response = await fetch("/api/caja/actual")
        if (response.ok) {
          const data = await response.json()
          setCajaAbierta(data)
        } else {
          setCajaAbierta(null)
        }
      } catch (error) {
        console.error("Error al verificar la caja abierta:", error)
        setCajaAbierta(null)
      }
    }

    fetchCajaAbierta()
  }, [])

  useEffect(() => {
    if (cajaAbierta) {
      // Cargar compras de la caja actual
      const fetchCompras = async () => {
        try {
          const response = await fetch(`/api/compras?cajaId=${cajaAbierta.id}`)
          if (response.ok) {
            const data = await response.json()
            setCompras(data)
          }
        } catch (error) {
          console.error("Error al cargar las compras:", error)
        }
      }
      fetchCompras()
    }
  }, [cajaAbierta])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!cajaAbierta) return

    const nuevaCompra = {
      insumo,
      cantidad: Number(cantidad),
      costo: Number(costo),
      cajaId: cajaAbierta.id,
    }

    try {
      const response = await fetch("/api/compras", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaCompra),
      })

      if (response.ok) {
        const compraCreada = await response.json()
        setCompras([compraCreada, ...compras])
        setInsumo("")
        setCantidad("")
        setCosto("")
      }
    } catch (error) {
      console.error("Error al crear la compra:", error)
    }
  }

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = compras.slice(indexOfFirstItem, indexOfLastItem)

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  if (!cajaAbierta) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Registro de Compras</h1>
          <p>No hay una caja abierta. Por favor, abra una caja antes de registrar compras.</p>
          <Button onClick={() => router.push("/caja")} className="mt-4">
            Ir a Caja
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Registro de Compras</h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="mb-4">Agregar Compra</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar Nueva Compra</DialogTitle>
              <DialogDescription>Ingrese los detalles de la nueva compra aquí.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <Select onValueChange={setInsumo}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un insumo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tinte">Tinte para cabello</SelectItem>
                    <SelectItem value="champu">Champú profesional</SelectItem>
                    <SelectItem value="toallas">Toallas</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                  placeholder="Cantidad"
                />
                <Input type="number" value={costo} onChange={(e) => setCosto(e.target.value)} placeholder="Costo" />
              </div>
              <DialogFooter>
                <Button type="submit">Guardar Compra</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha</TableHead>
              <TableHead>Insumo</TableHead>
              <TableHead>Cantidad</TableHead>
              <TableHead className="text-right">Costo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((compra) => (
              <TableRow key={compra.id}>
                <TableCell>{compra.fecha}</TableCell>
                <TableCell>{compra.insumo}</TableCell>
                <TableCell>{compra.cantidad}</TableCell>
                <TableCell className="text-right">${compra.costo.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => paginate(currentPage - 1)} />
            </PaginationItem>
            {Array.from({ length: Math.ceil(compras.length / itemsPerPage) }).map((_, index) => (
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

