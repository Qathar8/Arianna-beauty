# 🚀 ARIANNA BEAUTY - Cloudflare D1 Migration Guide

This project has been migrated from Supabase to Cloudflare D1 while maintaining the same frontend functionality.

## 📋 Setup Instructions

### 1. Create Cloudflare D1 Database

```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Create D1 database
wrangler d1 create arianna-beauty-db

# Create preview database
wrangler d1 create arianna-beauty-db-preview
```

### 2. Update wrangler.toml

Replace the database IDs in `wrangler.toml` with your actual database IDs from the previous step.

### 3. Initialize Database Schema

```bash
# Apply schema to production database
wrangler d1 execute arianna-beauty-db --file=./schema.sql

# Apply schema to preview database  
wrangler d1 execute arianna-beauty-db-preview --file=./schema.sql
```

### 4. Deploy to Cloudflare Pages

```bash
# Build the project
npm run build

# Deploy to Cloudflare Pages
wrangler pages deploy dist --project-name arianna-beauty
```

## 🔧 API Endpoints

The following API endpoints are now available:

- `GET /api/products` - Fetch all products
- `POST /api/add-product` - Create new product
- `PUT /api/update-product/[id]` - Update existing product
- `DELETE /api/delete-product/[id]` - Delete product
- `GET /api/orders` - Fetch all orders
- `POST /api/orders` - Create new order
- `PATCH /api/update-order-status/[id]` - Update order status

## 📊 Database Schema

### Products Table
- `id` - INTEGER PRIMARY KEY AUTOINCREMENT
- `name` - TEXT NOT NULL
- `description` - TEXT
- `price` - INTEGER (price in cents)
- `image_url` - TEXT
- `in_stock` - BOOLEAN DEFAULT 1
- `created_at` - TIMESTAMP DEFAULT CURRENT_TIMESTAMP

### Orders Table
- `id` - INTEGER PRIMARY KEY AUTOINCREMENT
- `items` - TEXT (JSON string of order items)
- `total` - INTEGER (total price in cents)
- `whatsapp` - TEXT DEFAULT 'pending'
- `created_at` - TIMESTAMP DEFAULT CURRENT_TIMESTAMP
- `status` - TEXT DEFAULT 'pending'

## 🔄 Migration Changes

1. **Database**: Migrated from Supabase PostgreSQL to Cloudflare D1 (SQLite)
2. **API**: Created Cloudflare Pages Functions for all CRUD operations
3. **Client**: Updated client library to use REST API instead of Supabase SDK
4. **Auth**: Removed Supabase Auth (admin functionality disabled for now)
5. **Types**: Maintained same TypeScript interfaces for compatibility

## 🚨 Important Notes

- **Authentication**: Admin authentication is currently disabled. You'll need to implement a custom auth solution or use Cloudflare Access.
- **Real-time**: D1 doesn't support real-time subscriptions like Supabase. Consider using Cloudflare Durable Objects if needed.
- **File Storage**: If you were using Supabase Storage, you'll need to migrate to Cloudflare R2 or another storage solution.

## 🛠 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# The app will use the D1 API endpoints automatically
```

## 📱 WhatsApp Integration

WhatsApp ordering functionality remains unchanged and will continue to work with the phone number: +254721787191

## 🎨 Frontend

All frontend components remain exactly the same. The migration is transparent to the user interface.

## 🔐 Security

- All API endpoints include CORS headers
- Input validation on all endpoints
- SQL injection protection through prepared statements
- Rate limiting should be configured in Cloudflare dashboard

## 📈 Performance

- D1 provides excellent performance for read-heavy workloads
- Global edge distribution through Cloudflare's network
- Automatic caching and optimization

## 🆘 Troubleshooting

1. **Database not found**: Ensure database IDs in `wrangler.toml` are correct
2. **API errors**: Check Cloudflare Pages Functions logs
3. **CORS issues**: Verify CORS headers in function responses
4. **Build failures**: Ensure all dependencies are installed

For more help, check the Cloudflare D1 documentation: https://developers.cloudflare.com/d1/