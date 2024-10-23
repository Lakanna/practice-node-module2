import express from 'express';
import cors from 'cors';

import { env } from './utils/env.js';
import { router } from './routers/products.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(router);

  app.use('*/*', (req, res, _next) => {
    res.status(404).json({ status: 404, message: 'Route not found' });
  });

  app.use((err, req, res, _next) => {
    res.status(500).json({ status: 500, message: 'Something went wrong' });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
