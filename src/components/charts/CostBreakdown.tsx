'use client';

import { useMemo } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { formatCurrency } from '@/lib/constants';

ChartJS.register(ArcElement, Tooltip, Legend);

interface CostBreakdownProps {
  data: {
    name: string;
    value: number;
    percentage: number;
  }[];
}

export function CostBreakdown({ data }: CostBreakdownProps) {
  const chartData: ChartData<'doughnut'> = useMemo(() => {
    return {
      labels: data.map(item => item.name),
      datasets: [
        {
          data: data.map(item => item.value),
          backgroundColor: [
            'rgba(59, 130, 246, 0.8)',   // blue-500
            'rgba(99, 102, 241, 0.8)',   // indigo-500
            'rgba(139, 92, 246, 0.8)',   // purple-500
            'rgba(236, 72, 153, 0.8)',   // pink-500
          ],
          borderColor: [
            'rgba(59, 130, 246, 1)',
            'rgba(99, 102, 241, 1)',
            'rgba(139, 92, 246, 1)',
            'rgba(236, 72, 153, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  }, [data]);

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          boxWidth: 15,
          padding: 15,
          generateLabels: (chart) => {
            const originalLabels = ChartJS.defaults.plugins.legend.labels.generateLabels!(chart);
            return originalLabels.map((label, i) => {
              const item = data[i];
              if (item) {
                label.text = `${item.name}: ${formatCurrency(item.value)} (${item.percentage.toFixed(1)}%)`;
              }
              return label;
            });
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw as number;
            const percentage = data[context.dataIndex]?.percentage || 0;
            return `${label}: ${formatCurrency(value)} (${percentage.toFixed(1)}%)`;
          }
        }
      }
    },
    cutout: '60%',
    animation: {
      animateRotate: true,
      animateScale: true,
    },
  };

  return <Doughnut options={options} data={chartData} />;
}