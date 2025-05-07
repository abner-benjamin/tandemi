
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import SplashPage from "./pages/SplashPage";
import DashboardPage from "./pages/DashboardPage";
import CreateGoalPage from "./pages/CreateGoalPage";
import GoalDetailPage from "./pages/GoalDetailPage";
import ContributionPage from "./pages/ContributionPage";
import InviteFamilyPage from "./pages/InviteFamilyPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/splash" replace />} />
              <Route path="/index" element={<Index />} />
              <Route path="/splash" element={<SplashPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/create-goal" element={<CreateGoalPage />} />
              <Route path="/goal/:id" element={<GoalDetailPage />} />
              <Route path="/goal/:id/contribute" element={<ContributionPage />} />
              <Route path="/goal/:id/invite" element={<InviteFamilyPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
