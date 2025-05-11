
import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useLanguage } from "../contexts/LanguageContext";
import BackButton from "../components/BackButton";
import ContributionItem from "../components/ContributionItem";
import FamilyMemberItem from "../components/FamilyMemberItem";
import { Button } from "@/components/ui/button";
import { DollarSign, Heart } from "lucide-react";

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
  {
    id: "c1",
    goalId: "1",
    amount: 200,
    date: new Date("2023-04-15"),
    type: "cash",
    purpose: "medical",
    contributor: "Lucas",
    note: "Birthday money from Tío Carlos"
  },
  {
    id: "c2",
    goalId: "1",
    amount: 500,
    date: new Date("2023-05-20"),
    type: "remittance",
    purpose: "medical",
    contributor: "María"
  },
  {
    id: "c3",
    goalId: "2",
    amount: 300,
    date: new Date("2023-03-10"),
    type: "gift",
    purpose: "education",
    contributor: "Sofía",
    note: "For textbooks"
  },
  {
    id: "c4",
    goalId: "3",
    amount: 450,
    date: new Date("2023-05-05"),
    type: "cash",
    purpose: "rent",
    contributor: "Lucas"
  }
];

const GoalDetailPage = () => {
  const { t } = useLanguage();
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
    
    // Also check periodically in case user is in same tab
    const interval = setInterval(handleStorageChange, 1000);
    
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
  
  // Filter contributions for this goal
  const goalContributions = contributions.filter(c => c.goalId === id);
  
  // Filter family members for this goal
  const goalFamilyMembers = familyMembers.filter(f => f.goalId === id);
  
  // Format number with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
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
            <div className="space-y-3 max-h-60 overflow-y-auto no-scrollbar">
              {goalContributions.length > 0 ? (
                goalContributions.slice(0, 2).map((contribution) => (
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
              {goalContributions.length > 0 ? (
                goalContributions.map((contribution) => (
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
