import { Request, Response } from 'express';
import { prisma, redis, CACHE_TTL } from '../config/database';

export async function getProducts(_req: Request, res: Response) {
  const cached = await redis.get('products');
  if (cached) {
    return res.json(JSON.parse(cached));
  }

  const products = await prisma.product.findMany();
  await redis.setex('products', CACHE_TTL, JSON.stringify(products));
  res.json(products);
}
