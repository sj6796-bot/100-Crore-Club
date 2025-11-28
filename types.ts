export enum ProductCategory {
  MUTUAL_FUNDS = 'Mutual Funds',
  FIXED_DEPOSITS = 'Fixed Deposits',
  DEBENTURES = 'Debentures',
  PMS_AIF = 'PMS & AIF',
  UNLISTED_STOCKS = 'Unlisted Stocks',
  INSURANCE = 'Insurance',
  CREDIT_CARDS = 'Credit Card Advisory'
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  image: string;
}

export interface BaseProduct {
  id: string;
  name: string;
  category: ProductCategory;
}

// Product Specific Interfaces
export interface MutualFund extends BaseProduct {
  type: 'fund';
  subCategory: string; // Large Cap, Mid Cap, etc.
  amc: string;
  returns1y: number;
  returns3y: number;
  returns5y: number;
  risk: 'Low' | 'Moderate' | 'High' | 'Very High';
  aum: string;
}

export interface FixedDeposit extends BaseProduct {
  type: 'fd';
  bankName: string;
  tenure: string;
  rate: number;
  seniorRate: number;
  minInvestment: number;
}

export interface Debenture extends BaseProduct {
  type: 'debenture';
  coupon: number;
  maturityDate: string;
  buyYield: number;
  creditRating: string;
}

export interface PmsAif extends BaseProduct {
  type: 'pms';
  amc: string;
  strategy: string; // Equity, Debt, etc.
  minTicket: number;
  performanceCAGR: number;
}

export interface UnlistedStock extends BaseProduct {
  type: 'unlisted';
  industry: string;
  ltp: number;
  growthPotential: string;
}

export interface InsurancePlan extends BaseProduct {
  type: 'insurance';
  insuranceType: 'Health' | 'Term' | 'Vehicle';
  provider: string;
  premium: number;
  coverage: string;
  features: string[]; // Generic feature list (Hospital network, Claim ratio, Add-ons)
}

export interface CreditCard extends BaseProduct {
  type: 'card';
  provider: string;
  yearlyFee: number;
  bestFor: string[]; // Travel, Lifestyle, etc.
  rewards: string;
}

export type Product = MutualFund | FixedDeposit | Debenture | PmsAif | UnlistedStock | InsurancePlan | CreditCard;

export interface PortfolioItem {
  id: string;
  productName: string;
  category: ProductCategory;
  investedAmount: number;
  currentValue: number;
  gainLoss: number;
  gainLossPercentage: number;
}

export interface Order {
  id: string;
  date: string;
  productName: string;
  category: ProductCategory;
  amount: number;
  status: 'Executed' | 'Pending' | 'Failed';
  transactionId: string;
}

export interface ReportItem {
  id: string;
  asset: string;
  category: string;
  invested: number;
  marketValue: number;
  unrealizedGL: number;
}

export interface CapitalGainItem {
  id: string;
  asset: string;
  ltcg: number;
  stcg: number;
  realized: boolean;
}