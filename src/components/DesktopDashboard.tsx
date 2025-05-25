
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import GoalCard from "./GoalCard";
import FamilyContributionsChart from "./FamilyContributionsChart";
import { Button } from "@/components/ui/button";

type Goal = {
  id: string;
  name: string;
  category: string;
  amount: number;
  progress: number;
  dueDate: string;
  description: string;
};

type DesktopDashboardProps = {
  goals: Goal[];
  userName: string;
};

const DesktopDashboard = ({ goals, userName }: DesktopDashboardProps) => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="flex-1 p-8 space-y-8 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          {language === "es" ? `¡${t("dashboard.welcome")}, ${userName}!` : `${t("dashboard.welcome")}, ${userName}!`}
        </h1>
      </div>

      {/* Contribution History Section */}
      <div className="bg-white rounded-2xl p-6 card-shadow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Contribution History</h2>
        </div>
        <div className="h-60">
          <FamilyContributionsChart />
        </div>
      </div>

      {/* Goals Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">{t("dashboard.your_goals")}</h2>
          <Button 
            className="bg-white border border-gray-300 hover:bg-gray-50 text-black px-6 py-2 rounded-full"
            onClick={() => navigate("/create-goal")}
          >
            {language === "es" ? "Crear nueva meta" : "Create a new goal"}
          </Button>
        </div>

        {goals && goals.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {goals.map((goal) => (
              <GoalCard 
                key={goal.id}
                id={goal.id}
                name={goal.name}
                category={goal.category}
                amount={goal.amount}
                progress={goal.progress}
                onClick={() => navigate(`/goal/${goal.id}`)}
                className="hover:shadow-lg transition-shadow cursor-pointer h-36"
                variant="desktop"
              />
            ))}
          </div>
        ) : (
          <div className="text-center p-12 bg-white rounded-2xl card-shadow">
            <p className="text-tandemi-neutral-gray text-lg">{t("dashboard.no_goals")}</p>
            <Button 
              className="mt-4 bg-white border border-gray-300 hover:bg-gray-50 text-black px-6 py-3 rounded-full"
              onClick={() => navigate("/create-goal")}
            >
              {language === "es" ? "Crear tu primera meta" : "Create your first goal"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DesktopDashboard;
