const db = require("../db");

// Récupérer tous les colis
function getAllColis(callback) {
  db.query("SELECT * FROM colis", callback);
}

// Récupérer un colis par ID
function getColisById(id, callback) {
  db.query("SELECT * FROM colis WHERE id = ?", [id], callback);
}

// Ajouter un colis
function addColis(colis, callback) {
  db.query(
    "INSERT INTO colis (numero_suivi, description, poids, destination, date_envoi, utilisateur_id, statut_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      colis.numero_suivi,
      colis.description,
      colis.poids,
      colis.destination,
      colis.date_envoi,
      colis.utilisateur_id,
      colis.statut_id,
    ],
    callback
  );
}

// Mettre à jour un colis
function updateColis(id, colis, callback) {
  db.query(
    "UPDATE colis SET numero_suivi = ?, description = ?, poids = ?, destination = ?, date_envoi = ?, utilisateur_id = ?, statut_id = ? WHERE id = ?",
    [
      colis.numero_suivi,
      colis.description,
      colis.poids,
      colis.destination,
      colis.date_envoi,
      colis.utilisateur_id,
      colis.statut_id,
      id,
    ],
    callback
  );
}

// Supprimer un colis
function deleteColis(id, callback) {
  db.query("DELETE FROM colis WHERE id = ?", [id], callback);
}

module.exports = {
  getAllColis,
  getColisById,
  addColis,
  updateColis,
  deleteColis,
};