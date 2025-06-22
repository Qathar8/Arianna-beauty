import React from 'react';
import { ShoppingBag, AlertCircle } from 'lucide-react';

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
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleOrderViaWhatsApp = async () => {
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

      console.log('Sending order payload:', orderPayload);

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(orderPayload),
      });

      console.log('Response status:', res.status);
      console.log('Response headers:', Object.fromEntries(res.headers.entries()));

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
      console.log('Order created successfully:', data);

      const message = `Hello ARIANNA BEAUTY! I'd like to order:

Product: ${product.name}
Price: ${formatPrice(product.price)}
Order ID: ${data.id}

Please confirm availability and provide payment details.`;

      const whatsappUrl = `https://wa.me/254721787191?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    } catch (error) {
      console.error('Error processing order:', error);
      alert('An error occurred while processing your order. Please try again.');
    }
  };

  return (
    <div className="product-card bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-rose-100">
      <div className="relative overflow-hidden">
        <img
          src={
            product.image_url ||
            'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=400'
          }
          alt={product.name}
          className="product-image w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src =
              'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=400';
          }}
        />
        <div className="absolute top-4 left-4">
          <span
            className={`px-3 py-1 text-xs font-bold rounded-full shadow-md ${
              product.in_stock 
                ? 'bg-emerald-500 text-white' 
                : 'bg-red-500 text-white'
            }`}
          >
            {product.in_stock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
        {product.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-3">{product.description}</p>
        )}

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-rose-600">{formatPrice(product.price)}</span>
        </div>

        <button
          onClick={handleOrderViaWhatsApp}
          disabled={!product.in_stock}
          className={`w-full inline-flex items-center justify-center px-6 py-3 font-bold rounded-full shadow-lg transition-all duration-200 ${
            product.in_stock
              ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white hover:from-rose-600 hover:to-pink-700 hover:scale-105 hover:shadow-xl transform'
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
        </button>
      </div>
    </div>
  );
};

export default ProductCard;