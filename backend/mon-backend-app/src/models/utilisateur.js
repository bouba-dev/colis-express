const db = require("../db");

// Récupérer tous les utilisateurs
function getAllUtilisateurs(callback) {
  db.query("SELECT * FROM utilisateur", callback);
}

// Récupérer un utilisateur par ID
function getUtilisateurById(id, callback) {
  db.query("SELECT * FROM utilisateur WHERE id = ?", [id], callback);
}

// Ajouter un utilisateur
function addUtilisateur(utilisateur, callback) {
  db.query(
    "INSERT INTO utilisateur (nom, email, mot_de_passe, role) VALUES (?, ?, ?, ?)",
    [utilisateur.nom, utilisateur.email, utilisateur.mot_de_passe, utilisateur.role],
    callback
  );
}

// Mettre à jour un utilisateur
function updateUtilisateur(id, utilisateur, callback) {
  db.query(
    "UPDATE utilisateur SET nom = ?, email = ?, mot_de_passe = ?, role = ? WHERE id = ?",
    [utilisateur.nom, utilisateur.email, utilisateur.mot_de_passe, utilisateur.role, id],
    callback
  );
}

// Supprimer un utilisateur
function deleteUtilisateur(id, callback) {
  db.query("DELETE FROM utilisateur WHERE id = ?", [id], callback);
}

module.exports = {
  getAllUtilisateurs,
  getUtilisateurById,
  addUtilisateur,
  updateUtilisateur,
  deleteUtilisateur,
};