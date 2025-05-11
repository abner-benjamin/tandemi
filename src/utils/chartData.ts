
// Utility function to generate contribution data for charts
export const generateContributionData = () => {
  return [
    { week: "Week 1", amount: 950 }, // Lucas $500 + Alex $400 + Sofia $50
    { week: "Week 2", amount: 660 }, // Sofia $500 + Elena $100 + Carlos $60
    { week: "Week 3", amount: 545 }, // María $350 + Mateo $75 + Alex $120
    { week: "Week 4", amount: 590 }, // Alex $500 + Elena $90
    { week: "Week 5", amount: 690 }  // Lucas $500 + Lucas $80 + María $110
  ];
};

// Calculate total contributions
export const calculateTotalContributions = (data: { amount: number }[]) => {
  return data.reduce((total, item) => total + item.amount, 0);
};
