
import { useEffect, useState } from "react";
import AppSidebar from "./AppSidebar";

interface ResponsiveLayoutProps {
  children: React.ReactNode;
}

const ResponsiveLayout = ({ children }: ResponsiveLayoutProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  if (isMobile) {
    // Return mobile layout as-is
    return <>{children}</>;
  }

  // Desktop layout with sidebar
  return (
    <div className="flex h-screen bg-tandemi-light-gray">
      <AppSidebar />
      <div className="flex-1 md:ml-64 overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default ResponsiveLayout;
