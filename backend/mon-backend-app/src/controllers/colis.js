const Colis = require("../models/colis");

// GET /api/colis
exports.getAll = async (req, res) => {
  try {
    const results = await Colis.getAllColis();
    res.json(results);
  } catch (error) {
    console.error('Erreur lors de la récupération des colis:', error);
    res.status(500).json({ 
      error: "Erreur lors de la récupération des colis",
      details: error.message 
    });
  }
};

// GET /api/colis/:id
exports.getById = async (req, res) => {
  try {
    const result = await Colis.getColisById(req.params.id);
    if (!result) {
      return res.status(404).json({ 
        message: "Colis non trouvé",
        id: req.params.id 
      });
    }
    res.json(result);
  } catch (error) {
    console.error('Erreur lors de la récupération du colis:', error);
    res.status(500).json({ 
      error: "Erreur lors de la récupération du colis",
      details: error.message 
    });
  }
};

// POST /api/colis
exports.create = async (req, res) => {
  try {
    const result = await Colis.addColis(req.body);
    res.status(201).json({ 
      id: result.insertId, 
      ...req.body,
      message: "Colis créé avec succès"
    });
  } catch (error) {
    console.error('Erreur lors de la création du colis:', error);
    res.status(500).json({ 
      error: "Erreur lors de la création du colis",
      details: error.message 
    });
  }
};

// PUT /api/colis/:id
exports.update = async (req, res) => {
  try {
    const result = await Colis.updateColis(req.params.id, req.body);
    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        message: "Colis non trouvé",
        id: req.params.id 
      });
    }
    res.json({ 
      message: "Colis mis à jour avec succès",
      id: req.params.id 
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du colis:', error);
    res.status(500).json({ 
      error: "Erreur lors de la mise à jour du colis",
      details: error.message 
    });
  }
};

// DELETE /api/colis/:id
exports.delete = async (req, res) => {
  try {
    const result = await Colis.deleteColis(req.params.id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        message: "Colis non trouvé",
        id: req.params.id 
      });
    }
    res.json({ 
      message: "Colis supprimé avec succès",
      id: req.params.id 
    });
  } catch (error) {
    console.error('Erreur lors de la suppression du colis:', error);
    res.status(500).json({ 
      error: "Erreur lors de la suppression du colis",
      details: error.message 
    });
  }
};