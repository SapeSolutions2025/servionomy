'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import { ThemeToggle } from '../theme-toggle'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '../ui/breadcrumb'
import { Separator } from '../ui/separator'
import { Notifications } from './notifications'
import { signOutAction } from '@/actions/actions'

export function TopNav() {
  const pathname = usePathname()
  const pathSegments =
    pathname === '/protected'
      ? []
      : pathname.split('/protected/').filter(Boolean)

  console.log(pathSegments)

  // User settings - in a real app, this would come from a context or API
  const settings = {
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '',
  }

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/protected">Home</BreadcrumbLink>
              </BreadcrumbItem>
              {!!pathSegments.length && (
                <BreadcrumbSeparator className="hidden md:block" />
              )}
              {pathSegments.map((segment, index) => (
                <React.Fragment key={segment}>
                  <BreadcrumbItem>
                    <BreadcrumbLink href={`/protected/${segment}`}>
                      {segment}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {index < pathSegments.length - 1 && <BreadcrumbSeparator />}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex items-center gap-4">
          <Notifications />
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={settings.avatar} alt={settings.fullName} />
                  <AvatarFallback>
                    {settings.fullName
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {settings.fullName}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {settings.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/protected/perfil">Perfil</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/protected/configuracion">Configuración</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={signOutAction}>
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
