import React, { useState, useEffect } from 'react';
import { LogOut, Package, ShoppingCart, BarChart3, AlertCircle, RefreshCw } from 'lucide-react';
import { supabase, Product } from '../../lib/supabase';
import AdminProductTable from '../components/AdminProductTable';
import OrderList from '../components/OrderList';

const AdminPage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'analytics'>('products');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchProducts();
    }
  }, [user]);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Check if user has admin role
        const userMetadata = user.user_metadata || {};
        if (userMetadata.role === 'admin') {
          setUser(user);
        } else {
          // User is authenticated but not admin
          await supabase.auth.signOut();
          setLoginError('Access denied. Admin privileges required.');
        }
      }
    } catch (error: any) {
      console.error('Error checking user:', error);
      setLoginError('Failed to verify authentication status.');
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error: any) {
      console.error('Error fetching products:', error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginForm.email.trim(),
        password: loginForm.password,
      });

      if (error) throw error;

      // Check if user has admin role
      const userMetadata = data.user?.user_metadata || {};
      if (userMetadata.role !== 'admin') {
        await supabase.auth.signOut();
        throw new Error('Access denied. Admin privileges required.');
      }

      setUser(data.user);
      setLoginForm({ email: '', password: '' });
    } catch (error: any) {
      console.error('Login error:', error);
      setLoginError(error.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setProducts([]);
      setActiveTab('products');
    } catch (error: any) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8 p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h2>
            <p className="text-gray-600">Sign in to access the admin dashboard</p>
          </div>

          {loginError && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400 mr-2 mt-0.5" />
                <div className="text-sm text-red-700">{loginError}</div>
              </div>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full btn-rose-gold text-white py-2 px-4 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loginLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="text-center text-sm text-gray-500">
            <p>Only authorized administrators can access this area.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                ARIANNA BEAUTY
                <span className="text-rose-gold ml-2">Admin</span>
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {user.email}
              </span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-colors duration-200"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('products')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'products'
                  ? 'border-rose-500 text-rose-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Package className="h-5 w-5 inline mr-2" />
              Products ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'orders'
                  ? 'border-rose-500 text-rose-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <ShoppingCart className="h-5 w-5 inline mr-2" />
              Orders
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'analytics'
                  ? 'border-rose-500 text-rose-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <BarChart3 className="h-5 w-5 inline mr-2" />
              Analytics
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'products' && (
          <AdminProductTable 
            products={products} 
            onProductsChange={fetchProducts}
          />
        )}
        
        {activeTab === 'orders' && <OrderList />}
        
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Store Analytics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                  <div className="flex items-center">
                    <Package className="h-8 w-8 text-blue-600 mr-3" />
                    <div>
                      <h3 className="text-lg font-semibold text-blue-900">Total Products</h3>
                      <p className="text-3xl font-bold text-blue-600">{products.length}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                  <div className="flex items-center">
                    <div className="h-8 w-8 bg-green-600 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-green-900">In Stock</h3>
                      <p className="text-3xl font-bold text-green-600">
                        {products.filter(p => p.in_stock).length}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-red-50 p-6 rounded-lg border border-red-100">
                  <div className="flex items-center">
                    <div className="h-8 w-8 bg-red-600 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">✕</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-red-900">Out of Stock</h3>
                      <p className="text-3xl font-bold text-red-600">
                        {products.filter(p => !p.in_stock).length}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-amber-50 p-6 rounded-lg border border-amber-100">
                  <div className="flex items-center">
                    <BarChart3 className="h-8 w-8 text-amber-600 mr-3" />
                    <div>
                      <h3 className="text-lg font-semibold text-amber-900">Stock Rate</h3>
                      <p className="text-3xl font-bold text-amber-600">
                        {products.length > 0 ? Math.round((products.filter(p => p.in_stock).length / products.length) * 100) : 0}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {products.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={fetchProducts}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh Data
                  </button>
                  <button
                    onClick={() => setActiveTab('products')}
                    className="btn-rose-gold inline-flex items-center px-4 py-2 text-white font-medium rounded-md"
                  >
                    <Package className="h-4 w-4 mr-2" />
                    Manage Products
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPage;