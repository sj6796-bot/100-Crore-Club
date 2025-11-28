import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { HOLDINGS_REPORT, GAINS_REPORT } from '../data';
import { Card, SectionHeader } from '../components/ui/Card';
import { formatCurrency } from '../utils';

const Reports: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'holdings' | 'gains'>('holdings');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <SectionHeader title="Financial Reports" subtitle="Generate and download detailed statements" />
        
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('holdings')}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'holdings' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Holdings Report
          </button>
          <button
            onClick={() => setActiveTab('gains')}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'gains' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Capital Gains
          </button>
        </div>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="flex justify-end p-4 border-b border-slate-800 bg-slate-950/30">
          <button className="flex items-center gap-2 text-sm text-amber-500 hover:text-amber-400 font-medium">
            <Download size={16} /> Download Excel
          </button>
        </div>

        <div className="overflow-x-auto">
          {activeTab === 'holdings' ? (
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/50 uppercase text-xs font-semibold text-slate-500">
                <tr>
                  <th className="p-4">Asset Name</th>
                  <th className="p-4">Category</th>
                  <th className="p-4 text-right">Invested Value</th>
                  <th className="p-4 text-right">Market Value</th>
                  <th className="p-4 text-right">Unrealized G/L</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {HOLDINGS_REPORT.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/30">
                    <td className="p-4 font-medium text-slate-100">{item.asset}</td>
                    <td className="p-4 text-slate-400">{item.category}</td>
                    <td className="p-4 text-right font-mono">{formatCurrency(item.invested)}</td>
                    <td className="p-4 text-right font-mono text-slate-100">{formatCurrency(item.marketValue)}</td>
                    <td className={`p-4 text-right font-mono ${item.unrealizedGL > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {formatCurrency(item.unrealizedGL)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/50 uppercase text-xs font-semibold text-slate-500">
                <tr>
                  <th className="p-4">Asset Name</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">LTCG</th>
                  <th className="p-4 text-right">STCG</th>
                  <th className="p-4 text-right">Total Gain</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {GAINS_REPORT.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/30">
                    <td className="p-4 font-medium text-slate-100">{item.asset}</td>
                    <td className="p-4">
                      <span className={`text-xs px-2 py-1 rounded border ${item.realized ? 'border-blue-500/30 text-blue-400 bg-blue-500/10' : 'border-slate-600 text-slate-400'}`}>
                        {item.realized ? 'Realized' : 'Unrealized'}
                      </span>
                    </td>
                    <td className="p-4 text-right font-mono">{formatCurrency(item.ltcg)}</td>
                    <td className="p-4 text-right font-mono">{formatCurrency(item.stcg)}</td>
                    <td className="p-4 text-right font-mono font-bold text-green-400">{formatCurrency(item.ltcg + item.stcg)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Reports;