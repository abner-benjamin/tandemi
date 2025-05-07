
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import TandemiLogo from "../components/TandemiLogo";
import GoalCard from "../components/GoalCard";

// Sample data for the goals
const sampleGoals = [
  {
    id: "1",
    name: "Abuelita's Surgery Fund",
    category: "Medical",
    amount: 2500,
    progress: 1750,
  },
  {
    id: "2",
    name: "Spring Tuition for Sofia",
    category: "Education",
    amount: 1800,
    progress: 900,
  },
  {
    id: "3",
    name: "House Repair in Puebla",
    category: "Housing",
    amount: 3000,
    progress: 2100,
  }
];

const DashboardPage = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

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
          {sampleGoals.map((goal) => (
            <GoalCard 
              key={goal.id}
              id={goal.id}
              name={goal.name}
              category={goal.category}
              amount={goal.amount}
              progress={goal.progress}
              onClick={() => navigate(`/goal/${goal.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
