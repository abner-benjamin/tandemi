
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageProvider } from "../contexts/LanguageContext";
import { AuthProvider } from "../contexts/AuthContext";
import SplashPage from "./SplashPage";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to splash page
    navigate("/splash");
  }, [navigate]);
  
  return (
    <LanguageProvider>
      <AuthProvider>
        <SplashPage />
      </AuthProvider>
    </LanguageProvider>
  );
};

export default Index;
