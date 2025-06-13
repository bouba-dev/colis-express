const express = require("express");
const router = express.Router();
const indexController = require("../controllers/index");
const utilisateurRoutes = require("./utilisateur");
const tarifRoutes = require("./tarif");
const statutRoutes = require("./statut");
const colisRoutes = require("./colis");
const notificationRoutes = require("./notification");

router.get("/hello", indexController.hello);

function setRoutes(app) {
  app.use("/api", router);
  app.use("/api/utilisateur", utilisateurRoutes);
  app.use("/api/tarif", tarifRoutes);
  app.use("/api/statut", statutRoutes);
  app.use("/api/colis", colisRoutes);
  app.use("/api/notification", notificationRoutes);
}

module.exports = setRoutes;
module.exports = { setRoutes };