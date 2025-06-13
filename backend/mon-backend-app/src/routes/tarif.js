const express = require("express");
const router = express.Router();
const tarifController = require("../controllers/tarif");

router.get("/", tarifController.getAll);
router.get("/:id", tarifController.getById);
router.post("/", tarifController.create);
router.put("/:id", tarifController.update);
router.delete("/:id", tarifController.delete);

module.exports = router;