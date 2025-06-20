export const onRequest = async ({ request, env }: any) => {
  const db = env["arianna-beauty-db"]; // Make sure this matches your wrangler.toml binding name

  if (request.method === "GET") {
    const stmt = db.prepare("SELECT * FROM products ORDER BY created_at DESC");
    const { results } = await stmt.all();
    return new Response(JSON.stringify(results), {
      headers: { "Content-Type": "application/json" }
    });
  }

  if (request.method === "POST") {
    const body = await request.json();
    const { name, description, price, image_url, in_stock } = body;

    const stmt = db.prepare(`
      INSERT INTO products (name, description, price, image_url, in_stock)
      VALUES (?, ?, ?, ?, ?)
    `);
    await stmt.bind(name, description, price, image_url, in_stock ?? true).run();

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
      status: 201
    });
  }

  return new Response("Method Not Allowed", { status: 405 });
};

