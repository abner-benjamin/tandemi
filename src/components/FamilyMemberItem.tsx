
import { Heart } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

type FamilyMemberItemProps = {
  name: string;
  role: string;
  contactMethod: string;
  contactValue: string;
};

const FamilyMemberItem = ({ name, role, contactMethod, contactValue }: FamilyMemberItemProps) => {
  const { t } = useLanguage();
  
  const getRoleBadge = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-purple-100 text-purple-600";
      case "contributor":
        return "bg-blue-100 text-blue-600";
      case "viewer":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm mb-3 flex items-center">
      <div className="bg-tandemi-soft-pink rounded-full p-2 mr-3">
        <Heart className="h-5 w-5 text-tandemi-pink" />
      </div>
      
      <div className="flex-1">
        <p className="font-medium">{name}</p>
        <p className="text-sm text-tandemi-neutral-gray">
          {contactMethod}: {contactValue}
        </p>
      </div>
      
      <span className={`px-3 py-1 rounded-full text-xs ${getRoleBadge(role)}`}>
        {t(`family.role.${role.toLowerCase()}`)}
      </span>
    </div>
  );
};

export default FamilyMemberItem;
