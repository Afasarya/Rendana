import { ReactNode } from 'react';
import { formatCurrency } from '@/lib/constants';

interface ResultItemProps {
  label: string;
  value: string | number | ReactNode;
  valueColor?: string;
  icon?: ReactNode;
  isCurrency?: boolean;
  isHighlighted?: boolean;
}

export function ResultItem({
  label,
  value,
  valueColor = 'text-gray-900',
  icon,
  isCurrency = false,
  isHighlighted = false,
}: ResultItemProps) {
  const displayValue = typeof value === 'number' && isCurrency 
    ? formatCurrency(value)
    : value;
    
  return (
    <div className={`flex justify-between py-3 ${isHighlighted ? 'bg-blue-50 px-3 rounded-lg' : ''}`}>
      <div className="flex items-center gap-2">
        {icon && <span className="text-gray-500">{icon}</span>}
        <span className="text-gray-600">{label}</span>
      </div>
      <div className={`font-semibold ${valueColor}`}>{displayValue}</div>
    </div>
  );
}

interface ResultsCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function ResultsCard({ title, children, className = '' }: ResultsCardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      <div className="bg-primary px-4 py-3">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <div className="p-4 divide-y divide-gray-200">
        {children}
      </div>
    </div>
  );
}