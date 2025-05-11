
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
    dueDate: new Date("2023-12-31").toISOString(),
    description: "Fund for grandmother's knee surgery in Mexico City",
  },
  {
    id: "2",
    name: "Spring Tuition for Sofia",
    category: "Education",
    amount: 1800,
    progress: 900,
    dueDate: new Date("2023-09-01").toISOString(),
    description: "College tuition payment for Sofia's spring semester",
  },
  {
    id: "3",
    name: "House Repair in Puebla",
    category: "Housing",
    amount: 3000,
    progress: 2100,
    dueDate: new Date("2023-11-15").toISOString(),
    description: "Roof repairs and painting for the family home in Puebla",
  }
];

// Sample contributions data
const sampleContributions = [
  {
    id: "c1",
    goalId: "1",
    amount: 500,
    date: new Date("2023-05-15").toISOString(),
    type: "Remittance",
    purpose: "Medical",
    contributor: "Juan Perez",
    note: "Monthly contribution from salary",
  },
  {
    id: "c2",
    goalId: "1",
    amount: 250,
    date: new Date("2023-05-02").toISOString(),
    type: "Cash",
    purpose: "Medical",
    contributor: "Maria Rodriguez",
  },
  {
    id: "c3",
    goalId: "1",
    amount: 1000,
    date: new Date("2023-04-10").toISOString(),
    type: "Gift",
    purpose: "Medical",
    contributor: "The López Family",
    note: "Family collection at reunion",
  },
  {
    id: "c4",
    goalId: "2",
    amount: 500,
    date: new Date("2023-05-12").toISOString(),
    type: "Remittance",
    purpose: "Education",
    contributor: "Ana Gomez",
  },
  {
    id: "c5",
    goalId: "2",
    amount: 400,
    date: new Date("2023-05-01").toISOString(),
    type: "Cash",
    purpose: "Education",
    contributor: "Carlos Diaz",
  },
  {
    id: "c6",
    goalId: "3",
    amount: 1000,
    date: new Date("2023-05-10").toISOString(),
    type: "Remittance",
    purpose: "Housing",
    contributor: "Roberto Flores",
  },
  {
    id: "c7",
    goalId: "3",
    amount: 600,
    date: new Date("2023-04-20").toISOString(),
    type: "Cash",
    purpose: "Housing",
    contributor: "Lucia Morales",
    note: "From the savings account",
  }
];

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Initialize session storage with sample goals if empty
    if (!sessionStorage.getItem('userGoals')) {
      sessionStorage.setItem('userGoals', JSON.stringify(sampleGoals));
    }
    
    // Initialize session storage with sample contributions if empty
    if (!sessionStorage.getItem('userContributions')) {
      sessionStorage.setItem('userContributions', JSON.stringify(sampleContributions));
    }
    
    // Always ensure the contributions are stored
    sessionStorage.setItem('userContributions', JSON.stringify(sampleContributions));
    
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
