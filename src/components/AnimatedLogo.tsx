import React, { useEffect, useState } from 'react';

const AnimatedLogo: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Auto-trigger animation on page load
    const timer = setTimeout(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogoHover = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <div 
      className={`logo-container cursor-pointer ${isAnimating ? 'animate-spray' : ''}`}
      onMouseEnter={handleLogoHover}
    >
      {/* Perfume Bottle SVG */}
      <div className="relative">
        <svg 
          className="perfume-bottle w-6 h-6 text-rose-gold" 
          viewBox="0 0 24 24" 
          fill="currentColor"
        >
          <path d="M8 2h8v2h-2v2h3c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2h3V4H8V2zm2 4h4v2H10V6zm-3 4v8h10v-8H7z"/>
          <circle cx="12" cy="14" r="1"/>
        </svg>
        
        {/* Mist Particles */}
        <div className="mist-particle"></div>
        <div className="mist-particle"></div>
        <div className="mist-particle"></div>
        <div className="mist-particle"></div>
        <div className="mist-particle"></div>
        <div className="mist-particle"></div>
        <div className="mist-particle"></div>
        <div className="mist-particle"></div>
      </div>

      {/* Logo Text */}
      <div className="flex items-baseline">
        <span className="logo-text text-2xl text-gray-900">ARIANNA</span>
        <span className="logo-beauty text-2xl text-rose-gold ml-2">BEAUTY</span>
      </div>
    </div>
  );
};

export default AnimatedLogo;