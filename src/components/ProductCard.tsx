import React from 'react';
import { ShoppingBag, AlertCircle } from 'lucide-react';
import { Product } from '../../lib/supabase';
import { supabase } from '../../lib/supabase';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price / 100); // Convert from cents
  };

  const handleOrderViaWhatsApp = async () => {
    if (!product.in_stock) return;

    try {
      // Create order in database
      const orderData = {
        items: [{ 
          id: product.id, 
          name: product.name, 
          price: product.price, 
          quantity: 1 
        }],
        total: product.price,
        whatsapp: 'pending' // Will be updated when user provides number
      };

      const { data, error } = await supabase
        .from('orders')
        .insert([orderData])
        .select()
        .single();

      if (error) {
        console.error('Error creating order:', error);
        return;
      }

      // Create WhatsApp message
      const message = `Hello ARIANNA BEAUTY! I'd like to order:

Product: ${product.name}
Price: ${formatPrice(product.price)}
Order ID: ${data.id}

Please confirm availability and provide payment details.`;

      const whatsappUrl = `https://wa.me/254721787191?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    } catch (error) {
      console.error('Error processing order:', error);
    }
  };

  return (
    <div className="product-card bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="relative overflow-hidden">
        <img
          src={product.image_url || 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=400'}
          alt={product.name}
          className="product-image transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            product.in_stock 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {product.in_stock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {product.description}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={handleOrderViaWhatsApp}
            disabled={!product.in_stock}
            className={`inline-flex items-center px-4 py-2 font-medium rounded-full shadow-md transition-all duration-200 ${
              product.in_stock
                ? 'btn-rose-gold text-white hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {product.in_stock ? (
              <>
                <ShoppingBag className="h-4 w-4 mr-1" />
                Order via WhatsApp
              </>
            ) : (
              <>
                <AlertCircle className="h-4 w-4 mr-1" />
                Out of Stock
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;