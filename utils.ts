export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatPercentage = (value: number) => {
  return `${value.toFixed(2)}%`;
};

export const getRiskColor = (risk: string) => {
  switch (risk.toLowerCase()) {
    case 'low': return 'text-green-500';
    case 'moderate': return 'text-yellow-500';
    case 'high': return 'text-orange-500';
    case 'very high': return 'text-red-500';
    default: return 'text-gray-400';
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'Executed': return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'Pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case 'Failed': return 'bg-red-500/20 text-red-400 border-red-500/30';
    default: return 'bg-gray-500/20 text-gray-400';
  }
};