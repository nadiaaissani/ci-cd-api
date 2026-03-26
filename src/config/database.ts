import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import Redis from 'ioredis';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
export const prisma = new PrismaClient({ adapter });

export const redis = new Redis(
  process.env.REDIS_URL || 'redis://localhost:6379'
);
export const CACHE_TTL = 60; // secondes
