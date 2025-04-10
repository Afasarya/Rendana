'use client';

import { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { formatCurrency } from '@/lib/constants';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ROIChartProps {
  data: {
    month: number;
    profit: number;
    cumulativeProfit: number;
  }[];
  breakEvenMonths: number;
}

export function ROIChart({ data, breakEvenMonths }: ROIChartProps) {
  const chartData: ChartData<'line'> = useMemo(() => {
    return {
      labels: data.map(item => `Bulan ${item.month}`),
      datasets: [
        {
          label: 'Keuntungan Kumulatif',
          data: data.map(item => item.cumulativeProfit),
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          tension: 0.3,
          fill: false,
        },
        {
          label: 'Titik Impas (Balik Modal)',
          data: data.map(() => 0),
          borderColor: 'rgb(107, 114, 128)',
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderDash: [5, 5],
          pointRadius: 0,
        },
      ],
    };
  }, [data]);

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += formatCurrency(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          callback: function(value) {
            return formatCurrency(value as number);
          }
        }
      },
    },
    elements: {
      point: {
        radius: 3,
        hoverRadius: 5,
      },
    },
    animation: {
      duration: 1000,
    },
  };

  // Find the break-even point annotation
  const breakEvenPoint = Math.round(breakEvenMonths);
  
  if (breakEvenPoint > 0 && breakEvenPoint <= data.length) {
    // Add annotation for break-even point
    const breakEvenAnnotation = {
      type: 'line' as const,
      xMin: breakEvenPoint - 1,
      xMax: breakEvenPoint - 1,
      borderColor: 'rgb(34, 197, 94)',
      borderWidth: 2,
      borderDash: [5, 5],
      label: {
        display: true,
        content: `Balik Modal: Bulan ${breakEvenPoint}`,
        position: 'top' as const,
      },
    };
    
    // @ts-expect-error - TypeScript doesn't recognize the annotation property
    
    options.plugins.annotation = {
      annotations: {
        breakEven: breakEvenAnnotation,
      },
    };
  }

  return <Line options={options} data={chartData} />;
}