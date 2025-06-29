import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, AlertCircle, Plus, Star, Heart } from 'lucide-react';
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
      style: {
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        color: 'white',
        fontWeight: '600',
        borderRadius: '16px',
        boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)',
      },
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
        
        toast.error(errorMessage, {
          style: {
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            color: 'white',
            fontWeight: '600',
            borderRadius: '16px',
            boxShadow: '0 10px 25px rgba(239, 68, 68, 0.3)',
          },
        });
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
        style: {
          background: 'linear-gradient(135deg, #25d366 0%, #128c7e 100%)',
          color: 'white',
          fontWeight: '600',
          borderRadius: '16px',
          boxShadow: '0 10px 25px rgba(37, 211, 102, 0.3)',
        },
      });
    } catch (error) {
      console.error('Error processing order:', error);
      toast.error('An error occurred while processing your order. Please try again.', {
        style: {
          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
          color: 'white',
          fontWeight: '600',
          borderRadius: '16px',
          boxShadow: '0 10px 25px rgba(239, 68, 68, 0.3)',
        },
      });
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
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        ease: [0.4, 0, 0.2, 1]
      }}
      className="product-card bg-white rounded-3xl shadow-xl overflow-hidden border border-rose-100 group"
    >
      <div className="relative overflow-hidden">
        <img
          src={
            product.image_url ||
            'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=500'
          }
          alt={product.name}
          className="product-image w-full h-80 lg:h-96 object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src =
              'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=500';
          }}
        />
        
        {/* Enhanced Badges */}
        <div className="absolute top-6 left-6 flex flex-col gap-3">
          <span
            className={`px-4 py-2 text-xs font-bold rounded-full shadow-xl backdrop-blur-sm border border-white/20 ${
              product.in_stock 
                ? 'bg-emerald-500 text-white' 
                : 'bg-red-500 text-white'
            }`}
          >
            {product.in_stock ? 'In Stock' : 'Out of Stock'}
          </span>
          {badge && (
            <span className={`px-4 py-2 text-xs font-bold rounded-full shadow-xl backdrop-blur-sm border border-white/20 ${badge.className}`}>
              {badge.text}
            </span>
          )}
        </div>

        {/* Enhanced Rating stars */}
        <div className="absolute top-6 right-6 flex items-center bg-white/95 backdrop-blur-sm rounded-full px-3 py-2 shadow-lg">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span className="text-xs font-bold text-gray-700 ml-1">4.8</span>
        </div>

        {/* Enhanced Wishlist button */}
        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button className="p-3 bg-white/95 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
            <Heart className="h-5 w-5 text-rose-500" />
          </button>
        </div>

        {/* Enhanced Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="p-8">
        <h3 className="font-display text-xl lg:text-2xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
          {product.name}
        </h3>
        
        {product.description && (
          <p className="text-sm lg:text-base text-gray-600 mb-6 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between mb-8">
          <span className="font-display text-2xl lg:text-3xl font-bold text-rose-600">
            {formatPrice(product.price)}
          </span>
          <div className="text-xs lg:text-sm text-gray-500 bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 rounded-full border border-green-200">
            Free Delivery
          </div>
        </div>

        <div className="space-y-4">
          {/* Enhanced Add to Cart Button */}
          <motion.button
            whileHover={{ scale: product.in_stock ? 1.02 : 1 }}
            whileTap={{ scale: product.in_stock ? 0.98 : 1 }}
            onClick={handleAddToCart}
            disabled={!product.in_stock}
            className={`w-full inline-flex items-center justify-center px-8 py-4 font-bold rounded-2xl shadow-xl transition-all duration-400 text-base lg:text-lg ${
              product.in_stock
                ? 'btn-luxury text-white hover:shadow-2xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {product.in_stock ? (
              <>
                <Plus className="h-5 w-5 mr-3" />
                Add to Cart
              </>
            ) : (
              <>
                <AlertCircle className="h-5 w-5 mr-3" />
                Out of Stock
              </>
            )}
          </motion.button>

          {/* Enhanced Direct WhatsApp Order Button */}
          <motion.button
            whileHover={{ scale: product.in_stock ? 1.02 : 1 }}
            whileTap={{ scale: product.in_stock ? 0.98 : 1 }}
            onClick={handleDirectWhatsAppOrder}
            disabled={!product.in_stock}
            className={`w-full inline-flex items-center justify-center px-8 py-4 font-bold rounded-2xl shadow-xl transition-all duration-400 text-base lg:text-lg ${
              product.in_stock
                ? 'bg-gradient-to-r from-green-500 via-emerald-600 to-green-500 text-white hover:from-green-600 hover:via-emerald-700 hover:to-green-600 hover:shadow-2xl border border-white/20'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {product.in_stock ? (
              <>
                <ShoppingBag className="h-5 w-5 mr-3" />
                Order via WhatsApp
              </>
            ) : (
              <>
                <AlertCircle className="h-5 w-5 mr-3" />
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