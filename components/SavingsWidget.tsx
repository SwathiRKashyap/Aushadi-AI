import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Medication } from '../types';
import { TrendingDown } from 'lucide-react';

interface SavingsWidgetProps {
  medications: Medication[];
}

export const SavingsWidget: React.FC<SavingsWidgetProps> = ({ medications }) => {
  if (!medications || !Array.isArray(medications) || medications.length === 0) {
    return null;
  }

  const parsePrice = (priceStr: string) => {
    if (!priceStr) return 0;
    const clean = priceStr.replace(/[^\d.]/g, '');
    return parseFloat(clean) || 0;
  };

  let totalBrandPrice = 0;
  let totalGenericPrice = 0;

  medications.forEach(med => {
    totalBrandPrice += parsePrice(med.brand_price_est);
    totalGenericPrice += parsePrice(med.jan_aushadhi_price_est);
  });

  const totalSavings = totalBrandPrice - totalGenericPrice;
  const savingsPercentage = totalBrandPrice > 0 
    ? Math.round((totalSavings / totalBrandPrice) * 100) 
    : 0;

  const data = [
    { name: 'Jan Aushadhi', value: totalGenericPrice, color: '#2E7D32' },
    { name: 'Savings', value: totalSavings, color: '#81C784' },
  ];

  if (totalBrandPrice === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-row items-center justify-between gap-2 sm:gap-6">
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">Estimated Savings</h3>
        <p className="text-xs sm:text-sm text-gray-500 mb-4 truncate">Based on PMBJP comparative pricing</p>
        
        <div className="flex flex-wrap items-baseline gap-2 mb-2">
          <span className="text-3xl sm:text-4xl font-bold text-[#2E7D32]">₹{totalSavings.toFixed(0)}</span>
          <span className="text-xs sm:text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full whitespace-nowrap">
            Save {savingsPercentage}%
          </span>
        </div>
        
        <div className="space-y-1.5 mt-4">
          <div className="flex justify-between items-center text-gray-400 text-[10px] sm:text-xs max-w-[160px] sm:max-w-none gap-2">
            <span>Market Price</span>
            <span className="line-through">₹{totalBrandPrice.toFixed(0)}</span>
          </div>
          <div className="flex justify-between items-center font-bold text-[#2E7D32] text-lg sm:text-xl max-w-[160px] sm:max-w-none gap-2">
            <span>Jan Aushadhi Price</span>
            <span>₹{totalGenericPrice.toFixed(0)}</span>
          </div>
        </div>
      </div>

      <div className="relative shrink-0 flex items-center justify-center">
        <div className="w-[120px] h-[120px] sm:w-[160px] sm:h-[160px]">
             <PieChart width={120} height={120} className="sm:hidden">
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={35}
                outerRadius={50}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
                startAngle={90}
                endAngle={-270}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-mobile-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
            
            <PieChart width={160} height={160} className="hidden sm:block">
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={65}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
                startAngle={90}
                endAngle={-270}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-desktop-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                  formatter={(value: number) => `₹${value.toFixed(0)}`}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
            </PieChart>
        </div>
        <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
           <TrendingDown className="w-5 h-5 sm:w-6 sm:h-6 text-[#2E7D32]" />
        </div>
      </div>
    </div>
  );
};