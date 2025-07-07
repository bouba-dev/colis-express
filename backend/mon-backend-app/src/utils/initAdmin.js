const db = require("../db");

function initAdmin() {
  const nom = "admin";
  const mot_de_passe = "admin123"; // Tu peux changer ce mot de passe
  const role = "admin";

  db.query(
    "SELECT * FROM utilisateur WHERE nom = ?",
    [nom],
    (err, results) => {
      if (err) {
        console.error("❌ Erreur lors de la vérification de l'admin :", err);
        return;
      }

      if (results.length === 0) {
        db.query(
          "INSERT INTO utilisateur (nom, email, mot_de_passe, role, contact, adresse) VALUES (?, ?, ?, ?, ?, ?)",
          [nom, "admin@colis.com", mot_de_passe, role, "00000000", "Bamako"],
          (err2) => {
            if (err2) {
              console.error("❌ Erreur lors de la création de l'admin :", err2);
            } else {
              console.log("✅ Admin par défaut créé avec succès !");
            }
          }
        );
      } else {
        console.log("ℹ️ Admin déjà existant.");
      }
    }
  );
}

module.exports = { initAdmin };
