import React, { useEffect, useState } from 'react';

const AnimatedLogo: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Auto-trigger animation on page load
    const timer = setTimeout(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1400);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleLogoHover = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1400);
    }
  };

  return (
    <div 
      className={`logo-container cursor-pointer ${isAnimating ? 'animate-spray' : ''}`}
      onMouseEnter={handleLogoHover}
    >
      {/* Perfume Bottle with Arianna Beauty Logo */}
      <div className="relative">
        <div className="w-12 h-12 bg-gradient-to-br from-rose-gold to-rose-400 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
          {/* Perfume Bottle SVG */}
          <svg 
            className="perfume-bottle w-7 h-7 text-white" 
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path d="M8 2h8v2h-2v2h3c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2h3V4H8V2zm2 4h4v2H10V6zm-3 4v8h10v-8H7z"/>
            <circle cx="12" cy="14" r="1.5" fill="rgba(255,255,255,0.8)"/>
            <path d="M9 12h6v1H9z" fill="rgba(255,255,255,0.6)"/>
          </svg>
        </div>
        
        {/* Enhanced Mist Particles - More Visible */}
        <div className="mist-particle mist-1"></div>
        <div className="mist-particle mist-2"></div>
        <div className="mist-particle mist-3"></div>
        <div className="mist-particle mist-4"></div>
        <div className="mist-particle mist-5"></div>
        <div className="mist-particle mist-6"></div>
        <div className="mist-particle mist-7"></div>
        <div className="mist-particle mist-8"></div>
        <div className="mist-particle mist-9"></div>
        <div className="mist-particle mist-10"></div>
      </div>
    </div>
  );
};

export default AnimatedLogo;