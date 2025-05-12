
import { useEffect, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { formatNumber } from "../utils/formatters";
import { generateContributionData, calculateTotalContributions, calculateAllContributions } from "../utils/chartData";
import { 
  ChartContainer,
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { 
  Area, 
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { Separator } from "@/components/ui/separator";

const FamilyContributionsChart = () => {
  const { t, language } = useLanguage();
  const [chartData, setChartData] = useState(generateContributionData());
  const [totalContributions, setTotalContributions] = useState(0);
  
  // Re-generate chart data when localStorage or sessionStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const newData = generateContributionData();
      setChartData(newData);
      
      // Get all contributions to calculate total
      const storedContributions = sessionStorage.getItem('userContributions');
      if (storedContributions) {
        const contributions = JSON.parse(storedContributions);
        setTotalContributions(calculateAllContributions(contributions));
      } else {
        // If no contributions in storage, calculate from chart data
        setTotalContributions(calculateTotalContributions(newData));
      }
    };
    
    // Run once on mount
    handleStorageChange();
    
    // Listen for storage events
    window.addEventListener('storage', handleStorageChange);
    
    // Check periodically - reduced to every 500ms for better responsiveness
    const interval = setInterval(handleStorageChange, 500);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);
  
  // Format week labels based on language
  const formattedData = chartData.map(item => ({
    ...item,
    week: language === "en" 
      ? item.week.replace("Week", "Wk") 
      : item.week.replace("Week", "Sem.")
  }));
  
  return (
    <div className="bg-white rounded-2xl p-4 card-shadow mb-6 mt-6">
      <h3 className="text-base font-semibold mb-2">
        {t("dashboard.contributions_chart_title")}
      </h3>
      
      <div className="w-full">
        <ChartContainer
          config={{
            area: {
              theme: {
                light: "#1976D2",
                dark: "#1976D2"
              }
            }
          }}
        >
          <AreaChart 
            data={formattedData} 
            margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
            height={160}
          >
            <defs>
              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1976D2" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#1976D2" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="week" 
              tick={{ fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              dy={5}
            />
            <YAxis 
              tick={{ fontSize: 10 }} 
              tickFormatter={(value) => `$${value}`}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-2 border border-gray-200 shadow-md rounded-md">
                      <p className="text-xs font-medium">{data.week}</p>
                      <p className="text-xs text-blue-600">${formatNumber(data.amount)}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area 
              type="monotone" 
              dataKey="amount" 
              stroke="#1976D2" 
              fillOpacity={1} 
              fill="url(#colorAmount)" 
            />
          </AreaChart>
        </ChartContainer>
      </div>
      
      <div className="mt-0">
        <Separator className="bg-gray-200" />
      </div>
      
      <p className="text-left text-sm mt-3 font-medium">
        <span className="text-blue-600">${formatNumber(totalContributions)}</span> <span className="text-tandemi-neutral-gray">{t("dashboard.total_contributions")}</span>
      </p>
    </div>
  );
};

export default FamilyContributionsChart;
