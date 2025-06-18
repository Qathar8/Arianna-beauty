import React from 'react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

interface HomePageProps {
  onPageChange: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onPageChange }) => {
  const featuredProducts = products.slice(0, 4);

  return (
    <div>
      <Hero onShopNow={() => onPageChange('products')} />
      
      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium beauty products
            </p>
          </div>
          
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button
              onClick={() => onPageChange('products')}
              className="btn-rose-gold px-8 py-3 text-white font-semibold rounded-full shadow-lg"
            >
              View All Products
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;