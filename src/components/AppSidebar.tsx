
import { Home, Target, DollarSign, Users, Settings } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import TandemiLogo from "./TandemiLogo";
import LanguageToggle from "./LanguageToggle";
import { cn } from "@/lib/utils";

const AppSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const navigationItems = [
    {
      label: "Home",
      path: "/dashboard",
      icon: Home,
    },
    {
      label: "All Goals",
      path: "/dashboard",
      icon: Target,
    },
    {
      label: "Contributions",
      path: "/dashboard",
      icon: DollarSign,
    },
    {
      label: "Family",
      path: "/dashboard",
      icon: Users,
    },
    {
      label: "Settings",
      path: "/dashboard",
      icon: Settings,
    },
  ];

  return (
    <div className="hidden md:flex md:flex-col md:w-64 md:bg-white md:border-r md:border-gray-200 md:h-screen md:fixed md:left-0 md:top-0">
      {/* Logo and App Name */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <TandemiLogo size="sm" variant="icon" />
          <span className="text-xl font-bold text-black">Tandemi</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors",
                isActive
                  ? "bg-tandemi-soft-pink text-tandemi-pink font-medium"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Language Toggle */}
      <div className="p-4 border-t border-gray-200 flex justify-center">
        <LanguageToggle />
      </div>
    </div>
  );
};

export default AppSidebar;
