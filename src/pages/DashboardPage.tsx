
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import TandemiLogo from "../components/TandemiLogo";
import GoalCard from "../components/GoalCard";
import LanguageToggle from "../components/LanguageToggle";

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
    // Fall back to empty array if nothing in storage
    return [];
  });
  
  // Listen for changes in sessionStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const storedGoals = sessionStorage.getItem('userGoals');
      if (storedGoals) {
        setGoals(JSON.parse(storedGoals));
      }
    };
    
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
          {goals.length > 0 ? (
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
