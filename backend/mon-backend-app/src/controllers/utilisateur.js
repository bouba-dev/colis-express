const Utilisateur = require("../models/utilisateur");

// GET /api/utilisateur
exports.getAll = (req, res) => {
  Utilisateur.getAllUtilisateurs((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// GET /api/utilisateur/:id
exports.getById = (req, res) => {
  Utilisateur.getUtilisateurById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.json(results[0]);
  });
};

// POST /api/utilisateur
exports.create = (req, res) => {
  Utilisateur.addUtilisateur(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: result.insertId, ...req.body });
  });
};

// PUT /api/utilisateur/:id
exports.update = (req, res) => {
  Utilisateur.updateUtilisateur(req.params.id, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Utilisateur mis à jour" });
  });
};

// DELETE /api/utilisateur/:id
exports.delete = (req, res) => {
  Utilisateur.deleteUtilisateur(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Utilisateur supprimé" });
  });
};