const Statut = require("../models/statut");

// GET /api/statut
exports.getAll = (req, res) => {
  Statut.getAllStatuts((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// GET /api/statut/:id
exports.getById = (req, res) => {
  Statut.getStatutById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ message: "Statut non trouvé" });
    res.json(results[0]);
  });
};

// POST /api/statut
exports.create = (req, res) => {
  Statut.addStatut(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: result.insertId, ...req.body });
  });
};

// PUT /api/statut/:id
exports.update = (req, res) => {
  Statut.updateStatut(req.params.id, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Statut mis à jour" });
  });
};

// DELETE /api/statut/:id
exports.delete = (req, res) => {
  Statut.deleteStatut(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Statut supprimé" });
  });
};