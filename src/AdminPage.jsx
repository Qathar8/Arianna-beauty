import { useState } from "react";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    image_url: "",
    in_stock: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...product,
        price: parseFloat(product.price),
      }),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      alert("✅ Product added successfully!");
      setProduct({
        name: "",
        description: "",
        price: "",
        image_url: "",
        in_stock: true,
      });
    } else {
      alert("❌ Failed to add product: " + (data.error || "Unknown error"));
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
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price (KES)"
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="image_url"
          value={product.image_url}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full p-2 border rounded"
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="in_stock"
            checked={product.in_stock}
            onChange={handleChange}
          />
          In Stock
        </label>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Add Product
        </button>
      </form>
    </div>
  );
}
