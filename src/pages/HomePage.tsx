import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Search, AlertCircle, RefreshCw, ArrowRight, Star, Shield, Truck, Heart, Award, Users, CheckCircle } from 'lucide-react';
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

  const featuredProducts = filteredProducts.slice(0, 6);

  const scrollToProducts = () => {
    document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-luxury-gradient">
        {/* Enhanced Hero Section Skeleton */}
        <section className="relative min-h-screen flex items-center justify-center px-4">
          <div className="text-center animate-pulse max-w-4xl mx-auto">
            <div className="h-6 bg-rose-200 rounded-full w-48 mx-auto mb-8"></div>
            <div className="h-20 bg-gradient-to-r from-rose-200 to-rose-300 rounded-3xl w-full max-w-2xl mx-auto mb-6"></div>
            <div className="h-6 bg-rose-200 rounded-full w-80 mx-auto mb-12"></div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="h-14 bg-rose-400 rounded-2xl w-40"></div>
              <div className="h-14 bg-rose-300 rounded-2xl w-40"></div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-10 bg-rose-200 rounded-2xl w-1/3 mx-auto mb-16"></div>
              <div className="product-grid">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-gradient-to-br from-rose-100 to-rose-200 rounded-3xl h-96 shadow-xl"></div>
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
      <div className="min-h-screen bg-luxury-gradient flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 lg:p-12 bg-white rounded-3xl shadow-2xl border border-red-200 max-w-lg mx-auto"
        >
          <AlertCircle className="h-20 w-20 text-red-500 mx-auto mb-6" />
          <h2 className="font-display text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Something went wrong</h2>
          <p className="text-gray-600 mb-8 text-lg">{error}</p>
          <button
            onClick={fetchProducts}
            className="btn-luxury inline-flex items-center px-8 py-4 text-white font-semibold rounded-2xl shadow-lg text-lg"
          >
            <RefreshCw className="h-5 w-5 mr-3" />
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen bg-luxury-gradient overflow-hidden flex items-center">
        {/* Enhanced Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-40 h-40 bg-rose-gold/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-blush-pink/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-warm-amber/20 rounded-full blur-2xl animate-pulse delay-500"></div>
          <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-rose-gold/15 rounded-full blur-2xl animate-pulse delay-1500"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Enhanced Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
              className="text-center lg:text-left"
            >
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="flex items-center justify-center lg:justify-start mb-8"
              >
                <Sparkles className="h-7 w-7 text-rose-gold mr-4 animate-pulse" />
                <span className="text-sm lg:text-base font-bold text-gray-700 uppercase tracking-wider glass px-6 py-3 rounded-full shadow-lg">
                  Premium Collection
                </span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-8 leading-tight"
              >
                Luxury Scents &{' '}
                <span className="hero-gradient block lg:inline">
                  Beauty
                </span>
              </motion.h1>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="flex items-center justify-center lg:justify-start mb-8"
              >
                <Heart className="h-7 w-7 text-blush-pink mr-4" />
                <p className="text-xl lg:text-2xl font-semibold text-rose-600">
                  Handpicked for You
                </p>
              </motion.div>
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="text-lg lg:text-xl text-gray-700 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed"
              >
                Discover our curated collection of luxury perfumes and beauty products from 
                <span className="font-bold text-rose-gold"> ARIANNA BEAUTY</span>, 
                carefully selected to enhance your natural elegance and confidence.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mb-10"
              >
                <button
                  onClick={scrollToProducts}
                  className="btn-luxury inline-flex items-center px-10 py-5 text-white font-semibold rounded-2xl shadow-lg text-lg lg:text-xl"
                >
                  Shop Now
                  <ArrowRight className="ml-4 h-6 w-6" />
                </button>
                
                <a
                  href="https://wa.me/254721787191?text=Hello%20ARIANNA%20BEAUTY,%20I'd%20like%20to%20learn%20more%20about%20your%20products"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-flex items-center px-10 py-5 font-semibold rounded-2xl text-lg lg:text-xl"
                >
                  Contact Us
                </a>
              </motion.div>

              {/* Enhanced Search Bar */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.8 }}
                className="max-w-lg mx-auto lg:mx-0 relative"
              >
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                  <Search className="h-6 w-6 text-rose-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search luxury products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-16 pr-6 py-5 border-2 border-rose-300/50 rounded-2xl leading-5 glass placeholder-rose-400 focus:outline-none focus:placeholder-rose-300 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 shadow-xl font-medium text-lg"
                />
              </motion.div>
            </motion.div>

            {/* Enhanced Right Content - Featured Product Showcase */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="relative"
            >
              <div className="luxury-card rounded-3xl shadow-2xl p-8 lg:p-10 transform rotate-2 hover:rotate-0 transition-transform duration-700">
                <div className="bg-gradient-to-br from-rose-gold-light to-blush-light rounded-2xl p-8">
                  <img
                    src="https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Featured Arianna Beauty Product"
                    className="w-full h-80 lg:h-96 object-cover rounded-xl mb-8 shadow-lg"
                  />
                  <div className="text-center">
                    <h3 className="font-display text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                      Signature Collection
                    </h3>
                    <p className="text-gray-600 mb-6 text-lg lg:text-xl">
                      Starting from KES 2,500
                    </p>
                    <div className="flex justify-center space-x-4">
                      <span className="badge-new inline-block px-6 py-3 rounded-full text-sm font-bold shadow-lg">
                        New Arrival
                      </span>
                      <span className="inline-block bg-emerald-500 text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg">
                        In Stock
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Decorative floating elements */}
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-rose-gold/30 rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-blush-pink/40 rounded-full opacity-60 animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 -right-8 w-20 h-20 bg-warm-amber/30 rounded-full opacity-60 animate-pulse delay-500"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Why Choose Us Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Why Choose{' '}
              <span className="hero-gradient">ARIANNA BEAUTY</span>
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience luxury beauty shopping with unmatched quality and service
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                icon: <Shield className="h-16 w-16 text-rose-500" />,
                title: 'Authentic Products',
                description: '100% genuine luxury products with authenticity guarantee and quality assurance'
              },
              {
                icon: <Truck className="h-16 w-16 text-rose-500" />,
                title: 'Fast Delivery',
                description: 'Quick and secure delivery across Kenya within 24-48 hours with tracking'
              },
              {
                icon: <Award className="h-16 w-16 text-rose-500" />,
                title: 'Premium Quality',
                description: 'Handpicked luxury brands and exclusive collections from trusted suppliers'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center p-8 lg:p-10 luxury-card rounded-3xl hover:shadow-2xl transition-all duration-500"
              >
                <div className="flex justify-center mb-8">
                  {feature.icon}
                </div>
                <h3 className="font-display text-xl lg:text-2xl font-bold text-gray-900 mb-6">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Featured Products Section */}
      <section id="products-section" className="py-20 lg:py-32 bg-luxury-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Featured Products
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {searchTerm 
                ? `Found ${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''} matching "${searchTerm}"`
                : 'Discover our most popular luxury perfumes and beauty products'}
            </p>
          </motion.div>

          {featuredProducts.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="max-w-lg mx-auto luxury-card p-10 lg:p-12 rounded-3xl">
                <AlertCircle className="h-20 w-20 text-rose-400 mx-auto mb-6" />
                <h3 className="font-display text-xl lg:text-2xl font-bold text-gray-900 mb-4">
                  {searchTerm ? 'No products found' : 'No products available'}
                </h3>
                <p className="text-gray-600 font-medium mb-6 text-lg">
                  {searchTerm 
                    ? 'Try adjusting your search terms or browse all products.' 
                    : 'Products will appear here once they are added to the store.'}
                </p>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="text-rose-600 hover:text-rose-700 font-bold glass px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Clear search
                  </button>
                )}
              </div>
            </motion.div>
          ) : (
            <div className="product-grid">
              {featuredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}

          {/* Enhanced View All Products Button */}
          {featuredProducts.length > 0 && filteredProducts.length > 6 && (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center mt-16"
            >
              <button className="btn-secondary inline-flex items-center px-10 py-5 font-semibold rounded-2xl text-lg lg:text-xl">
                View All {filteredProducts.length} Products
                <ArrowRight className="ml-4 h-6 w-6" />
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              What Our Customers Say
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Join thousands of satisfied customers who trust ARIANNA BEAUTY
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                name: 'Sarah M.',
                location: 'Nairobi',
                rating: 5,
                text: 'Amazing quality perfumes! The Chanel No. 5 I ordered is absolutely authentic and the delivery was super fast. Highly recommend!'
              },
              {
                name: 'Grace K.',
                location: 'Mombasa',
                rating: 5,
                text: 'Love shopping with Arianna Beauty. Their WhatsApp ordering is so convenient and the customer service is excellent.'
              },
              {
                name: 'Diana W.',
                location: 'Kisumu',
                rating: 5,
                text: 'The best place for luxury beauty products in Kenya. Genuine products at great prices with reliable delivery.'
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="testimonial-card p-8 lg:p-10 rounded-3xl"
              >
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-8 italic leading-relaxed text-lg">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-lg">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-rose-500 via-pink-500 to-rose-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
              Ready to Discover Your Signature Scent?
            </h2>
            <p className="text-xl lg:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of satisfied customers who trust ARIANNA BEAUTY 
              for their luxury beauty and fragrance needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={scrollToProducts}
                className="inline-flex items-center px-10 py-5 bg-white text-rose-600 font-bold rounded-2xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl text-lg lg:text-xl"
              >
                Shop Now
                <ArrowRight className="ml-4 h-6 w-6" />
              </button>
              <a
                href="https://wa.me/254721787191?text=Hello%20ARIANNA%20BEAUTY,%20I'd%20like%20to%20learn%20more%20about%20your%20products"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-10 py-5 border-2 border-white text-white font-bold rounded-2xl hover:bg-white hover:text-rose-600 transform hover:scale-105 transition-all duration-300 text-lg lg:text-xl"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;