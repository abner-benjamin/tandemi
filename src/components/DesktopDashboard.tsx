import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import GoalCard from "./GoalCard";
import FamilyContributionsChart from "./FamilyContributionsChart";
import { Button } from "@/components/ui/button";
import { Plus, Filter, DollarSign } from "lucide-react";

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
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const userName = "Alex";
  
  const [goals, setGoals] = useState(() => {
    const storedGoals = sessionStorage.getItem('userGoals');
    if (storedGoals) {
      return JSON.parse(storedGoals);
    }
    return sampleGoals;
  });

  const [selectedGoal, setSelectedGoal] = useState(null);
  
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

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="flex-1 bg-tandemi-light-gray">
      {/* Header */}
      <div className="bg-white border-b border-tandemi-soft-gray p-6">
        <h1 className="text-3xl font-bold">
          {language === "es" ? `¡${t("dashboard.welcome")}, ${userName}!` : `${t("dashboard.welcome")}, ${userName}!`}
        </h1>
      </div>

      <div className="p-6">
        {/* Contribution History Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{t("dashboard.contribution_history") || "Contribution History"}</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                {language === "es" ? "Filtrar" : "Filter"}
              </Button>
            </div>
          </div>
          
          {/* Expanded chart for desktop */}
          <div className="bg-white rounded-2xl p-6 card-shadow">
            <FamilyContributionsChart />
          </div>
        </div>

        {/* Your Goals Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">{t("dashboard.your_goals")}</h2>
            <Button 
              className="bg-tandemi-pink hover:bg-opacity-90"
              onClick={() => navigate("/create-goal")}
            >
              <Plus className="w-4 h-4 mr-2" />
              {language === "es" ? "Nueva Meta" : "New Goal"}
            </Button>
          </div>
          
          {/* Goal Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {goals && goals.length > 0 ? (
              goals.map((goal) => (
                <div key={goal.id} className="bg-white rounded-2xl p-6 card-shadow hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="mb-4">
                    <h3 className="font-semibold text-lg mb-2">{goal.name}</h3>
                    <p className="text-sm text-tandemi-neutral-gray mb-3">{goal.category}</p>
                    
                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-tandemi-neutral-gray">Progress</span>
                        <span className="font-medium">{Math.min(100, (goal.progress / goal.amount) * 100).toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-tandemi-soft-gray rounded-full h-2">
                        <div 
                          className="bg-tandemi-pink h-2 rounded-full" 
                          style={{ width: `${Math.min(100, (goal.progress / goal.amount) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Goal Stats */}
                    <div className="flex justify-between text-sm mb-4">
                      <div>
                        <p className="text-tandemi-neutral-gray">Remaining</p>
                        <p className="font-semibold">${formatNumber(Math.max(0, goal.amount - goal.progress).toFixed(0))}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-tandemi-neutral-gray">Due Date</p>
                        <p className="font-semibold">{new Date(goal.dueDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => setSelectedGoal(goal)}
                    >
                      {language === "es" ? "Ver" : "View"}
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1 bg-tandemi-pink hover:bg-opacity-90"
                      onClick={() => navigate(`/goal/${goal.id}/contribute`)}
                    >
                      {language === "es" ? "Contribuir" : "Contribute"}
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center p-8">
                <p className="text-tandemi-neutral-gray">{t("dashboard.no_goals")}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Goal Detail Slide Panel */}
      {selectedGoal && (
        <GoalDetailPanel 
          goal={selectedGoal} 
          onClose={() => setSelectedGoal(null)}
        />
      )}
    </div>
  );
};

// Goal Detail Slide Panel Component
const GoalDetailPanel = ({ goal, onClose }) => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={onClose}>
      <div 
        className="absolute right-0 top-0 h-full w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">{goal.name}</h2>
            <button 
              onClick={onClose}
              className="text-tandemi-neutral-gray hover:text-tandemi-dark"
            >
              ✕
            </button>
          </div>

          {/* Progress Section */}
          <div className="bg-tandemi-light-gray rounded-2xl p-4 mb-6">
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-tandemi-neutral-gray">Progress</span>
                <span className="font-medium">{Math.min(100, (goal.progress / goal.amount) * 100).toFixed(0)}%</span>
              </div>
              <div className="w-full bg-tandemi-soft-gray rounded-full h-2.5">
                <div 
                  className="bg-tandemi-pink h-2.5 rounded-full" 
                  style={{ width: `${Math.min(100, (goal.progress / goal.amount) * 100)}%` }}
                ></div>
              </div>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <div>
                <p className="text-tandemi-neutral-gray">Target</p>
                <p className="font-semibold">${goal.amount.toLocaleString()}</p>
              </div>
              <div className="text-center">
                <p className="text-tandemi-neutral-gray">Progress</p>
                <p className="font-semibold">${goal.progress.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-tandemi-neutral-gray">Remaining</p>
                <p className="font-semibold">${Math.max(0, goal.amount - goal.progress).toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Goal Details */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">{t("goal_details.goal_overview")}</h3>
            <p className="text-tandemi-neutral-gray text-sm mb-4">
              {goal.description || t("goal_details.no_description")}
            </p>
            
            <div className="flex justify-between">
              <div>
                <p className="text-xs text-tandemi-neutral-gray">Due Date</p>
                <p className="font-medium">{new Date(goal.dueDate).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-tandemi-neutral-gray">Type</p>
                <p className="font-medium">{goal.category}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              className="w-full bg-tandemi-pink hover:bg-opacity-90"
              onClick={() => {
                navigate(`/goal/${goal.id}/contribute`);
                onClose();
              }}
            >
              <DollarSign className="w-4 h-4 mr-2" />
              {t("goal_details.log_contribution")}
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                navigate(`/goal/${goal.id}`);
                onClose();
              }}
            >
              {language === "es" ? "Ver Detalles Completos" : "View Full Details"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopDashboard;
