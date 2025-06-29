import React, { useEffect, useState } from 'react';

const AnimatedLogo: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Auto-trigger animation on page load
    const timer = setTimeout(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1800);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleLogoHover = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1800);
    }
  };

  return (
    <div 
      className={`logo-container ${isAnimating ? 'animate-spray' : ''}`}
      onMouseEnter={handleLogoHover}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleLogoHover();
        }
      }}
      aria-label="ARIANNA BEAUTY animated logo"
    >
      {/* Enhanced Perfume Bottle with Higher Resolution SVG */}
      <div className="relative">
        <div className="w-14 h-14 bg-gradient-to-br from-rose-gold via-rose-400 to-rose-600 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-all duration-500 border border-white/20">
          {/* High-Resolution Perfume Bottle SVG */}
          <svg 
            className="perfume-bottle w-8 h-8 text-white" 
            viewBox="0 0 32 32" 
            fill="currentColor"
            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}
          >
            {/* Bottle Cap */}
            <rect x="12" y="2" width="8" height="3" rx="1" fill="currentColor" opacity="0.9"/>
            <rect x="11" y="4" width="10" height="2" rx="1" fill="currentColor" opacity="0.8"/>
            
            {/* Spray Nozzle */}
            <rect x="10" y="5" width="12" height="1.5" rx="0.75" fill="currentColor" opacity="0.7"/>
            <circle cx="22.5" cy="5.75" r="1" fill="currentColor" opacity="0.6"/>
            
            {/* Bottle Neck */}
            <rect x="13" y="6" width="6" height="3" fill="currentColor" opacity="0.85"/>
            
            {/* Main Bottle Body */}
            <path d="M9 9 L23 9 L22 26 C22 27.1 21.1 28 20 28 L12 28 C10.9 28 10 27.1 10 26 L9 9 Z" 
                  fill="currentColor" opacity="0.9"/>
            
            {/* Liquid Inside */}
            <path d="M11 11 L21 11 L20.5 24 C20.5 24.8 19.8 25.5 19 25.5 L13 25.5 C12.2 25.5 11.5 24.8 11.5 24 L11 11 Z" 
                  fill="rgba(255,255,255,0.3)"/>
            
            {/* Bottle Highlights */}
            <rect x="11.5" y="12" width="1" height="12" rx="0.5" fill="rgba(255,255,255,0.4)"/>
            <ellipse cx="16" cy="16" rx="2" ry="1" fill="rgba(255,255,255,0.2)"/>
            
            {/* Label Area */}
            <rect x="12" y="18" width="8" height="4" rx="1" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5"/>
            <rect x="13" y="19" width="6" height="0.5" rx="0.25" fill="rgba(255,255,255,0.3)"/>
            <rect x="13" y="20" width="4" height="0.5" rx="0.25" fill="rgba(255,255,255,0.2)"/>
          </svg>
        </div>
        
        {/* Enhanced Mist Particles with Better Positioning */}
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