// PATCH /api/update-order-status/[id] - Update order status
export async function onRequest(context: any) {
  const { request, env, params } = context;
  
  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  try {
    if (request.method === 'PATCH') {
      const orderId = params.id;
      const body = await request.json();
      const { whatsapp } = body;

      if (!whatsapp) {
        return new Response(JSON.stringify({
          data: null,
          error: { message: 'WhatsApp field is required' }
        }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }

      // Update order
      const result = await env.DB.prepare(
        'UPDATE orders SET whatsapp = ? WHERE id = ?'
      ).bind(whatsapp, orderId).run();

      if (!result.success) {
        throw new Error('Failed to update order');
      }

      if (result.changes === 0) {
        return new Response(JSON.stringify({
          data: null,
          error: { message: 'Order not found' }
        }), {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }

      // Fetch the updated order
      const { results } = await env.DB.prepare(
        'SELECT * FROM orders WHERE id = ?'
      ).bind(orderId).all();

      const updatedOrder = {
        ...results[0],
        items: JSON.parse(results[0].items || '[]')
      };

      return new Response(JSON.stringify({
        data: updatedOrder,
        error: null
      }), {
        status: 200,
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
    console.error('Update Order Status API Error:', error);
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