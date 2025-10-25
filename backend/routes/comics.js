// backend/routes/comics.js
import express from "express";
import multer from "multer";
import pool from "../db/connect.js";

const router = express.Router();
const upload = multer(); // memory storage for uploaded files

// GET all comics
router.get("/", async (req, res) => {
  try {
    const comics = await pool.query("SELECT * FROM comics ORDER BY id DESC");
    res.json(comics.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new comic (supports both files and links)
// backend/routes/comics.js
router.post("/", async (req, res) => {
  try {
    const { title, links } = req.body; // links = array of image URLs
    if (!title || !links || links.length === 0) {
      return res.status(400).json({ error: "Title and links required" });
    }

    const result = await pool.query(
      "INSERT INTO comics (name, images) VALUES ($1, $2) RETURNING *",
      [title, JSON.stringify(links)]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// backend/routes/comics.js
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM comics WHERE id=$1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Comic not found" });
    }

    res.json({ success: true, deleted: result.rows[0] });
  } catch (err) {
    console.error("Error deleting comic:", err);
    res.status(500).json({ error: err.message });
  }
});


export default router;
