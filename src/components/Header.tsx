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
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="bg-white/95 backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b border-rose-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex-shrink-0 flex items-center space-x-4"
          >
            <AnimatedLogo />
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold">
                <span className="font-display text-gray-900">ARIANNA</span>
                <span className="text-rose-gold ml-2 font-light tracking-wider">BEAUTY</span>
              </h1>
              <p className="text-xs text-gray-500 tracking-wide font-medium">Premium Scents & Beauty</p>
            </div>
          </motion.div>

          <nav className="hidden md:flex space-x-2">
            {navigation.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                onClick={() => onPageChange(item.id)}
                className={`text-sm font-semibold transition-all duration-300 px-6 py-3 rounded-2xl ${
                  currentPage === item.id 
                    ? 'text-white bg-gradient-to-r from-rose-500 to-pink-600 shadow-lg' 
                    : 'text-gray-700 hover:text-rose-600 hover:bg-rose-50'
                }`}
              >
                {item.name}
              </motion.button>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              onClick={onCartOpen}
              className="relative p-3 text-gray-700 hover:text-rose-600 hover:bg-rose-50 rounded-2xl transition-all duration-300 group"
            >
              <ShoppingBag className="h-6 w-6" />
              {itemCount > 0 && (
                <>
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-500 to-pink-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                  {/* Enhanced cart preview tooltip */}
                  <div className="absolute right-0 top-full mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-rose-200 p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none transform translate-y-2 group-hover:translate-y-0">
                    <div className="text-sm">
                      <p className="font-bold text-gray-900 mb-1">{itemCount} item{itemCount !== 1 ? 's' : ''} in cart</p>
                      <p className="text-rose-600 font-bold text-lg mb-2">{formatPrice(total)}</p>
                      <p className="text-xs text-gray-500">Click to view and checkout</p>
                    </div>
                    <div className="absolute -top-2 right-6 w-4 h-4 bg-white border-l border-t border-rose-200 transform rotate-45"></div>
                  </div>
                </>
              )}
            </motion.button>

            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 text-gray-700 hover:text-rose-600 hover:bg-rose-50 rounded-2xl transition-all duration-300"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-rose-100"
          >
            <div className="px-2 pt-4 pb-6 space-y-2 bg-white/95 backdrop-blur-lg">
              <div className="px-4 py-3 mb-4">
                <h1 className="text-xl font-bold">
                  <span className="font-display text-gray-900">ARIANNA</span>
                  <span className="text-rose-gold ml-2 font-light">BEAUTY</span>
                </h1>
                <p className="text-xs text-gray-500 mt-1">Premium Scents & Beauty</p>
              </div>

              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onPageChange(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-4 text-base font-semibold rounded-2xl transition-all duration-300 ${
                    currentPage === item.id 
                      ? 'text-white bg-gradient-to-r from-rose-500 to-pink-600 shadow-lg' 
                      : 'text-gray-700 hover:text-rose-600 hover:bg-rose-50'
                  }`}
                >
                  {item.name}
                </button>
              ))}

              {/* Mobile cart summary */}
              {itemCount > 0 && (
                <div className="px-4 py-4 bg-rose-50 rounded-2xl mt-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-bold text-gray-900">
                      Cart: {itemCount} item{itemCount !== 1 ? 's' : ''}
                    </span>
                    <span className="text-sm font-bold text-rose-600">
                      {formatPrice(total)}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      onCartOpen();
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white py-3 px-4 rounded-2xl text-sm font-bold hover:from-rose-600 hover:to-pink-700 transition-all duration-300 shadow-lg"
                  >
                    View Cart
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;