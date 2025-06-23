import React, { useState } from 'react';
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
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center space-x-3">
            <AnimatedLogo />
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold">
                <span className="text-gray-900 font-serif">ARIANNA</span>
                <span className="text-rose-gold ml-2 font-light tracking-wider">BEAUTY</span>
              </h1>
              <p className="text-xs text-gray-500 tracking-wide">Premium Scents & Beauty</p>
            </div>
          </div>

          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`text-sm font-medium transition-all duration-200 px-3 py-2 rounded-full ${
                  currentPage === item.id 
                    ? 'text-white bg-rose-gold shadow-md' 
                    : 'text-gray-700 hover:text-rose-gold hover:bg-rose-50'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={onCartOpen}
              className="relative p-3 text-gray-700 hover:text-rose-gold hover:bg-rose-50 rounded-full transition-all duration-200 group"
            >
              <ShoppingBag className="h-6 w-6" />
              {itemCount > 0 && (
                <>
                  <span className="absolute -top-1 -right-1 bg-rose-gold text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-semibold shadow-md">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                  {/* Cart preview tooltip */}
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div className="text-sm">
                      <p className="font-semibold text-gray-900">{itemCount} item{itemCount !== 1 ? 's' : ''}</p>
                      <p className="text-rose-600 font-bold">{formatPrice(total)}</p>
                      <p className="text-xs text-gray-500 mt-1">Click to view cart</p>
                    </div>
                  </div>
                </>
              )}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 text-gray-700 hover:text-rose-gold hover:bg-rose-50 rounded-full transition-all duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-rose-100">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
              <div className="px-3 py-2 mb-2">
                <h1 className="text-xl font-bold">
                  <span className="text-gray-900 font-serif">ARIANNA</span>
                  <span className="text-rose-gold ml-2 font-light">BEAUTY</span>
                </h1>
              </div>

              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onPageChange(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-3 text-base font-medium rounded-lg transition-all duration-200 ${
                    currentPage === item.id 
                      ? 'text-white bg-rose-gold shadow-md' 
                      : 'text-gray-700 hover:text-rose-gold hover:bg-rose-50'
                  }`}
                >
                  {item.name}
                </button>
              ))}

              {/* Mobile cart summary */}
              {itemCount > 0 && (
                <div className="px-3 py-3 bg-rose-50 rounded-lg mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-900">
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
                    className="w-full mt-2 bg-rose-gold text-white py-2 px-4 rounded-full text-sm font-semibold hover:bg-rose-gold-dark transition-colors duration-200"
                  >
                    View Cart
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;