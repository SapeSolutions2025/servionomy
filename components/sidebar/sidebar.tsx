'use client'

import {
  BarChart2,
  CreditCard,
  HelpCircle,
  Home,
  Package,
  Receipt,
  Settings,
  ShoppingCart,
  Store,
  Users2,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { TeamSwitcher } from './team-switcher'

const navigationItems = [
  { name: 'Inicio', href: '/protected', icon: Home },
  { name: 'Caja', href: '/protected/caja', icon: CreditCard },
  { name: 'Servicios', href: '/protected/servicios', icon: Store },
  { name: 'Ventas', href: '/protected/ventas', icon: Receipt },
  { name: 'Empleados', href: '/protected/empleados', icon: Users2 },
  { name: 'Insumos', href: '/protected/insumos', icon: Package },
  { name: 'Compras', href: '/protected/compras', icon: ShoppingCart },
  { name: 'Gráficos', href: '/protected/graficos', icon: BarChart2 },
]

const bottomNavigation = [
  { name: 'Configuración', href: '/protected/configuracion', icon: Settings },
  { name: 'Ayuda', href: '/protected/ayuda', icon: HelpCircle },
]

function SectionContent() {
  const pathname = usePathname()
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu className="gap-4">
            {navigationItems.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild tooltip={item.name}>
                  <Link
                    href={item.href}
                    prefetch={true}
                    className={cn(
                      pathname === item.href &&
                        'bg-accent text-accent-foreground',
                    )}
                  >
                    <item.icon />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  )
}

function FooterSection() {
  return (
    <SidebarMenu className="gap-4">
      {bottomNavigation.map((item) => (
        <SidebarMenuItem key={item.name}>
          <SidebarMenuButton asChild tooltip={item.name}>
            <Link href={item.href} prefetch={true}>
              <item.icon />
              <span>{item.name}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher
          teams={[{ name: 'PeluApp', logo: Store, plan: 'Gratis' }]}
        />
      </SidebarHeader>
      <SectionContent />
      <SidebarFooter>
        <FooterSection />
      </SidebarFooter>
    </Sidebar>
  )
}
