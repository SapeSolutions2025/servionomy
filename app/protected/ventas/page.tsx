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

interface Venta {
  id: string
  servicio: string
  empleado: string
  fecha: string
  monto: number
}

interface Caja {
  id: string
  fechaApertura: Date
}

export default function Ventas() {
  const [ventas, setVentas] = useState<Venta[]>([])
  const [servicio, setServicio] = useState("")
  const [empleado, setEmpleado] = useState("")
  const [monto, setMonto] = useState("")
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
      // Cargar ventas de la caja actual
      const fetchVentas = async () => {
        try {
          const response = await fetch(`/api/ventas?cajaId=${cajaAbierta.id}`)
          if (response.ok) {
            const data = await response.json()
            setVentas(data)
          }
        } catch (error) {
          console.error("Error al cargar las ventas:", error)
        }
      }
      fetchVentas()
    }
  }, [cajaAbierta])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!cajaAbierta) return

    const nuevaVenta = {
      servicio,
      empleado,
      monto: Number(monto),
      cajaId: cajaAbierta.id,
    }

    try {
      const response = await fetch("/api/ventas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaVenta),
      })

      if (response.ok) {
        const ventaCreada = await response.json()
        setVentas([ventaCreada, ...ventas])
        setServicio("")
        setEmpleado("")
        setMonto("")
      }
    } catch (error) {
      console.error("Error al crear la venta:", error)
    }
  }

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = ventas.slice(indexOfFirstItem, indexOfLastItem)

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  if (!cajaAbierta) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Registro de Ventas</h1>
          <p>No hay una caja abierta. Por favor, abra una caja antes de registrar ventas.</p>
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
        <h1 className="text-2xl font-bold mb-4">Registro de Ventas</h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="mb-4">Agregar Venta</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar Nueva Venta</DialogTitle>
              <DialogDescription>Ingrese los detalles de la nueva venta aquí.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <Select onValueChange={setServicio}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un servicio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corte">Corte de cabello</SelectItem>
                    <SelectItem value="tinte">Tinte</SelectItem>
                    <SelectItem value="peinado">Peinado</SelectItem>
                  </SelectContent>
                </Select>
                <Select onValueChange={setEmpleado}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un empleado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="juan">Juan Pérez</SelectItem>
                    <SelectItem value="maria">María García</SelectItem>
                    <SelectItem value="pedro">Pedro López</SelectItem>
                  </SelectContent>
                </Select>
                <Input type="number" value={monto} onChange={(e) => setMonto(e.target.value)} placeholder="Monto" />
              </div>
              <DialogFooter>
                <Button type="submit">Guardar Venta</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha</TableHead>
              <TableHead>Servicio</TableHead>
              <TableHead>Empleado</TableHead>
              <TableHead className="text-right">Monto</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((venta) => (
              <TableRow key={venta.id}>
                <TableCell>{venta.fecha}</TableCell>
                <TableCell>{venta.servicio}</TableCell>
                <TableCell>{venta.empleado}</TableCell>
                <TableCell className="text-right">${venta.monto.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => paginate(currentPage - 1)} />
            </PaginationItem>
            {Array.from({ length: Math.ceil(ventas.length / itemsPerPage) }).map((_, index) => (
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

