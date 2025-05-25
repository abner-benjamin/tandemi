
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import TandemiLogo from "./TandemiLogo";
import GoalCard from "./GoalCard";
import FamilyContributionsChart from "./FamilyContributionsChart";
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

const DesktopDashboard = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  
  const userName = "Alex";
  
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
    <div className="min-h-screen bg-tandemi-light-gray p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <TandemiLogo size="md" />
            <h1 className="text-3xl font-bold mt-4">
              {language === "es" ? `¡${t("dashboard.welcome")}, ${userName}!` : `${t("dashboard.welcome")}, ${userName}!`}
            </h1>
          </div>
        </div>
        
        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Family Contributions */}
          <div className="lg:col-span-1">
            <FamilyContributionsChart />
          </div>
          
          {/* Right column - Goals */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-semibold text-2xl">{t("dashboard.your_goals")}</h2>
              <Button 
                className="rounded-full shadow-lg bg-tandemi-pink hover:bg-opacity-90 px-6"
                onClick={() => navigate("/create-goal")}
              >
                {language === "es" ? "Crear nueva meta" : "Create a new goal"}
              </Button>
            </div>
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
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
                <div className="col-span-full text-center p-8">
                  <p className="text-tandemi-neutral-gray">{t("dashboard.no_goals")}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopDashboard;
