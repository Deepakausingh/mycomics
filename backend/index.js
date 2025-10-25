import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import pool from './db/connect.js';
import comicsRoute from './api/comics.js';
import uploadRoute from './api/upload.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Root route – check DB connection
app.get('/', async (req, res) => {
  try {
    await pool.query('SELECT NOW()');
    res.send(`
      <h2 style="font-family:sans-serif; color:green;">
        ✅ Database connected successfully!
      </h2>
      <p>Server running successfully on Vercel!</p>
    `);
  } catch (error) {
    res.status(500).send(`
      <h2 style="font-family:sans-serif; color:red;">
        ❌ Database connection failed!
      </h2>
      <pre>${error.message}</pre>
    `);
  }
});

app.use('/api/comics', comicsRoute);
app.use('/api/upload', uploadRoute);

// ❗ Export the app for Vercel
export default app;
