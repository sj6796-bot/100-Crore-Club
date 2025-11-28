import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  TrendingUp, 
  Landmark, 
  Building2, 
  Briefcase, 
  LineChart, 
  ShieldCheck, 
  CreditCard,
  ChevronRight,
  Wallet,
  Percent,
  AlertCircle
} from 'lucide-react';
import { 
  MUTUAL_FUNDS, 
  FIXED_DEPOSITS, 
  DEBENTURES, 
  PMS_AIF, 
  UNLISTED, 
  INSURANCE, 
  CARDS 
} from '../data';
import { ProductCategory, Product } from '../types';
import { Card, SectionHeader } from '../components/ui/Card';
import { formatCurrency, formatPercentage } from '../utils';

const ProductList: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const decodedCategory = decodeURIComponent(category || '') as ProductCategory;

  // Helper to fetch data based on category
  const getProducts = (): Product[] => {
    switch (decodedCategory) {
      case ProductCategory.MUTUAL_FUNDS: return MUTUAL_FUNDS;
      case ProductCategory.FIXED_DEPOSITS: return FIXED_DEPOSITS;
      case ProductCategory.DEBENTURES: return DEBENTURES;
      case ProductCategory.PMS_AIF: return PMS_AIF;
      case ProductCategory.UNLISTED_STOCKS: return UNLISTED;
      case ProductCategory.INSURANCE: return INSURANCE;
      case ProductCategory.CREDIT_CARDS: return CARDS;
      default: return [];
    }
  };

  const products = getProducts();
  const handleBack = () => navigate('/');

  return (
    <div>
      <button 
        onClick={handleBack} 
        className="flex items-center text-neutral-500 hover:text-gold-400 mb-8 transition-colors text-sm uppercase tracking-widest font-semibold group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Categories
      </button>

      <SectionHeader title={decodedCategory} subtitle={`Browse top rated ${decodedCategory.toLowerCase()}`} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {products.map((product) => (
          <StandardProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

// --- Standardized Card Component ---
interface Metric {
  label: string;
  value: string | number | React.ReactNode;
  highlight?: boolean;
}

const StandardProductCard: React.FC<{ product: Product }> = ({ product }) => {
  
  // 1. Map Product Data to Standard Format
  let icon = TrendingUp;
  let subtitle = '';
  let metrics: Metric[] = [];

  switch (product.type) {
    case 'fund':
      icon = TrendingUp;
      subtitle = product.amc;
      metrics = [
        { label: '3Y Returns', value: formatPercentage(product.returns3y), highlight: true },
        { label: 'Risk', value: product.risk },
        { label: 'AUM', value: product.aum },
      ];
      break;

    case 'fd':
      icon = Landmark;
      subtitle = product.bankName;
      metrics = [
        { label: 'Interest Rate', value: formatPercentage(product.rate), highlight: true },
        { label: 'Tenure', value: product.tenure },
        { label: 'Min Inv.', value: formatCurrency(product.minInvestment) },
      ];
      break;

    case 'debenture':
      icon = Building2;
      subtitle = 'Corporate Debt';
      metrics = [
        { label: 'Buy Yield', value: formatPercentage(product.buyYield), highlight: true },
        { label: 'Coupon', value: formatPercentage(product.coupon) },
        { label: 'Rating', value: product.creditRating },
      ];
      break;

    case 'pms':
      icon = Briefcase;
      subtitle = product.amc;
      metrics = [
        { label: 'CAGR', value: formatPercentage(product.performanceCAGR), highlight: true },
        { label: 'Min Ticket', value: formatCurrency(product.minTicket) },
        { label: 'Strategy', value: product.strategy },
      ];
      break;

    case 'unlisted':
      icon = LineChart;
      subtitle = product.industry;
      metrics = [
        { label: 'LTP', value: formatCurrency(product.ltp), highlight: true },
        { label: 'Growth', value: product.growthPotential },
        { label: 'Sector', value: product.industry },
      ];
      break;

    case 'insurance':
      icon = ShieldCheck;
      subtitle = product.provider;
      metrics = [
        { label: 'Cover', value: product.coverage, highlight: true },
        { label: 'Premium', value: `${formatCurrency(product.premium)}/yr` },
        { label: 'Type', value: product.insuranceType },
      ];
      break;

    case 'card':
      icon = CreditCard;
      subtitle = product.provider;
      metrics = [
        { label: 'Est. Rewards', value: product.rewards.slice(0, 10) + '...', highlight: true },
        { label: 'Annual Fee', value: formatCurrency(product.yearlyFee) },
        { label: 'Best For', value: product.bestFor[0] },
      ];
      break;
  }

  const IconComponent = icon;

  // 2. Render Uniform Card Layout
  return (
    <Card className="group relative flex flex-col h-full min-h-[220px] transition-all duration-300">
       {/* Top Section: Icon & Header */}
       <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center group-hover:border-gold-500/50 group-hover:shadow-[0_0_15px_rgba(168,139,44,0.15)] transition-all duration-300">
                <IconComponent className="w-6 h-6 text-gold-500" />
             </div>
             <div>
               <h3 className="text-lg font-serif font-medium text-neutral-100 leading-tight group-hover:text-gold-200 transition-colors">
                 {product.name}
               </h3>
               <p className="text-xs text-neutral-500 mt-1 uppercase tracking-wider font-semibold">
                 {subtitle}
               </p>
             </div>
          </div>
       </div>

       {/* Middle Section: Metrics Grid */}
       <div className="grid grid-cols-3 gap-2 py-4 border-t border-neutral-900 border-b mb-4 flex-grow">
          {metrics.map((m, idx) => (
            <div key={idx} className={`flex flex-col ${idx !== 0 ? 'border-l border-neutral-900 pl-2' : ''}`}>
              <span className="text-[10px] text-neutral-600 uppercase tracking-wider mb-1">{m.label}</span>
              <span className={`text-sm font-medium font-mono truncate ${m.highlight ? 'text-gold-400' : 'text-neutral-300'}`}>
                {m.value}
              </span>
            </div>
          ))}
       </div>

       {/* Bottom Section: Action */}
       <div className="flex items-center justify-between mt-auto">
          <div className="flex gap-2">
             {/* Optional Tags could go here */}
          </div>
          <div className="flex items-center text-xs text-gold-600/70 group-hover:text-gold-500 font-semibold uppercase tracking-widest transition-colors">
             View Details <ChevronRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
       </div>
    </Card>
  );
};

export default ProductList;