// GET/POST /api/orders - Fetch orders or create new order
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
      // Fetch all orders
      const { results } = await env.DB.prepare(
        'SELECT * FROM orders ORDER BY created_at DESC LIMIT 100'
      ).all();

      // Parse JSON items for each order
      const ordersWithParsedItems = results.map((order) => ({
        ...order,
        items: JSON.parse(order.items || '[]')
      }));

      return new Response(JSON.stringify(ordersWithParsedItems), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    if (request.method === 'POST') {
      const body = await request.json();
      const { items, total, whatsapp } = body;

      // Validate required fields
      if (!items || !total) {
        return new Response(JSON.stringify({
          error: 'Items and total are required'
        }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }

      // Insert new order
      const result = await env.DB.prepare(
        'INSERT INTO orders (items, total, whatsapp) VALUES (?, ?, ?)'
      ).bind(
        JSON.stringify(items),
        parseInt(total),
        whatsapp || 'pending'
      ).run();

      if (!result.success) {
        throw new Error('Failed to create order');
      }

      // Fetch the created order
      const { results } = await env.DB.prepare(
        'SELECT * FROM orders WHERE id = ?'
      ).bind(result.meta.last_row_id).all();

      const createdOrder = {
        ...results[0],
        items: JSON.parse(results[0].items || '[]')
      };

      return new Response(JSON.stringify(createdOrder), {
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
    console.error('Orders API Error:', error);
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