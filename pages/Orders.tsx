import React from 'react';
import { ORDERS } from '../data';
import { Card, SectionHeader, Badge } from '../components/ui/Card';
import { formatCurrency, getStatusColor } from '../utils';

const Orders: React.FC = () => {
  return (
    <div>
      <SectionHeader title="Order History" subtitle="Track the status of your recent transactions" />
      
      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/50 uppercase text-xs font-semibold text-slate-500 border-b border-slate-800">
              <tr>
                <th className="p-5">Date</th>
                <th className="p-5">Product Details</th>
                <th className="p-5 text-right">Amount</th>
                <th className="p-5">Status</th>
                <th className="p-5 text-right">Transaction ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {ORDERS.map((order) => (
                <tr key={order.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-5 whitespace-nowrap text-slate-400">{order.date}</td>
                  <td className="p-5">
                    <div className="font-medium text-slate-100 text-base">{order.productName}</div>
                    <Badge color="bg-slate-800 text-slate-500 border-slate-700 mt-1 inline-block">{order.category}</Badge>
                  </td>
                  <td className="p-5 text-right font-mono text-slate-200 font-medium">
                    {formatCurrency(order.amount)}
                  </td>
                  <td className="p-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-5 text-right text-xs font-mono text-slate-500">
                    {order.transactionId}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Orders;