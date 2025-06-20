-- Cloudflare D1 Database Schema for ARIANNA BEAUTY
-- SQLite-compatible schema for products and orders

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  price REAL NOT NULL,
  image_url TEXT,
  in_stock BOOLEAN DEFAULT true,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  items TEXT NOT NULL, -- JSON-encoded cart items
  total REAL NOT NULL,
  whatsapp TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON products(in_stock);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_orders_whatsapp ON orders(whatsapp);

-- Insert sample products for testing
INSERT OR IGNORE INTO products (name, description, price, image_url, in_stock) VALUES
('Chanel No. 5 Eau de Parfum', 'The legendary fragrance with notes of ylang-ylang, rose, and sandalwood.', 8500.00, 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=400', true),
('Dior Sauvage Cologne', 'Fresh and woody fragrance with notes of bergamot and pepper.', 7200.00, 'https://images.pexels.com/photos/1667071/pexels-photo-1667071.jpeg?auto=compress&cs=tinysrgb&w=400', true),
('Tom Ford Black Orchid', 'Luxurious and sensual fragrance with black orchid and dark chocolate.', 9800.00, 'https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=400', true),
('Vitamin C Serum', 'Brightening serum with 20% Vitamin C for radiant skin.', 2500.00, 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=400', true),
('Hyaluronic Acid Moisturizer', 'Intensive hydrating cream with hyaluronic acid.', 3200.00, 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=400', true),
('Matte Lipstick Set', 'Set of 6 long-lasting matte lipsticks in popular shades.', 1800.00, 'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=400', true),
('Eyeshadow Palette', '12-shade eyeshadow palette with matte and shimmer finishes.', 2800.00, 'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=400', true),
('Perfume Gift Set', 'Elegant gift set with 3 mini perfumes in a luxury box.', 6500.00, 'https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=400', true);