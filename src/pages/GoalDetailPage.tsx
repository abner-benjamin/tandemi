
import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useLanguage } from "../contexts/LanguageContext";
import BackButton from "../components/BackButton";
import ContributionItem from "../components/ContributionItem";
import FamilyMemberItem from "../components/FamilyMemberItem";
import { Button } from "@/components/ui/button";
import { DollarSign, Heart } from "lucide-react";
import { getContributionsByGoalId, calculateGoalTotal } from "../utils/chartData";

// Sample family members - now with updated neutral names
const sampleFamilyMembers = [
  {
    id: "f1",
    goalId: "1",
    name: "Lucas",
    role: "Admin",
    contactMethod: "Email",
    contactValue: "lucas@example.com",
  },
  {
    id: "f2",
    goalId: "1",
    name: "María",
    role: "Contributor",
    contactMethod: "WhatsApp",
    contactValue: "+1234567890",
  },
  {
    id: "f3",
    goalId: "2",
    name: "Sofía",
    role: "Admin",
    contactMethod: "Email",
    contactValue: "sofia@example.com",
  },
  {
    id: "f4",
    goalId: "2",
    name: "Lucas",
    role: "Viewer",
    contactMethod: "Phone",
    contactValue: "+9876543210",
  },
  {
    id: "f5",
    goalId: "3",
    name: "María",
    role: "Admin",
    contactMethod: "Email",
    contactValue: "maria@example.com",
  },
];

// Sample contributions if none exist in session storage
const sampleContributions = [
  // Abuelita's Surgery Fund (id: 1)
  {
    id: "c1",
    goalId: "1",
    amount: 500,
    date: new Date("2025-05-05"), // Week 1
    type: "Remittance",
    purpose: "Medical",
    contributor: "Lucas",
    note: "Medical support",
  },
  {
    id: "c2",
    goalId: "1",
    amount: 350,
    date: new Date("2025-05-18"), // Week 3
    type: "Cash",
    purpose: "Meds",
    contributor: "María",
    note: "Medication expenses",
  },
  {
    id: "c3",
    goalId: "1",
    amount: 100,
    date: new Date("2025-05-10"), // Week 2
    type: "Gift",
    purpose: "General support",
    contributor: "Elena",
    note: "General support",
  },
  {
    id: "c4",
    goalId: "1",
    amount: 90,
    date: new Date("2025-05-25"), // Week 4
    type: "Remittance",
    purpose: "Pharmacy",
    contributor: "Elena",
    note: "Pharmacy expenses",
  },
  {
    id: "c5",
    goalId: "1",
    amount: 110,
    date: new Date("2025-06-02"), // Week 5
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
    date: new Date("2025-05-05"), // Week 1
    type: "Remittance",
    purpose: "Repair",
    contributor: "Alex",
    note: "Initial repairs",
  },
  {
    id: "c7",
    goalId: "3",
    amount: 500,
    date: new Date("2025-05-25"), // Week 4
    type: "Cash",
    purpose: "Construction",
    contributor: "Alex",
    note: "Construction materials",
  },
  {
    id: "c8",
    goalId: "3",
    amount: 60,
    date: new Date("2025-05-10"), // Week 2
    type: "Cash",
    purpose: "Paint",
    contributor: "Carlos",
    note: "Paint supplies",
  },
  {
    id: "c9",
    goalId: "3",
    amount: 80,
    date: new Date("2025-06-02"), // Week 5
    type: "Remittance",
    purpose: "Electrical work",
    contributor: "Lucas",
    note: "Electrical work expenses",
  },
  {
    id: "c10",
    goalId: "3",
    amount: 120,
    date: new Date("2025-05-18"), // Week 3
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
    date: new Date("2025-05-10"), // Week 2
    type: "Remittance",
    purpose: "Tuition",
    contributor: "Sofia",
    note: "Tuition payment",
  },
  {
    id: "c12",
    goalId: "2",
    amount: 500,
    date: new Date("2025-06-02"), // Week 5
    type: "Cash",
    purpose: "Books",
    contributor: "Lucas",
    note: "Books and materials",
  },
  {
    id: "c13",
    goalId: "2",
    amount: 75,
    date: new Date("2025-05-18"), // Week 3
    type: "Gift",
    purpose: "Books",
    contributor: "Mateo",
    note: "Additional books",
  },
  {
    id: "c14",
    goalId: "2",
    amount: 50,
    date: new Date("2025-05-05"), // Week 1
    type: "Cash",
    purpose: "Supplies",
    contributor: "Sofia",
    note: "School supplies",
  }
];

