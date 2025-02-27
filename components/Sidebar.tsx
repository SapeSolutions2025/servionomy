"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useTheme } from "@/contexts/ThemeContext"
import { Menu, Sun, Moon } from "lucide-react"

const sidebarItems = [
  { name: "Inicio", href: "/protected" },
  { name: "Caja", href: "/protected/caja" },
  { name: "Servicios", href: "/protected/servicios" },
  { name: "Ventas", href: "/protected/ventas" },
  { name: "Empleados", href: "/protected/empleados" },
  { name: "Insumos", href: "/protected/insumos" },
  { name: "Compras", href: "/protected/compras" },
  { name: "Gráficos", href: "/protected/graficos" },
]

export function Sidebar() {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64">
        <ScrollArea className="h-full">
          <div className="space-y-4 py-4">
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">PelucApp</h2>
              <div className="space-y-1">
                {sidebarItems.map((item) => (
                  <Button
                    key={item.href}
                    variant={pathname === item.href ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href={item.href}>{item.name}</Link>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
        <div className="absolute bottom-4 left-4">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "light" ? <Moon className="h-6 w-6" /> : <Sun className="h-6 w-6" />}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export function SidebarDesktop() {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="hidden border-r bg-background md:block">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">PelucApp</h2>
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? "secondary" : "ghost"}
                className="w-full justify-start"
                asChild
              >
                <Link href={item.href}>{item.name}</Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 left-4">
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === "light" ? <Moon className="h-6 w-6" /> : <Sun className="h-6 w-6" />}
        </Button>
      </div>
    </div>
  )
}

