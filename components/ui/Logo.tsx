import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-10 w-auto" }) => {
  return (
    <svg 
      viewBox="0 0 300 80" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      aria-label="100 Crore Club Logo"
    >
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FBF7E3" />
          <stop offset="20%" stopColor="#D4AF37" />
          <stop offset="50%" stopColor="#F7EFC0" />
          <stop offset="80%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#AA8C2C" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Shield/Emblem */}
      <path 
        d="M35 10 C 35 10, 60 15, 60 40 C 60 65, 35 75, 35 75 C 35 75, 10 65, 10 40 C 10 15, 35 10, 35 10 Z" 
        stroke="url(#goldGradient)" 
        strokeWidth="2"
        fill="none"
      />
      <path 
        d="M20 35 L35 25 L50 35 L50 50 L35 60 L20 50 Z" 
        fill="url(#goldGradient)" 
        opacity="0.8"
      />
      <text 
        x="35" 
        y="52" 
        textAnchor="middle" 
        fontSize="14" 
        fontFamily="serif" 
        fontWeight="bold" 
        fill="#000"
      >
        100
      </text>

      {/* Typography */}
      <text 
        x="80" 
        y="45" 
        fill="url(#goldGradient)" 
        fontFamily="serif" 
        fontSize="32" 
        fontWeight="bold"
        letterSpacing="1"
        filter="url(#glow)"
      >
        Crore Club
      </text>
      
      <text 
        x="82" 
        y="65" 
        fill="#A3A3A3" 
        fontFamily="sans-serif" 
        fontSize="10" 
        fontWeight="500"
        letterSpacing="3"
        className="uppercase"
      >
        Wealth Management
      </text>
    </svg>
  );
};