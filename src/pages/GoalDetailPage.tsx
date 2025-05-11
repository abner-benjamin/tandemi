import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useLanguage } from "../contexts/LanguageContext";
import BackButton from "../components/BackButton";
import ContributionItem from "../components/ContributionItem";
import FamilyMemberItem from "../components/FamilyMemberItem";
import { Button } from "@/components/ui/button";
import { DollarSign, Heart } from "lucide-react";

// Sample family members
const sampleFamilyMembers = [
  {
    id: "f1",
    goalId: "1",
    name: "Juan Perez",
    role: "Admin",
    contactMethod: "Email",
    contactValue: "juan@example.com",
  },
  {
    id: "f2",
    goalId: "1",
    name: "Maria Rodriguez",
    role: "Contributor",
    contactMethod: "WhatsApp",
    contactValue: "+1234567890",
  },
  {
    id: "f3",
    goalId: "2",
    name: "Ana Gomez",
    role: "Admin",
    contactMethod: "Email",
    contactValue: "ana@example.com",
  },
  {
    id: "f4",
    goalId: "2",
    name: "Carlos Diaz",
    role: "Viewer",
    contactMethod: "Phone",
    contactValue: "+9876543210",
  },
  {
    id: "f5",
    goalId: "3",
    name: "Roberto Flores",
    role: "Admin",
    contactMethod: "Email",
    contactValue: "roberto@example.com",
  },
];

const GoalDetailPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("overview");
  
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
    return [];
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
      }
    };
    
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
  const goalFamilyMembers = sampleFamilyMembers.filter(f => f.goalId === id);
  
  // If this is a new goal without these fields, add them
  useEffect(() => {
    if (!goal.dueDate) {
      goal.dueDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000); // 90 days from now
    }
    if (!goal.description) {
      goal.description = "No description provided";
    }
  }, [goal]);

  const progressPercentage = Math.min(100, (goal.progress / goal.amount) * 100);
  const remainingAmount = Math.max(0, goal.amount - goal.progress);
  
  // Convert string date to Date object if needed
  const dueDate = goal.dueDate instanceof Date ? 
    goal.dueDate : new Date(goal.dueDate);

  return (
    <div className="min-h-screen bg-tandemi-light-gray animate-fade-in max-w-lg mx-auto">
      <div className="p-4 flex items-center">
        <BackButton className="mr-auto" to="/dashboard" />
        <h1 className="text-lg font-bold truncate max-w-[200px]">{goal.name}</h1>
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
              <p className="font-semibold">${goal.amount.toFixed(0)}</p>
            </div>
            
            <div className="text-center">
              <p className="text-xs text-tandemi-neutral-gray">{t("goal_details.progress")}</p>
              <p className="font-semibold">${goal.progress.toFixed(0)}</p>
            </div>
            
            <div className="text-right">
              <p className="text-xs text-tandemi-neutral-gray">{t("goal_details.remaining")}</p>
              <p className="font-semibold">${remainingAmount.toFixed(0)}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <Tabs
          defaultValue="overview"
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
              <p className="text-tandemi-neutral-gray text-sm mb-4">{goal.description}</p>
              
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
      
      {activeTab === "contributions" && (
        <div className="fixed bottom-4 left-0 right-0 flex justify-center">
          <Button
            className="button-primary mx-auto max-w-lg px-8"
            onClick={() => navigate(`/goal/${id}/contribute`)}
          >
            <DollarSign className="h-4 w-4 mr-1" />
            {t("goal_details.log_contribution")}
          </Button>
        </div>
      )}
    </div>
  );
};

export default GoalDetailPage;
