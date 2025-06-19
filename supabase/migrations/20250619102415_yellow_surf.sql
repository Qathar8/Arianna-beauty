CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  image_url TEXT,
  in_stock BOOLEAN DEFAULT 1,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  items TEXT NOT NULL, -- JSON string
  total INTEGER NOT NULL,
  whatsapp TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample products for testing
INSERT OR IGNORE INTO products (id, name, description, price, image_url, in_stock) VALUES
('1', 'Chanel No. 5 Eau de Parfum', 'The legendary fragrance with notes of ylang-ylang, rose, and sandalwood.', 850000, 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=400', 1),
('2', 'Dior Sauvage Cologne', 'Fresh and woody fragrance with notes of bergamot and pepper.', 720000, 'https://images.pexels.com/photos/1667071/pexels-photo-1667071.jpeg?auto=compress&cs=tinysrgb&w=400', 1),
('3', 'Tom Ford Black Orchid', 'Luxurious and sensual fragrance with black orchid and dark chocolate.', 980000, 'https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=400', 1),
('4', 'Vitamin C Serum', 'Brightening serum with 20% Vitamin C for radiant skin.', 250000, 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=400', 1),
('5', 'Hyaluronic Acid Moisturizer', 'Intensive hydrating cream with hyaluronic acid.', 320000, 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=400', 1),
('6', 'Matte Lipstick Set', 'Set of 6 long-lasting matte lipsticks in popular shades.', 180000, 'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=400', 1);