const db = require("../db");

// Récupérer tous les tarifs
function getAllTarifs(callback) {
  db.query("SELECT * FROM tarif", callback);
}

// Récupérer un tarif par ID
function getTarifById(id, callback) {
  db.query("SELECT * FROM tarif WHERE id = ?", [id], callback);
}

// Ajouter un tarif
function addTarif(tarif, callback) {
  db.query(
    "INSERT INTO tarif (poids_min, poids_max, destination, prix) VALUES (?, ?, ?, ?)",
    [tarif.poids_min, tarif.poids_max, tarif.destination, tarif.prix],
    callback
  );
}

// Mettre à jour un tarif
function updateTarif(id, tarif, callback) {
  db.query(
    "UPDATE tarif SET poids_min = ?, poids_max = ?, destination = ?, prix = ? WHERE id = ?",
    [tarif.poids_min, tarif.poids_max, tarif.destination, tarif.prix, id],
    callback
  );
}

// Supprimer un tarif
function deleteTarif(id, callback) {
  db.query("DELETE FROM tarif WHERE id = ?", [id], callback);
}

module.exports = {
  getAllTarifs,
  getTarifById,
  addTarif,
  updateTarif,
  deleteTarif,
};