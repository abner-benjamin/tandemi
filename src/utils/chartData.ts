
// Utility function to generate contribution data for charts
export const generateContributionData = () => {
  // Get contributions from sessionStorage if available
  const storedContributions = sessionStorage.getItem('userContributions');
  let contributions = [];
  
  if (storedContributions) {
    contributions = JSON.parse(storedContributions);
  }
  
  // Define week ranges
  const weekRanges = [
    { name: "Week 1", start: new Date("2023-05-01"), end: new Date("2023-05-07") },
    { name: "Week 2", start: new Date("2023-05-08"), end: new Date("2023-05-14") },
    { name: "Week 3", start: new Date("2023-05-15"), end: new Date("2023-05-21") },
    { name: "Week 4", start: new Date("2023-05-22"), end: new Date("2023-05-28") },
    { name: "Week 5", start: new Date("2023-05-29"), end: new Date("2023-06-04") }
  ];
  
  // If we have no contributions from storage, use these default values
  if (contributions.length === 0) {
    return [
      { week: "Week 1", amount: 950 }, // Lucas $500 + Alex $400 + Sofia $50
      { week: "Week 2", amount: 660 }, // Sofia $500 + Elena $100 + Carlos $60
      { week: "Week 3", amount: 545 }, // María $350 + Mateo $75 + Alex $120
      { week: "Week 4", amount: 590 }, // Alex $500 + Elena $90
      { week: "Week 5", amount: 690 }  // Lucas $500 + Lucas $80 + María $110
    ];
  }
  
  // Initialize week totals
  const weekTotals = weekRanges.map(week => ({ 
    week: week.name, 
    amount: 0 
  }));
  
  // Map contributions to appropriate weeks
  contributions.forEach(contribution => {
    const contributionDate = new Date(contribution.date);
    const weekIndex = weekRanges.findIndex(week => 
      contributionDate >= week.start && contributionDate <= week.end
    );
    
    if (weekIndex !== -1) {
      weekTotals[weekIndex].amount += Number(contribution.amount);
    }
  });
  
  return weekTotals;
};

// Calculate total contributions
export const calculateTotalContributions = (data: { amount: number }[]) => {
  return data.reduce((total, item) => total + item.amount, 0);
};

// Get contributions by goal id
export const getContributionsByGoalId = (goalId: string, contributions: any[]) => {
  return contributions.filter(c => c.goalId === goalId);
};

// Calculate total amount for a specific goal
export const calculateGoalTotal = (goalId: string, contributions: any[]) => {
  const goalContributions = getContributionsByGoalId(goalId, contributions);
  return goalContributions.reduce((total, item) => total + item.amount, 0);
};
