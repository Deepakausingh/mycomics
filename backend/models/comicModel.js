const pool = require('../config/db');

const Comic = {
  // Get all comics
  async getAll() {
    const res = await pool.query('SELECT * FROM comics ORDER BY created_at DESC');
    return res.rows;
  },

  // Get comic by ID
  async getById(id) {
    const res = await pool.query('SELECT * FROM comics WHERE id=$1', [id]);
    return res.rows[0];
  },

  // Create new comic
  async create(name, images) {
    const res = await pool.query(
      'INSERT INTO comics (name, images) VALUES ($1, $2) RETURNING *',
      [name, JSON.stringify(images)]
    );
    return res.rows[0];
  },

  // Update comic by ID
  async update(id, name) {
    const res = await pool.query(
      'UPDATE comics SET name=$1 WHERE id=$2 RETURNING *',
      [name, id]
    );
    return res.rows[0];
  },

  // Delete comic by ID
  async delete(id) {
    const res = await pool.query(
      'DELETE FROM comics WHERE id=$1 RETURNING *',
      [id]
    );
    return res.rows[0];
  }
};

module.exports = Comic;
