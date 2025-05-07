
import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "@/components/ui/button";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex rounded-full bg-tandemi-soft-gray p-1">
      <Button
        variant="ghost"
        className={`px-4 py-1 rounded-full text-sm font-medium transition-all ${
          language === "en" ? "bg-tandemi-pink text-white" : "text-tandemi-neutral-gray"
        }`}
        onClick={() => setLanguage("en")}
      >
        EN
      </Button>
      <Button
        variant="ghost"
        className={`px-4 py-1 rounded-full text-sm font-medium transition-all ${
          language === "es" ? "bg-tandemi-pink text-white" : "text-tandemi-neutral-gray"
        }`}
        onClick={() => setLanguage("es")}
      >
        ES
      </Button>
    </div>
  );
};

export default LanguageToggle;
