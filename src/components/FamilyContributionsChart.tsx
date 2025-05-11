
import { useLanguage } from "../contexts/LanguageContext";
import { formatNumber } from "../utils/formatters";
import { generateContributionData, calculateTotalContributions } from "../utils/chartData";
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

const FamilyContributionsChart = () => {
  const { t, language } = useLanguage();
  const data = generateContributionData();
  const totalContributions = calculateTotalContributions(data);
  
  return (
    <div className="bg-white rounded-2xl p-4 card-shadow mb-6">
      <h3 className="text-lg font-semibold mb-2">
        {t("dashboard.contributions_chart")}
      </h3>
      
      <div className="h-40 w-full">
        <ChartContainer
          config={{
            area: {
              theme: {
                light: "#9b87f5",
                dark: "#9b87f5"
              }
            }
          }}
        >
          <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <defs>
              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#9b87f5" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="week" 
              tick={{ fontSize: 10 }}
              tickLine={false}
              axisLine={false}
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
                      <p className="text-xs text-tandemi-pink">${formatNumber(data.amount)}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area 
              type="monotone" 
              dataKey="amount" 
              stroke="#9b87f5" 
              fillOpacity={1} 
              fill="url(#colorAmount)" 
            />
          </AreaChart>
        </ChartContainer>
      </div>
      
      <p className="text-center text-sm mt-2 text-tandemi-neutral-gray">
        ${formatNumber(totalContributions)} {t("dashboard.total_contributions")}
      </p>
    </div>
  );
};

export default FamilyContributionsChart;
