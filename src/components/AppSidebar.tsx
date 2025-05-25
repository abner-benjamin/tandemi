
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Home, Target, DollarSign, Users, Settings } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import TandemiLogo from "./TandemiLogo";
import LanguageToggle from "./LanguageToggle";

const AppSidebar = () => {
  const { t } = useLanguage();
  const location = useLocation();

  const navigationItems = [
    {
      path: "/dashboard",
      icon: Home,
      labelKey: "nav.dashboard",
      label: "Dashboard"
    },
    {
      path: "/goals",
      icon: Target,
      labelKey: "nav.all_goals",
      label: "All Goals"
    },
    {
      path: "/contributions",
      icon: DollarSign,
      labelKey: "nav.contributions",
      label: "Contributions"
    },
    {
      path: "/family",
      icon: Users,
      labelKey: "nav.family",
      label: "Family"
    },
    {
      path: "/settings",
      icon: Settings,
      labelKey: "nav.settings",
      label: "Settings"
    }
  ];

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-white border-r border-tandemi-soft-gray">
      {/* Logo Section */}
      <div className="flex items-center p-6 border-b border-tandemi-soft-gray">
        <TandemiLogo size="sm" />
        <span className="ml-3 text-xl font-bold text-tandemi-dark">Tandemi</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? "bg-tandemi-pink text-white"
                  : "text-tandemi-neutral-gray hover:bg-tandemi-soft-pink hover:text-tandemi-pink"
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {t(item.labelKey) || item.label}
            </NavLink>
          );
        })}
      </nav>

      {/* Language Toggle */}
      <div className="p-4 border-t border-tandemi-soft-gray">
        <LanguageToggle />
      </div>
    </div>
  );
};

export default AppSidebar;
