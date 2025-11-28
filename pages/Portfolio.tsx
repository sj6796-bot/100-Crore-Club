import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { PORTFOLIO } from '../data';
import { Card, SectionHeader } from '../components/ui/Card';
import { formatCurrency, formatPercentage } from '../utils';
import { ProductCategory } from '../types';

// Gold/Premium Color Palette for Chart
const COLORS = [
  '#D4AF37', // Gold 500
  '#F7EFC0', // Gold 100
  '#856D22', // Gold 700
  '#AA8C2C', // Gold 600
  '#463912', // Gold 900
  '#E6CF53', // Gold 300
];

const Portfolio: React.FC = () => {
  const [showAnnualized, setShowAnnualized] = useState(false);

  // Aggregation for Chart
  const categoryData = PORTFOLIO.reduce((acc, item) => {
    const existing = acc.find(x => x.name === item.category);
    if (existing) {
      existing.value += item.currentValue;
    } else {
      acc.push({ name: item.category, value: item.currentValue });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  const totalInvested = PORTFOLIO.reduce((sum, item) => sum + item.investedAmount, 0);
  const totalValue = PORTFOLIO.reduce((sum, item) => sum + item.currentValue, 0);
  const totalGain = totalValue - totalInvested;
  const absReturn = (totalGain / totalInvested) * 100;

  return (
    <div className="space-y-10">
      <SectionHeader title="Portfolio Summary" subtitle="Total asset overview and performance metrics" />

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-[#0f0f0f] border-t-2 border-t-gold-500">
          <p className="text-neutral-500 text-xs font-semibold uppercase tracking-[0.2em] mb-3">Current Net Worth</p>
          <h3 className="text-4xl font-serif text-white">{formatCurrency(totalValue)}</h3>
        </Card>
        
        <Card className="bg-[#0f0f0f] border-t-2 border-t-neutral-700">
          <p className="text-neutral-500 text-xs font-semibold uppercase tracking-[0.2em] mb-3">Total Capital Invested</p>
          <h3 className="text-3xl font-serif text-neutral-300">{formatCurrency(totalInvested)}</h3>
        </Card>

        <Card className="bg-[#0f0f0f] border-t-2 border-t-green-600/50">
          <div className="relative z-10">
             <div className="flex justify-between items-start mb-2">
              <p className="text-neutral-500 text-xs font-semibold uppercase tracking-[0.2em]">Total Gains</p>
              <div className="flex items-center gap-2 bg-black border border-neutral-800 p-0.5 rounded">
                <button 
                  className={`text-[10px] px-2 py-0.5 rounded ${!showAnnualized ? 'bg-neutral-800 text-gold-400' : 'text-neutral-600'}`}
                  onClick={() => setShowAnnualized(false)}
                >
                  ABS
                </button>
                 <button 
                  className={`text-[10px] px-2 py-0.5 rounded ${showAnnualized ? 'bg-neutral-800 text-gold-400' : 'text-neutral-600'}`}
                  onClick={() => setShowAnnualized(true)}
                >
                  XIRR
                </button>
              </div>
             </div>
            <h3 className="text-3xl font-serif text-green-500">
              {showAnnualized ? '14.2%' : formatPercentage(absReturn)}
            </h3>
            <p className="text-green-600/60 text-sm mt-1 font-mono tracking-tight">+{formatCurrency(totalGain)}</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <Card className="lg:col-span-1 min-h-[400px] flex flex-col">
          <h3 className="text-lg font-serif text-neutral-200 mb-6 border-b border-neutral-800 pb-2">Asset Allocation</h3>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#000000', borderColor: '#333', color: '#D4AF37', fontFamily: 'serif' }}
                  itemStyle={{ color: '#fff' }}
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Legend 
                  layout="horizontal" 
                  verticalAlign="bottom" 
                  align="center"
                  wrapperStyle={{ paddingTop: '20px', fontSize: '11px', color: '#a3a3a3' }}
                  iconSize={8}
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Holdings Table */}
        <Card className="lg:col-span-2 overflow-hidden flex flex-col">
          <h3 className="text-lg font-serif text-neutral-200 mb-6 border-b border-neutral-800 pb-2">Current Holdings</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-neutral-400">
              <thead className="text-xs font-semibold text-gold-700/60 uppercase tracking-widest">
                <tr>
                  <th className="pb-4 pl-2">Product</th>
                  <th className="pb-4 text-right">Invested</th>
                  <th className="pb-4 text-right">Current</th>
                  <th className="pb-4 text-right pr-2">Gain/Loss</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900">
                {PORTFOLIO.map((item) => (
                  <tr key={item.id} className="group hover:bg-neutral-900/50 transition-colors">
                    <td className="py-4 pl-2">
                      <div className="font-medium text-neutral-200 group-hover:text-gold-400 transition-colors">{item.productName}</div>
                      <div className="text-[10px] text-neutral-600 uppercase tracking-wider">{item.category}</div>
                    </td>
                    <td className="py-4 text-right font-mono text-neutral-500">{formatCurrency(item.investedAmount)}</td>
                    <td className="py-4 text-right font-mono font-medium text-neutral-200">{formatCurrency(item.currentValue)}</td>
                    <td className="py-4 text-right pr-2">
                      <div className={`font-medium font-mono ${item.gainLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {item.gainLoss >= 0 ? '+' : ''}{formatCurrency(item.gainLoss)}
                      </div>
                      <div className={`text-[10px] ${item.gainLoss >= 0 ? 'text-green-500/50' : 'text-red-500/50'}`}>
                        {item.gainLoss >= 0 ? '+' : ''}{formatPercentage(item.gainLossPercentage)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Portfolio;