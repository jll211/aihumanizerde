import express from 'express';
import { humanizeHandler } from './humanize';

const router = express.Router();

// Define API routes
router.post('/humanize', humanizeHandler);

// Add a test endpoint
router.get('/test', (req, res) => {
  res.json({ message: 'API is working' });
});

export default router;