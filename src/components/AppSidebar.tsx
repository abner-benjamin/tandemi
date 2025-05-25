
import { Home, Target, DollarSign, Users, Settings } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import LanguageToggle from "./LanguageToggle";

const AppSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const menuItems = [
    { title: "Home", icon: Home, url: "/dashboard" },
    { title: "All Goals", icon: Target, url: "/dashboard" },
    { title: "Contributions", icon: DollarSign, url: "/dashboard" },
    { title: "Family", icon: Users, url: "/dashboard" },
    { title: "Settings", icon: Settings, url: "/dashboard" },
  ];

  return (
    <Sidebar className="border-r">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => navigate(item.url)}
                    isActive={location.pathname === item.url}
                    className="w-full justify-start"
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="w-fit">
          <LanguageToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