const GoalDetailPage = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabParam || "overview");
  
  // Get goals from sessionStorage
  const [goals, setGoals] = useState(() => {
    const storedGoals = sessionStorage.getItem('userGoals');
    if (storedGoals) {
      return JSON.parse(storedGoals);
    }
    return [];
  });
  
  // Get contributions from sessionStorage
  const [contributions, setContributions] = useState(() => {
    const storedContributions = sessionStorage.getItem('userContributions');
    if (storedContributions) {
      return JSON.parse(storedContributions);
    }
    return sampleContributions;
  });
  
  // Get family members from sessionStorage or initialize with sample data
  const [familyMembers, setFamilyMembers] = useState(() => {
    const storedFamilyMembers = sessionStorage.getItem('familyMembers');
    if (storedFamilyMembers) {
      return JSON.parse(storedFamilyMembers);
    }
    return sampleFamilyMembers;
  });
  
  // Listen for changes in sessionStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const storedGoals = sessionStorage.getItem('userGoals');
      if (storedGoals) {
        setGoals(JSON.parse(storedGoals));
      }
      
      const storedContributions = sessionStorage.getItem('userContributions');
      if (storedContributions) {
        setContributions(JSON.parse(storedContributions));
      } else {
        // If for some reason contributions are empty, add sample contributions
        sessionStorage.setItem('userContributions', JSON.stringify(sampleContributions));
        setContributions(sampleContributions);
      }
      
      const storedFamilyMembers = sessionStorage.getItem('familyMembers');
      if (storedFamilyMembers) {
        setFamilyMembers(JSON.parse(storedFamilyMembers));
      } else {
        sessionStorage.setItem('familyMembers', JSON.stringify(sampleFamilyMembers));
        setFamilyMembers(sampleFamilyMembers);
      }
    };
    
    // Call once on mount to ensure data is loaded
    handleStorageChange();
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also check periodically in case user is in same tab - reduced interval for better responsiveness
    const interval = setInterval(handleStorageChange, 500);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);
  
  // Find the current goal
  const goal = goals.find((g) => g.id === id) || {
    id: id || "0",
    name: "Goal not found",
    category: "Other",
    amount: 0,
    progress: 0,
    dueDate: new Date(),
    description: "Goal details could not be loaded"
  };
  
  // Process contributions to ensure date objects
  const processedContributions = contributions.map(c => ({
    ...c,
    date: c.date instanceof Date ? c.date : new Date(c.date)
  }));
  
  // Filter contributions for this goal - now correctly ensuring all contributions for the goal are included
  const goalContributions = processedContributions.filter(c => c.goalId === id);
  
  // Filter family members for this goal
  const goalFamilyMembers = familyMembers.filter(f => f.goalId === id);
  
  // Format number with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  // Update goal progress based on contributions
  useEffect(() => {
    if (goalContributions.length > 0) {
      const totalContributed = goalContributions.reduce((sum, c) => sum + (Number(c.amount) || 0), 0);
      
      // Only update if we need to
      if (goal.progress !== totalContributed) {
        // Update local state
        const updatedGoal = {...goal, progress: totalContributed};
        
        // Update in session storage if needed
        const storedGoals = sessionStorage.getItem('userGoals');
        if (storedGoals) {
          const goalsArray = JSON.parse(storedGoals);
          const targetGoalIndex = goalsArray.findIndex(g => g.id === id);
          
          if (targetGoalIndex !== -1) {
            goalsArray[targetGoalIndex].progress = totalContributed;
            sessionStorage.setItem('userGoals', JSON.stringify(goalsArray));
            setGoals(goalsArray);
          }
        }
      }
    }
  }, [goalContributions, id, goal]);
  
  // If this is a new goal without these fields, add them
  useEffect(() => {
    if (!goal.dueDate) {
      goal.dueDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000); // 90 days from now
    }
    if (!goal.description) {
      goal.description = ""; // Empty description to trigger the fallback message
    }
  }, [goal]);

  const progressPercentage = Math.min(100, (goal.progress / goal.amount) * 100);
  const remainingAmount = Math.max(0, goal.amount - goal.progress);
  
  // Convert string date to Date object if needed and ensure it's valid
  let dueDate;
  try {
    dueDate = goal.dueDate instanceof Date ? 
      goal.dueDate : new Date(goal.dueDate);
    
    // Check if date is valid
    if (isNaN(dueDate.getTime())) {
      dueDate = new Date(); // Default to today if invalid
    }
  } catch (e) {
    dueDate = new Date(); // Default to today if any error occurs
  }

  // Sort contributions by date, newest first - used in both tabs
  const sortedContributions = [...goalContributions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen bg-tandemi-light-gray animate-fade-in max-w-lg mx-auto">
      <div className="p-4 flex items-center">
        <BackButton className="mr-2" to="/dashboard" />
        <h1 className="text-lg font-bold truncate max-w-[280px] mx-auto overflow-x-auto whitespace-nowrap text-right">
          {goal.name}
        </h1>
        <div className="w-10"></div> {/* Spacer for centering title */}
      </div>
      
      <div className="px-4">
        <div className="bg-white rounded-2xl p-4 card-shadow">
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-tandemi-neutral-gray">
                {t("goal_details.progress")}
              </span>
              <span className="font-medium">{progressPercentage.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-tandemi-soft-gray rounded-full h-2.5">
              <div 
                className="bg-tandemi-pink h-2.5 rounded-full" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-tandemi-neutral-gray">{t("goal_details.target")}</p>
              <p className="font-semibold">${formatNumber(goal.amount.toFixed(0))}</p>
            </div>
            
            <div className="text-center">
              <p className="text-xs text-tandemi-neutral-gray">{t("goal_details.progress")}</p>
              <p className="font-semibold">${formatNumber(goal.progress.toFixed(0))}</p>
            </div>
            
            <div className="text-right">
              <p className="text-xs text-tandemi-neutral-gray">{t("goal_details.remaining")}</p>
              <p className="font-semibold">${formatNumber(remainingAmount.toFixed(0))}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="overview">{t("goal_details.overview")}</TabsTrigger>
            <TabsTrigger value="contributions">{t("goal_details.contributions")}</TabsTrigger>
            <TabsTrigger value="family">{t("goal_details.family")}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-2">
            <div className="bg-white rounded-2xl p-4 card-shadow mb-4">
              <h3 className="font-semibold mb-2">{goal.name}</h3>
              <p className="text-tandemi-neutral-gray text-sm mb-4">
                {goal.description ? goal.description : t("goal_details.no_description")}
              </p>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-tandemi-neutral-gray">{t("goal_details.due_date")}</p>
                  <p className="font-medium">{dueDate.toLocaleDateString()}</p>
                </div>
                
                <div>
                  <p className="text-xs text-tandemi-neutral-gray">{t("category." + goal.category.toLowerCase())}</p>
                  <p className="font-medium">{goal.category}</p>
                </div>
              </div>
            </div>
            
            <h3 className="font-semibold mb-2">{t("goal_details.contributions")}</h3>
            <div className="space-y-3 overflow-y-visible">
              {sortedContributions.length > 0 ? (
                sortedContributions.slice(0, 3).map((contribution) => (
                  <ContributionItem
                    key={contribution.id}
                    id={contribution.id}
                    amount={contribution.amount}
                    date={contribution.date instanceof Date ? contribution.date : new Date(contribution.date)}
                    type={contribution.type}
                    purpose={contribution.purpose}
                    contributor={contribution.contributor}
                    note={contribution.note}
                  />
                ))
              ) : (
                <div className="text-center p-4">
                  <p className="text-tandemi-neutral-gray">{t("contribution.empty")}</p>
                </div>
              )}
              
              {sortedContributions.length > 3 && (
                <div className="text-center pt-2">
                  <button 
                    className="text-tandemi-pink text-sm font-medium"
                    onClick={() => setActiveTab("contributions")}
                  >
                    {t("goal_details.view_all")}
                  </button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="contributions" className="mt-2">
            <div className="mb-4">
              <Button
                className="button-primary w-full"
                onClick={() => navigate(`/goal/${id}/contribute`)}
              >
                <DollarSign className="h-4 w-4 mr-1" />
                {t("goal_details.log_contribution")}
              </Button>
            </div>
            
            <div className="space-y-3 max-h-screen overflow-y-auto no-scrollbar">
              {sortedContributions.length > 0 ? (
                sortedContributions.map((contribution) => (
                  <ContributionItem
                    key={contribution.id}
                    id={contribution.id}
                    amount={contribution.amount}
                    date={contribution.date instanceof Date ? contribution.date : new Date(contribution.date)}
                    type={contribution.type}
                    purpose={contribution.purpose}
                    contributor={contribution.contributor}
                    note={contribution.note}
                  />
                ))
              ) : (
                <div className="text-center p-8">
                  <p className="text-tandemi-neutral-gray">{t("contribution.empty")}</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="family" className="mt-2">
            <div className="mb-4">
              <Button
                className="button-primary w-full"
                onClick={() => navigate(`/goal/${id}/invite`)}
              >
                <Heart className="h-4 w-4 mr-1" />
                {t("family.invite")}
              </Button>
            </div>
            
            {goalFamilyMembers.length > 0 ? (
              <div className="space-y-3">
                {goalFamilyMembers.map((member) => (
                  <FamilyMemberItem
                    key={member.id}
                    name={member.name}
                    role={member.role}
                    contactMethod={member.contactMethod}
                    contactValue={member.contactValue}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center p-8">
                <p className="text-tandemi-neutral-gray">{t("family.empty")}</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GoalDetailPage;
