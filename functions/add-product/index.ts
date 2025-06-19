// POST /api/add-product - Create new product
export async function onRequest(context: any) {
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
    if (request.method === 'POST') {
      const body = await request.json();
      const { name, description, price, image_url, in_stock } = body;

      // Validate required fields
      if (!name || !price) {
        return new Response(JSON.stringify({
          data: null,
          error: { message: 'Name and price are required' }
        }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }

      // Insert new product
      const result = await env.DB.prepare(
        'INSERT INTO products (name, description, price, image_url, in_stock) VALUES (?, ?, ?, ?, ?)'
      ).bind(
        name,
        description || null,
        parseInt(price),
        image_url || null,
        in_stock ? 1 : 0
      ).run();

      if (!result.success) {
        throw new Error('Failed to create product');
      }

      // Fetch the created product
      const { results } = await env.DB.prepare(
        'SELECT * FROM products WHERE id = ?'
      ).bind(result.meta.last_row_id).all();

      return new Response(JSON.stringify({
        data: results[0],
        error: null
      }), {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    return new Response(JSON.stringify({
      error: { message: 'Method not allowed' }
    }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });

  } catch (error: any) {
    console.error('Add Product API Error:', error);
    return new Response(JSON.stringify({
      data: null,
      error: { message: error.message || 'Internal server error' }
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}