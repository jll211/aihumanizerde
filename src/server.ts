import express from 'express';
import cors from 'cors';
import apiRoutes from './api';

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS with proper configuration
app.use(cors({
  origin: ['http://localhost:5173', 'https://95fbedcb-be79-42ee-8310-26952e84e5f2.lovableproject.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Mount API routes
app.use('/api', apiRoutes);

// Basic health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});