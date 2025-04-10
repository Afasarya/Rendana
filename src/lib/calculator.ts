import { BUFFER_CASH_MULTIPLIER, CONTINGENCY_PERCENTAGE, getRecommendation } from './constants';

// Define types
export interface PropertyCost {
  id: string;
  category: string;
  location: string;
  monthlyRent: number;
  quantity: number;
  unit: string;
  annualRent?: number;
  notes?: string;
}

export interface CapitalExpense {
  id: string;
  category: string;
  item: string;
  unitPrice: number;
  quantity: number;
  unit: string;
  totalCost?: number;
  notes?: string;
}

export interface Inventory {
  id: string;
  category: string;
  item: string;
  unitPrice: number;
  quantity: number;
  unit: string;
  totalCost?: number;
  notes?: string;
}

export interface OperationalCost {
  id: string;
  category: string;
  item: string;
  monthlyCost: number;
  quantity: number;
  unit: string;
  totalCost?: number;
  notes?: string;
}

export interface TicketBasedRevenue {
  averageTicketSize: number;
  dailyTickets: number;
  dailyRevenue?: number;
  monthlyRevenue?: number;
  mdrPercentage: number;
  totalTransactionFee?: number;
  cogsPercentage: number;
  totalRawMaterials?: number;
}

export interface QuantityBasedRevenue {
  unitPrice: number;
  dailyQuantity: number;
  dailyRevenue?: number;
  monthlyRevenue?: number;
  mdrPercentage: number;
  totalTransactionFee?: number;
  cogsPercentage: number;
  totalRawMaterials?: number;
}

export interface BusinessCalculation {
  businessName: string;
  businessModel: 'ticket' | 'quantity';
  propertyCosts: PropertyCost[];
  capitalExpenses: CapitalExpense[];
  inventory: Inventory[];
  operationalCosts: OperationalCost[];
  ticketBasedRevenue?: TicketBasedRevenue;
  quantityBasedRevenue?: QuantityBasedRevenue;
}

export interface CalculationResults {
  totalPropertyCosts: number;
  totalCapitalExpenses: number;
  totalInventory: number;
  totalMonthlyOperationalCosts: number;
  bufferCash: number;
  totalInitialInvestment: number;
  monthlyRevenue: number;
  monthlyTransactionFee: number;
  monthlyRawMaterialsCost: number;
  monthlyNetProfit: number;
  paybackPeriodMonths: number;
  paybackPeriodYears: number;
  recommendation: {
    label: string;
    description: string;
    color: string;
  };
}

// Calculate totals for property costs
export const calculatePropertyCosts = (propertyCosts: PropertyCost[]): PropertyCost[] => {
  return propertyCosts.map(cost => ({
    ...cost,
    annualRent: cost.monthlyRent * cost.quantity * 12
  }));
};

// Calculate totals for capital expenses
export const calculateCapitalExpenses = (expenses: CapitalExpense[]): CapitalExpense[] => {
  return expenses.map(expense => ({
    ...expense,
    totalCost: expense.unitPrice * expense.quantity
  }));
};

// Calculate totals for inventory
export const calculateInventory = (inventory: Inventory[]): Inventory[] => {
  return inventory.map(item => ({
    ...item,
    totalCost: item.unitPrice * item.quantity
  }));
};

// Calculate totals for operational costs
export const calculateOperationalCosts = (costs: OperationalCost[]): OperationalCost[] => {
  return costs.map(cost => ({
    ...cost,
    totalCost: cost.monthlyCost * cost.quantity
  }));
};

// Calculate ticket-based revenue
export const calculateTicketBasedRevenue = (revenue: TicketBasedRevenue): TicketBasedRevenue => {
  const dailyRevenue = revenue.averageTicketSize * revenue.dailyTickets;
  const monthlyRevenue = dailyRevenue * 30; // Assuming 30 days per month
  const totalTransactionFee = monthlyRevenue * (revenue.mdrPercentage / 100);
  const totalRawMaterials = monthlyRevenue * (revenue.cogsPercentage / 100);
  
  return {
    ...revenue,
    dailyRevenue,
    monthlyRevenue,
    totalTransactionFee,
    totalRawMaterials
  };
};

// Calculate quantity-based revenue
export const calculateQuantityBasedRevenue = (revenue: QuantityBasedRevenue): QuantityBasedRevenue => {
  const dailyRevenue = revenue.unitPrice * revenue.dailyQuantity;
  const monthlyRevenue = dailyRevenue * 30; // Assuming 30 days per month
  const totalTransactionFee = monthlyRevenue * (revenue.mdrPercentage / 100);
  const totalRawMaterials = monthlyRevenue * (revenue.cogsPercentage / 100);
  
  return {
    ...revenue,
    dailyRevenue,
    monthlyRevenue,
    totalTransactionFee,
    totalRawMaterials
  };
};

