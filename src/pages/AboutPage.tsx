import React from 'react';
import { Award, Heart, Sparkles, Users } from 'lucide-react';

const AboutPage: React.FC = () => {
  const values = [
    {
      icon: <Award className="h-8 w-8 text-rose-500" />,
      title: 'Premium Quality',
      description: 'We source only the finest beauty products from trusted brands worldwide.'
    },
    {
      icon: <Heart className="h-8 w-8 text-rose-500" />,
      title: 'Customer Care',
      description: 'Your satisfaction is our priority. We provide personalized service and support.'
    },
    {
      icon: <Sparkles className="h-8 w-8 text-rose-500" />,
      title: 'Authentic Products',
      description: 'All our products are 100% genuine and come with authenticity guarantees.'
    },
    {
      icon: <Users className="h-8 w-8 text-rose-500" />,
      title: 'Community',
      description: 'We build lasting relationships with our customers across Kenya and beyond.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-rose-50 via-white to-amber-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About{' '}
              <span className="bg-gradient-to-r from-rose-400 to-amber-400 bg-clip-text text-transparent">
                ARIANNA BEAUTY
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your trusted partner in beauty and fragrance, bringing you the world's finest 
              products with personalized care and exceptional service.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-4">
                  Founded with a passion for beauty and excellence, ARIANNA BEAUTY was born 
                  from the vision of making premium fragrances and beauty products accessible 
                  to everyone in Kenya.
                </p>
                <p className="mb-4">
                  We understand that beauty is personal, and fragrance is an extension of 
                  your personality. That's why we carefully curate our collection, ensuring 
                  each product meets our high standards of quality and authenticity.
                </p>
                <p>
                  From our base in Nairobi, we serve customers across Kenya, building 
                  relationships that go beyond transactions. We're not just a beauty store – 
                  we're your beauty consultants, here to help you find products that make 
                  you feel confident and beautiful.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Beauty products"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-rose-200 rounded-full opacity-60"></div>
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-amber-200 rounded-full opacity-60"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do at ARIANNA BEAUTY
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-rose-500 to-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Discover Your Signature Scent?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust ARIANNA BEAUTY 
            for their beauty and fragrance needs.
          </p>
          <a
            href="https://wa.me/254721787191?text=Hello%20ARIANNA%20BEAUTY,%20I'd%20like%20to%20learn%20more%20about%20your%20products"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-white text-rose-600 font-semibold rounded-full hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;