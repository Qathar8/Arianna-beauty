// GET/POST/PUT/DELETE /api/products - Manage product operations

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
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (request.method === 'GET') {
      // Fetch all products
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

    if (request.method === 'PUT') {
      if (!id) {
        return new Response(JSON.stringify({ error: 'Missing ID for update' }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }

      const body = await request.json();
      const { name, description, price, image_url, in_stock } = body;

      const result = await env.DB.prepare(`
        UPDATE products SET name = ?, description = ?, price = ?, image_url = ?, in_stock = ?
        WHERE id = ?
      `).bind(
        name,
        description || null,
        price,
        image_url || null,
        in_stock !== undefined ? in_stock : true,
        id
      ).run();

      return new Response(JSON.stringify({ success: result.success }), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    if (request.method === 'DELETE') {
      if (!id) {
        return new Response(JSON.stringify({ error: 'Missing ID for deletion' }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }

      const result = await env.DB.prepare(
        'DELETE FROM products WHERE id = ?'
      ).bind(id).run();

      return new Response(JSON.stringify({ success: result.success }), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
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
