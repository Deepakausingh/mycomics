import express from 'express';
import pool from '../db/connect.js';

const router = express.Router();

// Upload a new comic
router.post('/', async (req, res) => {
  const { name, images } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO comics (name, images) VALUES ($1, $2) RETURNING *',
      [name, images]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
