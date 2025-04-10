'use client';

import { useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { 
  BuildingOfficeIcon, 
  BanknotesIcon, 
  ArchiveBoxIcon,
  CurrencyDollarIcon,
  TruckIcon,
  CalculatorIcon,
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon 
} from '@heroicons/react/24/outline';

import { Card } from '@/components/ui/Card';
import { ResultItem, ResultsCard } from '@/components/ui/ResultsCard';
import { 
  BusinessCalculation, 
  CalculationResults, 
  calculateBusinessResults, 
  calculateCashFlow, 
  calculateCostBreakdown 
} from '@/lib/calculator';
import { ROIChart } from '@/components/charts/ROIChart';
import { CostBreakdown } from '@/components/charts/CostBreakdown';
import { BusinessCalculatorForm } from '@/lib/validation';

// Define types for cost breakdown and cash flow
interface CostBreakdownItem {
  name: string;
  value: number;
  percentage: number;
}

interface CashFlowItem {
  month: number;
  profit: number;
  cumulativeProfit: number;
}

export function Results() {
  const { control } = useFormContext<BusinessCalculatorForm>();
  const [resultsVisible, setResultsVisible] = useState(false);
  const [calculationResults, setCalculationResults] = useState<CalculationResults | null>(null);
  const [costBreakdown, setCostBreakdown] = useState<CostBreakdownItem[]>([]);
  const [cashFlow, setCashFlow] = useState<CashFlowItem[]>([]);

  // Watch all the relevant fields for calculation
  const formValues = useWatch({ control });

  useEffect(() => {
    // Check if we have enough data to calculate results
    const hasPropertyCosts = formValues.propertyCosts && formValues.propertyCosts.length > 0;
    const hasCapitalExpenses = formValues.capitalExpenses && formValues.capitalExpenses.length > 0;
    const hasOperationalCosts = formValues.operationalCosts && formValues.operationalCosts.length > 0;
    
    let hasRevenue = false;
    if (formValues.businessModel === 'ticket' && formValues.ticketBasedRevenue) {
      hasRevenue = 
        !!formValues.ticketBasedRevenue.averageTicketSize && 
        !!formValues.ticketBasedRevenue.dailyTickets;
    } else if (formValues.businessModel === 'quantity' && formValues.quantityBasedRevenue) {
      hasRevenue = 
        !!formValues.quantityBasedRevenue.unitPrice && 
        !!formValues.quantityBasedRevenue.dailyQuantity;
    }
    
    if ((hasPropertyCosts || hasCapitalExpenses) && hasOperationalCosts && hasRevenue) {
      try {
        // Cast formValues to BusinessCalculation type
        const businessData = formValues as unknown as BusinessCalculation;
        
        // Calculate business results
        const results = calculateBusinessResults(businessData);
        setCalculationResults(results);
        
        // Calculate cost breakdown for chart
        const breakdown = calculateCostBreakdown(results);
        setCostBreakdown(breakdown);
        
        // Calculate cash flow for ROI chart
        const flow = calculateCashFlow(results);
        setCashFlow(flow);
        
        // Show results section
        setResultsVisible(true);
      } catch (error) {
        console.error('Error calculating results:', error);
        setResultsVisible(false);
      }
    } else {
      setResultsVisible(false);
    }
  }, [formValues]);

  if (!resultsVisible || !calculationResults) {
    return null;
  }

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-6">Hasil Analisis</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <ResultsCard title="Rincian Investasi" className="mb-6">
            <ResultItem 
              label="Total Sewa Tempat (Tahunan)" 
              value={calculationResults.totalPropertyCosts} 
              icon={<BuildingOfficeIcon className="h-5 w-5" />}
              isCurrency
            />
            <ResultItem 
              label="Total Modal Awal" 
              value={calculationResults.totalCapitalExpenses} 
              icon={<BanknotesIcon className="h-5 w-5" />}
              isCurrency
            />
            <ResultItem 
              label="Total Inventaris Awal" 
              value={calculationResults.totalInventory} 
              icon={<ArchiveBoxIcon className="h-5 w-5" />}
              isCurrency
            />
            <ResultItem 
              label="Total Operasional Bulanan" 
              value={calculationResults.totalMonthlyOperationalCosts} 
              icon={<TruckIcon className="h-5 w-5" />}
              isCurrency
            />
            <ResultItem 
              label="Buffer Cash (3x Operasional)" 
              value={calculationResults.bufferCash} 
              icon={<CalculatorIcon className="h-5 w-5" />}
              isCurrency
            />
            <ResultItem 
              label="Total Investasi Awal" 
              value={calculationResults.totalInitialInvestment} 
              icon={<CurrencyDollarIcon className="h-5 w-5" />}
              valueColor="text-primary font-bold"
              isCurrency
              isHighlighted
            />
          </ResultsCard>
          
          <ResultsCard title="Proyeksi Keuntungan Bulanan">
            <ResultItem 
              label="Pendapatan Bulanan" 
              value={calculationResults.monthlyRevenue} 
              valueColor="text-green-600"
              isCurrency
            />
            <ResultItem 
              label="Fee Transaksi Online" 
              value={calculationResults.monthlyTransactionFee} 
              valueColor="text-red-500"
              isCurrency
            />
            <ResultItem 
              label="Biaya Bahan Baku" 
              value={calculationResults.monthlyRawMaterialsCost} 
              valueColor="text-red-500"
              isCurrency
            />
            <ResultItem 
              label="Biaya Operasional" 
              value={calculationResults.totalMonthlyOperationalCosts} 
              valueColor="text-red-500"
              isCurrency
            />
            <ResultItem 
              label="Biaya Sewa Bulanan" 
              value={calculationResults.totalPropertyCosts / 12} 
              valueColor="text-red-500"
              isCurrency
            />
            <ResultItem 
              label="Keuntungan Bersih Bulanan" 
              value={calculationResults.monthlyNetProfit} 
              valueColor={calculationResults.monthlyNetProfit > 0 ? "text-green-600 font-bold" : "text-red-600 font-bold"}
              isCurrency
              isHighlighted
            />
          </ResultsCard>
        </div>
        
        <div>
          <Card className="mb-6">
            <h3 className="font-bold text-xl mb-4">Rincian Biaya Investasi</h3>
            <div className="h-72">
              <CostBreakdown data={costBreakdown} />
            </div>
          </Card>
          
          <Card className="mb-6">
            <h3 className="font-bold text-xl mb-4">Proyeksi Balik Modal</h3>
            <div className="h-72">
              <ROIChart data={cashFlow} breakEvenMonths={calculationResults.paybackPeriodMonths} />
            </div>
          </Card>
          
          <ResultsCard title="Estimasi Balik Modal & Rekomendasi">
            <ResultItem 
              label="Waktu Balik Modal (bulan)" 
              value={calculationResults.paybackPeriodMonths.toFixed(1)} 
              icon={<ClockIcon className="h-5 w-5" />}
            />
            <ResultItem 
              label="Waktu Balik Modal (tahun)" 
              value={calculationResults.paybackPeriodYears.toFixed(2)} 
              icon={<ChartBarIcon className="h-5 w-5" />}
            />
            <div className="py-4">
              <div className={`p-4 rounded-lg flex items-start space-x-3 ${
                calculationResults.recommendation.color === 'success' 
                  ? 'bg-green-50 text-green-800' 
                  : calculationResults.recommendation.color === 'warning'
                    ? 'bg-yellow-50 text-yellow-800'
                    : 'bg-red-50 text-red-800'
              }`}>
                {calculationResults.recommendation.color === 'success' ? (
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" />
                ) : (
                  <ExclamationTriangleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className="font-semibold mb-1">
                    Rekomendasi: {calculationResults.recommendation.label}
                  </h4>
                  <p className="text-sm">
                    {calculationResults.recommendation.description}
                  </p>
                </div>
              </div>
            </div>
          </ResultsCard>
        </div>
      </div>
    </div>
  );
}