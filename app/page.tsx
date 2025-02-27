import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Bienvenido a PelucApp</CardTitle>
          <CardDescription>Gestión financiera para peluquerías</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <Link href="/sign-in" passHref>
            <Button className="w-full transition-all duration-200 hover:scale-105">Iniciar Sesión</Button>
          </Link>
          <Link href="/sign-up" passHref>
            <Button variant="outline" className="w-full transition-all duration-200 hover:scale-105">
              Registrarse
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

