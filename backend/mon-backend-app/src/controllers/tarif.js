const Tarif = require("../models/tarif");

// GET /api/tarif
exports.getAll = (req, res) => {
  Tarif.getAllTarifs((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// GET /api/tarif/:id
exports.getById = (req, res) => {
  Tarif.getTarifById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ message: "Tarif non trouvé" });
    res.json(results[0]);
  });
};

// POST /api/tarif
exports.create = (req, res) => {
  Tarif.addTarif(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: result.insertId, ...req.body });
  });
};

// PUT /api/tarif/:id
exports.update = (req, res) => {
  Tarif.updateTarif(req.params.id, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Tarif mis à jour" });
  });
};

// DELETE /api/tarif/:id
exports.delete = (req, res) => {
  Tarif.deleteTarif(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Tarif supprimé" });
  });
};