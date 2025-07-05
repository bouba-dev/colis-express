const express = require("express");
const router = express.Router();
const statutController = require("../controllers/statut");

router.get("/", statutController.getAll);
router.get("/:id", statutController.getById);
router.post("/", statutController.create);
router.put("/:id", statutController.update);
router.delete("/:id", statutController.delete);

module.exports = router;