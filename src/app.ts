import express from 'express';
import productRoutes from './routes/product.routes';

const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/', (_req, res) => {
  res.json({ message: 'welcome to CI-CD-API' });
});

app.use(productRoutes);

export default app;
