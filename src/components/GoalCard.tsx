
import { Heart, DollarSign, GraduationCap, House, Pill } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { formatNumber } from "../utils/formatters";

type GoalCardProps = {
  id: string;
  name: string;
  category: string;
  amount: number;
  progress: number;
  onClick: () => void;
  className?: string;
  variant?: "mobile" | "desktop";
};

const GoalCard = ({ id, name, category, amount, progress, onClick, className, variant = "mobile" }: GoalCardProps) => {
  const { t } = useLanguage();
  
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "medical":
        return <Pill className="h-5 w-5" />;
      case "education":
        return <GraduationCap className="h-5 w-5" />;
      case "housing":
        return <House className="h-5 w-5" />;
      default:
        return <DollarSign className="h-5 w-5" />;
    }
  };
  
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "medical":
        return "bg-blue-100 text-blue-600";
      case "education":
        return "bg-green-100 text-green-600";
      case "housing":
        return "bg-amber-100 text-amber-600";
      default:
        return "bg-purple-100 text-purple-600";
    }
  };

  if (variant === "desktop") {
    return (
      <div 
        className={cn("bg-white rounded-2xl p-4 card-shadow mb-4 active:scale-98 transition-transform flex flex-col justify-between", className)}
        onClick={onClick}
      >
        <div>
          <h3 className="font-semibold text-lg mb-2">{name}</h3>
          <span className={`px-3 py-1 rounded-full text-xs ${getCategoryColor(category)} flex items-center gap-1 w-fit`}>
            {getCategoryIcon(category)}
            {t(`category.${category.toLowerCase()}`)}
          </span>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-tandemi-neutral-gray">
              {t("goal_details.progress")}
            </span>
            <span className="font-medium">${formatNumber(progress.toFixed(0))} / ${formatNumber(amount.toFixed(0))}</span>
          </div>
          <div className="w-full bg-tandemi-soft-gray rounded-full h-2">
            <div 
              className="bg-tandemi-pink h-2 rounded-full" 
              style={{ width: `${Math.min(100, (progress / amount) * 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={cn("bg-white rounded-2xl p-4 card-shadow mb-4 active:scale-98 transition-transform", className)}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-lg">{name}</h3>
        <span className={`px-3 py-1 rounded-full text-xs ${getCategoryColor(category)} flex items-center gap-1`}>
          {getCategoryIcon(category)}
          {t(`category.${category.toLowerCase()}`)}
        </span>
      </div>
      
      <div className="mt-3">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-tandemi-neutral-gray">
            {t("goal_details.progress")}
          </span>
          <span className="font-medium">${formatNumber(progress.toFixed(0))} / ${formatNumber(amount.toFixed(0))}</span>
        </div>
        <div className="w-full bg-tandemi-soft-gray rounded-full h-2">
          <div 
            className="bg-tandemi-pink h-2 rounded-full" 
            style={{ width: `${Math.min(100, (progress / amount) * 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default GoalCard;
