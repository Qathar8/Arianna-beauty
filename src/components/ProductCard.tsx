import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, AlertCircle, Plus, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  in_stock: boolean;
}

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const { addItem } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    if (!product.in_stock) return;

    // Convert the D1 product to cart format
    const cartProduct = {
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image_url || 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: product.description || '',
      category: 'perfume' as const
    };

    addItem(cartProduct);
    toast.success(`${product.name} added to cart!`, {
      icon: '🛍️',
    });
  };

  const handleDirectWhatsAppOrder = async () => {
    if (!product.in_stock) return;

    try {
      // Create order via Cloudflare API
      const orderPayload = {
        items: [
          {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
          },
        ],
        total: product.price,
        whatsapp: 'pending',
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(orderPayload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error('API Error Response:', errorText);
        
        let errorMessage = 'Failed to create order. Please try again.';
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          // If response is not JSON, use default message
        }
        
        toast.error(errorMessage);
        return;
      }

      const data = await res.json();

      const message = `Hello ARIANNA BEAUTY! I'd like to order:

Product: ${product.name}
Price: ${formatPrice(product.price)}
Order ID: ${data.id}

Please confirm availability and provide payment details.`;

      const whatsappUrl = `https://wa.me/254721787191?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      
      toast.success('Order sent via WhatsApp!', {
        icon: '📱',
      });
    } catch (error) {
      console.error('Error processing order:', error);
      toast.error('An error occurred while processing your order. Please try again.');
    }
  };

  // Determine badge type based on product name or price
  const getBadge = () => {
    if (product.name.toLowerCase().includes('chanel') || product.name.toLowerCase().includes('dior')) {
      return { text: 'Luxury', className: 'badge-limited' };
    }
    if (product.price > 8000) {
      return { text: 'Premium', className: 'badge-bestseller' };
    }
    if (product.name.toLowerCase().includes('set') || product.name.toLowerCase().includes('gift')) {
      return { text: 'Best Value', className: 'badge-new' };
    }
    return null;
  };

  const badge = getBadge();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1]
      }}
      className="product-card bg-white rounded-3xl shadow-lg overflow-hidden border border-rose-100 group"
    >
      <div className="relative overflow-hidden">
        <img
          src={
            product.image_url ||
            'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=400'
          }
          alt={product.name}
          className="product-image w-full h-72 object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src =
              'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=400';
          }}
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span
            className={`px-3 py-1 text-xs font-bold rounded-full shadow-lg ${
              product.in_stock 
                ? 'bg-emerald-500 text-white' 
                : 'bg-red-500 text-white'
            }`}
          >
            {product.in_stock ? 'In Stock' : 'Out of Stock'}
          </span>
          {badge && (
            <span className={`px-3 py-1 text-xs font-bold rounded-full shadow-lg ${badge.className}`}>
              {badge.text}
            </span>
          )}
        </div>

        {/* Rating stars (decorative) */}
        <div className="absolute top-4 right-4 flex items-center bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
          <Star className="h-3 w-3 text-yellow-400 fill-current" />
          <span className="text-xs font-semibold text-gray-700 ml-1">4.8</span>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6">
        <h3 className="font-display text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        {product.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between mb-6">
          <span className="font-display text-2xl font-bold text-rose-600">
            {formatPrice(product.price)}
          </span>
          <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
            Free Delivery
          </div>
        </div>

        <div className="space-y-3">
          {/* Add to Cart Button */}
          <motion.button
            whileHover={{ scale: product.in_stock ? 1.02 : 1 }}
            whileTap={{ scale: product.in_stock ? 0.98 : 1 }}
            onClick={handleAddToCart}
            disabled={!product.in_stock}
            className={`w-full inline-flex items-center justify-center px-6 py-3 font-semibold rounded-2xl shadow-lg transition-all duration-300 ${
              product.in_stock
                ? 'btn-luxury text-white hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {product.in_stock ? (
              <>
                <Plus className="h-5 w-5 mr-2" />
                Add to Cart
              </>
            ) : (
              <>
                <AlertCircle className="h-5 w-5 mr-2" />
                Out of Stock
              </>
            )}
          </motion.button>

          {/* Direct WhatsApp Order Button */}
          <motion.button
            whileHover={{ scale: product.in_stock ? 1.02 : 1 }}
            whileTap={{ scale: product.in_stock ? 0.98 : 1 }}
            onClick={handleDirectWhatsAppOrder}
            disabled={!product.in_stock}
            className={`w-full inline-flex items-center justify-center px-6 py-3 font-semibold rounded-2xl shadow-lg transition-all duration-300 ${
              product.in_stock
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {product.in_stock ? (
              <>
                <ShoppingBag className="h-5 w-5 mr-2" />
                Order via WhatsApp
              </>
            ) : (
              <>
                <AlertCircle className="h-5 w-5 mr-2" />
                Out of Stock
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;