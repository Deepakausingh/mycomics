const Comic = require('../models/comicModel');

exports.uploadComic = async (req, res) => {
  try {
    const { name } = req.body;
    const images = req.files.map(file => `/uploads/${file.filename}`); // store links
    const comic = await Comic.create(name, images);
    res.json(comic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
