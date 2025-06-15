
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
        </defs>
        
        {/* Main circle background */}
        <circle cx="20" cy="20" r="20" fill="url(#logoGradient)" />
        
        {/* Letter "A" design */}
        <path
          d="M12 28 L20 12 L28 28 M15.5 23 L24.5 23"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        
        {/* Small accent dots for tech feel */}
        <circle cx="32" cy="8" r="1.5" fill="hsl(120, 61%, 50%)" opacity="0.8" />
        <circle cx="8" cy="32" r="1.5" fill="hsl(210, 100%, 56%)" opacity="0.8" />
        <circle cx="35" cy="35" r="1" fill="hsl(120, 60%, 34%)" opacity="0.6" />
      </svg>
    </div>
  );
};

export default Logo;
