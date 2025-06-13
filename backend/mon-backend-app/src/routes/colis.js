const express = require("express");
const router = express.Router();
const colisController = require("../controllers/colis");

router.get("/", colisController.getAll);
router.get("/:id", colisController.getById);
router.post("/", colisController.create);
router.put("/:id", colisController.update);
router.delete("/:id", colisController.delete);

module.exports = router;