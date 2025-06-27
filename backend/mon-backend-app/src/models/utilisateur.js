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
    "INSERT INTO utilisateur (nom, prenom, adresse, contact, email, mot_de_passe, role) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [utilisateur.nom, utilisateur.prenom, utilisateur.adresse, utilisateur.contact, utilisateur.email, utilisateur.mot_de_passe, utilisateur.role],
    callback
  );
}

// Mettre à jour un utilisateur
function updateUtilisateur(id, utilisateur, callback) {
  db.query(
    "UPDATE utilisateur SET nom = ?, prenom = ?, adresse = ?, contact = ?, email = ?, mot_de_passe = ?, role = ? WHERE id = ?",
    [
      utilisateur.nom,
      utilisateur.prenom,
      utilisateur.adresse,
      utilisateur.contact,
      utilisateur.email,
      utilisateur.mot_de_passe,
      utilisateur.role,
      id
    ],
    callback
  );
}

// Supprimer un utilisateur
function deleteUtilisateur(id, callback) {
  db.query("DELETE FROM utilisateur WHERE id = ?", [id], callback);
}

// Récupérer un utilisateur par email (pour le login)
function getUtilisateurByEmail(email, callback) {
  db.query("SELECT * FROM utilisateur WHERE email = ? OR nom = ?", [email, email], callback);
}

module.exports = {
  getAllUtilisateurs,
  getUtilisateurById,
  addUtilisateur,
  updateUtilisateur,
  deleteUtilisateur,
  getUtilisateurByEmail,
};