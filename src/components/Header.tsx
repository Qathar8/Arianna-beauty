import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Settings } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { supabase } from '../../lib/supabase';
import AnimatedLogo from './AnimatedLogo';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onCartOpen: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onPageChange, onCartOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { itemCount } = useCart();

  const navigation = [
    { name: 'Home', id: 'home' },
    { name: 'Products', id: 'products' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' }
  ];

  useEffect(() => {
    checkAdminStatus();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkAdminStatus();
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const userMetadata = user.user_metadata || {};
        setIsAdmin(userMetadata.role === 'admin');
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
    }
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Brand Logo and Name */}
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

          {/* Desktop Navigation */}
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
            
            {/* Admin Dashboard Button - Only visible to admin users */}
            {isAdmin && (
              <button
                onClick={() => onPageChange('admin')}
                className={`text-sm font-medium transition-all duration-200 px-3 py-2 rounded-full inline-flex items-center ${
                  currentPage === 'admin' 
                    ? 'text-white bg-rose-gold shadow-md' 
                    : 'text-gray-700 hover:text-rose-gold hover:bg-rose-50'
                }`}
              >
                <Settings className="h-4 w-4 mr-1" />
                Admin Dashboard
              </button>
            )}
          </nav>

          {/* Cart and Menu Icons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onCartOpen}
              className="relative p-3 text-gray-700 hover:text-rose-gold hover:bg-rose-50 rounded-full transition-all duration-200"
            >
              <ShoppingBag className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-gold text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-semibold shadow-md">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 text-gray-700 hover:text-rose-gold hover:bg-rose-50 rounded-full transition-all duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-rose-100">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
              {/* Mobile Brand Name */}
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
              
              {/* Mobile Admin Dashboard Button - Only visible to admin users */}
              {isAdmin && (
                <button
                  onClick={() => {
                    onPageChange('admin');
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-3 text-base font-medium rounded-lg transition-all duration-200 inline-flex items-center ${
                    currentPage === 'admin' 
                      ? 'text-white bg-rose-gold shadow-md' 
                      : 'text-gray-700 hover:text-rose-gold hover:bg-rose-50'
                  }`}
                >
                  <Settings className="h-5 w-5 mr-2" />
                  Admin Dashboard
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;