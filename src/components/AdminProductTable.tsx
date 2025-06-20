import React, { useState } from 'react';
import { Edit2, Trash2, Plus, Save, X } from 'lucide-react';
import { Product } from '../../types';

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
    in_stock: true,
  });
  const [loading, setLoading] = useState(false);

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
      in_stock: product.in_stock,
    });
  };

  const handleSave = async (productId?: string) => {
    if (!formData.name.trim() || !formData.price.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    const priceInCents = Math.round(parseFloat(formData.price) * 100);

    const body = {
      name: formData.name.trim(),
      description: formData.description.trim() || null,
      price: priceInCents,
      image_url: formData.image_url.trim() || null,
      in_stock: formData.in_stock,
    };

    try {
      const res = await fetch(productId ? `/api/products/${productId}` : `/api/products`, {
        method: productId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error('Failed to save product');

      setEditingId(null);
      setFormData({ name: '', description: '', price: '', image_url: '', in_stock: true });
      setShowAddForm(false);
      onProductsChange();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete product');
      onProductsChange();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleStock = async (product: Product) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ in_stock: !product.in_stock }),
      });

      if (!res.ok) throw new Error('Failed to update stock');
      onProductsChange();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowAddForm(false);
    setFormData({ name: '', description: '', price: '', image_url: '', in_stock: true });
  };

  // 🧱 The rest of the JSX (table rendering, input forms) remains unchanged

  // ✅ To keep this clean, I'll leave that unchanged unless you ask to modify UI or styling
  return (
    <>
      {/* Reuse your current JSX here */}
      {/* Only fetch logic changed, rest of your table + form remains identical */}
    </>
  );
};

export default AdminProductTable;
