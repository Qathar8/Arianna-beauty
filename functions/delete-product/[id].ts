// DELETE /api/delete-product/[id] - Delete product
export async function onRequest(context: any) {
  const { request, env, params } = context;
  
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
    if (request.method === 'DELETE') {
      const productId = params.id;

      // Check if product exists
      const { results: existingProduct } = await env.DB.prepare(
        'SELECT id FROM products WHERE id = ?'
      ).bind(parseInt(productId)).all();

      if (existingProduct.length === 0) {
        return new Response(JSON.stringify({
          data: null,
          error: { message: 'Product not found' }
        }), {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }

      // Delete product
      const result = await env.DB.prepare(
        'DELETE FROM products WHERE id = ?'
      ).bind(parseInt(productId)).run();

      if (!result.success) {
        throw new Error('Failed to delete product');
      }

      return new Response(JSON.stringify({
        data: { message: 'Product deleted successfully' },
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
    console.error('Delete Product API Error:', error);
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