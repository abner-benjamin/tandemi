
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import TandemiLogo from "../components/TandemiLogo";
import GoalCard from "../components/GoalCard";
import LanguageToggle from "../components/LanguageToggle";

// Sample data for the goals (fallback if sessionStorage is empty)
const sampleGoals = [
  {
    id: "1",
    name: "Abuelita's Surgery Fund",
    category: "Medical",
    amount: 2500,
    progress: 1750,
    dueDate: new Date("2023-12-31").toISOString(),
    description: "Fund for grandmother's knee surgery in Mexico City",
  },
  {
    id: "2",
    name: "Spring Tuition for Sofia",
    category: "Education",
    amount: 1800,
    progress: 900,
    dueDate: new Date("2023-09-01").toISOString(),
    description: "College tuition payment for Sofia's spring semester",
  },
  {
    id: "3",
    name: "House Repair in Puebla",
    category: "Housing",
    amount: 3000,
    progress: 2100,
    dueDate: new Date("2023-11-15").toISOString(),
    description: "Roof repairs and painting for the family home in Puebla",
  }
];

const DashboardPage = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Get goals from sessionStorage
  const [goals, setGoals] = useState(() => {
    // Try to load goals from sessionStorage first
    const storedGoals = sessionStorage.getItem('userGoals');
    if (storedGoals) {
      return JSON.parse(storedGoals);
    }
    // Fall back to default sample goals
    return sampleGoals;
  });
  
  // Listen for changes in sessionStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const storedGoals = sessionStorage.getItem('userGoals');
      if (storedGoals) {
        setGoals(JSON.parse(storedGoals));
      } else {
        // If for some reason the storage is empty, use sample goals
        sessionStorage.setItem('userGoals', JSON.stringify(sampleGoals));
        setGoals(sampleGoals);
      }
    };
    
    // Run once on mount to ensure goals are loaded
    handleStorageChange();
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also check periodically in case user is in same tab
    const interval = setInterval(handleStorageChange, 1000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-tandemi-light-gray animate-fade-in max-w-lg mx-auto">
      <div className="p-4 flex justify-between items-center">
        <TandemiLogo size="sm" />
        <div className="flex items-center gap-2">
          <LanguageToggle />
        </div>
      </div>
      
      <div className="p-4">
        <h1 className="text-2xl font-bold">
          {t("dashboard.welcome")}, {user?.name}!
        </h1>
        
        <button 
          className="button-primary w-full my-6"
          onClick={() => navigate("/create-goal")}
        >
          {t("dashboard.create_goal")}
        </button>
        
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
    </div>
  );
};

export default DashboardPage;
