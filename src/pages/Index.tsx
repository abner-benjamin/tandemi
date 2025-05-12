
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
    progress: 1150, // $500 + $350 + $100 + $90 + $110 = $1150
    dueDate: new Date("2025-12-31").toISOString(),
    description: "Fund for grandmother's knee surgery in Mexico City",
  },
  {
    id: "2",
    name: "Spring Tuition for Sofia",
    category: "Education",
    amount: 1800,
    progress: 1125, // $500 + $500 + $75 + $50 = $1125
    dueDate: new Date("2025-09-01").toISOString(),
    description: "College tuition payment for Sofia's spring semester",
  },
  {
    id: "3",
    name: "House Repair in Puebla",
    category: "Housing",
    amount: 3000,
    progress: 1160, // $400 + $500 + $60 + $80 + $120 = $1160
    dueDate: new Date("2025-11-15").toISOString(),
    description: "Roof repairs and painting for the family home in Puebla",
  }
];

// Sample contributions data
const sampleContributions = [
  // Abuelita's Surgery Fund (id: 1)
  {
    id: "c1",
    goalId: "1",
    amount: 500,
    date: new Date("2025-05-05").toISOString(), // Week 1
    type: "Remittance",
    purpose: "Medical",
    contributor: "Lucas",
    note: "Medical support",
  },
  {
    id: "c2",
    goalId: "1",
    amount: 350,
    date: new Date("2025-05-18").toISOString(), // Week 3
    type: "Cash",
    purpose: "Meds",
    contributor: "María",
    note: "Medication expenses",
  },
  {
    id: "c3",
    goalId: "1",
    amount: 100,
    date: new Date("2025-05-10").toISOString(), // Week 2
    type: "Gift",
    purpose: "General support",
    contributor: "Elena",
    note: "General support",
  },
  {
    id: "c4",
    goalId: "1",
    amount: 90,
    date: new Date("2025-05-25").toISOString(), // Week 4
    type: "Remittance",
    purpose: "Pharmacy",
    contributor: "Elena",
    note: "Pharmacy expenses",
  },
  {
    id: "c5",
    goalId: "1",
    amount: 110,
    date: new Date("2025-06-02").toISOString(), // Week 5
    type: "Cash",
    purpose: "Transportation",
    contributor: "María",
    note: "Transportation costs",
  },
  
  // House Repair in Puebla (id: 3)
  {
    id: "c6",
    goalId: "3",
    amount: 400,
    date: new Date("2025-05-05").toISOString(), // Week 1
    type: "Remittance",
    purpose: "Repair",
    contributor: "Alex",
    note: "Initial repairs",
  },
  {
    id: "c7",
    goalId: "3",
    amount: 500,
    date: new Date("2025-05-25").toISOString(), // Week 4
    type: "Cash",
    purpose: "Construction",
    contributor: "Alex",
    note: "Construction materials",
  },
  {
    id: "c8",
    goalId: "3",
    amount: 60,
    date: new Date("2025-05-10").toISOString(), // Week 2
    type: "Cash",
    purpose: "Paint",
    contributor: "Carlos",
    note: "Paint supplies",
  },
  {
    id: "c9",
    goalId: "3",
    amount: 80,
    date: new Date("2025-06-02").toISOString(), // Week 5
    type: "Remittance",
    purpose: "Electrical work",
    contributor: "Lucas",
    note: "Electrical work expenses",
  },
  {
    id: "c10",
    goalId: "3",
    amount: 120,
    date: new Date("2025-05-18").toISOString(), // Week 3
    type: "Gift",
    purpose: "Tools",
    contributor: "Alex",
    note: "Tool purchases",
  },
  
  // Spring Tuition for Sofia (id: 2)
  {
    id: "c11",
    goalId: "2",
    amount: 500,
    date: new Date("2025-05-10").toISOString(), // Week 2
    type: "Remittance",
    purpose: "Tuition",
    contributor: "Sofia",
    note: "Tuition payment",
  },
  {
    id: "c12",
    goalId: "2",
    amount: 500,
    date: new Date("2025-06-02").toISOString(), // Week 5
    type: "Cash",
    purpose: "Books",
    contributor: "Lucas",
    note: "Books and materials",
  },
  {
    id: "c13",
    goalId: "2",
    amount: 75,
    date: new Date("2025-05-18").toISOString(), // Week 3
    type: "Gift",
    purpose: "Books",
    contributor: "Mateo",
    note: "Additional books",
  },
  {
    id: "c14",
    goalId: "2",
    amount: 50,
    date: new Date("2025-05-05").toISOString(), // Week 1
    type: "Cash",
    purpose: "Supplies",
    contributor: "Sofia",
    note: "School supplies",
  }
];

// Calculate correct progress values based on contributions
const calculateProgress = () => {
  const goalTotals = {};
  
  // Initialize goal totals
  sampleGoals.forEach(goal => {
    goalTotals[goal.id] = 0;
  });
  
  // Add up contributions for each goal
  sampleContributions.forEach(contribution => {
    const goalId = contribution.goalId;
    if (goalTotals[goalId] !== undefined) {
      goalTotals[goalId] += contribution.amount;
    }
  });
  
  // Update goal progress values
  return sampleGoals.map(goal => ({
    ...goal,
    progress: goalTotals[goal.id]
  }));
};

// Update goals with correct progress
const updatedGoals = calculateProgress();

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Initialize session storage with sample goals with updated progress
    sessionStorage.setItem('userGoals', JSON.stringify(updatedGoals));
    
    // Initialize session storage with sample contributions
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
