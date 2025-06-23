import React from 'react';
import { X, Plus, Minus, ShoppingBag, MessageCircle, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { items, updateQuantity, removeItem, total, clearCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleWhatsAppOrder = async () => {
    if (items.length === 0) return;

    try {
      // Create order via Cloudflare API
      const orderPayload = {
        items: items.map(item => ({
          id: parseInt(item.id),
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        total: total,
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
        
        alert(errorMessage);
        return;
      }

      const data = await res.json();

      // Create WhatsApp message
      const orderText = items.map(item => 
        `${item.name} x${item.quantity} - ${formatPrice(item.price * item.quantity)}`
      ).join('\n');

      const totalText = `Total: ${formatPrice(total)}`;
      const message = `Hello ARIANNA BEAUTY! I'd like to order the following items:

${orderText}

${totalText}
Order ID: ${data.id}

Please confirm availability and provide payment details.`;
      
      const whatsappUrl = `https://wa.me/254721787191?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');

      // Clear cart after successful order
      clearCart();
      onClose();
    } catch (error) {
      console.error('Error processing order:', error);
      alert('An error occurred while processing your order. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-rose-50 to-pink-50">
            <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg font-semibold">Your cart is empty</p>
                <p className="text-gray-400 text-sm mt-2">Add some products to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">{item.name}</h3>
                      <p className="text-rose-600 font-bold text-sm">{formatPrice(item.price)}</p>
                      <p className="text-xs text-gray-500">Subtotal: {formatPrice(item.price * item.quantity)}</p>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <div className="flex items-center space-x-2 bg-white rounded-full border border-gray-300 px-2 py-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="font-semibold text-gray-900 w-8 text-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 p-6 space-y-4 bg-gradient-to-r from-rose-50 to-pink-50">
              <div className="flex justify-between items-center text-lg font-bold">
                <span className="text-gray-900">Total:</span>
                <span className="text-rose-600 text-xl">{formatPrice(total)}</span>
              </div>
              
              <button
                onClick={handleWhatsAppOrder}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-4 rounded-full font-bold hover:from-green-600 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Place Order via WhatsApp</span>
              </button>
              
              <button
                onClick={clearCart}
                className="w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-full font-semibold hover:bg-gray-300 transition-colors duration-200"
              >
                Clear Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;