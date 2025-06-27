const express = require("express");
const router = express.Router();
const utilisateurController = require("../controllers/utilisateur");

router.get("/", utilisateurController.getAll);
router.get("/:id", utilisateurController.getById);
router.post("/", utilisateurController.create);
router.post("/login", utilisateurController.login);
router.put("/:id", utilisateurController.update);
router.delete("/:id", utilisateurController.delete);

// POST /api/utilisateur/login
exports.login = (req, res) => {
  const { nomUtilisateur, motDePasse } = req.body;
  Utilisateur.getUtilisateurByEmail(nomUtilisateur, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(401).json({ message: "Utilisateur non trouvé" });

    const utilisateur = results[0];
    if (utilisateur.mot_de_passe !== motDePasse) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }
    // NE PAS filtrer sur le rôle ici
    res.json({
      message: "Connexion réussie",
      utilisateur: {
        id: utilisateur.id,
        nom: utilisateur.nom,
        email: utilisateur.email,
        role: utilisateur.role
      }
    });
  });
};

module.exports = router;