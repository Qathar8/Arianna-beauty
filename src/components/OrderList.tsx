import React, { useState, useEffect } from 'react';
import { Calendar, Phone, DollarSign, Package, RefreshCw } from 'lucide-react';
import { Order, supabase } from '../../lib/supabase';

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setRefreshing(true);
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;
      setOrders(data || []);
    } catch (error: any) {
      console.error('Error fetching orders:', error);
      alert('Failed to fetch orders: ' + error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
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
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
        <button
          onClick={fetchOrders}
          disabled={refreshing}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="px-6 py-12 text-center">
          <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No orders found.</p>
          <p className="text-gray-400 text-sm mt-2">Orders will appear here when customers place them.</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
          {orders.map((order) => (
            <div key={order.id} className="px-6 py-4 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-4 mb-3">
                    <span className="text-sm font-semibold text-gray-900 bg-gray-100 px-2 py-1 rounded">
                      #{order.id.slice(0, 8)}
                    </span>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(order.created_at)}
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Items:</h4>
                    {Array.isArray(order.items) ? (
                      order.items.map((item: any, index: number) => (
                        <div key={index} className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-md">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{item.name}</span>
                            <span className="text-gray-500">Qty: {item.quantity || 1}</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {formatPrice(item.price * (item.quantity || 1))}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-sm text-gray-500 italic">Invalid order data</div>
                    )}
                  </div>
                  
                  {order.whatsapp && order.whatsapp !== 'pending' && (
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Phone className="h-4 w-4 mr-1" />
                      <span className="font-mono">{order.whatsapp}</span>
                    </div>
                  )}
                </div>
                
                <div className="text-right ml-4">
                  <div className="flex items-center text-lg font-bold text-gray-900 mb-2">
                    <DollarSign className="h-5 w-5 mr-1 text-green-600" />
                    {formatPrice(order.total)}
                  </div>
                  <div className={`text-xs px-3 py-1 rounded-full font-medium ${
                    order.whatsapp === 'pending' 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {order.whatsapp === 'pending' ? 'Pending Contact' : 'Customer Contacted'}
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