import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, Plus, Save, X } from 'lucide-react';
import { Product, supabase } from '../../lib/supabase';

interface AdminProductTableProps {
  products: Product[];
  onProductsChange: () => void;
}

const AdminProductTable: React.FC<AdminProductTableProps> = ({ products, onProductsChange }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image_url: '',
    in_stock: true
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price / 100);
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      description: product.description || '',
      price: (product.price / 100).toString(),
      image_url: product.image_url || '',
      in_stock: product.in_stock
    });
  };

  const handleSave = async (productId?: string) => {
    try {
      const priceInCents = Math.round(parseFloat(formData.price) * 100);
      
      if (productId) {
        // Update existing product
        const { error } = await supabase
          .from('products')
          .update({
            name: formData.name,
            description: formData.description,
            price: priceInCents,
            image_url: formData.image_url,
            in_stock: formData.in_stock
          })
          .eq('id', productId);

        if (error) throw error;
      } else {
        // Add new product
        const { error } = await supabase
          .from('products')
          .insert([{
            name: formData.name,
            description: formData.description,
            price: priceInCents,
            image_url: formData.image_url,
            in_stock: formData.in_stock
          }]);

        if (error) throw error;
        setShowAddForm(false);
      }

      setEditingId(null);
      setFormData({ name: '', description: '', price: '', image_url: '', in_stock: true });
      onProductsChange();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleDelete = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) throw error;
      onProductsChange();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const toggleStock = async (product: Product) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ in_stock: !product.in_stock })
        .eq('id', product.id);

      if (error) throw error;
      onProductsChange();
    } catch (error) {
      console.error('Error updating stock:', error);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowAddForm(false);
    setFormData({ name: '', description: '', price: '', image_url: '', in_stock: true });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Products Management</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-rose-gold inline-flex items-center px-4 py-2 text-white font-medium rounded-lg"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </button>
      </div>

      {showAddForm && (
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Product</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Product Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            />
            <input
              type="number"
              placeholder="Price (KES)"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            />
            <input
              type="url"
              placeholder="Image URL"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="in_stock"
                checked={formData.in_stock}
                onChange={(e) => setFormData({ ...formData, in_stock: e.target.checked })}
                className="mr-2"
              />
              <label htmlFor="in_stock" className="text-sm text-gray-700">In Stock</label>
            </div>
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="md:col-span-2 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              rows={3}
            />
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              <X className="h-4 w-4 mr-1 inline" />
              Cancel
            </button>
            <button
              onClick={() => handleSave()}
              className="btn-rose-gold px-4 py-2 text-white rounded-md"
            >
              <Save className="h-4 w-4 mr-1 inline" />
              Save
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === product.id ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        rows={2}
                      />
                      <input
                        type="url"
                        value={formData.image_url}
                        onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                        placeholder="Image URL"
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <img
                        src={product.image_url || 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=100'}
                        alt={product.name}
                        className="h-12 w-12 rounded-lg object-cover mr-4"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.description}</div>
                      </div>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === product.id ? (
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                  ) : (
                    <div className="text-sm text-gray-900">{formatPrice(product.price)}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === product.id ? (
                    <input
                      type="checkbox"
                      checked={formData.in_stock}
                      onChange={(e) => setFormData({ ...formData, in_stock: e.target.checked })}
                    />
                  ) : (
                    <button
                      onClick={() => toggleStock(product)}
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        product.in_stock
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-red-100 text-red-800 hover:bg-red-200'
                      }`}
                    >
                      {product.in_stock ? 'In Stock' : 'Out of Stock'}
                    </button>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {editingId === product.id ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleSave(product.id)}
                        className="text-green-600 hover:text-green-900"
                      >
                        <Save className="h-4 w-4" />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProductTable;