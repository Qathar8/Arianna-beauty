import React, { useState, useEffect } from 'react';
import { Sparkles, Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { Product, supabase } from '../../lib/supabase';

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-rose-50 via-white to-amber-50 overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
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
              
              <p className="text-base text-gray-500 mb-8 max-w-lg mx-auto">
                Discover our curated collection of luxury perfumes and beauty products, 
                carefully selected to enhance your natural elegance and confidence.
              </p>
            </div>
          </div>
        </section>

        {/* Loading Products */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-8"></div>
              <div className="product-grid">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-gray-200 rounded-2xl h-96"></div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-rose-50 via-white to-amber-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-100/20 to-amber-100/20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
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
            
            <p className="text-base text-gray-500 mb-8 max-w-lg mx-auto">
              Discover our curated collection of luxury perfumes and beauty products, 
              carefully selected to enhance your natural elegance and confidence.
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {searchTerm 
                ? `Found ${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''} matching "${searchTerm}"`
                : 'Discover our complete collection of premium beauty and fragrance products'
              }
            </p>
          </div>
          
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {searchTerm ? 'No products found matching your search.' : 'No products available at the moment.'}
              </p>
            </div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;