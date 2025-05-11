
// Utility function to generate contribution data for charts
export const generateContributionData = () => {
  return [
    { week: "Week 1", amount: 400 },
    { week: "Week 2", amount: 250 },
    { week: "Week 3", amount: 0 },
    { week: "Week 4", amount: 350 },
    { week: "Week 5", amount: 500 }
  ];
};

// Calculate total contributions
export const calculateTotalContributions = (data: { amount: number }[]) => {
  return data.reduce((total, item) => total + item.amount, 0);
};
