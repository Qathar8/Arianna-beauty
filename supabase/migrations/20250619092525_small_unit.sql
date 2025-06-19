-- Cloudflare D1 Database Schema for ARIANNA BEAUTY
-- SQLite-compatible schema converted from Supabase

CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL, -- Price in cents (KES)
  image_url TEXT,
  in_stock BOOLEAN DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  items TEXT NOT NULL, -- JSON string of order items
  total INTEGER NOT NULL, -- Total price in cents (KES)
  whatsapp TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'pending'
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON products(in_stock);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);

-- Insert sample data for testing
INSERT OR IGNORE INTO products (id, name, description, price, image_url, in_stock) VALUES
(1, 'Chanel No. 5 Eau de Parfum', 'The legendary fragrance with notes of ylang-ylang, rose, and sandalwood.', 850000, 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=400', 1),
(2, 'Dior Sauvage Cologne', 'Fresh and woody fragrance with notes of bergamot and pepper.', 720000, 'https://images.pexels.com/photos/1667071/pexels-photo-1667071.jpeg?auto=compress&cs=tinysrgb&w=400', 1),
(3, 'Tom Ford Black Orchid', 'Luxurious and sensual fragrance with black orchid and dark chocolate.', 980000, 'https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=400', 1),
(4, 'Vitamin C Serum', 'Brightening serum with 20% Vitamin C for radiant skin.', 250000, 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=400', 1),
(5, 'Hyaluronic Acid Moisturizer', 'Intensive hydrating cream with hyaluronic acid.', 320000, 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=400', 1),
(6, 'Matte Lipstick Set', 'Set of 6 long-lasting matte lipsticks in popular shades.', 180000, 'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=400', 1);