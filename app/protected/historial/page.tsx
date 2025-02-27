import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function Historial() {
  // Este es un ejemplo de datos. En una aplicación real, estos datos vendrían de una API.
  const historialCajas = [
    { id: 1, fecha: "2023-03-01", ingresos: 5000, egresos: 3000, balance: 2000 },
    { id: 2, fecha: "2023-03-02", ingresos: 4500, egresos: 2800, balance: 1700 },
    { id: 3, fecha: "2023-03-03", ingresos: 6000, egresos: 3500, balance: 2500 },
  ]

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-foreground">Historial de Cajas</h1>

      <Card>
        <CardHeader>
          <CardTitle>Registro de Cajas</CardTitle>
          <CardDescription>Historial de aperturas y cierres de caja</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Ingresos</TableHead>
                <TableHead>Egresos</TableHead>
                <TableHead>Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {historialCajas.map((caja) => (
                <TableRow key={caja.id}>
                  <TableCell>{caja.fecha}</TableCell>
                  <TableCell>${caja.ingresos}</TableCell>
                  <TableCell>${caja.egresos}</TableCell>
                  <TableCell>${caja.balance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

