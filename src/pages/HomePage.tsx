import React, { useState, useEffect } from 'react';
import { Sparkles, Search, AlertCircle, RefreshCw } from 'lucide-react';
import ProductCard from '../components/ProductCard';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  in_stock: boolean;
  created_at: string;
}

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setError(null);
      const res = await fetch('/api/products');
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error: any) {
      console.error('Error fetching products:', error);
      setError('Failed to load products. Please try again.');
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
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-rose-100 via-white to-pink-100 overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-rose-500 mr-2 animate-pulse" />
                <span className="text-sm font-bold text-gray-700 uppercase tracking-wide bg-white/80 px-4 py-2 rounded-full shadow-md">
                  Premium Collection
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Premium Scents &{' '}
                <span className="bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
                  Beauty
                </span>
              </h1>
              <p className="text-lg font-semibold text-rose-600 mb-4">
                Handpicked for You
              </p>
              <p className="text-base text-gray-600 mb-8 max-w-lg mx-auto">
                Discover our curated collection of luxury perfumes and beauty products.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 bg-rose-200 rounded w-1/3 mx-auto mb-8"></div>
              <div className="product-grid">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-rose-100 rounded-2xl h-96 shadow-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl border border-red-200">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchProducts}
            className="bg-gradient-to-r from-red-500 to-pink-600 inline-flex items-center px-6 py-3 text-white font-bold rounded-lg shadow-lg hover:from-red-600 hover:to-pink-700 hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-rose-100 via-white to-pink-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-200/30 to-pink-200/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="h-6 w-6 text-rose-500 mr-2 animate-pulse" />
              <span className="text-sm font-bold text-gray-700 uppercase tracking-wide bg-white/90 px-4 py-2 rounded-full shadow-lg border border-rose-200">
                Premium Collection
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Premium Scents &{' '}
              <span className="bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
                Beauty
              </span>
            </h1>
            <p className="text-lg font-bold text-rose-600 mb-4">
              Handpicked for You
            </p>
            <p className="text-base text-gray-600 mb-8 max-w-lg mx-auto">
              Discover our curated collection of luxury perfumes and beauty products.
            </p>

            <div className="max-w-md mx-auto relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-rose-400" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border-2 border-rose-300 rounded-full leading-5 bg-white placeholder-rose-400 focus:outline-none focus:placeholder-rose-300 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 shadow-lg font-medium"
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
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
              {searchTerm 
                ? `Found ${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''} matching "${searchTerm}"`
                : 'Discover our complete collection of premium beauty and fragrance products'}
            </p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto bg-gradient-to-br from-gray-50 to-rose-50 p-8 rounded-2xl shadow-lg border border-rose-100">
                <AlertCircle className="h-16 w-16 text-rose-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {searchTerm ? 'No products found' : 'No products available'}
                </h3>
                <p className="text-gray-600 font-medium">
                  {searchTerm 
                    ? 'Try adjusting your search terms or browse all products.' 
                    : 'Products will appear here once they are added to the store.'}
                </p>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="mt-4 text-rose-600 hover:text-rose-700 font-bold bg-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Clear search
                  </button>
                )}
              </div>
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