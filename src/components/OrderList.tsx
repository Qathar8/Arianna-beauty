import React, { useState, useEffect } from 'react';
import { Calendar, Phone, DollarSign } from 'lucide-react';
import { Order, supabase } from '../../lib/supabase';

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price / 100);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-KE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
      </div>

      {orders.length === 0 ? (
        <div className="px-6 py-8 text-center">
          <p className="text-gray-500">No orders found.</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {orders.map((order) => (
            <div key={order.id} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    <span className="text-sm font-medium text-gray-900">
                      Order #{order.id.slice(0, 8)}
                    </span>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(order.created_at)}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    {Array.isArray(order.items) && order.items.map((item: any, index: number) => (
                      <div key={index} className="text-sm text-gray-600">
                        {item.name} x{item.quantity} - {formatPrice(item.price)}
                      </div>
                    ))}
                  </div>
                  
                  {order.whatsapp !== 'pending' && (
                    <div className="flex items-center text-sm text-gray-500 mt-2">
                      <Phone className="h-4 w-4 mr-1" />
                      {order.whatsapp}
                    </div>
                  )}
                </div>
                
                <div className="text-right">
                  <div className="flex items-center text-lg font-semibold text-gray-900">
                    <DollarSign className="h-5 w-5 mr-1" />
                    {formatPrice(order.total)}
                  </div>
                  <div className={`text-sm px-2 py-1 rounded-full ${
                    order.whatsapp === 'pending' 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {order.whatsapp === 'pending' ? 'Pending Contact' : 'Contacted'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderList;