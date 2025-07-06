const { query } = require("../config/database");

// Récupérer tous les colis
async function getAllColis() {
  try {
    const results = await query("SELECT * FROM colis ORDER BY created_at DESC");
    return results;
  } catch (error) {
    console.error('Erreur lors de la récupération des colis:', error);
    throw error;
  }
}

// Récupérer un colis par ID
async function getColisById(id) {
  try {
    const results = await query("SELECT * FROM colis WHERE id = ?", [id]);
    return results[0];
  } catch (error) {
    console.error('Erreur lors de la récupération du colis:', error);
    throw error;
  }
}

// Ajouter un colis
async function addColis(colis) {
  try {
    const result = await query(
      "INSERT INTO colis (numero_suivi, description, poids, destination, date_envoi, utilisateur_id, statut_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        colis.numero_suivi,
        colis.description,
        colis.poids,
        colis.destination,
        colis.date_envoi,
        colis.utilisateur_id,
        colis.statut_id,
      ]
    );
    return result;
  } catch (error) {
    console.error('Erreur lors de l\'ajout du colis:', error);
    throw error;
  }
}

// Mettre à jour un colis
async function updateColis(id, colis) {
  try {
    const result = await query(
      "UPDATE colis SET numero_suivi = ?, description = ?, poids = ?, destination = ?, date_envoi = ?, utilisateur_id = ?, statut_id = ? WHERE id = ?",
      [
        colis.numero_suivi,
        colis.description,
        colis.poids,
        colis.destination,
        colis.date_envoi,
        colis.utilisateur_id,
        colis.statut_id,
        id,
      ]
    );
    return result;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du colis:', error);
    throw error;
  }
}

// Supprimer un colis
async function deleteColis(id) {
  try {
    const result = await query("DELETE FROM colis WHERE id = ?", [id]);
    return result;
  } catch (error) {
    console.error('Erreur lors de la suppression du colis:', error);
    throw error;
  }
}

module.exports = {
  getAllColis,
  getColisById,
  addColis,
  updateColis,
  deleteColis,
};