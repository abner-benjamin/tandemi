
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import BackButton from "../components/BackButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Heart } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// Sample data for the goals
const sampleGoals = [
  {
    id: "1",
    name: "Abuelita's Surgery Fund",
    category: "Medical",
    amount: 2500,
    progress: 1750,
  },
  {
    id: "2",
    name: "Spring Tuition for Sofia",
    category: "Education",
    amount: 1800,
    progress: 900,
  },
  {
    id: "3",
    name: "House Repair in Puebla",
    category: "Housing",
    amount: 3000,
    progress: 2100,
  }
];

const InviteFamilyPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isSuccess, setIsSuccess] = useState(false);
  
  const goal = sampleGoals.find((g) => g.id === id);
  
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    contactMethod: "",
    contactValue: "",
    message: "",
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
    setIsSuccess(true);
    
    setTimeout(() => {
      navigate(`/goal/${id}?tab=family`);
    }, 2000);
  };
  
  if (!goal) {
    return <div>Goal not found</div>;
  }
  
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-tandemi-light-gray p-4 flex flex-col items-center justify-center animate-fade-in max-w-lg mx-auto">
        <div className="bg-white rounded-2xl p-6 shadow-md w-full max-w-md text-center">
          <div className="mx-auto bg-green-100 text-green-600 rounded-full w-16 h-16 flex items-center justify-center mb-4">
            <Check className="h-8 w-8" />
          </div>
          
          <h1 className="text-xl font-bold mb-2">{t("family.invitation_sent")}</h1>
          <p className="text-tandemi-neutral-gray mb-6">{formData.name}</p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              variant="outline" 
              className="button-secondary flex-1" 
              onClick={() => {
                setIsSuccess(false);
                setFormData({
                  name: "",
                  role: "",
                  contactMethod: "",
                  contactValue: "",
                  message: "",
                });
              }}
            >
              {t("family.add_another")}
            </Button>
            <Button 
              className="button-primary flex-1" 
              onClick={() => navigate(`/goal/${id}?tab=family`)}
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
        <h1 className="text-lg font-bold mr-auto">{t("family.invite")}</h1>
        <div className="w-10"></div> {/* Spacer for centering title */}
      </div>
      
      <div className="p-4">
        <div className="bg-white rounded-2xl p-4 card-shadow mb-4">
          <h3 className="font-semibold">{goal.name}</h3>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name" className="flex items-center">
              <Heart className="h-4 w-4 mr-1 text-tandemi-pink" />
              {t("family.name")}
            </Label>
            <Input
              id="name"
              name="name"
              className="input-field mt-1"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <Label htmlFor="role">{t("family.role")}</Label>
            <Select onValueChange={(value) => handleSelectChange("role", value)}>
              <SelectTrigger className="input-field mt-1">
                <SelectValue placeholder={t("family.role")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">{t("family.role.admin")}</SelectItem>
                <SelectItem value="contributor">{t("family.role.contributor")}</SelectItem>
                <SelectItem value="viewer">{t("family.role.viewer")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="contactMethod">{t("family.contact")}</Label>
            <Select onValueChange={(value) => handleSelectChange("contactMethod", value)}>
              <SelectTrigger className="input-field mt-1">
                <SelectValue placeholder={t("family.contact")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">{t("family.contact.email")}</SelectItem>
                <SelectItem value="phone">{t("family.contact.phone")}</SelectItem>
                <SelectItem value="whatsapp">{t("family.contact.whatsapp")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {formData.contactMethod && (
            <div>
              <Label htmlFor="contactValue">{t(`family.contact.${formData.contactMethod}`)}</Label>
              <Input
                id="contactValue"
                name="contactValue"
                type={formData.contactMethod === "email" ? "email" : "tel"}
                className="input-field mt-1"
                required
                value={formData.contactValue}
                onChange={handleChange}
              />
            </div>
          )}
          
          <div>
            <Label htmlFor="message">{t("family.message")}</Label>
            <Textarea
              id="message"
              name="message"
              className="input-field mt-1"
              value={formData.message}
              onChange={handleChange}
            />
          </div>
          
          <Button type="submit" className="button-primary w-full">
            {t("common.send")}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default InviteFamilyPage;
