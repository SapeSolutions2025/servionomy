import ClientLayout from '@/components/client-layout'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import type React from 'react'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PeluApp',
  description: 'Gestión financiera para peluquerías',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className} suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
