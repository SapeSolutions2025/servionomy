import Link from "next/link"
import { Scissors, DollarSign, Users, BarChart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Home() {
  // Estos datos deberían venir de una API en una aplicación real
  const ingresos = 5000
  const egresos = 3000
  const balance = ingresos - egresos
  const cajaAbierta = true // Esto debería ser un estado real obtenido de la API

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-foreground">Bienvenido a PelucApp</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Estado de la Caja</CardTitle>
          <CardDescription>{cajaAbierta ? "La caja está abierta" : "La caja está cerrada"}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium">Ingresos</p>
              <p className="text-2xl font-bold">${ingresos}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Egresos</p>
              <p className="text-2xl font-bold">${egresos}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Balance</p>
              <p className="text-2xl font-bold">${balance}</p>
            </div>
          </div>
          <Button className="mt-4" asChild>
            <Link href={cajaAbierta ? "/protected/ventas" : "/protected/caja/abrir"}>
              {cajaAbierta ? "Registrar venta" : "Abrir caja"}
            </Link>
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link
          href="/protected/servicios"
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center"
        >
          <Scissors className="mr-2" />
          Gestionar Servicios
        </Link>
        <Link
          href="/protected/ventas"
          className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold py-4 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center"
        >
          <DollarSign className="mr-2" />
          Registrar Ventas
        </Link>
        <Link
          href="/protected/empleados"
          className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-4 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center"
        >
          <Users className="mr-2" />
          Gestionar Empleados
        </Link>
        <Link
          href="/protected/graficos"
          className="bg-muted hover:bg-muted/90 text-muted-foreground font-bold py-4 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center"
        >
          <BarChart className="mr-2" />
          Ver Gráficos
        </Link>
      </div>
    </div>
  )
}

