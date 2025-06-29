import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import AnimatedLogo from './AnimatedLogo';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onCartOpen: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onPageChange, onCartOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount, total } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const navigation = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' }
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className="bg-white/98 backdrop-blur-xl shadow-2xl sticky top-0 z-50 border-b border-rose-100/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 lg:h-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex-shrink-0 flex items-center space-x-4"
          >
            <AnimatedLogo />
            <div className="hidden sm:block">
              <h1 className="text-2xl lg:text-3xl font-bold">
                <span className="font-display text-gray-900 tracking-tight">ARIANNA</span>
                <span className="text-rose-gold ml-2 font-light tracking-wider">BEAUTY</span>
              </h1>
              <p className="text-xs lg:text-sm text-gray-500 tracking-wide font-medium">Premium Scents & Beauty</p>
            </div>
          </motion.div>

          <nav className="hidden md:flex space-x-2 lg:space-x-4">
            {navigation.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                onClick={() => onPageChange(item.id)}
                className={`text-sm lg:text-base font-semibold transition-all duration-400 px-6 lg:px-8 py-3 lg:py-4 rounded-2xl relative overflow-hidden ${
                  currentPage === item.id 
                    ? 'text-white bg-gradient-to-r from-rose-500 via-pink-600 to-rose-500 shadow-xl shadow-rose-500/25 border border-white/20' 
                    : 'text-gray-700 hover:text-rose-600 hover:bg-gradient-to-r hover:from-rose-50 hover:to-pink-50 hover:shadow-lg'
                }`}
              >
                {currentPage === item.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-rose-500 via-pink-600 to-rose-500 rounded-2xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </motion.button>
            ))}
          </nav>

          <div className="flex items-center space-x-3 lg:space-x-4">
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              onClick={onCartOpen}
              className="relative p-3 lg:p-4 text-gray-700 hover:text-rose-600 hover:bg-gradient-to-r hover:from-rose-50 hover:to-pink-50 rounded-2xl transition-all duration-400 group"
            >
              <ShoppingBag className="h-6 w-6 lg:h-7 lg:w-7" />
              {itemCount > 0 && (
                <>
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-500 to-pink-600 text-white text-xs rounded-full h-6 w-6 lg:h-7 lg:w-7 flex items-center justify-center font-bold shadow-lg border-2 border-white"
                  >
                    {itemCount > 99 ? '99+' : itemCount}
                  </motion.span>
                  {/* Enhanced cart preview tooltip */}
                  <div className="absolute right-0 top-full mt-4 w-64 lg:w-72 bg-white rounded-3xl shadow-2xl border border-rose-200 p-6 opacity-0 group-hover:opacity-100 transition-all duration-400 pointer-events-none transform translate-y-2 group-hover:translate-y-0 z-50">
                    <div className="text-sm">
                      <p className="font-bold text-gray-900 mb-2 text-base">{itemCount} item{itemCount !== 1 ? 's' : ''} in cart</p>
                      <p className="text-rose-600 font-bold text-xl mb-3">{formatPrice(total)}</p>
                      <p className="text-xs text-gray-500 bg-rose-50 px-3 py-2 rounded-full text-center">Click to view and checkout</p>
                    </div>
                    <div className="absolute -top-3 right-8 w-6 h-6 bg-white border-l border-t border-rose-200 transform rotate-45"></div>
                  </div>
                </>
              )}
            </motion.button>

            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 text-gray-700 hover:text-rose-600 hover:bg-gradient-to-r hover:from-rose-50 hover:to-pink-50 rounded-2xl transition-all duration-400"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden border-t border-rose-100/50 overflow-hidden"
          >
            <div className="px-2 pt-6 pb-8 space-y-3 bg-gradient-to-b from-white/98 to-rose-50/50 backdrop-blur-xl">
              <div className="px-4 py-4 mb-6 bg-white/80 rounded-2xl backdrop-blur-sm border border-rose-100">
                <h1 className="text-xl font-bold">
                  <span className="font-display text-gray-900">ARIANNA</span>
                  <span className="text-rose-gold ml-2 font-light">BEAUTY</span>
                </h1>
                <p className="text-xs text-gray-500 mt-1">Premium Scents & Beauty</p>
              </div>

              {navigation.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  onClick={() => {
                    onPageChange(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-6 py-4 text-base font-semibold rounded-2xl transition-all duration-400 relative overflow-hidden ${
                    currentPage === item.id 
                      ? 'text-white bg-gradient-to-r from-rose-500 via-pink-600 to-rose-500 shadow-xl shadow-rose-500/25 border border-white/20' 
                      : 'text-gray-700 hover:text-rose-600 hover:bg-gradient-to-r hover:from-rose-50 hover:to-pink-50 hover:shadow-lg bg-white/60 backdrop-blur-sm border border-rose-100/50'
                  }`}
                >
                  {item.name}
                </motion.button>
              ))}

              {/* Enhanced Mobile cart summary */}
              {itemCount > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="px-6 py-6 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl mt-8 border border-rose-200/50 backdrop-blur-sm"
                >
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-bold text-gray-900">
                      Cart: {itemCount} item{itemCount !== 1 ? 's' : ''}
                    </span>
                    <span className="text-lg font-bold text-rose-600">
                      {formatPrice(total)}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      onCartOpen();
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-rose-500 via-pink-600 to-rose-500 text-white py-4 px-6 rounded-2xl text-sm font-bold hover:from-rose-600 hover:via-pink-700 hover:to-rose-600 transition-all duration-400 shadow-xl shadow-rose-500/25 border border-white/20"
                  >
                    View Cart & Checkout
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;