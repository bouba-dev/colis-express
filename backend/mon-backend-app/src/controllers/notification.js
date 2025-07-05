const Notification = require("../models/notification");

// GET /api/notification
exports.getAll = (req, res) => {
  Notification.getAllNotifications((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// GET /api/notification/:id
exports.getById = (req, res) => {
  Notification.getNotificationById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ message: "Notification non trouvée" });
    res.json(results[0]);
  });
};

// POST /api/notification
exports.create = (req, res) => {
  Notification.addNotification(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: result.insertId, ...req.body });
  });
};

// PUT /api/notification/:id
exports.update = (req, res) => {
  Notification.updateNotification(req.params.id, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Notification mise à jour" });
  });
};

// DELETE /api/notification/:id
exports.delete = (req, res) => {
  Notification.deleteNotification(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Notification supprimée" });
  });
};