// Calculate full business results
export const calculateBusinessResults = (data: BusinessCalculation): CalculationResults => {
  // Calculate totals for property costs
  const calculatedPropertyCosts = calculatePropertyCosts(data.propertyCosts);
  const totalPropertyCosts = calculatedPropertyCosts.reduce((sum, cost) => sum + (cost.annualRent || 0), 0);
  
  // Calculate totals for capital expenses
  const calculatedCapitalExpenses = calculateCapitalExpenses(data.capitalExpenses);
  const subtotalCapitalExpenses = calculatedCapitalExpenses.reduce((sum, expense) => sum + (expense.totalCost || 0), 0);
  // Add contingency (typically 10% of capital expenses)
  const contingencyAmount = subtotalCapitalExpenses * (CONTINGENCY_PERCENTAGE / 100);
  const totalCapitalExpenses = subtotalCapitalExpenses + contingencyAmount;
  
  // Calculate totals for inventory
  const calculatedInventory = calculateInventory(data.inventory);
  const totalInventory = calculatedInventory.reduce((sum, item) => sum + (item.totalCost || 0), 0);
  
  // Calculate totals for operational costs
  const calculatedOperationalCosts = calculateOperationalCosts(data.operationalCosts);
  const totalMonthlyOperationalCosts = calculatedOperationalCosts.reduce((sum, cost) => sum + (cost.totalCost || 0), 0);
  
  // Calculate buffer cash (typically 3x monthly operational costs)
  const bufferCash = totalMonthlyOperationalCosts * BUFFER_CASH_MULTIPLIER;
  
  // Calculate total initial investment
  const totalInitialInvestment = totalCapitalExpenses + totalInventory + bufferCash + (totalPropertyCosts / 12); // One month of property cost
  
  // Calculate revenue based on business model
  let monthlyRevenue = 0;
  let monthlyTransactionFee = 0;
  let monthlyRawMaterialsCost = 0;
  
  if (data.businessModel === 'ticket' && data.ticketBasedRevenue) {
    const calculatedRevenue = calculateTicketBasedRevenue(data.ticketBasedRevenue);
    monthlyRevenue = calculatedRevenue.monthlyRevenue || 0;
    monthlyTransactionFee = calculatedRevenue.totalTransactionFee || 0;
    monthlyRawMaterialsCost = calculatedRevenue.totalRawMaterials || 0;
  } else if (data.businessModel === 'quantity' && data.quantityBasedRevenue) {
    const calculatedRevenue = calculateQuantityBasedRevenue(data.quantityBasedRevenue);
    monthlyRevenue = calculatedRevenue.monthlyRevenue || 0;
    monthlyTransactionFee = calculatedRevenue.totalTransactionFee || 0;
    monthlyRawMaterialsCost = calculatedRevenue.totalRawMaterials || 0;
  }
  
  // Calculate monthly net profit
  const monthlyNetProfit = monthlyRevenue - monthlyTransactionFee - monthlyRawMaterialsCost - totalMonthlyOperationalCosts - (totalPropertyCosts / 12);
  
  // Calculate payback period (in months and years)
  const paybackPeriodMonths = monthlyNetProfit > 0 ? totalInitialInvestment / monthlyNetProfit : Infinity;
  const paybackPeriodYears = paybackPeriodMonths / 12;
  
  // Get recommendation based on payback period
  const recommendation = getRecommendation(paybackPeriodMonths);
  
  return {
    totalPropertyCosts,
    totalCapitalExpenses,
    totalInventory,
    totalMonthlyOperationalCosts,
    bufferCash,
    totalInitialInvestment,
    monthlyRevenue,
    monthlyTransactionFee,
    monthlyRawMaterialsCost,
    monthlyNetProfit,
    paybackPeriodMonths,
    paybackPeriodYears,
    recommendation
  };
};

// Calculate cost breakdown percentages for charts
export const calculateCostBreakdown = (results: CalculationResults) => {
  const totalInvestment = results.totalInitialInvestment;
  
  return [
    {
      name: 'Modal Awal',
      value: results.totalCapitalExpenses,
      percentage: (results.totalCapitalExpenses / totalInvestment) * 100
    },
    {
      name: 'Inventaris Awal',
      value: results.totalInventory,
      percentage: (results.totalInventory / totalInvestment) * 100
    },
    {
      name: 'Buffer Cash',
      value: results.bufferCash,
      percentage: (results.bufferCash / totalInvestment) * 100
    },
    {
      name: 'Sewa Awal',
      value: results.totalPropertyCosts / 12, // One month of property cost
      percentage: ((results.totalPropertyCosts / 12) / totalInvestment) * 100
    }
  ];
};

// Calculate monthly cash flow for ROI chart
export const calculateCashFlow = (results: CalculationResults, months: number = 36) => {
  const cashFlow = [];
  let cumulativeProfit = -results.totalInitialInvestment; // Start with negative (investment)
  
  for (let i = 1; i <= months; i++) {
    cumulativeProfit += results.monthlyNetProfit;
    cashFlow.push({
      month: i,
      profit: results.monthlyNetProfit,
      cumulativeProfit: cumulativeProfit
    });
  }
  
  return cashFlow;
};