import { AppSidebar } from '@/components/sidebar/sidebar'
import { TopNav } from '@/components/sidebar/top-nav'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { TooltipProvider } from '@/components/ui/tooltip'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <TooltipProvider delayDuration={0}>
      <div className="min-h-screen flex">
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <SidebarInset>
              <TopNav />
              <div className="flex-grow">
                <div className="container mx-auto p-6">{children}</div>
              </div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </div>
    </TooltipProvider>
  )
}
