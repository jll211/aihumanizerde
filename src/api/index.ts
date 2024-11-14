import { humanizeText } from './humanize';
import express from 'express';

const router = express.Router();

router.post('/humanize', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const humanizedText = await humanizeText(text);
    res.json({ humanizedText });
  } catch (error) {
    console.error('Error in humanize endpoint:', error);
    res.status(500).json({ error: 'Failed to humanize text' });
  }
});

export default router;