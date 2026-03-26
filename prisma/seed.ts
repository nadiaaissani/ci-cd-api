import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';
dotenv.config();

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter, log: ['query'] });

async function main() {
    await prisma.product.createMany({
        data: [
            { name: 'Laptop', price: 999.99, description: 'Powerful laptop' },
            { name: 'Phone', price: 599.99, description: 'Smartphone' },
            { name: 'Tablet', price: 399.99, description: 'Digital tablet' },
        ],
    });
    console.log('Seed done !');
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());