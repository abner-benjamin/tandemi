
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import TandemiLogo from "../components/TandemiLogo";
import GoalCard from "../components/GoalCard";
import LanguageToggle from "../components/LanguageToggle";
import FamilyContributionsChart from "../components/FamilyContributionsChart";
import ResponsiveLayout from "../components/ResponsiveLayout";
import DesktopDashboard from "../components/DesktopDashboard";
import { Button } from "@/components/ui/button";

// Sample data for the goals (fallback if sessionStorage is empty)
const sampleGoals = [
  {
    id: "1",
    name: "Abuelita's Surgery Fund",
    category: "Medical",
    amount: 2500,
    progress: 1150,
    dueDate: new Date("2025-12-31").toISOString(),
    description: "Fund for grandmother's knee surgery in Mexico City",
  },
  {
    id: "2",
    name: "Spring Tuition for Sofia",
    category: "Education",
    amount: 1800,
    progress: 1125,
    dueDate: new Date("2025-09-01").toISOString(),
    description: "College tuition payment for Sofia's spring semester",
  },
  {
    id: "3",
    name: "House Repair in Puebla",
    category: "Housing",
    amount: 3000,
    progress: 1160,
    dueDate: new Date("2025-11-15").toISOString(),
    description: "Roof repairs and painting for the family home in Puebla",
  }
];

const DashboardPage = () => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Override the user name with "Alex"
  const userName = "Alex";
  
  // Get goals from sessionStorage
  const [goals, setGoals] = useState(() => {
    const storedGoals = sessionStorage.getItem('userGoals');
    if (storedGoals) {
      return JSON.parse(storedGoals);
    }
    return sampleGoals;
  });
  
  useEffect(() => {
    const handleStorageChange = () => {
      const storedGoals = sessionStorage.getItem('userGoals');
      if (storedGoals) {
        setGoals(JSON.parse(storedGoals));
      } else {
        sessionStorage.setItem('userGoals', JSON.stringify(sampleGoals));
        setGoals(sampleGoals);
      }
    };
    
    handleStorageChange();
    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(handleStorageChange, 1000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {/* Mobile Layout */}
      <div className="md:hidden min-h-screen bg-tandemi-light-gray animate-fade-in max-w-lg mx-auto relative pb-24">
        <div className="p-4 flex justify-between items-center">
          <TandemiLogo size="sm" />
          <div className="flex items-center gap-2">
            <LanguageToggle />
          </div>
        </div>
        
        <div className="p-4">
          <h1 className="text-2xl font-bold">
            {language === "es" ? `¡${t("dashboard.welcome")}, ${userName}!` : `${t("dashboard.welcome")}, ${userName}!`}
          </h1>
          
          <FamilyContributionsChart />
          
          <h2 className="font-semibold text-lg mb-4">{t("dashboard.your_goals")}</h2>
          
          <div className="space-y-3">
            {goals && goals.length > 0 ? (
              goals.map((goal) => (
                <GoalCard 
                  key={goal.id}
                  id={goal.id}
                  name={goal.name}
                  category={goal.category}
                  amount={goal.amount}
                  progress={goal.progress}
                  onClick={() => navigate(`/goal/${goal.id}`)}
                />
              ))
            ) : (
              <div className="text-center p-8">
                <p className="text-tandemi-neutral-gray">{t("dashboard.no_goals")}</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="fixed bottom-6 left-0 right-0 px-4 max-w-lg mx-auto">
          <Button 
            className="w-full rounded-full shadow-lg bg-tandemi-pink hover:bg-opacity-90 py-4 h-auto text-base"
            onClick={() => navigate("/create-goal")}
          >
            {language === "es" ? "Crear nueva meta" : "Create a new goal"}
          </Button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block">
        <ResponsiveLayout>
          <DesktopDashboard goals={goals} userName={userName} />
        </ResponsiveLayout>
      </div>
    </>
  );
};

export default DashboardPage;
