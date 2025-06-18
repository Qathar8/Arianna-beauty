/*
  # Create eCommerce Schema

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `price` (integer, stored in cents)
      - `image_url` (text)
      - `in_stock` (boolean)
      - `created_at` (timestamp)
    - `orders`
      - `id` (uuid, primary key)
      - `items` (jsonb, array of product items)
      - `total` (integer, stored in cents)
      - `whatsapp` (text, customer WhatsApp number)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access to products
    - Add policies for authenticated admin access to manage products
    - Add policies for public insert access to orders
    - Add policies for authenticated admin access to view orders
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price integer NOT NULL,
  image_url text,
  in_stock boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  items jsonb NOT NULL,
  total integer NOT NULL,
  whatsapp text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Products policies
CREATE POLICY "Anyone can view products"
  ON products
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admins can manage products"
  ON products
  FOR ALL
  TO authenticated
  USING (
    auth.jwt() ->> 'user_metadata' ->> 'role' = 'admin'
  );

-- Orders policies
CREATE POLICY "Anyone can create orders"
  ON orders
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Admins can view orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (
    auth.jwt() ->> 'user_metadata' ->> 'role' = 'admin'
  );

-- Insert sample products
INSERT INTO products (name, description, price, image_url, in_stock) VALUES
  ('Chanel No. 5 Eau de Parfum', 'The legendary fragrance with notes of ylang-ylang, rose, and sandalwood.', 850000, 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=400', true),
  ('Dior Sauvage Cologne', 'Fresh and woody fragrance with notes of bergamot and pepper.', 720000, 'https://images.pexels.com/photos/1667071/pexels-photo-1667071.jpeg?auto=compress&cs=tinysrgb&w=400', true),
  ('Tom Ford Black Orchid', 'Luxurious and sensual fragrance with black orchid and dark chocolate.', 980000, 'https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=400', true),
  ('Versace Bright Crystal', 'Fresh and floral fragrance with notes of pomegranate and peony.', 650000, 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=400', true),
  ('Giorgio Armani Acqua di Gio', 'Marine and citrus fragrance with notes of bergamot and jasmine.', 750000, 'https://images.pexels.com/photos/1667071/pexels-photo-1667071.jpeg?auto=compress&cs=tinysrgb&w=400', true),
  ('Yves Saint Laurent Black Opium', 'Addictive and mysterious fragrance with coffee and vanilla notes.', 820000, 'https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=400', false);