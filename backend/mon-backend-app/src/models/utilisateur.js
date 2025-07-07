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
// Ajouter un nouvel utilisateur (mot de passe en clair, à hacher plus tard)
function addUtilisateur(utilisateur, callback) {
  db.query(
    "INSERT INTO utilisateur (nom, email, mot_de_passe, role, contact, adresse) VALUES (?, ?, ?, ?, ?, ?)",
    [
      utilisateur.nom,
      utilisateur.email,
      utilisateur.mot_de_passe,  // on envoie en clair
      utilisateur.role,
      utilisateur.contact,
      utilisateur.adresse
    ],
    callback
  );
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
// function findByCredentials(nom, motDePasse, callback) {
//   db.query(
//     "SELECT * FROM utilisateur WHERE nom = ?",
//     [nom],
//     async (err, results) => {
//       if (err) return callback(err);
//       if (results.length === 0) return callback(null, null);

//       const utilisateur = results[0];
//       try {
//         const isMatch = await bcrypt.compare(motDePasse, utilisateur.mot_de_passe);
//         if (!isMatch) return callback(null, null);
//         callback(null, utilisateur);
//       } catch (compareError) {
//         callback(compareError);
//       }
//     }
//   );
// }
// Trouver un utilisateur par ses identifiants avec vérification du mot de passe haché
// (ajout de la gestion des erreurs et de la promesse pour bcrypt)
// function findByCredentials(nom, motDePasse, callback) {
//   db.query(
//     "SELECT * FROM utilisateur WHERE nom = ?",
//     [nom],
//     async (err, results) => {
//       if (err) return callback(err);
//       if (results.length === 0) return callback(null, null);

//       const utilisateur = results[0];
//       try {
//         const isMatch = await bcrypt.compare(motDePasse, utilisateur.mot_de_passe);
//         if (!isMatch) return callback(null, null);
//         callback(null, utilisateur);
//       } catch (compareError) {
//         callback(compareError);
//       }
//     }
//   );
// }
// Exports des fonctions pour les utiliser dans les contrôleurs
const bcrypt = require("bcrypt");
const db = require("../db");

function findByCredentials(nom, motDePasse, callback) {
  db.query(
    "SELECT * FROM utilisateur WHERE nom = ?",
    [nom],
    async (err, results) => {
      if (err) return callback(err);
      if (results.length === 0) return callback(null, null);

      const utilisateur = results[0];

      try {
        const isMatch = await bcrypt.compare(motDePasse, utilisateur.mot_de_passe);
        if (!isMatch) return callback(null, null);
        callback(null, utilisateur);
      } catch (error) {
        callback(error);
      }
    }
  );
}

module.exports = { findByCredentials };
// Exports des fonctions pour les utiliser dans les contrôleurs
const bcrypt = require("bcrypt");
module.exports = {
  getAllUtilisateurs,
  getUtilisateurById,
  addUtilisateur,
  updateUtilisateur,
  deleteUtilisateur,
  findByCredentials,
};
