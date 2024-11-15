import express from 'express';
import { humanizeHandler } from './humanize';

const router = express.Router();

router.post('/humanize', humanizeHandler);

export default router;