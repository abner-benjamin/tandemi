
import { ReactNode } from "react";
import AppSidebar from "./AppSidebar";

type ResponsiveLayoutProps = {
  children: ReactNode;
};

const ResponsiveLayout = ({ children }: ResponsiveLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-tandemi-light-gray">
      {/* Desktop Sidebar */}
      <AppSidebar />
      
      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {children}
      </div>
    </div>
  );
};

export default ResponsiveLayout;
