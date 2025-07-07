const db = require("../db");
const bcrypt = require("bcrypt");

// Récupérer tous les utilisateurs
function getAllUtilisateurs(callback) {
  db.query("SELECT * FROM utilisateur", callback);
}

// Récupérer un utilisateur par ID
function getUtilisateurById(id, callback) {
  db.query("SELECT * FROM utilisateur WHERE id = ?", [id], callback);
}

// Ajouter un utilisateur avec mot de passe haché
async function addUtilisateur(utilisateur, callback) {
  try {
    const hashedPassword = await bcrypt.hash(utilisateur.mot_de_passe, 10);
    db.query(
      "INSERT INTO utilisateur (nom, email, mot_de_passe, role, contact, adresse) VALUES (?, ?, ?, ?, ?, ?)",
      [
        utilisateur.nom,
        utilisateur.email,
        hashedPassword,
        utilisateur.role,
        utilisateur.contact,
        utilisateur.adresse
      ],
      callback
    );
  } catch (err) {
    callback(err);
  }
}

// Mettre à jour un utilisateur (sans changer le mot de passe ici, ou fais une condition)
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

// 🔐 Trouver un utilisateur par ses identifiants avec vérification du mot de passe haché
function findByCredentials(nomUtilisateur, motDePasse, callback) {
  db.query(
    "SELECT * FROM utilisateur WHERE nom = ?",
    [nomUtilisateur],
    async (err, results) => {
      if (err) return callback(err);
      if (results.length === 0) return callback(null, null);

      const utilisateur = results[0];
      const isMatch = await bcrypt.compare(motDePasse, utilisateur.mot_de_passe);

      if (!isMatch) return callback(null, null);
      callback(null, utilisateur);
    }
  );
}

module.exports = {
  getAllUtilisateurs,
  getUtilisateurById,
  addUtilisateur,
  updateUtilisateur,
  deleteUtilisateur,
  findByCredentials,
};
