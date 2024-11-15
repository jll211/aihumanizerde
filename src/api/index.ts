import express from 'express';
import { humanizeHandler } from './humanize';

const app = express();
app.use(express.json());

app.post('/humanize', humanizeHandler);

export default app;