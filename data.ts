import { 
  ProductCategory, 
  Testimonial, 
  MutualFund, 
  FixedDeposit, 
  Debenture, 
  PmsAif, 
  UnlistedStock, 
  InsurancePlan, 
  CreditCard,
  PortfolioItem,
  Order,
  ReportItem,
  CapitalGainItem
} from './types';

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Vikram Malhotra",
    role: "CEO, TechFlow Systems",
    quote: "100 Crore Club has completely transformed how I view wealth preservation. The access to unlisted equity is unparalleled.",
    image: "https://picsum.photos/100/100?random=1"
  },
  {
    id: 2,
    name: "Dr. Anjali Gupta",
    role: "Chief Surgeon, Apollo",
    quote: "Their PMS strategies have consistently outperformed the market. A truly premium experience for serious investors.",
    image: "https://picsum.photos/100/100?random=2"
  },
  {
    id: 3,
    name: "Rajesh Singhania",
    role: "Founder, BuildRight Infra",
    quote: "The detailed reports and transparent fee structure make them the most trustworthy partner in my financial journey.",
    image: "https://picsum.photos/100/100?random=3"
  }
];

export const MUTUAL_FUNDS: MutualFund[] = [
  { id: 'mf1', category: ProductCategory.MUTUAL_FUNDS, type: 'fund', name: "Axis Bluechip Fund", amc: "Axis Mutual Fund", subCategory: "Large Cap", returns1y: 12.5, returns3y: 15.2, returns5y: 14.8, risk: "Moderate", aum: "₹ 34,000 Cr" },
  { id: 'mf2', category: ProductCategory.MUTUAL_FUNDS, type: 'fund', name: "Quant Small Cap Fund", amc: "Quant Mutual Fund", subCategory: "Small Cap", returns1y: 45.3, returns3y: 32.1, returns5y: 28.5, risk: "Very High", aum: "₹ 8,000 Cr" },
  { id: 'mf3', category: ProductCategory.MUTUAL_FUNDS, type: 'fund', name: "Parag Parikh Flexi Cap", amc: "PPFAS", subCategory: "Flexi Cap", returns1y: 22.1, returns3y: 24.5, returns5y: 21.0, risk: "High", aum: "₹ 48,000 Cr" },
  { id: 'mf4', category: ProductCategory.MUTUAL_FUNDS, type: 'fund', name: "HDFC Balanced Advantage", amc: "HDFC Mutual Fund", subCategory: "Hybrid", returns1y: 18.2, returns3y: 19.5, returns5y: 16.2, risk: "Moderate", aum: "₹ 55,000 Cr" },
];

export const FIXED_DEPOSITS: FixedDeposit[] = [
  { id: 'fd1', category: ProductCategory.FIXED_DEPOSITS, type: 'fd', name: "Bajaj Finance FD", bankName: "Bajaj Finserv", tenure: "44 Months", rate: 8.60, seniorRate: 8.85, minInvestment: 15000 },
  { id: 'fd2', category: ProductCategory.FIXED_DEPOSITS, type: 'fd', name: "Shriram Transport FD", bankName: "Shriram Finance", tenure: "60 Months", rate: 9.10, seniorRate: 9.60, minInvestment: 5000 },
  { id: 'fd3', category: ProductCategory.FIXED_DEPOSITS, type: 'fd', name: "HDFC Bank FD", bankName: "HDFC Bank", tenure: "36 Months", rate: 7.20, seniorRate: 7.70, minInvestment: 10000 },
];

export const DEBENTURES: Debenture[] = [
  { id: 'db1', category: ProductCategory.DEBENTURES, type: 'debenture', name: "Muthoot Finance NCD", coupon: 9.00, maturityDate: "2026-12-31", buyYield: 9.25, creditRating: "AA+" },
  { id: 'db2', category: ProductCategory.DEBENTURES, type: 'debenture', name: "Piramal Capital NCD", coupon: 9.50, maturityDate: "2025-06-15", buyYield: 10.10, creditRating: "AA" },
];

export const PMS_AIF: PmsAif[] = [
  { id: 'pms1', category: ProductCategory.PMS_AIF, type: 'pms', name: "Marcellus Consistent Compounders", amc: "Marcellus", strategy: "Equity - Long Term", minTicket: 5000000, performanceCAGR: 19.5 },
  { id: 'pms2', category: ProductCategory.PMS_AIF, type: 'pms', name: "WhiteOak India Pioneers", amc: "WhiteOak", strategy: "Equity - Flexi", minTicket: 5000000, performanceCAGR: 21.0 },
  { id: 'aif1', category: ProductCategory.PMS_AIF, type: 'pms', name: "Kedara Capital Fund II", amc: "Kedara", strategy: "Private Equity", minTicket: 10000000, performanceCAGR: 25.5 },
];

export const UNLISTED: UnlistedStock[] = [
  { id: 'ul1', category: ProductCategory.UNLISTED_STOCKS, type: 'unlisted', name: "NSE India", industry: "Financial Services", ltp: 4200, growthPotential: "High (IPO Expected)" },
  { id: 'ul2', category: ProductCategory.UNLISTED_STOCKS, type: 'unlisted', name: "Swiggy", industry: "Food Tech", ltp: 350, growthPotential: "Moderate" },
  { id: 'ul3', category: ProductCategory.UNLISTED_STOCKS, type: 'unlisted', name: "Reliance Retail", industry: "Retail", ltp: 1500, growthPotential: "High" },
];

