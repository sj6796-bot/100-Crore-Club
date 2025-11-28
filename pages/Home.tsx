import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  Landmark, 
  Briefcase, 
  LineChart, 
  Building2, 
  ShieldCheck, 
  CreditCard,
  ChevronRight,
  ArrowRight,
  Quote
} from 'lucide-react';
import { Card, SectionHeader } from '../components/ui/Card';
import { ProductCategory } from '../types';
import { TESTIMONIALS } from '../data';

const CategoryIconMap: Record<ProductCategory, React.ElementType> = {
  [ProductCategory.MUTUAL_FUNDS]: TrendingUp,
  [ProductCategory.FIXED_DEPOSITS]: Landmark,
  [ProductCategory.DEBENTURES]: Building2,
  [ProductCategory.PMS_AIF]: Briefcase,
  [ProductCategory.UNLISTED_STOCKS]: LineChart,
  [ProductCategory.INSURANCE]: ShieldCheck,
  [ProductCategory.CREDIT_CARDS]: CreditCard,
};

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const categories = Object.values(ProductCategory);

  return (
    <div className="space-y-16">
      
      {/* Hero / Testimonial Section */}
      <section className="relative rounded-2xl overflow-hidden bg-neutral-900 border border-gold-900/10 group">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-0 p-10 opacity-5 transition-opacity duration-1000 group-hover:opacity-10">
          <GemPattern />
        </div>
        
        <div className="relative z-10 px-8 py-16 md:px-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-3xl">
            <div className="inline-block px-3 py-1 rounded-full border border-gold-500/30 bg-gold-950/30 text-gold-400 text-xs font-semibold tracking-widest uppercase mb-6">
              Exclusive Members Only
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-medium text-white mb-8 leading-tight">
              Wealth Management <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300 italic">
                for the 100 Crore Club
              </span>
            </h1>
            
            <div className="relative pl-8 border-l-2 border-gold-500/30 min-h-[120px] flex flex-col justify-center">
               <Quote className="absolute top-0 left-8 w-6 h-6 text-gold-700/50 transform -scale-x-100 -translate-y-full" />
               <p className="text-xl md:text-2xl text-neutral-300 font-light italic leading-relaxed mb-6 font-serif">
                "{TESTIMONIALS[currentTestimonial].quote}"
              </p>
              <div className="flex items-center gap-4">
                <img 
                  src={TESTIMONIALS[currentTestimonial].image} 
                  alt={TESTIMONIALS[currentTestimonial].name}
                  className="w-10 h-10 rounded-full border border-gold-500/30 grayscale hover:grayscale-0 transition-all"
                />
                <div>
                  <p className="font-semibold text-gold-400 text-sm tracking-wide">{TESTIMONIALS[currentTestimonial].name}</p>
                  <p className="text-xs text-neutral-500 uppercase tracking-wider">{TESTIMONIALS[currentTestimonial].role}</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 mt-8">
              {TESTIMONIALS.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setCurrentTestimonial(idx)}
                  className={`h-1 rounded-full transition-all duration-500 ${idx === currentTestimonial ? 'w-12 bg-gold-500' : 'w-4 bg-neutral-800'}`}
                />
              ))}
            </div>
          </div>
          
          <div className="hidden lg:block relative">
            <div className="absolute inset-0 bg-gold-500/20 blur-xl rounded-full"></div>
            <button 
              onClick={() => navigate('/portfolio')}
              className="relative group flex items-center gap-4 bg-gradient-to-r from-gold-600 to-gold-500 text-black px-10 py-5 rounded-none hover:rounded-xl font-bold tracking-widest uppercase text-sm transition-all duration-300 shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] border border-gold-400"
            >
              View Portfolio <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section>
        <SectionHeader 
          title="Investment Opportunities" 
          subtitle="Curated financial instruments for high-net-worth portfolios" 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const Icon = CategoryIconMap[cat];
            return (
              <Card 
                key={cat} 
                onClick={() => navigate(`/products/${encodeURIComponent(cat)}`)}
                className="group relative"
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold-900/0 via-gold-900/0 to-gold-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10 flex flex-col h-full justify-between min-h-[180px]">
                  <div>
                    <div className="w-14 h-14 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-6 group-hover:border-gold-500/50 group-hover:shadow-[0_0_15px_rgba(168,139,44,0.15)] transition-all duration-300">
                      <Icon className="w-6 h-6 text-gold-500" />
                    </div>
                    <h3 className="text-xl font-serif font-medium text-neutral-200 group-hover:text-gold-300 transition-colors">{cat}</h3>
                  </div>
                  
                  <div className="flex items-center text-xs text-gold-600/70 group-hover:text-gold-500 mt-6 font-semibold uppercase tracking-widest">
                    Unlock <ChevronRight className="w-3 h-3 ml-2 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
};

const GemPattern = () => (
  <svg width="300" height="300" viewBox="0 0 100 100" fill="currentColor" className="text-gold-500">
    <path d="M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z" fillOpacity="0.1" />
    <path d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z" stroke="currentColor" strokeWidth="0.5" fill="none" />
  </svg>
);

export default Home;