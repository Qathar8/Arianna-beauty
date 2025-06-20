import { Hono } from 'hono';
import { z } from 'zod';
import { env } from 'hono/adapter';
import { getValidatedBody } from 'hono/zod-validator';

const app = new Hono();

const OrderSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(1),
  items: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      price: z.number(),
      quantity: z.number()
    })
  ),
  total: z.number().min(1)
});

app.post('/', getValidatedBody(OrderSchema), async (c) => {
  const { name, phone, items, total } = c.req.valid('json');
  const db = env(c).DB;

  const result = await db.prepare(`
    INSERT INTO orders (name, phone, items, total)
    VALUES (?, ?, ?, ?)
  `).bind(name, phone, JSON.stringify(items), total).run();

  return c.json({ success: true, orderId: result.meta.last_row_id });
});

export default app;

