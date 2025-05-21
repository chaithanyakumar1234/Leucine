import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './config/data-source';
import authRoutes from './routes/authRoutes';

const app = express();
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Start server
AppDataSource.initialize()
  .then(() => {
    console.log('📦 Database connected');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running at http://localhost:${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => console.error('Error during Data Source initialization', err));



import softwareRoutes from './routes/softwareRoutes';
import requestRoutes from './routes/requestRoutes';

// Below existing routes
app.use('/api/software', softwareRoutes);
app.use('/api/requests', requestRoutes);
