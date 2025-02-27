"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Transaction {
  id: string
  date: Date
  amount: number
  type: "VENTA" | "COMPRA"
  description: string
}

interface Caja {
  id: string
  fechaApertura: Date
  fechaCierre: Date | null
  saldoInicial: number
  saldoFinal: number | null
  transactions: Transaction[]
}

export default function CajaDiaria() {
  const [cajaActual, setCajaActual] = useState<Caja | null>(null)
  const [saldoInicial, setSaldoInicial] = useState("")
  const router = useRouter()

  useEffect(() => {
    // Aquí cargaríamos la caja actual desde la API si existe
    const fetchCajaActual = async () => {
      try {
        const response = await fetch("/api/caja/actual")
        if (response.ok) {
          const data = await response.json()
          setCajaActual(data)
        }
      } catch (error) {
        console.error("Error al cargar la caja actual:", error)
      }
    }
    fetchCajaActual()
  }, [])

  const abrirCaja = async () => {
    if (saldoInicial === "") return
    try {
      const response = await fetch("/api/caja/abrir", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ saldoInicial: Number.parseFloat(saldoInicial) }),
      })
      if (response.ok) {
        const nuevaCaja = await response.json()
        setCajaActual(nuevaCaja)
        setSaldoInicial("")
      }
    } catch (error) {
      console.error("Error al abrir la caja:", error)
    }
  }

  const cerrarCaja = async () => {
    if (!cajaActual) return
    try {
      const response = await fetch(`/api/caja/${cajaActual.id}/cerrar`, {
        method: "POST",
      })
      if (response.ok) {
        const cajaCerrada = await response.json()
        setCajaActual(cajaCerrada)
        setTimeout(() => {
          setCajaActual(null)
          router.push("/") // Redirigir al inicio después de cerrar la caja
        }, 3000)
      }
    } catch (error) {
      console.error("Error al cerrar la caja:", error)
    }
  }

  if (!cajaActual) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Caja Diaria</h1>
          <Card>
            <CardHeader>
              <CardTitle>Abrir Caja</CardTitle>
              <CardDescription>Ingrese el saldo inicial para abrir la caja del día</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  placeholder="Saldo inicial"
                  value={saldoInicial}
                  onChange={(e) => setSaldoInicial(e.target.value)}
                />
                <Button onClick={abrirCaja}>Abrir Caja</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const saldoActual = cajaActual.transactions.reduce((acc, trans) => {
    return trans.type === "VENTA" ? acc + trans.amount : acc - trans.amount
  }, cajaActual.saldoInicial)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Caja Diaria</h1>
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Caja Actual</CardTitle>
            <CardDescription>Abierta el {new Date(cajaActual.fechaApertura).toLocaleString()}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Saldo inicial: ${cajaActual.saldoInicial.toFixed(2)}</p>
            <p>Saldo actual: ${saldoActual.toFixed(2)}</p>
          </CardContent>
        </Card>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead className="text-right">Monto</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cajaActual.transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{new Date(transaction.date).toLocaleString()}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.type === "VENTA" ? "Ingreso" : "Egreso"}</TableCell>
                <TableCell className="text-right">${transaction.amount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Button onClick={cerrarCaja} className="mt-4">
          Cerrar Caja
        </Button>
      </div>
    </div>
  )
}

