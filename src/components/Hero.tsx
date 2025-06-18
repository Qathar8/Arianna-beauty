import React from 'react';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';

interface HeroProps {
  onShopNow: () => void;
}

const Hero: React.FC<HeroProps> = ({ onShopNow }) => {
  return (
    <section className="relative bg-gradient-to-br from-blush-light via-cream-white to-rose-50 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-rose-100/30 to-blush-pink/20"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-rose-gold/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-blush-pink/10 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-warm-amber/10 rounded-full blur-lg"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-6">
              <Sparkles className="h-6 w-6 text-rose-gold mr-2 animate-pulse" />
              <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider bg-white/80 px-3 py-1 rounded-full">
                Premium Collection
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Premium Scents &{' '}
              <span className="bg-gradient-to-r from-rose-gold to-warm-amber bg-clip-text text-transparent">
                Beauty
              </span>
            </h1>
            
            <div className="flex items-center justify-center lg:justify-start mb-6">
              <Heart className="h-5 w-5 text-blush-pink mr-2" />
              <p className="text-xl text-gray-700 font-medium">
                Handpicked for You
              </p>
            </div>
            
            <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Discover our curated collection of luxury perfumes and beauty products from 
              <span className="font-semibold text-rose-gold"> ARIANNA BEAUTY</span>, 
              carefully selected to enhance your natural elegance and confidence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={onShopNow}
                className="btn-rose-gold inline-flex items-center px-8 py-4 text-white font-semibold rounded-full shadow-lg text-lg"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              
              <a
                href="https://wa.me/254721787191?text=Hello%20ARIANNA%20BEAUTY,%20I'd%20like%20to%20learn%20more%20about%20your%20products"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 border-2 border-rose-gold text-rose-gold font-semibold rounded-full hover:bg-rose-gold hover:text-white transition-all duration-300 text-lg"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Right Content - Featured Product Showcase */}
          <div className="relative">
            <div className="bg-white rounded-3xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="bg-gradient-to-br from-rose-gold-light to-blush-light rounded-2xl p-6">
                <img
                  src="https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=500"
                  alt="Featured Arianna Beauty Product"
                  className="w-full h-72 object-cover rounded-xl mb-6 shadow-lg"
                />
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Signature Collection
                  </h3>
                  <p className="text-gray-600 mb-4 text-lg">
                    Starting from KES 2,500
                  </p>
                  <div className="flex justify-center space-x-2">
                    <span className="inline-block bg-rose-gold text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">
                      New Arrival
                    </span>
                    <span className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                      In Stock
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative floating elements */}
            <div className="absolute -top-6 -left-6 w-20 h-20 bg-rose-gold/20 rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-blush-pink/30 rounded-full opacity-60 animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 -right-4 w-12 h-12 bg-warm-amber/20 rounded-full opacity-60 animate-pulse delay-500"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;