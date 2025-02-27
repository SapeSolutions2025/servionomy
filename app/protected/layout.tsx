"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, DollarSign, Scissors, Users, BarChart, Clock, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useTheme } from "@/contexts/ThemeContext"

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()

  const navItems = [
    { name: "Inicio", href: "/protected", icon: Home },
    { name: "Servicios", href: "/protected/servicios", icon: Scissors },
    { name: "Ventas", href: "/protected/ventas", icon: DollarSign },
    { name: "Empleados", href: "/protected/empleados", icon: Users },
    { name: "Gráficos", href: "/protected/graficos", icon: BarChart },
    { name: "Historial", href: "/protected/historial", icon: Clock },
  ]

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar>
          <SidebarHeader>
            <Link href="/protected" className="flex items-center">
              <span className="text-2xl font-bold text-primary">PelucApp</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link href={item.href}>
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.name}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="w-full justify-start px-2">
              {theme === "light" ? <Moon className="mr-2 h-4 w-4" /> : <Sun className="mr-2 h-4 w-4" />}
              {theme === "light" ? "Modo oscuro" : "Modo claro"}
            </Button>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 flex flex-col">
          <header className="border-b">
            <div className="flex h-16 items-center px-4">
              <SidebarTrigger />
            </div>
          </header>
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