export const INSURANCE: InsurancePlan[] = [
  { id: 'ins1', category: ProductCategory.INSURANCE, type: 'insurance', insuranceType: 'Health', name: "Niva Bupa ReAssure 2.0", provider: "Niva Bupa", premium: 25000, coverage: "₹ 1 Cr", features: ["Unlimited Reinstatement", "No Claim Bonus 100%", "Cashless Network"] },
  { id: 'ins2', category: ProductCategory.INSURANCE, type: 'insurance', insuranceType: 'Term', name: "Tata AIA Sampoorna Raksha", provider: "Tata AIA", premium: 45000, coverage: "₹ 5 Cr", features: ["99.1% Claim Ratio", "Whole Life Cover", "Return of Premium"] },
  { id: 'ins3', category: ProductCategory.INSURANCE, type: 'insurance', insuranceType: 'Vehicle', name: "ICICI Lombard Motor Protect", provider: "ICICI Lombard", premium: 12000, coverage: "Comprehensive", features: ["Zero Depreciation", "Engine Protect", "24x7 Assistance"] },
];

export const CARDS: CreditCard[] = [
  { id: 'cc1', category: ProductCategory.CREDIT_CARDS, type: 'card', name: "Infinia Metal Edition", provider: "HDFC Bank", yearlyFee: 12500, bestFor: ["Luxury Travel", "Dining", "Rewards"], rewards: "3.3% Base Reward Rate" },
  { id: 'cc2', category: ProductCategory.CREDIT_CARDS, type: 'card', name: "Magnus", provider: "Axis Bank", yearlyFee: 10000, bestFor: ["Lounge Access", "Movies", "Milestones"], rewards: "25k Edge Points Monthly" },
  { id: 'cc3', category: ProductCategory.CREDIT_CARDS, type: 'card', name: "Emeralde", provider: "ICICI Bank", yearlyFee: 12000, bestFor: ["Lifestyle", "Golf", "Concierge"], rewards: "1% Unlimited Cash back" },
];

export const PORTFOLIO: PortfolioItem[] = [
  { id: 'pf1', productName: "Axis Bluechip Fund", category: ProductCategory.MUTUAL_FUNDS, investedAmount: 500000, currentValue: 750000, gainLoss: 250000, gainLossPercentage: 50.0 },
  { id: 'pf2', productName: "Quant Small Cap", category: ProductCategory.MUTUAL_FUNDS, investedAmount: 200000, currentValue: 350000, gainLoss: 150000, gainLossPercentage: 75.0 },
  { id: 'pf3', productName: "Bajaj Finance FD", category: ProductCategory.FIXED_DEPOSITS, investedAmount: 1000000, currentValue: 1150000, gainLoss: 150000, gainLossPercentage: 15.0 },
  { id: 'pf4', productName: "Marcellus CCP", category: ProductCategory.PMS_AIF, investedAmount: 5000000, currentValue: 6200000, gainLoss: 1200000, gainLossPercentage: 24.0 },
  { id: 'pf5', productName: "NSE India (Unlisted)", category: ProductCategory.UNLISTED_STOCKS, investedAmount: 2500000, currentValue: 4000000, gainLoss: 1500000, gainLossPercentage: 60.0 },
  { id: 'pf6', productName: "Muthoot NCD", category: ProductCategory.DEBENTURES, investedAmount: 500000, currentValue: 545000, gainLoss: 45000, gainLossPercentage: 9.0 },
];

export const ORDERS: Order[] = [
  { id: 'ord1', date: '2023-10-15', productName: 'Axis Bluechip Fund', category: ProductCategory.MUTUAL_FUNDS, amount: 50000, status: 'Executed', transactionId: 'TXN100293' },
  { id: 'ord2', date: '2023-10-18', productName: 'Bajaj Finance FD', category: ProductCategory.FIXED_DEPOSITS, amount: 100000, status: 'Executed', transactionId: 'TXN100294' },
  { id: 'ord3', date: '2023-10-20', productName: 'Quant Small Cap', category: ProductCategory.MUTUAL_FUNDS, amount: 25000, status: 'Pending', transactionId: 'TXN100295' },
  { id: 'ord4', date: '2023-09-01', productName: 'Tata AIA Term Plan', category: ProductCategory.INSURANCE, amount: 45000, status: 'Executed', transactionId: 'TXN100100' },
  { id: 'ord5', date: '2023-08-15', productName: 'Swiggy Unlisted', category: ProductCategory.UNLISTED_STOCKS, amount: 500000, status: 'Failed', transactionId: 'TXN100055' },
];

export const HOLDINGS_REPORT: ReportItem[] = [
  { id: 'r1', asset: "Axis Bluechip Fund", category: "Mutual Funds", invested: 500000, marketValue: 750000, unrealizedGL: 250000 },
  { id: 'r2', asset: "Quant Small Cap", category: "Mutual Funds", invested: 200000, marketValue: 350000, unrealizedGL: 150000 },
  { id: 'r3', asset: "Bajaj Finance FD", category: "Fixed Deposits", invested: 1000000, marketValue: 1150000, unrealizedGL: 150000 },
  { id: 'r4', asset: "Marcellus CCP", category: "PMS", invested: 5000000, marketValue: 6200000, unrealizedGL: 1200000 },
  { id: 'r5', asset: "NSE India", category: "Unlisted Equity", invested: 2500000, marketValue: 4000000, unrealizedGL: 1500000 },
];

export const GAINS_REPORT: CapitalGainItem[] = [
  { id: 'g1', asset: "HDFC Top 100 (Redeemed)", ltcg: 45000, stcg: 0, realized: true },
  { id: 'g2', asset: "Axis Bluechip Fund", ltcg: 200000, stcg: 50000, realized: false },
  { id: 'g3', asset: "Reliance Retail (Sold)", ltcg: 150000, stcg: 0, realized: true },
  { id: 'g4', asset: "Quant Small Cap", ltcg: 100000, stcg: 50000, realized: false },
];