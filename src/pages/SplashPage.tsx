
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import LanguageToggle from "../components/LanguageToggle";
import TandemiLogo from "../components/TandemiLogo";

const SplashPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFading(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center transition-all duration-500 ${fading ? "opacity-0" : "opacity-100"}`}>
      <div className="absolute top-4 right-4">
        <LanguageToggle />
      </div>
      
      <div className="flex flex-col items-center justify-center animate-enter">
        <TandemiLogo size="lg" />
        <h2 className="mt-6 text-xl text-tandemi-neutral-gray font-medium">
          {t("app.tagline")}
        </h2>
      </div>
    </div>
  );
};

export default SplashPage;
