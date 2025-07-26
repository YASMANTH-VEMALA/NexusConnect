import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { Button } from '@/components/ui/button';
import { PanelLeft } from 'lucide-react';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
         <div className="p-4 md:p-6 lg:p-8">
            <div className="md:hidden mb-4">
              <SidebarTrigger asChild>
                <Button variant="outline" size="icon">
                  <PanelLeft />
                </Button>
              </SidebarTrigger>
            </div>
            {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
