import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { Calendar, Check } from "lucide-react";
import BackButton from "../components/BackButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const CreateGoalPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    date: "",
    category: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  // Get helper text for selected category
  const getCategoryHelper = (category: string) => {
    if (!category) return "";
    return t(`category.${category.toLowerCase()}.helper`);
  };

  // Format number with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a new goal object
    const newGoal = {
      id: `new-${Date.now()}`, // Create a unique ID
      name: formData.name,
      category: formData.category || "Other",
      amount: parseFloat(formData.amount) || 0,
      progress: 0, // New goals start with 0 progress
      dueDate: formData.date || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
      description: formData.description || "No description provided",
    };
    
    // Add new goal to sessionStorage
    const storedGoals = sessionStorage.getItem('userGoals');
    let updatedGoals = [];
    
    if (storedGoals) {
      updatedGoals = JSON.parse(storedGoals);
    } else {
      // Initialize with sample goals if this is first time
      updatedGoals = [
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
    }
    
    // Add new goal to the beginning of array
    updatedGoals.unshift(newGoal);
    
    // Save to sessionStorage
    sessionStorage.setItem('userGoals', JSON.stringify(updatedGoals));
    
    setIsSuccess(true);
    
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  };
  
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-tandemi-light-gray p-4 flex flex-col items-center justify-center animate-fade-in max-w-lg mx-auto">
        <div className="bg-white rounded-2xl p-6 shadow-md w-full max-w-md text-center">
          <div className="mx-auto bg-green-100 text-green-600 rounded-full w-16 h-16 flex items-center justify-center mb-4">
            <Check className="h-8 w-8" />
          </div>
          
          <h1 className="text-2xl font-bold mb-2">{t("create_goal.success")}</h1>
          <p className="text-tandemi-neutral-gray mb-6">{formData.name}</p>
          
          <Button 
            className="button-primary w-full" 
            onClick={() => navigate("/dashboard")}
          >
            {t("family.return_to_goal")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-tandemi-light-gray animate-fade-in max-w-lg mx-auto">
      <div className="p-4 flex items-center">
        <BackButton className="mr-auto" />
        <h1 className="text-lg font-bold mr-auto">{t("create_goal.title")}</h1>
        <div className="w-10"></div> {/* Spacer for centering title */}
      </div>
      
      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name">{t("create_goal.name")}</Label>
            <Input
              id="name"
              name="name"
              placeholder={t("create_goal.name_placeholder")}
              className="input-field mt-1"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <Label htmlFor="amount">{t("create_goal.amount")}</Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              placeholder={t("create_goal.amount_placeholder")}
              className="input-field mt-1"
              required
              value={formData.amount}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <Label htmlFor="date">{t("create_goal.date")}</Label>
            <div className="relative">
              <Input
                id="date"
                name="date"
                type="date"
                className="input-field mt-1"
                required
                value={formData.date}
                onChange={handleChange}
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
          
          <div>
            <Label htmlFor="category">{t("create_goal.category")}</Label>
            <Select onValueChange={(value) => handleSelectChange("category", value)}>
              <SelectTrigger className="input-field mt-1">
                <SelectValue placeholder={t("create_goal.category_placeholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Medical">{t("category.medical")}</SelectItem>
                <SelectItem value="Education">{t("category.education")}</SelectItem>
                <SelectItem value="Housing">{t("category.housing")}</SelectItem>
                <SelectItem value="Travel">{t("category.travel")}</SelectItem>
                <SelectItem value="Emergency">{t("category.emergency")}</SelectItem>
                <SelectItem value="Groceries">{t("category.groceries")}</SelectItem>
                <SelectItem value="Bills">{t("category.bills")}</SelectItem>
                <SelectItem value="Celebration">{t("category.celebration")}</SelectItem>
                <SelectItem value="Childcare">{t("category.childcare")}</SelectItem>
                <SelectItem value="Migration">{t("category.migration")}</SelectItem>
                <SelectItem value="Other">{t("category.other")}</SelectItem>
              </SelectContent>
            </Select>
            {formData.category && (
              <p className="text-sm text-tandemi-neutral-gray mt-2">
                {getCategoryHelper(formData.category)}
              </p>
            )}
          </div>
          
          <div>
            <Label htmlFor="description">{t("create_goal.description")}</Label>
            <Textarea
              id="description"
              name="description"
              placeholder={t("create_goal.description_placeholder")}
              className="input-field mt-1"
              value={formData.description}
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

export default CreateGoalPage;
