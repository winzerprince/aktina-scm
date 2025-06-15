
import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Background circle with gradient */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(120, 61%, 50%)" />
            <stop offset="50%" stopColor="hsl(120, 60%, 34%)" />
            <stop offset="100%" stopColor="hsl(210, 100%, 56%)" />
          </linearGradient>
          <radialGradient id="kiwiGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8B4513" />
            <stop offset="100%" stopColor="#654321" />
          </radialGradient>
          <radialGradient id="kiwiFleshGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F0F8D0" />
            <stop offset="100%" stopColor="#90EE90" />
          </radialGradient>
        </defs>
        
        {/* Main circle background */}
        <circle cx="20" cy="20" r="20" fill="url(#logoGradient)" />
        
        {/* Kiwi fruit outer skin */}
        <ellipse cx="20" cy="20" rx="12" ry="14" fill="url(#kiwiGradient)" />
        
        {/* Kiwi fruit flesh */}
        <ellipse cx="20" cy="20" rx="9" ry="11" fill="url(#kiwiFleshGradient)" />
        
        {/* Kiwi center - white core */}
        <ellipse cx="20" cy="20" rx="2" ry="2.5" fill="#FFF" opacity="0.9" />
        
        {/* Kiwi seeds arranged in a circle */}
        <circle cx="20" cy="16" r="0.8" fill="#333" />
        <circle cx="22.5" cy="17.5" r="0.8" fill="#333" />
        <circle cx="23" cy="20" r="0.8" fill="#333" />
        <circle cx="22.5" cy="22.5" r="0.8" fill="#333" />
        <circle cx="20" cy="24" r="0.8" fill="#333" />
        <circle cx="17.5" cy="22.5" r="0.8" fill="#333" />
        <circle cx="17" cy="20" r="0.8" fill="#333" />
        <circle cx="17.5" cy="17.5" r="0.8" fill="#333" />
        
        {/* Small accent dots for tech feel */}
        <circle cx="32" cy="8" r="1.5" fill="hsl(120, 61%, 50%)" opacity="0.8" />
        <circle cx="8" cy="32" r="1.5" fill="hsl(210, 100%, 56%)" opacity="0.8" />
        <circle cx="35" cy="35" r="1" fill="hsl(120, 60%, 34%)" opacity="0.6" />
      </svg>
    </div>
  );
};

export default Logo;
