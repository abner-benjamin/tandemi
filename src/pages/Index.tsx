
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageProvider } from "../contexts/LanguageContext";
import { AuthProvider } from "../contexts/AuthContext";
import SplashPage from "./SplashPage";

// Sample data for the goals
const sampleGoals = [
  {
    id: "1",
    name: "Abuelita's Surgery Fund",
    category: "Medical",
    amount: 2500,
    progress: 1750,
    dueDate: new Date("2023-12-31"),
    description: "Fund for grandmother's knee surgery in Mexico City",
  },
  {
    id: "2",
    name: "Spring Tuition for Sofia",
    category: "Education",
    amount: 1800,
    progress: 900,
    dueDate: new Date("2023-09-01"),
    description: "College tuition payment for Sofia's spring semester",
  },
  {
    id: "3",
    name: "House Repair in Puebla",
    category: "Housing",
    amount: 3000,
    progress: 2100,
    dueDate: new Date("2023-11-15"),
    description: "Roof repairs and painting for the family home in Puebla",
  }
];

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Initialize session storage with sample goals if empty
    if (!sessionStorage.getItem('userGoals')) {
      sessionStorage.setItem('userGoals', JSON.stringify(sampleGoals));
    }
    
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
