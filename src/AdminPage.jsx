import { useEffect, useState } from "react";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [product, setProduct] = useState({ name: "", description: "", price: "", image_url: "", in_stock: true });
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    if (authenticated) fetchProducts();
  }, [authenticated]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editingId ? `/api/products?id=${editingId}` : "/api/products";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...product,
        price: parseFloat(product.price),
      }),
    });

    const data = await res.json();
    if (res.ok && data.success) {
      alert(editingId ? "✅ Product updated!" : "✅ Product added!");
      setProduct({ name: "", description: "", price: "", image_url: "", in_stock: true });
      setEditingId(null);
      fetchProducts();
    } else {
      alert("❌ Failed: " + (data.error || "Unknown error"));
    }
  };

  const handleEdit = (prod) => {
    setProduct(prod);
    setEditingId(prod.id);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    const res = await fetch(`/api/products?id=${id}`, { method: "DELETE" });
    const data = await res.json();
    if (res.ok && data.success) {
      alert("🗑️ Product deleted");
      fetchProducts();
    } else {
      alert("❌ Failed to delete");
    }
  };

  if (!authenticated) {
    return (
      <div className="p-6 max-w-md mx-auto">
        <input
          type="password"
          placeholder="Enter admin password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={() => {
            if (password === "arianna123") setAuthenticated(true);
            else alert("Wrong password");
          }}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{editingId ? "Edit Product" : "Add New Product"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input name="name" value={product.name} onChange={handleChange} placeholder="Product Name" required className="w-full p-2 border rounded" />
        <textarea name="description" value={product.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" />
        <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="Price (KES)" required className="w-full p-2 border rounded" />
        <input name="image_url" value={product.image_url} onChange={handleChange} placeholder="Image URL" className="w-full p-2 border rounded" />
        <label className="flex items-center gap-2">
          <input type="checkbox" name="in_stock" checked={product.in_stock} onChange={handleChange} />
          In Stock
        </label>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          {editingId ? "Update Product" : "Add Product"}
        </button>
        {editingId && (
          <button type="button" onClick={() => {
            setEditingId(null);
            setProduct({ name: "", description: "", price: "", image_url: "", in_stock: true });
          }} className="ml-2 text-sm text-red-500 underline">Cancel</button>
        )}
      </form>

      <h3 className="text-xl font-semibold mb-2">📦 Current Products:</h3>
      <ul className="space-y-2">
        {products.map((prod) => (
          <li key={prod.id} className="border p-3 rounded flex justify-between items-center">
            <div>
              <p className="font-bold">{prod.name} – KES {prod.price}</p>
              <p className="text-sm">{prod.description}</p>
            </div>
            <div className="space-x-2">
              <button onClick={() => handleEdit(prod)} className="text-blue-500">Edit</button>
              <button onClick={() => handleDelete(prod.id)} className="text-red-500">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
