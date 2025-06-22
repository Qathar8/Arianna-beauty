// GET /api/products - Fetch all products
export async function onRequest(context) {
  const { request, env } = context;
  
  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  try {
    if (request.method === 'GET') {
      // Fetch all products from D1 database
      const { results } = await env.DB.prepare(
        'SELECT * FROM products ORDER BY created_at DESC'
      ).all();

      return new Response(JSON.stringify(results), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    if (request.method === 'POST') {
      const body = await request.json();
      const { name, description, price, image_url, in_stock } = body;

      // Validate required fields
      if (!name || !price) {
        return new Response(JSON.stringify({
          error: 'Name and price are required'
        }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }

      // Insert new product
      const result = await env.DB.prepare(`
        INSERT INTO products (name, description, price, image_url, in_stock)
        VALUES (?, ?, ?, ?, ?)
      `).bind(
        name,
        description || null,
        price,
        image_url || null,
        in_stock !== undefined ? in_stock : true
      ).run();

      if (!result.success) {
        throw new Error('Failed to create product');
      }

      return new Response(JSON.stringify({ 
        success: true, 
        id: result.meta.last_row_id 
      }), {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    return new Response(JSON.stringify({
      error: 'Method not allowed'
    }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });

  } catch (error) {
    console.error('Products API Error:', error);
    return new Response(JSON.stringify({
      error: error.message || 'Internal server error'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}