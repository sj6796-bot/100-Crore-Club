import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        bg-[#0a0a0a] border border-neutral-800 rounded-xl p-6 relative overflow-hidden
        ${onClick ? 'cursor-pointer hover:border-gold-700/40 hover:bg-neutral-900 hover:shadow-[0_0_20px_rgba(168,139,44,0.05)] transition-all duration-300' : ''} 
        ${className}
      `}
    >
      {/* Subtle top sheen */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent opacity-50"></div>
      {children}
    </div>
  );
};

export const SectionHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="mb-8 border-l-2 border-gold-500 pl-4">
    <h2 className="text-3xl font-serif font-medium text-slate-100 tracking-wide">
      <span className="text-gold-500">{title.charAt(0)}</span>{title.slice(1)}
    </h2>
    {subtitle && <p className="text-neutral-500 text-sm mt-2 tracking-wide font-light">{subtitle}</p>}
  </div>
);

export const Badge: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = 'bg-gold-500/10 text-gold-400 border-gold-500/20' }) => (
  <span className={`px-3 py-1 rounded-md text-[10px] uppercase tracking-wider font-semibold border ${color}`}>
    {children}
  </span>
);