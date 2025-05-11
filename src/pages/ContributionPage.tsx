
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import BackButton from "../components/BackButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Calendar, DollarSign } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ContributionPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  
  // Get goals from sessionStorage
  const [goals, setGoals] = useState(() => {
    const storedGoals = sessionStorage.getItem('userGoals');
    if (storedGoals) {
      return JSON.parse(storedGoals);
    }
    return [];
  });
  
  const goal = goals.find((g) => g.id === id);
  
  // Get contributions from sessionStorage
  const [contributions, setContributions] = useState(() => {
    const storedContributions = sessionStorage.getItem('userContributions');
    if (storedContributions) {
      return JSON.parse(storedContributions);
    }
    return [];
  });
  
  const [formData, setFormData] = useState({
    amount: "",
    date: new Date().toISOString().split("T")[0],
    type: "",
    purpose: "",
    note: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!goal) {
      toast({
        title: "Error",
        description: "Goal not found",
        variant: "destructive"
      });
      return;
    }
    
    // Create new contribution
    const newContribution = {
      id: `contribution-${Date.now()}`,
      goalId: id,
      amount: parseFloat(formData.amount),
      date: new Date(formData.date),
      type: formData.type || "Cash",
      purpose: formData.purpose || "Other",
      contributor: "You",
      note: formData.note || "",
    };
    
    // Add contribution to session storage
    const updatedContributions = [...contributions, newContribution];
    sessionStorage.setItem('userContributions', JSON.stringify(updatedContributions));
    setContributions(updatedContributions);
    
    // Update goal progress
    const updatedGoals = goals.map(g => {
      if (g.id === id) {
        return {
          ...g,
          progress: g.progress + parseFloat(formData.amount)
        };
      }
      return g;
    });
    
    // Update goals in session storage
    sessionStorage.setItem('userGoals', JSON.stringify(updatedGoals));
    setGoals(updatedGoals);
    
    setIsSuccess(true);
    
    setTimeout(() => {
      navigate(`/goal/${id}`);
    }, 2000);
  };
  
  if (!goal) {
    return (
      <div className="min-h-screen bg-tandemi-light-gray p-4 flex flex-col items-center justify-center animate-fade-in max-w-lg mx-auto">
        <div className="bg-white rounded-2xl p-6 shadow-md w-full max-w-md text-center">
          <h1 className="text-xl font-bold mb-2">{t("common.error")}</h1>
          <p className="mb-6">{t("common.goal_not_found")}</p>
          <Button 
            className="button-primary" 
            onClick={() => navigate("/dashboard")}
          >
            {t("common.return_to_dashboard")}
          </Button>
        </div>
      </div>
    );
  }
  
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-tandemi-light-gray p-4 flex flex-col items-center justify-center animate-fade-in max-w-lg mx-auto">
        <div className="bg-white rounded-2xl p-6 shadow-md w-full max-w-md text-center">
          <div className="mx-auto bg-green-100 text-green-600 rounded-full w-16 h-16 flex items-center justify-center mb-4 animate-progress-celebration">
            <Check className="h-8 w-8" />
          </div>
          
          <h1 className="text-2xl font-bold mb-2">{t("contribution.success")}</h1>
          <p className="text-tandemi-neutral-gray mb-6">${formData.amount} to {goal.name}</p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              variant="outline" 
              className="button-secondary flex-1" 
              onClick={() => {
                setIsSuccess(false);
                setFormData({
                  amount: "",
                  date: new Date().toISOString().split("T")[0],
                  type: "",
                  purpose: "",
                  note: "",
                });
              }}
            >
              {t("contribution.add_another")}
            </Button>
            <Button 
              className="button-primary flex-1" 
              onClick={() => navigate(`/goal/${id}`)}
            >
              {t("family.return_to_goal")}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-tandemi-light-gray animate-fade-in max-w-lg mx-auto">
      <div className="p-4 flex items-center">
        <BackButton className="mr-auto" />
        <h1 className="text-lg font-bold mr-auto">{t("contribution.title")}</h1>
        <div className="w-10"></div> {/* Spacer for centering title */}
      </div>
      
      <div className="p-4">
        <div className="bg-white rounded-2xl p-4 card-shadow mb-4">
          <h3 className="font-semibold">{goal.name}</h3>
          <div className="flex justify-between text-sm mt-2">
            <span className="text-tandemi-neutral-gray">
              {t("goal_details.progress")}
            </span>
            <span className="font-medium">${goal.progress} / ${goal.amount}</span>
          </div>
          <div className="w-full bg-tandemi-soft-gray rounded-full h-2 mt-1">
            <div 
              className="bg-tandemi-pink h-2 rounded-full" 
              style={{ width: `${Math.min(100, (goal.progress / goal.amount) * 100)}%` }}
            ></div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="amount" className="flex items-center">
              <DollarSign className="h-4 w-4 mr-1" />
              {t("contribution.amount")}
            </Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              placeholder="0.00"
              className="input-field mt-1"
              required
              value={formData.amount}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <Label htmlFor="date" className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {t("contribution.date")}
            </Label>
            <Input
              id="date"
              name="date"
              type="date"
              className="input-field mt-1"
              required
              value={formData.date}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <Label htmlFor="type">{t("contribution.type")}</Label>
            <Select onValueChange={(value) => handleSelectChange("type", value)}>
              <SelectTrigger className="input-field mt-1">
                <SelectValue placeholder={t("contribution.type")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">{t("contribution.type.cash")}</SelectItem>
                <SelectItem value="remittance">{t("contribution.type.remittance")}</SelectItem>
                <SelectItem value="gift">{t("contribution.type.gift")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="purpose">{t("contribution.purpose")}</Label>
            <Select onValueChange={(value) => handleSelectChange("purpose", value)}>
              <SelectTrigger className="input-field mt-1">
                <SelectValue placeholder={t("contribution.purpose")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="groceries">{t("contribution.purpose.groceries")}</SelectItem>
                <SelectItem value="medical">{t("contribution.purpose.medical")}</SelectItem>
                <SelectItem value="rent">{t("contribution.purpose.rent")}</SelectItem>
                <SelectItem value="education">{t("contribution.purpose.education")}</SelectItem>
                <SelectItem value="celebration">{t("contribution.purpose.celebration")}</SelectItem>
                <SelectItem value="other">{t("contribution.purpose.other")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="note">{t("contribution.note")}</Label>
            <Textarea
              id="note"
              name="note"
              className="input-field mt-1"
              value={formData.note}
              onChange={handleChange}
            />
          </div>
          
          <Button type="submit" className="button-primary w-full">
            {t("common.save")}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContributionPage;
