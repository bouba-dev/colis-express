const Colis = require("../models/colis");

// GET /api/colis
exports.getAll = (req, res) => {
  Colis.getAllColis((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// GET /api/colis/:id
exports.getById = (req, res) => {
  Colis.getColisById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ message: "Colis non trouvé" });
    res.json(results[0]);
  });
};

// POST /api/colis
exports.create = (req, res) => {
  Colis.addColis(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: result.insertId, ...req.body });
  });
};

// PUT /api/colis/:id
exports.update = (req, res) => {
  Colis.updateColis(req.params.id, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Colis mis à jour" });
  });
};

// DELETE /api/colis/:id
exports.delete = (req, res) => {
  Colis.deleteColis(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Colis supprimé" });
  });
};