
import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";

interface ResponsiveLayoutProps {
  children: ReactNode;
}

const ResponsiveLayout = ({ children }: ResponsiveLayoutProps) => {
  return (
    <>
      {/* Mobile Layout - hidden on desktop */}
      <div className="block md:hidden">
        {children}
      </div>
      
      {/* Desktop Layout - hidden on mobile */}
      <div className="hidden md:block">
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <main className="flex-1 overflow-auto">
              {children}
            </main>
          </div>
        </SidebarProvider>
      </div>
    </>
  );
};

export default ResponsiveLayout;
