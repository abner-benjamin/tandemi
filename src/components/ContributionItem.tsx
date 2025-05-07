
import { format } from "date-fns";
import { DollarSign } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

type ContributionItemProps = {
  id: string;
  amount: number;
  date: Date;
  type: string;
  purpose: string;
  contributor: string;
  note?: string;
};

const ContributionItem = ({ amount, date, type, purpose, contributor, note }: ContributionItemProps) => {
  const { t } = useLanguage();
  
  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "cash":
        return "bg-green-100 text-green-600";
      case "remittance":
        return "bg-blue-100 text-blue-600";
      case "gift":
        return "bg-purple-100 text-purple-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm mb-3">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <div className="bg-tandemi-soft-pink rounded-full p-2">
            <DollarSign className="h-5 w-5 text-tandemi-pink" />
          </div>
          <div>
            <p className="font-medium">${amount.toFixed(2)}</p>
            <p className="text-sm text-tandemi-neutral-gray">{contributor}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-tandemi-neutral-gray">{format(date, "MMM d, yyyy")}</p>
          <div className="flex gap-1 mt-1">
            <span className={`px-2 py-0.5 rounded-full text-xs ${getTypeColor(type)}`}>
              {t(`contribution.type.${type.toLowerCase()}`)}
            </span>
          </div>
        </div>
      </div>
      
      {note && (
        <div className="mt-2 text-sm border-t border-tandemi-soft-gray pt-2 text-gray-600">
          {note}
        </div>
      )}
    </div>
  );
};

export default ContributionItem;
