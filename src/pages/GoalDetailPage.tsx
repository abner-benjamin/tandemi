
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useLanguage } from "../contexts/LanguageContext";
import BackButton from "../components/BackButton";
import ContributionItem from "../components/ContributionItem";
import FamilyMemberItem from "../components/FamilyMemberItem";
import { Button } from "@/components/ui/button";
import { DollarSign, Heart } from "lucide-react";

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

// Sample contributions data
const sampleContributions = [
  {
    id: "c1",
    goalId: "1",
    amount: 500,
    date: new Date("2023-05-15"),
    type: "Remittance",
    purpose: "Medical",
    contributor: "Juan Perez",
    note: "Monthly contribution from salary",
  },
  {
    id: "c2",
    goalId: "1",
    amount: 250,
    date: new Date("2023-05-02"),
    type: "Cash",
    purpose: "Medical",
    contributor: "Maria Rodriguez",
  },
  {
    id: "c3",
    goalId: "1",
    amount: 1000,
    date: new Date("2023-04-10"),
    type: "Gift",
    purpose: "Medical",
    contributor: "The López Family",
    note: "Family collection at reunion",
  },
  {
    id: "c4",
    goalId: "2",
    amount: 500,
    date: new Date("2023-05-12"),
    type: "Remittance",
    purpose: "Education",
    contributor: "Ana Gomez",
  },
  {
    id: "c5",
    goalId: "2",
    amount: 400,
    date: new Date("2023-05-01"),
    type: "Cash",
    purpose: "Education",
    contributor: "Carlos Diaz",
  },
  {
    id: "c6",
    goalId: "3",
    amount: 1000,
    date: new Date("2023-05-10"),
    type: "Remittance",
    purpose: "Housing",
    contributor: "Roberto Flores",
  },
  {
    id: "c7",
    goalId: "3",
    amount: 600,
    date: new Date("2023-04-20"),
    type: "Cash",
    purpose: "Housing",
    contributor: "Lucia Morales",
    note: "From the savings account",
  },
];

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
  
  const goal = sampleGoals.find((g) => g.id === id);
  const goalContributions = sampleContributions.filter((c) => c.goalId === id);
  const goalFamilyMembers = sampleFamilyMembers.filter((f) => f.goalId === id);
  
  if (!goal) {
    return <div>Goal not found</div>;
  }

  const progressPercentage = Math.min(100, (goal.progress / goal.amount) * 100);
  const remainingAmount = Math.max(0, goal.amount - goal.progress);

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
                  <p className="font-medium">{goal.dueDate.toLocaleDateString()}</p>
                </div>
                
                <div>
                  <p className="text-xs text-tandemi-neutral-gray">{t("category." + goal.category.toLowerCase())}</p>
                  <p className="font-medium">{goal.category}</p>
                </div>
              </div>
            </div>
            
            <h3 className="font-semibold mb-2">{t("goal_details.contributions")}</h3>
            <div className="space-y-3 max-h-60 overflow-y-auto no-scrollbar">
              {goalContributions.slice(0, 2).map((contribution) => (
                <ContributionItem
                  key={contribution.id}
                  id={contribution.id}
                  amount={contribution.amount}
                  date={contribution.date}
                  type={contribution.type}
                  purpose={contribution.purpose}
                  contributor={contribution.contributor}
                  note={contribution.note}
                />
              ))}
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
              {goalContributions.map((contribution) => (
                <ContributionItem
                  key={contribution.id}
                  id={contribution.id}
                  amount={contribution.amount}
                  date={contribution.date}
                  type={contribution.type}
                  purpose={contribution.purpose}
                  contributor={contribution.contributor}
                  note={contribution.note}
                />
              ))}
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
