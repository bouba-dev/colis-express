const { query } = require("../config/database");

// Récupérer tous les colis
async function getAllColis() {
  try {
    const results = await query(`
      SELECT 
        id, numero_suivi, nom_destinataire, telephone_destinataire, 
        adresse_destinataire, type_colis, poids, valeur, photo_url, 
        montant, moyen_paiement, utilisateur_id, statut_id, 
        date_envoi, created_at, updated_at
      FROM colis 
      ORDER BY created_at DESC
    `);
    return results;
  } catch (error) {
    console.error('Erreur lors de la récupération des colis:', error);
    throw error;
  }
}

// Récupérer un colis par ID
async function getColisById(id) {
  try {
    const results = await query(`
      SELECT 
        id, numero_suivi, nom_destinataire, telephone_destinataire, 
        adresse_destinataire, type_colis, poids, valeur, photo_url, 
        montant, moyen_paiement, utilisateur_id, statut_id, 
        date_envoi, created_at, updated_at
      FROM colis 
      WHERE id = ?
    `, [id]);
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
      `INSERT INTO colis (
        numero_suivi, nom_destinataire, telephone_destinataire, 
        adresse_destinataire, type_colis, poids, valeur, 
        photo_url, montant, moyen_paiement, utilisateur_id, 
        statut_id, date_envoi, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        colis.numero_suivi || generateTrackingNumber(),
        colis.nom_destinataire,
        colis.telephone_destinataire,
        colis.adresse_destinataire,
        colis.type_colis,
        parseFloat(colis.poids) || 0,
        parseFloat(colis.valeur) || 0,
        colis.photo_url || null,
        parseFloat(colis.montant) || 0,
        colis.moyen_paiement || 'Espèces',
        colis.utilisateur_id || 1, // ID par défaut
        colis.statut_id || 1, // Statut par défaut (en_attente)
        colis.date_envoi || new Date().toISOString().split('T')[0]
      ]
    );
    return result;
  } catch (error) {
    console.error('Erreur lors de l\'ajout du colis:', error);
    throw error;
  }
}

// Fonction pour générer un numéro de suivi unique
function generateTrackingNumber() {
  const prefix = 'CE';
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}${timestamp}${random}`;
}

// Mettre à jour un colis
async function updateColis(id, colis) {
  try {
    const result = await query(
      `UPDATE colis SET 
        numero_suivi = ?, nom_destinataire = ?, telephone_destinataire = ?, 
        adresse_destinataire = ?, type_colis = ?, poids = ?, valeur = ?, 
        photo_url = ?, montant = ?, moyen_paiement = ?, utilisateur_id = ?, 
        statut_id = ?, date_envoi = ?, updated_at = NOW() 
        WHERE id = ?`,
      [
        colis.numero_suivi,
        colis.nom_destinataire,
        colis.telephone_destinataire,
        colis.adresse_destinataire,
        colis.type_colis,
        parseFloat(colis.poids) || 0,
        parseFloat(colis.valeur) || 0,
        colis.photo_url || null,
        parseFloat(colis.montant) || 0,
        colis.moyen_paiement || 'Espèces',
        colis.utilisateur_id || 1,
        colis.statut_id || 1,
        colis.date_envoi || new Date().toISOString().split('T')[0],
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