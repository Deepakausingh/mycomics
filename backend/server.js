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

// Root route – show DB connection status
app.get('/', async (req, res) => {
  try {
    // Simple query to check connection
    await pool.query('SELECT NOW()');
    res.send(`
      <h2 style="font-family:sans-serif; color:green;">
        ✅ Database connected successfully!
      </h2>
      <p>Server running on <b>http://localhost:${process.env.PORT || 5000}</b></p>
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

// API routes
app.use('/api/comics', comicsRoute);
app.use('/api/upload', uploadRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on: http://localhost:${PORT}`);
});
