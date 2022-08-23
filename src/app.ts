import express from 'express';
import 'reflect-metadata';
import 'express-async-errors';
import { router } from './routes/router';

import 'dotenv/config';

const app = express();

app.use(express.json());
app.use(router);
export { app };
