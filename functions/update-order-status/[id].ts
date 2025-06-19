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
      const { status, whatsapp } = body;

      // Build update query dynamically
      const updates = [];
      const values = [];

      if (status !== undefined) {
        updates.push('status = ?');
        values.push(status);
      }

      if (whatsapp !== undefined) {
        updates.push('whatsapp = ?');
        values.push(whatsapp);
      }

      if (updates.length === 0) {
        return new Response(JSON.stringify({
          data: null,
          error: { message: 'No fields to update' }
        }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }

      values.push(parseInt(orderId));

      // Update order
      const result = await env.DB.prepare(
        `UPDATE orders SET ${updates.join(', ')} WHERE id = ?`
      ).bind(...values).run();

      if (!result.success) {
        throw new Error('Failed to update order');
      }

      if (result.meta.changes === 0) {
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
      ).bind(parseInt(orderId)).all();

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