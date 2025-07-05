const db = require("../db");

// Récupérer toutes les notifications
function getAllNotifications(callback) {
  db.query("SELECT * FROM notification", callback);
}

// Récupérer une notification par ID
function getNotificationById(id, callback) {
  db.query("SELECT * FROM notification WHERE id = ?", [id], callback);
}

// Ajouter une notification
function addNotification(notification, callback) {
  db.query(
    "INSERT INTO notification (utilisateur_id, colis_id, message, date_envoi) VALUES (?, ?, ?, ?)",
    [
      notification.utilisateur_id,
      notification.colis_id,
      notification.message,
      notification.date_envoi,
    ],
    callback
  );
}

// Mettre à jour une notification
function updateNotification(id, notification, callback) {
  db.query(
    "UPDATE notification SET utilisateur_id = ?, colis_id = ?, message = ?, date_envoi = ? WHERE id = ?",
    [
      notification.utilisateur_id,
      notification.colis_id,
      notification.message,
      notification.date_envoi,
      id,
    ],
    callback
  );
}

// Supprimer une notification
function deleteNotification(id, callback) {
  db.query("DELETE FROM notification WHERE id = ?", [id], callback);
}

module.exports = {
  getAllNotifications,
  getNotificationById,
  addNotification,
  updateNotification,
  deleteNotification,
};