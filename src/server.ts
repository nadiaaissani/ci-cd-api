import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import products from './data/products.json';

const app = express();
const PORT: number = parseInt(process.env.PORT || '3000', 10);

// Route Health
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Route principale
app.get('/', (req, res) => {
  res.json({ message: 'welcome to CI-CD-API' });
});

app.get('/products', (req, res) => {
  res.json(products);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
