const express = require("express");
const router = express.Router();
const utilisateurController = require("../controllers/utilisateur");

router.get("/", utilisateurController.getAll);
router.get("/:id", utilisateurController.getById);
router.post("/", utilisateurController.create);
router.post("/login", utilisateurController.login);
router.put("/:id", utilisateurController.update);
router.delete("/:id", utilisateurController.delete);

module.exports = router;