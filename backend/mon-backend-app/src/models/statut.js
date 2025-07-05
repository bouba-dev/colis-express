const db = require("../db");

// Récupérer tous les statuts
function getAllStatuts(callback) {
  db.query("SELECT * FROM statut", callback);
}

// Récupérer un statut par ID
function getStatutById(id, callback) {
  db.query("SELECT * FROM statut WHERE id = ?", [id], callback);
}

// Ajouter un statut
function addStatut(statut, callback) {
  db.query(
    "INSERT INTO statut (libelle) VALUES (?)",
    [statut.libelle],
    callback
  );
}

// Mettre à jour un statut
function updateStatut(id, statut, callback) {
  db.query(
    "UPDATE statut SET libelle = ? WHERE id = ?",
    [statut.libelle, id],
    callback
  );
}

// Supprimer un statut
function deleteStatut(id, callback) {
  db.query("DELETE FROM statut WHERE id = ?", [id], callback);
}

module.exports = {
  getAllStatuts,
  getStatutById,
  addStatut,
  updateStatut,
  deleteStatut,
};