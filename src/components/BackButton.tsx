
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

type BackButtonProps = {
  to?: string;
  className?: string;
};

const BackButton = ({ to, className = "" }: BackButtonProps) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <button 
      onClick={handleClick} 
      className={`flex items-center gap-1 text-sm font-medium ${className}`}
    >
      <ChevronLeft className="h-4 w-4" />
      {t("common.back")}
    </button>
  );
};

export default BackButton;
