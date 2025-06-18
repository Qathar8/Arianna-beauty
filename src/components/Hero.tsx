import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onShopNow: () => void;
}

const Hero: React.FC<HeroProps> = ({ onShopNow }) => {
  return (
    <section className="relative bg-gradient-to-br from-rose-50 via-white to-amber-50 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-rose-100/20 to-amber-100/20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-4">
              <Sparkles className="h-6 w-6 text-amber-400 mr-2" />
              <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                Premium Collection
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Premium Scents &{' '}
              <span className="bg-rose-gold bg-clip-text text-transparent">
                Beauty
              </span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-4">
              Handpicked for You
            </p>
            
            <p className="text-base text-gray-500 mb-8 max-w-lg mx-auto lg:mx-0">
              Discover our curated collection of luxury perfumes and beauty products, 
              carefully selected to enhance your natural elegance and confidence.
            </p>
            
            <button
              onClick={onShopNow}
              className="btn-rose-gold inline-flex items-center px-8 py-4 text-white font-semibold rounded-full shadow-lg"
            >
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>

          {/* Right Content - Featured Product */}
          <div className="relative">
            <div className="bg-white rounded-3xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="bg-rose-gold-light rounded-2xl p-6">
                <img
                  src="https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=500"
                  alt="Featured Product"
                  className="w-full h-64 object-cover rounded-xl mb-4"
                />
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Signature Collection
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Starting from KES 2,500
                  </p>
                  <span className="inline-block bg-rose-gold text-white px-4 py-2 rounded-full text-sm font-medium">
                    New Arrival
                  </span>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-rose-200 rounded-full opacity-60"></div>
            <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-amber-200 rounded-full opacity-60"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;